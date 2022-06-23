# #########################
# ASSET ROUTES
# #########################

from . import bp as asset
from app.models import Asset, Purchase
from flask import make_response, request, g
from app.blueprints.user.user_routes import token_auth
import os
import requests

# Purchase asset
@asset.post('/asset/purchase/<string:type>/<int:quantity>')
@token_auth.login_required()
def purchase_asset(type, quantity):
    '''
        Adds asset to user's holdings. Updates both the Asset & User_Holding table. If asset details are NOT already in DB, creates asset in DB. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
        Expected JSON payload:
        {
            "name": STRING,
            "symbol": STRING,
            "price": NUMERIC (15,2)
        }
    '''
    data = request.get_json()

    # Check if asset is already in DB, and if so, use that asset
    if Asset.query.filter_by(symbol=data['symbol'].lower()).first():
        asset = Asset.query.filter_by(symbol=data['symbol'].lower()).first()

    # If asset is not already in DB, create it
    else:
        asset = Asset()
        asset.asset_to_db(data, type)
        asset.save_asset()

    # Create purchase record
    purchase = Purchase()
    purchase.purchase_to_db(data, quantity)
    purchase.save_purchase()

    g.current_user.purchase_asset(asset, purchase)
    g.current_user.save_user()
    return make_response(f'Successfully added asset {asset.__str__()} to holdings.', 200)

# Sell asset
@asset.delete('/asset/sell/<string:type>/<string:symbol>/<int:sell_qty>')
@token_auth.login_required()
def sell_asset(type, symbol, sell_qty):
    '''
        Removes an asset from user's holdings. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    asset_symbol = symbol.upper().strip()
    FMP_API_KEY = os.environ.get('FMP_API_KEY')

    # If asset is stock, use FMP stock URL
    if type == 'stock':
        fmp_url_base = f'https://financialmodelingprep.com/api/v3/quote/{asset_symbol}?apikey={FMP_API_KEY}'
        fmp_response = requests.get(fmp_url_base)
        fmp_data = fmp_response.json()
        symbol = fmp_data[0]['symbol'].lower()

    # If asset is crypto, use FMP crypto URL
    if type == 'crypto':
        fmp_url_base = f'https://financialmodelingprep.com/api/v3/quote/{asset_symbol}USD?apikey={FMP_API_KEY}'
        fmp_response = requests.get(fmp_url_base)
        fmp_data = fmp_response.json()
        symbol = fmp_data[0]['symbol'].lower()[:-3]

    # Get symbol and price from data
    asset_data = {
        'symbol': symbol.lower(),
        'price': fmp_data[0]['price']
    }

    g.current_user.sell_asset(asset_data, sell_qty)
    return make_response(f'Successfully sold {sell_qty} {symbol}.', 200)

# Get asset info
@asset.get('/asset/<string:type>/<string:symbol>')
def get_asset_info(type, symbol):
    '''
        Gets asset info from external sources. No auth required. 
        All requests utilize FMP_API_KEY for most info. 
        Stocks also use FH_API_KEY for info not in first source. 
        Crypto also use CMC_API_KEY for info not in first source.
    '''
    FMP_API_KEY = os.environ.get('FMP_API_KEY')
    FH_API_KEY = os.environ.get('FH_API_KEY')
    fh_headers = {'X-Finnhub-Token': FH_API_KEY}
    CMC_API_KEY = os.environ.get('CMC_API_KEY')
    cmc_headers = {'X-CMC_PRO_API_KEY': CMC_API_KEY}

    if type == 'stock':
        fmp_url_base = f'https://financialmodelingprep.com/api/v3/quote/{symbol.upper().strip()}?apikey={FMP_API_KEY}'
        fmp_response = requests.get(fmp_url_base)
        fmp_data = fmp_response.json()
        asset_dict = {
            'name': fmp_data[0]['name'],
            'symbol': fmp_data[0]['symbol'],
            'price': fmp_data[0]['price'],
            'change_percent': fmp_data[0]['changesPercentage'],
            'change_dollar': fmp_data[0]['change'],
            'day_low': fmp_data[0]['dayLow'],
            'day_high': fmp_data[0]['dayHigh'],
            'year_low': fmp_data[0]['yearLow'],
            'year_high': fmp_data[0]['yearHigh'],
            'market_cap': fmp_data[0]['marketCap'],
            'price_avg_50': fmp_data[0]['priceAvg50'],
            'price_avg_200': fmp_data[0]['priceAvg200'],
            'volume': fmp_data[0]['volume'],
            'volume_avg': fmp_data[0]['avgVolume'],
            'open': fmp_data[0]['open'],
            'previous_close': fmp_data[0]['previousClose'],
        }
        fh_url_base = f'https://finnhub.io/api/v1/stock/profile2?symbol={symbol.upper().strip()}'
        fh_response = requests.get(fh_url_base, headers=fh_headers)
        fh_data = fh_response.json()
        asset_dict['logo'] = fh_data['logo']
        asset_dict['website'] = fh_data['weburl']
        asset_dict['industry'] = fh_data['finnhubIndustry']
    elif type == 'crypto':
        fmp_url_base = f'https://financialmodelingprep.com/api/v3/quote/{symbol.upper().strip()}USD?apikey={FMP_API_KEY}'
        fmp_response = requests.get(fmp_url_base)
        fmp_data = fmp_response.json()
        asset_dict = {
            'name': fmp_data[0]['name'],
            'symbol': fmp_data[0]['symbol'][:-3],
            'price': fmp_data[0]['price'],
            'change_percent': fmp_data[0]['changesPercentage'],
            'change_dollar': fmp_data[0]['change'],
            'day_low': fmp_data[0]['dayLow'],
            'day_high': fmp_data[0]['dayHigh'],
            'year_low': fmp_data[0]['yearLow'],
            'year_high': fmp_data[0]['yearHigh'],
            'market_cap': fmp_data[0]['marketCap'],
            'price_avg_50': fmp_data[0]['priceAvg50'],
            'price_avg_200': fmp_data[0]['priceAvg200'],
            'volume': fmp_data[0]['volume'],
            'volume_avg': fmp_data[0]['avgVolume'],
            'open': fmp_data[0]['open'],
            'previous_close': fmp_data[0]['previousClose'],
        }
        cmc_url_base = f'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol={symbol}'
        cmc_response = requests.get(cmc_url_base, headers=cmc_headers)
        cmc_data = cmc_response.json()
        asset_dict['logo'] = cmc_data['data'][symbol.upper().strip()]['logo']
        asset_dict['website'] = cmc_data['data'][symbol.upper().strip()]['urls']['website'][0]
        asset_dict['industry'] = 'Cryptocurrency'
    return make_response(asset_dict, 200)
