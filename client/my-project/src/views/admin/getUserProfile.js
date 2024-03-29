import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const GetUserProfile = () => {

    const { id: id } = useParams();

    useEffect(() => {
        userInfo();
    }, []);

    const [user, setUser] = useState({});
    const history = useHistory();

    const userInfo = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${process.env.REACT_APP_URI}/admin/user-profile/${id}`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("user data: ", res.data.user);
                setUser(res.data.user);
                console.log(user, 'successful seed of our user!');
            })
            .catch((e) => {
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isAdmin == false) {
                    history.push('/categories')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e.response)
            })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        console.log("in client delete user")
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${process.env.REACT_APP_URI}/admin/${user._id}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted user!');
                history.push('/admin/users');
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    return (
        <div className="getUserProfile">
            <button className="btn btn-info col-md-6 rounded-0">
                User's Profile
            </button>
            <button className="btn btn-secondary col-md-6 rounded-0"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/admin/${id}/products`;
                }}>
                User's Products
            </button>
            <div className="row mt-3">
                <h1 className="text-center">User Info</h1>
                <div className="col-md-6 offset-md-3">
                    <form>
                        <div className="userInfoForm mb-3">
                            <label className="form-label"><b>Name:</b></label>
                            <input className="form-control" type="text" id="name" name="name"
                                placeholder={user.name}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Username:</b></label>
                            <div className="input-group">
                                <input className="form-control" type="text" id="username" name="username"
                                    placeholder={user.username}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Course:</b></label>
                            <input className="form-control" type="text" id="course" name="course"
                                placeholder={user.course}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Year:</b></label>
                            <input className="form-control" type="text" id="year" name="year"
                                placeholder={user.year}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>College Email id:</b></label>
                            <input className="form-control" type="text" id="email" name="email"
                                placeholder={user.email}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Phone No:</b></label>
                            <input className="form-control" type="number" id="phone" name="phone"
                                placeholder={user.phone}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Hostel Address:</b></label>
                            <textarea className="form-control" type="text" id="address" name="address"
                                placeholder={user.address}
                                disabled
                            ></textarea>
                        </div>
                        <button className="btn btn-danger d-grid gap-2 col-6 mx-auto mb-4" onClick={handleDelete}>Delete Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GetUserProfile;