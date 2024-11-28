import {sorter as strategy} from './sorterInterface'
import {implementsInterface as check} from './sorterInterface'

export class sortDateDesc {
    sort(canjes) {
        // Muy útil
        return canjes;
    }
}

// Para verificar que implementa la interfaz correctamente
implemented = check(sortDateDesc, strategy)
if (!implemented) {
    console.log("The class must implement the interface")
}