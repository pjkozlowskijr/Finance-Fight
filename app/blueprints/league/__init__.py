from flask import Blueprint

bp = Blueprint('league', __name__, url_prefix='')

from . import league_routes