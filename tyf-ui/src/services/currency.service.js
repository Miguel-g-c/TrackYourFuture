// import axios from 'axios'

class CurrencyService {
  constructor() {
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
}

export default CurrencyService
