import type { VercelRequest, VercelResponse } from '@vercel/node';
export default function handler(req:VercelRequest,res:VercelResponse){
  return res.status(200).json({
    breakfast:"Ovos mexidos + frutas",
    lunch:"Arroz, feijão, peito de frango e salada",
    dinner:"Omelete + legumes",
    snacks:["Iogurte","Castanhas"]
  });
}
