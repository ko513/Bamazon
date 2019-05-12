

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1111",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      console.log("\nProduct Number: " + res[i].id);
      console.log("Description: " + res[i].name);
      console.log("Price: $" + res[i].price + "  |  Quantity in stock: " + res[i].stock);
    }
    purchaseItem();
  });
});


function purchaseItem() {
  inquirer.prompt([
  { prefix: '',
    type: "input",
    name: "itemNumber",
    message: "\nWhich product would you like to purchase? (Enter Item Number):" },
  { prefix: '',
    type: "input",
    name: "quantity",
    message: "How many would you like to purchase?" }
  ])

  .then(function(purchase) {
    var
      itemSelected = purchase.itemNumber,
      quantityRequested = purchase.quantity,
      querySelect = 'SELECT * FROM products WHERE ?';

    connection.query(querySelect, {id: itemSelected}, function(err, res) {
      if (err) throw err;

      var productOrdered = res[0];

      if (productOrdered.stock == 0) {
        console.log("\nSorry, that item is currently out of stock.\n")
        connection.end();
        return;
      }

      if (quantityRequested <= productOrdered.stock) {
        console.log("\n'" + productOrdered.name + "' is in stock");

        //  Query to update inventory in database after successful purchase
        var queryUpdateInventory = "UPDATE products SET stock = " + (productOrdered.stock - quantityRequested) + " WHERE id = " + itemSelected;
        connection.query(queryUpdateInventory, function(err, data) {
          if (err) throw err;
          console.log("Your order has been placed. Your total price is $" + (productOrdered.price * quantityRequested) + "\n");
        })
      } else {
          var verb = (productOrdered.stock > 1) ? "are" : "is";
          console.log("\nSorry, there " + verb + " only " + productOrdered.stock + " of the product '" + productOrdered.name + "' in stock.")
          console.log("Please request a smaller quantity, or select another item.\n")
      }
      connection.end();

    })  //  connection.query
  })  //  .then
}  //  purchase
