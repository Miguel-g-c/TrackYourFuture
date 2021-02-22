from django.contrib import admin
from .models import Currency, Account, IncomeCategory, Income, \
    ExpenseCategory, Expense, ExpenseSubCategory

# Register your models here.

admin.site.register([
    Currency,
    Account,
    IncomeCategory,
    Income,
    ExpenseCategory,
    ExpenseSubCategory,
    Expense
])
