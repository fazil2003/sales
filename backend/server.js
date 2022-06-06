const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// FOR PRODUCTS
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

// FOR CUSTOMERS
const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

// FOR SALES
const salesRouter = require('./routes/sales');
app.use('/sales', salesRouter);

app.listen(port, () => {
    console.log("Server is running");
});