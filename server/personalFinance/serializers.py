from rest_framework import serializers
from .models import User, Currency, Account, IncomeCategory, \
    Income, ExpenseCategory, Expense, AssetCategory, \
    AssetBuy, AssetSell


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'last_login', 'date_joined')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'ticker', 'symbol')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'currency', 'amount')


class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = ('id', 'name')


class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = ('id', 'name')


class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = ('id', 'name')


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'user', 'name', 'description',
                  'amount', 'currency', 'category', 'timestamp')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'user', 'name', 'description',
                  'amount', 'currency', 'category', 'timestamp')


class AssetBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetBuy
        fields = ('id', 'user', 'category', 'ticker',
                  'amount', 'price', 'currency', 'timestamp')


class AssetSellSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetSell
        fields = ('id', 'buy', 'price', 'timestamp')
