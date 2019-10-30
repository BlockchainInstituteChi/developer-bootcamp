// Function Declarations
module.exports = {
	helloWorld : function helloWorld (req, res) {
		return res.status(200).send("Hi!")
	},
}