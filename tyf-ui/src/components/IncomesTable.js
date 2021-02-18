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

export const IncomesTable = props => {
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
          {props.incomes.map(income => (
            <Skeleton key={income.id} height="25px" />
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
              <Th borderColor={bc}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.incomes.map(income => (
              <Tr key={income.id}>
                <Tooltip
                  hasArrow
                  placement="right"
                  size="sm"
                  colorScheme="blue"
                  label={income.description}
                  aria-label="income description tooltip"
                >
                  <Td borderColor={bc}>{income.name}</Td>
                </Tooltip>
                <Td borderColor={bc} isNumeric>
                  {currencyService.format(
                    income.amount,
                    income.currency.ticker
                  )}
                </Td>
                <Td borderColor={bc}>{income.category.name}</Td>
                <Td borderColor={bc}>{toDate(income.timestamp)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  )
}

IncomesTable.propTypes = {
  incomes: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
}
