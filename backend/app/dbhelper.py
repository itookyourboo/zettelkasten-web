import nanoid

from models import db, User, Kasten, Zettel


class DBHelper:
    class User:
        @staticmethod
        def list():
            users = User.query.all()
            return users

        @staticmethod
        def exists(user_id):
            return DBHelper.User.get(user_id) is not None

        @staticmethod
        def login_exists(login):
            return DBHelper.User.get_by_login(login) is not None

        @staticmethod
        def get(user_id):
            user = User.query.filter_by(id=user_id).first()
            return user

        @staticmethod
        def get_by_login(login):
            user = User.query.filter_by(login=login).first()
            return user

        @staticmethod
        def create(login, password):
            user = User()
            user.login = login
            user.hash_password(password)

            db.session.add(user)
            db.session.commit()

            return user

        @staticmethod
        def remove(user_id):
            user = DBHelper.User.get(user_id)

            if user is None:
                return False

            db.session.delete(user)
            db.session.commit()

            return True

    class Kasten:
        @staticmethod
        def list(user_id):
            kastens = Kasten.query.filter_by(owner_id=user_id).all()
            return kastens

        @staticmethod
        def get(kasten_id):
            kasten = Kasten.query.filter_by(id=kasten_id).first()
            return kasten

        @staticmethod
        def create(title, description, owner_id):
            user = DBHelper.User.get(owner_id)

            kasten = Kasten(
                id=nanoid.generate(size=12),
                title=title,
                description=description,
                owner_id=owner_id,
                owner=user
            )

            db.session.add(kasten)
            db.session.commit()

            return kasten

        @staticmethod
        def remove(kasten_id):
            kasten = DBHelper.Kasten.get(kasten_id)

            if kasten is None:
                return False

            db.session.delete(kasten)
            db.session.commit()

            return True

        @staticmethod
        def edit(kasten_id, title=None, description=None):
            kasten = DBHelper.Kasten.get(kasten_id)

            if kasten is None:
                return False

            if title:
                kasten.title = title
            if description:
                kasten.description = description

            db.session.commit()

            return True

    class Zettel:
        @staticmethod
        def list(kasten_id):
            zettels = Zettel.query.filter_by(kasten_id=kasten_id).all()
            return zettels

        @staticmethod
        def get(zettel_id):
            zettel = Zettel.query.filter_by(id=zettel_id).first()
            return zettel

        @staticmethod
        def create(title, description, tags, kasten_id):
            kasten = DBHelper.Kasten.get(kasten_id)

            zettel = Zettel(
                id=nanoid.generate(size=12),
                title=title,
                description=description,
                tags=tags,
                kasten_id=kasten_id,
                kasten=kasten
            )

            db.session.add(zettel)
            db.session.commit()

            return zettel

        @staticmethod
        def remove(zettel_id):
            zettel = DBHelper.Zettel.get(zettel_id)

            if zettel is None:
                return False

            db.session.delete(zettel)
            db.session.commit()

            return True

        @staticmethod
        def edit(zettel_id, title=None, description=None, tags=None, kasten_id=None):
            zettel = DBHelper.Zettel.get(zettel_id)
            if title:
                zettel.title = title
            if description:
                zettel.description = description
            if kasten_id:
                kasten = DBHelper.Kasten.get(kasten_id)
                if not kasten:
                    return False

                zettel.kasten_id = kasten_id
                zettel.kasten = kasten
            if tags:
                zettel.tags = tags

            db.session.commit()

            return True
