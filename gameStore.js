* { box-sizing: border-box; }
body { margin: 0; background: #0d0805; font-family: 'Courier New', monospace; color: #ece1c4; }

.stage {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #2b1c12 0%, #4a2f1c 55%, #2b1c12 100%);
  border-left: 4px solid #8a6d33;
  border-right: 4px solid #8a6d33;
  padding: 16px;
}

.title-screen, .ending-screen { text-align: center; padding-top: 40px; }
.title-screen h1 { color: #c9a24b; letter-spacing: 2px; }

.btn {
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 8px auto;
  padding: 10px 18px;
  background: linear-gradient(180deg, #c9a24b, #8a6d33);
  color: #231a12;
  border: 2px solid #1a1410;
  font-weight: bold;
  cursor: pointer;
}

.scene {
  border: 2px solid #8a6d33;
  padding: 16px;
  margin-bottom: 12px;
  min-height: 160px;
}

.stand-row { display: flex; justify-content: space-between; font-size: 11px; color: #cfc09a; }

.dialogue-box {
  background: #150c06;
  border-top: 3px solid #c9a24b;
  padding: 12px;
  min-height: 90px;
}
.speaker { color: #c9a24b; font-weight: bold; font-size: 12px; }

.verdict-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
.verdict-grid button {
  background: #3a2a1a;
  border: 2px solid #8a6d33;
  color: #ece1c4;
  padding: 12px 4px;
  cursor: pointer;
}
