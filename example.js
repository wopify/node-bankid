const BankID = require('./index'); //Change to node-bankid if installed through npm
const fs = require('fs');

var config = {
	passphrase: 'qwerty123',
	pfx: fs.readFileSync('FPTestcert2_20150818_102329.pfx'),
};

var bankid = new BankID(config);

var options = {
	personalNumber: 'YYYYMMDDXXXX',
}

//Sign
bankid.sign(options, (err, data) => {
	if(err){
		return console.log(err);
	}
	//dostuff with data
	//data returned as JS object
	console.log(data);
});
