const express = require('express');
const app     = express();
const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://carpouledb:7gOwYXJg0QJD7By7@cluster0.ydior1v.mongodb.net/?retryWrites=true&w=majority";


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Content-type', 'application/json');
	next();
});

const client = new MongoClient(uri);
async function dbconnect() {
	try {
	  await client.connect();
	  const db = client.db('CarPoule');
	  const collection = db.collection('user');
  
	  // Find the first document in the collection
	  const first = await collection.findOne();
	  console.log(first);
	} finally {
	  // Close the database connection when finished or an error occurs
	  await client.close();
	}
  }

dbconnect().catch(console.error);
app.listen(8888);
console.log("Server ready !")
