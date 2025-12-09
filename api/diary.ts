import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs'; import path from 'path';
const fp = path.join(process.cwd(), 'diary-db.json');

function load(){ if(!fs.existsSync(fp)) fs.writeFileSync(fp, JSON.stringify({ diary: [] }, null, 2)); return JSON.parse(fs.readFileSync(fp,'utf8')); }

export default function handler(req:VercelRequest,res:VercelResponse){
  const db = load();
  if(req.method==='GET') return res.status(200).json(db.diary);
  if(req.method==='POST'){
    const meal=req.body; meal.id=Date.now().toString();
    db.diary.push(meal);
    fs.writeFileSync(fp, JSON.stringify(db,null,2));
    return res.status(201).json(meal);
  }
  return res.status(405).json({error:"Método não suportado"});
}
