import { combineReducers } from '@reduxjs/toolkit'
import userSlice from '../slicer/userSlice'

const rootReducer = combineReducers({
  user: userSlice
})

export default rootReducer
