import React from 'react'
import { Row, Col, Card, Statistic, Table } from 'antd'
import { TeamOutlined, ApartmentOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface ListProps {
    totalEmployees: number
    latestEmployees: any
    departmentDistribution: any
}

const DashboardOverview = ({
    totalEmployees,
    latestEmployees,
    departmentDistribution,
}: ListProps) => {
    const { t } = useTranslation()

    const recentHires = []
    recentHires.push(latestEmployees)
    const columns = [
        {
            title: t('DASHBOARD.FIRSTNAME'),
            dataIndex: 'FirstName',
            key: 'FirstName',
        },
        {
            title: t('DASHBOARD.LASTNAME'),
            dataIndex: 'LastName',
            key: 'LastName',
        },
        {
            title: t('DASHBOARD.HIREDATE'),
            dataIndex: 'HireDate',
            key: 'HireDate',
        },
    ]

    return (
        <>
            {recentHires?.length > 0 ? (
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Statistic
                                title={t('DASHBOARD.TOTAL.EMPLOYEES')}
                                value={totalEmployees}
                                prefix={<TeamOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title={t('DASHBOARD.DEPARTMENT_DISTRIBUTION')}>
                            <Row gutter={[16, 16]}>
                                {departmentDistribution?.map((dept: any) => (
                                    <Col key={dept.department_name} span={6}>
                                        <Card>
                                            <Statistic
                                                title={dept.department_name}
                                                value={String(
                                                    dept.employee_count
                                                )}
                                                prefix={<ApartmentOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title={t('DASHBOARD.RECENT_HIRES')}>
                            <Table
                                dataSource={recentHires}
                                columns={columns}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <h2>{t('LOADER')}</h2>
            )}
        </>
    )
}

export default DashboardOverview
