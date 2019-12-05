// Dependancy Declarations


// Function Declarations
module.exports = {
	getProductList : function getProductList (req, res) {

		// The body of the POST request can be accessed using req.body.< variable name >
		// See getAddress() in index.js in the public/ folder for the syntax of a POST request.

		var productList = [{
			"name" : "Model S",
			"img"  : "https://www.teslarati.com/wp-content/uploads/2019/04/tesla-model-s-1.jpg",
			"price" : 19999.99
		},{
			"name" : "SUV",
			"img"  : "https://motorillustrated.com/wp-content/uploads/2018/12/Tesla-Model-X-696x324.jpg",
			"price" : 89999.99
		},{
			"name" : "Nikola",
			"img"  : "https://cdn.britannica.com/49/4649-050-BB5F0463/Nikola-Tesla.jpg",
			"price" : 19999999.99
		},{
			"name" : "Bumper Sticker",
			"img"  : "https://i.etsystatic.com/19384612/r/il/71cf14/2136773487/il_794xN.2136773487_4uvv.jpg",
			"price" : 10.00
		}]
	
		return res.status(200).send(productList)

	}
}