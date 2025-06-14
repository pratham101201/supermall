// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Shops
  async getShops() {
    return this.request('/shops');
  }

  async getShop(id) {
    return this.request(`/shops/${id}`);
  }

  async createShop(shopData) {
    return this.request('/shops', {
      method: 'POST',
      body: JSON.stringify(shopData),
    });
  }

  async updateShop(id, shopData) {
    return this.request(`/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shopData),
    });
  }

  async deleteShop(id) {
    return this.request(`/shops/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Offers
  async getOffers() {
    return this.request('/offers');
  }

  async createOffer(offerData) {
    return this.request('/offers', {
      method: 'POST',
      body: JSON.stringify(offerData),
    });
  }

  async updateOffer(id, offerData) {
    return this.request(`/offers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(offerData),
    });
  }

  async deleteOffer(id) {
    return this.request(`/offers/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews
  async createReview(reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getReviews(shopId) {
    return this.request(`/reviews?shop_id=${shopId}`);
  }

  // Search
  async search(query, filters = {}) {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/search?${queryString}`);
  }
}

export default new ApiService();