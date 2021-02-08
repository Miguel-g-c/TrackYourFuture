import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
//import { TYFSidebar } from './components/Sidebar'
import { Logo } from './Logo'

function App() {
  const server = 'http://127.0.0.1:8000/'

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const fetchCurrentUser = () => {
    axios
      .get(`${server}api/current-user/`, {
        responseType: 'json',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        if (response.status == 200) {
          return response.data
        } else {
          console.log(response.status, response.statusText)
          return null
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const login = (username, password) => {
    axios
      .post(`${server}token-auth/`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password,
        },
      })
      .then(response => {
        if (response.status == 200) {
          localStorage.setItem('token', response.data.token)
          setIsUserAuthenticated(true)
          setUser(response.data.user)
        } else {
          console.log(response.status, response.statusText)
          setIsUserAuthenticated(false)
          setUser(null)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsUserAuthenticated(false)
    setUser(null)
  }

  const signup = (username, password, firstName, lastName, email) => {
    axios
      .post(`${server}api/users`, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password,
          fistName: firstName,
          lastName: lastName,
          email: email,
        },
      })
      .then(response => {
        if (response.status == 200) {
          localStorage.setItem('token', response.data.token)
          setIsUserAuthenticated(true)
          setUser(response.data.user)
        } else {
          console.log(response.status, response.statusText)
          setIsUserAuthenticated(false)
          setUser(null)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (isUserAuthenticated) {
      const user = fetchCurrentUser()
      setUser(user)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="20vmin" pointerEvents="none" />
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
              onClick={login('Miguel', 'super1234')}
            >
              Login Miguel
            </Button>
            ;
            <Button
              colorScheme="blue"
              size="sm"
              onClick={login('Monic', '1234')}
            >
              Login Monic
            </Button>
            ;
            <Button colorScheme="teal" size="sm" onClick={logout()}>
              Logout
            </Button>
            ;
            <Button
              colorScheme="teal"
              variant="outline"
              size="md"
              onClick={signup(
                'Pedro',
                '1234',
                'Pedro',
                'Garcia',
                'pedro@example.com'
              )}
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
