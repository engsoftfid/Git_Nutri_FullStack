import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "diet-db.json");

function loadDB() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ diets: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveDB(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req: any, res: any) {
    const db = loadDB();

    if (req.method === "GET") {
        return res.status(200).json(db.diets);
    }

    if (req.method === "POST") {
        const newDiet = req.body;

        if (!newDiet) {
            return res.status(400).json({ error: "Corpo da requisição vazio." });
        }

        db.diets.push(newDiet);
        saveDB(db);

        return res.status(201).json({
            message: "Dieta salva com sucesso!",
            diet: newDiet,
        });
    }

    return res.status(405).json({ error: "Método não suportado." });
}
