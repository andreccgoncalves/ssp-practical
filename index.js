const http = require('http'), //this module provides the http server functionalities
      path = require('path'), //provides utilities for working with file and directory paths
      express = require('express'), //allows this app to respond to http requests, defines the routing and renders back the required content
      fs = require('fs'), //allows to work with the file system read and write files back 
      xmlParse = require('xslt-processor').xmlParse, //allows to work with xml files
      xsltProcess = require('xslt-processor').xsltProcess, //allows us to utilise XSL Transformation
      xml2js = require('xml2js');//this module does XML <=> JSON conversion


const router = express(),
      server = http.createServer(router);
      
    

router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('PaddysCafe.xml', 'utf8'),
        xsl = fs.readFileSync('PaddysCafe.xsl', 'utf8');

    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);
    
    let result = xsltProcess(doc, stylesheet);

    res.end(result.toString());
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    const addr = server.address();
    console.log("Server listening at ", addr.address + ":" + addr.port)

});
