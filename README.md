# TrackYourFuture [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Miguel-g-c/TrackYourFuture/blob/web50/projects/2020/x/capstone/LICENSE)

TrackYourFuture is a web application for personal finance management.

* **Track your expenses:** Add your expenses in a user-friendly form and TrackYourFuture will store them clasified by category, subcategory and date.
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

## CS50's Web Programming Course: Requirements

### Distinctiveness and complexity 

This project, as abovementioned, does not have any relation with any of the previuos projects in the course. Furthermore, it uses two servers which communicates each other through a REST API paradigm.

#### Backend server

TrackYourFuture's backend uses [Django](https://www.djangoproject.com/) and [django-rest-framework](https://www.django-rest-framework.org/) to build an end-point REST API. This end-point manages the models for tracking users, accounts, currencies, categories, incomes and expenses. It also allows url filtering thanks to [django-filter](https://django-filter.readthedocs.io/en/stable/) capabilities. Finally, authentication is handled with JSON Web Tokens thanks to [djangorestframework-jwt](https://pypi.org/project/djangorestframework-jwt/)

#### Frontend server

TrackYourFuture's frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Chakra UI](https://chakra-ui.com/). It consumes the Backend API to build a responsive and dynamic UI for the app. Using the most extended JavaScript framework in the industry.

### Contribution

#### Backend server

* **`TrackYourFuture/server/personalFinance/models.py`**

   Include the application models: User (django authentication user model), Account (extension for the User model to store specific data for a TrackYourFuture's account), Currency (it stores the currency objects related to a monetary value), IncomeCategory (categories to classify an income), ExpenseCategory, ExpenseSubcategory (categories and subcategories to clasify an expense), Income and Expense (the two entities which track the money usage of an User).

* **`TrackYourFuture/server/personalFinance/serializers.py`**

   Include the serializers fot the application data to be represented in a REST API. Including UserSerializer, UserSerializerWithToken (for JWT authentication between cross origins), AccountSerializer, CurrencySerializer, IncomeCategorySerializer, ExpenseCategorySerializer, ExpenseSerializer and IncomeSerializer. Furthermore, there are other serializers: AccountReadSerializer, IncomeReadSerializer and ExpenseReadSerializer. This will be used in GET Request, providing further depth information in the JSON object.

* **`TrackYourFuture/server/personalFinance/views.py`**

   Include the views for the application serializers for different request and including JWT authentication, filtering and pagination.

* **`TrackYourFuture/server/server/urls.py`**

   Include the url pattern to comsume the API end-point.

#### Frontend server

##### App

* **`TrackYourFuture/tyf-ui/src/App.js`**

   Include the React App component to render the UI for the project. It stores in its state the user and account logged in. Also, it uses [React Router](https://reactrouter.com/) to provide the app with url navigation thorugh the different page components developed in the /pages folder.

##### Pages
* **`TrackYourFuture/tyf-ui/src/pages/Home.js`**

   The application Homepage, it renders a call-to-action (CTA) component indicating the user to join the app or if the user is authenticated to go to his or her dashboard to start using the capabilities of the tool.

* **`TrackYourFuture/tyf-ui/src/pages/Login.js`**

   The application Login page, it renders a Login form.

* **`TrackYourFuture/tyf-ui/src/pages/Register.js`**

   The application Register page, it renders a sign up form.

* **`TrackYourFuture/tyf-ui/src/pages/Dashboard.js`**

   It renders the user dashboard in which he can see his current capital, the last month total expenses and incomes, and the variation with the previous month. Furthermore, there is a data visualization component in which the user can see his expenses by category and subcategory.

* **`TrackYourFuture/tyf-ui/src/pages/Expenses.js`**

   It renders a table with the last 10 expenses of the user. The component supports pagination to see further expenses and filtering the displayed expenses by category and subcategory. Also, it renders a button that displays a modal with a form to add a new expense.

* **`TrackYourFuture/tyf-ui/src/pages/Incomes.js`**
   
   It renders a table with the last 10 incomes of the user. The component supports pagination to see further incomes and filtering the displayed incomes by category. Also, it renders a button that displays a modal with a form to add a new income.

##### Components

* **`TrackYourFuture/tyf-ui/src/components/`**

   This folder include the components used by the pages components to render the different parts of the UI. The principal components are: ColorModeSwitcher (a button to switch between dark and light mode), DoublePieChart (a pie chart for data visualization of the expenses by category and subcategories, it uses a [BizCharts](https://github.com/alibaba/BizCharts) component), LoginForm, RegisterForm, ExpenseForm, IncomeForm, ExpensesTable, IncomesTable, Navbar, Footer, Sidebar, TYFLogo and StatBadge (to display stats in the Dashboard).
   
##### Styling

The previous components, pages and main App component sometimes have a namesake CSS file which styles that component in particular.

##### Services

This folder constains the different services to which the UI server communicates, using the [axios](https://github.com/axios/axios) library.

* **`TrackYourFuture/tyf-ui/src/services/authentication.service.js`**

   This file includes a class `AuthenticationService` which contains methods to handle the app authentication system using JWT between the Frontend server and the Backend server. This methods are `signup()`, `login()`, `logout()` and `fetchCurrentUser()`

* **`TrackYourFuture/tyf-ui/src/services/personalFinance.service.js`**

   This file includes a class `PersonalFinanceService` which contains methods to handle the app request with the Backend server, which conforms the main feutures of the application domain. This methods are `fetchCurrencies()`, `fetchExpenseCategories()`, ` fetchIncomeCategories()`, `createAccount()`, `fetchAccountByUser()`, `addExpense()`, `addIncome()`, `deleteExpense()`, `deleteIncome()`, `fetchUserExpenses()`, `fetchUserIncomes()`, `computeUserTotalExpenses()`, `computeUserTotalIncomes()`, `computeUserCapital()`, `computeUserMonthExpensesByCategory()` and `computeUserMonthIncomesByCategory()`.

* **`TrackYourFuture/tyf-ui/src/services/currency.service.js`**

   This file includes a class `CurrencyService` which contains methods to handle the app request with an external service: [Foreign Exchange Rates API](https://exchangeratesapi.io/), to get the current exchange rate between two currencies. This way, the application can handle the introduction of incomes of expenses with a different currency thant the specified by the user in his account.
