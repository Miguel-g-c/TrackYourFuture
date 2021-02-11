import React from 'react'
import { Image, useColorMode, useMediaQuery } from '@chakra-ui/react'
import logoLight from './static/tyf_light_2.png'
import logoDark from './static/tyf_dark_2.png'
import iconLight from './static/tyf_light_icon.png'
import iconDark from './static/tyf_dark_icon.png'

const getLogo = (mediaQuery, colorMode) => {
  if (mediaQuery) {
    if (colorMode === 'light') {
      return iconLight
    } else {
      return iconDark
    }
  } else {
    if (colorMode === 'light') {
      return logoLight
    } else {
      return logoDark
    }
  }
}

export const TYFLogo = props => {
  const { colorMode } = useColorMode()
  const [isMobile] = useMediaQuery('(max-width: 700px)')

  return <Image src={getLogo(isMobile, colorMode)} {...props} />
}
