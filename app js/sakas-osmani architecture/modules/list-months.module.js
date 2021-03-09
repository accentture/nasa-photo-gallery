import { currentMonthDate } from '../../date/date.js'

const ListMonthsModule = (function(){
    let priv = new WeakMap()
    let _ = function(instance){
        return priv.get(instance)
    }

    //send message from month activated
    let preparingSendPhotosToGalery = function(photosOfMonthActivatedPromise, monthId){

        //solve promise and upload photos in the gallery
        let solvePromise = function(_photosOfMonth){  
            let photosOfMonth = _photosOfMonth
            
            this.sandbox.publish('chargePhotosInGalery', photosOfMonth)
        } 
        photosOfMonthActivatedPromise.then(solvePromise.bind(this))

    }


    let pickPhotosOfMonth = function(monthName){
        let photosOfMonthActivatedPromise = this.sandbox.publish('chargePhotosByMonth', monthName)

        return photosOfMonthActivatedPromise
    }

    class ListMonthsModule{
        constructor(sandbox){

            //attach this keyword to private members
            pickPhotosOfMonth = pickPhotosOfMonth.bind(this)
            preparingSendPhotosToGalery = preparingSendPhotosToGalery.bind(this)

            this.sandbox = sandbox
            this.tagsOfMonths = this.sandbox.dom.selectClass('month')
    
            //settings for privates
            var privateMembers = {pickPhotosOfMonth, preparingSendPhotosToGalery}
            priv.set(this, privateMembers)

            let self = this
            this.activeMonth = this.activeMonth.bind(self)
        }
        activeCurrentMonthByDefault(monthBox){
            let idMonth = monthBox.classList[2]
    
            if(currentMonthDate == idMonth){
                monthBox.click()
            }
        }

        //after to active month
        activeMonth(monthToActive){
            let buttomActivated = document.querySelector('.monthActivated')
            let monthId = monthToActive.id
            let photosOfMonthActivatedPromise

            //deactive button activated
            if(buttomActivated){
                buttomActivated.classList.remove('monthActivated')
            }
            monthToActive.classList.add('monthActivated')
    
            photosOfMonthActivatedPromise = _(this).pickPhotosOfMonth(monthId)
            _(this).preparingSendPhotosToGalery(photosOfMonthActivatedPromise, monthId)
        }
        preparingMonths(){
            let months = this.tagsOfMonths
    
            for(let month = 0; month < months.length; month++){
                months[month].addEventListener('click', this.activeMonth.bind(null, months[month]))
                //this.activeCurrentMonthByDefault(months[month])
            }
        }
        create(){
            this.preparingMonths()
        }
    }

    return ListMonthsModule
}())

export default ListMonthsModule