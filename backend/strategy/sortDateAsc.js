import {sorter as strategy} from './sorterInterface'
import {implementsInterface as check} from './sorterInterface'

export class sortDateAsc {
    sort(canjes) {
        
    }
}

// Para verificar que implementa la interfaz correctamente
implemented = check(sortDateAsc, strategy)
if (!implemented) {
    console.log("The class must implement the interface")
}