import { api } from '../../utils'
import { LoginDto } from '../../dtos/user.dto'
import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../config'

export const loginUser = createAsyncThunk(
    'auth/loginState',
    async (payload: LoginDto) => {
        const response = await api.post(config.apis.userLogin, payload)
        return response.data
    }
)
