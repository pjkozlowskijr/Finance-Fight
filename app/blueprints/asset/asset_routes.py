from . import bp as asset
from app.models import Asset
from flask import make_response, g, request, abort
from app.blueprints.user.user_routes import token_auth

@asset.post('/asset')
@token_auth.login_required()
def post_asset():
    data = request.get_json()
    new_asset = Asset()
    new_asset.asset_to_db(data)
    new_asset.save_asset()
    return make_response('SUCCESS', 200)

@asset.get('/asset/<string:sym>')
def get_asset(sym):
    return make_response(Asset.query.filter_by(symbol=sym).to_dict(), 200)
