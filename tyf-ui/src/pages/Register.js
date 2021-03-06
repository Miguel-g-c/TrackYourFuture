import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { RegisterForm } from '../components/RegisterForm'

function Register(props) {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="14"
      px={{ sm: '6', lg: '8' }}
    >
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
        <Heading mt="6" textAlign="center" size="2xl" fontWeight="bold">
          Create your Account
        </Heading>
      </Box>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <RegisterForm userHandler={props.userHandler} />
        </Box>
      </Box>
    </Box>
  )
}

Register.propTypes = {
  userHandler: PropTypes.func.isRequired,
}

export default Register
