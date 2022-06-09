import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import Popup from 'reactjs-popup';
import Popup from './popups/products.popup';
import './components-styles/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => (
    <div class="content-div" title={props.product.name}>
        <p class="name flex-three">{props.product.name}</p>
        <p class="description flex-three">{props.product.description}</p>
        <p class="price flex-one">{props.product.price}</p>
        <p class="stocks flex-one">{props.product.stocks}</p>
        <FontAwesomeIcon icon={faEdit} className="icon blue" onClick={ (event) =>
            editProduct(
                props.product._id,
                props.product.name,
                props.product.description,
                props.product.price,
                props.product.stocks,
                props.setProductID,
                props.setProductName,
                props.setProductDescription,
                props.setProductPrice,
                props.setProductStocks,
                props.setButtonPopup
                )
            }
        />
        <FontAwesomeIcon icon={faDeleteLeft} className="icon red" onClick={ (event) => deleteProduct(event, props.product._id) } />
    </div>
)

// DELETE PRODUCT
// Delete Product should be outside the functional component, So that it can be accessed easily.
const deleteProduct = (event, productID) => {
    event.preventDefault();

    const deleteData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: productID
            }
        )
    };

    fetch('http://localhost:5000/products/delete', deleteData)
        .then(response => alert("Deleted successfully!!!"));
}

const editProduct = (id, name, description, price, stocks, setProductID, setProductName, setProductDescription, setProductPrice, setProductStocks, setButtonPopup) => {
    setProductID(id);
    setProductName(name);
    setProductDescription(description);
    setProductPrice(price);
    setProductStocks(stocks);
    setButtonPopup(true);
}

const Products = () =>{

    const [sortColumn, setSortColumn] = useState("name");
    const [sortValue, setSortValue] = useState(1);

    // Used for Searching
    const [query, setQuery] = useState("");

    // Store the results
    const [result, setResult] = useState([]);

    // Used for Popup
    const [buttonPopup, setButtonPopup] = useState(false);

    // FOR UPDATING THE PRODUCT
    const [productID, setProductID] = useState(0);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStocks, setProductStocks] = useState("");


    const getData = () =>{
        const res = axios.get(`http://localhost:5000/products/get?q=${query}&col=${sortColumn}&val=${sortValue}`);
        return res;
    }

    getData().then(response => setResult(response.data));
        
    // AWAIT
    // axios.get('http://localhost:5000/products/get')
    //     .then(response => this.setState({result: response.data}));

    const productsList = () =>{
        let size = result.length;
        return (
            <div>
                {
                    result.slice(0, size).map(currentProduct => {
                        return <Product product={currentProduct} value={query} setButtonPopup={setButtonPopup}
                        setProductID = {setProductID} setProductName = {setProductName} setProductDescription={setProductDescription}
                        setProductPrice={setProductPrice} setProductStocks={setProductStocks} />;
                    })
                }
            </div>
        )
        // return this.state.result.slice(0, size).map(currentProduct => {
        //     return <Product product={currentProduct} value={this.state.val} />;
        // })
    }

    // The function should be async, so only we could use await
    const handleInputChange = (e) =>{

        // Use await, so that our program will wait until this executes correctly.
        setQuery(e.target.value);

        getData().then(response => setResult(response.data));

        document.getElementById('total-records').textContent = result.length;
        
        ReactDOM.render(
            this.productsList(),
            document.getElementById('productsList')
        );
        
    }

    // ADD NEW PRODUCT
    const addNewProduct = (event) => {

        event.preventDefault(); 
        
        // POST request using fetch inside useEffect React hook
        const insertData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    id: productID,
                    name: event.target[0].value,
                    description: event.target[1].value,
                    price: event.target[2].value,
                    stocks: event.target[3].value
                }
            )
        };

        fetch('http://localhost:5000/products/insert', insertData)
        .then(function(response) {
            return response.text()
            .then(function(text) {
                alert(text);
            });
        })
        .then(setButtonPopup(false));
        
        setProductID(0);
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductStocks("");
        
    }

    
    return (
        <div class="products-container">

            <div class="heading-div">
                <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Products</p>

                <input className='search-bar' type="text" onChange={handleInputChange} placeholder='Search . . .' />

                <div class="options">

                    {/* REACTJS POPUP */}
                    {/* <Popup trigger={<button><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record</button>}
                    position="bottom center" >
                        Hello
                    </Popup> */}

                    <button className='button-menu' onClick={() => {
                            setButtonPopup(true);
                            setProductName("");
                            setProductDescription("");
                            setProductPrice("");
                            setProductStocks("");
                            }
                        }>
                        <FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record
                    </button>

                    <button className='button-menu'><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                    <button className='button-menu'><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>

                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                        <center>
                            <p className='heading'><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add Product</p>
                            
                            <form onSubmit={addNewProduct}>

                                <p className='label'>Product Name:</p>
                                <input className='text-field' type='text' placeholder='Product Name' defaultValue={productName} required />

                                <p className='label'>Product Description:</p>
                                <input className='text-field' type='text' placeholder='Product Description' defaultValue={productDescription} required />

                                <p className='label'>Product Price:</p>
                                <input className='text-field' type='number' placeholder='Product Price' defaultValue={productPrice} required />

                                <p className='label'>Product Stocks:</p>
                                <input className='text-field' type='number' placeholder='Product Stocks' defaultValue={productStocks} required />

                                <button className='button'><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add/Update</button>

                            </form>

                        </center>
                    </Popup>

                </div>
            </div>

            <div className='total-records'>
                Total Records: <b id='total-records'>{result.length}</b>
            </div>         

            <div class="title-div">
                <p class="flex-three">Name</p>
                <p class="flex-three">Description</p>
                <p class="flex-one">Price</p>
                <p class="flex-one">Stocks</p>
                <p class="flex-icon"></p>
                <p class="flex-icon"></p>
            </div>

            {/* <p>{JSON.stringify(this.state.result)}</p> */}
            <div id='productsList'>
                { productsList() }
            </div>
            
        </div>
    )
    
}

export default Products;