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
import { IncomesTable } from '../components/IncomesTable'
import { IncomesForm } from '../components/IncomesForm'
import PersonalFinanceService from '../services/personalFinance.service'
import './Incomes.css'

function Incomes(props) {
  const personalFinanceService = new PersonalFinanceService()

  const bg = useColorModeValue('white', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState('')

  const [fetching, setFetching] = useState(false)
  const [incomes, setIncomes] = useState([])
  const [page, setPage] = useState(1)
  const [isNext, setIsNext] = useState(false)
  const [isPrev, setIsPrev] = useState(false)
  const [trigger, setTrigger] = useState(false)

  useEffect(async () => {
    const serverCategories = await personalFinanceService.fetchIncomeCategories()
    setCategories(serverCategories)
  }, [])

  const handleOnChange = (event, set) => {
    set(event.currentTarget.value)
  }

  useEffect(async () => {
    setFetching(true)
    const userIncomes = await personalFinanceService.fetchUserIncomes(
      props.user.id,
      page,
      category
    )
    if (userIncomes) {
      setIsNext(typeof userIncomes.next === 'string')
      setIsPrev(typeof userIncomes.previous === 'string')
      setIncomes(userIncomes.results)
    }
    setFetching(false)
  }, [page, category, trigger])

  const handleNewIncome = () => {
    setTrigger(!trigger)
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
      <IncomesForm
        isOpen={isOpen}
        onClose={onClose}
        handleNewIncome={handleNewIncome}
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
          Incomes
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
            </Stack>
          </Stack>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            size="sm"
            width="130px"
            onClick={onOpen}
          >
            New Income
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
          <IncomesTable incomes={incomes} fetching={fetching} />
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

Incomes.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Incomes
