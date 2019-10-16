
console.log('index.js did load')

var productList = [{
		"name" : "Model S",
		"img"  : "https://www.teslarati.com/wp-content/uploads/2019/04/tesla-model-s-1.jpg",
		"price" : 19999.99
	},{
		"name" : "SUV",
		"img"  : "https://www.tesla.com/content/dam/tesla-site/sx-redesign/img/socialcard/MX.jpg",
		"price" : 89999.99
	},{
		"name" : "Nikolai",
		"img"  : "https://cdn.britannica.com/49/4649-050-BB5F0463/Nikola-Tesla.jpg",
		"price" : 19999999.99
	}];


var pricelist;

document.getElementById('storeContainer').addEventListener('load', initStore())

function initStore () {
	console.log('init ran');
	getCurrentPrices();
	loadProducts();
	document.getElementById('cancelCheckout').addEventListener('click', cancelCheckout);

}

function loadProducts () {

	var productContainer = document.getElementById('productList');

	for ( var product  in productList ) {
		displayProduct(productContainer, productList[product], product);
	}

}

function displayProduct (div, product, id) {

	var newProduct           = document.createElement('div');
		newProduct.className = 'product';

	var image 	  = document.createElement('img');
		image.src = product.img;

	var title           = document.createElement('h1');
		title.innerText = product.name;

	var price           = document.createElement('span');
		price.className = "price";
		price.innerText = product.price;

	newProduct.appendChild(image);
	newProduct.appendChild(title);
	newProduct.appendChild(price);

	newProduct.addEventListener('click', function () { return startCheckout(id) })

	div.appendChild(newProduct);
	
}

function startCheckout ( id ) {

	for ( price in pricelist.prices ) {
		var priceItem = pricelist.prices[price];
		if ( priceItem.code === "BTC" ) {
			var btcprice = priceItem.price
		}
	}

	if (!btcprice) {
		return alert('Unable to get BTC Price.'); 
	}

	var address = "sssssssss";

	var txuri = generateUri( 'bitcoin', productList[id].price, btcprice, address);

	initCanvas(txuri);

	toggleCheckoutDisplay();

}

function toggleCheckoutDisplay () {

	var productListClass = document.getElementById('productList').className;

	if ( typeof(productListClass.split('hidden')[1]) != "undefined" ) {

		document.getElementById('checkoutLayer').className = document.getElementById('checkoutLayer').className + " hidden";
		document.getElementById('productList').className = productListClass.split('hidden').concat(' ')

	} else {
		
		document.getElementById('productList').className = productListClass + " hidden";
		document.getElementById('checkoutLayer').className = document.getElementById('checkoutLayer').className.split('hidden').concat(' ')
	
	}

}

function generateUri (currency, price, cryptoprice, address) {

	var amount = price / parseFloat(cryptoprice)

	var transactionuri = "bitcoin:" + address + "?amount=" + amount.toFixed(8) + "?value=" + amount.toFixed(8)

	return transactionuri;

}

function initCanvas (address) {

	var canvas = document.getElementById('qrCode')

	QRCode.toCanvas(canvas, address, function (error) {
	  if (error) return console.error(error)

	})

}

function cancelCheckout () {
	console.log('cancelling')
	toggleCheckoutDisplay();

}

function getCurrentPrices () {

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://s3.us-east-2.amazonaws.com/bci-static/misc/ticket.json", false ); 
    xmlHttp.send( null );
    pricelist = JSON.parse(xmlHttp.responseText);

    console.log('done!')

}