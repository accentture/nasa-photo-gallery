import { currentYearDate } from '../../date/date.js'

const ListYearsModule = (function(){
    
    //settings for private memmbers
    let priv = new WeakMap()
    let _ = function(instance){
        return priv.get(instance)
    }

    /* PRIVATE METHODS */
    //to these methods correspond the use of "subscribe" and "pusblish" of sandbox
    let displayListYearAndGalleryPhotosContainer = function(){
        this.sandbox.publish('showContainer')
    }
    let pickPhotosOfYear = function(yearId){
        let photosOfYearActivatedPromise = this.sandbox.publish('chargePhotosByYear', yearId)

        return photosOfYearActivatedPromise
    }
    let preparingSendPhotosWithListMonth = function(photosOfYearActivatedPromise){
        let sendPhotosByMonthCallback = (_photosOfYear, _month) => {
            let month = _month

            //send other promise
            const promise = new Promise((resolve, reject) => {
                let photosOfYear = _photosOfYear[month]
                console.log(photosOfYear)

                if(photosOfYear){
                    resolve(photosOfYear)
                }else{
                    reject(`It wasn't posible get photos for ${month} month.`)
                }
            })
            return promise
        }

        let solvePromise = (photosOfYearPromise) => {
            console.log(photosOfYearPromise)

            this.sandbox.subscribe('chargePhotosByMonth', sendPhotosByMonthCallback.bind(null, photosOfYearPromise))
        }
        
        if(photosOfYearActivatedPromise){
            
            console.log(photosOfYearActivatedPromise)
            photosOfYearActivatedPromise.then(solvePromise.bind(this))   
        }
    }

    class ListYearsModule{
        constructor(sandbox){

            //attach this keyword to private members
            displayListYearAndGalleryPhotosContainer = displayListYearAndGalleryPhotosContainer.bind(this)
            pickPhotosOfYear = pickPhotosOfYear.bind(this)
            preparingSendPhotosWithListMonth = preparingSendPhotosWithListMonth.bind(this)

            //settings for privates
            var privateMembers = {displayListYearAndGalleryPhotosContainer, pickPhotosOfYear, preparingSendPhotosWithListMonth}
            priv.set(this, privateMembers)

            this.sandbox = sandbox
            this.tagOfYears = []
    
            let self = this
            this.activateYear = this.activateYear.bind(self)
            
        }
         activateYear(yearToActive){

            _(this).displayListYearAndGalleryPhotosContainer()

            let buttomActivated = document.querySelector('.yearActivated')
            let yearId = yearToActive.id
            let photosOfYearActivatedPromise

            //deactive the boton activated 
            if(buttomActivated){
                buttomActivated.classList.remove('yearActivated')
            }
            yearToActive.classList.add('yearActivated')

            photosOfYearActivatedPromise =  _(this).pickPhotosOfYear(yearId) //alistamos notificacion
             _(this).preparingSendPhotosWithListMonth(photosOfYearActivatedPromise)
        }
    
        //upload the year photos by defect
        activeCurrentYearByDefault(yearBox){
            let idYear = yearBox.id
            if(currentYearDate == idYear){
                yearBox.click()
            }
        }
    
        //method to create the year list
        chargeListYears(){
            let navBar = this.sandbox.dom.selectId('years')
            let listYears = document.createElement('ul')
            listYears.id = 'yearList'
    
            let yearLiTag
            for(let year = 2019; year <= 2020; year++){
    
                yearLiTag = document.createElement('li')
                yearLiTag.classList.add('year')
                yearLiTag.id = year
    
                yearLiTag.innerHTML = `AÑO ${year}`
                listYears.append(yearLiTag)
    
                this.tagOfYears.push(yearLiTag)
    
                yearLiTag.addEventListener('click', this.activateYear.bind(null, yearLiTag))
                this.activeCurrentYearByDefault(yearLiTag)
            }
    
            navBar.append(listYears)
        }
        create(){
            this.chargeListYears()
        }
    }
    return ListYearsModule
}())

export default ListYearsModule