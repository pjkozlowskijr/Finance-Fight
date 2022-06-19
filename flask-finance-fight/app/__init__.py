from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
import os

app = Flask(__name__)
app.config.from_object(Config)

login = LoginManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
if os.environ.get('FLASK_ENV') == 'development':
    cors = CORS(app)

from .blueprints.asset import bp as asset_bp
app.register_blueprint(asset_bp)

from .blueprints.user import bp as user_bp
app.register_blueprint(user_bp)

from app import models