var parseString = require('xml2js').parseString;
const fs = require('fs');
const soapRequest = require('easy-soap-request');

var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result);
    fs.writeFile('response.json', JSON.stringify(result), function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('updated!');
      }
    });
});

// // example data
// const url = 'http://localhost/WcfService1/WebService1.asmx?WSDL';
// const sampleHeaders = {
//   'user-agent': 'terraquo_test',
//   'Content-Type': 'text/xml;charset=UTF-8',
//   'soapAction': 'http://localhost/WcfService1/HelloWorld',
// };
 
// // usage of module
// (async () => {
//   const { response } = await soapRequest({ url: url, headers: sampleHeaders,  timeout: 10000 }); // Optional timeout parameter(milliseconds)
//   const { headers, body, statusCode } = response;
//   console.log(headers);
//   console.log(body);
//   console.log(statusCode);
// })();