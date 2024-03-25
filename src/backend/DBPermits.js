import express from "express";
import mysql from "mysql";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DM1gnse!#34",
    database: "cityoforlandopermit",
    
})

//If you encounter an auth problem, execute this query in your db...
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';

app.use(express.json());

app.get("/permits", (req, res) => {
    db.query("SELECT * FROM cityoforlandopermit.permits", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});

app.post("/permits", (req, res) => {
    const {permit} = req.body;
    db.query("INSERT INTO cityoforlandopermit.permits SET ?", permit, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});




app.listen(8800, () => {
    console.log("Server started on port 8800. Backend Reached :).");
    
})