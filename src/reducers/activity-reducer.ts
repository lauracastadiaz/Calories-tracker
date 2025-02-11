import { Activity } from "../types"

/*
El reducer activityReducer maneja la acción save-activity. Cuando se despacha esta acción, el reducer:
Copia el estado actual (...state).
Agrega la nueva actividad (action.payload.newActivity) al arreglo activities del estado.
En resumen, el payload en este archivo se utiliza para pasar la nueva actividad que se debe agregar al estado cuando se despacha la acción save-activity.
*/
export type ActivityActions = 
{ type: 'save-activity', payload: { newActivity: Activity } } | // el payload contiene la nueva actividad que se debe agregar al estado y se almacena en el estado
{ type: 'set-activeId', payload: { id: Activity['id'] } } | //  el payload contiene el ID de la actividad que se debe seleccionar y almacenar en el estado.
{ type: 'delete-activity', payload: { id: Activity['id'] } } | 
{ type: 'reset-app' } // reiniciar app




export type ActivityState = {
    activities : Activity[], 
    activeId: Activity['id'] // se agrega una propiedad activeID al estado para almacenar el ID de la actividad seleccionada
}

// revisa si tenemos algo en localstorage
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState= {
    activities: localStorageActivities(), // el estado inicial es un objeto con un arreglo de actividades vacío
    activeId: '' // se agrega una propiedad activeID al estado para almacenar el ID de la actividad seleccionada
}

export const activityReducer = (
    state: ActivityState = initialState,  // el estado inicial es un objeto con un arreglo de actividades vacío
    action: ActivityActions, // action es de tipo ActivityActions
    
) => {
    
    if(action.type === 'save-activity'){ // si la acción es save-activity
        
        let updatedActivities : Activity[] = [] // se inicializa una variable updatedActivities de tipo arreglo de actividades
      if(state.activeId){
        updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity) // si activeId tiene un valor, se actualiza la actividad con el ID correspondiente con la nueva actividad sino se mantiene la actividad
     
    } else { // si activeId no tiene un valor
        updatedActivities =  [...state.activities, action.payload.newActivity] // si activeId no tiene un valor, se agrega la nueva actividad al arreglo de actividades
      }
        return { // se retorna un nuevo estado con las actividades actualizadas y activeId vacío
        ...state,
        activities: updatedActivities,
        activeId: ''
       }
    }

    if(action.type === 'set-activeId'){ // si la acción es set-activeId
        return {
            ...state,
            activeId: action.payload.id // se actualiza el activeID con el ID de la actividad seleccionada
    }
}

if(action.type === 'delete-activity'){
    return {
        ...state,
        activities: state.activities.filter(activity => activity.id != action.payload.id) // se actualiza el arreglo de actividades con las actividades que no tengan el ID de la actividad que se quiere eliminar
    }
}

if(action.type === 'reset-app'){
    return {
        activities: [],
        activeId: ''
    }
}

    return state // si no se cumple la condicion anterior, se retorna el estado sin cambios

}

