import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  CircularProgress,
} from '@chakra-ui/react'
import { ErrorMessage } from '../components/ErrorMessage'
import AuthenticationService from '../services/authentication.service'

export const RegisterForm = props => {
  const authenticationService = new AuthenticationService()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notMatch, setNotMatch] = useState(false)
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setNotMatch(true)
      } else {
        setNotMatch(false)
      }
    }
  }, [password, confirmPassword])

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const user = await authenticationService.signup(
        username,
        password,
        email,
        first,
        last
      )
      setIsLoading(false)
      props.userHandler(user)
    } catch (error) {
      setError('Username or email already exist')
      setIsLoading(false)
    }
  }

  const handleOnChange = (event, set) => {
    setError('')
    set(event.currentTarget.value)
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
            placeholder="Username"
            isRequired
            onChange={event => handleOnChange(event, setUsername)}
          />
        </FormControl>
        <FormControl id="first">
          <FormLabel>First Name</FormLabel>
          <Input
            name="first"
            type="text"
            placeholder="First name"
            isRequired
            onChange={event => handleOnChange(event, setFirst)}
          />
        </FormControl>
        <FormControl id="last">
          <FormLabel>Last name</FormLabel>
          <Input
            name="last"
            type="text"
            placeholder="Last name"
            isRequired
            onChange={event => handleOnChange(event, setLast)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="awesomeNewUser@example.com"
            isRequired
            onChange={event => handleOnChange(event, setEmail)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            isRequired
            isInvalid={notMatch}
            errorBorderColor="crimson"
            onChange={event => handleOnChange(event, setPassword)}
          />
        </FormControl>
        <FormControl id="confirmed-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirm password"
            type="password"
            placeholder="*******"
            isRequired
            isInvalid={notMatch}
            errorBorderColor="crimson"
            onChange={event => handleOnChange(event, setConfirmPassword)}
          />
          {notMatch && (
            <FormHelperText textAlign="left">
              Passwords don&apos;t match
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          {isLoading ? (
            <CircularProgress isIndeterminate size="25px" color="blue" />
          ) : (
            'Register'
          )}
        </Button>
      </Stack>
    </form>
  )
}

RegisterForm.propTypes = {
  userHandler: PropTypes.func.isRequired,
}
