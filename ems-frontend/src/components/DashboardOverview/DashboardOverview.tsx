import React from 'react'
import { Row, Col, Card, Statistic, Table } from 'antd'
import { TeamOutlined, ApartmentOutlined } from '@ant-design/icons'

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
    const recentHires = []
    recentHires.push(latestEmployees)
    const columns = [
        { title: 'FirstName', dataIndex: 'FirstName', key: 'FirstName' },
        { title: 'LastName', dataIndex: 'LastName', key: 'LastName' },
        { title: 'Hire Date', dataIndex: 'HireDate', key: 'HireDate' },
    ]

    return (
        <>
            {recentHires?.length > 0 ? (
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Statistic
                                title="Total Employees"
                                value={totalEmployees}
                                prefix={<TeamOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Department Distribution">
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
                        <Card title="Recent Hires">
                            <Table
                                dataSource={recentHires}
                                columns={columns}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <h2>{'PRODUCT.LIST.EMPTY'}</h2>
            )}
        </>
    )
}

export default DashboardOverview
