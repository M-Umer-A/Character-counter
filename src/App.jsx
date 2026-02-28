import React, { useState } from 'react';
import './WordCounter.css';

function App() {
  const [Text, setText] = useState("");
  const [Sentences, setSentences] = useState(0);
  const [Characters, setCharacters] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  function HandleTextChange(e) {
    const InputText = e.target.value;
    setText(InputText);

    const character = InputText.replace(/\s+/g, '');
    setCharacters(character.length);

    const sentence = InputText.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
    setSentences(InputText.trim() === "" ? 0 : sentence.length);
  }

  function handleSaveHistory() {
    if (Text.trim() === "") return;
    const entry = {
      id: Date.now(),
      text: Text,
      characters: Characters,
      sentences: Sentences,
      savedAt: new Date().toLocaleTimeString(),
    };
    setHistory(prev => [entry, ...prev]);
  }

  function handleClearHistory() {
    setHistory([]);
    setShowHistory(false);
  }

  function handleDelete() {
    setText("");
    setCharacters(0);
    setSentences(0);
  }

  return (
    <div className="Container">
      <h1 className="app-title">Word Counter</h1>

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
            <button className="button-65 btn-delete" onClick={handleDelete}>
              🗑 Clear
            </button>
            <button className="button-65 btn-save" onClick={handleSaveHistory}>
              💾 Save
            </button>
            <button className="button-65 btn-history" onClick={() => setShowHistory(prev => !prev)}>
              {showHistory ? "Hide History" : "📋 History"}
            </button>
            <button className="button-65 btn-clear-history" onClick={handleClearHistory}>
              Clear History
            </button>
          </div>
        </div>

        
        <div className="left">
          <div className="Container_middle_para">
            <h1>Results</h1>
          </div>
          <div className="flex-container">
            <div className="result-card">
              <p className="result-number">{Characters}</p>
              <p className="result-label">Characters</p>
            </div>
            <div className="result-card">
              <p className="result-number">{Sentences}</p>
              <p className="result-label">Sentences</p>
            </div>
            <div className="result-card">
              <p className="result-number">{Text.trim() === "" ? 0 : Text.trim().split(/\s+/).length}</p>
              <p className="result-label">Words</p>
            </div>
          </div>
        </div>
      </div>

      
      {showHistory && (
        <div className="history-panel">
          <h2>Saved History</h2>
          {history.length === 0 ? (
            <p className="no-history">No saved entries yet. Type something and click Save!</p>
          ) : (
            history.map(entry => (
              <div key={entry.id} className="history-entry">
                <div className="history-meta">
                  <span>{entry.savedAt}</span>
                  <span>{entry.characters} chars &nbsp;|&nbsp; {entry.sentences} sentences &nbsp;|&nbsp; {entry.text.trim().split(/\s+/).length} words</span>
                </div>
                <p className="history-text">"{entry.text.length > 120 ? entry.text.slice(0, 120) + "..." : entry.text}"</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;