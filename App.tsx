import React, { useState } from 'react';
import DietView from './components/DietView';
import DiaryView from './components/DiaryView';
import FoodAnalyzer from './components/FoodAnalyzer';
import UserProfileForm from './components/UserProfileForm';
import './styles/global.css';

export default function App(){
  const [tab,setTab]=useState('diet');

  return (
    <div>
      {tab==='diet' && <DietView/>}
      {tab==='diary' && <DiaryView/>}
      {tab==='analyze' && <FoodAnalyzer/>}
      {tab==='profile' && <UserProfileForm/>}

      <nav className="nav">
        <button onClick={()=>setTab('diet')}>Dieta</button>
        <button onClick={()=>setTab('diary')}>Diário</button>
        <button onClick={()=>setTab('analyze')}>Analisar</button>
        <button onClick={()=>setTab('profile')}>Perfil</button>
      </nav>
    </div>
  );
}
