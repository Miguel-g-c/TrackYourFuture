import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
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
  function userHandler(user) {
    setUser(user)
  }

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const user = await authenticationService.fetchCurrentUser()
      setUser(user)
    }
  }, [])

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

  function handleLogout() {
    authenticationService.logout()
    setUser(null)
  }

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar user={user} handleLogout={handleLogout} />
        <Box className="main" textAlign="center" fontSize="xl">
          <Grid minH="90vh">
            <Switch>
              <Route path="/login">
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <Login userHandler={userHandler} />
                )}
              </Route>
              <Route path="/register">
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <Register handleRegister={handleRegister} />
                )}
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
