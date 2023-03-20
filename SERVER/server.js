const { MongoClient } = require('mongodb');
const bcrypt = require("bcryptjs")
const express = require("express");
const fs = require('fs');
const ini = require('ini');

const saltRounds = 10
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get('/carpool', async (req, res) => {
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


app.get('/carpool/:departure/:arrival', async (req, res) => {
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

        // If passwords match, send a success response with the user's data
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});




app.listen(port, () => {
    // pass = "azert";
    // bcrypt.genSalt(saltRounds, function (saltError, salt) {
    //     if (saltError) {
    //         throw saltError
    //     } else {
    //         bcrypt.hash(pass, salt, function (hashError, hash) {
    //             if (hashError) {
    //                 throw hashError
    //             } else {
    //                 console.log(hash)
    //                 //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
    //             }
    //         })
    //     }
    // })
    console.log(`Server listening on port ${port}`);
});
