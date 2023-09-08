from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Account(db.Model, UserMixin):
    __tablename__ = "accounts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    account_type = db.Column(db.String(100))
    funds = db.Column(db.Float)

    # Relationships
    users = db.relationship("User", back_populates="accounts", lazy="joined")
    transactions = db.relationship("Transaction", back_populates="accounts", cascade="all, delete")
    transfers = db.relationship("Transfer", back_populates="accounts", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "accountType": self.account_type,
            "funds": self.funds
        }
