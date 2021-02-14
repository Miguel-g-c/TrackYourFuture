import React from 'react'
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
import { MdDashboard, MdSettings } from 'react-icons/md'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import { AiOutlineStock } from 'react-icons/ai'
import lightLogo from './static/tyf_light.png'
import darkLogo from './static/tyf_dark.png'

export const Sidebar = props => {
  const logo = useColorModeValue(lightLogo, darkLogo)

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
            <Button
              leftIcon={<MdDashboard />}
              colorScheme="teal"
              variant="outline"
              isFullWidth
              my={2}
            >
              Dashboard
            </Button>
            <Button
              leftIcon={<MdSettings />}
              colorScheme="teal"
              variant="outline"
              isFullWidth
              my={2}
            >
              Account settings
            </Button>
            <Button
              leftIcon={<GiReceiveMoney />}
              colorScheme="teal"
              variant="outline"
              isFullWidth
              my={2}
            >
              Incomes
            </Button>
            <Button
              leftIcon={<GiPayMoney />}
              colorScheme="teal"
              variant="outline"
              isFullWidth
              my={2}
            >
              Expenses
            </Button>
            <Button
              leftIcon={<AiOutlineStock />}
              colorScheme="teal"
              variant="outline"
              isFullWidth
              my={2}
            >
              Assets
            </Button>
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
