import React from 'react'
import { Image, useColorMode } from '@chakra-ui/react'
import logoLight from './tyf_light.png'
import logoDark from './tyf_dark.png'

export const TYFLogo = props => {
  const { colorMode } = useColorMode()

  return <Image src={colorMode === 'light' ? logoLight : logoDark} {...props} />
}
