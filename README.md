# node-bankid
A backend module for BankID API calls.

Technical description of BankID can be found here https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v2.10.pdf

##Usage
```javascript
const bankid = require('node-bankid');

var options = {
personalNumber: XXXXXXXXXXXX
};

//Sign
bankid.sign(options, (data)=>{
//dostuff with data
//data returned as JS object
});
```
