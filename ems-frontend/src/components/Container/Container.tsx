import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import { STORAGE } from '../../enums/storage'
import { getRecord } from '../../utils'
import AppHeader from '../AppHeader/AppHeader'
import classes from './Container.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { authActions } from '../../store/auth/AuthSlice'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../enums/routes'
import SideMenu from '../SideMenu/SideMenu'

const Container = (props: any) => {
    const dispatch = useAppDispatch()
    const userReduxState = useAppSelector((state) => state.auth)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = getRecord(STORAGE.ACCESS_TOKEN)
        if (accessToken) {
            const { exp } = jwtDecode<{
                exp: number
            }>(accessToken)
            const remainingTime = exp * 1000 - new Date().getTime()

            setTimeout(
                () => {
                    dispatch(authActions.logout())
                    navigate(`/${ROUTES.LOGIN}`, { replace: true })
                },
                remainingTime > 0 ? remainingTime : 0
            )
        } else {
            dispatch(authActions.logout())
            navigate(`/${ROUTES.LOGIN}`, { replace: true })
        }
    }, [])

    useEffect(() => {
        if (userReduxState.user) {
            setIsLoggedIn(true)
        } else if (getRecord(STORAGE.USER)) {
            dispatch(authActions.loadUser())
        } else {
            setIsLoggedIn(false)
        }
    }, [userReduxState])

    return (
        <Layout className={classes.layout}>
            {isLoggedIn && <AppHeader />}
            <Content className={classes.content}>
                <Layout className={classes.layout}>
                    {isLoggedIn && <SideMenu />}
                    <Content className={classes.content}>
                        <div className={classes.children}>{props.children}</div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Container
