import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ROUTES, STATUS_CODE } from './enums/routes'
import ResultComponent from './components/Result/Result'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Departments from './pages/Departments/Departments'
import Employees from './pages/Employees/EmployeesPage'
import { getRecord } from './utils'
import { STORAGE } from './enums/storage'

type ProtectedRouteType = {
	redirectPath?: string;
	children?: JSX.Element;
};

const AppRouter = () => {
    const ProtectedRoute = ({
		redirectPath = ROUTES.LOGIN,
		children,
	}: ProtectedRouteType) => {
		const access_token = getRecord(STORAGE.ACCESS_TOKEN);
		if (!access_token) {
			return <Navigate to={redirectPath} replace />;
		}

		return children ? children : <Outlet />;
	};

    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.HOME} element={<Dashboard/>} />
                <Route path={ROUTES.DEPARTMENTS} element={<Departments/>} />
                <Route path={ROUTES.EMPLOYEES} element={<Employees/>} />
			</Route>
            <Route
                path={ROUTES.WILD_CARD}
                element={<ResultComponent status={STATUS_CODE.NOT_FOUND} />}
            />
            <Route
                path={ROUTES.SERVER_ERROR}
                element={<ResultComponent status={STATUS_CODE.SERVER_ERROR} />}
            />
        </Routes>
    )
}

export default AppRouter
