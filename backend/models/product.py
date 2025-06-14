from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float)  # For discount calculations
    category = db.Column(db.String(50), nullable=False, index=True)
    subcategory = db.Column(db.String(50))
    
    # Product details
    sku = db.Column(db.String(50), unique=True)
    brand = db.Column(db.String(50))
    tags = db.Column(db.JSON)  # Store as JSON array
    
    # Images
    image_url = db.Column(db.String(500))
    image_urls = db.Column(db.JSON)  # Multiple images as JSON array
    
    # Inventory
    stock_quantity = db.Column(db.Integer, default=0)
    low_stock_threshold = db.Column(db.Integer, default=10)
    
    # Status
    is_available = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)
    
    # Shop relationship
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    offers = db.relationship('Offer', backref='product', lazy=True, cascade='all, delete-orphan')
    
    @property
    def is_low_stock(self):
        """Check if product is low in stock"""
        return self.stock_quantity <= self.low_stock_threshold
    
    @property
    def is_in_stock(self):
        """Check if product is in stock"""
        return self.stock_quantity > 0
    
    def to_dict(self, include_shop=False):
        """Convert product to dictionary"""
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'original_price': self.original_price,
            'category': self.category,
            'subcategory': self.subcategory,
            'sku': self.sku,
            'brand': self.brand,
            'tags': self.tags,
            'image_url': self.image_url,
            'image_urls': self.image_urls,
            'stock_quantity': self.stock_quantity,
            'low_stock_threshold': self.low_stock_threshold,
            'is_available': self.is_available,
            'is_featured': self.is_featured,
            'is_low_stock': self.is_low_stock,
            'is_in_stock': self.is_in_stock,
            'shop_id': self.shop_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_shop and self.shop:
            data['shop'] = self.shop.to_dict()
        
        return data
    
    def __repr__(self):
        return f'<Product {self.name}>'