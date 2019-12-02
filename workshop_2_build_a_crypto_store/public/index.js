console.log('index.js')

function initStore () {

	// Initialize the product view and check the server
	console.log('init ran');
	checkServerHeartbeat();

	// Load the prices from the CDN and address from the server
	getAddress(scope.currencyChoice.code);
	getProductList();
	getCurrentPrices();

	// Set Event Listeners
	document.getElementById('cancelCheckout').addEventListener('click', cancelCheckout);
	document.getElementById('currencySelector').addEventListener('change', updateCurrencySelection);
}

/* API Calls - Contains: | getAddress(currencyCode) | getCurrentPrices | checkServerHeartbeat */
		
	/* getAddress receives a currency code like BTC or ETH and queries the server for the receipt address */
	function getAddress (currencyName, cryptoprice) {

		var data = JSON.stringify({ currency: currencyName, price: cryptoprice })
		console.log('sending ', data)

		var xhr = new XMLHttpRequest();
		xhr.open('POST', scope.serverUrl + "/getAddress", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(data);
		xhr.onload = function () {

		    scope.address = JSON.parse(this.responseText).address;
		    console.log('getAddress (' + currencyName + ') returned', scope.address);
			var txuri = generateUri( scope.currencyChoice.name, scope.productList[scope.lastId].price, scope.currentprice, scope.address);
			initCanvas(txuri);
		};

	}

	/* getProductList retrieves the most recent product list from the app server */
	function getProductList () {

		console.log('fetching product list')

		// var data = { }; // This is empty for now, but you will need it for later workshops

		var xhr = new XMLHttpRequest();
		xhr.open('POST', scope.serverUrl + "/getProductList", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(null); // replace null with a payload if necessary
		xhr.onload = function () {
			console.log(this.responseText);
		    scope.productList = JSON.parse(this.responseText);
		    console.log('getProductList returned', scope.productList);

			loadProducts(); // finally, we load the products into the store
		};

	}	

	/* getCurrentPrices polls the Blockchain Institute price ticket and sets scope.pricesList*/ 
	function getCurrentPrices () {

		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", "https://s3.us-east-2.amazonaws.com/bci-static/misc/ticket.json", false ); 
	    xmlHttp.send( null );
	    scope.pricelist = JSON.parse(xmlHttp.responseText);

	    console.log('fetched pricelist: ', scope.pricelist);

	}

	/* Used for troubleshooting server communication. */
	function checkServerHeartbeat () {

		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", scope.serverUrl + "/", false ); 
	    xmlHttp.send( null );
	    console.log('Server is running!')

}

/* Utilities - Contains: | generateUri |  */
	/* generateUri prepares a transaction resource locater formatted as currency:address?amount=NUMBER?value=NUMBER  */
	function generateUri (currencyname, cryptoprice, address) {

		 var transactionuri = "";

		// The URI will need to be generated differently for Lightning
		switch(currencyname) {
		  case "Ethereum", "Bitcoin":
		    var transactionuri = scope.currencyChoice.name.toLowerCase() + ":" + address + "?amount=" + cryptoprice.toFixed(8) + "?value=" + cryptoprice.toFixed(8);
		    break;
		  case "Lightning":
		  // Custom code for invoice QR code construction.
		  	var transactionuri = address;
		    break;
		  default:
		    var transactionuri = scope.currencyChoice.name.toLowerCase() + ":" + address + "?amount=" + cryptoprice.toFixed(8) + "?value=" + cryptoprice.toFixed(8);
		} 

		return transactionuri;

	}

/* UX Control - Contains: | loadProducts | updateCurrencySelection | displayProduct | startCheckout | toggleCheckoutDisplay | initCanvas | cancelCheckout | |*/

	function loadProducts () {

		var productContainer = document.getElementById('productList');

		for ( var product  in scope.productList ) {
			displayProduct(productContainer, scope.productList[product], product);
		}

	}

	function updateCurrencySelection () {

		var currencySelection = document.getElementById('currencySelector');
		scope.currencyChoice    = {
			name : currencySelection.options[currencySelection.selectedIndex].text,
			code : currencySelection.options[currencySelection.selectedIndex].value
		}

		var cryptoprice = calcCryptoPrice(scope.lastId);

		getAddress (scope.currencyChoice.name, cryptoprice);

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

	/* Finds the current exchange rate and calculated the current crypto price for the item. */
	function calcCryptoPrice( id ){

		console.log("calcCryptoPrice id: ");
		console.log(id);

		scope.lastId = id;

		for ( price in scope.pricelist.prices ) {
			var priceItem = scope.pricelist.prices[price];
			if ( priceItem.code === scope.currencyChoice.code ) {
				var exchangerate = priceItem.price
			}
		}

		if (!exchangerate) {
			return alert('Unable to get ' + scope.currencyChoice.code + ' Price.'); 
		}

		var cryptoPrice = price / parseFloat(exchangerate)
		scope.currentprice = cryptoPrice;

		return cryptoPrice;
	}

	function startCheckout ( id, cryptoprice ) {

		scope.lastId = id;

		// startCheckout function runs on refresh. If cryptoprice is not passed it, calculate it! 
		cryptoprice = cryptoprice === undefined ? calcCryptoPrice(id) : cryptoprice;

		var txuri = generateUri( scope.currencyChoice.name, cryptoprice, scope.address);

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
		console.log('Cancelling checkout and clearing address.')
		toggleCheckoutDisplay();

	}

/* Scope Initialization Values */
var scope = {
	serverUrl : "http://localhost:8887",
	currencyChoice : {
		"name" : "Bitcoin",
		"code" : "BTC"
	},
	lastId : 0,
	currentprice : 1,
	productList : [{price : 1}]
};


/* Trigger the store to load once the page has rendered */
document.getElementById('storeContainer').addEventListener('load', initStore())
