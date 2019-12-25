import React, { useEffect } from "react"
import { connect } from "react-redux"
import { initializeStocks } from "./reducers/stocksReducer"
import { initializePriceInfo } from "./reducers/priceInfoReducer"
import StockFilter from "./components/stockFilter/StockFilter"
import StockList from "./components/StockList"

const App = (props) => {
  const initStocks = props.initializeStocks
  const initPriceInfo = props.initializePriceInfo

  useEffect(() => {
    initStocks()
    initPriceInfo()
  }, [initStocks, initPriceInfo])

  return (
    <div>
      <h1>FinStock client</h1>
      <StockFilter />
      <StockList />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps, 
  { initializeStocks, initializePriceInfo })(App)
