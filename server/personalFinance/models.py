from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Stock(models.Model):
    pass

class Crypto(models.Model):
    pass

class Income(models.Model):
    pass

class Outcome(models.Model):
    pass

class Buy(models.Model):
    pass

class Sell(models.Model):
    pass