import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Popup from './popups/products.popup';
import './components-styles/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const Customer = props => (
    <div class="content-div" title={props.customer.name}>
        <p class="name flex-two">{props.customer.name}</p>
        <p class="occupation flex-one">{props.customer.occupation}</p>
        <p class="address flex-two">{props.customer.address}</p>
        <p class="phone flex-one">{props.customer.phone}</p>
        <p class="email flex-two">{props.customer.email}</p>
        <FontAwesomeIcon icon={faEdit} className="icon blue" onClick={ (event) =>
            editCustomer(
                props.customer._id,
                props.customer.name,
                props.customer.occupation,
                props.customer.address,
                props.customer.phone,
                props.customer.email,
                props.setCustomerID,
                props.setCustomerName,
                props.setCustomerOccupation,
                props.setCustomerAddress,
                props.setCustomerPhone,
                props.setCustomerEmail,
                props.setButtonPopup
                )
            }
        />
        <FontAwesomeIcon icon={faDeleteLeft} className="icon red" onClick={ (event) => deleteCustomer(event, props.customer._id) } />
    </div>
)

// DELETE PRODUCT
// Delete Product should be outside the functional component, So that it can be accessed easily.
const deleteCustomer = (event, customerID) => {
    event.preventDefault();

    const deleteData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: customerID
            }
        )
    };
    fetch('http://localhost:5000/customers/delete', deleteData)
        .then(response => alert("Deleted Successfully!!!"));
}

const editCustomer = (id, name, occupation, address, email, phone, setCustomerID, setCustomerName, setCustomerOccupation, setCustomerAddress, setCustomerEmail, setCustomerPhone, setButtonPopup) => {
    setCustomerID(id);
    setCustomerName(name);
    setCustomerOccupation(occupation);
    setCustomerAddress(address);
    setCustomerEmail(email);
    setCustomerPhone(phone);
    setButtonPopup(true);
}

const Customers = () =>{

    // Used for Searching
    const [query, setQuery] = useState("");

    // Store the results
    const [result, setResult] = useState([]);

    // Used for Popup
    const [buttonPopup, setButtonPopup] = useState(false);

    // FOR UPDATING THE PRODUCT
    const [customerID, setCustomerID] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [customerOccupation, setCustomerOccupation] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const getData = () =>{
        const res = axios.get(`http://localhost:5000/customers/get?q=${query}`);
        return res;
    }

    getData().then(response => setResult(response.data));

    const customersList = () =>{
        let size = result.length;
        return (
            <div>
                {
                    result.slice(0, size).map(currentCustomer => {
                        return <Customer customer={currentCustomer} value={query} setButtonPopup={setButtonPopup}
                        setCustomerID={setCustomerID} setCustomerName={setCustomerName} setCustomerOccupation={setCustomerOccupation}
                        setCustomerAddress={setCustomerAddress} setCustomerPhone={setCustomerPhone} setCustomerEmail={setCustomerEmail} />;
                    })
                }
            </div>
        )
    }

    // The function should be async, so only we could use await
    const handleInputChange = (e) =>{

        // Use await, so that our program will wait until this executes correctly.
        setQuery(e.target.value);

        getData().then(response => setResult(response.data));

        document.getElementById('total-records').textContent = result.length;
        
        ReactDOM.render(
            this.customersList(),
            document.getElementById('customersList')
        );
        
    }

    // ADD NEW PRODUCT
    const addNewCustomer = (event) => {

        event.preventDefault(); 
        
        // POST request using fetch inside useEffect React hook
        const insertData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    id: customerID,
                    name: event.target[0].value,
                    occupation: event.target[1].value,
                    address: event.target[2].value,
                    phone: event.target[3].value,
                    email: event.target[4].value
                }
            )
        };

        fetch('http://localhost:5000/customers/insert', insertData)
        .then(function(response) {
            return response.text()
            .then(function(text) {
                alert(text);
            });
        })
        .then(setButtonPopup(false));
        
        setCustomerID(0);
        setCustomerName("");
        setCustomerOccupation("");
        setCustomerAddress("");
        setCustomerPhone("");
        setCustomerEmail("");
        
    }

    return (
        <div class="customers-container">

            <div class="heading-div">

                <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Customers</p>

                <input className='search-bar' type="text" onChange={handleInputChange} placeholder='Search . . .' />

                <div class="options">

                    <button className='button-menu' onClick={() => {
                            setButtonPopup(true);
                            setCustomerName("");
                            setCustomerOccupation("");
                            setCustomerAddress("");
                            setCustomerEmail("");
                            setCustomerPhone("");
                            }
                        }>
                        <FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record
                    </button>

                    <button className='button-menu'><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                    <button className='button-menu'><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>

                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                        <center>
                            <p className='heading'><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add Customer</p>
                            
                            <form onSubmit={addNewCustomer}>

                                <p className='label'>Customer Name:</p>
                                <input className='text-field' type='text' placeholder='Customer Name' defaultValue={customerName} required />

                                <p className='label'>Customer Occupation:</p>
                                <input className='text-field' type='text' placeholder='Customer Occupation' defaultValue={customerOccupation} required />

                                <p className='label'>Customer Address:</p>
                                <input className='text-field' type='text' placeholder='Customer Address' defaultValue={customerAddress} required />

                                <p className='label'>Customer Phone:</p>
                                <input className='text-field' type='text' placeholder='Customer Phone' defaultValue={customerPhone} required />

                                <p className='label'>Customer Email:</p>
                                <input className='text-field' type='text' placeholder='Customer Email' defaultValue={customerEmail} required />
                
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
                <p class="flex-two">Name</p>
                <p class="flex-one">Occupation</p>
                <p class="flex-two">Address</p>
                <p class="flex-one">Phone</p>
                <p class="flex-two">Email</p>
                <p class="flex-icon"></p>
                <p class="flex-icon"></p>
            </div>

            {/* <p>{JSON.stringify(this.state.result)}</p> */}
            <div id='customersList'>
                {customersList()}
            </div>
            
        </div>
    )
    
}

export default Customers;