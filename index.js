const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const fs = require('fs');
 
var obj = { 
    // 'foo:Foo': {
    //     $: {
    //       'xmlns:foo': 'http://foo.com'
    //     },
    //     'bar:Bar': {
    //       $: {
    //         'xmlns:bar': 'http://bar.com'
    //       }
    //     }
    //   },
    Expediciones : [
         {
           // Esta es la expedición de Recogida
            Expedicion : {
                ClienteRemitente                : '00800025-01',
                // MailRemitente                   : 'aneudyabreucolon@gmail.com',
                // EnviarMail                      : 'S',
                NombreDestinatario              : 'Jose López',
                PersonaContactoDestinatario     : 'Jose López',
                DireccionDestinatario           : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                PoblacionDestinatario           : 'BARCELONA',
                CodigoPostalDestinatario        : '08001',
                TelefonoContactoDestinatario    : '5219999999999',
                ReferenciaCliente               : 'TERRAQUO',
                // Fecha                           : '26/11/2019',
                Bultos                          : '1',
                Kilos                           : '1',
                ImporteReembolso                : '0',
                ProductoServicio                : '80',
                Observaciones1                  : '',
                Observaciones2                  : '',
                MailDestinatario                : 'aneudy91@gmail.com',
            }
        }
        ,{
            Expedicion : {
                ClienteRemitente                : '00800025-01',
                NombreRemitente                 : 'Jose López',
                // MailRemitente                   : 'aneudyabreucolon@gmail.com',
                // EnviarMail                      : 'S',
                NombreDestinatario              : 'Andrés Manuel',
                PersonaContactoDestinatario     : 'Andrés Manuel',
                DireccionDestinatario           : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                PoblacionDestinatario           : 'BARCELONA',
                CodigoPostalDestinatario        : '08001',
                TelefonoContactoDestinatario    : '5219999999999',
                ReferenciaCliente               : 'TERRAQUO',
                // Fecha                           : '26/11/2019',
                Bultos                          : '1',
                Kilos                           : '1.0',
                ImporteReembolso                : '0',
                ProductoServicio                : '10',
                Observaciones1                  : '',
                Observaciones2                  : '',
                MailDestinatario                : 'aneudy91@gmail.com',
            }
        }
    ]
};
 
var builder = new xml2js.Builder({xmldec :{encoding:"ISO-8859-1",standalone:"yes"}});
var xml = builder.buildObject(obj);

var finalXML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.geever.alerce.es/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:entrada_expediciones>
         <cliente>00800025-01</cliente>
         <formato>XML</formato>
         <fichero><![CDATA[${xml}]]>
		    </fichero>
      </web:entrada_expediciones>
   </soapenv:Body>
</soapenv:Envelope>
`
// console.log(finalXML)

parseString(finalXML, function (err, result) {
  console.dir(result);
  fs.writeFile('expediciones.json', JSON.stringify(result), function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('updated!');
    }
  });
});
// fs.writeFile('expediciones2.xml', finalXML, function(err, data) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log('updated!');
//     }
//   });

const soapRequest = require('easy-soap-request');
const username = 'ANEUDY', passw ='foodsterraquo'
// example data
const url = 'https://geeverpre.alertran.net/geeverpre/ws_clientes?wsdl';
const sampleHeaders = {
  'user-agent': 'terraquo_test',
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64'),
  // 'soapAction': 'set_incidencia',
};
 
// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: finalXML, timeout: 10000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  // console.log(headers);
  console.log('body');
  console.log(body);
  console.log('statusCode');
  console.log(statusCode);

  parseString(body, function (err, result) {
    console.log(result);

    let str = result['S:Envelope']['S:Body'][0]['ns2:entrada_expedicionesResponse'][0].return[0]
    let str2 = str.split(',')
    
    let idExpedicion1 = str2[0].split(' ')[1]
    let idExpedicion2 = str.split(',')[1]
    let respuesta = str2[0].split(' ')[0]
    console.log(idExpedicion1)
    console.log(idExpedicion2)
    console.log(respuesta)
    fs.writeFile('response.json', JSON.stringify(result), function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('updated!');
      }
    });
  });
  // fs.writeFile('respuesta1.xml', JSON.stringify(body), function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log('respuesta created!');
  //   }
  // });

})();