import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';// If using password hashing

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
  
  /*app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM user WHERE Email = ?';
    db.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (result.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const user = result[0];
  
      // If passwords are hashed
      bcrypt.compare(password, user.Password, (err, isMatch) => {
        if (err) throw err;
  
        if (isMatch) {
          return res.json({ userId: user.UserId }); // Send back userId (or token)
        } else {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    });
  });*/
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM user WHERE Email = ? AND Password = ?'; // Assuming no password hashing for now
    db.query(query, [email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
  
      if (results.length > 0) {
        const user = results[0];
        return res.json({ message: 'Login successful', UserId: user.UserId });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });
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
const generateRandomUserId = () => {
    // Generate a random UserId (for example, a 6-digit number or a custom format)
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
};

const insertNewUser = (Email, Password, UserId, res) => {
    const insertUserQuery = 'INSERT INTO user (UserId, Lname, Fname, Mname, RoleId, Email, Password, College, Program, YearLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(insertUserQuery, [UserId, temporaryData.Lname, temporaryData.Fname, temporaryData.Mname, temporaryData.roleId, Email, Password, temporaryData.selectedDepartment, temporaryData.selectedCourse, temporaryData.selectedYear], (insertError, insertResults) => {
        if (insertError) {
            console.error('Error inserting user:', insertError);
            return res.status(500).json({ message: 'Error inserting user' });
        }

        // Clear the temporary data after successful insertion
        temporaryData = {};

        res.status(201).json({ message: 'User created successfully!', UserId });
    });
};

const checkIfUserIdExists = (Email, Password, UserId, res) => {
    const checkUserIdQuery = 'SELECT * FROM user WHERE UserId = ?';

    db.query(checkUserIdQuery, [UserId], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking UserId:', checkError);
            return res.status(500).json({ message: 'Database error' });
        }

        if (checkResults.length > 0) {
            // UserId already exists, generate a new one and check again
            const newUserId = generateRandomUserId();
            console.log('UserId exists, generating new UserId:', newUserId);
            checkIfUserIdExists(Email, Password, newUserId, res);
        } else {
            // UserId is unique, proceed to insert the user
            insertNewUser(Email, Password, UserId, res);
        }
    });
};

app.post('/pass-user', (req, res) => {
    const { Email, Password } = req.body;

    // Validate that all required fields are present
    if (!Email || !Password || !temporaryData.Lname || !temporaryData.Fname || !temporaryData.roleId || !temporaryData.selectedDepartment || !temporaryData.selectedCourse || !temporaryData.selectedYear) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Start by using the provided UserId, if any, or generate a new random one
    const initialUserId = temporaryData.UserId || generateRandomUserId();

    // Check if the UserId already exists, and if so, generate a new one until it's unique
    checkIfUserIdExists(Email, Password, initialUserId, res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
