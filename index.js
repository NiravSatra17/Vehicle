const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const createConnection = async () => {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abc456",
    database: "vehicle",
  });
  return con;
};

app.post("/saveUser", async (req, res) => {
  try {
    const con = await createConnection();
    const data = [req.body.un, req.body.vType, req.body.vNum];
    const sql = "INSERT INTO users (email, vType, vNum) VALUES (?, ?, ?)";
    const [result] = await con.execute(sql, data);
    con.end(); // Close the connection
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/readUser", async (req, res) => {
  try {
    const userEmail = req.query.un; // Access the 'un' parameter from the query string
    const sql = "SELECT * FROM users WHERE email=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, [userEmail]);
    
    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


app.get("/getVehNum", async (req, res) => {
  try {
    const userEmail = req.query.un; // Access the 'un' parameter from the query string
    const sql = "SELECT vNum FROM users WHERE email=?";
// Execute the query using await
    const [result] = await con.execute(sql, [userEmail]);

    // Close the connection
    con.end();

    if (result.length === 0) {
      // If no results were found for the user's email
      res.status(404).json({ message: "No data found for this user" });
    } else {
      // If results were found, send them as a JSON response
      res.status(200).json(result);
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});


app.delete("/delUser", async (req, res) => {
  try {
    const data = [req.body.vNum];
    const sql = "DELETE FROM users WHERE vNum=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, data);

    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/savePUC", async (req, res) => {
  try {
    const data = [req.body.selectedValue, req.body.startDate, req.body.endDate];
    const sql = "INSERT INTO puc (vNum, startDate, endDate) VALUES (?, ?, ?)";
	  // Execute the query using await
    const [result] = await con.execute(sql, data);

    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


app.get("/readPUC", async (req, res) => {
  try {
    const selectedValue = req.query.selectedValue;

    if (!selectedValue) {
      return res.status(400).json({ error: 'Select Vehicle Number' });
    }

    const sql = "SELECT * FROM puc WHERE vNum=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, [selectedValue]);

    // Close the connection
    con.end();

    res.json(result);
  } catch (err) {
    console.error('Error executing the SQL query: ' + err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete("/delPUC", async (req, res) => {
  try {
    const data = [req.body.startDate];
    const sql = "DELETE FROM puc WHERE startDate=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, data);

    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/saveInsurance", async (req, res) => {
  try {
    const data = [req.body.selectedValue, req.body.policyNum, req.body.startDate, req.body.endDate, req.body.amount];
    const sql = "INSERT INTO insurance (vNum, policyNum, startDate, endDate, amount) VALUES (?, ?, ?, ?, ?)";
	  // Execute the query using await
    const [result] = await con.execute(sql, data);

    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/readInsurance", async (req, res) => {
  try {
    const selectedValue = req.query.selectedValue;

    if (!selectedValue) {
      return res.status(400).json({ error: 'Select Vehicle Number' });
    }

    const sql = "SELECT * FROM insurance WHERE vNum=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, [selectedValue]);

    // Close the connection
    con.end();

    res.json(result);
  } catch (err) {
    console.error('Error executing the SQL query: ' + err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete("/delInsurance", async (req, res) => {
  try {
    const data = [req.body.startDate];
    const sql = "DELETE FROM insurance WHERE startDate=?";
	  // Execute the query using await
    const [result] = await con.execute(sql, data);

    // Close the connection
    con.end();

    // Send the result to the client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});



app.listen(9000, () => { 
	console.log("Ready to server @ 9000") 
});







