import { configureStore } from '@reduxjs/toolkit'
import CommonReducer from './common/CommonSlice'
import AuthReducer from './auth/AuthSlice'
import DashboardReducer from './dashboard/DashboardSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        common: CommonReducer,
        dashboard: DashboardReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
