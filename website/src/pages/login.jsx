import Header from '../components/Header';
import Footer from '../components/Footer';
import InputLabel from '../components/InputLabel';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/slices/userSlice';

import '../styles/Login/Login.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const connectUser = async (email, password) => {
        try {
            const request = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            
            const response = await request.json();

            switch(response.status) {
                case 200: {
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
                    break;
                }
                case 400: {
                    const errorMessage = 'Invalid Fields';
                    console.error(errorMessage);
                    alert(errorMessage);
                    break;
                }
                case 500: {
                    const errorMessage = 'Internal Server Error';
                    console.error(errorMessage);
                    alert(errorMessage);
                    break;
                }
                default: {
                    const errorMessage = 'An error has occurred.';
                    console.error(errorMessage);
                    alert(errorMessage);
                }
            }
        } catch (error) {
            console.error(`An error has occurred while logging in with the following credentials : ${error}`);
        }
    };

    const getUserInfo = async (token) => {
        try {
            const request = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const response = await request.json();

            switch(response.status) {
                case 200: return response;
                case 400: {
                    const errorMessage = 'Invalid Fields';
                    console.error(errorMessage);
                    alert(errorMessage);
                    break;
                }
                case 500: {
                    const errorMessage = 'Internal Server Error';
                    console.error(errorMessage);
                    alert(errorMessage);
                    break;
                }
                default: {
                    const errorMessage = 'An error has occurred.';
                    console.error(errorMessage);
                    alert(errorMessage);
                }
            }
        } catch(error) {
            console.error(`An error has occurred while retrieving user information : ${error}`);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        connectUser(e.target.username.value, e.target.password.value);
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