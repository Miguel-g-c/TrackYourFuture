import React from 'react'
import PropTypes from 'prop-types'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'
import CurrencyService from '../services/currency.service'

export const StatBadge = props => {
  const currencyService = new CurrencyService()
  const moneyString = currencyService.format(props.money, props.ticker)

  return (
    <Stat>
      <StatLabel>{props.label}</StatLabel>
      <StatNumber>{moneyString}</StatNumber>
      <StatHelpText>
        {props.percent !== 0 && (
          <StatArrow type={props.percent > 0 ? 'increase' : 'decrease'} />
        )}
        {props.percent}%
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
