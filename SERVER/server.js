const { MongoClient, ObjectId } = require('mongodb');
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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Set the specific origin of your Angular app here
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
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
        else {
            const dateObj = new Date();
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

app.get('/carpool/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('CarPoule');
        const { id } = req.params;
        const filter = {
            _id: new ObjectId(id),
        };
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
        const { email, password, name, firstname, birthdate, pref_smoking, pref_animals, pref_talk, phone } = req.body;

        // Check if user already exists with the given email
        const existingUser = await db.collection('user').findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        if (!email || !password || !name || !firstname || !birthdate || !phone) {
            return res.status(400).send('Missing parameters');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document with the hashed password
        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name,
            firstname: firstname,
            birthdate: birthdate,
            pref_smoking: pref_smoking || false,
            pref_animals: pref_animals || false,
            pref_talk: pref_talk || false,
            phone: phone,
            payment_method: {
                card_num: '',
                card_cvc: '',
                card_exp: new Date()
            },
            rating: 0.0,
            vehicle: {
                brand: '',
                model: '',
                registration: '',
                color: '',
                place_number: 0
            },
            carpool_num: 0,
            profile_pic: 0
        };

        // Insert the new user document into the "user" collection
        const user = await db.collection('user').insertOne(newUser);

        const payload = {
            email: user.email,
            id: user._id // Add the user's ID as a claim in the JWT
        };

        // If passwords match, create a JWT token with the user's data
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

        // Set the JWT token as a cookie in the response
        res.cookie('auth', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        });

        // Redirect the user to the /profile route
        res.status(201).send({ id: user._id });
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
        const payload = {
            email: user.email,
            id: user._id // Add the user's ID as a claim in the JWT
        };

        // If passwords match, create a JWT token with the user's data
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

        // Set the JWT token as a cookie in the response
        res.cookie('auth', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        });

        // Redirect the user to the /profile route
        res.status(201).send({ id: user._id });

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const db = client.db('CarPoule');
        const user = await db.collection('user').findOne({ _id: new ObjectId(userId) });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});



app.post('/profile/edit', authenticateToken, async (req, res) => {
    try {
        const { name, firstname, email, phone, birthdate, pref_animals, pref_talk, pref_smoking, brand, model, color, registration, card_num, card_cvc, card_exp } = req.body;
        const db = client.db('CarPoule');
        const user = await db.collection('user').findOne({ _id: new ObjectId(req.user._id) });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update email if provided and not already taken by another user
        if (email) {
            const emailTaken = await db.collection('users').findOne({ email: email });
            if (emailTaken) {
                return res.status(400).send('Email already taken');
            }
            user.email = email;
        }

        // Update password if provided
        // if (password) {
        //     user.password = await bcrypt.hash(password, 10);
        // }
        if (name) {
            user.name = name;
        }

        if (firstname) {
            user.firstname = firstname;
        }

        if (phone) {
            user.phone = phone;
        }

        if (birthdate) {
            user.birthdate = birthdate;
        }

        // Update preferences if provided
        if (pref_animals !== undefined) {
            user.pref_animals = pref_animals;
        }
        if (pref_talk !== undefined) {
            user.pref_talk = pref_talk;
        }
        if (pref_smoking !== undefined) {
            user.pref_smoking = pref_smoking;
        }

        // Update vehicles if provided
        if (brand || model || color || registration) {
            const vehicle = user.vehicle || {};
            if (brand) {
                vehicle.brand = brand;
            }
            if (model) {
                vehicle.model = model;
            }
            if (color) {
                vehicle.color = color;
            }
            if (registration) {
                vehicle.registration = registration;
            }
            user.vehicle = vehicle;
        }

        if (card_num || card_cvc || card_exp) {
            const payment = user.payment_method || {};
            if (card_num) {
                payment.card_num = card_num;
            }
            if (card_cvc) {
                payment.card_cvc = card_cvc;
            }
            if (card_exp) {
                const [year, month, day] = card_exp.split('-')
                payment.card_exp = new Date(year, month - 1, day);
            }
            user.payment_method = payment;
        }


        // Save the updated user object to the database
        const result = await db.collection('user').findOneAndUpdate(
            { _id: new ObjectId(req.user._id) },
            { $set: user },
            { returnOriginal: false }
        );

        res.status(200).json("User updated");
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});




app.put('/publish', authenticateToken, async (req, res) => {
    try {
        const { departure, arrival, date, seats, highway, price, description } = req.body;
        if (!departure || !arrival || !date || !seats || !highway || !price || !description) {
            return res.status(400).send('Missing parameters');
        }
        const db = client.db('CarPoule');
        const carpool = {
            driver: req.user._id,
            departure: departure,
            arrival: arrival,
            date: new Date(date),
            seats: parseInt(seats),
            highway: highway,
            price: parseInt(price),
            passengers: [],
            description: description,
        };

        const result = await db.collection('carpool').insertOne(carpool);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});

// app.put('/carpool/:id', authenticateToken, async (req, res) => {
//     try {
//       const { departure, arrival, date, time, seats, highway, price } = req.body;
//       const { id } = req.params;
//       if (!id) {
//         return res.status(400).send('Missing id parameter');
//       }
//       const db = client.db('CarPoule');
//       const filter = {
//         _id: new ObjectId(id),
//         driver: req.user.email
//       };
//       const carpool = await db.collection('carpool').findOne(filter);
//       if (!carpool) {
//         return res.status(404).send('Carpool not found');
//       }
//       const updates = {};
//       if (departure) updates.departure = departure;
//       if (arrival) updates.arrival = arrival;
//       if (date && time) {
//         const [year, month, day] = date.split('-');
//         const [hour, minute] = time.split('-');
//         updates.date = new Date(year, month - 1, day, hour, minute);
//       }
//       if (seats) updates.seats = parseInt(seats);
//       if (highway) updates.highway = highway;
//       if (price) updates.price = parseInt(price);
//       const result = await db.collection('carpool').updateOne(filter, { $set: updates });
//       res.status(200).json({ updatedCount: result.modifiedCount });
//     } catch (err) {
//       console.error('Failed to connect to MongoDB', err);
//       res.status(500).send('Error connecting to database');
//     }
//   });

app.delete('/carpool/:id', authenticateToken, async (req, res) => {
    try {
        const db = client.db('CarPoule');
        const collection = db.collection('carpool');
        const carpoolId = req.params.id;

        // Find the carpool in the database
        const carpool = await collection.findOne({ _id: new ObjectId(carpoolId) });

        // Check if the authenticated user is the driver of the carpool
        if (req.user.email !== carpool.driver) {
            return res.status(401).send('Unauthorized');
        }

        // Delete the carpool from the database
        const result = await collection.deleteOne({ _id: new ObjectId(carpoolId) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Carpool not found');
        }

        res.status(204).send();
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});

app.post('/carpool/:id/book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const db = client.db('CarPoule');
        const carpool = await db.collection('carpool').findOne({ _id: new ObjectId(id) });

        if (!carpool) {
            return res.status(404).send('Carpool not found');
        }

        if (carpool.driver.toString() === req.user.id) {
            return res.status(400).send('Driver cannot book a seat in their own carpool');
        }

        // Check if the carpool is full
        if (carpool.passengers.length >= carpool.seats) {
            return res.status(400).send('Carpool is full');
        }

        // Check if there is already a pending document for this carpool
        const pendingCarpool = await db.collection('pending').findOne({ carpool_id: new ObjectId(id) });

        if (pendingCarpool) {
            // Update the existing pending document
            await db.collection('pending').findOneAndUpdate(
                { carpool_id: new ObjectId(id) },
                { $push: { passengers: { passenger_id: new ObjectId(req.user.id), booking_date: new Date() } } },
                { returnOriginal: false }
            );
        } else {
            // Add a new pending document
            const newPendingCarpool = await db.collection('pending').insertOne({
                carpool_id: new ObjectId(id),
                passengers: [{ passenger_id: new ObjectId(req.user.id), booking_date: new Date() }]
            });
        }

        res.json({ message: 'Booking successful' });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});

app.get('/trips', authenticateToken, async (req, res) => {
    try {
        const db = client.db('CarPoule');
        const carpools = await db.collection('carpool').find({
            $or: [
                { driver: new ObjectId(req.user._id) },
                { passengers: { $in: [new ObjectId(req.user._id)] } }
            ]
        }).toArray();

        // Get driver names from user collection
        const driverIds = [...new Set(carpools.map(carpool => carpool.driver))];
        const drivers = await db.collection('user').find({ _id: { $in: driverIds } }).toArray();
        const driverMap = new Map(drivers.map(driver => [driver._id.toString(), driver.firstname]));


        // Add driver name to each carpool
        carpools.forEach(carpool => {
            carpool.driver = driverMap.get(carpool.driver.toString());
        });

        res.json(carpools);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});






async function authenticateToken(req, res, next) {
    const token = req.cookies.auth;
    if (!token) return res.sendStatus(401);

    try {
        await client.connect();
        const db = client.db('CarPoule');

        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

        const user = await db.collection('user').findOne({ _id: new ObjectId(payload.id) });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
}





app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
