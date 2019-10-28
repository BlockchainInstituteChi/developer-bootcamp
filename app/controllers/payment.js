// Function Declarations
module.exports = {
	getAddress : function getAddress (req, res) {

		var address = { address: "1234567890abcdefghijklmnopqrstuvwxyz" };
		return res.status(200).send(address)

	},

}