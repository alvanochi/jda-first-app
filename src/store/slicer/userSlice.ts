import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
  name: string
  email: string
  role: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  name: '',
  email: '',
  role: '',
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string; role: string }>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role
      state.isLoggedIn = true
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    logout: (state) => {
      state.name = ''
      state.email = ''
      state.role = ''
      state.isLoggedIn = false
      localStorage.clear()
    },
  },
})

export const { setUser, setRole, logout } = userSlice.actions
export default userSlice.reducer
