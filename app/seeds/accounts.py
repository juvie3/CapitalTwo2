from app.models import db, Account, environment, SCHEMA
from sqlalchemy.sql import text

def seed_accounts():
      account1 = Account(
            user_id = 1, account_type = "checking", funds = 1234.56
      )
      account2 = Account(
            user_id = 2, account_type = "checking", funds = 123.45
      )
      account3 = Account(
            user_id = 3, account_type = "checking", funds = 12345.67
      )

      db.session.add(account1)
      db.session.add(account2)
      db.session.add(account3)
      db.session.commit()


def undo_accounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.accounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM accounts"))

    db.session.commit()
