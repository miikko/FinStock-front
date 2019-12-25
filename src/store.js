import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import stockFiltersReducer from "./reducers/stockFiltersReducer"
import stocksReducer from "./reducers/stocksReducer"
import priceInfoReducer from "./reducers/priceInfoReducer"

const reducer = combineReducers({
  stocks: stocksReducer,
  stockFilters: stockFiltersReducer,
  priceInfo: priceInfoReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store