import React from 'react'
import { Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    TeamOutlined,
    ApartmentOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Sider } = Layout

const SideMenu: React.FC = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ backgroundColor: '#488cf4', minHeight: '100vh' }}
        >
            <div
                className="logo"
                style={{ color: 'white', textAlign: 'center', padding: '16px' }}
            >
                Admin Dashboard
            </div>
            <Menu
                style={{ backgroundColor: '#488cf4' }}
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<TeamOutlined />}>
                    <Link to="/employees">Employees</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ApartmentOutlined />}>
                    <Link to="/departments">Departments</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideMenu
