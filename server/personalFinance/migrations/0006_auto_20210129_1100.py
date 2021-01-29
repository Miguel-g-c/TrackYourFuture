# Generated by Django 3.1.5 on 2021-01-29 10:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('personalFinance', '0005_expense_subcategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='subcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='expenses', to='personalFinance.expensesubcategory'),
        ),
    ]
