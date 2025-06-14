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
import { useOffers } from '../../hooks/useApi';

const TrendingOffers = () => {
  const { data: offersData, loading, error } = useOffers();
  
  // Use API data or fallback to static data
  const offers = offersData?.offers?.slice(0, 6) || [
    {
      id: 1,
      title: 'Summer Fashion Sale',
      description: 'Get up to 70% off on summer collection',
      shop_name: 'Fashion Hub',
      category: 'Fashion',
      discount_percentage: 70,
      image_url: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
      offer_type: 'percentage',
      end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 4.8
    },
    {
      id: 2,
      title: 'Tech Gadgets Bonanza',
      description: 'Latest smartphones and accessories',
      shop_name: 'TechnoWorld',
      category: 'Electronics',
      discount_percentage: 45,
      image_url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      offer_type: 'percentage',
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 4.7
    },
    {
      id: 3,
      title: 'Buy 1 Get 1 Free',
      description: 'Special deal on all beauty products',
      shop_name: 'Beauty Boutique',
      category: 'Beauty',
      image_url: 'https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg',
      offer_type: 'bogo',
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 4.6
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

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Ending soon';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
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
      </section>
    );
  }

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
            const DiscountIcon = getDiscountIcon(offer.offer_type);
            const discountText = offer.offer_type === 'percentage' 
              ? `${offer.discount_percentage}%` 
              : offer.offer_type === 'bogo' 
                ? 'BOGO' 
                : 'FREE';
            
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
                    src={offer.image_url}
                    alt={offer.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${getDiscountColor(offer.offer_type)} text-white font-bold text-sm shadow-lg`}>
                    <DiscountIcon className="w-4 h-4 inline mr-1" />
                    {discountText} OFF
                  </div>

                  {/* Trending Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-semibold flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </div>

                  {/* Timer */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeRemaining(offer.end_date)}</span>
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
                      <span className="text-gray-700 font-medium">{offer.shop_name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{offer.category}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 font-semibold text-sm">{offer.rating || 4.5}</span>
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