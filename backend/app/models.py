from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    login = db.Column(db.String(20), unique=True)
    password_hash = db.Column(db.String(128))

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def validate_login(login):
        if not (3 <= len(login.strip()) <= 20):
            return False

        return True

    @staticmethod
    def validate_password(password):
        if len(password) < 8:
            return False
        return True

    def as_short_dict(self):
        return {
            'id': self.id,
            'login': self.login
        }

class Kasten(db.Model):
    __tablename__ = 'kastens'

    id = db.Column(db.String(12), primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(200))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', backref=db.backref('kastens', lazy=True))

    def as_short_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description
        }

    def as_full_dict(self):
        return {
            **self.as_short_dict(),
            'owner': self.owner.login
        }


relations = db.Table(
    'relations',
    db.Column('zettel_id', db.String(12), db.ForeignKey('zettels.id'), primary_key=True),
    db.Column('related_id', db.String(12), db.ForeignKey('zettels.id'), primary_key=True),
    db.UniqueConstraint('zettel_id', 'related_id', name='unique_relations')
)


class Zettel(db.Model):
    __tablename__ = 'zettels'

    id = db.Column(db.String(12), primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(2000))
    tags = db.Column(db.ARRAY(db.String))
    related = db.relationship(
        "Zettel", secondary=relations,
        primaryjoin=id == relations.c.zettel_id,
        secondaryjoin=id == relations.c.related_id
    )
    kasten_id = db.Column(db.String(12), db.ForeignKey('kastens.id'), nullable=False)
    kasten = db.relationship('Kasten', backref=db.backref('zettels', lazy=True))

    def is_related_to(self, zettel):
        return zettel in self.related

    def relate_to(self, zettel):
        if zettel not in self.related:
            self.related.append(zettel)
            zettel.related.append(self)

    def conceal(self, zettel):
        if zettel in self.related:
            self.related.remove(zettel)
            zettel.related.remove(self)

    def as_short_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }

    def as_full_dict(self):
        return {
            **self.as_short_dict(),
            'description': self.description,
            'tags': self.tags,
            'kasten': self.kasten.as_short_dict(),
            'related': list(map(Zettel.as_short_dict, self.related))
        }
