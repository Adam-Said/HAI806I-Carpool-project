var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
app.listen(8888);

console.log("Serveur démarré")
const client = new MongoClient(url);

async function main() {
	client.connect()
    .then(
        client => {
			db = client.db("SUPERVENTES");
		
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

		app.get("/categories", async (req,res) => {
			console.log("/categories");
			categories = [];
			let documents = await db.collection("produits").find().toArray();
			for (let doc of documents) {
				if (!categories.includes(doc.type)) categories.push(doc.type); 
			}
			res.json(categories);
		});
	
		app.post("/user/connexion", async (req,res) => {
			console.log("/user/connexion avec ", req.body);
			let document = await db.collection("users").find(req.body).toArray();
			if (document.length == 1)
				res.json({"resultat": 1, "message": "Authentification réussie"});
			else res.json({"resultat": 0, "message": "Email et/ou mot de passe incorrect"});
		});
	});
}
main();






