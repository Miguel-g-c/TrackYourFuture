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
}

export default PersonalFinanceService
