import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import NotFoundPage from './pages/notfound';

import userStore from './redux/store/userStore';
import { Provider } from 'react-redux'

function App() {
    return (
		<Provider store={userStore}>
			<Router>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</Provider>
    )
}

export default App;
