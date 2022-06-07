from app import db, login
from flask_login import UserMixin, current_user
from datetime import datetime as dt
from werkzeug.security import generate_password_hash, check_password_hash

user_holdings = db.Table('user_holdings',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('asset_id', db.Integer, db.ForeignKey('asset.id'))
)

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
    bank = db.Column(db.Numeric(15,2))
    created_on = db.Column(db.DateTime, default=dt.utcnow)
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