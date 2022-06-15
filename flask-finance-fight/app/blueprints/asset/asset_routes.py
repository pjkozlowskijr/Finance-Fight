from . import bp as asset
from app.models import Asset, User_Holding
from flask import make_response, request, g
from app.blueprints.user.user_routes import token_auth

# #########################
# ASSET ROUTES
# #########################

@asset.post('/asset')
@token_auth.login_required()
def purchase_asset():
    '''
        Adds asset to user's holdings. Updates both the Asset & User_Holding table. If asset details are NOT already in DB, creates asset in DB. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
        Expected payload:
        {
            "name": STRING,
            "symbol": STRING,
            "type": STRING (stock/crypto),
            "purchase_price": NUMERIC (15,2),
            "quantity": INTEGER
        }
    '''
    data = request.get_json()
    user_holding = User_Holding()
    user_holding.user_holding_to_db(data)
    if Asset.query.filter_by(symbol=data['symbol']).first():
        asset = Asset.query.filter_by(symbol=data['symbol']).first()
    else:
        asset = Asset()
        asset.asset_to_db(data)
    user_holding.asset = asset
    user_holding.user = g.current_user
    user_holding.save_user_holding()
    return make_response('SUCCESS', 200)

@asset.delete('/asset/<int:asset_id>')
@token_auth.login_required()
def sell_asset(asset_id):
    '''
        Removes an asset from user's holdings. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    user_holding = User_Holding.query.filter_by(user_id = g.current_user.id, asset_id = asset_id).first()
    user_holding.delete_user_holding()
    return make_response('SUCCESS', 200)

# MIGHT NOT NEED THIS???
# @asset.get('/asset/<string:sym>')
# def get_asset(sym):
#     return make_response(Asset.query.filter_by(symbol=sym).to_dict(), 200)
