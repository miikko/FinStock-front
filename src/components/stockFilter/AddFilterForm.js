import React, { useState } from "react"
import { connect } from "react-redux"
import { addFilter } from "../../reducers/stockFiltersReducer"

const AddFilterForm = (props) => {
  const [lowerBound, setLowerBound] = useState("")
  const [upperBound, setUpperBound] = useState("")

  const filters = props.filters
  const indicatorNames = Object.keys(props.stocks[0].indicators)

  if (filters.length === indicatorNames.length) {
    return ""
  }

  const handleAddition = (event) => {
    event.preventDefault()
    const target = event.target
    const lowerBound = parseFloat(target.lowerBound.value)
    const upperBound = parseFloat(target.upperBound.value)
    if (!lowerBound && !upperBound) {
      console.log("Bounds were not given or were not numbers")
      return
    }
    const newFilter = {
      indicatorName: target.indicatorName.value,
      lowerBound,
      upperBound
    }
    props.addFilter(newFilter)
    setLowerBound("")
    setUpperBound("")
  }

  const createDropdownOptions = () => (
    indicatorNames.map(indicatorName => {
      if (filters.length === 0 || !filters.find(filter => filter.indicatorName === indicatorName)) {
        return (
          <option key={indicatorName} value={indicatorName}>
            {indicatorName}
          </option>
        )
      }
      return ""
    })
  )

  return (
    <form onSubmit={handleAddition}>
      <select name="indicatorName">
        {createDropdownOptions()}
      </select>
      <input
        name="lowerBound"
        type="text"
        placeholder="Lower bound (Number)"
        value={lowerBound}
        onChange={event => setLowerBound(event.target.value)}
      />
      <input
        name="upperBound"
        type="text"
        placeholder="Upper bound (Number)"
        value={upperBound}
        onChange={event => setUpperBound(event.target.value)}
      />
      <button type="submit">Add filter</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    filters: state.stockFilters,
    stocks: state.stocks
  }
}

export default connect(mapStateToProps, { addFilter })(AddFilterForm)