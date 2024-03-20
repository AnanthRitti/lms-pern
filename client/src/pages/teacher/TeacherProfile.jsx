import React from 'react';
import Nav from '../../components/teacher/Nav';
import { useCookies } from 'react-cookie';

const TeacherProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'userId', 'user_type']);

  function logout() {

    removeCookie('authToken', { path: '/', domain: 'localhost' })
    removeCookie('userId', { path: '/', domain: 'localhost' })
    removeCookie('user_type', { path: '/', domain: 'localhost' })
    // You may choose to redirect or refresh the page after logout
    window.location.reload();
  }

  return (
    <div>
      <Nav />
      <div className='profile'>
        <button onClick={logout} className='logout-btn'>Log Out</button>
      </div>
    </div>
  );
};

export default TeacherProfile;
