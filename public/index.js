
console.log('index.js did load')

var scope = {
	productList : [{
		"name" : "Model S",
		"img"  : "https://www.teslarati.com/wp-content/uploads/2019/04/tesla-model-s-1.jpg",
		"price" : 19999.99
	},{
		"name" : "SUV",
		"img"  : "https://www.tesla.com/content/dam/tesla-site/sx-redesign/img/socialcard/MX.jpg",
		"price" : 89999.99
	},{
		"name" : "Nikola",
		"img"  : "https://cdn.britannica.com/49/4649-050-BB5F0463/Nikola-Tesla.jpg",
		"price" : 19999999.99
	}], 
	serverUrl : "http://localhost:8887"
};

document.getElementById('storeContainer').addEventListener('load', initStore())

function getAddress (currencyCode) {

	var data = { currency: currencyCode }

	var xhr = new XMLHttpRequest();
	xhr.open('POST', scope.serverUrl + "/getAddress", true);
	xhr.onload = function () {

	    scope.address = JSON.parse(this.responseText).address;
	    console.log('getAddress (' + currencyCode + ') returned', scope.address);

	};
	xhr.send(data);
	
}

function initStore () {
	console.log('init ran');
	loadProducts();
	document.getElementById('cancelCheckout').addEventListener('click', cancelCheckout);
	checkServerHeartbeat();
	getAddress('BTC');
	getCurrentPrices();
}

function loadProducts () {

	var productContainer = document.getElementById('productList');

	for ( var product  in scope.productList ) {
		displayProduct(productContainer, scope.productList[product], product);
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

	newProduct.appendChild( image );
	newProduct.appendChild( title );
	newProduct.appendChild( price );

	newProduct.addEventListener('click', function () { return startCheckout(id) })

	div.appendChild(newProduct);

}

function startCheckout ( id ) {

	for ( price in scope.pricelist.prices ) {
		var priceItem = scope.pricelist.prices[price];
		if ( priceItem.code === "BTC" ) {
			var btcprice = priceItem.price
		}
	}

	if (!btcprice) {
		return alert('Unable to get BTC Price.'); 
	}

	var txuri = generateUri( 'bitcoin', scope.productList[id].price, btcprice, scope.address);

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

	if ( document.getElementsByClassName('addressContainer').length > 0 ) {

		for ( var x = 0; x < document.getElementsByClassName('addressContainer').length; x++ ) {
			document.getElementsByClassName('addressContainer')[x].remove()
		}

	}

	var addressContainer 		   = document.createElement('div');
		addressContainer.className = 'addressContainer';

	var addressInput			   = document.createElement('input');
		addressInput.type 		   = 'text';
		addressInput.disabled	   = true;
		addressInput.value		   = address;

	addressContainer.appendChild(addressInput);

	canvas.parentElement.appendChild(addressContainer);
}

function cancelCheckout () {
	console.log('cancelling')
	toggleCheckoutDisplay();

}

function getCurrentPrices () {

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://s3.us-east-2.amazonaws.com/bci-static/misc/ticket.json", false ); 
    xmlHttp.send( null );
    scope.pricelist = JSON.parse(xmlHttp.responseText);

    console.log('fetched pricelist: ', scope.pricelist);

}

function checkServerHeartbeat () {

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", scope.serverUrl + "/helloWorld", false ); 
    xmlHttp.send( null );
    console.log('Server is running!')

}