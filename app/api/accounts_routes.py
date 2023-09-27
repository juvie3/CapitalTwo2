from flask import Blueprint, request, redirect
from ..models import db
from ..models.account import Account
from ..models.transaction import Transaction
from ..forms.accounts_form import AccountsForm
from flask_login import login_required, current_user #current_user.id
from datetime import datetime

accounts = Blueprint('accounts', __name__)


@accounts.route("/")
@login_required
def get_accounts():
      """
      Get all accounts for current user
      """

      res = Account.query.filter(Account.user_id == current_user.id)

      response = [acct.to_dict() for acct in res]

      print(response)
      return response


@accounts.route("/transactions")
@login_required
def get_transactions():
      """
      Get all transactions for current user
      """

      res = Transaction.query.filter(Transaction.user_id == current_user.id)

      response = [transaction.to_dict() for transaction in res]

      print(response)
      return response


@accounts.route("/new", methods=["POST"])
@login_required
def create_account():
      """
      Create a new account
      """

      form = AccountsForm()
      form["csrf_token"].data = request.cookies["csrf_token"]

      if form.validate_on_submit():

            new_account = Account(
                  user_id = current_user.id,
                  account_type = form.data["account_type"],
                  funds = form.data["funds"]
            )

            db.session.add(new_account)
            db.session.commit()

            res = Account.query.filter(Account.user_id == current_user.id)

            response = [acct.to_dict() for acct in res]

            print(response)
            return response

      else:
            print(form.errors)
            return {"errors": form.errors}


@accounts.route("/update/<int:id>", methods=["POST"])
@login_required
def update_account(id):


      form = AccountsForm()

      form["csrf_token"].data = request.cookies["csrf_token"]

      if form.validate_on_submit():
            account = Account.query.get(id)


            newFundAmt = account.funds + form.data["funds"]

            account.funds = newFundAmt
            db.session.commit()


            new_transaction = Transaction (
                  user_id = current_user.id,
                  account_id = account.id,
                  payee = "Deposit",
                  amount = form.data["funds"],
                  product = "Received",
                  date_paid = datetime.now(),
            )

            db.session.add(new_transaction)
            db.session.commit()


            res = Account.query.filter(Account.user_id == current_user.id)

            response = [acct.to_dict() for acct in res]

            print(response)
            return response

      else:
            print(form.errors)
            return {"errors": form.errors}



@accounts.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_account(id):
      accountSelected = Account.query.get(id)

      if accountSelected:
            try:
                  db.session.delete(accountSelected)
                  db.session.commit()

                  res = Account.query.filter(Account.user_id == current_user.id)

                  response = [acct.to_dict() for acct in res]

                  print(response)
                  return response


            except Exception as error:
                  return { "errors": error }

      else:
            return { "error": "account can not be found" }
