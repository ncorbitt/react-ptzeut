import React, { useState, useEffect } from 'react';
import './style.css';
import styled from 'styled-components';

import { Random } from '@styled-icons/fa-solid/Random';
import { ErrorAlt } from '@styled-icons/boxicons-regular/ErrorAlt';

const s = {
  height: 450,
};

// Styled Tags
const FlexWrapper = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: ${s.height}px;
  border-radius: 7px;
  color: var(--white);
  overflow-y: auto;
`;

const CopyButton = styled.span``;
const Output = styled.section``;
const Input = styled.section``;
const Content = styled.section``;
const WordSection = styled.section``;
const Word = styled.span``;

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
      <section className="header-container">
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
  const [list, setList] = useState([]);
  const [isNull, setNull] = useState(false);

  useEffect(() => {
    console.log('list', list);
  }, [list]);

  function addWord(word) {
    setList((list) => {
      if (list.includes(word)) {
        return list;
      } else {
        return [...list, word];
      }
    });
  }

  function addDataToList(data) {
    let m = {
      verify: /(?:.*?[\n\s,]+)/gim,
    };

    // if there is no data
    if (!list) return;

    // Test stuff here

    if (data.match(m.verify) === null) {
      console.log('Data Null');
      setNull(true);
      return;
    }

    data.match(m.verify).forEach((word, index, arr) => {
      // trim the word of any extra spaces
      addWord(word.trim());
    });
  }

  const clearList = () => {
    setList([]);
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

  function CreateWordSection({ keyword }) {
    console.log('keyword', keyword);
    return (
      <WordSection
        className="main-list keyword"
        id={keyword}
        key={keyword}
        style={{ marginBottom: 10 }}
      >
        <Word className="word">
          {`"${keyword}"`} <br /> {`[${keyword}]`}
        </Word>
      </WordSection>
    );
  }

  function exact() {}
  function phrase() {}

  return (
    <main>
      <section className="container">
        <section className="main-main">
          <Input className="main-input">
            {/* <section className="main-btn-type">
                <section className="main-btn btn-phrase">Phrase only</section>
                <section className="main-btn btn-exact">Exact only</section>
                <section
                  className="main-btn btn-remove"
                  onClick={() => {
                    clearList();
                  }}
                >
                  Remove items
                </section>
              </section> */}
            <FlexWrapper
              className="wrapper wrapper-input"
              style={{ overflow: 'hidden' }}
            >
              <textarea
                style={{ height: `${s.height}px` }}
                id="input-textarea"
                onFocus={() => setNull(false)}
                onBlur={(e) => {
                  if (!e.target.value) clearList();
                  addDataToList(e.target.value);
                }}
              ></textarea>
            </FlexWrapper>
          </Input>

          <Output className="main-output">
            <FlexWrapper className="wrapper">
              <Content className="main-output-liner content">
                <CopyButton
                  className="main-btn btn-copy"
                  onClick={() => copyToClipBoard()}
                >
                  Copy
                </CopyButton>
                {list.map((keyword, index) => (
                  <CreateWordSection
                    keyword={keyword}
                    onBlur={(e) => addDataToList(e.target.value)}
                  />
                ))}
              </Content>
            </FlexWrapper>
          </Output>
        </section>
      </section>
    </main>
  );
}
