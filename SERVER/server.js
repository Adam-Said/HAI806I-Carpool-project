const { MongoClient } = require('mongodb');
const bcrypt = require("bcryptjs")
const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ini = require('ini');

const app = express();
const ACCESS_TOKEN_SECRET = '123';


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const config = ini.parse(fs.readFileSync('./db.ini', 'utf-8'));
const port = process.env.PORT || 3000;
const username = config.username;
const password = config.password;
const uri = "mongodb+srv://" + username + ":" + password + "@cluster0.ydior1v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.get('/', (req, res) => {
    res.send('CarPoule API is running!');
});

app.get('/search', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('CarPoule');
        const documents = await db.collection("carpool").find().toArray();
        res.json(documents);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});


app.get('/search/:departure/:arrival', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('CarPoule');
        const { departure, arrival } = req.params;
        const { date, seat } = req.query;
        const filter = {
            departure,
            arrival,
        };
        if (date) {
            const dateObj = new Date(date);
            dateObj.setHours(0, 0, 0, 0);
            filter.date = {
                $gte: dateObj,
                $lte: new Date(dateObj.getTime() + (24 * 60 * 60 * 1000) - 1)
            };
        }
        if (seat) {
            filter.seats = { $gte: parseInt(seat) };
        } else {
            filter.seats = { $gte: 1 };
        }
        const documents = await db.collection("carpool").find(filter).toArray();
        res.json(documents);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }


});

app.post('/signup', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('CarPoule');
        const { email, password, name, firstname } = req.body;

        // Check if user already exists with the given email
        const existingUser = await db.collection('user').findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        if (!email || !password || !name || !firstname) {
            return res.status(400).send('Missing parameters');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document with the hashed password
        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name,
            firstname: firstname
        };

        // Insert the new user document into the "user" collection
        const result = await db.collection('user').insertOne(newUser);

        // Send a success response with the new user's ID
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});

app.post('/login', async (req, res) => {
    try {
      await client.connect();
      const db = client.db('CarPoule');
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send('Missing parameters');
      }
  
      lowEmail = email.toLowerCase();
      const user = await db.collection('user').findOne({ email: lowEmail });
  
      if (!user) {
        return res.status(401).send('Invalid user');
      }
  
      // Compare the submitted password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).send('Invalid password');
      }
  
      // If passwords match, create a JWT token with the user's data
      const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET);
  
      // Set the JWT token as a cookie in the response
      res.cookie('auth', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });
  
      // Redirect the user to the /profile route
      res.status(201).json({ user });
  
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      res.status(500).send('Error connecting to database');
    }
  });

app.get('/profile', authenticateToken, async (req, res) => {
    try {
    await client.connect();
    const db = client.db('CarPoule');
    const user = await db.collection('user').findOne({ email: req.user.email });
    res.json({
        name: user.name,
        email: user.email,
        firstname: user.firstname
    });
    } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    res.status(500).send('Error connecting to database');
    }
});
  

app.put('/publish', authenticateToken, async (req, res) => {
    try {
        const { departure, arrival, date, time, seats } = req.body;
        if (!departure || !arrival || !date || !time || !seats) {
            return res.status(400).send('Missing parameters');
        }
        const db = client.db('CarPoule');
        const carpool = {
            user: req.user.email,
            departure: departure,
            arrival: arrival,
            date: new Date(date),
            time: time,
            seats: parseInt(seats)
        };
        const result = await db.collection('carpool').insertOne(carpool);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});


function authenticateToken(req, res, next) {
    const token = req.cookies.auth;
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
}
  




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
