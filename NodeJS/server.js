const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
var con = mysql.createConnection({
  host: "roadmagev2.cdauati8nzkb.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Wrxtra!5",
  database: "roadmage_v2"
});
 
con.connect(function(err) {
  if (err) throw err;
 console.log('connection successful');
});

app.post('/retrieve',(req,res)=>{
	var user = req.body.user;
	con.query(`SELECT * FROM userinfov2 WHERE user = '${user}'`, function (err, response, fields) {
		if (response[0] == undefined) throw err;

		else {
			res.send(response[0]);
		}
	});
});

app.post('/',(req,res)=>{
	var {temperament,transmission,vehicle,time,fuel,user} = req.body;
	var records = [[req.body.temperament, req.body.transmission, req.body.vehicle, req.body.preference, req.body.traffic, req.body.user, req.body.toll, req.body.thrill, req.body.fuel]];
	data = [
		records[0][5],
		records[0][0],
		records[0][1],
		records[0][2],
		records[0][3],
		records[0][4],
		records[0][6],
		records[0][7],
		records[0][8]
	].toString();
	if(records[0][0]!=null) {
		con.query(`SELECT COUNT(*) AS total FROM userinfov2 WHERE user = '${records[0][5]}'`,function(err,res,fields){
			if(err) throw err;

			else if (res[0].total == 0) {
				con.query(`INSERT INTO userinfov2 VALUES ("${records[0][5]}", "${records[0][0]}", "${records[0][1]}", "${records[0][2]}", "${records[0][3]}", "${records[0][4]}", "${records[0][6]}", "${records[0][7]}", "${records[0][8]}")`,function(err,res,fields){
					if(err) throw err;

					else {
						console.log("New user data added to AWS RDS database roadmage_v2.");
					}
				});
			}
			else {
				con.query(`SELECT user FROM userinfov2 WHERE user = '${records[0][5]}'`,function(err,res,fields){
					if(err) throw err;
					
					else {
						con.query(`UPDATE userinfov2 SET temperament = '${records[0][0]}', transmission = '${records[0][1]}', vehicle = '${records[0][2]}', preference = '${records[0][3]}', traffic = '${records[0][4]}', toll = '${records[0][6]}', thrill = '${records[0][7]}', fuel = '${records[0][8]}' WHERE user = '${records[0][5]}'`,function(err,res,fields){
							if(err) throw err;

							else {
								console.log(`Data for user '${records[0][5]}' updated successfully!`);
							}
						});
					}
				});
			}
		});
	}
	res.redirect("http://localhost:3000/");
});

app.listen(3001,()=>{
  console.log("Port 3001");
});







