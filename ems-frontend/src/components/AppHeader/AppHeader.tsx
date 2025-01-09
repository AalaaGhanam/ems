import { useNavigate } from 'react-router-dom'
import { Button, Menu, MenuProps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { ROUTES } from '../../enums/routes'
import classes from './AppHeader.module.scss'
import { useState } from 'react'
import { ItemType } from 'antd/es/menu/interface'
import { useTranslation } from 'react-i18next'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../store/hooks'
import { authActions } from '../../store/auth/AuthSlice'

const AppHeader = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [current, setCurrent] = useState('1')
    const navigate = useNavigate()
    const [items, setItems] = useState<ItemType[]>([
        {
            label: <Button>{t('HOME')}</Button>,
            key: 1,
        },
        {
            label: 'Logout',
            key: 0,
            icon: (
                <LogoutOutlined
                    style={{
                        fontSize: '24px',
                        color: 'white',
                    }}
                ></LogoutOutlined>
            ),
            style: { color: 'white' },
        },
    ])

    const logout = () => {
        dispatch(authActions.logout())
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let id = window.setTimeout(() => {}, 0)

        while (id--) {
            window.clearTimeout(id)
        }
        navigate(`/${ROUTES.LOGIN}`, { replace: true })
    }
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (+key) {
            case 0:
                logout()
                break
            case 1:
                navigate(`/${ROUTES.HOME}`)
                setCurrent(key)
                break
            default:
                break
        }
    }

    return (
        <>
            <Header className={classes.header}>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    disabledOverflow
                    items={items}
                />
            </Header>
        </>
    )
}

export default AppHeader
