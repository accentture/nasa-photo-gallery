//import the sandbox
import {collectionSandbox} from './sandbox.js'

//import the modules
import CollectionPhotosModule from './modules/collection-photos.module.js'
import ContainerListYearGaleryPhotosModule from './modules/container-list-year-galery.module.js'
import ListYearsModule from './modules/list-year.module.js'
import MessageModule from './modules/message.module.js'
import GaleryPhotosModule from './modules/galery-photos.module.js'
import ListMonthsModule from './modules/list-months.module.js'

//import the base library
import baseLibrary from './external library.js'

var Core = (function(){
    
    var cache = {} //cache for subscriptions of the modules
    var _dom = {
        selectQuery:function(selector){
            return document.querySelector(selector)
        },
        selectId:function(selector){
            return document.getElementById(selector)
        },
        selectClass:function(selector){
            return document.getElementsByClassName(selector)
        }
    }

    class Core{
        constructor(baseLibrary){
            this.modulesData = {}
            this.baseLibrary = baseLibrary
            this.dom = _dom
        }

        /* FOR THE MODULES */
        registerModule(moduleId, creator, sandboxName){
            this.modulesData[moduleId] = {
                creator: creator, //register the module constructor
                instance: null,
                sandboxName: sandboxName || undefined
            }
        }
        start(moduleId){
            let sandboxName = this.modulesData[moduleId].sandboxName
            
            //it will create a apropiate sandbox for every module
            this.modulesData[moduleId].instance = new this.modulesData[moduleId].creator(new collectionSandbox[sandboxName](this))
            
            //create the module
            this.modulesData[moduleId].instance.create()
        }
        startAll(){
            for(let moduleId in this.modulesData){
                if(this.modulesData.hasOwnProperty(moduleId)){
                    this.start(moduleId)
                }   
            }
        }
        subscribe(message, callback){
            console.log(message)
            if( ! cache[message]){
                cache[message] = []
            }

            //ensure that exists only one mehtod for class
            cache[message].pop()
            cache[message].push(callback)
        }
        publish(message, args){
            try{
                for(let i = 0; i < cache[message].length; i++){
                    if(typeof args === 'undefined'){args = []}
                    if( !(args instanceof Array)){
                        args = [args]
                    }
                    
                    return cache[message][i].apply(this, args) //return the unique value of message
                    
                }
            }catch (error){
                console.log(error)
            }
        }
    
        /* TO USE THE LIBRERY */
        provideAjax(){
            return this.baseLibrary.ajax.request
        }
        provideSerialization(){
            return this.baseLibrary.serialization.generateCollection
        }
    }
    return Core
}())

var core = new Core(baseLibrary)
core.registerModule('CollectionPhotosModule', CollectionPhotosModule, 'SandboxEnableGalery')
core.registerModule('ContainerListYearGaleryPhotosModule', ContainerListYearGaleryPhotosModule, 'SandboxEnableGalery')
core.registerModule('ListYearsModule', ListYearsModule, 'SandboxEnableGalery')
core.registerModule('MessageModule', MessageModule, 'SandboxEnableGalery')
core.registerModule('GaleryPhotosModule', GaleryPhotosModule, 'SandboxEnableGalery')
core.registerModule('ListMonthsModule', ListMonthsModule, 'SandboxEnableGalery')


export default core