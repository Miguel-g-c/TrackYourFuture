import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Box, Button, Heading, Text } from '@chakra-ui/react'

function Home(props) {
  const history = useHistory()

  return (
    <Box as="section">
      <Box
        maxW="2xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '14', sm: '16' }}
        textAlign="center"
      >
        <Heading
          as="h2"
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          Hey {props.user ? props.user.username : 'Stranger'}, Ready to Grow?
        </Heading>
        <Text mt="4" fontSize="lg">
          Are you aware of what you expend? Are you even aware of what you earn?
          Start now to build your future.
        </Text>
        <Text mt="4" fontSize="xl" fontWeight="semibold">
          Retire Earlier, Retire Wealthier
        </Text>
        <Button
          mt="8"
          as="a"
          href="#"
          size="lg"
          colorScheme="blue"
          fontWeight="bold"
          onClick={event => {
            event.preventDefault()
            history.push(props.user ? '/dashboard' : '/register')
          }}
        >
          {props.user ? 'Go to your Dashboard' : 'Join TrackYourFuture'}
        </Button>
      </Box>
    </Box>
  )
}

Home.propTypes = {
  user: PropTypes.object,
}

export default Home
