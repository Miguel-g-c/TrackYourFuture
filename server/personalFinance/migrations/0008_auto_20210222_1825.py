# Generated by Django 3.1.5 on 2021-02-22 17:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personalFinance', '0007_currency_position'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assetsell',
            name='buy',
        ),
        migrations.DeleteModel(
            name='AssetBuy',
        ),
        migrations.DeleteModel(
            name='AssetCategory',
        ),
        migrations.DeleteModel(
            name='AssetSell',
        ),
    ]
