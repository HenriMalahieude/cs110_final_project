require('dotenv').config(); //load a .env file into the server

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
	console.log("Getting page!");
	res.json({message: "Hello world!"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, 
	console.log(`Server started on port ${PORT}`)
);