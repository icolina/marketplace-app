import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { authApi } from '../../api/authApi';
import LoadingScreen from '../../components/LoadingScreen';
import { formatPrice } from '../../utils/formatPrice';
import ListingDetails from './ListingDetails';
import ButtonLink from '../../components/ButtonLink';

export default function Listings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          authApi().get('/listings'),
          authApi().get('/categories'),
        ]);

        // if (!productsRes.data) throw new Error("Failed to fetch listings");
        // if (!categoriesRes.data) throw new Error("Failed to fetch categories");
        setProducts(productsRes.data.data || []);

        // Convert categories to { categoryName: [subcategories...] }
        const formattedCategories = {};
        (categoriesRes.data.data || []).forEach((cat) => {
          formattedCategories[cat.name] = cat.subcategories.map((sub) => sub.name);
        });
        setCategories(formattedCategories);

        setFilteredProducts(productsRes.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) => p.subcategory.category.name === selectedCategory);
    }
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory.name === selectedSubcategory);
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedSubcategory, products]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <MainLayout>
      <div className="flex p-6 gap-6">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-white shadow rounded-2xl p-4">
          <div className="mb-8">
            <ButtonLink to="/listings/new" className="w-full">
              Add New Listing
            </ButtonLink>
          </div>

          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div>
            <h3 className="text-md font-medium mb-2">Categories</h3>
            <ul className="space-y-2">
              {Object.keys(categories).map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer px-3 py-2 rounded-md ${selectedCategory === cat ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory(null);
                  }}
                >
                  {cat}
                </li>
              ))}
              <li
                className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-500"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
              >
                Clear Filters
              </li>
            </ul>
          </div>

          {selectedCategory && categories[selectedCategory] && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Subcategories</h3>
              <ul className="space-y-2">
                {categories[selectedCategory].map((sub) => (
                  <li
                    key={sub}
                    className={`cursor-pointer px-3 py-2 rounded-md ${selectedSubcategory === sub ? "bg-green-500 text-white" : "hover:bg-gray-100"
                      }`}
                    onClick={() => setSelectedSubcategory(sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
                  onClick={() => handleOpenProduct(product)}
                >
                  <img
                    src={product.photos[0].url || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-blue-600 font-bold">
                      ₱{formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.subcategory?.category?.name} → {product.subcategory?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        { selectedProduct && (
          <ListingDetails
            product={selectedProduct}
            open={open}
            onClose={setOpen}
          />
        )}
      </div>
    </MainLayout>
  );
}
