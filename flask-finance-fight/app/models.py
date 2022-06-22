from app import db
from flask_login import UserMixin
from flask import g
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

# #############################################
# Association table to link user & assets
# #############################################

user_assets = db.Table('user_assets',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('asset_id', db.Integer, db.ForeignKey('asset.id'))
    )

# #########################
# USER MODEL
# #########################

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    display_name = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True, index=True)
    password = db.Column(db.String)
    avatar = db.Column(db.String)
    bank = db.Column(db.Numeric(15,2), default=10000)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    token = db.Column(db.String, unique=True, index=True)
    token_exp = db.Column(db.DateTime)
    assets = db.relationship(
        'Asset',
        secondary = user_assets,
        backref = 'users',
        lazy = 'dynamic'
    )
    purchases = db.relationship(
        'Purchase',
        backref = 'user'
    )

    def __repr__(self):
        return f'<User email: {self.email} | User ID: {self.id}>'

    def __str__(self):
        return f'<User email: {self.email} | User name: {self.first_name} {self.last_name}>'

    # Set user info based on registration
    def reg_to_db(self, reg_data):
        self.first_name = reg_data['first_name'].lower().strip()
        self.last_name = reg_data['last_name'].lower().strip()
        self.display_name = reg_data['display_name'].strip()
        self.email = reg_data['email'].lower().strip()
        self.password = self.hash_password(reg_data['password'])
        # self.avatar = reg_data['avatar']

    # Pulls data from editing profile to update existing database
    def from_dict(self, data):
        for field in ['avatar', 'display_name', 'email', 'first_name', 'last_name', 'password']:
            if field in data:
                if data[field] == '':
                    continue
                else:
                    if field == 'password':  
                        setattr(self, field, self.hash_password(data[field]))
                    else:
                        setattr(self, field, data[field])

    # Packages user info from DB to send to user via make_response
    def to_dict(self):
        qty_assets = 0
        total_cost = 0
        for purchase in self.purchases:
            qty_assets += purchase.quantity
            total_cost += purchase.quantity * purchase.price
        return{
            'id': self.id,
            'first_name': self.first_name.title(),
            'last_name': self.last_name.title(),
            'display_name': self.display_name,
            'bank':self.bank,
            'qty_company': len([asset for asset in self.assets]),
            'qty_assets': qty_assets,
            'asset_costs': total_cost,
            'email': self.email,
            'created_on': self.created_on,
            'token': self.token,
            'token_exp': self.token_exp
        }

    def save_user(self):
        db.session.add(self)
        db.session.commit()

    def delete_user(self):
        db.session.delete(self)
        db.session.commit()

    # Purchase asset
    def purchase_asset(self, asset, purchase):
        new_asset = Asset.query.filter_by(symbol = asset.symbol.lower()).first()
        if new_asset not in self.assets:
            self.assets.append(new_asset)
        new_purchase = Purchase.query.get(purchase.id)
        self.purchases.append(new_purchase)
        self.bank = float(self.bank) - (float(new_purchase.price) * new_purchase.quantity)
        self.save_user()

    # Check quantity available to sell
    def check_quantity(self, asset_symbol):
        purchases = Purchase.query.filter_by(symbol = asset_symbol).all()
        qty_available = 0
        for purchase in purchases:
            qty_available += purchase.quantity
        return qty_available

    # Sell asset
    def sell_asset(self, sell_data, sell_quantity):
        asset = Asset.query.filter_by(symbol = sell_data['symbol'].lower()).first()
        self.bank = float(self.bank) + (sell_quantity * float(sell_data['price']))
        purchases = Purchase.query.filter_by(symbol = asset.symbol, user_id = g.current_user.id).order_by(Purchase.purchase_date.asc()).all()
        print(purchases)
        qty_removal = sell_quantity
        for purchase in purchases:
            if qty_removal >= purchase.quantity:
                qty_removal -= purchase.quantity
                self.purchases.remove(purchase)
                if qty_removal == 0:
                    break
            else:
                purchase.quantity -= qty_removal
                break
        if not Purchase.query.filter_by(symbol = asset.symbol).all():
            self.assets.remove(asset)
        db.session.commit()

    # Salt and hash password
    def hash_password(self, created_password):
        return generate_password_hash(created_password)

    # Check password submitted at login with hashed password in database
    def confirm_password(self, login_password):
        return check_password_hash(self.password, login_password)

    # Get token upon login for token auth
    def get_token(self, exp=24):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(hours=exp)
        self.save_user()
        return self.token

    # Check if user has token and if token is expired
    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if not user or user.token_exp < dt.utcnow():
            return None
        return user

# #########################
# ASSET MODEL
# #########################

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    symbol = db.Column(db.String, unique=True, index=True)
    type = db.Column(db.String)

    def __repr__(self):
        return f'<Asset ID: {self.id} | Asset Name: {self.name}>'

    def __str__(self):
        return f'<Asset ID: {self.id} | Asset Name: {self.name}>'
    
    # Set asset info when user adds to holdings
    def asset_to_db(self, asset_data, type):
        self.name = asset_data['name']
        self.symbol = asset_data['symbol'].lower()
        self.type = type

    # Package asset info from DB to send to user
    def to_dict(self):
        purchases = Purchase.query.filter_by(symbol = self.symbol, user_id = g.current_user.id).all()
        quantity = 0
        value = 0
        for purchase in purchases:
            quantity += purchase.quantity
            value += purchase.quantity * float(purchase.price)
        return{
            'id': self.id,
            'name': self.name.title(),
            'symbol': self.symbol,
            'type': self.type.title(),
            'quantity': quantity,
            'value': value 
        }

    def save_asset(self):
        db.session.add(self)
        db.session.commit()

    def delete_asset(self):
        db.session.delete(self)
        db.session.commit()

# #########################
# PURCHASE MODEL
# #########################

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String, index=True)
    price = db.Column(db.Numeric(15,2))
    quantity = db.Column(db.Integer)
    purchase_date = db.Column(db.DateTime, default=dt.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Purchase ID: {self.id} | User ID: {self.user_id}>'

    def __str__(self):
        return f'<Purchase ID: {self.id} | Asset Symbol: {self.symbol}>'
    
    # Set info when purchase made
    def purchase_to_db(self, asset_data, quantity):
        self.symbol = asset_data['symbol'].lower()
        self.price = asset_data['price']
        self.quantity = quantity

    # Package purchase info from DB to send to user
    def to_dict(self):
        return{
            'id': self.id,
            'symbol': self.symbol,
            'price': self.price,
            'quantity': self.quantity,
        }

    def save_purchase(self):
        db.session.add(self)
        db.session.commit()

    def delete_purchase(self):
        db.session.delete(self)
        db.session.commit()