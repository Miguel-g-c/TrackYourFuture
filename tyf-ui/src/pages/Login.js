import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@chakra-ui/react'

function Login(props) {
  return (
    <Box>
      <h1>Login page</h1>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={async event => await props.handleLogin(event)}
      >
        Login Miguel
      </Button>
    </Box>
  )
}

Login.propTypes = {
  //isUserAuthenticated: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
