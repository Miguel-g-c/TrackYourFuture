import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { FaSearchDollar } from 'react-icons/fa'

export const SearchBar = props => {
  return (
    <InputGroup size="sm" width="205px" bg={props.bg} borderRadius="md">
      <InputLeftElement pointerEvents="none">
        <FaSearchDollar />
      </InputLeftElement>
      <Input type="text" placeholder="Search expenses by name" />
    </InputGroup>
  )
}

SearchBar.propTypes = {
  bg: PropTypes.string,
}
