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
function selectPurchase() {
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
            checkStock(answer.item, answer.quantity);
        });
}

// check stock function
function checkStock(item_id, purchaseQuantity) {
    connection.query("SELECT stock_quantity, product_name, price FROM products WHERE ?", {
            item_id: item_id
        },
        function (err, res) {
            if (err) throw err;
            // if there isn't enough in stock, end connection, else make purchase
            if (res[0].stock_quantity < purchaseQuantity) {
                console.log("Sorry, Insufficient quantity in stock!");
                // end connection
                connection.end();
            } else {
                purchase(item_id, purchaseQuantity, res[0].product_name, res[0].stock_quantity, res[0].price);
            }
        }
    )
}

// function to depricate the amount in stock
function purchase(item_id, purchaseQuantity, product_name, stock_quantity, price) {
    console.log("Purchasing " + purchaseQuantity + " " + product_name + "(s).");
    console.log("Total Cost: $" + (price * purchaseQuantity).toFixed(2));
    // Run the update query
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: stock_quantity - purchaseQuantity
            },
            {
                item_id: item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
        }
    )
    connection.end();
};

// function to display all products and data associated with each product
function readProducts() {
    console.log("All products we currently have... \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the select statement
        printTable(res);
        console.log("\n");
        selectPurchase();
    });
};