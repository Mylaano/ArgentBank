import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';

import '../styles/Header/Header.css';

function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userName = user.token !== null ? user.userName : "Sign In";
    const linkName = user.token !== null ? "/profile" : "/login";

    function logOut() {
        dispatch(clearUser());
        navigate('/');
    }

    return(
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src="../src/assets/img/argentBankLogo.webp"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to={linkName}>
                        <i className="fa fa-user-circle" />
                        {userName}
                    </Link>
                    {user.token !== null && (
                        <Link className="main-nav-item" to="/" onClick={logOut}>
                            <i className="fa fa-sign-out" />
                            Sign Out
                        </Link> 
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;