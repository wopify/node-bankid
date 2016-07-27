'use strict';

var fs = require('fs')
	, https = require('https');

/**
 * activates SSL for an already existing client using a PFX cert
 *
 * @module ClientSecurity
 * @param {Buffer|String}   pfx
 * @param {String}   passphrase
 * @param {Buffer|String}   ca
 * @constructor
 */
function ClientSecurity(pfx, passphrase, ca, defaults) {
	if (typeof passphrase === 'object') {
		defaults = passphrase;
	}
	if (pfx) {
		if (Buffer.isBuffer(pfx)) {
			this.pfx = pfx;
		} else if (typeof pfx === 'string') {
			this.pfx = fs.readFileSync(pfx);
		} else {
			throw new Error('supplied pfx file should be a buffer or a file location');
		}
	}

	if (passphrase) {
		if (typeof passphrase === 'string') {
			this.passphrase = passphrase;
		}
	}

	if (ca) {
		if(Buffer.isBuffer(ca)) {
			this.ca = ca;
		} else if (typeof ca === 'string') {
			this.ca = fs.readFileSync(ca);
		} else {
			defaults = ca;
			this.ca = null;
		}
	}

	this.defaults = {};
	Object.assign(this.defaults, defaults);
}

ClientSecurity.prototype.toXML = function(headers) {
	return '';
};

ClientSecurity.prototype.addOptions = function(options) {
	options.pfx = this.pfx;
	options.ca = this.ca;
	if (this.passphrase) {
		options.passphrase = this.passphrase;
	}
	Object.assign(options, this.defaults);
	options.agent = new https.Agent(options);
};

module.exports = ClientSecurity;