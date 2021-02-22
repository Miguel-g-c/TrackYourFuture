# TrackYourFuture [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Miguel-g-c/TrackYourFuture/blob/web50/projects/2020/x/capstone/LICENSE)

TrackYourFuture is a web application for personal finance management.

* **Track your expenses:** Add your epenses in a user-friendly form and TrackYourFuture will store them clasified by category, subcategory and date.
* **Track your incomes:** Add your income streams in a user-friendly form and TrackYourFuture will store them clasified by category and date.
* **Visualize your data:** TrackYourFuture's dashboard brings you the power of tracking your month expenses and incomes at a glance.

## Installation

```sh
$ git clone https://github.com/Miguel-g-c/TrackYourFuture.git
$ cd server
$ pip install -r requirements.txt
$ cd ..\tyf-ui\
$ npm install
```

## Usage

First, you need to set up the backend server:

```sh
$ cd server
$ python .\manage.py makemigrations personalFinance
$ python .\manage.py migrate
$ python .\manage.py runserver
```

Then, you need to start the frontend server:

```sh
$ cd ..\tyf-ui\
$ npm start
```

You can now start to use the features of TrackYourFuture!

## Backend

TrackYourFuture's backend uses [Django](https://www.djangoproject.com/) and [django-rest-framework](https://www.django-rest-framework.org/) to build an end-point REST API. This end-point manages the models for tracking users, accounts, currencies, categories, incomes and expenses. It also allows url filtering thanks to [django-filter](https://django-filter.readthedocs.io/en/stable/) capabilities. Finally, authentication is handled with JSON Web Tokens thanks to [djangorestframework-jwt](https://pypi.org/project/djangorestframework-jwt/)

## Frontend

TrackYourFuture's frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Chakra UI](https://chakra-ui.com/). It consumes the Backend API to build a responsive and dynamic UI for the app. 