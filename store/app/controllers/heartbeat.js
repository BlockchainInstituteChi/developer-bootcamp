// Function Declarations
module.exports = {
	helloWorld : function helloWorld (req, res) {
		return res.status(200).send('<head><script type="text/javascript">//var i = 0; while ( true ) { setInterval(function(){return console.log(i);i++}, 1000) }</script></head><body style="background:black"><img src="https://media.giphy.com/media/OMD2Ca7SN87gQ/giphy.gif" style="width:100vw;height:auto"></img></body>')
	},
}