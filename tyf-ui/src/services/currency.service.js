import axios from 'axios'

class CurrencyService {
  constructor() {
    this.server = 'https://api.exchangeratesapi.io/'
    this.locales = {
      USD: 'en-US',
      EUR: 'de-DE',
    }
  }

  format(amount, currency) {
    const formatter = new Intl.NumberFormat(this.locales[currency], {
      style: 'currency',
      currency: currency,
    })
    return formatter.format(amount)
  }

  async getExchangeRate(base, ticker) {
    try {
      const response = await axios.get(`${this.server}latest?base=${base}`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const rate = response.data.rates[ticker]
      return Number(rate)
    } catch (error) {
      console.error(error)
    }
  }
}

export default CurrencyService
