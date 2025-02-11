import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Contadores

  const caloriasConsumidas = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriasQuemadas = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriasTotales = useMemo(() => caloriasConsumidas - caloriasQuemadas, [caloriasConsumidas, caloriasQuemadas]); 



  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
        calories={caloriasConsumidas}
        text="Consumidas"
        />
        <CalorieDisplay
        calories={caloriasQuemadas}
        text="Ejercicio"
        />
        <CalorieDisplay
        calories={caloriasTotales}
        text="Diferencia"
        />
      </div>
    </>
  );
}
