import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setUser, logout, setRole } from '@/store/slicer/userSlice';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)

  const loginUser = (userData: { name: string; email: string; role: string }) => {
    dispatch(setUser(userData))
  };

  const logoutUser = () => {
    dispatch(logout())
  }

  const updateRole = (role: string) => {
    dispatch(setRole(role))
  }

  return {
    user,
    loginUser,
    logoutUser,
    updateRole,
    isLoggedIn: user.isLoggedIn,
  }
} 