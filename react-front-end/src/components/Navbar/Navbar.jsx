import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    console.log('Successfully Logged Out')
  }

  return (
    <nav>
      {user ? (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/hoots'>HOOTS</Link></li>
          <li><Link to='/' onClick={handleLogOut}>SIGN OUT</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/sign-in'>SIGN IN</Link></li>
          <li><Link to='/sign-up'>SIGN UP</Link></li>
        </ul>
      )}
    </nav>
  );
};


export default Navbar;
