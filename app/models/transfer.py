from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Transfer(db.Model, UserMixin):
      __tablename__ = "transfers"

      if environment == "production":
            __table_args__ = {"schema": SCHEMA}

      id = db.Column(db.Integer, primary_key=True)
      user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
      account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("accounts.id")))
      payee = db.Column(db.String(255))
      amount = db.Column(db.Float)
      date_paid = db.Column(db.DateTime)

      # Relationships

      users = db.relationship("User", back_populates="transfers")
      accounts = db.relationship("Account", back_populates="transfers")


      def to_dict(self):
            return {
                  "id": self.id,
                  "userId": self.user_id,
                  "accountId": self.account_id,
                  "payee": self.payee,
                  "amount": self.amount,
                  "date_paid": self.date_paid
            }
