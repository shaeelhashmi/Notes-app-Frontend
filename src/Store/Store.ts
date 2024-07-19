import { configureStore } from '@reduxjs/toolkit'
import UserName from '../Slice/GetUserName/UserName'
import Check from '../Slice/ValuesTaken/Check'
import Mode from '../Slice/SetLightMode/Mode'
export default configureStore({
  reducer: {
    Mode:Mode,
    getUserName:UserName,
    Check:Check
  },
})