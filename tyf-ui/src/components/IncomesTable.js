import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Skeleton,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import CurrencyService from '../services/currency.service'

export const IncomesTable = props => {
  const currencyService = new CurrencyService()

  const bc = useColorModeValue('gray.200', 'gray.600')
  const bg = useColorModeValue(
    'linear(to-t, gray.100, white)',
    'linear(to-t, gray.800, gray.700)'
  )

  function toDate(ISOString) {
    const date = new Date(ISOString)
    return date.toDateString()
  }

  return (
    <>
      {props.fetching ? (
        <Stack>
          <Skeleton height="50px" />
          {props.incomes.map(income => (
            <Skeleton key={income.id} height="50px" />
          ))}
        </Stack>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr bgGradient={bg}>
              <Th>
                <Box pb="8px">Name</Box>
              </Th>
              <Th isNumeric>
                <Box pb="8px">Amount</Box>
              </Th>
              <Th>
                <Box pb="8px">Category</Box>
              </Th>
              <Th>
                <Box pb="8px">Date</Box>
              </Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {props.incomes.map(income => (
              <Tr key={income.id}>
                <Td borderColor={bc}>
                  <Tooltip
                    hasArrow
                    placement="right"
                    size="sm"
                    colorScheme="blue"
                    label={income.description}
                    aria-label="income description tooltip"
                  >
                    {income.name}
                  </Tooltip>
                </Td>

                <Td borderColor={bc} isNumeric>
                  {currencyService.format(
                    income.amount,
                    income.currency.ticker
                  )}
                </Td>
                <Td borderColor={bc}>{income.category.name}</Td>
                <Td borderColor={bc}>{toDate(income.timestamp)}</Td>
                <Td borderColor={bc}>
                  <Tooltip
                    hasArrow
                    size="sm"
                    label="Delete"
                    aria-label="income edit tooltip"
                  >
                    <IconButton
                      colorScheme="red"
                      fontSize="17px"
                      size="sm"
                      variant="ghost"
                      aria-label="Edit income"
                      icon={<MdDelete />}
                      onClick={() => props.handleOnDelete(income.id)}
                    />
                  </Tooltip>
                </Td>
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
  handleOnDelete: PropTypes.func.isRequired,
}
