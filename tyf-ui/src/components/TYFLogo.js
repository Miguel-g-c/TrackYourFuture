import React, { useState, useEffect } from 'react'
import { Image, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import logoLight from './static/tyf_light_2.png'
import logoDark from './static/tyf_dark_2.png'
import iconLight from './static/tyf_light_icon.png'
import iconDark from './static/tyf_dark_icon.png'

export const TYFLogo = props => {
  const isLight = useColorModeValue(true, false)
  const [isMobile] = useMediaQuery('(max-width: 700px)')

  const [logo, setLogo] = useState(logoLight)

  useEffect(() => {
    if (isMobile) {
      if (isLight) {
        setLogo(iconLight)
      } else {
        setLogo(iconDark)
      }
    } else {
      if (isLight) {
        setLogo(logoLight)
      } else {
        setLogo(logoDark)
      }
    }
  }, [isLight, isMobile])

  return <Image src={logo} {...props} />
}
