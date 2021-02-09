import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Button, Spacer } from '@chakra-ui/react'
import { TYFLogo } from './TYFLogo'
import { ColorModeSwitcher } from './ColorModeSwitcher'

export const Navbar = props => {
  return (
    <Flex borderWidth="2px">
      <Box width="160px" overflow="hidden">
        <TYFLogo />
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
          {props.name}
        </Button>
        <Button colorScheme="teal">Log in</Button>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  )
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
}
