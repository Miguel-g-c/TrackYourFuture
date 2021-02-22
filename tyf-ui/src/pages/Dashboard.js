import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Center, useColorModeValue } from '@chakra-ui/react'
import { StatBadge } from '../components/StatBadge'
import PersonalFinanceService from '../services/personalFinance.service'

function Dashboard(props) {
  const personalFinanceService = new PersonalFinanceService()

  const now = new Date(Date.now())

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  const [capital, setCapital] = useState(0)
  const [capitalVariation, setCapitalVariation] = useState(0)
  const [lastMonthExpenses, setLastMonthExpenses] = useState([])
  const [lastMonthTotalExpenses, setLastMonthTotalExpenses] = useState(0)
  const [expensesVariation, setExpensesVariation] = useState(0)
  const [lastMonthIncomes, setLastMonthIncomes] = useState([])
  const [lastMonthTotalIncomes, setLastMonthTotalIncomes] = useState(0)
  const [incomesVariation, setIncomesVariation] = useState(0)

  useEffect(async () => {
    const userCapital = await personalFinanceService.computeUserCapital(
      props.user.id,
      props.account.currency.ticker
    )
    setCapital(userCapital)
    const initial = Number(props.account.amount)
    const variation = ((userCapital - initial) / initial) * 100
    setCapitalVariation(variation)
    const test = await personalFinanceService.computeUserMonthIncomesByCategory(
      props.user.id,
      props.account.currency.ticker,
      2,
      2021
    )
    console.log(test)
  }, [])

  useEffect(async () => {
    const expensesByCategory = await personalFinanceService.computeUserMonthExpensesByCategory(
      props.user.id,
      props.account.currency.ticker,
      now.getMonth() + 1,
      now.getFullYear()
    )
    setLastMonthExpenses(expensesByCategory)

    var expenses = 0
    for (const i in expensesByCategory) {
      expenses += expensesByCategory[i].expenses
    }
    setLastMonthTotalExpenses(expenses)

    const prevExpensesByCategory = await personalFinanceService.computeUserMonthExpensesByCategory(
      props.user.id,
      props.account.currency.ticker,
      now.getMonth(),
      now.getFullYear()
    )
    var prevExpenses = 0
    for (const i in prevExpensesByCategory) {
      prevExpenses += prevExpensesByCategory[i].expenses
    }

    const variation = ((expenses - prevExpenses) / prevExpenses) * 100
    setExpensesVariation(variation)
  }, [])

  useEffect(async () => {
    const incomesByCategory = await personalFinanceService.computeUserMonthIncomesByCategory(
      props.user.id,
      props.account.currency.ticker,
      now.getMonth() + 1,
      now.getFullYear()
    )
    setLastMonthIncomes(incomesByCategory)

    var incomes = 0
    for (const i in incomesByCategory) {
      incomes += incomesByCategory[i].incomes
    }
    setLastMonthTotalIncomes(incomes)

    const prevIncomesByCategory = await personalFinanceService.computeUserMonthIncomesByCategory(
      props.user.id,
      props.account.currency.ticker,
      now.getMonth(),
      now.getFullYear()
    )
    var prevIncomes = 0
    for (const i in prevIncomesByCategory) {
      prevIncomes += prevIncomesByCategory[i].incomes
    }

    const variation = ((incomes - prevIncomes) / prevIncomes) * 100
    setIncomesVariation(variation)

    console.log(lastMonthExpenses, lastMonthIncomes)
  }, [])

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH="100vh" width="100%">
      <Center pt="50px">
        <StatBadge
          label="Total Capital"
          money={capital}
          ticker={props.account.currency.ticker}
          percent={capitalVariation}
        />
      </Center>
      <Stack
        mt="30px"
        direction={['column', 'row', 'row']}
        spacing={8}
        justify="center"
        align="center"
      >
        <StatBadge
          label={`${now
            .toLocaleString('default', {
              month: 'short',
            })
            .capitalize()} Expenses`}
          money={lastMonthTotalExpenses}
          ticker={props.account.currency.ticker}
          percent={expensesVariation}
        />
        <StatBadge
          label={`${now
            .toLocaleString('default', {
              month: 'short',
            })
            .capitalize()} Incomes`}
          money={lastMonthTotalIncomes}
          ticker={props.account.currency.ticker}
          percent={incomesVariation}
        />
      </Stack>
    </Box>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Dashboard
