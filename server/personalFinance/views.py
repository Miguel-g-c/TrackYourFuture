from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import User, Currency, Account, IncomeCategory, \
    Income, ExpenseCategory, Expense, AssetCategory, \
    AssetBuy, AssetSell, ExpenseSubCategory
from .serializers import UserSerializer, CurrencySerializer, \
    AccountSerializer, IncomeCategorySerializer, IncomeSerializer, \
    ExpenseCategorySerializer, ExpenseSerializer, AssetCategorySerializer, \
    AssetBuySerializer, AssetSellSerializer, ExpenseSubCategorySerializer


# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('-last_login')
    permission_classes = (permissions.AllowAny,)


class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()


class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class IncomeCategoryView(viewsets.ModelViewSet):
    serializer_class = IncomeCategorySerializer
    queryset = IncomeCategory.objects.all()


class ExpenseCategoryView(viewsets.ModelViewSet):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()


class ExpenseSubCategoryView(viewsets.ModelViewSet):
    serializer_class = ExpenseSubCategorySerializer
    queryset = ExpenseSubCategory.objects.all()


class AssetCategoryView(viewsets.ModelViewSet):
    serializer_class = AssetCategorySerializer
    queryset = AssetCategory.objects.all()


class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all().order_by('-timestamp')
    permission_classes = [permissions.IsAuthenticated]


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all().order_by('-timestamp')
    permission_classes = [permissions.IsAuthenticated]


class AssetBuyView(viewsets.ModelViewSet):
    serializer_class = AssetBuySerializer
    queryset = AssetBuy.objects.all().order_by('-timestamp')
    permission_classes = [permissions.IsAuthenticated]


class AssetSellView(viewsets.ModelViewSet):
    serializer_class = AssetSellSerializer
    queryset = AssetSell.objects.all().order_by('-timestamp')
    permission_classes = [permissions.IsAuthenticated]
