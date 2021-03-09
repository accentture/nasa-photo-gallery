const GaleryPhotosModule = (function(){

    let priv = new WeakMap()
    let _ = function(instance){ return priv.get(instance)}

    class GaleryPhotosModule{
        constructor(sandbox){
            this.sandbox = sandbox
            this.mainBox = this.sandbox.dom.selectQuery('.containerPhotos')

            //settings for privates
            var privateMembers = {}
            priv.set(this, privateMembers)

            let self = this //solve problem of context loss of this keyword
            this.addToContainerPhotos = this.addToContainerPhotos.bind(self)
            this.disableGalery = this.disableGalery.bind(self)
        }
    
        //method to show photos in gallery
        addToContainerPhotos(_photos){
            let photos = _photos
            let amountOfPhotos = Object.keys(photos).length

            if(amountOfPhotos >= 1){    
                let containerPhotos = this.mainBox
                containerPhotos.innerHTML = ""

                for(let photo in photos){
                    let photoBox = document.createElement('div')
                    let infoPhoto = photos[photo]

                    this.addPhoto(photoBox, infoPhoto)
                    this.addTitle(photoBox, infoPhoto)
                    this.addDate(photoBox, infoPhoto)
                    
                    photoBox.classList.add('photoBox')
                    /* photoBox.classList.add(`photoBox${counter}`) */
                    containerPhotos.append(photoBox)
                    
                }
                this.preparingDragScroll()

                //show message
                this.sandbox.publish('showMessage', false)
            }else{
                this.disableGalery(true)

                //show message
                this.sandbox.publish('showMessage', 'Las imagenes para este mes aún no han sido cargadas. Puedes ver fotos de otro mes mientras terminanos con la carga.')
            }
        }
        addPhoto(photoBox, photo){
            
            let imageUrl = photo.url
            
            let img = document.createElement('img')
            img.innerHTML = 'Cargando...'
            img.classList.add('img')
            img.src = imageUrl
    
            photoBox.append(img)
        }
        addTitle(photoBox, photo){
            let title = photo.title
    
            let imgTitle = document.createElement('h2')
            imgTitle.classList.add('title')
            imgTitle.innerHTML = title
    
            photoBox.append(imgTitle) 
        }
        addDate(photoBox, photo){
            let date = photo.date
            console.log(date)

            let dateTitle = document.createElement('div')
            dateTitle.classList.add('dateTitle')
            dateTitle.innerHTML = date
    
            photoBox.append(dateTitle) 
        }
    
        //method for the scroll of photos
        preparingDragScroll(){
            //source : https://codepen.io/toddwebdev/pen/yExKoj
    
            let slider = this.mainBox
            let isDown = false
            let startX  
            let positionScrolled
            slider.classList.remove('_disable')
    
            slider.addEventListener('mousedown', function(e){
                isDown = true
                startX = e.pageX - slider.offsetLeft
                positionScrolled = slider.scrollLeft
    
                slider.classList.add('active')
            }) 
    
            slider.addEventListener('mouseleave', function(){
                isDown = false
                slider.classList.remove('active')
            })
    
            slider.addEventListener('mouseup', function(){
                isDown = false
                slider.classList.remove('active')
            })
    
            slider.addEventListener('mousemove', function(e){
                if(!isDown) return true
                e.preventDefault()
    
                let x = e.pageX - slider.offsetLeft
                let walk = (x - startX ) * 3 //scroll velocity
                slider.scrollLeft = positionScrolled - walk
            })
        }
        disableGalery(disable){
            
            let containerPhotos = this.mainBox
            
            if(disable){
                containerPhotos.classList.add('_disable')
            }else{
                containerPhotos.classList.remove('_disable')
            }
        }
        create(){
            // ♥ 1 ♥
            this.sandbox.subscribe('chargePhotosInGalery', this.addToContainerPhotos)
            
        }
    }
    return GaleryPhotosModule
}())

export default GaleryPhotosModule