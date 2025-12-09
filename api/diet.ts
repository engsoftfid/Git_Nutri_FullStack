import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "diet-db.json");

// Carregar banco local
async function loadDB() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ diets: [] }, null, 2));
  }

  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Salvar no banco
async function saveDB(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Handler API
export default async function handler(req: any, res: any) {
  const db = await loadDB();

  if (req.method === "GET") {
    return res.status(200).json(db.diets);
  }

  if (req.method === "POST") {
    const newDiet = req.body;

    if (!newDiet) {
      return res.status(400).json({ error: "Corpo da requisição vazio." });
    }

    db.diets.push(newDiet);
    await saveDB(db);

    return res.status(201).json({
      message: "Dieta salva com sucesso!",
      diet: newDiet,
    });
  }

  return res.status(405).json({ error: "Método não suportado." });
}
