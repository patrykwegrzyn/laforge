const YAML = require('yamljs');

console.log(process.env.root);

const service = YAML.load('service.yaml')
console.log("service", service)


module.exports = service;