import React, { useEffect, useState } from 'react';
import Layout from './Layout'; // Import the Layout component
import CategoryContent from '../components/category/CategoryContent';

export default function Category1() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Change loading state after 100 ms
    }, 100);
    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="splash active">
          <div className="splash-icon"></div>
        </div>
      ) : (
        <CategoryContent />
      )}
    </Layout>
  );
}
