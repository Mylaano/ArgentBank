import Header from '../components/Header';
import Footer from '../components/Footer';
import Account from '../components/Account';
import Button from '../components/Button';
import InputLabel from '../components/InputLabel';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/slices/userSlice';

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

    const handleCancelClick = () => {
        setEditing(false);
    };

    const handleSaveClick = () => {
        setEditing(false);
        updateUserInfo(newUsername);
    };

    async function updateUserInfo(userName) {
        try {
            const request = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: { 
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userName })
            });

            const response = await request.json();

            switch(response.status) {
                case 200: {
                    dispatch(updateUser(newUsername));
                    alert('Username successfully updated');
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
            console.error(`An error occurred while updating user info : ${error}`);
        }
    }

    useEffect(() => {
        if(user.token == null) {
            navigate("/");
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