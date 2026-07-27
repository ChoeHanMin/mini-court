export default function DialogueBox({ speaker, text, onNext }) {
  return (
    <div className="dialogue-box" onClick={onNext} style={{ cursor: 'pointer' }}>
      <div className="speaker">{speaker}</div>
      <div style={{ fontSize: 14, lineHeight: 1.5, marginTop: 6 }}>{text}</div>
      <div style={{ fontSize: 10, color: '#c9a24b', textAlign: 'right', marginTop: 8 }}>
        ▶ 탭하여 계속
      </div>
    </div>
  );
}
