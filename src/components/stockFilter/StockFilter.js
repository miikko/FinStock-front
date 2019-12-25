import React from "react"
import { connect } from "react-redux"
import AddFilterForm from "./AddFilterForm"
import FilterList from "./FilterList"

const StockFilter = (props) => {
  if (!props.stocks) {
    return ""
  }

  return (
    <div>
      <h3>Stock Filter</h3>
      <p>
        Choose an indicator and bounds.
        You can leave one of the bound fields empty if you want to set
        only an upper or lower bound.
        Type decimal numbers in the bound fields and separate whole
        numbers from decimals with a dot (.).
      </p>
      <AddFilterForm />
      <FilterList />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps)(StockFilter)