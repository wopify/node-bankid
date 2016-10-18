# node-bankid

__DO NOT USE IN PRODUCTION:__ Package is still in a very early stage. Only the Sign method works as of writing.


A backend module for BankID API calls. Provides a convenient way of connecting your service to BankID via Node.

Technical description of BankID can be found here https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v2.10.pdf

##Usage
For now, see [example.js](example.js)

Install the package via npm: `npm install node-bankid`

```javascript
const BankID = require('node-bankid');

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
			return console.log(err);
		}
		//dostuff with data
		//data returned as JS object
		console.log(data);
	});

});
```
