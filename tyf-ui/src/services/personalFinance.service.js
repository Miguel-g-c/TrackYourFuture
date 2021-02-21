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

  async fetchUserExpenses(user, page, category = '', subcategory = '') {
    try {
      const response = await axios.get(
        `${this.server}expenses/?user=${user}&page=${page}&category=${category}&subcategory=${subcategory}`,
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

  async fetchUserIncomes(user, page, category = '') {
    try {
      const response = await axios.get(
        `${this.server}incomes/?user=${user}&page=${page}&category=${category}`,
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
    var expenses = 0
    var evaluated = 0
    var page = 0
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
          expenses += expense * rate
          evaluated++
        }
      }
    }
    return expenses
  }

  async computeUserTotalIncomes(userID, accountCurrency) {
    var incomes = 0
    var evaluated = 0
    var page = 0
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
          incomes += income * rate
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
}

export default PersonalFinanceService
