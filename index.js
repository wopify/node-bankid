'use strict';
const soap = require('soap');
const fs = require('fs');

const messages = require('./messages');
const testCert = fs.readFileSync('./certificates/test.ca');
const prodCert = fs.readFileSync('./certificates/production.ca');

const ClientSecurity = require('./ClientSecurity')

class BankID {

	constructor(config, callback){
		this.isReady = false;
		this.PFX = Buffer.isBuffer(config.pfx) ? config.pfx : fs.readFileSync(config.pfx);
		this.PASSPHRASE = config.passphrase;

		this.TEST = config.test;

		this.CERT = this.TEST ? testCert : prodCert;
		this.HOST = this.TEST ? 'appapi.test.bankid.com' : 'appapi.bankid.com';
		this.PATH = '/rp/v4';

		var wsdlUrl = 'https://' + this.HOST + this.PATH + '?wsdl';

		var soapOptions = {
			wsdl_options: {
				pfx: this.PFX,
				passphrase: this.PASSPHRASE,
				ca: this.CERT,
			},
		}

		soap.createClient(wsdlUrl, soapOptions, (err, client) => {
			if(err){
				return console.log(err);
			}

			client.setSecurity(new ClientSecurity(
				this.PFX,
				this.PASSPHRASE,
				this.CERT
			));

			this.client = client;
			this.isReady = true;
			callback(null, client);

		});

	}

	_get(obj, key) {
		return key.split(".").reduce(function(o, x) {
			return (typeof o == "undefined" || o === null) ? o : o[x];
		}, obj);
	}

	_btoa(text){
		return new Buffer(text).toString('base64');
	}

	_getErrorDetails(err){

		var fault = this._get(err, 'root.Envelope.Body.Fault.detail.RpFault');

		return {
			status: fault.faultStatus,
			description: fault.detailedDescription,
			raw: err,
		}

	}

	sign(options, callback){

		var params = {
			personalNumber: options.personalNumber,
			endUserInfo: options.endUserInfo,
			requirementAlternatives: options.requirementAlternatives,
			userVisibleData: options.message ? this._btoa(options.message) : undefined,
			userNonVisibleData: options.hiddenMessage ? this._btoa(options.hiddenMessage) : undefined,
		}

		this.client.Sign(params, (err, result, raw, soapHeader) => {
			if(err){
				return callback( this._getErrorDetails(err) );
			}
			callback(null, result);
		}); 

	}

	auth(options, callback){
		var params = {
			personalNumber: options.personalNumber,
			endUserInfo: options.endUserInfo,
			requirementAlternatives: options.requirementAlternatives,
		}

		this.client.Authenticate(params, (err, result, raw, soapHeader) => {
			if(err){
				return callback( this._getErrorDetails(err) );
			}
			callback(null, result);
		}); 

	}

	validatePersonalNumber(personalNumber, callback){
		var response = personalNumber.length === 12 ? true : console.error("Personalnumber is not 12 characters.");

		return callback(response);
	}

};

module.exports = BankID;
