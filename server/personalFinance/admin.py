from django.contrib import admin
from .models import Currency, Account, IncomeCategory, Income, ExpenseCategory, Expense, AssetCategory, AssetBuy, AssetSell

# Register your models here.

admin.site.register([
    Currency,
    Account,
    IncomeCategory,
    Income,
    ExpenseCategory,
    Expense,
    AssetCategory,
    AssetBuy,
    AssetSell
])
