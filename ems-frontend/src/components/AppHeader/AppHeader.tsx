import { useNavigate } from 'react-router-dom'
import { Button, Menu, MenuProps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { ROUTES } from '../../enums/routes'
import classes from './AppHeader.module.scss'
import { useState } from 'react'
import { ItemType } from 'antd/es/menu/interface'
import { useTranslation } from 'react-i18next'

const AppHeader = () => {
    const { t } = useTranslation()

    const [current, setCurrent] = useState('1')
    const navigate = useNavigate()
    const [items, setItems] = useState<ItemType[]>([
        {
            label: <Button>{t('HOME')}</Button>,
            key: 1,
        },
    ])

    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (+key) {
            case 0:
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

