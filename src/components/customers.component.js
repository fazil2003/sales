import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
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
        <FontAwesomeIcon icon={faEdit} className="icon blue" />
        <FontAwesomeIcon icon={faDeleteLeft} className="icon red" />
    </div>
)

const Customers = () =>{

    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

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
                        return <Customer customer={currentCustomer} value={query} />;
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

    return (
        <div class="customers-container">

            <div class="heading-div">
                <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Customers</p>

                <input className='search-bar' type="text" onChange={handleInputChange} placeholder='Search . . .' />

                <div class="options">

                    {/* REACTJS POPUP */}
                    <Popup trigger={<button><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record</button>}
                    position="bottom center" >
                        Hello
                    </Popup>

                    <button><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                    <button><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>
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