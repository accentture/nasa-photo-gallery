
//importamos fechas
import date from '../date/date.js'
import {currentYearDate, currentMonthDate} from '../date/date.js'

class Myxin{
    //https://api.nasa.gov/planetary/apod

    displayData(arrayPromises){
        let result

        for(let x = 0; x < arrayPromises.length; x++){
            result = arrayPromises[x]
    
            console.log(result)
        }
    }
    onError(error){
        console.log(error)
    }
}
var miMyxin = new Myxin()

//en realidad esta clase es un servicio para construir el objeto entero de las fotos de la NASA
var Serialization = (function(){
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    class SerializationPhotosByYear{
        constructor(){
            const self = this
            this.generateCollection = this.generateCollection.bind(self)
        }
        fillYearWithMonths(year){
            let monthName

            for(let month = 0, monthsNumber = (year === currentYearDate) ? currentMonthDate : months.length - 1; month <= monthsNumber; month++){
                monthName = months[month]
                this[year][monthName] = {}
            }

            /* months.forEach(element => {
                this[year][element] = {}
            }); */
        }
        getPhotosOfYear(year, requestNasa){     
            let monthNumber = 0

            for(let month in this[year]){
                
                monthNumber++   // mi configuración: 1 = enero
                this.getPhotosCollectionByMonth(year, monthNumber, month, requestNasa)
            }
        }
        getPhotosCollectionByMonth(_year, _month, monthName, requestNasa){
            const mainUrl = 'https://api.nasa.gov/planetary/apod?date='
            const year = _year + '-'
            const month = _month + '-'
            const HDimage = '&hd=false&'
            const key = 'api_key=KlSbuZZQNHTo77MBhNazEtUbotoBWHUEiFy6cyvs'
        
            /* kdklfdfaskldfaskldfas */
            const yesterday = date.getDate() - 1
            const fullDays = new Date(_year, _month, 0).getDate()
            const totalDays = (_year === currentYearDate && _month === currentMonthDate)? yesterday : fullDays

            const promises = []
            let link, result

            for(let day = 1 ; day <= totalDays; day++){
                link = `${mainUrl}${year}${month}${day}${HDimage}${key}`
                
                result = requestNasa(link)
                promises.push(result)
            }
                        
            Promise.all(promises)
                .then(this.savePhotosByMonth.bind(this).bind(null,_year, monthName))  
                .catch(miMyxin.onError)  
        
        }

        //recojemos las promesas y guardamos las fotos
        savePhotosByMonth(year, monthName, promises){
            promises.forEach((element, index) => {
                delete element.media_type
                delete element.service_version

                this[year][monthName][index + 1] = element
            });
        }

        generateCollection(year, requestNasa){
            this[year] = {}
            this.fillYearWithMonths(year)
            this.getPhotosOfYear(year, requestNasa)
            
            return this[year]
        }
    }
    return SerializationPhotosByYear
}())
var serialization = new Serialization()



class Ajax{
    constructor(){

    }
    request(url){

        return new Promise( (resolve, reject) => {
            const httpReq = new XMLHttpRequest()
    
            httpReq.onreadystatechange = function(){
                let data
    
                if(httpReq.readyState == 4){
                    if(httpReq.status == 200){
                        data = JSON.parse(httpReq.responseText)
                        resolve(data) 
    
                    }else{
                        reject(new Error(httpReq.statusText)) 
                    }
                }
            }
    
            httpReq.open('GET', url, true)
            httpReq.send()
        })
    }
}
var ajax = new Ajax()

class BaseLibrary{
    constructor(ajax, serialization){
        this.ajax = ajax
        this.serialization = serialization
    }
}
var baseLibrary = new BaseLibrary(ajax, serialization)

export default baseLibrary