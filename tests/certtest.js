const rocatest = require("..");
const pkijs = require("pkijs");
const asn1js = require("asn1js");
const pvutils = require("pvutils");
const fs = require("fs");
const assert = require("assert");

function loadCert(fname) {
    var buf = fs.readFileSync(fname);
    var asn1 = asn1js.fromBER(pvutils.stringToArrayBuffer(pvutils.fromBase64(
        buf.toString().replace(/(-----(BEGIN|END)( NEW)? CERTIFICATE-----|\n)/g, ""))));
    return new pkijs.Certificate({schema: asn1.result});
}

describe("X509 certificate test", function() {
    it("Detect ROCA certificates", function() {
        assert.equal(rocatest.checkCert(loadCert("./tests/static/roca1.pem")), true);
        assert.equal(rocatest.checkCert(loadCert("./tests/static/roca2.pem")), true);
    });

    it("Detect valid certificates", function() {
        assert.equal(rocatest.checkCert(loadCert("./tests/static/valid1.pem")), false);
        assert.equal(rocatest.checkCert(loadCert("./tests/static/valid2.pem")), false);
    });
})

