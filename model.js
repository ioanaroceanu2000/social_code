function getProductDetails() {
  productDetails = {};
  productDetails["carrots"] = {};
  productDetails["carrots"]["image"] = "carrots.gif";
  productDetails["carrots"]["name"] = "Carrots";
  productDetails["carrots"]["description"] = "not just for rabbits";
  productDetails["carrots"]["units"] = "1kg";
  productDetails["carrots"]["price"] = 0.99;

  productDetails["bananas"] = {};
  productDetails["bananas"]["image"] = "bananas.gif";
  productDetails["bananas"]["name"] = "Bananas";
  productDetails["bananas"]["description"] = "Yellow and banana-shaped";
  productDetails["bananas"]["units"] = "500g";
  productDetails["bananas"]["price"] = 1.29;

  productDetails["coconut"] = {};
  productDetails["coconut"]["image"] = "coconut.gif";
  productDetails["coconut"]["name"] = "Coconut";
  productDetails["coconut"]["description"] = "That exotic stuff";
  productDetails["coconut"]["units"] = "1nut";
  productDetails["coconut"]["price"] = 2.99;

  productDetails["apples"] = {};
  productDetails["apples"]["image"] = "apples.gif";
  productDetails["apples"]["name"] = "Apples";
  productDetails["apples"]["description"] = "Red, sweet and juicy";
  productDetails["apples"]["units"] = "1kg";
  productDetails["apples"]["price"] = 1.49;

  productDetails["cherries"] = {};
  productDetails["cherries"]["image"] = "cherries.gif";
  productDetails["cherries"]["name"] = "Cherries";
  productDetails["cherries"]["description"] = "Cherry pancake anyone?";
  productDetails["cherries"]["units"] = "500g";
  productDetails["cherries"]["price"] = 1.99;

  productDetails["tomatoes"] = {};
  productDetails["tomatoes"]["image"] = "tomatoes.gif";
  productDetails["tomatoes"]["name"] = "Tomatoes";
  productDetails["tomatoes"]["description"] = "Red and ripe";
  productDetails["tomatoes"]["units"] = "500g";
  productDetails["tomatoes"]["price"] = 1.99;

  productDetails["potatoes"] = {};
  productDetails["potatoes"]["image"] = "potatoes.gif";
  productDetails["potatoes"]["name"] = "Potatoes";
  productDetails["potatoes"]["description"] = "Boil them, bake them, mash them...";
  productDetails["potatoes"]["units"] = "1kg";
  productDetails["potatoes"]["price"] = 0.99;

  productDetails["beans"] = {};
  productDetails["beans"]["image"] = "beans.gif";
  productDetails["beans"]["name"] = "Beans";
  productDetails["beans"]["description"] = "Green and healthy";
  productDetails["beans"]["units"] = "1kg";
  productDetails["beans"]["price"] = 1.29;

  return productDetails;
}

function getProductList() {
  var products = [];
  var productDetails = getProductDetails();

  for (var key in productDetails) {
    products.push(key);
  }

  return products;
}

function getProductQuantity(product) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + product + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function readBasket() {
  var basket = {};
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    basket[products[i]] = getProductQuantity(products[i]);
  }

  return basket;
}

function calculateTotals() {
  var basket = readBasket();
  var productDetails = getProductDetails();

  total = 0;
  for (var product in basket) {
    total += parseInt(basket[product]) * parseFloat(productDetails[product]["price"]);
  }

  totals = {};
  totals["total"] = total.toFixed(2).toString();
  totals["vat"] = (total - total / 1.175).toFixed(2).toString();
  totals["totalnovat"] = (total / 1.175).toFixed(2).toString();

  return totals;
}

function addToBasket(product, quantity) {
  console.log(quantity);
  console.log(Number.isInteger(quantity));
  if(Number.isInteger(Number(quantity)) ==  false){
    alert("Not added to basket! Quantity can only be a whole number, e.g. 2 or 3 or 17");
    return;
  }

  if (document.cookie.indexOf(product) == -1) {
    createEmptyBasket();
  }

  oldquantity = parseInt(getProductQuantity(product));
  newquantity = oldquantity + parseInt(quantity);

  document.cookie = product + "=" + newquantity.toString() + ";path=/";
  var prodDetails = getProductDetails();
  alert(quantity + " of " + prodDetails[product]["name"] + ' '+prodDetails[product]["units"] + " added to basket!");
  window.location.reload();
}

function removeProductFromBasket(product) {
  document.cookie = product + "=0;path=/";
  window.location.reload();
}

function changeProductQuantity(product, newquantity) {
  document.cookie = product + "=" + newquantity.toString() + ";path=/";
  window.location.reload();
}

function createEmptyBasket() {
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    document.cookie=products[i] + "=0;path=/";
  }
  window.location.reload();
}

function createEmptyOrder() {
  document.cookie="title=;path=/";
  document.cookie="firstname=;path=/";
  document.cookie="surname=;path=/";
  document.cookie="number=;path=/";
  document.cookie="street=;path=/";
  document.cookie="postcode=;path=/";
  document.cookie="city=;path=/";
  document.cookie="country=;path=/";
  document.cookie="cardtype=;path=/";
  document.cookie="cardnumber=;path=/";
  document.cookie="month=;path=/";
  document.cookie="year=;path=/";
}

function setName() {
  console.log(document.getElementById('title').value)
  document.cookie="title=" + document.getElementById('title').value + ";path=/";
  document.cookie="firstname=" + document.getElementById('firstname').value + ";path=/";
  document.cookie="surname=" + document.getElementById('surname').value + ";path=/";
}

function getName() {
  var name = {};
  name["title"] = getCookieVariableValue('title');
  name["firstname"] = getCookieVariableValue('firstname');
  name["surname"] = getCookieVariableValue('surname');

  return name;
}

function setAddress() {
  document.cookie="number=" + document.getElementById('number').value + ";path=/";
  document.cookie="street=" + document.getElementById('street').value + ";path=/";
  document.cookie="postcode=" + document.getElementById('postcode').value + ";path=/";
  document.cookie="city=" + document.getElementById('city').value + ";path=/";
  document.cookie="country=" + document.getElementById('country').value + ";path=/";
}

function getAddress() {
  var address = {};
  address["number"] = getCookieVariableValue('number');
  address["street"] = getCookieVariableValue('street');
  address["postcode"] = getCookieVariableValue('postcode');
  address["city"] = getCookieVariableValue('city');
  address["country"] = getCookieVariableValue('country');

  return address;
}

function setCardDetails() {
  console.log(document.getElementById('cardnumber').value);
  document.cookie="cardtype="+document.getElementById('selectCard').value+";path=/";
  document.cookie="cardnumber=" + document.getElementById('cardnumber').value + ";path=/";
  document.cookie="month=" + document.getElementById('month').value + ";path=/";
  document.cookie="year=" + document.getElementById('year').value + ";path=/";
}

function checkDetail(detail){
  if(document.getElementById(detail).value == ""){
    alert("Please add "+detail+"!");
    return false;
  }
  return true;
}

function setDetails(){
  if(!checkDetail("title") || !checkDetail("firstname") || !checkDetail("surname")){
    return;
  }
  setName();
  var truth = true;
  if(!checkDetail("number") || !checkDetail("street") || !checkDetail("country") || !checkDetail("postcode") || !checkDetail("city")){
    return;
  }

  setAddress();
  if(!checkDetail("selectCard") || !checkDetail("cardnumber") || !checkDetail("month") || !checkDetail("year") ){
    return;
  }
  setCardDetails();
  var totals = calculateTotals();
  if(totals["total"] == "0.00"){
    alert("Nothing to order, basket is empty!");
    return;
  }
  alert("Your order has been place. It will arrive in 3 days at the given address. See invoice.");
  window.open('invoice.html');
}

function getCardDetails() {
  var cardDetails = {};
  cardDetails["cardtype"] = getCookieVariableValue('cardtype');
  cardDetails["cardnumber"] = getCookieVariableValue('cardnumber');
  cardDetails["month"] = getCookieVariableValue('month');
  cardDetails["year"] = getCookieVariableValue('year');

  return cardDetails;
}

function getCookieVariableValue(variable) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + variable + "=");
  if (parts.length == 2) return parts.pop().split(";").shift()
}
