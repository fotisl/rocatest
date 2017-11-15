# Javascript ROCA test

This module enables you to check RSA public keys for the ROCA vulnerability. For more information on the vulnerability, please check https://crocs.fi.muni.cz/public/papers/rsa_ccs17.

# Technical details

The test is based on the original moduli test.

It can detect vulnerable keys in X509 certificates and RSA public keys loaded using the PKI.js library.

# Sample usage

	var rocatest = require("rocatest");
	var cert = loadCert("mycert.pem");
	if(rocatest.testCert(cert))
		console.log("Found vulnerable public key in certificate.");
	else
		console.log("Certificate public key not vulnerable to ROCA vulnerability.");