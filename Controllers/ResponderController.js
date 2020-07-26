const _ = require('lodash');
const RamPersistProvider = require('../persistProvider/RamPersistProvider');
const ramPersist = new RamPersistProvider();
const ResourceService = require('../services/resourceService');
const otherInstanceUrl = _.last(process.argv);
const resourceService = new ResourceService(ramPersist, otherInstanceUrl);
class ResponderController{
    async handlePostRequest(req, res){
        try {
            const resource = _.get(req,'body');
            ramPersist.setResource(resource);
            return res.status(200).send('Success');
        } catch (e) {
            console.log(e)
            return res.status(500).end(`Internal error: ${e}`);
        }
    }
    async handleGetRequest(req, res){
        try {
            const resolveResource = ramPersist.getResource();
            if(resolveResource){
                return res.status(200).json(resolveResource);
            }
            return res.status(200).send('Nothing in the resource');
        } catch (e) {
            console.log(e)
            return res.status(500).end(`Internal error: ${e}`);
        }
    }
    async handleGetFromAllRequest(req, res){
        try {
            const resolveResource = await resourceService.getResource();
            if(resolveResource){
                return res.status(200).send(resolveResource);
            }
            return res.status(200).send('Nothing in the resource');
        } catch (e) {
            console.log(e)
            return res.status(500).end(`Internal error: ${e}`);
        }
    }
}
module.exports = new ResponderController();