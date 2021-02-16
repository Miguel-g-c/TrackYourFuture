import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Stack,
  Spacer,
  Button,
  Heading,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { ExpensesTable } from '../components/ExpensesTable'
import { SearchBar } from '../components/SearchBar'

function Expenses() {
  const bg = useColorModeValue('white', 'gray.700')

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
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
        <Stack mt="20px" direction={['column', 'column', 'row']} spacing={4}>
          <Box>
            <SearchBar bg={bg} />
          </Box>
          <Stack direction="row" top="10%">
            <Select
              placeholder="All categories"
              size="sm"
              width="155px"
              bg={bg}
            />
            <Select
              placeholder="All subcategories"
              size="sm"
              width="155px"
              bg={bg}
            />
          </Stack>
          <Spacer />
          <Button leftIcon={<FaPlus />} colorScheme="blue" size="sm">
            New Expense
          </Button>
        </Stack>
        <Box
          p="10px"
          mt="10px"
          border="1px"
          bg={bg}
          borderColor={useColorModeValue('gray.200', 'whiteAlpha.900')}
          borderRadius="md"
        >
          <ExpensesTable />
        </Box>
      </Box>
    </Box>
  )
}

Expenses.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Expenses
