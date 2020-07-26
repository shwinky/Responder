const _ = require('lodash');
const request = require('request');
const util = require('util');
const getAsync = util.promisify(request.get);
class resourceService{
    constructor(persistProvider, url){
        this.persistProvider = persistProvider;
        this.otherInstanceUrl = `http://${url}:3000`;
    }
    async getResource(){
        let retValue= this.persistProvider.getResource();
        try {
            const otherInstanceResponse = await getAsync({url:`${this.otherInstanceUrl}/resource`});
            const otherInstanceValue = JSON.parse(_.get(otherInstanceResponse,'body'));
            if(otherInstanceValue){
                if(!retValue || !retValue.timestamp){
                    retValue=otherInstanceValue;
                }
                else if(otherInstanceValue.timestamp && new Date(otherInstanceValue.timestamp)>new Date(retValue.timestamp) && otherInstanceValue.value){
                    retValue=otherInstanceValue;
                }
            }
        } catch (err) {
            console.log(err);
        }
        return retValue.value;

    }
}
module.exports = resourceService;