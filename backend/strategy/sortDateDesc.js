import {sorter as strategy} from './sorterInterface'
import {implementsInterface as check} from './sorterInterface'

export class sortDateDesc {
    sort(list) {
        return list.sort((a,b) => new Date(b.fecha) - new Date (a.fecha));
    }
}

// Para verificar que implementa la interfaz correctamente
implemented = check(sortDateDesc, strategy)
if (!implemented) {
    console.log("The class must implement the interface")
}