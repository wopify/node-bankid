'use strict';
const https = require('https');
const xml2js = require('xml2js').parseString;

const messages = require('./messages');

class BankID {

	constructor(config){
		this.pfx = config.pfx;
		this.passphrase = config.passphrase;

	}

	sign(argObj, callback){
		var personalNumber = argObj.personalNumber || "";
		var endUserInfo    = argObj.endUserInfo || "";
		var requirementAlternatives = argObj.requirementAlternatives || "";
		var userVisibleData = argObj.userVisibleData || "";
		var userNonVisibleData = argObj.userNonVisibleData || "";

		var options = {
			host: 'appapi.test.bankid.com',
			path: '/rp/v4?' +
				'personalNumber=' + personalNumber +
				'&endUserInfo=' + endUserInfo +
				'&requirementAlternatives=' + requirementAlternatives +
				'&userVisibleData=' + userVisibleData +
				'&userNonVisibleData=' + userNonVisibleData,//query string
			method: 'GET',
			rejectUnauthorized: false,
			passphrase: this.passphrase,
			pfx: this.pfx,
		};

		options.agent = new https.Agent(options);
		// console.log(options);
		// console.log('Agent: ', options.agent);

		//API call returns orderResponse of type OrderResponseType or error
		https.get(options , (res) => {
			
			res.on('data', (data) => {
				console.log(data.toString());

				xml2js(data.toString(), (err, result) => {
					return callback(err, result);
				});

			});

		}).on('error', (e)=>{
			console.error("API call error: ", e);
		});

	}

	auth(argObj, callback){
		var personalNumber = argObj.personalNumber || "";
		var endUserInfo = argObj.endUserInfo || "";
		var requirementAlternatives = argObj.requirementAlternatives || "";
	}

	validatePersonalNumber(personalNumber, callback){
		var response = personalNumber.length === 12 ? true : console.error("Personalnumber is not 12 characters.");

		return callback(response);
	}

};

module.exports = BankID;
