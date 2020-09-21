import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    // setRepositories([... repositories, ])
    const newRepository = {
      "title": "Projeto sem titulo",
      "url": "",
      "techs": "[]"
    };

    const response = await api.post('repositories', newRepository);

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // console.log(id);
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key = {repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          )}
        
      </ul>
      {/* <input type="text" id="repositoryTitle" size="25"/> */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
