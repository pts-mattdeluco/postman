let url = require('url'),
    crypto = require('crypto-js');

var substituteEnvVars = function (varStr) {
    var match;
    
    while ((match = /\{\{([^{}]*?)}}/g.exec(varStr)) !== null ) {
        if (!Object.has(environment, match[1])) {
            continue;
        }
        var envVar = new RegExp(RegExp.escape(match[0]), 'g');
        varStr = varStr.replace(envVar, environment[match[1]]);
    }
    
    return varStr;
};

var BigMac = function () {
    
    var generateNonce = function () {
        var wordArray = crypto.lib.WordArray.random(8);
        return crypto.enc.Base64.stringify(wordArray);
    };
    
    var generateExt = function (contentType, payload) {
        var extension = '';
        if (contentType && payload) {
            var hasher = crypto.algo.SHA1.create();
            
            hasher.update(contentType);
            hasher.update(payload);
            
            extension = hasher.finalize().toString();
        }
        return extension;
    };
    
    var generateSignature = function (sharedSecret, normalizedRequestString) {
        var translatedSecret = sharedSecret.replace(/-/g, '+').replace(/_/g, '/'),
            decodedSecret = crypto.enc.Base64.parse(translatedSecret),
            hmac = crypto.HmacSHA1(normalizedRequestString, decodedSecret);
        return crypto.enc.Base64.stringify(hmac);
    };
    
    var generateAuthHeader = function(keyId, sharedSecret, request) {
        var ts = Math.floor((new Date()).getTime() / 1000),
            reqUrl = url.parse(substituteEnvVars(request.url)),
            nonce = generateNonce(),
            extension = generateExt(request.headers['Content-Type'], substituteEnvVars(request.data));
  
        var normalizedRequestString = [
            ts,
            nonce,
            request.method,
            reqUrl.pathname,
            reqUrl.hostname,
            reqUrl.port || reqUrl.protocol == 'https:' ? '443' : '80',
            extension
            ].join('\n') + '\n';

        var mac = generateSignature(sharedSecret, normalizedRequestString);

        return 'MAC id="' + keyId +
            '", ts="' + ts +
            '", nonce="' + nonce +
            '", ext="' + extension +
            '", mac="' + mac + '"';
    };
    
    return {
        generateAuthHeader: generateAuthHeader
    };
}();

pm.environment.set('AUTH_HEADER', BigMac.generateAuthHeader(
    environment.macKeyId, environment.macKey, request));
