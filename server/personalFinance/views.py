from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Currency, Account, IncomeCategory, \
    Income, ExpenseCategory, Expense, AssetCategory, \
    AssetBuy, AssetSell
from .serializers import UserSerializer, CurrencySerializer, \
    AccountSerializer, IncomeCategorySerializer, IncomeSerializer, \
    ExpenseCategorySerializer, ExpenseSerializer, AssetCategorySerializer, \
    AssetBuySerializer, AssetSellSerializer


# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()


class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()


class IncomeCategoryView(viewsets.ModelViewSet):
    serializer_class = IncomeCategorySerializer
    queryset = IncomeCategory.objects.all()


class ExpenseCategoryView(viewsets.ModelViewSet):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()


class AssetCategoryView(viewsets.ModelViewSet):
    serializer_class = AssetCategorySerializer
    queryset = AssetCategory.objects.all()


class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all()


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()


class AssetBuyView(viewsets.ModelViewSet):
    serializer_class = AssetBuySerializer
    queryset = AssetBuy.objects.all()


class AssetSellView(viewsets.ModelViewSet):
    serializer_class = AssetSellSerializer
    queryset = AssetSell.objects.all()
