/*
 USAGE : node bamazonCustomer.js
 This javascript class will essentially do the first part of the assignment 
 Challenge #1: Customer View (Minimum Requirement)
*/

// npm packages to be used
var inquirer = require("inquirer");
var mysql = require("mysql");

// initialize the mysql connection object
var connection = mysql.createConnection({
	host: "localhost",
  	port: 3306,
  	// username
  	user: "root",
  	// password
  	password: "",
  	database: "bamazon"
});

// Establish connection
connection.connect(function(err){
	if (err) throw err;
	
    console.log(" ---------------------- WELCOME TO BAMAZON ! ----------------------");
	// Display Main Menu
	customerMenu();
});

// global variable to capture total cost of items purchased by user
var totalCost = 0;

/**
 * This function will display the list of products from product DB table.
 * Using inquirer package, it will then prompt the customer to select product id 
 * and the quantity they want to purchase
*/
function customerMenu(){
	
    console.log("Take a look! Products are listed as ID# -- ITEM -- PRICE($):");

	// SQL Query: read list of products from products table
	connection.query("SELECT * FROM products", function(err, dbRes){
		if (err) throw err;

        //define array to hold all product related data
        //each record corresponds to each row in product DB table
		var productIds = [];

        //Display each record to the user based on the product id and store each record into productIds array
		for (var i = 0; i < dbRes.length; i++){
			var itemDisplay = dbRes[i].item_id + "-- " + dbRes[i].product_name + " -- PRICE($): " + dbRes[i].price;
			productIds.push(dbRes[i].item_id);
			console.log(itemDisplay);
			console.log("----------------------------------------------");
		}

		// Prompts user to enter product id and quantity they want to purchase
		inquirer.prompt([{
			type: "input",
			message: "Please select a Product Id : ",
			name: "productIdInput",
			validate: function(productIdValue){
				// If the entry is a product that is listed...
				if (productIds.indexOf(parseInt(productIdValue)) > -1) {
					return true;
				}
				console.log("Entered value is invalid. Please enter a valid Product Id");
				return false;
			}
		},{
			type: "input",
			message: "Please enter the quantity you want to purchase : ",
			name: "quantityInput",
			validate: function(quantity){
				// If the entry is a number and an integer
				if (isNaN(quantity) === false && Number.isInteger(Number(quantity)) === true) {
					return true;
				}
                console.log("Entered quantity is invalid. Please enter a valid quantity number");
				return false;
			}
		}]).then(function(selectionAnswers){
            
			var product = parseInt(selectionAnswers.productIdInput);
			var quantity = parseInt(selectionAnswers.quantityInput);
			var chosenItem;

			/** Check to see if the entered product id (item_id column in products DB table)
             * is available in products DB table.
             * If available the entire row of the DB table into chosenItem variable 
            */
			for (var j = 0; j < dbRes.length; j++) {
				if (product === dbRes[j].item_id) {
					chosenItem = dbRes[j];
				}
			}

			// If there aren't sufficient items in stock...
			if (quantity > chosenItem.stock_quantity) {
				console.log("Insufficient Quantity !");
			}
			else {  
                // Subtract the quantity numbers from stock_quantity field for the chosen product id 
				var new_stock_quantity = chosenItem.stock_quantity - quantity;
                // Calculate the total cost of the product purchased by the customer and store it in global variable "totalCost"  
				totalCost += (quantity * chosenItem.price);

				// Query: update stock quantity after items are purchased by the customer
				connection.query("UPDATE products SET ? WHERE ?", [{
					stock_quantity: new_stock_quantity
				},{
					item_id: chosenItem.item_id
				}], function(updateErr, updateRes){
					if (updateErr) throw updateErr;
					// Prompts user to continue shopping or end application
					startOver();
				});
			}
		});
	});
}

// Returns to Main Menu or ends application by displaying total cost of session
function startOver(){
	inquirer.prompt([{
		type: "confirm",
		name: "shopAgain",
		message: "Would you like to continue shopping?"
	}]).then(function(restartAnswer){
		if (restartAnswer.shopAgain === true) {
			customerMenu();
		}
		else {
			console.log("Thank you for shopping with Bamazon!\nYour total transaction amount is $" + totalCost); 
		}
	});
}