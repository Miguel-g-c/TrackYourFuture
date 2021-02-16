import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

export const ExpensesForm = props => {
  const initialRef = React.useRef()

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Expense</FormLabel>
            <Input ref={initialRef} placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue">Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ExpensesForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
