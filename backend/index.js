const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const barcodeRoutes = require('./routes/barcode');
const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendor');
const employeeRoutes = require('./routes/employee');
const branchRoutes = require('./routes/branch');
const departmentRoutes = require('./routes/department');
const deskRoutes = require('./routes/desk');
const purchaseRoutes = require('./routes/purchase');
const locationRoutes = require('./routes/location');
const addressRoutes = require('./routes/address');
const stateRoutes = require('./routes/state');
const countryRoutes = require('./routes/country');
const jobTitleyRoutes = require('./routes/jobtitle');
const inventoryRoutes = require('./routes/inventory');
const itemRoutes = require('./routes/item');
const categoryRoutes = require('./routes/category');


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', vendorRoutes);
app.use('/api', employeeRoutes)
app.use('/api', branchRoutes);
app.use('/api', departmentRoutes);
app.use('/api', deskRoutes)
app.use('/api', purchaseRoutes);
app.use('/api/location', locationRoutes);
app.use('/api', addressRoutes);
app.use('/api', stateRoutes);
app.use('/api', countryRoutes);
app.use('/api', jobTitleyRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', categoryRoutes);
app.use('/api', barcodeRoutes);

app.listen(5001, () => {
    console.log('Server started on port 5001');
});

//module.exports = { db };