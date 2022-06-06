import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import Popup from 'reactjs-popup';
import Popup from './popups/products.popup';
import './components-styles/products.css';
import './components-styles/sales.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const Sale = (props) => (
    <div class="content-div" title={props.sale.customer}>
        <p class="name flex-three">{props.sale.customer}</p>
        <p class="description flex-three">{props.sale.product}</p>
        <p class="price flex-one">{props.sale.price}</p>
        <FontAwesomeIcon icon={faEdit} className="icon blue" onClick={ (event) =>
            editSale(
                props.sale._id,
                props.sale.customer,
                props.sale.product,
                props.setSaleID,
                props.setSaleCustomer,
                props.setSaleProduct,
                props.setButtonPopup
                )
            }
        />
        <FontAwesomeIcon icon={faDeleteLeft} className="icon red" onClick={ (event) => deleteSale(event, props.sale.id) } />
    </div>
)

const Product = (props) => (
    <option value={props.product.price} > {props.product.name} </option>
)

const Customer = (props) => (
    <option> {props.customer.name} </option>
)

// DELETE PRODUCT
// Delete Sale should be outside the functional component, So that it can be accessed easily.
const deleteSale = (event, saleID) => {
    event.preventDefault();

    const deleteData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: saleID
            }
        )
    };
    fetch('http://localhost:5000/sales/delete', deleteData)
        .then(response => alert("Deleted Successfully!!!"));
}

const editSale = (id, customer, product, setSaleID, setSaleCustomer, setSaleProduct, setButtonPopup) => {
    setSaleID(id);
    setSaleCustomer(customer);
    setSaleProduct(product);
    setButtonPopup(true);
}

const Sales = () =>{

    // Used for Searching
    const [query, setQuery] = useState("");

    // Store the results
    const [result, setResult] = useState([]);

    const[allProducts, setAllProducts] = useState([]);
    const[allCustomers, setAllCustomers] = useState([]);

    // Used for Popup
    const [buttonPopup, setButtonPopup] = useState(false);

    // FOR UPDATING THE PRODUCT
    const [saleID, setSaleID] = useState(0);
    const [saleCustomer, setSaleCustomer] = useState("");
    const [saleProduct, setSaleProduct] = useState("");
    const [productPrice, setProductPrice] = useState("0");


    // Promise.all([
    //     axios.get(`http://localhost:5000/sales/get?q=${query}`), 
    //     axios.get(`http://localhost:5000/sales/get?q=${query}`)
    // ])
    // .then(axios.spread((result1, result2) => {
    //     setResult(result1.data)
    //     setAllCustomers(result2.data)
    // }));

    useEffect(() => {
        axios.get(`http://localhost:5000/customers/get?q=${query}`).then(res => {
           setAllCustomers(res.data)
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/products/get?q=${query}`).then(res => {
           setAllProducts(res.data)
        }).catch(err => console.log(err));
    }, [])

    const getData = () =>{
        const res = axios.get(`http://localhost:5000/sales/get?q=${query}`);
        return res;
    }

    getData().then(response => setResult(response.data));
        
    // AWAIT
    // axios.get('http://localhost:5000/sales/get')
    //     .then(response => this.setState({result: response.data}));

    const selectOnChangeHandler = (event) => {
        const value = event.value
        setSaleProduct(allProducts[event.target.options.selectedIndex].name);
        setProductPrice(event.target.value);
    }

    const selectOnChangeCustomerHandler = (event) => {
        setSaleCustomer(event.target.value);
    }

    const salesList = () =>{
        let size = result.length;
        return (
            <div>
                {
                    result.slice(0, size).map(currentSale => {
                        return <Sale sale={currentSale} value={query} setButtonPopup={setButtonPopup}
                        setSaleID = {setSaleID} />;
                    })
                }
            </div>
        )
    }

    const customersList = () => {

        let size = allCustomers.length;
        return (
            <select className='select'onChange={selectOnChangeCustomerHandler}>
                {
                    allCustomers.slice(0, size).map(currentCustomer => {
                        return <Customer customer={currentCustomer} />;
                    })
                }
            </select>
        )
    }

    const productsList = () => {

        let size = allProducts.length;
        return (
            <select className='select' onChange={selectOnChangeHandler}>
                <option>NULL</option>
                {
                    allProducts.slice(0, size).map(currentProduct => {
                        return <Product product={currentProduct} />;
                    })
                }
            </select>
        )
    }

    // The function should be async, so only we could use await
    const handleInputChange = (e) =>{

        // Use await, so that our program will wait until this executes correctly.
        setQuery(e.target.value);

        getData().then(response => setResult(response.data));

        document.getElementById('total-records').textContent = result.length;
        
        ReactDOM.render(
            this.salesList(),
            document.getElementById('salesList')
        );
        
    }

    // ADD NEW PRODUCT
    const addNewSale = (event) => {

        event.preventDefault(); 

        if(saleProduct === ""){
            alert("Please select a product");
            return;
        }
        
        // POST request using fetch inside useEffect React hook
        const insertData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    id: saleID,
                    customer: event.target[0].value,
                    product: saleProduct,
                    price: event.target[2].value
                }
            )
        };

        fetch('http://localhost:5000/sales/insert', insertData)
        .then(function(response) {
            return response.text()
            .then(function(text) {
                alert(text);
            });
        })
        .then(setButtonPopup(false));
        
        setSaleID(0);
        
    }

    
    return (
        <div class="sales-container">

            <div class="heading-div">
                <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Sales</p>

                <input className='search-bar' type="text" onChange={handleInputChange} placeholder='Search . . .' />

                <div class="options">

                    <button className='button-menu' onClick={() => {
                            setButtonPopup(true);
                            }
                        }>
                        <FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record
                    </button>

                    <button className='button-menu'><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                    <button className='button-menu'><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>

                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                        <center>
                            <p className='heading'><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add Sale</p>
                            
                            <form onSubmit={addNewSale}>

                                <p className='label'>Customer Name:</p>
                                <br />
                                { customersList() }

                                <br />

                                <p className='label'>Product Name:</p>
                                <br />
                                { productsList() }

                                <p className='label'>Product Price:</p>
                                <br />
                                <br />
                                <input className='text-field' id='product_price' type='text' value={productPrice} />

                                {/* <p className='label'>Customer Name:</p>
                                <input className='text-field' type='text' placeholder='Customer Name' defaultValue={saleCustomer} required />

                                <p className='label'>Product Name:</p>
                                <input className='text-field' type='text' placeholder='Product Name' defaultValue={saleProduct} required /> */}

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
                <p class="flex-three">Customer Name</p>
                <p class="flex-three">Product Name</p>
                <p class="flex-one">Product Price</p>
                <p class="flex-icon"></p>
                <p class="flex-icon"></p>
            </div>

            {/* <p>{JSON.stringify(this.state.result)}</p> */}
            <div id='salesList'>
                { salesList() }
            </div>
            
        </div>
    )
    
}

export default Sales;