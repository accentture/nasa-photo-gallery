
const ContainerListYearGaleryPhotosModule = (function(){
    
    class ContainerListYearGaleryPhotosModule{
        constructor(sandbox){
            this.sandbox = sandbox
        }
        showContainerOfYearAndGalery(){
            let mainContainer = document.querySelector('.mainContainer')
            mainContainer.style.visibility = 'visible'
        }
        create(){
            this.sandbox.subscribe('showContainer', this.showContainerOfYearAndGalery)
        }
        
    }
    return ContainerListYearGaleryPhotosModule
}())

export default ContainerListYearGaleryPhotosModule