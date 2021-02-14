import React from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Input,
  Image,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import lightLogo from './static/tyf_light.png'
import darkLogo from './static/tyf_dark.png'

export const Sidebar = props => {
  const logo = useColorModeValue(lightLogo, darkLogo)

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="left"
      onClose={props.onClose}
      returnFocusOnClose={false}
    >
      <DrawerOverlay className="sidebar" style={{ zIndex: 9999 }}>
        <DrawerContent>
          <DrawerHeader>
            <Center>
              <Image className="sidebar-item" src={logo} />
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
