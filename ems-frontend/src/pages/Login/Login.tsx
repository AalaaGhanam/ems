import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { LoginDto } from '../../dtos/user.dto'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import classes from './Login.module.scss'
import { loginUser } from '../../store/auth/AuthActions'
import { ROUTES } from '../../enums/routes'
import { authActions } from '../../store/auth/AuthSlice'
import jwtDecode from 'jwt-decode'
import { getRecord } from '../../utils'
import { STORAGE } from '../../enums/storage'

const LoginForm = () => {
    const [form] = Form.useForm()

    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const userReduxState = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (userReduxState.user) {
            navigate(`/${ROUTES.HOME}`, { replace: true })
        }
    }, [userReduxState])

    const onFinish = async (payload: LoginDto) => {
        try {
            await dispatch(loginUser(payload)).unwrap()
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
            }
        } catch (error) {}
    }

    return (
        <div className={classes.loginWrapper}>
            <Card className={classes.loginCard}>
                {/* <img src={pepsicoIcon} className={classes.pepsicoClientLogo} /> */}
                <Form
                    form={form}
                    className={classes.loginForm}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        className={classes.loginFormItem}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder={t('LOGIN.USERNAME')}
                            autoFocus
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        className={classes.loginFormItem}
                        rules={[
                            {
                                required: true,
                                message: t('LOGIN.PASSWORD_ERROR'),
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder={t('LOGIN.PASSWORD')}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={form.submit}
                        className={classes.loginFormButton}
                    >
                        {t('LOGIN')}
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default LoginForm
