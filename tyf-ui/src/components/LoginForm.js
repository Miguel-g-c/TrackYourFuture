import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { ErrorMessage } from '../components/ErrorMessage'
import AuthenticationService from '../services/authentication.service'

export const LoginForm = props => {
  const authenticationService = new AuthenticationService()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const user = await authenticationService.login(username, password)
      setIsLoading(false)
      setShowPassword(false)
      props.userHandler(user)
    } catch (error) {
      setError('Invalid username or password')
      setIsLoading(false)
      setShowPassword(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <Stack spacing="6">
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            isRequired
            onChange={event => {
              setError('')
              setUsername(event.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              isRequired
              onChange={event => {
                setError('')
                setPassword(event.currentTarget.value)
              }}
            />
            <InputRightElement width="3rem">
              <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  )
}

LoginForm.propTypes = {
  userHandler: PropTypes.func.isRequired,
}
