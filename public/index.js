
console.log('index.js did load')

var productList = [{
		"name" : "Model S",
		"img"  : "https://www.teslarati.com/wp-content/uploads/2019/04/tesla-model-s-1.jpg"
	},{
		"name" : "SUV",
		"img"  : "https://www.tesla.com/content/dam/tesla-site/sx-redesign/img/socialcard/MX.jpg"
	},{
		"name" : "Nikolai",
		"img"  : "https://cdn.britannica.com/49/4649-050-BB5F0463/Nikola-Tesla.jpg"
	}];


document.getElementById('productList').addEventListener('load', loadProducts())

function loadProducts () {

	var productContainer = document.getElementById('productList')

	for ( var product  in productList ) {
		displayProduct(productContainer, productList[product], product)
	}

}

function displayProduct (div, product, id) {

	var newProduct           = document.createElement('div');
		newProduct.className = 'product';

	var image 	  = document.createElement('img');
		image.src = product.img;

	var title           = document.createElement('h1');
		title.innerText = product.name;

	newProduct.appendChild(image);
	newProduct.appendChild(title);

	newProduct.addEventListener('click', function () { return selectProduct(id) })

	div.appendChild(newProduct);

}

function selectProduct ( id ) {
	console.log('product selected', id)
}