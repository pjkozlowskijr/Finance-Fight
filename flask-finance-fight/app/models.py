from app import db
from flask_login import UserMixin
from flask import g
from datetime import datetime as dt, timedelta, time
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import pytz

# Table to link users and leagues
user_leagues = db.Table('user_leagues',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('league_id', db.Integer, db.ForeignKey('league.id'))
)

class User_Holding(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), primary_key=True)
    purchase_price = db.Column(db.Numeric(15,2))
    quantity = db.Column(db.Integer)
    user = db.relationship(
        'User',
        back_populates = 'holdings',
    )
    asset = db.relationship(
        'Asset',
        back_populates = 'users',
    )

    def user_holding_to_db(self, asset_data):
        self.purchase_price = asset_data['purchase_price']
        self.quantity = asset_data['quantity']
        self.user_id = g.current_user.id

    def save_user_holding(self):
        db.session.add(self)
        db.session.commit()

    def delete_user_holding(self):
        db.session.delete(self)
        db.session.commit()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    display_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, index=True)
    password = db.Column(db.String)
    avatar = db.Column(db.String)
    wins = db.Column(db.Integer, default=0)
    bank = db.Column(db.Numeric(15,2), default=10000)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    token = db.Column(db.String, unique=True, index=True)
    token_exp = db.Column(db.DateTime)
    holdings = db.relationship(
        'User_Holding',
        back_populates = 'user',
    )
    leagues = db.relationship(
        'League',
        secondary = user_leagues,
        backref = 'users',
        lazy = 'dynamic'
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
        self.avatar = reg_data['avatar']

    # Pulls data from editing profile to update existing database
    def from_dict(self, data):
        for field in ['avatar', 'display_name', 'email', 'first_name', 'last_name', 'password']:
            if field in data:
                if field == 'password':  
                    setattr(self, field, self.hash_password(data[field]))
                else:
                    setattr(self, field, data[field])

    # Packages user info from DB to send to user via make_response
    def to_dict(self):
        return{
            'id': self.id,
            'first_name': self.first_name.title(),
            'last_name': self.last_name.title(),
            'display_name': self.display_name,
            'email': self.email,
            'created_on': self.created_on,
            'token': self.token,
            'token_exp': self.token_exp
        }

    # Save/update user info to database
    def save_user(self):
        db.session.add(self)
        db.session.commit()

    def delete_user(self):
        db.session.delete(self)
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

class League(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer)
    start_date = db.Column(db.Date)
    start_time = db.Column(db.Time, default=(time(hour=0, minute=0, second=0, tzinfo=pytz.utc)))
    end_datetime = db.Column(db.DateTime)     

    def __repr__(self):
        return f'<League ID: {self.id} | League Name: {self.name}>'

    def __str__(self):
        return f'<League ID: {self.id} | League Name: {self.name}>'

    # Set league info based on user input
    def league_to_db(self, league_data):
        self.name = league_data['name'].strip()
        self.owner_id = g.current_user.id
        self.start_date = dt.strptime(league_data['start_date'], '%Y/%m/%d')

    # Packages league info from DB to send to user via make_response
    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'owner': self.owner_id,
            'league_start': dt.combine(self.start_date, self.start_time),
            'league_end': self.end_datetime
        }

    # Save league info to database
    def save_league(self):
        db.session.add(self)
        db.session.commit()
        self.end_datetime = (dt.combine(self.start_date, self.start_time)) + timedelta(days=7)
        db.session.add(self)
        db.session.commit()

    def delete_league(self):
        db.session.delete(self)
        db.session.commit()

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    symbol = db.Column(db.String, unique=True, index=True)
    type = db.Column(db.String)
    users = db.relationship(
        'User_Holding',
        back_populates = 'asset'
    )

    def __repr__(self):
        return f'<Asset ID: {self.id} | Asset Name: {self.name}>'

    def __str__(self):
        return f'<Asset ID: {self.id} | Asset Name: {self.name}>'
    
    # Set asset info when user adds to holdings
    def asset_to_db(self, asset_data):
        self.name = asset_data['name']
        self.symbol = asset_data['symbol']
        self.type = asset_data['type']

    # Package asset info from DB to send to user
    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'type': self.type
        }

    # MAY NOT NEED THIS FUNCTION
    # Save asset info to database
    # def save_asset(self):
    #     db.session.add(self)
    #     db.session.commit()

    def delete_asset(self):
        db.session.delete(self)
        db.session.commit()