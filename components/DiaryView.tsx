import React, { useEffect, useState } from 'react';

export default function DiaryView(){
  const [meals,setMeals]=useState([]);

  useEffect(()=>{
    fetch('/api/diary').then(r=>r.json()).then(setMeals);
  },[]);

  return (
    <div className="card">
      <h2>Diário</h2>
      {meals.map((m:any)=>(<div key={m.id} className="box"><b>{m.name}</b> — {m.calories} kcal</div>))}
    </div>
  );
}
