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
  theme,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
//import { TYFSidebar } from './components/Sidebar'
import { Logo } from './Logo'

function App() {
  const api = 'http://127.0.0.1:8000/api/'

  const [userAuthenticated, setUserAuthenticated] = useState(null)

  useEffect(async () => {
    await axios
      .get(`${api}current-user`, {
        responseType: 'json',
      })
      .then(response => {
        if (response.data.id) {
          setUserAuthenticated(response.data)
          console.log(response.data)
        } else {
          console.log(response.data)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="20vmin" pointerEvents="none" />
            <Text>
              Hey {userAuthenticated ? userAuthenticated.username : 'Stranger'}:
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
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
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
