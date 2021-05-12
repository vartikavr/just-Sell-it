import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FlashMessage from 'react-flash-message';

const DisplayOther = () => {

    console.log("others specific page...");
    const [isPending, setPending] = useState(true);
    const [addToWishlist, setAddToWishlist] = useState(false);
    const [message, setMessage] = useState(false);

    const { id: productId } = useParams();
    const [otherProduct, setOtherProduct] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [role, setRole] = useState('');
    const [wishlistOthers, setWishlistOthers] = useState([]);

    useEffect(() => {
        getProduct();
    }, [addToWishlist]);

    const getProduct = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/others/${productId}`, {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log("other product data: ", res.data.other);
                setOtherProduct(res.data.other);
                setCurrentUser(res.data.currentUser);
                setRole(res.data.role);
                setWishlistOthers(res.data.wishlistOthers);
                console.log(otherProduct, 'successful seed of our other product!');
                setPending(false);
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/others/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted item!');
                history.push('/categories/others');
            })
            .catch((e) => {
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const imageUrls = otherProduct.images;

    const handleBack = () => {
        history.push('/categories/others');
    }
    const history = useHistory();

    const handleWishlist = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/user/wishlist/others/${productId}/add`, {

        }, axiosConfig)
            .then(() => {
                console.log('successfully added item in wishlist!');
                setAddToWishlist(true);
            })
            .catch((e) => {
                setAddToWishlist(false);
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleChat = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/chat/${productId}`, {
            category: "others"
        }, axiosConfig)
            .then(() => {
                console.log('successfully message sent!');
                setMessage(true);
            })
            .catch((e) => {
                setMessage(false);
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    return (
        <div className="displayOther">
            {isPending && <div><h4>Seeding cycle ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info  ms-4 mt-3" onClick={handleBack}>
                        All Others category products
                </button>
                    <div className="mt-5"></div>
                    <div className="row mainContent-item mt-5 d-flex align-items-center ms-auto me-auto">
                        {addToWishlist && (
                            <FlashMessage duration={5000}>
                                <div className="flash-success">
                                    <p>Product added to your wishlist!</p>
                                </div>
                            </FlashMessage>
                        )}
                        {message && (
                            <FlashMessage duration={5000}>
                                <div className="flash-success">
                                    <p>An email has been sent to you. Check inbox!</p>
                                </div>
                            </FlashMessage>
                        )}
                        <div id="othersCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {imageUrls.map((img, i) => (
                                    <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                        <img src={img.url} className="d-block w-100" alt="..." />
                                    </div>
                                ))}
                            </div>
                            {imageUrls.length > 1 &&
                                <div className="group">
                                    <a className="carousel-control-prev" href="#booksCarousel" role="button" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#booksCarousel" role="button" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="card col-md-6 h-300">
                            <div className="card-body">
                                <h5 className="card-title">{otherProduct.title}</h5>
                                <p className="card-text">{otherProduct.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Submitted by: {otherProduct.userId.username}</li>
                                <li className="list-group-item">Price: ₹{otherProduct.price}</li>
                            </ul>
                            <div class="card-body">
                                {currentUser != '' && otherProduct.userId._id == currentUser && (
                                    <a className="card-link btn btn-info me-2" href={`/categories/others/${otherProduct._id}/edit`}>Edit</a>
                                )}
                                {currentUser != '' && (otherProduct.userId._id == currentUser || role == "admin") && (
                                    <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger me-2">Delete</button>
                                    </form>
                                )}
                                {currentUser !== '' && otherProduct.userId._id !== currentUser && !(wishlistOthers.includes(productId)) && (
                                    <form className="d-inline" onSubmit={handleWishlist}>
                                        <button className="btn btn-info me-2">Add to Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && otherProduct.userId._id !== currentUser && (wishlistOthers.includes(productId)) && (
                                    <form className="d-inline">
                                        <button className="btn btn-info me-2 disabled">Added in Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && (otherProduct.userId._id !== currentUser) && !message && (
                                    <form className="d-inline" onSubmit={handleChat}>
                                        <button className={"btn btn-info me-2 " + ((role == "admin") ? 'mt-2' : '')}>Contact Seller</button>
                                    </form>
                                )}
                                {currentUser !== '' && (otherProduct.userId._id !== currentUser) && message && (
                                    <form className="d-inline" onSubmit={handleChat}>
                                        <button className="btn btn-info me-2 disabled">Email sent</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayOther;