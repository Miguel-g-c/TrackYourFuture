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

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${server}api/current-user/`, {
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

  const login = async (username, password) => {
    const data = {
      username: username,
      password: password,
    }
    const config = {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.post(`${server}token-auth/`, data, config)

      return response.data.user
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  const signup = async (username, password, firstName, lastName, email) => {
    const data = {
      username: username,
      password: password,
      fistName: firstName,
      lastName: lastName,
      email: email,
    }
    const config = {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.post(`${server}api/users/`, data, config)

      return response.data.user
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const user = await fetchCurrentUser()
      setUser(user)
      setIsUserAuthenticated(true)
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
              onClick={async event => {
                event.preventDefault()
                const user = await login('Miguel', 'super1234')
                console.log(user)
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
                const user = await login('Monic', '1234')
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
                logout()
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
                const user = await signup(
                  'Pedro',
                  '1234',
                  'Pedro',
                  'Garcia',
                  'pedro@example.com'
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
