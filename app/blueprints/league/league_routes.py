from . import bp as league
from app.models import League
from flask import make_response, g, request, abort
from app.blueprints.user.user_routes import token_auth

@league.post('/league')
@token_auth.login_required()
def post_league():
    data = request.get_json()
    new_league = League()
    new_league.league_to_db(data)
    new_league.save_league()
    return make_response('SUCCESS', 200)

@league.delete('/league/<int:id>')
@token_auth.login_required()
def delete_league(id):
    league = League.query.get(id)
    if not league:
        abort(404)
    if league.owner_id != g.current_user.id:
        abort(403)
    league.delete()
    return make_response('SUCCESS', 200)
