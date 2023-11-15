const express = require("express")
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs');


const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const mysql = require("mysql")
const conn = mysql.createConnection(config)

const database = `CREATE TABLE IF NOT EXISTS nodedb.people(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100));`
conn.query(database)

app.get("/", (req,res) => {
    conn.query("SELECT name FROM nodedb.people", function (err, result, fields) {
        console.log(result)
        res.render('pages/index',{people : result});
    });
})
app.post("/person/create", (req,res) => {
    console.log(req.body.name)
    if(req.body?.name){
        var name = req.body.name;
        const sql = `INSERT INTO people(name) values('${name}')`
        conn.query(sql)

        res.redirect('/');
    }
})

app.listen(port,() =>{
    console.log("rodando rodando: "+ port)
})