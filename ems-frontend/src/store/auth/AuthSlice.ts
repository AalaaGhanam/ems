import { STORAGE } from '../../enums/storage';
import {
	clearRecords,
	getRecord,
	openNotification,
	saveRecord,
} from '../../utils/index';
import { loginUser } from './AuthActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import { UserRole } from '../../enums/userRole';
import { User } from '../../models/user.model';

type AuthState = {
	user: User | null;
};

interface AuthPayload {
	access_token: string;
	id_token: string;
}

const initialState: AuthState = {
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loadUser: (state) => {
			state.user = getRecord(STORAGE.USER);
		},
		logout: (state) => {
			state.user = null;
			clearRecords();
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<AuthPayload>) => {
				const { payload } = action;
				const { access_token } = payload;

				const { username, role } = jwtDecode<{
					username: string;
					role: UserRole;
				}>(access_token);

				const user: User = { name: username, role };
				state.user = user;
				saveRecord(STORAGE.ACCESS_TOKEN, access_token);
				saveRecord(STORAGE.USER, user);
				openNotification('Logged in successfully', 'success');
			}
		);
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
