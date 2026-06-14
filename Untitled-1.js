// Added invisible audio tags in return statement
<audio id="beep-audio" src="/beep.mp3" preload="auto" loop />
<audio id="love-audio" src="/Loveyou.m4a" preload="auto" />

// Fixed NO button with direct handler
<button
  onClick={() => {
    setStage(4);
    startVirusBomb();
  }}
  style={{ zIndex: 10000 }}
>
  NO
</button>

// Higher z-index for Stage 3 dialog
zIndex: 9999