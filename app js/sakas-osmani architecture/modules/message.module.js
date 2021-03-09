class MessageModule{
    constructor(sandbox){
        this.sandbox = sandbox
        let self = this
        this.messageBox = this.sandbox.dom.selectQuery('#message')
        this.addMessage = this.addMessage.bind(self)
    }
    addMessage(message){
        let messageBox = this.messageBox

        if(message !== false){
            messageBox.innerHTML = message
            messageBox.style.visibility = 'visible'
        }else if(message === false){
            messageBox.style.visibility = 'hidden'
        }
    }
    create(){
        
        this.sandbox.subscribe('showMessage', this.addMessage)
    }
}

export default MessageModule