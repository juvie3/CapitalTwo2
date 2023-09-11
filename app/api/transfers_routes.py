from flask import Blueprint, request, redirect
from ..models import db
from ..models.account import Account
from ..models.transaction import Transaction
from ..models.transfer import Transfer
from ..forms.accounts_form import AccountsForm
from ..forms.transfers_form import TransfersForm
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

      print('=========================================', transfer)

      transfer.date_paid = datetime.now()
      db.session.commit()

      res = Transfer.query.filter(Transfer.user_id == current_user.id)

      response = [transfer.to_dict() for transfer in res]

      print(response)
      return response
