from app import db, login
from flask_login import UserMixin, current_user
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

# Table to link users and assets
user_holdings = db.Table('user_holdings',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('asset_id', db.Integer, db.ForeignKey('asset.id'))
)

# Table to link users and leagues
user_leagues = db.Table('user_leagues',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('league_id', db.Integer, db.ForeignKey('league.id'))
)

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
        'Asset',
        secondary = user_holdings,
        backref = 'users',
        lazy = 'dynamic'
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

    # Salt and hash password
    def hash_password(self, created_password):
        return generate_password_hash(created_password)

    # Check password submitted at login with hashed password in database
    def confirm_password(self, login_password):
        return check_password_hash(self.password, login_password)

    # Set user info based on registration
    def reg_to_db(self, reg_data):
        self.first_name = reg_data['first_name'].lower().strip()
        self.last_name = reg_data['last_name'].lower().strip()
        self.display_name = reg_data['display_name'].lower().strip()
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
            'first_name': self.first_name,
            'last_name': self.last_name,
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

    # Get token upon login for token auth
    def get_token(self, exp=24):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(hours=exp)
        self.save()
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
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    max_players = db.Column(db.Integer)

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    symbol = db.Column(db.String)
    type = db.Column(db.String)