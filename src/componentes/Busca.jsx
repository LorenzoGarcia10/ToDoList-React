import React from 'react'

const Busca = ( {search, setSearch }) => {
  return (
    <div className='search'>
        <h2>Pesquisar Atividade: </h2>
        <input 
        type="text" 
        value={search}
         onChange={(e) => setSearch(e.target.value)} 
        placeholder = "Digite para buscar..."
      />
    </div>
  );
};

export default Busca;