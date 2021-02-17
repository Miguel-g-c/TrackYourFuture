from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters
from .models import User, Currency, Account, IncomeCategory, \
    Income, ExpenseCategory, Expense, AssetCategory, \
    AssetBuy, AssetSell, ExpenseSubCategory
from .serializers import UserSerializer, UserSerializerWithToken, CurrencySerializer, \
    AccountSerializer, IncomeCategorySerializer, IncomeSerializer, \
    ExpenseCategorySerializer, ExpenseSerializer, AssetCategorySerializer, \
    AssetBuySerializer, AssetSellSerializer, ExpenseSubCategorySerializer


# Create your views here.

class StandardPagination(PageNumberPagination):
    page_size=10


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (permissions.AllowAny,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('user',)


class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
    permission_classes = (permissions.AllowAny,)


class IncomeCategoryView(viewsets.ModelViewSet):
    serializer_class = IncomeCategorySerializer
    queryset = IncomeCategory.objects.all()
    permission_classes = (permissions.AllowAny,)


class ExpenseCategoryView(viewsets.ModelViewSet):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()
    permission_classes = (permissions.AllowAny,)


class ExpenseSubCategoryView(viewsets.ModelViewSet):
    serializer_class = ExpenseSubCategorySerializer
    queryset = ExpenseSubCategory.objects.all()
    permission_classes = (permissions.AllowAny,)


class AssetCategoryView(viewsets.ModelViewSet):
    serializer_class = AssetCategorySerializer
    queryset = AssetCategory.objects.all()
    permission_classes = (permissions.AllowAny,)


class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all().order_by('-timestamp')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('user',)
    pagination_class = StandardPagination


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all().order_by('-timestamp')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('user',)
    pagination_class = StandardPagination


class AssetBuyView(viewsets.ModelViewSet):
    serializer_class = AssetBuySerializer
    queryset = AssetBuy.objects.all().order_by('-timestamp')


class AssetSellView(viewsets.ModelViewSet):
    serializer_class = AssetSellSerializer
    queryset = AssetSell.objects.all().order_by('-timestamp')
