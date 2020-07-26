class RamPersistProvider{
    constructor() {
        this.resource = {};
    }
    getResource(){
        return this.resource;
    }
    setResource(obj){
        this.resource.timestamp = new Date();
        this.resource.value=obj;
    }

}
module.exports= RamPersistProvider;