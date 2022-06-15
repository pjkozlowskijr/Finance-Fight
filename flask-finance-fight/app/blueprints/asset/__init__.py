from flask import Blueprint

bp = Blueprint('asset', __name__, url_prefix='')

from . import asset_routes