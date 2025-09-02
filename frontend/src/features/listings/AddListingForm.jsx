import React, { useState, useEffect } from 'react';
import { authApi } from '../../api/authApi';
import { useAuthContext } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddListingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    seller_id: user ? user.id : null,
    title: "",
    price: "",
    description: "",
    subcategory_id: "",
    // location: "",
    photos: [],
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Fetch categories + subcategories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await authApi().get('/categories');
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      setFormData({ ...formData, photos: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photos") {
        for (let i = 0; i < formData.photos.length; i++) {
          payload.append("photos[]", formData.photos[i]);
        }
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      await authApi().post('/listings', payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Listing added successfully!");
      setFormData({
        title: "",
        price: "",
        description: "",
        subcategory_id: "",
        // location: "",
        photos: [],
      });
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Listing</h2>

      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2 focus:ring focus:ring-blue-300"
            placeholder="What are you selling?"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2 focus:ring focus:ring-blue-300"
            placeholder="₱0.00"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
          )}
        </div>

        {/* Category + Subcategory */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2 focus:ring focus:ring-blue-300"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                {/* Main category (disabled) */}
                <option disabled className="font-semibold">
                  {category.name}
                </option>
                {/* Subcategories (selectable) */}
                {category.subcategories &&
                  category.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      &nbsp;&nbsp;— {sub.name}
                    </option>
                  ))}
              </React.Fragment>
            ))}
          </select>
          {errors.subcategory_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subcategory_id[0]}
            </p>
          )}
        </div>

        {/* Location */}
        {/* <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2 focus:ring focus:ring-blue-300"
            placeholder="e.g. Quezon City"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>
          )}
        </div> */}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full rounded-lg border p-2 focus:ring focus:ring-blue-300"
            placeholder="Add more details about your item"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description[0]}
            </p>
          )}
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium">Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-700"
          />
          {errors.photos && (
            <p className="text-red-500 text-sm mt-1">{errors.photos[0]}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 text-white py-2 px-4 font-semibold hover:bg-blue-700 transition"
          >
            Post Listing
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate('/listings') }
            className="w-full rounded-xl bg-red-600 text-white py-2 px-4 font-semibold hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingForm;
