import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthenticationService from './services/authentication.service'
import './App.css'

function App() {
  const authenticationService = new AuthenticationService()

  const [user, setUser] = useState(null)

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const user = await authenticationService.fetchCurrentUser()
      setUser(user)
    }
  }, [])

  async function handleLogin(event) {
    event.preventDefault()
    const user = await authenticationService.login('Miguel', 'super1234')
    setUser(user)
  }

  async function handleRegister(event) {
    event.preventDefault()
    const user = await authenticationService.signup(
      'Ramon',
      '1234',
      'ramon@example.com',
      'Ramon',
      'Garcia'
    )
    setUser(user)
  }

  function handleLogout(event) {
    event.preventDefault()
    authenticationService.logout()
    setUser(null)
  }

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar user={user} handleLogout={handleLogout} />
        <Box className="main" textAlign="center" fontSize="xl">
          <Grid minH="90vh" p={3}>
            <Switch>
              <Route path="/login">
                <Login handleLogin={event => handleLogin(event)} />
              </Route>
              <Route path="/register">
                <Register handleRegister={event => handleRegister(event)} />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </Grid>
        </Box>
        <Footer />
      </ChakraProvider>
    </Router>
  )
}

export default App
