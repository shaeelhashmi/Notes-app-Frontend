import { configureStore } from '@reduxjs/toolkit'
import UserName from '../Slice/GetUserName/UserName'
import Check from '../Slice/ValuesTaken/Check'
export default configureStore({
  reducer: {
    getUserName:UserName,
    Check:Check
  },
})