import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { activityReducer, initialState } from "./reducers/activity-reducer"
function App() {
  
  const [state, dispatch] = useReducer(activityReducer, initialState)

  // Guardar en localstorage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },  [state.activities]) 

  const canResetApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  

  return (
    <>
      {/* SECCIÓN HEADER */}
      <header className="bg-lime-200 py-15">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold text-gray-800 uppercase">Contador de Calorías</h1>
          
          <button 
          className="bg-gray-600 hover:bg-gray-800 p-3 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:bg-gray-400 disabled:opacity-10"
          disabled= {!canResetApp()}
          onClick={() => dispatch({type: 'reset-app'})}
          >
            restaurar datos
          </button>
        </div>
      </header>

      {/* SECCIÓN FORMULARIO */}
      <section className="bg-lime-50 py-20 px-5">

        <div className="max-w-4xl mx-auto">
            <Form
            dispatch={dispatch}
            state={state}
            />
        </div>
      </section>

      {/* SECCIÓN RECUENTO DE CALORIAS */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
          activities={state.activities}/>
        </div>
      </section>

      {/* SECCIÓN LISTADO */}
      <section className="p-10 mx-auto max-w-4xl">

    <ActivityList
    activities={state.activities}
    dispatch={dispatch}
    />

      </section>
    </>
  )
}

export default App
