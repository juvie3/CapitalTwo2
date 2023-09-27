from flask import Blueprint, request, redirect
from ..models import db
from ..models.account import Account
from ..models.transaction import Transaction
from ..models.transfer import Transfer
from ..models.transaction import Transaction
from ..models.user import User
from ..forms.accounts_form import AccountsForm
from ..forms.transfers_form import TransfersForm
from ..forms.transaction_form import TransactionForm
from flask_login import login_required, current_user #current_user.id
from datetime import datetime

transfers = Blueprint('transfers', __name__)


@transfers.route('/')
@login_required
def get_transfers():

      res = Transfer.query.filter(Transfer.user_id == current_user.id)

      response = [transfer.to_dict() for transfer in res]

      print(response)
      return response


@transfers.route('/new/<int:accountId>', methods=["POST"])
@login_required
def create_transfer(accountId):

      form = TransfersForm()
      form["csrf_token"].data = request.cookies["csrf_token"]

      new_transfer = Transfer (
            user_id = current_user.id,
            account_id = accountId,
            payee = form.data["payee"],
            amount = form.data["amount"],
      )

      db.session.add(new_transfer)
      db.session.commit()

      res = Transfer.query.filter(Transfer.user_id == current_user.id)

      response = [transfer.to_dict() for transfer in res]

      print(response)
      return response


@transfers.route('/send/<int:id>', methods=["POST"])
@login_required
def update_transfer(id):

      transfer = Transfer.query.get(id)

      form = TransfersForm()
      form["csrf_token"].data = request.cookies["csrf_token"]

      phone_given = form.data["phone"]

      user_getter_phone = User.query.filter_by(phone=phone_given).first()
      user_getter_email = User.query.filter_by(email=phone_given).first()

      if (user_getter_phone):
            getter_acct = Account.query.filter_by(user_id=user_getter_phone.id).order_by(Account.id).all()

            newAmount = getter_acct[0].funds + transfer.amount

            getter_acct[0].funds = newAmount
            db.session.commit()

            new_transaction = Transaction (
                  user_id = getter_acct[0].user.id,
                  account_id = getter_acct[0].id,
                  payee = user_getter_phone.username,
                  amount = transfer.amount,
                  product = "Transfer From",
                  date_paid = datetime.now(),
            )

            db.session.add(new_transaction)
            db.session.commit()

      if (user_getter_email):

            getter_acct = Account.query.filter_by(user_id=user_getter_email.id).order_by(Account.id).all()

            newAmount = getter_acct[0].funds + transfer.amount

            getter_acct[0].funds = newAmount
            db.session.commit()



            new_transaction = Transaction (
                  user_id = user_getter_email.id,
                  account_id = getter_acct[0].id,
                  payee = user_getter_email.username,
                  amount = transfer.amount,
                  product = "Transfer From",
                  date_paid = datetime.now(),
            )


            db.session.add(new_transaction)
            db.session.commit()


      transfer.date_paid = datetime.now()
      db.session.commit()

      account = Account.query.get(transfer.account_id)

      newAmount = account.funds - transfer.amount

      account.funds = newAmount
      db.session.commit()

      # form = TransactionForm()
      # form["csrf_token"].data = request.cookies["csrf_token"]

      new_transaction = Transaction (
            user_id = current_user.id,
            account_id = account.id,
            payee = transfer.payee,
            amount = transfer.amount,
            product = "Transfer To",
            date_paid = datetime.now(),
      )

      db.session.add(new_transaction)
      db.session.commit()

      res = Transfer.query.filter(Transfer.user_id == current_user.id)

      response = [transfer.to_dict() for transfer in res]

      print(response)
      return response


@transfers.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_transfer(id):

      transfer = Transfer.query.get(id)

      if transfer:
            try:
                  db.session.delete(transfer)
                  db.session.commit()

                  res = Transfer.query.filter(Transfer.user_id == current_user.id)

                  response = [transfer.to_dict() for transfer in res]

                  print(response)
                  return response

            except Exception as error:
                  return { "errors": error }

      else:
            return { "error": "transfer can not be found" }
