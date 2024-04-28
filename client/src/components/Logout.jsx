import React from 'react'
import { useCookies } from 'react-cookie';

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    function logout() {
  
      removeCookie('authToken', {  domain: 'localhost' })
      // You may choose to redirect or refresh the page after logout
      window.location.reload();
    }
  
    return (
      <div>
        
        <div className='logout-btn'>
          <button onClick={logout} >Log Out</button>
        </div>
      </div>
    );
}

export default Logout