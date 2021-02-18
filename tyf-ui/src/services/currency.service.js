// import axios from 'axios'

class CurrencyService {
  constructor() {
    this.server = 'http://127.0.0.1:8000/'
    this.locales = {
      USD: 'en-US',
      EUR: 'de_DE,',
    }
  }

  format(amount, currency) {
    const formatter = new Intl.NumberFormat(this.locales[currency], {
      style: 'currency',
      currency: currency,
    })
    return formatter.format(amount)
  }
}

export default CurrencyService
