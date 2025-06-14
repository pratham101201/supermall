from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Shop(db.Model):
    __tablename__ = 'shops'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False, index=True)
    location = db.Column(db.String(200), nullable=False)
    address = db.Column(db.Text, nullable=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    website = db.Column(db.String(200))
    image_url = db.Column(db.String(500))
    cover_image_url = db.Column(db.String(500))
    
    # Location coordinates
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Business details
    opening_hours = db.Column(db.JSON)  # Store as JSON
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Ratings and status
    rating = db.Column(db.Float, default=0.0)
    total_reviews = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    products = db.relationship('Product', backref='shop', lazy=True, cascade='all, delete-orphan')
    offers = db.relationship('Offer', backref='shop', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='shop', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self, include_owner=False):
        """Convert shop to dictionary"""
        data = {
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
            'cover_image_url': self.cover_image_url,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'opening_hours': self.opening_hours,
            'rating': self.rating,
            'total_reviews': self.total_reviews,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_owner and self.owner:
            data['owner'] = self.owner.to_dict()
        
        return data
    
    def update_rating(self):
        """Update shop rating based on reviews"""
        if self.reviews:
            total_rating = sum([review.rating for review in self.reviews])
            self.rating = total_rating / len(self.reviews)
            self.total_reviews = len(self.reviews)
        else:
            self.rating = 0.0
            self.total_reviews = 0
    
    def __repr__(self):
        return f'<Shop {self.name}>'