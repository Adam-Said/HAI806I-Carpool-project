var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
app.listen(8888);
console.log("Serveur démarré")
const client = new MongoClient(url);

async function main() {
	client.connect()
    .then(
        client => { return client.db("SUPERVENTES"); }
    )
    .then(async (db) => {
		console.log("Liste des collections :");
		let collections = await db.listCollections().toArray();
		for (let collection of collections) {
			console.log(collection.name);
		}
		return db;
	})
	.then((db) => {
		app.get("/produits", async (req, res) => {
			console.log("/produits");
			let documents = await db.collection("produits").find().toArray();
			res.json(documents);
		});    
		
		app.get("/produits/:type", async (req, res) => {
			console.log("/produits/"+req.params.type);
			let documents = await db.collection("produits").find({type:req.params.type}).toArray();
			res.json(documents);
		});

	});
}
main();






