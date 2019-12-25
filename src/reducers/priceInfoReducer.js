import pricesService from "../services/prices"

const priceInfoReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_PRICE_INFO":
      return action.data
    default:
      return state
  }
}

export const initializePriceInfo = () => {
  return async (dispatch) => {
    const prices = await pricesService.getAll()
    dispatch({
      type: "INIT_PRICE_INFO",
      data: prices
    })
  }
}

export default priceInfoReducer