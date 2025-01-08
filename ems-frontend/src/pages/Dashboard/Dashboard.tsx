import React, { useEffect } from 'react';
import { Layout } from 'antd';
import SideMenu from '../../components/SideMenu/SideMenu';
import DashboardOverview from '../../components/DashboardOverview/DashboardOverview';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { countByDepartment, getLatestEmployees, getTotalEmployees } from '../../store/dashboard/DashboardActions';
import { dashboardActions } from '../../store/dashboard/DashboardSlice';
import { commonActions } from '../../store/common/CommonSlice';

const { Content } = Layout;

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const [totalEmployees] = useAppSelector((state) => [
      state.dashboard.totalEmployees,
  ])

  const [latestEmployees] = useAppSelector((state) => [

    state.dashboard.latestEmployees
])
const [user] = useAppSelector((state) => [
  state.auth.user,
]);
console.log('jkjkjk', user)
const [departmentDistribution] = useAppSelector((state) => [
  state.dashboard.departmentDistribution,
])

  useEffect(() => {
    dispatch(dashboardActions.reset());
		dispatch(commonActions.reset());
      dispatch(getTotalEmployees())
      dispatch(getLatestEmployees())
      dispatch(countByDepartment())
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f8fdff' }}>
          <DashboardOverview totalEmployees={totalEmployees} latestEmployees={latestEmployees} departmentDistribution={departmentDistribution}/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;