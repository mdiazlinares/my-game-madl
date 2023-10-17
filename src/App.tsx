import { useEffect, useState } from 'react';
import{ letters } from './helpers/letters';
import './App.css'
import { HangImage } from './components/HangImage';
import { getRaandomWord } from './helpers/getRandomWord';

function App() {

  const [word, setWord] = useState(getRaandomWord());
  const [hiddenword, setHiddenword] = useState('- '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [ lose, setLose ] = useState ( false );
  const [ won, setWom ] = useState ( false );

  // Determinar si la persona perdió  
  useEffect( () => {
    if (attempts >= 9){
      setLose(true);
    }

  }, [attempts] ); //hooks 

  // Determinar si la persona ganó
  useEffect( () => {
  //console.log(hiddenword);
  const currentHiddenWord = hiddenword.split(' ').join('');
  if ( currentHiddenWord === word )
    setWom(true);

  }, [hiddenword] ); //hooks 



  const checkLetter = (letter: string) =>{

    if ( lose ) return;
    if ( won ) return;

    if (!word.includes(letter)){
      setAttempts(Math.min(attempts + 1,9) );
      return
    }

    const hiddenWordArray = hiddenword.split(' ');
    
    for( let i = 0; i < word.length; i++ ){
        if (word[i] === letter){
          hiddenWordArray[i] = letter;
        };
    }

    setHiddenword( hiddenWordArray.join(' ') );
    
  };


  const newGame = () => {
    const newWord = getRaandomWord();

    setWord(newWord);
    setHiddenword('_ '.repeat( newWord.length));
    setAttempts(0);
    setLose(false);
    setWom(false); 
  };

  //<div className="card"></div>
  return(
    <div className="App">

       {/* Imágenes */}
        <HangImage imageNumber={ attempts } />

      {/* Palabra Oculta */}
      <h3> {hiddenword} </h3>

      {/* Contador de Intentos */}
      <h3> Intentos: {attempts} </h3>
      {/*Mensaje si perdió */}
      {
        (lose) 
        ? <h2>Perdió {word}</h2>
        : ''
      }

      {/*Mensaje si ganó */}
      {
        (won) 
        ? <h2>Felicides Usted Ganó {word}</h2>
        : ''
      }


      {/* Botones de Letras */}
      {
        letters.map( (letter) => (
          <button 
            onClick={() => checkLetter(letter) }
            key = { letter }>
              { letter }
          </button>
        ) )
      }

      <br /> <br />
      <button onClick={ newGame}>¿Nuevo Juego?</button>

    </div>
  )
}

export default App
