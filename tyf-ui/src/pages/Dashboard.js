import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { StatBadge } from '../components/StatBadge'
import PersonalFinanceService from '../services/personalFinance.service'

function Dashboard(props) {
  const personalFinanceService = new PersonalFinanceService()

  const [capital, setCapital] = useState(0)
  const [capitalVariation, setCapitalVariation] = useState(0)

  useEffect(async () => {
    const userCapital = await personalFinanceService.computeUserCapital(
      props.user.id,
      props.account.currency.ticker
    )
    setCapital(userCapital)
    const initial = Number(props.account.amount)
    const variation = ((userCapital - initial) / initial) * 100
    setCapitalVariation(variation)
  }, [])

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
      <StatBadge
        label="Total Capital"
        money={capital}
        ticker={props.account.currency.ticker}
        percent={capitalVariation}
      />
    </Box>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Dashboard