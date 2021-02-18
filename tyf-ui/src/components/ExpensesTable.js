import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react'
import CurrencyService from '../services/currency.service'

export const ExpensesTable = props => {
  const currencyService = new CurrencyService()

  const bc = useColorModeValue('gray.200', 'gray.600')

  function toDate(ISOString) {
    const date = new Date(ISOString)
    return date.toDateString()
  }

  return (
    <>
      {props.fetching ? (
        <Stack>
          <Skeleton height="25px" />
          {props.expenses.map(expense => (
            <Skeleton key={expense.id} height="25px" />
          ))}
        </Stack>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr>
              <Th borderColor={bc}>Name</Th>
              <Th borderColor={bc} isNumeric>
                Amount
              </Th>
              <Th borderColor={bc}>Category</Th>
              <Th borderColor={bc}>Subcategory</Th>
              <Th borderColor={bc}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.expenses.map(expense => (
              <Tr key={expense.id}>
                <Tooltip
                  hasArrow
                  placement="right"
                  size="sm"
                  colorScheme="blue"
                  label={expense.description}
                  aria-label="expense description tooltip"
                >
                  <Td borderColor={bc}>{expense.name}</Td>
                </Tooltip>
                <Td borderColor={bc} isNumeric>
                  {currencyService.format(
                    expense.amount,
                    props.account.currency.ticker
                  )}
                </Td>
                <Td borderColor={bc}>{expense.category.name}</Td>
                <Td borderColor={bc}>{expense.subcategory.name}</Td>
                <Td borderColor={bc}>{toDate(expense.timestamp)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  )
}

ExpensesTable.propTypes = {
  account: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
}
