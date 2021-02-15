import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react'

export const DividerWithText = props => (
  <Flex align="center" color="gray.300" {...props}>
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
    <Box
      as="span"
      px="3"
      color={useColorModeValue('gray.600', 'gray.400')}
      fontWeight="medium"
      fontSize={17}
    >
      {props.children}
    </Box>
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
  </Flex>
)

DividerWithText.propTypes = {
  children: PropTypes.node.isRequired,
}
