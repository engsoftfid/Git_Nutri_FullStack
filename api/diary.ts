export default function handler(req: any, res: any) {

// Caminho do arquivo JSON
const filePath = path.join(process.cwd(), "diary-db.json");

// Função para carregar o banco
function loadDB() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ diary: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Função para salvar o banco
function saveDB(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Handler da API
export default function handler(req: any, res: any) {
  const db = loadDB();

  if (req.method === "GET") {
    return res.status(200).json(db.diary);
  }

  if (req.method === "POST") {
    const newEntry = req.body;
    db.diary.push(newEntry);
    saveDB(db);
    return res.status(201).json({
      message: "Entrada adicionada ao diário!",
      entry: newEntry,
    });
  }

  return res.status(405).json({ error: "Método não suportado" });
}
