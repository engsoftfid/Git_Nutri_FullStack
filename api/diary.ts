import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "diary-db.json");

function loadDB() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ diary: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveDB(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

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
