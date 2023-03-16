const { MongoClient } = require('mongodb');
const fs = require('fs');
const ini = require('ini');
const express = require("express");

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
const uri = "mongodb+srv://"+ username +":"+ password +"@cluster0.ydior1v.mongodb.net/?retryWrites=true&w=majority";
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
        // if (date) {
        //     const dateObj = new Date(date);
        //     filter.date = {
        //         $gte: dateObj,
        //         $lt: new Date(dateObj.getTime() + (24 * 60 * 60 * 1000))
        //     };
        // } else {
        //     // Set default date to today
        //     filter.date = {
        //         $gte: new Date().setHours(0, 0, 0, 0),
        //         $lte: new Date().setHours(23, 59, 59, 999)
        //     };
        //     console.log(filter.date);
        // }
        if (seat) {
            filter.seats = { $gte: parseInt(seat) };
        }
        else {
            filter.seats = { $gte: 1 };
        }
        const documents = await db.collection("carpool").find(filter).toArray();
        res.json(documents);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        res.status(500).send('Error connecting to database');
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
