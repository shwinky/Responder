jest.mock('util');
const util = require('util');
const getAsyncResponse = {
    "timestamp": "2020-07-26T13:59:22.280Z",
    "value": {
        "something": "blabla1"
    }
}
util.promisify = jest.fn(() => ()=>({body:getAsyncResponse}));
const ResourceService = require('../services/resourceService');



describe("Services tests", () => {
    beforeEach(() => {
        mockPersist={
            getResource: jest.fn(),
            setResource: jest.fn()
        }
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('resource service should return the persist resource sinces its newer', async () => {
        const expectedValue ={
            "timestamp": "2020-07-27T13:59:22.280Z",
            "value": {
                "something": "blabla2"
            }
        }
        mockPersist.getResource = jest.fn().mockReturnValue(expectedValue);
        const resourceService = new ResourceService(mockPersist,"SomeUrl");
        const retValue = await resourceService.getResource();
        expect(retValue).toEqual(expectedValue.value);
    });
    it('resource service should return the other instance resource sinces its newer', async () => {
        const expectedValue ={
            "timestamp": "2020-07-25T13:59:22.280Z",
            "value": {
                "something": "blabla2"
            }
        }
        mockPersist.getResource = jest.fn().mockReturnValue(expectedValue);
        const resourceService = new ResourceService(mockPersist,"SomeUrl");
        const retValue = await resourceService.getResource();
        expect(retValue).toEqual(getAsyncResponse.value);
    });
    it('resource service should return the other instance value since persist is empty', async () => {
        const expectedValue ={}
        mockPersist.getResource = jest.fn().mockReturnValue(expectedValue);
        const resourceService = new ResourceService(mockPersist,"SomeUrl");
        const retValue = await resourceService.getResource();
        expect(retValue).toEqual(getAsyncResponse.value);
    });
});