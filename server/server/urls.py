"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from personalFinance import views


router = routers.DefaultRouter()

router.register(r'users', views.UserView, 'user')
router.register(r'currencies', views.CurrencyView, 'currency')
router.register(r'accounts', views.AccountView, 'account')

router.register(r'categories/income',
                views.IncomeCategoryView, 'income_categories')

router.register(r'categories/expense',
                views.ExpenseCategoryView, 'expense_categories')

router.register(r'categories/expensesub',
                views.ExpenseSubCategoryView, 'expense_subcategories')

router.register(r'categories/asset',
                views.AssetCategoryView, 'asset_categories')

router.register(r'incomes', views.IncomeView, 'income')
router.register(r'expenses', views.ExpenseView, 'expense')

router.register(r'assets/bought',
                views.AssetBuyView, 'asset_bought')

router.register(r'assets/sold',
                views.AssetSellView, 'asset_sold')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/current-user/', views.current_user, name='current-user'),
    path('api-auth/', include('rest_framework.urls')),
    path('token-auth/', obtain_jwt_token)
]
