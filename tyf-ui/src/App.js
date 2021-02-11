import React, { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  theme,
} from '@chakra-ui/react'
import { Navbar } from './components/Navbar'
import AuthenticationService from './services/authentication.service'
import './App.css'

function App() {
  const authenticationService = new AuthenticationService()

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const user = await authenticationService.fetchCurrentUser()
      setUser(user)
      setIsUserAuthenticated(true)
    }
  }, [])

  function handleLogout(event) {
    event.preventDefault()
    authenticationService.logout()
    setIsUserAuthenticated(false)
    setUser(null)
  }

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        isUserAuthenticated={isUserAuthenticated}
        handleLogout={event => handleLogout(event)}
      />
      <Box className="main" textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>
              Hey {isUserAuthenticated ? user.username : 'Stranger'}: Edit
              <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={async event => {
                event.preventDefault()
                const user = await authenticationService.login(
                  'Miguel',
                  'super1234'
                )
                setUser(user)
                setIsUserAuthenticated(true)
              }}
            >
              Login Miguel
            </Button>
            ;
            <Button
              colorScheme="blue"
              size="sm"
              onClick={async event => {
                event.preventDefault()
                const user = await authenticationService.login('Monic', '1234')
                setUser(user)
                setIsUserAuthenticated(true)
              }}
            >
              Login Monic
            </Button>
            ;
            <Button
              colorScheme="teal"
              size="sm"
              onClick={event => {
                event.preventDefault()
                authenticationService.logout()
                setIsUserAuthenticated(false)
                setUser(null)
              }}
            >
              Logout
            </Button>
            ;
            <Button
              colorScheme="teal"
              variant="outline"
              size="md"
              onClick={async event => {
                event.preventDefault()
                const user = await authenticationService.signup(
                  'Ramon',
                  '1234',
                  'ramon@example.com',
                  'Ramon',
                  'Garcia'
                )
                setUser(user)
                setIsUserAuthenticated(true)
              }}
            >
              Signup
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
