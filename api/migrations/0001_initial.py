# Generated by Django 4.0.3 on 2022-05-16 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.TextField(unique=True)),
                ('definition', models.TextField()),
                ('part_of_speech', models.TextField(blank=True)),
            ],
        ),
    ]
