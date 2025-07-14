const express = require('express');
const router = express.Router();
const db = require('../db');
const employeeService = require('../services/employeeService');
const authenticateToken = require('../middleware/auth'); // Import the authentication middleware

// Get all employees (Protected)
router.get('/employees', async (req, res) => {
    // router.get('/employees', authenticateToken, async (req, res) => {    
    try {
        const result = await employeeService.getAllemployees();
        res.json(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/employeeswithstatus', async (req, res) => {
    // router.get('/employees', authenticateToken, async (req, res) => {    
    try {
        const { status } = req.query;
        const result = await employeeService.getEmployeesByStatus(status);
        res.json(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Get all employees with Join
router.get('/employeeswithjoin', async (req, res) => {
    try {
        const result = await employeeService.getAllemployeesWithJoin();
        res.json(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all employees for name list (Protected)
router.get('/employeesSimple', async (req, res) => {
    // router.get('/countries', authenticateToken, async (req, res) => {
    
    try {
        const result = await employeeService.getAllSimpleEmployee();
        res.json(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all employee names (Protected)
router.get('/employeeAllNames', async (req, res) => {
    // router.get('/employee-names', authenticateToken, async (req, res) => {
    
    try {
        const result = await employeeService.getAllemployeeName();
        // console.log(`employee Names: `, result);
        res.json(result);
        // res.json(Array.isArray(result) ? result : [result]);
    } catch (err) {
        console.error('데이터베이스 쿼리 오류:', err);
        res.status(500).json({ error: '데이터베이스 오류' });
    }
});

// Get a single employee (Protected)
router.get('/employees/:id', async (req, res) => {
    try {
        const [result] = await employeeService.getemployeeById(req.params.id);  
        if (result.length === 0) {
            return res.status(404).json({ error: 'employee not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Create a new employee (Protected)
router.post('/employees', async (req, res) => {
    
    const { employeeData, addressData } = req.body;
    // console.log("backend/routes/employee.js employeeData:",employeeData);
    // console.log("backend/routes/employee.js addressData:",addressData);
    try {
        const createdemployee = await employeeService.createEmployee(employeeData, addressData);
        if (createdemployee) {
            // console.log('employee.js Received updated employee infomation', createdemployee);
            res.json(createdemployee);
        } else {
            res.status(200).json({ error: `backend\routes\employee.js Can't create a employee` });
        }
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Failed to create employee backend\routes\employee.js' });
    }
});


router.put('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    const { employeeData, addressData } = req.body;
    // console.log("backend/routes/employee.js employeeData:",employeeData);
    // console.log("backend/routes/employee.js addressData:",addressDataCollection);    
    try {
        if (isNaN(employeeId)) {
            return res.status(400).json({ error: 'Invalid employeeID' });
        }

        const updateEmployee = await employeeService.updateEmployee(employeeId, { employeeData, addressData });
        if (updateEmployee) {
            // console.log('employee.js Received updated employee infomation', updateEmployee);
            res.json(updateEmployee);
        } else {
            res.status(404).json({ error: 'employee not found' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
}); 

// 직원 정보 업데이트
router.put('/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    const result = await employeeService.updateEmployee(employeeId, updatedEmployee);
    res.json(result);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

router.post('/employeesBulk', async (req, res) => {
    const { employees } = req.body; // employees는 [{ employeeData, addressData }, ...]

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'Invalid employees data.' });
    }

    try {
        const insertedCount = await employeeService.bulkCreateEmployees(employees);
        res.status(201).json({ inserted: insertedCount });
    } catch (error) {
        console.error('Error in bulk create employees route:', error);
        res.status(500).json({ error: 'Failed to bulk create employees' });
    }
});

module.exports = router;