const db = require('../db');

async function getAllemployees() {
    const sql = `SELECT * FROM employee `;
    try {
        const [rows] = await db.query(sql);
          
        const employees = await Promise.all(rows.map(async (employee) => {
            const [addressRows] = await db.query(`SELECT Address1, Address2, City, StateID, ZipCode, CountryID FROM Address WHERE AddressID = ?`, [employee.AddressID]);
            const addressData = addressRows.length > 0 ? addressRows[0] : null;

            const [jobTitleRows] = await db.query(`SELECT TitleName FROM JobTitle WHERE JobTitleID = ?`, [employee.JobTitleID]);
            
            const startDate = employee.StartDate ? new Date(employee.StartDate).toLocaleDateString('en-US') : null;
            const endDate = employee.EndDate ? new Date(employee.EndDate).toLocaleDateString('en-US') : null;
            
            return { 
                employeeData: {
                    EmployeeID: employee.EmployeeID,
                    PreferredName: employee.PreferredName,
                    LegalName: employee.LegalName,
                    JobTitleID: employee.JobTitleID,                    
                    CompanyID: employee.CompanyID,
                    Email: employee.Email,
                    StartDate: startDate,
                    EndDate: endDate,
                    Notes: employee.Notes,
                    AddressID: employee.AddressID,
                    JobTitle: employee.JobTitle
                },
                JobTitleName: jobTitleRows.length > 0 ? jobTitleRows[0].TitleName : null,
                addressData: addressData ? {
                    Address1: addressData.Address1,
                    Address2: addressData.Address2,
                    City: addressData.City,
                    StateID: addressData.StateID,
                    ZipCode: addressData.ZipCode,
                    CountryID: addressData.CountryID
                } : null
            };
        }));
        // console.log(`Total employees Fetched: `,employees); // Debugging Line
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

async function getEmployeesByStatus(status = null) {
    let sql = `SELECT * FROM employee`;
    if (status) {
        sql += ` WHERE Status = ?`;
    }
    
    try {
        const [rows] = status ? await db.query(sql, [status]) : await db.query(sql);
        
        const employees = await Promise.all(rows.map(async (employee) => {
            const [addressRows] = await db.query(
                `SELECT Address1, Address2, City, StateID, ZipCode, CountryID 
                 FROM Address WHERE AddressID = ?`, 
                [employee.AddressID]
            );
            const addressData = addressRows.length > 0 ? addressRows[0] : null;

            const [jobTitleRows] = await db.query(
                `SELECT TitleName 
                 FROM JobTitle WHERE JobTitleID = ?`, 
                [employee.JobTitleID]
            );
            
            const startDate = employee.StartDate ? new Date(employee.StartDate).toLocaleDateString('en-US') : null;
            const endDate = employee.EndDate ? new Date(employee.EndDate).toLocaleDateString('en-US') : null;

            return {
                employeeData: {
                    EmployeeID: employee.EmployeeID,
                    PreferredName: employee.PreferredName,
                    LegalName: employee.LegalName,
                    JobTitleID: employee.JobTitleID,
                    CompanyID: employee.CompanyID,
                    Email: employee.Email,
                    StartDate: startDate,
                    EndDate: endDate,
                    Notes: employee.Notes,
                    AddressID: employee.AddressID,
                    JobTitle: employee.JobTitle
                },
                JobTitleName: jobTitleRows.length > 0 ? jobTitleRows[0].TitleName : null,
                addressData: addressData ? {
                    Address1: addressData.Address1,
                    Address2: addressData.Address2,
                    City: addressData.City,
                    StateID: addressData.StateID,
                    ZipCode: addressData.ZipCode,
                    CountryID: addressData.CountryID
                } : null
            };
        }));
        
        return employees;
    } catch (error) {
        console.error('Error fetching employees by status:', error);
        throw error;
    }
}

async function getAllSimpleEmployee() {
    const sql = 'SELECT EmployeeID, PreferredName FROM employee';
    try {
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
}

async function getAllEmployeeName() {
    const sql = `SELECT 
                    EmployeeID, 
                    PreferredName 
                FROM employee`;
    try {
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.error('Error getAllEmployeeName:', error);
        throw error;
    }
}

async function getEmployeeById(EmployeeID) {
    const sql = `SELECT * FROM employee WHERE EmployeeID = ?`;
    try {
        const [rows] = await db.query(sql, [EmployeeID]);
        // console.log("rows:",rows[0]);
        // const [addressRows] = await db.query(`SELECT Address1, Address2, City, StateID, ZipCode, CountryID FROM Address WHERE AddressID = ?`, [rows[0].AddressID]);     
        // const addressData = addressRows.length > 0 ? addressRows[0] : null;

        // const employees = rows.map(employee => ({
        const employees = await Promise.all(rows.map(async (employee) => {
        const [addressRows] = await db.query(`SELECT Address1, Address2, City, StateID, ZipCode, CountryID FROM Address WHERE AddressID = ?`, [employee.AddressID]);
        const addressData = addressRows.length > 0 ? addressRows[0] : null;

        const [jobTitleRows] = await db.query(`SELECT TitleName FROM JobTitle WHERE JobTitleID = ?`, [employee.JobTitleID]);

        const startDate = employee.StartDate ? new Date(employee.StartDate).toLocaleDateString('en-US') : null;
        const endDate = employee.EndDate ? new Date(employee.EndDate).toLocaleDateString('en-US') : null;

            return {
            employeeData: {
                EmployeeID: employee.EmployeeID,
                PreferredName: employee.PreferredName,
                LegalName: employee.LegalName,
                JobTitleID: employee.JobTitleID,
                CompanyID: employee.CompanyID,
                Email: employee.Email,
                StartDate: startDate,
                EndDate: endDate,
                Notes: employee.Notes,
                AddressID: employee.AddressID,
                JobTitle: employee.JobTitle
            },
            JobTitleName: jobTitleRows.length > 0 ? jobTitleRows[0].TitleName : null,
            addressData: addressData ? {
                Address1: addressData.Address1,
                Address2: addressData.Address2,
                City: addressData.City,
                StateID: addressData.StateID,
                ZipCode: addressData.ZipCode,
                CountryID: addressData.CountryID
            } : null
        }
    }));

        // console.log("employees:",employees);
        return employees;
        
        // return { ...rows[0], ...addressData[0] };
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
}

async function createEmployee(employee, addressData) {
    const connection = await db.getConnection();    
    try {
        await connection.beginTransaction();
        // console.log("employeeService.js new employeeData:",employee);
        // console.log("employeeService.js new AddressData:",addressData);

        employee.StartDate = formatDateForMySQL(employee.StartDate);
        employee.EndDate = formatDateForMySQL(employee.EndDate);

        // 주소 정보가 있는 경우
        if (employee.AddressID != null) {
            // 새로운 주소 생성
            const addressID = await createAddress(connection, addressData);
            // console.log("Created new address with ID:", addressID);
            // 생성된 addressID를 employee에 할당
            employee.AddressID = addressID;
        } else {
            // 주소 정보가 없으면 AddressID를 null로 설정
            employee.AddressID = null;
        }

        // 새로운 벤더 생성
        const sql = 'INSERT INTO employee SET ?';
        const [result] = await connection.query(sql, employee);
        // console.log("Created new employee with ID:", result.insertId);

        await connection.commit();
        return { ...employee, EmployeeID: result.insertId };
    } catch (error) {
        await connection.rollback();
        console.error('Error creating employee:', error);
        throw error;
    } finally {
        connection.release();
    }
}


async function updateEmployee(EmployeeID, payload) {

    if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid employee data received');
    }

    const { employeeData, addressData } = payload;

    if (!employeeData || typeof employeeData !== 'object') {
        throw new Error('Invalid employee data received');
    }

    const connection = await db.getConnection();    
    try {
        await connection.beginTransaction();

        if (addressData && typeof addressData === 'object') {
            const hasAddressData = Object.values(addressData).some(value => value !== "");
            if (hasAddressData) { // Check if at least one value is not an empty string
                if (employeeData.AddressID) { // Simplified check for truthiness
                    await updateAddress(connection, employeeData.AddressID, addressData);
                } else {
                    const addressID = await createAddress(connection, addressData);
                    employeeData.AddressID = addressID;
                }
            } else {
                console.log("No meaningful address data provided. Skipping address update/create.");
                // Optionally set employeeData.AddressID to null if you want to explicitly clear it in the database
                if(employeeData.AddressID) {
                    employeeData.AddressID = null;
                }
            }
        } else {
            //Handle cases where addressData is null or not an object.
            if(employeeData.AddressID) {
                employeeData.AddressID = null;
            }
        }
        
        await updateEmployeeInfo(connection, EmployeeID, employeeData);        
        await connection.commit();
        return await getEmployeeById(EmployeeID);
    } catch (error) {
        await connection.rollback();
        console.error('Error updating employee:', error);
        throw error;
    } finally {
        connection.release();
    }
}


async function updateEmployeeInfo(connection, EmployeeID, employeeData) {
    // console.log("employee Data :", employeeData);

    const StartDate = formatDateForMySQL(employeeData.StartDate);
    const EndDate = formatDateForMySQL(employeeData.EndDate);

    // Check if address data has meaningful content before including AddressID
    if (employeeData.AddressID && Object.values(employeeData.addressData).some(value => value !== "")) {
        employeeUpdateData.AddressID = employeeData.AddressID;
    } else {
        // Optionally set employeeData.AddressID to null to clear the association
        employeeData.AddressID = null;
    }

    const employeeUpdateData = { 
        EmployeeID: employeeData.EmployeeID,
        PreferredName: employeeData.PreferredName,
        LegalName: employeeData.LegalName,
        JobTitle: employeeData.JobTitle,
        JobTitleID: employeeData.JobTitleID,
        CompanyID: employeeData.CompanyID,
        Email: employeeData.Email,
        StartDate: StartDate,
        EndDate: EndDate,
        Notes: employeeData.Notes,
        AddressID: employeeData.AddressID,
    }

    const sql = 'UPDATE employee SET ? WHERE EmployeeID = ?';
    await connection.query(sql, [employeeUpdateData, EmployeeID]);
}

async function createAddress(connection, addressData) {
    console.log("Create Address Data :", addressData);

    if (!isValidAddressData(addressData)) {
        throw new Error('Invalid address data');
    }

    const sql = 'INSERT INTO Address SET ?';
    const [result] = await connection.query(sql, addressData);
    return result.insertId;
}

async function updateAddress(connection, addressID, addressData) {
    console.log("Update Address Data :", addressData);
    console.log("update AddressID:",addressID);
    const AddressUpdateData = {
        AddressID: addressID,
        Address1: addressData.Address1,
        Address2: addressData.Address2,
        City: addressData.City,
        StateID: addressData.StateID,
        ZipCode: addressData.ZipCode,
        CountryID: addressData.CountryID,
    };    

    const sql = 'UPDATE Address SET ? WHERE AddressID = ?';
    await connection.query(sql, [AddressUpdateData, addressID]);
}

function isValidAddressData(addressData) {
    if (!addressData) return false;

    // 필수 필드만 체크하는 경우
    const requiredFields = ['Address1', 'City', 'StateID', 'ZipCode', 'CountryID'];
    return requiredFields.every(field => addressData[field] !== null && addressData[field] !== '');

    // 또는 모든 필드가 유효한지 확인하는 경우
    // return Object.values(addressData).every(value => value !== null && value !== '');
}

function formatDateForMySQL(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    // 날짜를 `YYYY-MM-DD` 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



// Bulk Create Employees
async function bulkCreateEmployees(employees) {
    // console.log("received employee data:", employees);
    const connection = await db.getConnection();
    let insertedCount = 0;
    try {
        await connection.beginTransaction();

        for (const [index, emp] of employees.entries()) {
            const { employeeData, addressData } = emp;

            if (!employeeData || typeof employeeData !== 'object') {
                throw new Error(`Invalid employeeData at index ${index}`);
            }

            const {
                PreferredName,
                JobTitleName,
                LegalName = null,
                JobTitleID,
                CompanyID = null,
                Email = null,
                StartDate = null,
                EndDate = null,
                Notes = null
            } = employeeData;

            if (!PreferredName || !JobTitleName) {
                throw new Error(`Missing PreferredName or JobTitleName at index ${index}`);
            }

            // JobTitleName을 JobTitleID로 매핑
            const jobTitleID = await getJobTitleIDByName(connection, JobTitleName);
            if (!jobTitleID) {
                throw new Error(`JobTitleName "${JobTitleName}" not found at index ${index}`);
            }
            console.log("Found JobTitleID", jobTitleID);
            // 기본 직원 데이터 구성
            const newEmployee = {
                PreferredName,
                LegalName,
                JobTitle: JobTitleName,
                JobTitleID: jobTitleID,
                CompanyID,
                Email,
                StartDate,
                EndDate,
                Notes,
                AddressID: null
            };

            // 주소 데이터 처리
            if (addressData && typeof addressData === 'object' && Object.keys(addressData).length > 0) {
                const addressID = await createAddress(connection, addressData);
                newEmployee.AddressID = addressID;
            }

            // 직원 생성
            const [result] = await connection.query('INSERT INTO employee SET ?', newEmployee);
            insertedCount += 1;
        }

        await connection.commit();
        return insertedCount;
    } catch (error) {
        await connection.rollback();
        console.error('Error in bulkCreateEmployees:', error);
        throw error;
    } finally {
        connection.release();
    }
}

// JobTitleName으로 JobTitleID 찾기
async function getJobTitleIDByName(connection, JobTitleName) {
    const sql = `SELECT JobTitleID FROM JobTitle WHERE TitleName = ? LIMIT 1`;
    const [rows] = await connection.query(sql, [JobTitleName]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0].JobTitleID;
}
async function createBulkEmployee(connection, employeeData) {
    const sql = 'INSERT INTO employee SET ?';
    const [result] = await connection.query(sql, employeeData);
    return { ...employeeData, employeeID: result.insertId };
}

module.exports = {
    getAllemployees,
    getEmployeesByStatus,
    getAllEmployeeName,
    getAllSimpleEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,

    bulkCreateEmployees
    // getAllemployeesWithJoin
}