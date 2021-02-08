import React from 'react'
import {
  Image,
  keyframes,
  usePrefersReducedMotion,
  useColorMode,
} from '@chakra-ui/react'
import logoLight from './tyf200x200_light.png'
import logoDark from './tyf200x200_dark.png'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = props => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { colorMode } = useColorMode()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`

  return (
    <Image
      animation={animation}
      src={colorMode === 'light' ? logoLight : logoDark}
      {...props}
    />
  )
}
