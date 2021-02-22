import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Stack,
  Center,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { StatBadge } from '../components/StatBadge'
import { DoublePieChart } from '../components/DoublePieChart'
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
  // const [lastMonthIncomes, setLastMonthIncomes] = useState([])
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
    // setLastMonthIncomes(incomesByCategory)

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
  }, [])

  function parseDataToDoublePie(data) {
    const dataToPie = []
    for (const i in data) {
      for (const j in data[i].subcategories) {
        if (data[i].subcategories[j].expenses > 0) {
          dataToPie.push({
            value: data[i].subcategories[j].expenses,
            type: data[i].name,
            name: data[i].subcategories[j].name,
          })
        }
      }
    }
    return dataToPie
  }

  return (
    <Flex
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      width="100%"
      direction="column"
    >
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
        spacing={[8, 20, 20]}
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
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        shadow="base"
        rounded="md"
        mt={8}
        px={2}
        width={['100%', '100%', '680px']}
        alignSelf="center"
      >
        <Heading as="h4" size="md" mt={4}>
          {`${now
            .toLocaleString('default', {
              month: 'short',
            })
            .capitalize()} Expenses`}
        </Heading>
        <DoublePieChart data={parseDataToDoublePie(lastMonthExpenses)} />
      </Box>
    </Flex>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
}

export default Dashboard
