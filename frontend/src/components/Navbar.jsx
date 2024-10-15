import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from '../features/auth/authSlice';
import MessageDropdown from "./MessageDropdown";
import AlertDropdown from './AlertDropdown';
import SettingDropdown from './SettingDropdown';
import FullScreen from './FullScreen';

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.auth.logs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (userId) {
      dispatch(logger(userId)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="splash active">
        <div className="splash-icon"></div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand navbar-theme">
      <a className="sidebar-toggle d-flex mr-2" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <form className="form-inline d-none d-sm-inline-block">
        <input className="form-control form-control-lite" type="text" placeholder="Search projects..." />
      </form>
      <div className="navbar-collapse collapse">
        <FullScreen />
        <MessageDropdown data={logs} />
        <AlertDropdown />
        <SettingDropdown />
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
