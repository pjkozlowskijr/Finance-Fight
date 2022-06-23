from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
import os

login = LoginManager()
db = SQLAlchemy()
migrate = Migrate()
if os.environ.get('FLASK_ENV') == 'development':
    cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../client/build', static_url_path='')
    app.config.from_object(Config)

    login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    if os.environ.get('FLASK_ENV') == 'development':
        cors.init_app(app)

    from .blueprints.asset import bp as asset_bp
    app.register_blueprint(asset_bp)

    from .blueprints.user import bp as user_bp
    app.register_blueprint(user_bp)

    return app