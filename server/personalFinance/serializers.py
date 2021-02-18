from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import User, Currency, Account, IncomeCategory, \
    Income, ExpenseCategory, Expense, AssetCategory, \
    AssetBuy, AssetSell, ExpenseSubCategory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name',
                  'last_name', 'email', 'date_joined')
        extra_kwargs = {'password': {'write_only': True}}


class UserSerializerWithToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('token', 'id', 'username', 'password',
                  'first_name', 'last_name', 'email')

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'ticker', 'symbol', 'position')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'currency', 'amount')


class AccountReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Account
        fields = ('id', 'user', 'currency', 'amount')
        depth = 1


class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = ('id', 'name')


class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = ('id', 'name', 'subcategories')
        depth = 1


class ExpenseSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseSubCategory
        fields = ('id', 'category', 'name')


class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = ('id', 'name')


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'user', 'name', 'description',
                  'amount', 'currency', 'category', 'timestamp')


class IncomeReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Income
        fields = ('id', 'user', 'name', 'description',
                  'amount', 'currency', 'category', 'timestamp')
        depth = 1


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'user', 'name', 'description', 'amount',
                  'currency', 'category', 'subcategory', 'timestamp')


class ExpenseReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Expense
        fields = ('id', 'user', 'name', 'description', 'amount',
                  'currency', 'category', 'subcategory', 'timestamp')
        depth = 1


class AssetBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetBuy
        fields = ('id', 'user', 'category', 'ticker',
                  'amount', 'price', 'currency', 'timestamp')


class AssetSellSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetSell
        fields = ('id', 'buy', 'price', 'timestamp')
