import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feather from 'feather-icons';

const SidebarItem = ({ title, icon, link, subItems, isDropdownOpen, toggleDropdown, isActive }) => (
  <li className={`sidebar-item ${isActive ? 'active' : ''}`}>
    <Link className="sidebar-link" to={link || '#'} onClick={subItems ? toggleDropdown : null}>
      <i className="align-middle" data-feather={icon}></i>
      <span className="align-middle">{title}</span>
      {subItems && (
        <i
          className={`align-middle ml-1 ${isDropdownOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}
          aria-hidden="true"
          style={{ fontSize: '0.75rem', color: '#999' }} // Style adjustments for the arrow
        />
      )}
    </Link>
    {subItems && (
      <ul className={`sidebar-dropdown list-unstyled collapse ${isDropdownOpen ? 'show' : ''}`}>
        {subItems.map((item, idx) => (
          <li className="sidebar-item" key={idx}>
            <Link className="sidebar-link" to={item.link}>
              <i className={`align-middle mr-2 fas fa-fw ${item.icon}`}></i> {/* Render the icon for each sub-item */}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Sidebar = ({ isOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [dropdowns, setDropdowns] = useState({
    tree: false,
    settings: false,
  });

  const toggleDropdown = useCallback(
    (dropdown) => {
      setDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
    },
    []
  );

  useEffect(() => {
    feather.replace();
  }, []);

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: 'sliders', 
      link: '/dashboard' 
    },
    {
      title: 'Category',
      icon: 'book',
      subItems: [
        { title: 'All Category Table', link: '/category1', icon: 'fa-table' },
        // { title: 'All Category Cards', link: '/category2', icon: 'fa-th-large' },
      ],
      dropdown: 'tree',
    },
    { 
      title: 'People', 
      icon: 'users', 
      subItems: [
        { title: 'All People', link: '/people', icon: 'fa-users' },
        { title: 'Add People', link: '/add-people', icon: 'fa-user-plus' },
      ],
    },
    { 
      title: 'Features', 
      icon: 'layers', 
      subItems: [
        { title: 'Birthday Wish', link: '/birthday', icon: 'fa-birthday-cake' },
      ],
      dropdown: 'layers',
    },
    {
      title: 'Settings',
      icon: 'settings',
      subItems: [
        { title: 'Profile', link: '/profile', icon: 'fa-user' },
        { title: 'Security', link: '#', icon: 'fa-lock' },
      ],
      dropdown: 'settings',
    },
  ];

  return (
    <nav id="sidebar" className={`sidebar js-sidebar ${isOpen ? 'toggled' : ''}`}>
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/">
          Rash-diary
        </Link>

        <div className="sidebar-user">
          <img src="img/avatars/avatar.jpg" className="img-fluid rounded-circle mb-2" alt="User" />
          <div className="font-weight-bold">{user.username}</div>
        </div>

        <ul className="sidebar-nav">
          {menuItems.map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              icon={item.icon}
              link={item.link}
              subItems={item.subItems}
              isDropdownOpen={dropdowns[item.dropdown]}
              toggleDropdown={item.subItems ? () => toggleDropdown(item.dropdown) : null}
              isActive={location.pathname === item.link || (item.subItems && item.subItems.some(sub => location.pathname === sub.link))}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Sidebar);
