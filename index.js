const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "abc456",
	database : "vehicle"
})

app.post("/saveUser", (req, res) => {
	let data = [ req.body.un, req.body.vType, req.body.vNum ];
	let sql = "insert into users (email, vType, vNum) values(?, ?, ?)";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.get("/readUser", (req, res) => {
	const userEmail = req.query.un; // Access the 'un' parameter from the query string

	let sql = "SELECT * FROM users WHERE email=?";
	con.query(sql, [userEmail], (err, result) => {
		if (err) 	res.send(err);
		else 		res.send(result);
	});
});

app.get("/getVehNum", (req, res) => {
  const userEmail = req.query.un; // Access the 'un' parameter from the query string

  let sql = "SELECT vNum FROM users WHERE email=?";
  con.query(sql, [userEmail], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      if (result.length === 0) {
        // If no results were found for the user's email
        res.status(404).json({ message: "No data found for this user" });
      } else {
        // If results were found, send them as a JSON response
        res.status(200).json(result);
      }
    }
  });
});


app.delete("/delUser", (req, res) => {
	let data = [req.body.vNum]
	let sql = "delete from users where vNum=?";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.post("/savePUC", (req, res) => {
	let data = [req.body.selectedValue, req.body.startDate, req.body.endDate];
	let sql = "insert into puc (vNum, startDate, endDate) values(?, ?, ?)";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.get("/readPUC", (req, res) => {
  const selectedValue = req.query.selectedValue;

  if (!selectedValue) {
    return res.status(400).json({ error: 'Select Vehicle Number' });
  }

  const sql = "SELECT * FROM puc WHERE vNum=?";
  con.query(sql, [selectedValue], (err, result) => {
    if (err) {
      console.error('Error executing the SQL query: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});


app.delete("/delPUC", (req, res) => {
	let data = [ req.body.startDate ]
	let sql = "delete from puc where startDate=?";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.post("/saveInsurance", (req, res) => {
	let data = [req.body.selectedValue, req.body.policyNum, req.body.startDate, req.body.endDate, req.body.amount];
	let sql = "insert into insurance (vNum, policyNum, startDate, endDate, amount) values(?, ?, ?, ?, ?)";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.get("/readInsurance", (req, res) => {
  const selectedValue = req.query.selectedValue;

  if (!selectedValue) {
    return res.status(400).json({ error: 'Select Vehicle Number' });
  }

  const sql = "SELECT * FROM insurance WHERE vNum=?";
  con.query(sql, [selectedValue], (err, result) => {
    if (err) {
      console.error('Error executing the SQL query: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.delete("/delInsurance", (req, res) => {
	let data = [ req.body.startDate ]
	let sql = "delete from insurance where startDate=?";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.post("/savePetrol", (req, res) => {
	let data = [req.body.selectedValue, req.body.petrolDate, req.body.prevRead, req.body.curntRead, req.body.amount, req.body.litre ];
	let sql = "insert into petrol (vNum, petrolDate, prevRead, curntRead, amount, litre) values(?, ?, ?, ?, ?, ?)";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
});

app.get("/readPetrol", (req, res) => {
  const selectedValue = req.query.selectedValue;

  if (!selectedValue) {
    return res.status(400).json({ error: 'Select Vehicle Number' });
  }

  const sql = "SELECT * FROM petrol WHERE vNum=?";
  con.query(sql, [selectedValue], (err, result) => {
    if (err) {
      console.error('Error executing the SQL query: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.get("/getPrevRead", (req, res) => {
  const selectedValue = req.query.selectedValue;

  if (!selectedValue) {
    return res.status(400).json({ error: 'Select Vehicle Number' });
  }

  const sql = "SELECT prevRead FROM petrol WHERE vNum=? ORDER BY uid DESC LIMIT 1";
  con.query(sql, [selectedValue], (err, result) => {
    if (err) {
      console.error('Error executing the SQL query: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});



app.listen(9000, () => { console.log("Ready to server @ 9000") });







