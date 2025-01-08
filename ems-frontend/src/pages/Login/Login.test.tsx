import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as authActions from '../../store/auth/AuthActions';
import Login from './Login';
import { renderInRedux } from '../../test-utils';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('Login', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render successfully', async () => {
		const { renderResult } = renderInRedux(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		expect(renderResult.container).toBeInstanceOf(HTMLElement);
	});

	test('Write user, submit, then call dispatch & loginUser', async () => {
		const user = { username: 'test@test.com', password: 'password' };

		const mockLoginUser = jest
			.spyOn(authActions, 'loginUser')
			.mockImplementation(() => jest.fn());

		const { store } = renderInRedux(
			<BrowserRouter>
					<Login />
			</BrowserRouter>
		);

		const userInput = screen.getByPlaceholderText('Username');
		await userEvent.type(userInput, user.username);

		const userPassword = screen.getByPlaceholderText('Password');
		await userEvent.type(userPassword, user.password);

		const doneButton = screen.getByText('Log in');
		await userEvent.click(doneButton);

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(mockLoginUser).toHaveBeenCalledWith(user);
	});
});
