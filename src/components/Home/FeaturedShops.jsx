import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight,
  Badge,
  Zap
} from 'lucide-react';

const FeaturedShops = () => {
  const featuredShops = [
    {
      id: 1,
      name: 'Fashion Hub',
      category: 'Fashion & Clothing',
      image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
      rating: 4.8,
      reviews: 234,
      location: 'Downtown Mall, Level 2',
      isOpen: true,
      badge: 'Premium',
      offers: ['Up to 50% Off', 'Buy 1 Get 1 Free']
    },
    {
      id: 2,
      name: 'TechnoWorld',
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      rating: 4.7,
      reviews: 189,
      location: 'Tech Center, Ground Floor',
      isOpen: true,
      badge: 'Trending',
      offers: ['New Arrivals', 'Extended Warranty']
    },
    {
      id: 3,
      name: 'Gourmet Kitchen',
      category: 'Food & Dining',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      rating: 4.9,
      reviews: 412,
      location: 'Food Court, Level 3',
      isOpen: false,
      badge: 'Popular',
      offers: ['Happy Hour 3-6 PM', 'Weekend Special']
    },
    {
      id: 4,
      name: 'Beauty Boutique',
      category: 'Health & Beauty',
      image: 'https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg',
      rating: 4.6,
      reviews: 156,
      location: 'Cosmetics Wing, Level 1',
      isOpen: true,
      badge: 'New',
      offers: ['Free Consultation', 'Makeup Trials']
    }
  ];

  const badgeColors = {
    Premium: 'bg-gradient-to-r from-amber-500 to-orange-500',
    Trending: 'bg-gradient-to-r from-green-500 to-teal-500',
    Popular: 'bg-gradient-to-r from-pink-500 to-rose-500',
    New: 'bg-gradient-to-r from-blue-500 to-indigo-500'
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shops</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium shops offering the best products and services
          </p>
        </motion.div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Shop Image */}
              <div className="relative overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${badgeColors[shop.badge]}`}>
                  {shop.badge}
                </div>

                {/* Status */}
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    shop.isOpen 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      shop.isOpen ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span>{shop.isOpen ? 'Open' : 'Closed'}</span>
                  </div>
                </div>

                {/* Offers */}
                <div className="absolute bottom-4 left-4 right-4">
                  {shop.offers.slice(0, 1).map((offer, idx) => (
                    <div key={idx} className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                      <Zap className="w-3 h-3 inline mr-1" />
                      {offer}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {shop.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{shop.category}</p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 font-semibold">{shop.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({shop.reviews} reviews)</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{shop.location}</span>
                </div>

                {/* View Shop Button */}
                <Link
                  to={`/shops/${shop.id}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>View Shop</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/shops"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>View All Shops</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedShops;