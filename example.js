const BankID = require('./index'); //Change to node-bankid if installed through npm

var config = {
	passphrase: 'qwerty123',
	pfx: 'FPTestcert2_20150818_102329.pfx',
	test: true,
};


var bankid = new BankID(config, () => {

	var options = {
		personalNumber: '195709205727',
		message: 'Underskrift av anställningsavtal #123.'
	}

	//Sign
	bankid.sign(options, (err, data) => {
		if(err){
			return console.log(err.raw);
		}
		//dostuff with data
		//data returned as JS object
		console.log(data);
	});

});

