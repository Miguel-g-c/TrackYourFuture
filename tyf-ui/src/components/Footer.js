import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { TYFLogo } from './TYFLogo'

export const Footer = () => {
  const bg = useColorModeValue(
    'linear(to-br, gray.400, blue.100)',
    'linear(to-br, black, purple.900)'
  )

  return (
    <Box as="footer" role="contentinfo" py="6" bgGradient={bg}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        align="center"
      >
        <Link to="/">
          <TYFLogo />
        </Link>
        <Stack
          my={{ base: '6', md: 0 }}
          direction={{ base: 'column', md: 'row' }}
          marginStart={{ md: '8' }}
          fontSize="sm"
          spacing={{ base: '2', md: '8' }}
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Text>&copy; {new Date().getFullYear()} TrackYourFuture</Text>
          <Text>Created by Miguel García Casas</Text>
        </Stack>
        <ButtonGroup
          marginStart={{ md: 'auto' }}
          color="gray.600"
          variant="ghost"
        >
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/miguel-garcia-casas-b0b683145/"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
          />
          <IconButton
            as="a"
            href="https://github.com/Miguel-g-c"
            aria-label="Github"
            icon={<FaGithub />}
          />
          <IconButton
            as="a"
            href="https://miguel-g-c.github.io/"
            aria-label="Miguel García Casas"
            icon={<FaEnvelope />}
          />
        </ButtonGroup>
      </Flex>
    </Box>
  )
}
