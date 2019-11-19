var xml2js = require('xml2js');
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
            Expedicion : {
                ClienteRemitente                : 'Terraquo_test',
                MailRemitente                   : 'aneudyabreucolon@gmail.com',
                EnviarMail                      : 'S',
                NombreDestinatario              : 'Jose López',
                PersonaContactoDestinatario     : 'Jose López',
                DireccionDestinatario           : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                PoblacionDestinatario           : 'Lorem ipsum',
                CodigoPostalDestinatario        : '99999',
                TelefonoContactoDestinatario    : '+5219999999999',
                ReferenciaCliente               : 'TERRAQUO',
                Bultos                          : '1',
                Kilos                           : '1',
                ImporteReembolso                : '0',
                ProductoServicio                : 'Pizzas',
                Observaciones1                  : 'Ninguna',
                Observaciones2                  : 'Ninguna',
                MailDestinatario                : 'aneudy91@gmail.com',
            }
        }
        ,{
            Expedicion : {
                ClienteRemitente                : 'Terraquo_test',
                MailRemitente                   : 'aneudyabreucolon@gmail.com',
                EnviarMail                      : 'S',
                NombreDestinatario              : 'Andrés Manuel',
                PersonaContactoDestinatario     : 'Andrés Manuel',
                DireccionDestinatario           : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                PoblacionDestinatario           : 'Lorem ipsum',
                CodigoPostalDestinatario        : '99999',
                TelefonoContactoDestinatario    : '+5219999999999',
                ReferenciaCliente               : 'TERRAQUO',
                Bultos                          : '1',
                Kilos                           : '1',
                ImporteReembolso                : '0',
                ProductoServicio                : 'Pizzas',
                Observaciones1                  : 'Ninguna',
                Observaciones2                  : 'Ninguna',
                MailDestinatario                : 'aneudy91@gmail.com',
            }
        }
    ]
};
 
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);

var finalXML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.geever.alerce.es/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:entrada_expediciones>
         <cliente>CODIGO_CLIENTE</cliente>
         <formato>XML</formato>
         <fichero><![CDATA[${xml}]]>
		</fichero>
      </web:entrada_expediciones>
   </soapenv:Body>
</soapenv:Envelope>
`
console.log(finalXML)

fs.writeFile('expediciones.xml', finalXML, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('updated!');
    }
  });


const soapRequest = require('easy-soap-request');
 
// example data
const url = 'https://geeverpre.alertran.net/geeverpre/ws_clientes?wsdl';
const sampleHeaders = {
  'user-agent': 'terraquo_test',
  'Content-Type': 'text/xml;charset=UTF-8',
//   'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
 
// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: finalXML, timeout: 10000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  console.log(body);
  console.log(statusCode);
})();