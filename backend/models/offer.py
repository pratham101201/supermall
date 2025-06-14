from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Offer(db.Model):
    __tablename__ = 'offers'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    
    # Discount details
    discount_percentage = db.Column(db.Float)
    discount_amount = db.Column(db.Float)
    offer_type = db.Column(db.String(20), nullable=False)  # percentage, amount, bogo, free_delivery
    
    # Conditions
    minimum_order_value = db.Column(db.Float)
    maximum_discount = db.Column(db.Float)
    usage_limit = db.Column(db.Integer)
    used_count = db.Column(db.Integer, default=0)
    
    # Relationships
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    
    # Validity
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    
    # Images
    image_url = db.Column(db.String(500))
    banner_url = db.Column(db.String(500))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def is_valid(self):
        """Check if offer is currently valid"""
        now = datetime.utcnow()
        return (
            self.is_active and 
            self.start_date <= now <= self.end_date and
            (self.usage_limit is None or self.used_count < self.usage_limit)
        )
    
    @property
    def days_remaining(self):
        """Get number of days remaining for the offer"""
        if not self.is_valid:
            return 0
        
        now = datetime.utcnow()
        if now > self.end_date:
            return 0
        
        delta = self.end_date - now
        return delta.days
    
    def calculate_discount(self, order_value):
        """Calculate discount amount based on order value"""
        if not self.is_valid:
            return 0
        
        if self.minimum_order_value and order_value < self.minimum_order_value:
            return 0
        
        discount = 0
        
        if self.offer_type == 'percentage' and self.discount_percentage:
            discount = order_value * (self.discount_percentage / 100)
            if self.maximum_discount:
                discount = min(discount, self.maximum_discount)
        
        elif self.offer_type == 'amount' and self.discount_amount:
            discount = self.discount_amount
        
        return min(discount, order_value)
    
    def to_dict(self, include_shop=False, include_product=False):
        """Convert offer to dictionary"""
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'discount_percentage': self.discount_percentage,
            'discount_amount': self.discount_amount,
            'offer_type': self.offer_type,
            'minimum_order_value': self.minimum_order_value,
            'maximum_discount': self.maximum_discount,
            'usage_limit': self.usage_limit,
            'used_count': self.used_count,
            'shop_id': self.shop_id,
            'product_id': self.product_id,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_active': self.is_active,
            'is_valid': self.is_valid,
            'days_remaining': self.days_remaining,
            'image_url': self.image_url,
            'banner_url': self.banner_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_shop and self.shop:
            data['shop'] = self.shop.to_dict()
        
        if include_product and self.product:
            data['product'] = self.product.to_dict()
        
        return data
    
    def __repr__(self):
        return f'<Offer {self.title}>'