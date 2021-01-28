from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Currency(models.Model):
    name = models.CharField(max_length=64)

    ticker = models.CharField(max_length=3)

    symbol = models.CharField(max_length=1)

    def __str__(self):
        return f"{self.name}, {self.ticker}"


class Account(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="account")

    currency = models.ForeignKey(
        Currency, on_delete=models.RESTRICT, related_name="accounts")

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} acount"


class IncomeCategory(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Income(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="incomes")

    name = models.CharField(max_length=64)

    description = models.TextField(max_length=250, blank=True)

    amount = models.DecimalField(max_digits=8, decimal_places=2)

    currency = models.ForeignKey(
        Currency, on_delete=models.RESTRICT, related_name="incomes")

    category = models.ForeignKey(
        IncomeCategory, on_delete=models.RESTRICT, related_name="incomes")

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Income: {self.name}, " \
               f"amount: {self.amount} {self.currency.symbol}, " \
               f"timestamp: {self.timestamp}, " \
               f"user: {self.user.username}"


class ExpenseCategory(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Expense(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="expenses")

    name = models.CharField(max_length=64)

    description = models.TextField(max_length=250, blank=True)

    amount = models.DecimalField(max_digits=8, decimal_places=2)

    currency = models.ForeignKey(
        Currency, on_delete=models.RESTRICT, related_name="expenses")

    category = models.ForeignKey(
        ExpenseCategory, on_delete=models.RESTRICT, related_name="expenses")

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Expense: {self.name}, " \
               f"amount: {self.amount} {self.currency.symbol}, " \
               f"timestamp: {self.timestamp}, " \
               f"user: {self.user.username}"


class AssetCategory(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class AssetBuy(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="assets_bought")

    category = models.ForeignKey(
        AssetCategory, on_delete=models.RESTRICT, related_name="assets")

    ticker = models.CharField(max_length=5)

    amount = models.DecimalField(max_digits=12, decimal_places=10)

    price = models.DecimalField(max_digits=7, decimal_places=2)

    currency = models.ForeignKey(
        Currency, on_delete=models.RESTRICT, related_name="assets")

    timestamp = models.DateTimeField()

    def save(self, *args, **kwargs):
        if timestamp is None:
            timestamp = datetime.now()
        super(AssetBuy, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} bought {self.ticker} on {self.timestamp}"


class AssetSell(models.Model):
    buy = models.ForeignKey(
        AssetBuy, on_delete=models.CASCADE, related_name="sold")

    price = models.DecimalField(max_digits=7, decimal_places=2)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} sold {self.buy.ticker} on {self.timestamp}"
