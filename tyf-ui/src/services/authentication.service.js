import axios from 'axios'

class AuthenticationService {
  constructor() {
    this.server = 'http://127.0.0.1:8000/'
  }

  async fetchCurrentUser() {
    try {
      const response = await axios.get(`${this.server}api/current-user/`, {
        responseType: 'json',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async login(username, password) {
    const data = JSON.stringify({ username, password })
    const config = {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.post(
        `${this.server}token-auth/`,
        data,
        config
      )
      localStorage.setItem('token', response.data.token)
      return response.data.user
    } catch (error) {
      console.error(error)
    }
  }

  logout() {
    localStorage.removeItem('token')
  }

  async signup(username, password, email, first_name, last_name) {
    const data = JSON.stringify({
      username,
      password,
      email,
      first_name,
      last_name,
    })
    const config = {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.post(
        `${this.server}api/users/`,
        data,
        config
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default AuthenticationService
