import React, { useState } from 'react';
import { analyzeImage } from '../services/geminiService';

export default function FoodAnalyzer(){
  const [result,setResult]=useState<any>(null);

  async function handleAnalyze(){
    const r = await analyzeImage("fake");
    setResult(r);
  }

  async function addToDiary(){
    await fetch('/api/diary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(result)});
    alert("Adicionado ao diário!");
  }

  return (
    <div className="card">
      <h2>Analisar Alimento</h2>
      <button onClick={handleAnalyze}>Enviar imagem</button>

      {result && (
        <div className="box">
          <p><b>{result.name}</b></p>
          <p>{result.calories} kcal</p>
          <button onClick={addToDiary}>Adicionar ao Diário</button>
        </div>
      )}
    </div>
  );
}
