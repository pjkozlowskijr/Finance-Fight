from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

login = LoginManager()
db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)
app.config.from_object(Config)

login.init_app(app)
db.init_app(app)
migrate.init_app(app, db)

from .blueprints.asset import bp as asset_bp
app.register_blueprint(asset_bp)

from .blueprints.league import bp as league_bp
app.register_blueprint(league_bp)

from .blueprints.user import bp as user_bp
app.register_blueprint(user_bp)

from .blueprints.user_holding import bp as user_holding_bp
app.register_blueprint(user_holding_bp)

from app import models