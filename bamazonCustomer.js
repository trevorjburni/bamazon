// import inquirer
var inquirer = require("inquirer");
// import mysql
var mysql = require("mysql");
// import console-table-printer
var {
    printTable
} = require("console-table-printer");
// create the connection
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Pilot943foot81!",
    database: "bamazon"
});
// establish connection and log out connection id
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

// function which prompts the user what product they would like to buy
function purchase() {
    inquirer
        .prompt([{
                name: "item",
                type: "input",
                message: "What's the ID of the product you would like to buy?",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            console.log(answer.item, answer.quantity);
        });
}

// function to display all products and data associated with each product
function readProducts() {
    console.log("All products we currently have... \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the select statement
        printTable(res);
        console.log("\n");
        purchase();
        connection.end();
    });
};