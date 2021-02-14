import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import {
  Flex,
  Box,
  Center,
  Button,
  IconButton,
  ButtonGroup,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiLogInCircle, BiLogOutCircle, BiUserCircle } from 'react-icons/bi'
import { GoThreeBars } from 'react-icons/go'
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
      {props.user && (
        <Center pl="3">
          <IconButton
            variant="ghost"
            colorScheme="blue"
            aria-label="Sidebar toggler"
            fontSize="25px"
            icon={<GoThreeBars />}
            onClick={props.handleOpen}
          />
        </Center>
      )}
      <Box>
        <Link to="/">
          <TYFLogo />
        </Link>
      </Box>
      <Spacer />
      <Center>
        {props.user ? (
          <Button
            leftIcon={<BiLogOutCircle />}
            size="sm"
            variant="outline"
            colorScheme="teal"
            onClick={() => {
              props.handleLogout()
            }}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup size="sm" variant="outline" spacing="2">
            <NavLink to="/login">
              <Button leftIcon={<BiLogInCircle />} colorScheme="teal">
                Login
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button leftIcon={<BiUserCircle />} colorScheme="teal">
                Register
              </Button>
            </NavLink>
          </ButtonGroup>
        )}
        <ColorModeSwitcher ml="2" mr="2" />
      </Center>
    </Flex>
  )
}

Navbar.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
}
