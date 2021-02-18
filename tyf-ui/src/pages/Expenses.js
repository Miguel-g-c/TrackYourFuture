import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Stack,
  Text,
  Button,
  IconButton,
  Heading,
  Select,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { ExpensesTable } from '../components/ExpensesTable'
import { ExpensesForm } from '../components/ExpensesForm'
import PersonalFinanceService from '../services/personalFinance.service'
import './Expenses.css'

function Expenses(props) {
  const personalFinanceService = new PersonalFinanceService()

  const bg = useColorModeValue('white', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')

  const [fetching, setFetching] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [page, setPage] = useState(1)
  const [isNext, setIsNext] = useState(false)
  const [isPrev, setIsPrev] = useState(false)
  const [trigger, setTrigger] = useState(false)

  useEffect(async () => {
    const serverCategories = await personalFinanceService.fetchExpenseCategories()
    setCategories(serverCategories)
  }, [])

  useEffect(() => {
    const categoryObj = categories.find(
      element => element.id === Number(category)
    )
    if (categoryObj) {
      setSubcategories(categoryObj.subcategories)
    } else setSubcategories([])
    return () => setSubcategory('')
  }, [category])

  const handleOnChange = (event, set) => {
    console.log(subcategory)
    set(event.currentTarget.value)
  }

  useEffect(async () => {
    setFetching(true)
    const userExpenses = await personalFinanceService.fetchUserExpenses(
      props.user.id,
      page,
      category,
      subcategory
    )
    if (userExpenses) {
      setIsNext(typeof userExpenses.next === 'string')
      setIsPrev(typeof userExpenses.previous === 'string')
      setExpenses(userExpenses.results)
    }
    setFetching(false)
  }, [page, category, subcategory, trigger])

  const handleNewExpense = () => {
    setTrigger(!trigger)
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
      <ExpensesForm
        isOpen={isOpen}
        onClose={onClose}
        handleNewExpense={handleNewExpense}
        user={props.user}
        account={props.account}
        categories={categories}
      />
      <Box
        maxW="4xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '14', sm: '16' }}
        textAlign="left"
      >
        <Heading as="h2" size="xl" fontWeight="bold">
          Expenses
        </Heading>
        <Stack
          mt="20px"
          direction={['column', 'column', 'row']}
          justifyContent="space-between"
        >
          <Stack direction={['column', 'column', 'row']}>
            <Stack direction="row">
              <Select
                placeholder="All categories"
                size="sm"
                height="30px"
                width="155px"
                bg={bg}
                onChange={event => handleOnChange(event, setCategory)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="All subcategories"
                size="sm"
                height="30px"
                width="155px"
                bg={bg}
                onChange={event => handleOnChange(event, setSubcategory)}
              >
                {subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Select>
            </Stack>
          </Stack>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            size="sm"
            width="130px"
            onClick={onOpen}
          >
            New Expense
          </Button>
        </Stack>
        <Box
          className="table-container"
          p="10px"
          mt="10px"
          border="1px"
          bg={bg}
          borderColor={useColorModeValue('gray.200', 'gray.600')}
          borderRadius="md"
        >
          <ExpensesTable
            expenses={expenses}
            fetching={fetching}
            account={props.account}
          />
        </Box>
        <Stack
          direction="row"
          spacing={4}
          align="center"
          justifyContent="flex-end"
          mt="10px"
        >
          <IconButton
            colorScheme="blue"
            aria-label="Previous"
            size="sm"
            icon={<GrPrevious />}
            isDisabled={!isPrev}
            onClick={() => setPage(page - 1)}
          />
          <Text fontSize="lg">Page {page}</Text>
          <IconButton
            colorScheme="blue"
            aria-label="Next"
            size="sm"
            icon={<GrNext />}
            isDisabled={!isNext}
            onClick={() => setPage(page + 1)}
          />
        </Stack>
      </Box>
    </Box>
  )
}

Expenses.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Expenses
