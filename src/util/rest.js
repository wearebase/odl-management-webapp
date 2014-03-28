module.exports = new (require('node-rest-client').Client)({
    mimetypes:{
        json:["application/json","application/json; charset=utf-8", "application/json;charset=UTF-8"],
        xml:["application/xml","application/xml; charset=utf-8"]
    }
});