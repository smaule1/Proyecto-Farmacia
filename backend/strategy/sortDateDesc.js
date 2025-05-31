import {sorter as strategy} from './sorterInterface.js'
import {implementsInterface as check} from './sorterInterface.js'

export class sortDateDesc {
    sort(list) {
        return list.sort((a,b) => new Date(b.fecha) - new Date (a.fecha));
    }
}

// Para verificar que implementa la interfaz correctamente
let implemented = check(sortDateDesc, strategy)
if (!implemented) {
    console.log("The class must implement the interface")
}