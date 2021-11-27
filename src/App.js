import React, { useState, useEffect } from 'react';
import './style.css';

import { Random } from '@styled-icons/fa-solid/Random';
import { ErrorAlt } from '@styled-icons/boxicons-regular/ErrorAlt';

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
  const [dataList, setDataList] = useState([]);
  const [isNull, setNull] = useState(false);

  useEffect(() => {
    console.log('dataList', dataList);
  }, [dataList]);

  function addData(word) {
    setDataList((dataList) => {
      // console.log('add-data -> ', word);

      if (dataList.includes(word)) {
        return dataList;
      } else {
        return [...dataList, word];
      }
    });
  }

  function addDataToList(data) {
    let matchTypes = {
      spaces: /\s+/gim,
      // commas: /[,]/gmi,
      commas: /(\w+[-]?\w+,\s*|(?<=,\s*)\w+-\w+)/gim,
      newLines: /[\n]/gim,
      wordWithSpacesOnOneLine: /\w+ \w+/gim,
      verify: /\w+.*\w+[\s+ \n+ ,]|(?<=[, \s+ \n+])\w+-\w+$/gim,
    };

    // if there is no data
    if (!data) return;

    // Test stuff here
    //

    console.log('Logged', data);
    console.log('Logged', data.match(matchTypes.verify));
    if (data.match(matchTypes.verify) === null) {
      setNull(true);
      return;
    }

    data.match(matchTypes.verify).forEach((word, index, arr) => {
      if (word.includes('\n')) {
        // console.log('new-line -> ', word.split('\n')[0]);
        addData(word.split('\n')[0]);
      } else if (word.includes(',')) {
        // console.log('commas -> ', word.split(',')[0]);
        addData(word.split('\n')[0]);
      } else if (word.split(' ')) {
        // console.log('spaces -> ', word.split(' ')[0]);
        addData(word.split(' ')[0]);
      } else {
        return;
      }
    });
  }

  const clear = () => {
    setDataList([]);
  };

  function copyToClipBoard() {
    const clipBoard = navigator.clipboard;

    let arr = Array.from(document.getElementsByClassName('main-list'));
    const allText = arr.map((text, index) => {
      return `${text.outerText} \n\n`;
    });

    const n = allText.toString().replace(/[,]/gim, '');

    clipBoard.writeText(n).then(
      function () {
        alert('successful copy');
      },
      function (e) {
        alert('error', e);
      }
    );
  }

  function readClipBoard() {
    const clipBoard = navigator.clipboard;
    clipboard.readText().then((text) => alert(text));
  }

  function exact() {}
  function phrase() {}

  return (
    <main>
      <section className="container">
        <section className="main-main">
          <section className="main-input">
            <section className="main-input-liner">
              <section className="list-info">
                {/* <p>comma seperated list okay: item, item, item</p> */}
                <p
                  className="error"
                  style={{ display: isNull ? 'block' : 'none' }}
                >
                  {' '}
                  <ErrorAlt size="24" /> &nbsp; The data is not in the right
                  format.
                </p>
              </section>
              <section className="main-btn-type">
                <section className="main-btn btn-phrase">Phrase only</section>
                <section className="main-btn btn-exact">Exact only</section>
                <section
                  className="main-btn btn-remove"
                  onClick={() => {
                    clear();
                  }}
                >
                  Remove items
                </section>
              </section>
              <textarea
                id="input-textarea"
                onFocus={() => setNull(false)}
                onBlur={(e) => {
                  if (!e.target.value) clear();
                  addDataToList(e.target.value);
                }}
              ></textarea>
            </section>
          </section>
          <section className="main-output">
            <section className="main-output-liner">
              <section
                className="main-btn btn-copy"
                onClick={() => copyToClipBoard()}
              >
                Copy
              </section>
              {dataList.map((word, index) => {
                return (
                  <section
                    className="main-list"
                    id={word}
                    key={word}
                    style={{ marginBottom: 10 }}
                  >
                    {' '}
                    <span style={{ fontSize: '1em' }}>
                      {' '}
                      {`"${word}"`} <br /> {`[${word}]`}
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
