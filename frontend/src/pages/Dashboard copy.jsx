import React, { useEffect } from 'react';
import MainContent from '../components/MainContent';
import { useDispatch, useSelector} from 'react-redux';
import { getRelations } from '../features/relation/relationSlice';
import { getAllPeople } from '../features/people/peopleSlice';
import Layout from './Layout';

const Dashboard = () => {
  const dispatch = useDispatch();

  const relations = useSelector((state) => state.relations.relations);
  const people = useSelector((state) => state.people.people);

  useEffect(() => {
    dispatch(getRelations());
    dispatch(getAllPeople());
  }, [dispatch]);

  return (
    <Layout>
      <MainContent data={relations} people={people} />
    </Layout>
  );
};

export default Dashboard;
