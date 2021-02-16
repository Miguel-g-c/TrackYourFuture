import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react'

export const ExpensesTable = () => {
  const bc = useColorModeValue('gray.200', 'gray.600')

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th borderColor={bc}>To convert</Th>
          <Th borderColor={bc}>into</Th>
          <Th borderColor={bc} isNumeric>
            multiply by
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td borderColor={bc}>inches</Td>
          <Td borderColor={bc}>millimetres (mm)</Td>
          <Td borderColor={bc} isNumeric>
            25.4
          </Td>
        </Tr>
        <Tr>
          <Td borderColor={bc}>feet</Td>
          <Td borderColor={bc}>centimetres (cm)</Td>
          <Td isNumeric borderColor={bc}>
            30.48
          </Td>
        </Tr>
        <Tr>
          <Td borderColor={bc}>yards</Td>
          <Td borderColor={bc}>metres (m)</Td>
          <Td borderColor={bc} isNumeric>
            0.91444
          </Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
