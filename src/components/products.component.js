import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './components-styles/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const Product = props => (
    <div class="content-div" title={props.product.name}>
        <p class="name">{props.product.name}</p>
        <p class="description">{props.product.description}</p>
        <p class="price">{props.product.price}</p>
        <p class="stocks">{props.product.stocks}</p>
        <FontAwesomeIcon icon={faEdit} className="icon blue" />
        <FontAwesomeIcon icon={faDeleteLeft} className="icon red" />
    </div>
)

export default class Products extends Component{

    constructor(props){

        super(props);        

        this.state = {
            query: "",
            result: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);

        this.getData().then(response => this.setState({result: response.data}));
        
        // AWAIT
        // axios.get('http://localhost:5000/products/get')
        //     .then(response => this.setState({result: response.data}));
    }

    async getData(){
        const res = await axios.get(`http://localhost:5000/products/get?q=${this.state.query}`);
        return await res;
    }

    productsList(){
        let size = this.state.result.length;
        return (
            <div>
                {
                    this.state.result.slice(0, size).map(currentProduct => {
                        return <Product product={currentProduct} value={this.state.query} />;
                    })
                }
            </div>
        )
        // return this.state.result.slice(0, size).map(currentProduct => {
        //     return <Product product={currentProduct} value={this.state.val} />;
        // })
    }

    // The function should be async, so only we could use await
    async handleInputChange(e){

        // Use await, so that our program will wait until this executes correctly.
        await this.setState({
            query: e.target.value
        })

        await this.getData().then(response => this.setState({result: response.data}));

        document.getElementById('total-records').textContent = this.state.result.length;
        
        ReactDOM.render(
            this.productsList(),
            document.getElementById('productsList')
        );
        
    }

    render(){
        return (
            <div class="products-container">

                <div class="heading-div">
                    <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Products</p>

                    <input className='search-bar' type="text" onChange={this.handleInputChange} placeholder='Search . . .' />

                    <div class="options">
                        <button><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record</button>
                        <button><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                        <button><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>
                    </div>
                </div>

                <div className='total-records'>
                    Total Records: <b id='total-records'>{this.state.result.length}</b>
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
                    {this.productsList()}
                </div>
                
            </div>
        )
    }
}