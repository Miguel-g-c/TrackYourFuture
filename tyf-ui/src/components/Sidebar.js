import React from 'react'
import {
  Sidebar,
  InputItem,
  DropdownItem,
  Icon,
  Item,
  Logo,
  LogoText,
} from 'react-sidebar-ui'
import { useColorMode } from '@chakra-ui/react'
import { TYFLogo } from './TYFLogo'
import 'react-sidebar-ui/dist/index.css'

export const TYFSidebar = () => {
  const { colorMode } = useColorMode()
  return (
    <Sidebar
      bgColor={colorMode === 'light' ? 'light' : 'black'}
      isCollapsed={false}
    >
      <Logo src={TYFLogo} imageName="TrackYourFuture logo" />
      <LogoText>TrackYourFuture</LogoText>
      <DropdownItem
        values={['First', 'Second', 'Third']}
        bgColor={colorMode === 'light' ? 'light' : 'black'}
      >
        Menu
      </DropdownItem>

      <Item bgColor={colorMode === 'light' ? 'light' : 'black'}>
        <Icon>
          <i className="fas fa-home" />
        </Icon>
        Home
      </Item>
      <Item bgColor={colorMode === 'light' ? 'light' : 'black'}>
        <Icon>
          <i className="fas fa-info" />
        </Icon>
        About
      </Item>
      <Item bgColor={colorMode === 'light' ? 'light' : 'black'}>
        <Icon>
          <i className="fas fa-sitemap" />
        </Icon>
        My Website
      </Item>
      <Item bgColor={colorMode === 'light' ? 'light' : 'black'}>
        <Icon>
          <i className="far fa-address-book" />
        </Icon>
        Contacts
      </Item>
      <Item bgColor={colorMode === 'light' ? 'light' : 'black'}>
        <Icon>
          <i className="fas fa-rss-square" />
        </Icon>
        Blog
      </Item>
      <InputItem type="text" placeholder={'Search...'} />
    </Sidebar>
  )
}
