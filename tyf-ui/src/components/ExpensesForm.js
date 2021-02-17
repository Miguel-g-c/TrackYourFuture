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

export const ExpensesForm = props => {
  const personalFinanceService = new PersonalFinanceService()

  const initialRef = React.useRef()
  const toast = useToast()

  const [currencies, setCurrencies] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [amount, setAmount] = useState('0.00')
  const [currency, setCurrency] = useState(props.account.currency)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    const serverCurrencies = await personalFinanceService.fetchCurrencies()
    setCurrencies(serverCurrencies)
  }, [])

  useEffect(() => {
    const categoryObj = props.categories.find(
      element => element.id === Number(category)
    )
    if (categoryObj) {
      setSubcategories(categoryObj.subcategories)
    } else setSubcategories([])
    return () => setSubcategory(null)
  }, [category])

  const handleOnChange = (event, set) => {
    set(event.currentTarget.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await personalFinanceService.addExpense(
        props.user.id,
        name,
        description,
        amount,
        Number(currency),
        Number(category),
        Number(subcategory)
      )
      toast({
        title: 'Expense added succesfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setName('')
      setDescription('')
      setCategory(null)
      setSubcategory(null)
      setAmount('0.00')
      setCurrency(props.account.currency)
      setIsLoading(false)
      props.onClose()
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      toast({
        title: 'Unable to add expense. Try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={props.isOpen}
      onClose={() => {
        setName('')
        setDescription('')
        setCategory(null)
        setSubcategory(null)
        setAmount('0.00')
        setCurrency(props.account.currency)
        props.onClose()
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Expense</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Expense</FormLabel>
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
                <FormControl id="subcategory" isRequired>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    placeholder="Subcategory"
                    onChange={event => handleOnChange(event, setSubcategory)}
                  >
                    {subcategories.map(subcategory => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
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
                    onChange={valueString => setAmount(valueString)}
                    value={amount}
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
                    defaultValue={props.account.currency}
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

ExpensesForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  account: PropTypes.object,
  categories: PropTypes.array,
}
