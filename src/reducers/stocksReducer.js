import stocksService from "../services/stocks"

const stocksReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_STOCKS":
      return action.data
    default:
      return state
  }
}

export const initializeStocks = () => {
  return async (dispatch) => {
    const stocks = await stocksService.getAll()
    dispatch({
      type: "INIT_STOCKS",
      data: stocks
    })
  }
}

export default stocksReducer