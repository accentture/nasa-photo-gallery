const CollectionPhotosModule = (function(){
    let priv = new WeakMap()
    let _ = function(instance){return priv.get(instance)}

    let preparingToSendPhotos = function(){
        let senPhotosByYearCallback = (_yearActivated) => {
            let yearActivated = _yearActivated

            //send a promise
            const promise = new Promise((resolve, reject) => {
                let photosOfYear = this.photos[yearActivated] 

                if(photosOfYear){
                    resolve(photosOfYear)
                }else{
                    reject(`It wasn't posible get photos for year ${yearActivated}.`)
                }
            })
            return promise
        }
        this.sandbox.subscribe('chargePhotosByYear', senPhotosByYearCallback)
    }

    class CollectionPhotosModule{
        constructor(sandbox){
            preparingToSendPhotos = preparingToSendPhotos.bind(this)

            this.sandbox = sandbox
            this.photos = {}
    
            var privateMembers = {preparingToSendPhotos}
            priv.set(this, privateMembers)

            let self = this
        }
        addCollection(year){
            let collection = this.sandbox.getCollection(year)
            this.photos[year] = collection
        }
         createFullPhotosCollection(){
            for(let year = 2019; year <= 2020; year++){
                this.addCollection(year)
            }
        }
        create(){
            this.createFullPhotosCollection()
            _(this).preparingToSendPhotos()
           
            console.log(this.photos)
        }
    }
    return CollectionPhotosModule
}())

export default CollectionPhotosModule