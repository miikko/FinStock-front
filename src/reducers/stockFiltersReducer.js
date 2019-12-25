const stockFiltersReducer = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_FILTER":
      const filterName = action.data.indicatorName
      return state.filter(filter => filter.indicatorName !== filterName)
    case "ADD_FILTER":
      const filter = action.data
      return [...state, filter]
    case "RESET_FILTERS":
      return []
    default:
      return state
  }
}

export const resetFilters = () => {
  return {
    type: "RESET_FILTERS"
  }
}

export const addFilter = (filter) => {
  return {
    type: "ADD_FILTER",
    data: filter
  }
}

export const removeFilter = (filter) => {
  return {
    type: "REMOVE_FILTER",
    data: filter
  }
}

export default stockFiltersReducer