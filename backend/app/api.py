from uuid import uuid4

from flask import jsonify
from flask_httpauth import HTTPBasicAuth
from flask_restful import reqparse, abort, Resource, Api

from models import User, Kasten, Zettel
from dbhelper import DBHelper

tokens_login = {}

auth = HTTPBasicAuth()


def generate_token(login):
    token = uuid4()
    tokens_login[token] = login
    return token


@auth.verify_password
def verify_token(token):
    return token in tokens_login


def has_access(token, kasten_id=None, zettel_id=None):
    if kasten_id:
        kasten = DBHelper.Kasten.get(kasten_id)
        return tokens_login[token] == kasten.owner.login
    if zettel_id:
        zettel = DBHelper.Zettel.get(zettel_id)
        return tokens_login[token] == zettel.kasten.owner.login

    return False


auth_parser = reqparse.RequestParser(bundle_errors=True)
auth_parser.add_argument('token', required=True)


class UsersApi(Resource):
    post_parser = reqparse.RequestParser(bundle_errors=True)
    post_parser.add_argument('login', required=True)
    post_parser.add_argument('password', required=True)
    post_parser.add_argument('action', required=True)

    def get(self):
        users = DBHelper.User.list()
        return jsonify(
            list(map(User.as_short_dict, users))
        )

    def post(self):
        args = UsersApi.post_parser.parse_args()

        if not User.validate_login(args['login']):
            abort(400, message='Login must be 3-20 length word')
        if not User.validate_password(args['password']):
            abort(400, message='Password length must be longer than 8')

        if args['action'] == 'register':
            if DBHelper.User.login_exists(args['login']):
                abort(400, message=f'User ${args["login"]} already exists')

            user = DBHelper.User.create(args['login'], args['password'])
        elif args['action'] == 'login':
            user = DBHelper.User.get_by_login(args['login'])
            if not user or not user.verify_password(args['password']):
                abort(400, message='Wrong login or password')
        else:
            abort(400, message=f'Wrong action ${args["action"]}')

        return jsonify(generate_token(user.login))


class KastensApi(Resource):
    decorators = [auth.login_required]

    post_parser = reqparse.RequestParser(bundle_errors=True)
    post_parser.add_argument('title', required=True)
    post_parser.add_argument('description')

    def get(self):
        token = auth_parser.parse_args()['token']
        user = DBHelper.User.get_by_login(tokens_login[token])
        return jsonify(
            list(map(
                Kasten.as_short_dict,
                DBHelper.Kasten.list(user.id)
            ))
        )

    def post(self):
        token = auth_parser.parse_args()['token']
        user = DBHelper.User.get_by_login(tokens_login[token])
        kasten_args = KastensApi.post_parser.parse_args()

        DBHelper.Kasten.create(
            title=kasten_args['title'],
            description=kasten_args.get('description'),
            owner_id=user.id
        )

        return 200


class KastenApi(Resource):
    decorators = [auth.login_required]

    put_parser = reqparse.RequestParser(bundle_errors=True)
    put_parser.add_argument('title')
    put_parser.add_argument('description')

    def get(self, kasten_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], kasten_id=kasten_id):
            return 403

        kasten = DBHelper.Kasten.get(kasten_id)
        return jsonify(
            kasten.as_full_dict()
        )

    def put(self, kasten_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], kasten_id=kasten_id):
            return 403

        kasten_args = KastenApi.put_parser.parse_args()

        if not DBHelper.Kasten.edit(kasten_id, **kasten_args):
            return 403

        return 200

    def delete(self, kasten_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], kasten_id=kasten_id):
            return 403

        if not DBHelper.Kasten.remove(kasten_id):
            return 403

        return 200


class ZettelsApi(Resource):
    decorators = [auth.login_required]

    post_parser = reqparse.RequestParser(bundle_errors=True)
    post_parser.add_argument('title', required=True)
    post_parser.add_argument('description')
    post_parser.add_argument('tags', type=str, action='append')

    def get(self, kasten_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], kasten_id=kasten_id):
            return 403

        return jsonify(
            list(map(
                Zettel.as_short_dict,
                DBHelper.Zettel.list(kasten_id)
            ))
        )

    def post(self, kasten_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], kasten_id=kasten_id):
            return 403

        zettel_args = KastensApi.post_parser.parse_args()

        DBHelper.Zettel.create(
            title=zettel_args['title'],
            description=zettel_args.get('description'),
            tags=zettel_args.get('tags'),
            kasten_id=kasten_id
        )

        return 200


class ZettelApi(Resource):
    decorators = [auth.login_required]

    put_parser = reqparse.RequestParser(bundle_errors=True)
    put_parser.add_argument('title')
    put_parser.add_argument('description')
    put_parser.add_argument('tags', type=str, action='append')

    def get(self, zettel_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], zettel_id=zettel_id):
            return 403

        zettel = DBHelper.Zettel.get(zettel_id)
        return jsonify(
            zettel.as_full_dict()
        )

    def put(self, zettel_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], zettel_id=zettel_id):
            return 403

        zettel_args = ZettelApi.put_parser.parse_args()

        if not DBHelper.Zettel.edit(zettel_id, **zettel_args):
            return 403

        return 200

    def delete(self, zettel_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], zettel_id=zettel_id):
            return 403

        if not DBHelper.Zettel.remove(zettel_id):
            return 403

        return 200


class ZettelRelationApi(Resource):
    decorators = [auth.login_required]

    @staticmethod
    def _check_access(zettel_id, related_id):
        token = auth_parser.parse_args()['token']
        if not has_access(tokens_login[token], zettel_id=zettel_id) \
                or not has_access(tokens_login[token], zettel_id=related_id):
            return False

        return True

    def post(self, zettel_id, related_id):
        if not ZettelRelationApi._check_access(zettel_id, related_id):
            return 403

        zettel = DBHelper.Zettel.get(zettel_id)
        related = DBHelper.Zettel.get(related_id)
        zettel.relate_to(related)

    def delete(self, zettel_id, related_id):
        if not ZettelRelationApi._check_access(zettel_id, related_id):
            return 403

        zettel = DBHelper.Zettel.get(zettel_id)
        related = DBHelper.Zettel.get(related_id)
        zettel.conceal(related)


api = Api(catch_all_404s=True)
api.add_resource(UsersApi, '/api/users')
api.add_resource(KastensApi, '/api/kastens')
api.add_resource(KastenApi, '/api/kastens/<kasten_id>')
api.add_resource(ZettelsApi, '/api/kastens/<kasten_id>/zettels')
api.add_resource(ZettelApi, '/api/zettels/<zettel_id>')
api.add_resource(ZettelRelationApi, '/api/zettels/<zettel_id>/<related_id>')
