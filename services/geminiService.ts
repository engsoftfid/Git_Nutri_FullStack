export const GEMINI_API_KEY = "SUA_CHAVE_AQUI";

export async function analyzeImage(base64:string){
  return {
    name:"Alimento Detectado",
    calories:180,
    protein:8,
    carbs:22,
    fat:6
  };
}
