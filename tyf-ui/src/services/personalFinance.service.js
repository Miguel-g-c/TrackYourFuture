import axios from 'axios'

class PersonalFinanceService {
  constructor() {
    this.server = 'http://127.0.0.1:8000/api/'
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
}

export default PersonalFinanceService
