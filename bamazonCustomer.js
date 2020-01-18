// import inquirer
var inquirer = require("inquirer");
// import mysql
var mysql = require("mysql");
// create the connection
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Pilot943foot81!",
    database: "bamazon"
});
// establish connection and log out connection id
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    console.log("All products we currently have... \n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the select statement
        console.log(res);
        connection.end();
    });
}