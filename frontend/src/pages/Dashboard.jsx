// Dashboard.js
import React, { useEffect } from 'react';
import MainContent from '../components/MainContent';
// import Layout from './Layout';
import useFetchDashboardData from '../hooks/DashboardHook';
import Layout from './Layout';

const Dashboard = () => {
  const { relations, people, isLoading } = useFetchDashboardData();

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="splash active">
            <div className="splash-icon"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <MainContent data={relations} people={people} />
    </Layout>
  );
}

export default React.memo(Dashboard); // Memoize the Dashboard component
