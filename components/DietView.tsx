import React, { useEffect, useState } from 'react';

export default function DietView(){
  const [diet,setDiet]=useState<any>(null);

  useEffect(()=>{ fetch('/api/diet').then(r=>r.json()).then(setDiet); },[]);

  if(!diet) return <p>Carregando...</p>;

  return (
    <div className="card">
      <h2>Sua Dieta</h2>
      <p><b>Café:</b> {diet.breakfast}</p>
      <p><b>Almoço:</b> {diet.lunch}</p>
      <p><b>Janta:</b> {diet.dinner}</p>
      <p><b>Lanches:</b> {diet.snacks.join(", ")}</p>
    </div>
  );
}
