import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewFurniture = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [productId, setProductId] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setIsPending(true);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post(`${process.env.REACT_APP_URI}/categories/furniture/new`, {
            title, price, description, age, image
        },
            axiosConfig
        )
            .then((res) => {
                console.log(res.data);
                setProductId(res.data._id);
                history.push(`/categories/furniture/${productId}`);
                setIsPending(false);
            })
            .catch((res, e) => {
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file)
                return alert("File does not exist!");
            console.log(file);
            const formData = new FormData();
            formData.append('files', file)
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            document.getElementById('formSubmitBtn').disabled = true;
            document.getElementById('formSubmitBtn').innerHTML = 'Uploading ..';
            const axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post(`${process.env.REACT_APP_URI}/upload`, formData, axiosConfig)
                .then((res) => {
                    console.log(res, res.data.url);
                    setImage(res.data.url);
                    document.getElementById('formSubmitBtn').disabled = false;
                    document.getElementById('formSubmitBtn').innerHTML = 'Submit';
                })
                .catch((e) => {
                    console.log("error in client", e.response.data)
                })
        }
        catch (err) {
            alert(err, "error occured")
        }
    }

    return (
        <div className="newFurniture">
            <div className="row mt-3">
                <h1 className="text-center" style={{ fontSize: 40, color: "#94618E" }}>New Furniture</h1>
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="registerForm mb-3">
                            <label className="form-label"><b>Title:</b></label>
                            <input className="form-control" type="text" id="title" name="title" required autoFocus
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Price:</b></label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">₹</span>
                                <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Age:</b></label>
                            <input className="form-control" type="text" id="age" name="age"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="formFileMultiple" className="form-label"><b>Upload Image:</b></label>
                            <input className="form-control" type="file" id="image" name="image" required
                                onChange={handleUpload}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Description:</b></label>
                            <textarea className="form-control" type="text" id="description" name="description" required
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>
                        {!isPending &&
                            <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                <button className="btn btn-success" id="formSubmitBtn">Submit</button>
                            </div>
                        }
                        {isPending &&
                            <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                <button className="btn btn-success mb-3">Submitting ..</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewFurniture;