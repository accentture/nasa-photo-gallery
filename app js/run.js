
import core from './sakas-osmani architecture/core.js'

class App{
    constructor(core){
        /* console.log(core) */
        this.core = core
    }
}

var app = new App(core)
/* app.core.start('GaleryPhotosModule') */

app.core.startAll()
