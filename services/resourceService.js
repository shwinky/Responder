const _ = require('lodash');
const request = require('request');
const util = require('util');
const getAsync = util.promisify(request.get);
class resourceService{
    constructor(persistProvider, url){
        this.persistProvider = persistProvider;
        this.otherInstanceUrl = url;
    }
    async getResource(){
        let retValue= this.persistProvider.getResource();
        try {
            const otherInstanceResponse = await getAsync({url:`${this.otherInstanceUrl}/resource`});
            const otherInstanceValue = _.get(otherInstanceResponse,'body');
            console.log(`value from other instance: ${otherInstanceValue}`);
            if(otherInstanceValue){
                if(!retValue || !retValue.timestamp){
                    console.log('nothing in persist, returning other instance');
                    retValue=otherInstanceValue;
                }
                else if(otherInstanceValue.timestamp && otherInstanceValue.timestamp>retValue.timestamp && otherInstanceValue.value){
                    console.log('other instance is newer, returning other instance');
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