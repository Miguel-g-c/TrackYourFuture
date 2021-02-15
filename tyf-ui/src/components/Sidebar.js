import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import { AiOutlineStock } from 'react-icons/ai'
import lightLogo from './static/tyf_light.png'
import darkLogo from './static/tyf_dark.png'

export const Sidebar = props => {
  const logo = useColorModeValue(lightLogo, darkLogo)
  const [active, setActive] = useState({
    dashboard: false,
    incomes: false,
    expenses: false,
    assets: false,
  })

  function handleClick(property) {
    for (const prop in active) {
      if (property === prop) {
        setActive(prevActive => ({ ...prevActive, [prop]: true }))
      } else {
        setActive(prevActive => ({ ...prevActive, [prop]: false }))
      }
    }
  }

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
                onClick={() => handleClick('dashboard')}
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
                onClick={() => handleClick('incomes')}
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
                onClick={() => handleClick('expenses')}
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
                onClick={() => handleClick('assets')}
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
