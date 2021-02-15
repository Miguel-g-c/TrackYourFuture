import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  Stack,
  CircularProgress,
  Tooltip,
} from '@chakra-ui/react'
import { ErrorMessage } from '../components/ErrorMessage'
import { DividerWithText } from '../components/DividerWithText'
import AuthenticationService from '../services/authentication.service'
import PersonalFinanceService from '../services/personalFinance.service'

export const RegisterForm = props => {
  const authenticationService = new AuthenticationService()
  const personalFinanceService = new PersonalFinanceService()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notMatch, setNotMatch] = useState(false)
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState('5000.00')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    const serverCurrencies = await personalFinanceService.fetchCurrencies()
    setCurrencies(serverCurrencies)
  }, [])

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setNotMatch(true)
      } else {
        setNotMatch(false)
      }
    }
  }, [password, confirmPassword])

  /* 
  const getCurrencySymbol = ticker => {
    return currencies.reduce(
      (a, obj) => (obj.ticker === ticker && a.push(obj.symbol), a),
      []
    )[0]
  }
 */

  const format = val => {
    if (currency === 'USD') return `$ ${val}`
    return `${val} €`
  }

  const parse = val => {
    if (currency === 'USD') return val.replace(/^\$/, '').trim()
    return val.replace(/^€/, '').trim()
  }

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
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            onChange={event => handleOnChange(event, setUsername)}
          />
        </FormControl>
        <FormControl id="first" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            name="first"
            type="text"
            placeholder="First name"
            onChange={event => handleOnChange(event, setFirst)}
          />
        </FormControl>
        <FormControl id="last" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            name="last"
            type="text"
            placeholder="Last name"
            onChange={event => handleOnChange(event, setLast)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="awesomeNewUser@example.com"
            onChange={event => handleOnChange(event, setEmail)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            isInvalid={notMatch}
            errorBorderColor="crimson"
            onChange={event => handleOnChange(event, setPassword)}
          />
        </FormControl>
        <FormControl id="confirmed-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirm password"
            type="password"
            placeholder="*******"
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
        <DividerWithText mt="6">Account Settings</DividerWithText>
        <FormControl id="currency" isRequired>
          <FormLabel>Currency</FormLabel>
          <Select
            name="currency"
            defaultValue={'EUR'}
            onChange={event => handleOnChange(event, setCurrency)}
          >
            {currencies.map(currencie => (
              <option key={currencie.id} value={currencie.ticker}>
                {currencie.name}, {currencie.symbol}
              </option>
            ))}
          </Select>
        </FormControl>
        <Tooltip
          label="Specify your current liquidity (bank and cash)"
          aria-label="amount tooltip"
        >
          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>

            <NumberInput
              onChange={valueString => {
                setAmount(parse(valueString))
              }}
              value={format(amount)}
              max={99999999.99}
              precision={2}
              step={0.25}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Tooltip>

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
