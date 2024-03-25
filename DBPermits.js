
//This is the JS that reaches out to the DB to query and also to update. 
//There are notes added for if you import into your own project youll just put in your db name, table name etc....
//This file assumes that you used the sql insert i put into teams chat.. if you missed it ill add it here:

//  CREATE TABLE your_db_name.Permits(
//      dbid INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
//      Type VARCHAR(255) NOT NULL,
//      Meta_Data TEXT NOT NULL,
//      Start_Date DATE,
//      End_Date DATE,
//      Status VARCHAR(255) NOT NULL,
//      Submitter_Name VARCHAR(255) NOT NULL,
//      Submitted_Date DATETIME NOT NULL,
//      Approver_Name VARCHAR(255),
//      Approved_Date DATETIME
//  );

import express from "express";
import mysql from "mysql";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "your_db_name",
    
})
//
//If you encounter an auth problem, execute this query in your db...
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
app.use(express.json());

// QUERY THE DATABASE
app.get("/permits", (req, res) => {
    db.query("SELECT * FROM your_db_name.permits", (err, result) => { //set your db name
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});

// UPDATE / ADD INTO THE DATABASE
app.post("/permits", (req, res) => {
    const {permit} = req.body;
    db.query("INSERT INTO your_db_name.permits SET ?", permit, (err, result) => { //set your db name
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});
   //THIS IS YOUR PORT
app.listen(8800, () => {
    console.log("Server started on port 8800. Backend Reached :)."); // in your browser use localhost:8800 to view this page... tag on the /permits to see the get.. use postman to see the post.
})
