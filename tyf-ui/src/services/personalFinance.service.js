import axios from 'axios'
import CurrencyService from './currency.service'

class PersonalFinanceService {
  constructor() {
    this.server = 'http://127.0.0.1:8000/api/'
    this.currencyService = new CurrencyService()
  }

  async fetchCurrencies() {
    try {
      const response = await axios.get(`${this.server}currencies/`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async fetchExpenseCategories() {
    try {
      const response = await axios.get(`${this.server}categories/expense/`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async fetchIncomeCategories() {
    try {
      const response = await axios.get(`${this.server}categories/income/`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createAccount(user, currency, amount) {
    const data = JSON.stringify({
      user,
      currency,
      amount,
    })
    const config = {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.post(`${this.server}accounts/`, data, config)
    return response.data
  }

  async fetchAccountByUser(userID) {
    try {
      const response = await axios.get(
        `${this.server}accounts/?user=${userID}`,
        {
          responseType: 'json',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data[0]
    } catch (error) {
      console.error(error)
    }
  }

  async addExpense(
    user,
    name,
    description,
    amount,
    currency,
    category,
    subcategory
  ) {
    const data = JSON.stringify({
      user,
      name,
      description,
      amount,
      currency,
      category,
      subcategory,
    })
    const config = {
      responseType: 'json',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.post(`${this.server}expenses/`, data, config)
    return response.data
  }

  async deleteExpense(expenseID) {
    try {
      const response = await axios.delete(
        `${this.server}expenses/${expenseID}`,
        {
          responseType: 'json',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async addIncome(user, name, description, amount, currency, category) {
    const data = JSON.stringify({
      user,
      name,
      description,
      amount,
      currency,
      category,
    })
    const config = {
      responseType: 'json',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.post(`${this.server}incomes/`, data, config)
    return response.data
  }

  async deleteIncome(incomeID) {
    try {
      const response = await axios.delete(`${this.server}incomes/${incomeID}`, {
        responseType: 'json',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUserExpenses(
    user,
    page,
    category = '',
    subcategory = '',
    min_date = '',
    max_date = ''
  ) {
    try {
      const response = await axios.get(
        `${this.server}expenses/?user=${user}&page=${page}&category=${category}&subcategory=${subcategory}&min_date=${min_date}&max_date=${max_date}`,
        {
          responseType: 'json',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUserIncomes(
    user,
    page,
    category = '',
    min_date = '',
    max_date = ''
  ) {
    try {
      const response = await axios.get(
        `${this.server}incomes/?user=${user}&page=${page}&category=${category}&min_date=${min_date}&max_date=${max_date}`,
        {
          responseType: 'json',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async computeUserTotalExpenses(userID, accountCurrency) {
    let expenses = 0
    let evaluated = 0
    let page = 0
    const expensesResponse = await this.fetchUserExpenses(userID, 1)
    while (evaluated < expensesResponse.count) {
      page++
      const expensesData = await this.fetchUserExpenses(userID, page)
      for (const i in expensesData.results) {
        if (expensesData.results[i].currency.ticker === accountCurrency) {
          expenses += Number(expensesData.results[i].amount)
          evaluated++
        } else {
          const expense = Number(expensesData.results[i].amount)
          const ticker = expensesData.results[i].currency.ticker
          const rate = await this.currencyService.getExchangeRate(
            accountCurrency,
            ticker
          )
          expenses += expense / rate
          evaluated++
        }
      }
    }
    return expenses
  }

  async computeUserTotalIncomes(userID, accountCurrency) {
    let incomes = 0
    let evaluated = 0
    let page = 0
    const incomesResponse = await this.fetchUserIncomes(userID, 1)
    while (evaluated < incomesResponse.count) {
      page++
      const incomesData = await this.fetchUserIncomes(userID, page)
      for (const i in incomesData.results) {
        if (incomesData.results[i].currency.ticker === accountCurrency) {
          incomes += Number(incomesData.results[i].amount)
          evaluated++
        } else {
          const income = Number(incomesData.results[i].amount)
          const ticker = incomesData.results[i].currency.ticker
          const rate = await this.currencyService.getExchangeRate(
            accountCurrency,
            ticker
          )
          incomes += income / rate
          evaluated++
        }
      }
    }
    return incomes
  }

  async computeUserCapital(userID, accountCurrency) {
    const account = await this.fetchAccountByUser(userID)
    const initialCapital = Number(account.amount)
    const expenses = await this.computeUserTotalExpenses(
      userID,
      accountCurrency
    )
    const incomes = await this.computeUserTotalIncomes(userID, accountCurrency)

    return initialCapital - expenses + incomes
  }

  async computeUserMonthExpensesByCategory(
    userID,
    accountCurrency,
    month,
    year
  ) {
    const responseCategories = await this.fetchExpenseCategories()
    for (const i in responseCategories) {
      responseCategories[i].expenses = 0
      for (const j in responseCategories[i].subcategories) {
        responseCategories[i].subcategories[j].expenses = 0
      }
    }

    const min_date = new Date([month, 1, year])
    const max_date = new Date([month + 1, 1, year])

    let evaluated = 0
    let page = 0
    const expensesResponse = await this.fetchUserExpenses(
      userID,
      1,
      '',
      '',
      min_date.toISOString(),
      max_date.toISOString()
    )
    while (evaluated < expensesResponse.count) {
      page++
      const expensesData = await this.fetchUserExpenses(
        userID,
        page,
        '',
        '',
        min_date.toISOString(),
        max_date.toISOString()
      )
      for (const i in expensesData.results) {
        if (expensesData.results[i].currency.ticker === accountCurrency) {
          let category = responseCategories.find(
            cat => cat.id === expensesData.results[i].category.id
          )
          category.expenses += Number(expensesData.results[i].amount)
          category.subcategories.find(
            subcat => subcat.id === expensesData.results[i].subcategory.id
          ).expenses += Number(expensesData.results[i].amount)
          evaluated++
        } else {
          const expense = Number(expensesData.results[i].amount)
          const ticker = expensesData.results[i].currency.ticker
          const rate = await this.currencyService.getExchangeRate(
            accountCurrency,
            ticker
          )
          let category2 = responseCategories.find(
            cat => cat.id === expensesData.results[i].category.id
          )
          category2.expenses += expense / rate
          category2.subcategories.find(
            subcat => subcat.id === expensesData.results[i].subcategory.id
          ).expenses += expense / rate
          evaluated++
        }
      }
    }
    return responseCategories
  }

  async computeUserMonthIncomesByCategory(
    userID,
    accountCurrency,
    month,
    year
  ) {
    const responseCategories = await this.fetchIncomeCategories()
    for (const i in responseCategories) {
      responseCategories[i].incomes = 0
    }

    const min_date = new Date([month, 1, year])
    const max_date = new Date([month + 1, 1, year])

    let evaluated = 0
    let page = 0
    const incomesResponse = await this.fetchUserIncomes(
      userID,
      1,
      '',
      min_date.toISOString(),
      max_date.toISOString()
    )
    while (evaluated < incomesResponse.count) {
      page++
      const incomesData = await this.fetchUserIncomes(
        userID,
        page,
        '',
        min_date.toISOString(),
        max_date.toISOString()
      )
      for (const i in incomesData.results) {
        if (incomesData.results[i].currency.ticker === accountCurrency) {
          let category = responseCategories.find(
            cat => cat.id === incomesData.results[i].category.id
          )
          category.incomes += Number(incomesData.results[i].amount)
          evaluated++
        } else {
          const income = Number(incomesData.results[i].amount)
          const ticker = incomesData.results[i].currency.ticker
          const rate = await this.currencyService.getExchangeRate(
            accountCurrency,
            ticker
          )
          let category2 = responseCategories.find(
            cat => cat.id === incomesData.results[i].category.id
          )
          category2.incomes += income / rate
          evaluated++
        }
      }
    }
    return responseCategories
  }
}

export default PersonalFinanceService
