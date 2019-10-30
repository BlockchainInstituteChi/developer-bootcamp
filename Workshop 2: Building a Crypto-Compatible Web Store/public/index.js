console.log('index.js')

function initStore () {

	// Initialize the product view and check the server
	console.log('init ran');
	loadProducts();
	checkServerHeartbeat();

	// Load the prices from the CDN and address from the server
	getAddress(scope.currencyChoice.code);
	getCurrentPrices();

	// Set Event Listeners
	document.getElementById('cancelCheckout').addEventListener('click', cancelCheckout);
	document.getElementById('currencySelector').addEventListener('change', updateCurrencySelection);
}

/* API Calls - Contains: | getAddress(currencyCode) | getCurrentPrices | checkServerHeartbeat */
	
	/* getAddress receives a currency code like BTC or ETH and queries the server for the receipt address */
	function getAddress (currencyCode) {

		var data = JSON.stringify({ currency: currencyCode })
		console.log('sending ', data)

		var xhr = new XMLHttpRequest();
		xhr.open('POST', scope.serverUrl + "/getAddress", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(data);
		xhr.onload = function () {

		    scope.address = JSON.parse(this.responseText).address;
		    console.log('getAddress (' + currencyCode + ') returned', scope.address);

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
	    xmlHttp.open( "GET", scope.serverUrl + "/helloWorld", false ); 
	    xmlHttp.send( null );
	    console.log('Server is running!')

	}

/* Utilities - Contains: | generateUri |  */
	/* generateUri prepares a transaction resource locater formatted as currency:address?amount=NUMBER?value=NUMBER  */
	function generateUri (currency, price, cryptoprice, address) {

		var amount = price / parseFloat(cryptoprice)

		var transactionuri = scope.currencyChoice.name.toLowerCase() + ":" + address + "?amount=" + amount.toFixed(8) + "?value=" + amount.toFixed(8)

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

		getAddress (scope.currencyChoice.code);
		toggleCheckoutDisplay();
		startCheckout(scope.lastId);

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

		scope.lastId = id;

		for ( price in scope.pricelist.prices ) {
			var priceItem = scope.pricelist.prices[price];
			if ( priceItem.code === scope.currencyChoice.code ) {
				var currentprice = priceItem.price
			}
		}

		if (!currentprice) {
			return alert('Unable to get ' + scope.currencyChoice.code + ' Price.'); 
		}

		var txuri = generateUri( scope.currencyChoice.name, scope.productList[id].price, currentprice, scope.address);

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
	serverUrl : "http://localhost:8887",
	currencyChoice : {
		"name" : "Bitcoin",
		"code" : "BTC"
	}
};

/* Trigger the store to load once the page has rendered */
document.getElementById('storeContainer').addEventListener('load', initStore())
