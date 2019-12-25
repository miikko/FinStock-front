import React from "react"
import { connect } from "react-redux"

const StockList = (props) => {
  if (!props.priceInfo || !props.stocks) {
    return ""
  }

  const lastYear = new Date().getFullYear() - 1
  const stockFilters = props.stockFilters
  const priceInfo = props.priceInfo
  const lastPriceUpdate = new Date(priceInfo.lastUpdate)
    .toLocaleString("en-FI")

  const checkIfFiltered = (stock) => {
    for (let i = 0; i < stockFilters.length; i++) {
      const filter = stockFilters[i]
      const indicatorName = filter.indicatorName
      //Filter stocks that dont have a comparable value for a filter
      if (!stock.indicators[indicatorName]) {
        return true
      }
      const indicatorValue = parseFloat(
        stock.indicators[indicatorName][lastYear])
      if (!indicatorValue ||
        (!isNaN(filter.lowerBound) && indicatorValue < filter.lowerBound) ||
        (!isNaN(filter.upperBound) && indicatorValue > filter.upperBound)) {
        return true
      }
    }
    return false
  }

  const stocksToDisplay = props.stocks.filter(
    stock => !checkIfFiltered(stock)
  )

  const openSiteOnNewTab = (url) => {
    window.open(url, "_blank", "noopener noreferrer")
  }

  return (
    <div>
      <p>Prices updated {lastPriceUpdate}</p>
      {stocksToDisplay.length === 0
        ? <p>No stocks matched the given filters.</p>
        :
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (Euro)</th>
              {stockFilters.map(filter =>
                <th key={filter.indicatorName}>
                  {filter.indicatorName}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {stocksToDisplay.map(stock => {
              const price = priceInfo.prices.find(price =>
                price.name === stock.name
              )
              let priceValue
              if (price) {
                priceValue = price.value
              }
              return (
                <tr key={stock.name}>
                  <td>{stock.name}</td>
                  <td>{priceValue}</td>
                  {stockFilters.map(filter =>
                    <td key={filter.indicatorName}>
                      {stock.indicators[filter.indicatorName][lastYear]}
                    </td>
                  )}
                  <td>
                    <button onClick={() => openSiteOnNewTab(stock.url)}>
                      More info
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stockFilters: state.stockFilters,
    stocks: state.stocks,
    priceInfo: state.priceInfo
  }
}

export default connect(mapStateToProps)(StockList)