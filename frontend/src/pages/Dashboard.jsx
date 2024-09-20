import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MainContent from '../components/MainContent'
import { useDispatch, useSelector } from 'react-redux';
import { getRelations } from '../features/relation/relationSlice';
import { getAllPeople } from '../features/people/peopleSlice';

export default function Dashboard() {

  const dispatch = useDispatch();
  const { relations, status, error } = useSelector((state) => state.relations);
  const { people, loading, error: peopleError } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(getRelations());
    dispatch(getAllPeople());
  }, []);
  

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="wrapper">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <MainContent data={relations} people={people} />
      </div>
    </div>
  )
}
