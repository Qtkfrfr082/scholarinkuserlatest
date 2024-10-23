import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = 5456;

app.use(cors());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: '127.0.0.1', // Your MySQL host
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password
    database: 'scholarinkuser' // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save profile pictures
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  // Route to handle user profile update (including image upload)
  app.put('/user/:id/edit', upload.single('Profile'), (req, res) => {
    const userId = req.params.id;
    const { Fname, Mname, Lname, Email, College, Program, YearLevel } = req.body;
    const newProfileImage = req.file ? req.file.filename : null; // New profile picture filename

    // Step 1: Retrieve the current profile image filename from the database
    const getCurrentProfileQuery = 'SELECT Profile FROM user WHERE UserId = ?';

    db.query(getCurrentProfileQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching current profile image:', err);
            return res.status(500).json({ message: 'Error fetching current profile image' });
        }

        const currentProfileImage = results[0]?.Profile;

        // Step 2: Delete the old image file if a new one is uploaded and the user had a previous image
        if (newProfileImage && currentProfileImage) {
            const oldImagePath = `uploads/${currentProfileImage}`;
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old profile image:', err);
                    // Proceed even if deleting the old image fails
                }
            });
        }

        // Step 3: Construct the query dynamically based on whether a new image is uploaded
        let updateUserQuery = `
            UPDATE user 
            SET Fname = ?, Mname = ?, Lname = ?, Email = ?, College = ?, Program = ?, YearLevel = ?
        `;

        const queryParams = [Fname, Mname, Lname, Email, College, Program, YearLevel];

        // Only add the Profile field if a new image is uploaded
        if (newProfileImage) {
            updateUserQuery += `, Profile = ?`;
            queryParams.push(newProfileImage);
        }

        updateUserQuery += ` WHERE UserId = ?`;
        queryParams.push(userId);

        db.query(updateUserQuery, queryParams, (error, results) => {
            if (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ message: 'Error updating user data' });
            }

            res.status(200).json({ message: 'User updated successfully!' });
        });
    });
});
  app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM user WHERE UserId = ?', [userId], (error, rows) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ message: 'Error fetching user data' });
        }

        if (rows.length > 0) {
            const user = rows[0];
            const userProfileUrl = user.Profile ? `http://localhost:5456/uploads/${user.Profile}` : null;
            res.status(200).json({ ...user, Profile: userProfileUrl });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});
// Temporary storage for user data
let temporaryData = {};

// Endpoint to fetch roles and store roleId temporarily
app.post('/role', (req, res) => {
    const { roleId } = req.body;

    if (!roleId) {
        return res.status(400).json({ message: 'Role ID is required' });
    }
    console.log('Received roleId:', roleId);
    // Store roleId temporarily in memory
    temporaryData.roleId = roleId;

    res.status(200).json({ message: 'Role stored temporarily', temporaryData });
});

// Endpoint to temporarily store email and password
app.post('/signup', (req, res) => {
    const { studentNum, Lname, Fname, Mname } = req.body;

    if (!studentNum || !Lname || !Fname || !temporaryData.roleId) {
        return res.status(400).json({ message: 'Error inserting data' });
    }

    // Store email and password temporarily
    temporaryData.studentNum = studentNum;
    temporaryData.Lname = Lname;
    temporaryData.Fname = Fname;
    temporaryData.Mname = Mname;

    res.status(200).json({ message: 'Stored temporarily', temporaryData });
});

app.post('/department', (req, res) => {
    const { departmentId, programId, yearId } = req.body;

    if (!departmentId || !programId || !yearId || !temporaryData.studentNum || !temporaryData.Lname || !temporaryData.Fname || !temporaryData.roleId) {
        return res.status(400).json({ message: 'Error inserting data' });
    }

    // Store department, program, and year temporarily
    temporaryData.selectedDepartment = departmentId;
    temporaryData.selectedCourse = programId;
    temporaryData.selectedYear = yearId;

    res.status(200).json({ message: 'Stored temporarily', temporaryData });
});
// Endpoint to store user details and finalize the data insertion
    app.post('/pass-user', (req, res) => {
        const { Email, Password } = req.body;
    
        if (!Email || !Password || !temporaryData.studentNum || !temporaryData.Lname || !temporaryData.Fname || !temporaryData.roleId || !temporaryData.selectedDepartment || !temporaryData.selectedCourse|| !temporaryData.selectedYear) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    // Now, insert into the database
    const query = 'INSERT INTO user (StudentNum, Lname, Fname, Mname, RoleId, Email, Password, College, Program, YearLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [temporaryData.studentNum, temporaryData.Lname, temporaryData.Fname,temporaryData.Mname, temporaryData.roleId, Email, Password, temporaryData.selectedDepartment, temporaryData.selectedCourse, temporaryData.selectedYear  ], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ message: 'Error inserting user' });
        }

        // Clear the temporary data after insertion
        temporaryData = {};

        res.status(201).json({ message: 'User created successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
