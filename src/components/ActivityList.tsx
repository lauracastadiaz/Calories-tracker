import { useMemo, Dispatch } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className="text-4xl font-bold text text-slate-600 text-center">
        Comida y Ejercicio
      </h2>

      {isEmptyActivities ?
        <p className="text-center text-lg text-slate-500 mt-10 my-10">
          No hay actividades para mostrar
        </p> :
      activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-10 flex justify-between shadow"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
            >
              {categoryName(+activity.category)}{" "}
              {/* Aquí se llama a la función categoryName y se le pasa el valor de la propiedad category de la actividad. El + convierte el valor en un número. */}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.acto}</p>
            <p
              className={`font-black text-4xl ${
                activity.category === 1 ? "text-lime-500" : "text-orange-500"
              }`}
            >
              {activity.calories} {""}
              <span>Calorías</span>
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <PencilSquareIcon className="h-8 w-8 text-gray-800 cursor-pointer hover:text-gray-600" />
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon className="h-8 w-8 text-red-950 cursor-pointer hover:text-red-800 " />
            </button>
          </div>
        </div>
            
      ))}
    </>
  )
}

