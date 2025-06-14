import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Clock, 
  Star, 
  ArrowRight,
  Percent,
  Gift,
  Zap,
  TrendingUp
} from 'lucide-react';

const TrendingOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'Summer Fashion Sale',
      description: 'Get up to 70% off on summer collection',
      shop: 'Fashion Hub',
      category: 'Fashion',
      discount: '70%',
      originalPrice: 299,
      salePrice: 89,
      image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
      expiresIn: '2 days',
      type: 'percentage',
      isTrending: true,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Tech Gadgets Bonanza',
      description: 'Latest smartphones and accessories',
      shop: 'TechnoWorld',
      category: 'Electronics',
      discount: '45%',
      originalPrice: 899,
      salePrice: 494,
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      expiresIn: '5 days',
      type: 'percentage',
      isTrending: true,
      rating: 4.7
    },
    {
      id: 3,
      title: 'Buy 1 Get 1 Free',
      description: 'Special deal on all beauty products',
      shop: 'Beauty Boutique',
      category: 'Beauty',
      discount: 'BOGO',
      originalPrice: 149,
      salePrice: 149,
      image: 'https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg',
      expiresIn: '1 week',
      type: 'bogo',
      isTrending: false,
      rating: 4.6
    },
    {
      id: 4,
      title: 'Happy Hour Special',
      description: 'All beverages at 50% off from 3-6 PM',
      shop: 'Gourmet Kitchen',
      category: 'Food',
      discount: '50%',
      originalPrice: 25,
      salePrice: 12.5,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      expiresIn: 'Daily',
      type: 'percentage',
      isTrending: true,
      rating: 4.9
    },
    {
      id: 5,
      title: 'Electronics Clearance',
      description: 'Limited time offer on selected items',
      shop: 'TechnoWorld',
      category: 'Electronics',
      discount: '60%',
      originalPrice: 599,
      salePrice: 239,
      image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
      expiresIn: '3 days',
      type: 'percentage',
      isTrending: false,
      rating: 4.5
    },
    {
      id: 6,
      title: 'Weekend Special',
      description: 'Free delivery on orders above $50',
      shop: 'Fashion Hub',
      category: 'Fashion',
      discount: 'Free Delivery',
      originalPrice: 0,
      salePrice: 0,
      image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
      expiresIn: 'Weekend',
      type: 'free_delivery',
      isTrending: false,
      rating: 4.7
    }
  ];

  const getDiscountIcon = (type) => {
    switch (type) {
      case 'percentage':
        return Percent;
      case 'bogo':
        return Gift;
      case 'free_delivery':
        return Zap;
      default:
        return Tag;
    }
  };

  const getDiscountColor = (type) => {
    switch (type) {
      case 'percentage':
        return 'from-red-500 to-pink-500';
      case 'bogo':
        return 'from-green-500 to-teal-500';
      case 'free_delivery':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <section className="py-20 bg-white">
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
            Trending <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Offers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these limited-time deals and exclusive offers from our partner shops
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => {
            const DiscountIcon = getDiscountIcon(offer.type);
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Offer Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${getDiscountColor(offer.type)} text-white font-bold text-sm shadow-lg`}>
                    <DiscountIcon className="w-4 h-4 inline mr-1" />
                    {offer.discount} OFF
                  </div>

                  {/* Trending Badge */}
                  {offer.isTrending && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-semibold flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}

                  {/* Timer */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{offer.expiresIn} left</span>
                  </div>
                </div>

                {/* Offer Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-200">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                    
                    {/* Shop & Category */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium">{offer.shop}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{offer.category}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  {offer.type !== 'free_delivery' && (
                    <div className="flex items-center space-x-3 mb-4">
                      {offer.originalPrice > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ${offer.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-red-600">
                        ${offer.salePrice}
                      </span>
                      {offer.type === 'bogo' && (
                        <span className="text-green-600 font-semibold text-sm">
                          + 1 Free
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 font-semibold text-sm">{offer.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">Highly Rated</span>
                  </div>

                  {/* Claim Offer Button */}
                  <Link
                    to={`/offers/${offer.id}`}
                    className="block w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-center py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 font-semibold group"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Claim Offer</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/offers"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>View All Offers</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingOffers;