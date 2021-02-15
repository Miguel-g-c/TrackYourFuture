import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Center,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import { AiOutlineStock } from 'react-icons/ai'
import lightLogo from './static/tyf_light.png'
import darkLogo from './static/tyf_dark.png'

export const Sidebar = props => {
  const logo = useColorModeValue(lightLogo, darkLogo)
  const location = useLocation()
  const [active, setActive] = useState({
    dashboard: false,
    incomes: false,
    expenses: false,
    assets: false,
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
    <Drawer
      isOpen={props.isOpen}
      placement="left"
      onClose={props.onClose}
      autoFocus={false}
      returnFocusOnClose={false}
    >
      <DrawerOverlay className="sidebar" style={{ zIndex: 9999 }}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
            <Center>
              <Image className="sidebar-item" src={logo} />
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <Link to="/dashboard">
              <Button
                leftIcon={<MdDashboard />}
                colorScheme="teal"
                variant="ghost"
                height="35px"
                justifyContent="flex-start"
                isFullWidth
                isActive={active.dashboard}
                my={2}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/incomes">
              <Button
                leftIcon={<GiReceiveMoney />}
                colorScheme="teal"
                variant="ghost"
                height="35px"
                justifyContent="flex-start"
                isFullWidth
                isActive={active.incomes}
                my={2}
              >
                Incomes
              </Button>
            </Link>
            <Link to="/expenses">
              <Button
                leftIcon={<GiPayMoney />}
                colorScheme="teal"
                variant="ghost"
                height="35px"
                justifyContent="flex-start"
                isFullWidth
                isActive={active.expenses}
                my={2}
              >
                Expenses
              </Button>
            </Link>
            <Link to="/assets">
              <Button
                leftIcon={<AiOutlineStock />}
                colorScheme="teal"
                variant="ghost"
                height="35px"
                justifyContent="flex-start"
                isFullWidth
                isActive={active.assets}
                my={2}
              >
                Assets
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
