import React, { useState, useEffect } from 'react';
import './style.css';

import { Random } from '@styled-icons/fa-solid/Random';

export default function App() {
  return (
    <div>
      <Header title="Phrase | Exact Match Generator" />
      <MainContent />
    </div>
  );
}

function Header({ title }) {
  return (
    <header>
      <section className="container">
        <section className="header-main">
          <section className="header-title">
            <Random size="24" style={{ marginRight: 3, marginTop: '-3px' }} />{' '}
            {title}
          </section>
          {/* <nav className="header-nav"> <h1>Nav</h1> </nav> */}
        </section>
      </section>
    </header>
  );
}

function MainContent() {
  const [group, setGroup] = useState([]);
  useEffect(() => {}, [group]);

  function addToGroup(data) {
    const type = {
      comma: data.split(','),
      space: data.split(' '),
      newLine: data.split('\n'),
    };

    if (!data) setGroup([]);

    if (data.includes(',')) {
      // console.log('comma');
      // check if the whole string has comma

      console.log(type.comma);
    } else if (data.includes('\n')) {
      type.newLine.forEach((word) => {
        let wordType = {
          phraseMatch: `"${word}"`,
          exactMatch: `[${word}]`,
        };

        setGroup((array) => {
          return [...array, wordType];
        });
      });
    } else {
      return;
    }
  }

  function exact() {
    
  }

  return (
    <main>
      <section className="container">
        <section className="main-main">
          <section className="main-input">
            <p>comma seperated or new line items</p>
            <section className="main-btn-type">
              <span className="main-btn" onClick={() => }>Phrase only</span>
              <span className="main-btn"  onClick={() => }>Exact only</span>
            </section>
            <textarea onBlur={(e) => addToGroup(e.target.value)}></textarea>
          </section>
          <section className="main-output">
            {/* <h1>OUTPUT</h1> */}
            <section>
              {group.map((word, index) => {
                return (
                  <section id={word} key={word} style={{ marginBottom: 10 }}>
                    {' '}
                    <span style={{ fontSize: '1.5em' }}>
                      {' '}
                      {word.phraseMatch} <br /> {word.exactMatch}
                    </span>{' '}
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
