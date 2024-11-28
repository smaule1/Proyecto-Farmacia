// Interfaz del strategy
// Se ve medio estúpida gracias a JavaScript 👍
export const sorter = {
    // Una maestro de los patrones yo
    sort: function (canjes) {}
}

// Función para revisar que si una clase implementa la interfaz
// **Cosas de JavaScript**
export function implementsInterface(objClass, objInterface) {
    for (const method in objInterface){
        if (!method in objClass || typeof[method] !== "function"){
            return false;
        }
    }
    return true;
}