import Header from '../components/Header';
import Footer from '../components/Footer';
import InputLabel from '../components/InputLabel';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/slices/userSlice';
import { connectUser } from '../services/loginService';
import { getUserInfo } from '../services/userService';

import '../styles/Login/Login.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = async (e) => {
        e.preventDefault();

        const response = await connectUser(e.target.username.value, e.target.password.value);
        if(response) {
            dispatch(setToken(response.body.token));

            const result = await getUserInfo(response.body.token);
            if(result) {
                const newState = {
                    token: response.body.token,
                    ...result.body
                }
                dispatch(setUser(newState));
                navigate('/profile');
            }
        }
    };

    return (
        <>
            <Header />

            <main className="bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon" />
                    <h1>Sign In</h1>
                    <form onSubmit={submitForm}>
                        <InputLabel 
                            type="text"
                            id="username"
                            autoComplete="username"
                            labelName="Username"
                            required={true}
                        />

                        <InputLabel 
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            labelName="Password"
                            required={true}
                        />
                        {/* <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div> */}
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default LoginPage;