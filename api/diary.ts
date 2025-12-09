import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "diary-db.json");

// Carregar banco local
async function loadDB() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ diary: [] }, null, 2));
  }

  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Salvar banco
async function saveDB(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Handler
export default async function handler(req: any, res: any) {
  const db = await loadDB();

  if (req.method === "GET") {
    return res.status(200).json(db.diary);
  }

  if (req.method === "POST") {
    const newEntry = req.body;

    db.diary.push(newEntry);
    await saveDB(db);

    return res.status(201).json({
      message: "Entrada adicionada ao diário",
      entry: newEntry,
    });
  }

  return res.status(405).json({ error: "Método não suportado." });
}
