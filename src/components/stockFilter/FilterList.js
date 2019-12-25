import React from "react"
import { connect } from "react-redux"
import { removeFilter } from "../../reducers/stockFiltersReducer"

const FilterList = (props) => {
  const filters = props.filters
  if (filters.length === 0) {
    return ""
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Lower bound</th>
          <th>Upper bound</th>
        </tr>
      </thead>
      <tbody>
        {filters.map(filter =>
          <tr key={filter.indicatorName}>
            <td>{filter.indicatorName}</td>
            <td>
              {isNaN(filter.lowerBound) ? "" : filter.lowerBound}
            </td>
            <td>
              {isNaN(filter.upperBound) ? "" : filter.upperBound}
            </td>
            <td>
              <button onClick={() => props.removeFilter(filter)}>
                Remove
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const mapStateToProps = state => {
  return {
    filters: state.stockFilters
  }
}

export default connect(mapStateToProps, { removeFilter })(FilterList)