import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

function Home(props) {
  return (
    <Box>
      <h1>Home page</h1>
      <p>Hey, {props.isUserAuthenticated ? props.user.username : 'Stranger'}</p>
    </Box>
  )
}

Home.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
}

export default Home
