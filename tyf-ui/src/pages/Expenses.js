import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Stack,
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
import { SearchBar } from '../components/SearchBar'
import { ExpensesForm } from '../components/ExpensesForm'
import './Expenses.css'

function Expenses() {
  const bg = useColorModeValue('white', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
      <ExpensesForm isOpen={isOpen} onClose={onClose} />
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
            <Box>
              <SearchBar bg={bg} />
            </Box>
            <Stack direction="row">
              <Select
                placeholder="All categories"
                size="sm"
                height="30px"
                width="155px"
                bg={bg}
              />
              <Select
                placeholder="All subcategories"
                size="sm"
                height="30px"
                width="155px"
                bg={bg}
              />
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
          <ExpensesTable />
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
          />
          <IconButton
            colorScheme="blue"
            aria-label="Next"
            size="sm"
            icon={<GrNext />}
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
