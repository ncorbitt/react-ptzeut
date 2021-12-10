import React, { useState, useEffect } from 'react';
import './style.css';
import styled from 'styled-components';

import { Random } from '@styled-icons/fa-solid/Random';
import { ThumbsUp } from '@styled-icons/fa-solid/ThumbsUp';
import { ErrorAlt } from '@styled-icons/boxicons-regular/ErrorAlt';

const BrownThumbsUp = styled(ThumbsUp)`
  color:var(--white);
`;

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
const CountCopyContainer = styled.section``;
const Buttons = styled.section``;

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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // console.log('list', list);
  }, [list]);

  // useEffect(() => {
  //   if (!copied) {
  //     let c = document.querySelector('.copied-container');
  //     c.classList.remove('animate');
  //   }

  //   if (copied === true) {
  //     let c = document.querySelector('.copied-container');
  //     c.classList.add('animate');
  //     // setCopied(false);
  //   }
  // }, [copied]);

  function addWord(word) {
    setList((list) => {
      if (list.includes(word) || !word) {
        return list;
      } else {
        return [...list, word.trim()];
      }
    });
  }

  function addDataToList(data) {
    // let m = { v: /(?:(\w+)(?=[\s,]|$))/gim };
    let m = { v: /(.*?)(?:,|\n|$)/gim };

    let matchAll = data.matchAll(m.v);

    // if there is no data
    if (!data) {
      console.log(`Theres no data, returning`);
      return;
    }

    // Test stuff

    // Add words to our list
    for (let match of matchAll) {
      addWord(match[1]);
    }
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

    const n = allText.toString().replace(/[,\d]/gim, '');

    clipBoard.writeText(n).then(
      function () {
        alert('Copied!');
        // setCopied(true);
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
    return (
      <WordSection
        className="main-list keyword"
        id={keyword}
        key={keyword}
        style={{ marginBottom: 10 }}
      >
        <Word className="word" key={`word-${keyword}`}>
          {`"${keyword}"`} <br /> {`[${keyword}]`}
        </Word>
        <Word
          id="word-length"
          className="word-length"
          style={{ fontSize: '2em' }}
        >
          {keyword.split('').length}
        </Word>
      </WordSection>
    );
  }

  function CreateNewWordSection({ keyword }) {
    return (
      <WordSection
        className="main-list keyword"
        id={keyword}
        key={keyword}
        style={{ marginBottom: 10 }}
      >
        <Word className="word" key={`word-${keyword}`}>
          {`"${keyword}"`} <br /> {`[${keyword}]`}
        </Word>
      </WordSection>
    );
  }

  function RegularTextarea() {
    return (
      <textarea
        style={{ height: `${s.height}px` }}
        id="input-textarea"
        onFocus={() => setNull(false)}
        onBlur={(e) => {
          if (!e.target.value) clearList();
          addDataToList(e.target.value);
        }}
      ></textarea>
    );
  }
  function NewTextarea() {
    return (
      <textarea
        style={{ height: `${s.height}px` }}
        id="input-textarea"
        onFocus={() => setNull(false)}
        onBlur={(e) => {
          if (!e.target.value) clearList();
          addDataToList(e.target.value);
        }}
      ></textarea>
    );
  }

  function phraseAndExact() {
    const words = Array.from(document.querySelectorAll('.word'));
    words.forEach((tag, index) => {
      tag.innerHTML = `"${list[index]}" <br/> [${list[index]}]`;
    });
  }

  function exact() {
    const words = Array.from(document.querySelectorAll('.word'));

    words.forEach((tag, index) => {
      tag.innerHTML = `[${list[index]}]`;
    });
  }

  function phrase() {
    const words = Array.from(document.querySelectorAll('.word'));
    words.forEach((tag, index) => {
      tag.innerHTML = `"${list[index]}"`;
    });
  }
  function Copied() {
    return (
      <section className="copied-container">
        <BrownThumbsUp size="24" />
        <p className="copied-text">COPIED!</p>
      </section>
    );
  }

  return (
    <main>
      <section className="container">
        <section className="main-main">
          <Input className="main-input">
            <Buttons className="buttons">
              <h3
                className="main-btn btn-phrase"
                onClick={() => phraseAndExact()}
              >
                Phrase and Exact
              </h3>
              <h3 className="main-btn btn-phrase" onClick={() => phrase()}>
                Phrase only
              </h3>
              <h3 className="main-btn btn-exact" onClick={() => exact()}>
                Exact only
              </h3>
              <h3 className="main-btn btn-remove" onClick={() => clearList()}>
                Clear
              </h3>
            </Buttons>
            <FlexWrapper className="wrapper wrapper-input">
              <RegularTextarea />
            </FlexWrapper>
          </Input>

          <Output className="main-output">
            <Copied />
            <CountCopyContainer className="count-copy-container">
              <h3>
                COUNT: <span style={{ fontSize: '2em' }}>{list.length}</span>
              </h3>
              <h3
                className="main-btn btn-copy"
                style={{ display: list.length === 0 ? 'none' : 'block' }}
                onClick={() => copyToClipBoard()}
              >
                Copy
              </h3>
            </CountCopyContainer>
            <FlexWrapper className="wrapper">
              <Content className="main-output-liner content">
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
