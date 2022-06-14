from flask import Blueprint

bp = Blueprint('user', __name__, url_prefix='')

from . import user_routes