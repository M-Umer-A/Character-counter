import React, { useState } from 'react';
import './WordCounter.css';

function App() {
  const [Text, setText] = useState("");
  const [Sentences, setSentences] = useState(0);
  const [Characters, setCharacters] = useState(0);
  const [history, setHistory] = useState("")

  function HandleTextChange(e) {
    const InputText = e.target.value;
    setText(InputText);
    

    const character = InputText.replace(/\s+/g, '');
    setCharacters(character.length);

    const sentence = InputText.trim().split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    setSentences(sentence.length);
    
  }

  return (
    <div className="Container">
      <div className="Container_middle">
        <div className="right">
          <textarea
            placeholder="Type or paste text here..."
            rows="6"
            className="text-input"
            value={Text}
            onChange={HandleTextChange}
          />
          <div className="button-div">
            <button className="button-65" onClick={() => {
              setText("");
              setCharacters(0);
              setSentences(0);
            }}>
              Delete
            </button>
          </div>
          
            <button className="button-65" onClick={()=>{
              setHistory(InputText);
            }}>
            Show History
            </button>
            <button className="button-65" onClick={()=>{
              setHistory("");
            }}>
            Clear history
            </button>
          
        </div>
        <div className="left">
          <div className="Container_middle_para">
            <h1>Results</h1>
          </div>
          <div className="flex-container">
            <div>
              <p><strong>Characters: </strong>{Characters}</p>
            </div>
            <div>
              <p><strong>Sentences: </strong>{Sentences}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
