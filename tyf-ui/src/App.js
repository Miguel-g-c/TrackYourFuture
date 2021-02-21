import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ChakraProvider, Box, theme, useDisclosure } from '@chakra-ui/react'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Expenses from './pages/Expenses'
import Incomes from './pages/Incomes'
import Dashboard from './pages/Dashboard'
import AuthenticationService from './services/authentication.service'
import PersonalFinanceService from './services/personalFinance.service'
import './App.css'

function App() {
  const authenticationService = new AuthenticationService()
  const personalFinanceService = new PersonalFinanceService()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [user, setUser] = useState(null)
  function userHandler(user) {
    setUser(user)
  }
  const [account, setAccount] = useState(null)

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const currentUser = await authenticationService.fetchCurrentUser()
      setUser(currentUser)
    }
  }, [])

  useEffect(async () => {
    if (user) {
      const currentAccount = await personalFinanceService.fetchAccountByUser(
        user.id
      )
      setAccount(currentAccount)
    }
  }, [user])

  function handleLogout() {
    authenticationService.logout()
    setUser(null)
  }

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar user={user} handleLogout={handleLogout} handleOpen={onOpen} />
        <Box className="main" textAlign="center" fontSize="xl" minH="100vh">
          <Sidebar isOpen={isOpen} onClose={onClose} />
          <Switch>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login userHandler={userHandler} />}
            </Route>
            <Route path="/register">
              {user ? (
                <Redirect to="/" />
              ) : (
                <Register userHandler={userHandler} />
              )}
            </Route>
            <Route path="/expenses">
              {user ? (
                <Expenses user={user} account={account} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/incomes">
              {user ? (
                <Incomes user={user} account={account} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/dashboard">
              {user ? (
                <Dashboard user={user} account={account} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/">
              <Home user={user} />
            </Route>
          </Switch>
        </Box>
        <Footer />
      </ChakraProvider>
    </Router>
  )
}

export default App
