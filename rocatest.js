const pkijs = require("pkijs");
const asn1js = require("asn1js");
const pvutils = require("pvutils");
const bigInt = require("big-integer");

var ROCATest = function () {
    var primes = new Array(3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
        47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
        127, 131, 137, 139, 149, 151, 157, 163, 167);

    var prints = new Array(
        bigInt("6"),
        bigInt("30"),
        bigInt("126"),
        bigInt("1026"),
        bigInt("5658"),
        bigInt("107286"),
        bigInt("199410"),
        bigInt("8388606"),
        bigInt("536870910"),
        bigInt("2147483646"),
        bigInt("67109890"),
        bigInt("2199023255550"),
        bigInt("8796093022206"),
        bigInt("140737488355326"),
        bigInt("5310023542746834"),
        bigInt("576460752303423486"),
        bigInt("1455791217086302986"),
        bigInt("147573952589676412926"),
        bigInt("20052041432995567486"),
        bigInt("6041388139249378920330"),
        bigInt("207530445072488465666"),
        bigInt("9671406556917033397649406"),
        bigInt("618970019642690137449562110"),
        bigInt("79228162521181866724264247298"),
        bigInt("2535301200456458802993406410750"),
        bigInt("1760368345969468176824550810518"),
        bigInt("50079290986288516948354744811034"),
        bigInt("473022961816146413042658758988474"),
        bigInt("10384593717069655257060992658440190"),
        bigInt("144390480366845522447407333004847678774"),
        bigInt("2722258935367507707706996859454145691646"),
        bigInt("174224571863520493293247799005065324265470"),
        bigInt("696898287454081973172991196020261297061886"),
        bigInt("713623846352979940529142984724747568191373310"),
        bigInt("1800793591454480341970779146165214289059119882"),
        bigInt("126304807362733370595828809000324029340048915994"),
        bigInt("11692013098647223345629478661730264157247460343806"),
        bigInt("187072209578355573530071658587684226515959365500926")
    );

    function ROCATest() {}

    ROCATest.arrayBufferToBigInt = function(buf) {
        let view = new Uint8Array(buf);
        let s = "";

        for(let i in view) {
            let m = view[i].toString(16);
            if(m.length == 1)
                s += '0';
            s += m;
        }

        return bigInt(s, 16);
    }

    ROCATest.checkModulus = function(modulus) {
        let n = this.arrayBufferToBigInt(modulus.valueBlock._valueHex);

        for(let i in primes) {
            if(bigInt.one.shiftLeft(n.mod(primes[i]).toJSNumber()).and(prints[i]).isZero())
                return false;
        }

        return true;
    }

    ROCATest.checkPublicKey = function(key) {
        if(key instanceof pkijs.RSAPublicKey)
            return this.checkModulus(key.modulus);
        else
            throw 'Not an RSA Public Key';
    }

    ROCATest.checkCert = function(cert) {
        if(cert.subjectPublicKeyInfo.parsedKey instanceof pkijs.RSAPublicKey)
            return this.checkModulus(cert.subjectPublicKeyInfo.parsedKey.modulus);
        else
            throw 'Not an RSA Certificate';
    }

    return ROCATest;
}();

if((typeof module !== "undefined") && (module.hasOwnProperty("exports"))) {
    module.exports = ROCATest;
}

if((typeof define === "function") && define.amd) {
    define("ROCATest", [], function() {
        return ROCATest;
    });
}
