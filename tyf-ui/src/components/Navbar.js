import React from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Box,
  Center,
  Button,
  ButtonGroup,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiLogInCircle, BiLogOutCircle, BiUserCircle } from 'react-icons/bi'
import { TYFLogo } from './TYFLogo'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import './Navbar.css'

export const Navbar = props => {
  const bg = useColorModeValue(
    'linear(to-tr, gray.400, blue.100)',
    'linear(to-tr, black, purple.900)'
  )

  return (
    <Flex as="nav" className="navbar" bgGradient={bg}>
      <Box>
        <TYFLogo />
      </Box>
      <Spacer />
      <Center>
        {props.isUserAuthenticated ? (
          <Button
            leftIcon={<BiLogOutCircle />}
            size="sm"
            variant="outline"
            colorScheme="teal"
            onClick={props.handleLogout}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup size="sm" variant="outline" spacing="2">
            <Button leftIcon={<BiLogInCircle />} colorScheme="teal">
              Login
            </Button>
            <Button leftIcon={<BiUserCircle />} colorScheme="teal">
              Register
            </Button>
          </ButtonGroup>
        )}
        <ColorModeSwitcher ml="2" mr="2" />
      </Center>
    </Flex>
  )
}

Navbar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
}
