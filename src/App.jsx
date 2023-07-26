import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [pts, setPts] = useState(0);
  const [ass, setAss] = useState(0);
  const [reb, setReb] = useState(0);
  const [players, setPlayers] = useState([]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    addPlayer({ name, img, pts, ass, reb });
    console.log(players);
  };

  const addPlayer = ({ name, img, pts, ass, reb }) => {
    const id = Math.floor(Math.random() * 1000);
    const newPlayer = { name, id, img, pts, ass, reb };
    setPlayers((state) => {
      const newState = [...state, newPlayer];
      localStorage.setItem('players-lib', JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const storedPlayers = localStorage.getItem('players-lib');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result) ;
    };
    reader.readAsDataURL(file);
  };  

  return (
    <>
      <h1>PinaHoopers League Stats</h1>
      <form action="" onSubmit={handleSubmit}>
        <div id="playerData">
          <label htmlFor="playerinput">Digite o nome do jogador:</label>
          <input type="text" id="playerinput" onChange={(ev) => setName(ev.target.value)} />
          <label htmlFor="img">Foto:</label>
          <input type="file" name="" id="img" accept="image/*" onChange={handleImageChange} />
        </div>
        <div id="playerStats">
          <label htmlFor="pts">Pontos</label>
          <input type="number" name="" id="pts" min={0} onChange={(ev) => setPts(Number(ev.target.value))} />
          <label htmlFor="reb">Rebotes</label>
          <input type="number" name="" id="reb" min={0} onChange={(ev) => setReb(Number(ev.target.value))} />
          <label htmlFor="ass">Assistências</label>
          <input type="number" name="" id="ass" min={0} onChange={(ev) => setAss(Number(ev.target.value))} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div id="playerslist">
        {players.map((player) => (
          <div key={player.id} id="player">
            <div id="dados">
              <h2>{player.name}</h2>
              {player.img && <img src={player.img} alt="" />}
            </div>
            <div id="stats">
              <p>Pontos: {player.pts}</p> <p>Rebotes: {player.reb}</p> <p>Assistências: {player.ass}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
