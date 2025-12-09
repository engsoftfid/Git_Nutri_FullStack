export const GEMINI_API_KEY = "AIzaSyAJfgEDOEc8aUJsQ-2VVvLnNnojseO65LI";

export async function analyzeImage(base64:string){
  return {
    name:"Alimento Detectado",
    calories:180,
    protein:8,
    carbs:22,
    fat:6
  };
}
