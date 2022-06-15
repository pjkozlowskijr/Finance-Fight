from . import bp as league
from app.models import League
from flask import make_response, g, request, abort
from app.blueprints.user.user_routes import token_auth

# #########################
# LEAGUE ROUTES
# #########################

@league.post('/league')
@token_auth.login_required()
def create_league():
    '''
        Creates a new league. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
        Expected payload:
        {
            "name": STRING,
            "start_date": DATE (YYYY/MM/DD)
        }
    '''
    data = request.get_json()
    new_league = League()
    new_league.league_to_db(data)
    new_league.save_league()
    return make_response('SUCCESS', 200)

@league.delete('/league/<int:id>')
@token_auth.login_required()
def delete_league(id):
    '''
        Deletes the league from database. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    league = League.query.get(id)
    if not league:
        abort(404)
    if league.owner_id != g.current_user.id:
        abort(403)
    league.delete_league()
    return make_response('SUCCESS', 200)

@league.get('/league')
def get_leagues():
    '''
        Gets ALL leagues from database. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    leagues = League.query.all()
    leagues = [league.to_dict() for league in leagues]
    return make_response({'leagues':leagues}, 200)

# Get a single league
@league.get('/league/<int:id>')
def get_league(id):
    '''
        Gets SINGLE league from database. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    league = League.query.get(id)
    league = league.to_dict()
    return make_response(league, 200)

@league.post('/league/join/<int:id>')
@token_auth.login_required()
def join_league(id):
    '''
        User joins league. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    league = League.query.get(id)
    g.current_user.leagues.append(league)
    g.current_user.save_user()
    return make_response('SUCCESS', 200)

@league.delete('/league/leave/<int:id>')
@token_auth.login_required()
def leave_league(id):
    '''
        User leaves league. Requires token auth header.
        HTTP Header = "Authorization: Bearer <token>"
    '''
    league = League.query.get(id)
    g.current_user.leagues.remove(league)
    g.current_user.save_user()
    return make_response('SUCCESS', 200)