// Function Declarations
module.exports = {
	getAddress : function getAddress (req, res) {

		// The body of the POST request can be accessed using req.body.< variable name >
		// See getAddress() in index.js in the public/ folder for the syntax of a POST request.

		if ( req.body.currency === "ETH" ) {
			var address = { address: "1234567890abcdefghijklmnopqrstuvwxyz" };
		} else if ( req.body.currency === "BTC" ) {
			var address = { address: "1234567890abcdefghijklmnopqrstuvwxyz" };
		} else {
			var address = { address: "1234567890abcdefghijklmnopqrstuvwxyz" };
		}
	
		return res.status(200).send(address)

	},

}