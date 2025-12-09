import { useEffect, useState } from "react";

export default function DietView() {
  const [dietData, setDietData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiet() {
      try {
        const res = await fetch("/api/diet");

        if (!res.ok) {
          console.error("Erro ao buscar dietas:", res.status);
          setDietData([]);
          return;
        }

        const json = await res.json();

        // garante que existe db.diets
        if (json && json.diets) {
          setDietData(json.diets);
        } else {
          setDietData([]);
        }

      } catch (error) {
        console.error("Erro no fetch:", error);
        setDietData([]);
      } finally {
        setLoading(false);
      }
    }

    loadDiet();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dieta</h1>

      {dietData.length === 0 && <p>Nenhuma dieta registrada.</p>}

      <ul>
        {dietData.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
