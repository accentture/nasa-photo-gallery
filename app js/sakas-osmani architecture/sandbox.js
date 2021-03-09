
class Sandbox{
    constructor(core){
        this.publish = core.publish
        this.subscribe = core.subscribe
    }

}

var SandboxEnableGalery = (function(){
    let instance 

    let methodAjaxService, methodGeneratorCollectionPhotosService
    
    class SandboxEnableGalery extends Sandbox{
        constructor(core){
            super(core)
            this.dom = core.dom

            methodAjaxService = core.provideAjax()
            methodGeneratorCollectionPhotosService = core.provideSerialization()
            
            if( !instance){
                instance = this //implementing singleton
            }

            return instance
        }
        /* getComponent(selector){
            return document.querySelector(selector)
        } */
        getCollection(year){
            let requestNasa = methodAjaxService
            return methodGeneratorCollectionPhotosService(year, requestNasa)
        }
        beginCount(){
            
        }
    }
    return SandboxEnableGalery
}())

var collectionSandbox = {
    SandboxEnableGalery:SandboxEnableGalery
}

export default Sandbox
export {collectionSandbox}

