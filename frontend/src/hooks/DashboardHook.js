// hooks/useFetchDashboardData.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations } from '../features/relation/relationSlice';
import { getAllPeople } from '../features/people/peopleSlice';

const useFetchDashboardData = () => {
  const dispatch = useDispatch();

  const loadingRelations = useSelector((state) => state.relations.status === 'loading');
  const loadingPeople = useSelector((state) => state.people.loading);
  const relations = useSelector((state) => state.relations.relations);
  const people = useSelector((state) => state.people.people);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getRelations()), dispatch(getAllPeople())]);
    };

    fetchData();
  }, [dispatch]);

  const isLoading = loadingRelations || loadingPeople;

  return { relations, people, isLoading };
};

export default useFetchDashboardData;
