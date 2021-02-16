import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  const [active, setActive] = useState({
    login: false,
    register: false,
  })

  useEffect(() => {
    for (const property in active) {
      if (location.pathname.replace('/', '') === property) {
        setActive(prevActive => ({ ...prevActive, [property]: true }))
      } else {
        setActive(prevActive => ({ ...prevActive, [property]: false }))
      }
    }
  }, [location])

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
            variant="ghost"
            colorScheme="teal"
            fontSize="15px"
            width="100px"
            onClick={() => {
              props.handleLogout()
            }}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup size="sm" spacing="2">
            <NavLink to="/login">
              <Button
                leftIcon={<BiLogInCircle />}
                colorScheme="teal"
                fontSize="15px"
                width="100px"
                variant={active.login ? 'outline' : 'ghost'}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button
                leftIcon={<BiUserCircle />}
                colorScheme="teal"
                fontSize="15px"
                width="100px"
                variant={active.register ? 'outline' : 'ghost'}
              >
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
