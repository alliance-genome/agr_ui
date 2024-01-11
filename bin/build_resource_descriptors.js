const yaml = require('js-yaml');
const https = require('https');
const fs = require('fs');

console.log("Build resource desriptors is running...");
// Get document, or throw exception on error
const url =  'https://raw.githubusercontent.com/alliance-genome/agr_schemas/master/resourceDescriptors.yaml';
const dir = './src';
const ymlpath = `${dir}/resourceDescriptors.yaml`;
const jspath = `${dir}/resourceDescriptors.js`;

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const file = fs.createWriteStream(ymlpath);

console.log("Output file: " + file.path);

https.get(url, function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("File Saved: " + file.path);

       const stringFile = fs.readFileSync(ymlpath);
       console.log("Converting ymal to js");
       const resourceDesciptors = yaml.load(stringFile);
       console.log(resourceDesciptors.length + " Resource Descriptors converted");
       fs.writeFileSync(
           jspath,
           "export const resourceDescriptors = " + JSON.stringify(resourceDesciptors)
       );
       console.log("Finished writting js file: ");
       console.log("Deleting old yaml file");
       fs.unlinkSync(ymlpath);
       console.log("Resource Descriptors Build has Completed");
   });
});
