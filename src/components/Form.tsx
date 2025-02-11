import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4} from 'uuid';
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type formProps = {
  dispatch: Dispatch<ActivityActions>, // dispatch es de tipo Dispatch<ActivityActions>
  state: ActivityState
};

export default function Form({ dispatch, state }: formProps) {
  // STATES

  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    acto: '',
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialState);

useEffect(() => {
  if(state.activeId){
    const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0] // filtrar la actividad seleccionada por el ID y obtener la primera actividad
    setActivity(selectedActivity) // actualizar el estado de la actividad con la actividad seleccionada
  }
}, [state.activeId])

  // FUNCTIONS

  //handleChange es una función que se ejecuta cada vez que escribimos en un input
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    //console.log(e.target.value)  e.target identifica en qué input estamos escribiendo
    //console.log(e.target.id)  e.target.id identifica el id del input
    //console.log(e.target.name)  e.target.name identifica el name del input
    //console.log(e.target.type)  e.target.type identifica el tipo de input
    //console.log(e.target.checked)  e.target.checked identifica si un input de tipo checkbox está seleccionado o no

    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity, // para no perder la referencia, lo que hace es copiar el objeto activity, para no perder lo que escribimos en los otros inputs
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, // e.target.id es el id del input, y e.target.value es el valor que escribimos en el input
    });
  };

  //isValidActitivy es una función que valida si los campos de la actividad son válidos
  const isValidActitivy = () => {
    const { acto, calories } = activity; // extraemos action y calories del objeto activity
    return acto.trim() !== "" && calories > 0; // que no queden espacios en blanco y que las calorías sean mayores a 0
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevenir acción por defecto del formulario

    dispatch({ type: "save-activity", payload: { newActivity: activity } }); // despachar la acción save-activity con la nueva actividad gracias al payload
    setActivity({
      ...initialState,
      id: uuidv4(),
    }); // limpiar el formulario
  };

  return (
    <div>
      <form
        className="space-y-5 bg-white p-10 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            Categoría:
          </label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="action" className="font-bold">
            Acto:
          </label>
          <input
            id="acto"
            type="text"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder="Ej. Correr 5km, Comer una hamburguesa..."
            value={activity.acto}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calorías:
          </label>
          <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder="Calorías. Ej. 300 o 500 kal"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="bg-gray-800 text-white font-bold py-2 rounded-lg w-full cursor-pointer hover:bg-gray-900 disabled:opacity-20"
          value={
            state.activeId
            ? `Actualizar ${activity.category === 1 ? "Comida" : "Ejercicio"}`
            : `Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`
           
          } // cambiar el texto del botón dependiendo de la categoría

          disabled={!isValidActitivy()}
        />
      </form>
    </div>
  );
}
