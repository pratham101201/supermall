# SuperMall Backend API
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///supermall.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Database Models
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='customer')  # customer, shop_owner, admin
    phone = db.Column(db.String(20))
    profile_image = db.Column(db.String(500))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    shops = db.relationship('Shop', backref='owner', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'phone': self.phone,
            'profile_image': self.profile_image,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Shop(db.Model):
    __tablename__ = 'shops'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    address = db.Column(db.Text, nullable=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    website = db.Column(db.String(200))
    image_url = db.Column(db.String(500))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Float, default=0.0)
    total_reviews = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    products = db.relationship('Product', backref='shop', lazy=True)
    offers = db.relationship('Offer', backref='shop', lazy=True)
    reviews = db.relationship('Review', backref='shop', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'location': self.location,
            'address': self.address,
            'phone': self.phone,
            'email': self.email,
            'website': self.website,
            'image_url': self.image_url,
            'rating': self.rating,
            'total_reviews': self.total_reviews,
            'is_active': self.is_active,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    image_url = db.Column(db.String(500))
    stock_quantity = db.Column(db.Integer, default=0)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'shop_id': self.shop_id,
            'image_url': self.image_url,
            'stock_quantity': self.stock_quantity,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Offer(db.Model):
    __tablename__ = 'offers'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    discount_percentage = db.Column(db.Float)
    discount_amount = db.Column(db.Float)
    offer_type = db.Column(db.String(20), nullable=False)  # percentage, amount, bogo, free_delivery
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        shop = Shop.query.get(self.shop_id)
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'discount_percentage': self.discount_percentage,
            'discount_amount': self.discount_amount,
            'offer_type': self.offer_type,
            'shop_id': self.shop_id,
            'shop_name': shop.name if shop else '',
            'product_id': self.product_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'is_active': self.is_active,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'shop_id': self.shop_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        user = User(
            name=data['name'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            role=data.get('role', 'customer')
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Shop Routes
@app.route('/api/shops', methods=['GET'])
def get_shops():
    try:
        shops = Shop.query.filter_by(is_active=True).all()
        return jsonify({
            'shops': [shop.to_dict() for shop in shops]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/shops', methods=['POST'])
@jwt_required()
def create_shop():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'category', 'location', 'address']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new shop
        shop = Shop(
            name=data['name'],
            description=data.get('description', ''),
            category=data['category'],
            location=data['location'],
            address=data['address'],
            phone=data.get('phone', ''),
            email=data.get('email', ''),
            website=data.get('website', ''),
            image_url=data.get('image_url', ''),
            owner_id=current_user_id,
            latitude=data.get('latitude'),
            longitude=data.get('longitude')
        )
        
        db.session.add(shop)
        db.session.commit()
        
        return jsonify({
            'message': 'Shop created successfully',
            'shop': shop.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/shops/<int:shop_id>', methods=['GET'])
def get_shop(shop_id):
    try:
        shop = Shop.query.get_or_404(shop_id)
        return jsonify({'shop': shop.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Product Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        shop_id = request.args.get('shop_id')
        category = request.args.get('category')
        
        query = Product.query.filter_by(is_available=True)
        
        if shop_id:
            query = query.filter_by(shop_id=shop_id)
        
        if category:
            query = query.filter_by(category=category)
        
        products = query.all()
        
        return jsonify({
            'products': [product.to_dict() for product in products]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'price', 'category', 'shop_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Verify shop ownership
        shop = Shop.query.get_or_404(data['shop_id'])
        if shop.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Create new product
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=data['price'],
            category=data['category'],
            shop_id=data['shop_id'],
            image_url=data.get('image_url', ''),
            stock_quantity=data.get('stock_quantity', 0)
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': product.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Offer Routes
@app.route('/api/offers', methods=['GET'])
def get_offers():
    try:
        current_date = datetime.utcnow()
        offers = Offer.query.filter(
            Offer.is_active == True,
            Offer.start_date <= current_date,
            Offer.end_date >= current_date
        ).all()
        
        return jsonify({
            'offers': [offer.to_dict() for offer in offers]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/offers', methods=['POST'])
@jwt_required()
def create_offer():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'offer_type', 'shop_id', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Verify shop ownership
        shop = Shop.query.get_or_404(data['shop_id'])
        if shop.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Parse dates
        start_date = datetime.fromisoformat(data['start_date'].replace('Z', '+00:00'))
        end_date = datetime.fromisoformat(data['end_date'].replace('Z', '+00:00'))
        
        # Create new offer
        offer = Offer(
            title=data['title'],
            description=data.get('description', ''),
            discount_percentage=data.get('discount_percentage'),
            discount_amount=data.get('discount_amount'),
            offer_type=data['offer_type'],
            shop_id=data['shop_id'],
            product_id=data.get('product_id'),
            start_date=start_date,
            end_date=end_date,
            image_url=data.get('image_url', '')
        )
        
        db.session.add(offer)
        db.session.commit()
        
        return jsonify({
            'message': 'Offer created successfully',
            'offer': offer.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Review Routes
@app.route('/api/reviews', methods=['POST'])
@jwt_required()
def create_review():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['rating', 'shop_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new review
        review = Review(
            rating=data['rating'],
            comment=data.get('comment', ''),
            user_id=current_user_id,
            shop_id=data['shop_id']
        )
        
        db.session.add(review)
        
        # Update shop rating
        shop = Shop.query.get(data['shop_id'])
        reviews = Review.query.filter_by(shop_id=data['shop_id']).all()
        if reviews:
            total_rating = sum([r.rating for r in reviews])
            shop.rating = total_rating / len(reviews)
            shop.total_reviews = len(reviews)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Search Route
@app.route('/api/search', methods=['GET'])
def search():
    try:
        query = request.args.get('q', '')
        category = request.args.get('category')
        location = request.args.get('location')
        
        # Search shops
        shop_query = Shop.query.filter(Shop.is_active == True)
        
        if query:
            shop_query = shop_query.filter(
                Shop.name.contains(query) | 
                Shop.description.contains(query)
            )
        
        if category:
            shop_query = shop_query.filter(Shop.category == category)
        
        if location:
            shop_query = shop_query.filter(Shop.location.contains(location))
        
        shops = shop_query.all()
        
        # Search products
        product_query = Product.query.filter(Product.is_available == True)
        
        if query:
            product_query = product_query.filter(
                Product.name.contains(query) | 
                Product.description.contains(query)
            )
        
        if category:
            product_query = product_query.filter(Product.category == category)
        
        products = product_query.all()
        
        result = {
            'shops': [shop.to_dict() for shop in shops],
            'products': [product.to_dict() for product in products]
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'SuperMall API is running'}), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# Initialize database
def create_tables():
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

if __name__ == '__main__':
    create_tables()
    app.run(debug=True, host='0.0.0.0', port=5000)