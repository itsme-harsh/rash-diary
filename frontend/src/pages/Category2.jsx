import React, { useEffect, useState } from 'react';
import Layout from './Layout'; 
import CategoryContent2 from '../components/CategoryContent2';

export default function Category1() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="splash active">
          <div className="splash-icon"></div>
        </div>
      ) : (
        <CategoryContent2 />
      )}
    </Layout>
  );
}
