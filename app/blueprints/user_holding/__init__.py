from flask import Blueprint

bp = Blueprint('user_holding', __name__, url_prefix='')

from . import user_holding_routes