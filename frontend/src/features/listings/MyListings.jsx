import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { authApi } from '../../api/authApi';
import LoadingScreen from '../../components/LoadingScreen';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

export default function MyListings() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const res = await authApi().get('/my-listings');
        setProducts(res.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await authApi().delete(`listings/${id}`); // Replace with your API endpoint
      // Remove listing from state
      setListings(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete listing. Please try again.");
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/listings/${id}/edit`); // Redirect to the edit page
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">My Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={product.photos[0]?.url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${product.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {product.status}
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium">{product.title}</h2>
                <p className="text-gray-600 mt-1">₱{formatPrice(product.price)}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)} 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
