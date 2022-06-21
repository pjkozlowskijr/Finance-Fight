from . import bp as user
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User
from flask import make_response, g, request, abort
import os
import requests

# #########################
# USER ROUTES
# #########################

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if user is None:
        return False
    g.current_user = user
    return user.confirm_password(password)

@token_auth.verify_token
def verify_token(token):
    user = User.check_token(token) if token else None
    g.current_user = user
    return user

@user.post('/user')
def create_user():
    '''
        Creates a new user. No auth required. Expected payload:
        {
            "avatar": STRING,
            "display_name": STRING,
            "email": STRING,
            "first_name": STRING,
            "last_name": STRING,
            "password": STRING
        }
    '''
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        abort(422)
    new_user = User()
    new_user.reg_to_db(data)
    new_user.save_user()
    return make_response(f'Successfully created user {new_user.__str__()}.', 200)

@user.get('/login')
@basic_auth.login_required()
def login():
    '''
        Logs user in to receive token. Requires basic auth header.
        HTTP Header = "Authorization: Basic <base64 encoded(email:password)>
        Will return user info including token and except password.
    '''
    g.current_user.get_token()
    return make_response(g.current_user.to_dict(), 200)

@user.post('/logout')
@token_auth.login_required()
def logout():
    g.current_user.token = None
    g.current_user.save_user()
    return make_response('Successfully logged out.', 200)

@user.put('/user')
@token_auth.login_required()
def edit_user():
    '''
        Edits user profile. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
        Expected payload (all are NOT required...omitted values remain unchanged):
        {
            "avatar": STRING,
            "display_name": STRING,
            "email": STRING,
            "first_name": STRING,
            "last_name": STRING,
            "password": STRING
        }
    '''
    data = request.get_json()
    g.current_user.from_dict(data)
    g.current_user.save_user()
    return make_response(f'Successfully edited user {g.current_user.__str__()}.', 200)

@user.delete('/user')
@token_auth.login_required()
def delete_user():
    '''
        Deletes the user from database. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    g.current_user.delete_user()
    return make_response('Successfully deleted user.', 200)

@user.get('/user/assets')
@token_auth.login_required()
def get_user_assets():
    '''
        Gets ALL user assets. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    assets = [asset.to_dict() for asset in g.current_user.assets]
    return make_response({'assets':assets}, 200)

@user.get('/user/all')
def get_all_users():
    '''
        Gets ALL users. No auth required.
        For use when viewing user leaderboard.
    '''
    users = User.query.order_by(User.bank.desc()).all()
    users = [user.to_dict() for user in users]
    return make_response({'users':users}, 200)

@user.get('/user')
@token_auth.login_required()
def get_user_info():
    '''
        Gets user info and sends to front end for updates.
        For example, if user makes purchase and bank updates.
        Info updates in DB, but needs to be called to front end for display.
        Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    user = g.current_user.to_dict()
    return make_response({'user':user}, 200)

@user.get('/user/assets/values')
@token_auth.login_required()
def get_user_asset_values():
    '''
        Gets current price of user's assets. Token auth required. 
        Utilizes FMP_API_KEY to get current price only.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    FINAGE_API_KEY = os.environ.get('FINAGE_API_KEY')
    CMC_API_KEY = os.environ.get('CMC_API_KEY')
    cmc_headers = {'X-CMC_PRO_API_KEY': CMC_API_KEY}
    stock_string = ''
    crypto_string = ''
    for asset in g.current_user.assets:
        if asset.type == 'stock':
            stock_string += (asset.symbol.upper()+',')
        elif asset.type == 'crypto':
            crypto_string += (asset.symbol.upper()+',')

    if stock_string != '':
        price_dict = {}
        finage_url_base = f'https://api.finage.co.uk/last/trade/stocks/?symbols={stock_string}&apikey={FINAGE_API_KEY}'
        finage_response = requests.get(finage_url_base)
        finage_data = finage_response.json()
        for asset in finage_data:
            price_dict[asset['symbol']] = {
                'price': asset['price']
            }
    if crypto_string != '':
        if not price_dict:
            price_dict = {}
        cmc_url_base = f'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol={crypto_string}'
        cmc_response = requests.get(cmc_url_base, headers=cmc_headers)
        cmc_data = cmc_response.json()
        for asset in cmc_data['data']:
            price_dict[asset] = {
                'price': cmc_data[asset]['quote']['USD']['price']
            }

    return make_response(price_dict, 200)
