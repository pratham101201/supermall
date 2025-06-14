import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { useShops } from '../hooks/useApi';

const Shops = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const { data: shopsData, loading, error } = useShops();

  const categories = [
    'All Categories',
    'Fashion & Clothing',
    'Electronics',
    'Food & Dining',
    'Health & Beauty',
    'Sports & Fitness',
    'Home & Garden',
    'Books & Media'
  ];

  const shops = shopsData?.shops || [];

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Shops</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shops</span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing shops and businesses in your area
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All Categories' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredShops.length} of {shops.length} shops
          </p>
        </motion.div>

        {/* Shops Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }
        >
          {filteredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Shop Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : ''}`}>
                <img
                  src={shop.image_url || 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg'}
                  alt={shop.name}
                  className={`object-cover hover:scale-110 transition-transform duration-300 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                  }`}
                />
                
                {/* Status */}
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    shop.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      shop.is_active ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span>{shop.is_active ? 'Open' : 'Closed'}</span>
                  </div>
                </div>
              </div>

              {/* Shop Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors duration-200">
                    {shop.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{shop.category}</p>
                </div>

                {viewMode === 'list' && shop.description && (
                  <p className="text-gray-600 mb-4">{shop.description}</p>
                )}

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 font-semibold">{shop.rating || 4.5}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({shop.total_reviews || 0} reviews)</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{shop.location || shop.address}</span>
                </div>

                {/* View Shop Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold">
                  View Shop
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredShops.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No shops found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shops;