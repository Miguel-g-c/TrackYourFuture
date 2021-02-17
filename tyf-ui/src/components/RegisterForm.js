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
  const [currency, setCurrency] = useState('EUR')
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

  function getCurrencySymbolandPosition(ticker) {
    return currencies.reduce(
      (a, obj) => (
        obj.ticker === ticker && a.push([obj.symbol, obj.position]), a
      ),
      []
    )[0]
  }

  function getCurrencyID(ticker) {
    return currencies.reduce(
      (a, obj) => (obj.ticker === ticker && a.push(obj.id), a),
      []
    )[0]
  }

  function format(val) {
    if (currencies.length === 0) return val
    const [symbol, position] = getCurrencySymbolandPosition(currency)
    if (position === 'start') return `${symbol} ${val}`
    return `${val} ${symbol}`
  }

  function parse(val) {
    if (currencies.length === 0) return val
    const symbol = getCurrencySymbolandPosition(currency)[0]
    return val.replace(`${symbol}`, '').trim()
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
      try {
        await personalFinanceService.createAccount(
          user.id,
          getCurrencyID(currency),
          amount
        )
      } catch (error) {
        setError('Account problem try again')
        setIsLoading(false)
      }

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
      <Stack spacing={5}>
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
        <Stack direction="row" spacing={4}>
          <Tooltip
            label="Specify your current liquidity (bank and cash)"
            aria-label="amount tooltip"
          >
            <FormControl id="amount" width="260px" isRequired>
              <FormLabel>Amount</FormLabel>

              <NumberInput
                onChange={valueString => {
                  setAmount(parse(valueString))
                }}
                value={format(amount)}
                min={0}
                max={99999999.99}
                precision={2}
                step={0.25}
                pattern={null}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Tooltip>
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
        </Stack>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isLoading={isLoading}
        >
          Register
        </Button>
      </Stack>
    </form>
  )
}

RegisterForm.propTypes = {
  userHandler: PropTypes.func.isRequired,
}
