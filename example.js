const bankid = require('./index'); //Change to node-bankid if installed through npm
const fs = require('fs');

var options = {
	personalNumber: 'YYYYMMDDXXXX',
	passphrase: 'qwerty123',
	pfx: fs.readFileSync('FPTestcert2_20150818_102329.pfx'),
};

//Sign
bankid.sign(options, (data) => {
	//dostuff with data
	//data returned as JS object
	console.log(data);
});
