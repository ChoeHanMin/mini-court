import { useState, useMemo } from 'react';
import { useGameStore } from './store/gameStore.js';
import { verdictLabel } from './logic/judge.js';
import Scene from './components/Scene.jsx';
import DialogueBox from './components/DialogueBox.jsx';
import VerdictPanel from './components/VerdictPanel.jsx';
import './App.css';

// 이 컴포넌트는 원본 HTML 버전의 전체 기능(사운드/픽셀아트/설정/기록 등)을
// 다 옮긴 것이 아니라, "사건 진행 → 판결 → 결과" 라는 핵심 루프만
// React + zustand 구조로 옮겨본 시작점입니다.

function buildDialogueQueue(c) {
  const q = [];
  q.push({ speaker: '나레이션', text: c.intro });
  q.push({ speaker: '검사', text: c.prosOpen });
  q.push({ speaker: '변호인', text: c.defOpen });
  c.rounds.forEach((r) => {
    q.push({ speaker: '검사', text: r.p });
    q.push({ speaker: '변호인', text: r.d });
  });
  q.push({ speaker: '검사 (구형)', text: c.prosFinal });
  q.push({ speaker: '변호인 (최후 변론)', text: c.defFinal });
  q.push({ speaker: '피고인', text: c.finalStatement });
  return q;
}

export default function App() {
  const [screen, setScreen] = useState('title'); // title | dialogue | verdict | result | ending
  const [dlgPos, setDlgPos] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [needsYears, setNeedsYears] = useState(false);
  const [years, setYears] = useState(1);

  const { cases, caseIdx, currentCase, suspicion, startGame, nextCase, submitVerdict } = useGameStore();

  const dlgQueue = useMemo(() => (currentCase ? buildDialogueQueue(currentCase) : []), [currentCase]);

  function handleStart() {
    startGame();
    const c = nextCase();
    setDlgPos(0);
    setScreen(c ? 'dialogue' : 'ending');
  }

  function handleNextLine() {
    if (dlgPos + 1 < dlgQueue.length) {
      setDlgPos(dlgPos + 1);
    } else {
      setScreen('verdict');
    }
  }

  function handleVerdict(type) {
    if (type === '징역' && !needsYears) {
      setNeedsYears(true);
      return;
    }
    const outcome = submitVerdict(type, type === '징역' ? years : null);
    setLastResult({ type, years, outcome });
    setNeedsYears(false);
    setScreen('result');
  }

  function handleNextCase() {
    const c = nextCase();
    setDlgPos(0);
    setScreen(c ? 'dialogue' : 'ending');
  }

  if (screen === 'title') {
    return (
      <div className="stage title-screen">
        <h1>미니법정 (React WIP)</h1>
        <p style={{ fontSize: 12, color: '#cfc09a' }}>
          원본 HTML 버전의 판정 로직을 React 구조로 옮기는 중입니다.
        </p>
        <button className="btn" onClick={handleStart}>재판 시작</button>
      </div>
    );
  }

  if (screen === 'ending') {
    return (
      <div className="stage ending-screen">
        <h1>재판 종료</h1>
        <p>최종 시민의심: {suspicion}/5</p>
        <button className="btn" onClick={() => setScreen('title')}>처음으로</button>
      </div>
    );
  }

  return (
    <div className="stage">
      <div style={{ fontSize: 11, color: '#c9a24b', marginBottom: 8 }}>
        {currentCase?.title} ({caseIdx + 1}/{cases.length}) · 시민의심 {suspicion}/5
      </div>
      <Scene currentCase={currentCase} />

      {screen === 'dialogue' && (
        <DialogueBox
          speaker={dlgQueue[dlgPos].speaker}
          text={dlgQueue[dlgPos].text}
          onNext={handleNextLine}
        />
      )}

      {screen === 'verdict' && !needsYears && (
        <VerdictPanel onSelect={handleVerdict} />
      )}

      {screen === 'verdict' && needsYears && (
        <div>
          <p>징역 연수: {years}년</p>
          <input
            type="range" min="1" max="50" value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <button className="btn" onClick={() => handleVerdict('징역')}>선고 확정</button>
        </div>
      )}

      {screen === 'result' && lastResult && (
        <div>
          <p>선고: {verdictLabel(lastResult.type, lastResult.years)}</p>
          <p>결과: {lastResult.outcome.kind}</p>
          <button className="btn" onClick={handleNextCase}>다음 사건으로</button>
        </div>
      )}
    </div>
  );
}
