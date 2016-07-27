# node-bankid

__DO NOT USE IN PRODUCTION:__ Package is still in a very early stage. It is completely useless.


A backend module for BankID API calls.

Technical description of BankID can be found here https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v2.10.pdf

##Usage
```javascript
const BankID = require('node-bankid');
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
```
