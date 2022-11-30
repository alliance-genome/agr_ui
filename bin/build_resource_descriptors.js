const yaml = require('js-yaml');
const https = require('https');
const fs   = require('fs');

console.log("Build resource desriptors is running...");
// Get document, or throw exception on error
const url =  'https://raw.githubusercontent.com/alliance-genome/agr_schemas/master/resourceDescriptors.yaml';

const file = fs.createWriteStream("./dist/resourceDescriptors.yaml");
const request = https.get(url, function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       const stringFile = fs.readFileSync("./dist/resourceDescriptors.yaml");
       const resourceDesciptors = yaml.load(stringFile);
       fs.writeFileSync(
           './dist/resourceDescriptors.js',
           "export const resourceDescriptors = " + JSON.stringify(resourceDesciptors)
       );
       fs.unlinkSync("./dist/resourceDescriptors.yaml");
       console.log("Resource Descriptors Build has Completed");
   });
});
