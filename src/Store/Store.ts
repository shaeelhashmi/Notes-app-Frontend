import { configureStore } from '@reduxjs/toolkit'
import CheckLogin from '../Slice/CheckLogin/LoginCheck'
import UserName from '../Slice/GetUserName/UserName'
import Check from '../Slice/ValuesTaken/Check'
export default configureStore({
  reducer: {
    Login:CheckLogin,
    getUserName:UserName,
    Check:Check
  },
})