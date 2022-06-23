# #########################
# USER ROUTES
# #########################

from . import bp as user
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User
from flask import make_response, g, request, abort
import os
import requests

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

# Create user
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
    # If user submits email that already exists, responsd with 422 error
    if User.query.filter_by(email=data.get('email')).first():
        abort(422)
    new_user = User()
    new_user.reg_to_db(data)
    new_user.save_user()
    return make_response(f'Successfully created user {new_user.__str__()}.', 200)

# User login
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

# User logout
@user.post('/logout')
@token_auth.login_required()
def logout():
    g.current_user.token = None
    g.current_user.save_user()
    return make_response('Successfully logged out.', 200)

# Edit user
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

# Delete user
@user.delete('/user')
@token_auth.login_required()
def delete_user():
    '''
        Deletes the user from database. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    g.current_user.delete_user()
    return make_response('Successfully deleted user.', 200)

# Get user assets
@user.get('/user/assets')
@token_auth.login_required()
def get_user_assets():
    '''
        Gets ALL user assets. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    assets = [asset.to_dict() for asset in g.current_user.assets if asset.type == 'stock']
    # Append crypto assets FIRST since that's the order the API's run to fetch data
    for asset in g.current_user.assets:
        if asset.type == 'crypto':
            assets.append(asset.to_dict())

    # Get purchast cost of user's assets
    total_cost = 0
    for item in assets:
        total_cost += item['value']
    return make_response({'assets':assets, 'total_cost':total_cost}, 200)

# Get all users
@user.get('/user/all')
def get_all_users():
    '''
        Gets ALL users & their asset values. No auth required.
        For use when viewing user leaderboard.
    '''
    # Get all users as dictionaries (includes total asset cost)
    users = User.query.order_by(User.bank.desc()).all()
    user_dicts = [user.to_dict() for user in users]

    # Get all users current total asset values
    # Appends all users asset symbols to string based on stock or crypto
    stock_string = []
    crypto_string = []
    for user in users:
        for asset in user.assets:
            if asset.type == 'stock':
                if asset.symbol not in stock_string:
                    stock_string.append(asset.symbol)
            elif asset.type == 'crypto':
                if asset.symbol not in crypto_string:
                    crypto_string.append(asset.symbol)
    stock_string = ','.join(stock_string)
    crypto_string = ','.join(crypto_string)

    FINAGE_API_KEY = os.environ.get('FINAGE_API_KEY')
    finage_headers = {'Accept-Encoding': 'gzip'}
    CMC_API_KEY = os.environ.get('CMC_API_KEY')
    cmc_headers = {'X-CMC_PRO_API_KEY': CMC_API_KEY}

    # If stock string is not empty, get current value of all stock assets
    if stock_string != '':
        prices = {}
        finage_url_base = f'https://api.finage.co.uk/last/trade/stocks/?symbols={stock_string}&apikey={FINAGE_API_KEY}'
        finage_response = requests.get(finage_url_base, headers=finage_headers)
        finage_data = finage_response.json()
        for asset in finage_data:
            prices[asset['symbol'].lower()] = asset['price']

    # If crypto string is not empty, get current value of all crypto assets
    if crypto_string != '':
        if not prices:
            prices = {}
        cmc_url_base = f'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol={crypto_string}'
        cmc_response = requests.get(cmc_url_base, headers=cmc_headers)
        cmc_data = cmc_response.json()
        for asset in cmc_data['data']:
            prices[cmc_data['data'][asset]['symbol'].lower()] = cmc_data['data'][asset]['quote']['USD']['price']

    # Add users total value (bank + assets) and total current asset value to user dict
    for user in users:
        total_value = 0
        for purchase in user.purchases:
            total_value += purchase.quantity * prices[purchase.symbol]
        for dict in user_dicts:
            if dict['display_name'] == user.display_name:
                dict['total_value'] = total_value + float(user.bank)
                dict['asset_value'] = total_value
    
    # Sort user dicts by total value for ranking on leaderboard
    user_dicts = sorted(user_dicts, key=lambda d: d['asset_value'], reverse=True)
    return make_response({'users':user_dicts}, 200)

# Get current user info
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

# Get current user's current asset values
@user.get('/user/assets/values')
@token_auth.login_required()
def get_user_asset_values():
    '''
        Gets current price of user's assets. Token auth required. 
        Utilizes FMP_API_KEY to get current price only.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    FINAGE_API_KEY = os.environ.get('FINAGE_API_KEY')
    finage_headers = {'Accept-Encoding': 'gzip'}
    CMC_API_KEY = os.environ.get('CMC_API_KEY')
    cmc_headers = {'X-CMC_PRO_API_KEY': CMC_API_KEY}

    # Append all asset symbols to string based on asset type (crypto or stock)
    stock_string = ''
    crypto_string = ''
    user_assets = g.current_user.assets
    for asset in user_assets:
        if asset.type == 'stock':
            stock_string += (asset.symbol.upper()+',')
        elif asset.type == 'crypto':
            crypto_string += (asset.symbol.upper()+',')

    # If stock string not empty, get current value of stock assets
    if stock_string != '':
        prices = []
        finage_url_base = f'https://api.finage.co.uk/last/trade/stocks/?symbols={stock_string}&apikey={FINAGE_API_KEY}'
        finage_response = requests.get(finage_url_base, headers=finage_headers)
        finage_data = finage_response.json()
        for asset in finage_data:
            prices.append(asset['price'])

    # If crypto string not empty, get current value of crypto assets
    if crypto_string != '':
        if not prices:
            prices = []
        cmc_url_base = f'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol={crypto_string}'
        cmc_response = requests.get(cmc_url_base, headers=cmc_headers)
        cmc_data = cmc_response.json()
        for asset in cmc_data['data']:
            prices.append(cmc_data['data'][asset]['quote']['USD']['price'])

    # Append all stock assets FIRST, then crypto, since that is order API runs
    user_assets = [asset.to_dict() for asset in g.current_user.assets if asset.type == 'stock']
    for asset in g.current_user.assets:
        if asset.type == 'crypto':
            user_assets.append(asset.to_dict())
    
    #Get total value of user's assets
    total_value = 0
    for ind, item in enumerate(user_assets):
        total_value += prices[ind] * item['quantity']

    return make_response({'prices':prices, 'total_value':total_value}, 200)
