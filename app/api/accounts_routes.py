from flask import Blueprint, request, redirect
from ..models import db
from ..models.account import Account
from ..models.transaction import Transaction
from flask_login import login_required, current_user #current_user.id

accounts = Blueprint('accounts', __name__)


@accounts.route("/")
@login_required
def get_accounts():
      """
      Get all accounts for current user
      """

      res = Account.query.filter(Account.user_id == current_user.id)

      response = [prod.to_dict() for prod in res]

      print(response)
      return response


@accounts.route("/transactions")
@login_required
def get_transactions():
      """
      Get all transactions for current user
      """

      res = Transaction.query.filter(Transaction.user_id == current_user.id)

      response = [prod.to_dict() for prod in res]

      print(response)
      return response
