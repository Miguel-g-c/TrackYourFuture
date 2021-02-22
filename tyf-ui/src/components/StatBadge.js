import React from 'react'
import PropTypes from 'prop-types'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react'
import CurrencyService from '../services/currency.service'

export const StatBadge = props => {
  const currencyService = new CurrencyService()
  const moneyString = currencyService.format(props.money, props.ticker)

  return (
    <Stat
      bg={useColorModeValue('white', 'gray.700')}
      py="8"
      px="10"
      shadow="base"
      rounded="md"
      maxWidth="300px"
      minWidth={['100%', 'inherit', 'inherit']}
    >
      <StatLabel>{props.label}</StatLabel>
      <StatNumber>{moneyString}</StatNumber>
      <StatHelpText>
        {props.percent !== 0 && (
          <StatArrow type={props.percent > 0 ? 'increase' : 'decrease'} />
        )}
        {props.percent.toFixed(2)}%
      </StatHelpText>
    </Stat>
  )
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  ticker: PropTypes.string.isRequired,
}
