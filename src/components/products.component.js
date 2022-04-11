import React, {Component} from 'react';
import axios from 'axios';
import './components-styles/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear } from '@fortawesome/free-solid-svg-icons'

const Product = props => (
    <div class="content-div" title={props.product.name}>
        <p class="name">{props.product.name}</p>
        <p class="description">{props.product.description}</p>
        <p class="price">{props.product.price}</p>
        <p class="stocks">{props.product.stocks}</p>
    </div>
)

export default class Products extends Component{

    constructor(props){
        super(props);        

        this.state = {
            result: []
        }

        axios.get('http://localhost:5000/products/get')
            .then(response => this.setState({result: response.data}));
    }

    productsList(){
        return this.state.result.map(currentProduct => {
            return <Product product={currentProduct} />;
        })
    }

    render(){
        return (
            <div class="products-container">

                <div class="heading-div">
                    <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Products</p>

                    <input class='search-bar' type="text" placeholder='Search . . .' />

                    <div class="options">
                        <button><FontAwesomeIcon icon={faAdd} className="icon" />&nbsp;&nbsp;Add New Record</button>
                        <button><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Generate Report</button>
                        <button><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Others</button>
                    </div>
                </div>
                

                <div class="title-div">
                    <p class="flex-three">Name</p>
                    <p class="flex-three">Description</p>
                    <p class="flex-one">Price</p>
                    <p class="flex-one">Stocks</p>
                </div>

                {/* <p>{JSON.stringify(this.state.result)}</p> */}
                <p>{this.productsList()}</p>
            </div>
        )
    }
}