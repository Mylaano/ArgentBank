import Header from '../components/Header';
import Footer from '../components/Footer';
import Account from '../components/Account';
import Button from '../components/Button';
import InputLabel from '../components/InputLabel';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/slices/userSlice';
import { updateUserInfo } from '../services/userService';

import '../styles/Profile/Profile.css';

function ProfilePage() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user.userName);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setEditing(false);
    };

    const handleSaveClick = async (e) => {
        handleCancelClick(e);

        const response = await updateUserInfo(user.token, newUsername);
        if(response) {
            dispatch(updateUser(newUsername));
            alert('Username successfully updated');
        }
    };

    useEffect(() => {
        if(user.token == null) {
            navigate('/404');
        }
    });

    return (
        <>
            <Header />

            <main className="bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                    {editing ? (
                        <form className="formUpdateName">                           
                            <InputLabel
                                type="text"
                                id="username"
                                defaultValue={newUsername}
                                labelName="User name:"
                                onChange={(e) => setNewUsername(e.target.value)}
                            />

                            <InputLabel
                                type="text"
                                id="firstName"
                                defaultValue={user.firstName}
                                labelName="First name:"
                                disabled={true}
                            />

                            <InputLabel
                                type="text"
                                id="lastName"
                                defaultValue={user.lastName}
                                labelName="Last name:"
                                disabled={true}
                            />

                            <div className="formBtnUpdateName">
                                <Button className="btn save-btn" onClick={handleSaveClick}>Save</Button>
                                <Button className="btn cancel-btn" onClick={handleCancelClick}>Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <Button className="btn edit-btn" onClick={handleEditClick}>Edit Name</Button>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>

                <Account 
                    title="Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    description="Available Balance"
                />

                <Account 
                    title="Argent Bank Savings (x6712)"
                    amount="$10,928.42"
                    description="Available Balance"
                />

                <Account 
                    title="Argent Bank Credit Card (x8349)"
                    amount="$184.30"
                    description="Current Balance"
                />

            </main>

            <Footer />
        </>
    );
}

export default ProfilePage;