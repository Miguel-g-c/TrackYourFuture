import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
} from '@chakra-ui/react'
import PersonalFinanceService from '../services/personalFinance.service'

export const IncomesForm = props => {
  const personalFinanceService = new PersonalFinanceService()

  const initialRef = React.useRef()
  const toast = useToast()

  const [currencies, setCurrencies] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(null)
  const [amount, setAmount] = useState('0.00')
  const [currency, setCurrency] = useState(props.account.currency.id)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    const serverCurrencies = await personalFinanceService.fetchCurrencies()
    setCurrencies(serverCurrencies)
  }, [])

  const handleOnChange = (event, set) => {
    set(event.currentTarget.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await personalFinanceService.addIncome(
        props.user.id,
        name,
        description,
        amount,
        Number(currency),
        Number(category)
      )
      toast({
        title: 'Income added succesfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setName('')
      setDescription('')
      setCategory(null)
      setAmount('0.00')
      setCurrency(props.account.currency.id)
      setIsLoading(false)
      props.onClose()
      props.handleNewIncome()
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      toast({
        title: 'Unable to add income. Try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  function getCurrencySymbolandPosition(id) {
    return currencies.reduce(
      (a, obj) => (obj.id === id && a.push([obj.symbol, obj.position]), a),
      []
    )[0]
  }

  function format(val) {
    if (currencies.length === 0) return val
    const [symbol, position] = getCurrencySymbolandPosition(Number(currency))
    if (position === 'start') return `${symbol} ${val}`
    return `${val} ${symbol}`
  }

  function parse(val) {
    if (currencies.length === 0) return val
    const symbol = getCurrencySymbolandPosition(Number(currency))[0]
    return val.replace(`${symbol}`, '').trim()
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={props.isOpen}
      onClose={() => {
        setName('')
        setDescription('')
        setCategory(null)
        setAmount('0.00')
        setCurrency(props.account.currency.id)
        props.onClose()
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Income</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Income</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Name"
                  maxLength="64"
                  onChange={event => handleOnChange(event, setName)}
                />
              </FormControl>

              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Optional description"
                  maxLength="250"
                  onChange={event => handleOnChange(event, setDescription)}
                />
              </FormControl>
              <Divider pt={2} mb={2} />
              <Stack direction="row" spacing={4}>
                <FormControl id="category" isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Category"
                    onChange={event => handleOnChange(event, setCategory)}
                  >
                    {props.categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Divider pt={4} mb={3} />
              <Stack direction="row" spacing={4}>
                <FormControl id="amount" width="260px" isRequired>
                  <FormLabel>Amount</FormLabel>

                  <NumberInput
                    min={0}
                    max={999999.99}
                    precision={2}
                    step={0.25}
                    pattern={null}
                    onChange={valueString => setAmount(parse(valueString))}
                    value={format(amount)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl id="currency" isRequired>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    name="currency"
                    defaultValue={props.account.currency.id}
                    onChange={event => handleOnChange(event, setCurrency)}
                  >
                    {currencies.map(currencie => (
                      <option key={currencie.id} value={currencie.id}>
                        {currencie.name}, {currencie.symbol}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

IncomesForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  account: PropTypes.object,
  categories: PropTypes.array,
  handleNewIncome: PropTypes.func.isRequired,
}
