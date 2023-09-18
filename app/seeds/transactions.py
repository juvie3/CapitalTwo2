from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_transactions():
      transaction1 = Transaction(
            user_id = 1, account_id = 1, payee = 'Best Buy', product = 'TV', amount = 589.98, date_paid = datetime(2023, 9, 18)
      )
      transaction2 = Transaction(
            user_id = 2, account_id = 2, payee = 'Amazon', product = 'Speakers', amount = 189.98, date_paid = datetime(2023, 9, 17)
      )
      transaction3 = Transaction(
            user_id = 3, account_id = 3, payee = 'Bed Bath & Beyond', product = 'Soap', amount = 9.98, date_paid = datetime(2023, 9, 16)
      )
      transaction4 = Transaction(
            user_id = 1, account_id = 1, payee = 'Walmart', product = 'Vitamins', amount = 8.98, date_paid = datetime(2023, 9, 15)
      )
      transaction5 = Transaction(
            user_id = 2, account_id = 2, payee = 'Starbucks', product = 'Coffee', amount = 5.98, date_paid = datetime(2023, 9, 14)
      )
      transaction6 = Transaction(
            user_id = 3, account_id = 3, payee = 'Lowes', product = 'Nails', amount = 12.57, date_paid = datetime(2023, 9, 13)
      )
      transaction7 = Transaction(
            user_id = 1, account_id = 1, payee = 'Food Lion', product = 'Grapes', amount = 1.98, date_paid = datetime(2023, 9, 12)
      )
      transaction8 = Transaction(
            user_id = 2, account_id = 2, payee = 'Chinese Food #1', product = 'Food', amount = 54.98, date_paid = datetime(2023, 9, 10)
      )
      transaction9 = Transaction(
            user_id = 3, account_id = 3, payee = 'Wendys', product = 'Hamburger', amount = 18.98, date_paid = datetime(2023, 9, 10)
      )
      transaction10 = Transaction(
            user_id = 1, account_id = 1, payee = 'Nike', product = 'Shoes', amount = 89.95, date_paid = datetime(2023, 9, 14)
      )
      transaction11 = Transaction(
            user_id = 2, account_id = 2, payee = 'Target', product = 'Pillow', amount = 54.50, date_paid = datetime(2023, 9, 15)
      )
      transaction12 = Transaction(
            user_id = 3, account_id = 3, payee = 'Costco', product = 'Gas', amount = 64.32, date_paid = datetime(2023, 9, 17)
      )


      db.session.add(transaction1)
      db.session.add(transaction2)
      db.session.add(transaction3)
      db.session.add(transaction4)
      db.session.add(transaction5)
      db.session.add(transaction6)
      db.session.add(transaction7)
      db.session.add(transaction8)
      db.session.add(transaction9)
      db.session.add(transaction10)
      db.session.add(transaction11)
      db.session.add(transaction12)
      db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
