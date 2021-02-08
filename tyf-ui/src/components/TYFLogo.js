import React from 'react'
import { Image, useColorMode } from '@chakra-ui/react'
import logoLight from './tyf200x200_light.png'
import logoDark from './tyf200x200_dark.png'

export const TYFLogo = props => {
  const { colorMode } = useColorMode()

  return <Image src={colorMode === 'light' ? logoLight : logoDark} {...props} />
}
