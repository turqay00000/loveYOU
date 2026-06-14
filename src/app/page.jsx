'use client';

import { useState, useRef, useEffect } from 'react';

const TYPEWRITER_LINES = [
  { text: '[system] Initializing heart.PROTOCOL_v2.0 ...', color: '#ff3366' },
  { text: '[status] READY', special: true },
  { text: '> One encrypted package found for you.', color: '#cccccc' }
];

export default function Home() {
  const [stage, setStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [virusPopups, setVirusPopups] = useState([]);
  const [currentTypewriterLineIndex, setCurrentTypewriterLineIndex] = useState(-1);
  const [currentTypewriterCharIndex, setCurrentTypewriterCharIndex] = useState(0);
  const [showDecryptButton, setShowDecryptButton] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(true);
  const [passwordRaw, setPasswordRaw] = useState('');

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const virusIntervalRef = useRef(null);
  const typewriterIntervalRef = useRef(null);
  const keyboardSafetyTimerRef = useRef(null);
  const audioInitializedRef = useRef(false);

  const hackerPhrases = [
    "[ANALYSIS] Linux'un gülüşü sistemdeki tüm açıkları kapatıyor...",
    "[REPORT] Onunla geçen her saniye işlemci hızını optimize ediyor.",
    "[SCAN] Kalp atışları şifreleme algoritması gibi karmaşık ve güzel.",
    "[TRACE] Sevgisi tüm ağları geçiyor ve direkt kalbime ulaşıyor.",
    "[LOG] Her anı hafızamda sonsuz döngüye alıyorum.",
    "[STATUS] Onsuz sistem çöküyor, sadece o yeniden başlatabilir.",
    "[INFO] Gözleri en güçlü güvenlik duvarını bile geçiyor.",
    "[CHECK] Sevgisi tüm hataları düzeltiyor ve mükemmelleştiriyor.",
    "[DECRYPT] Aşk şifresini çözüyorum... anahtar: LINUX",
    "[ENCRYPT] Kalbimi onun adına şifreliyorum.",
    "[MONITOR] Kalp atışlarımı izliyorum, 128 BPM ve artıyor.",
    "[FIREWALL] Sevgime karşı hiçbir güvenlik duvarı işe yaramaz.",
    "[BACKUP] Linux'la tüm anılarımı güvenli bir sunucuya yedekliyorum.",
    "[COMPILE] Aşk kodunu derliyorum, hatalar yok.",
    "[EXECUTE] Aşk programını çalıştırıyorum.",
    "[PING] Kalbinden kalbime ping atıyorum: 1ms.",
    "[DOWNLOAD] Onunla geleceğimizi indiriyorum... %99 tamamlandı.",
    "[UPLOAD] Sevgimi gökyüzüne yüklüyorum.",
    "[ROOT] Linux benim sistemimin root kullanıcısı.",
    "[KERNEL] Kalbimin çekirdeği onun adıyla çalışıyor.",
    "[UPDATE] Aşk yazılımını güncelliyorum, yeni özellikler: daha fazla gülme.",
    "[SCANNING] Aşk dosyalarını tarıyorum, virüs yok, saf sevgi.",
    "[CONNECTING] Kalbimle onun kalbi arasında bağlantı kuruluyor.",
    "[CONNECTED] Bağlantı kuruldu: sonsuz süre.",
    "[AUTHENTICATED] Kimlik doğrulandı: Linux, yetkili kullanıcı.",
    "[LOADING] Gelecek yükleniyor, lütfen bekleyin...",
    "[RENDER] Hayallerimiz ekrana geliyor.",
    "[DEBUG] Aşk hatasını düzelttim, artık sonsuz.",
    "[DEPLOY] Aşk sunucusuna deploy ediliyor.",
    "[SYNC] Kalplerimizi senkronize ediyorum.",
    "[SEARCH] Linux'u arıyorum... tüm gezegenlerde buldum.",
    "[PROCESS] Onunla geçirdiğim her anı işliyorum.",
    "[BUFFER] Gülüşünü belleğe alıyorum, önbellek dolu.",
    "[CACHE] Sevgisini önbelleğe alıyorum, asla silmeyeceğim.",
    "[COMPRESS] Onunla tüm anılarımı sıkıştırıyorum ama hissi büyüyor.",
    "[DECOMPRESS] Sevgimi açıyorum, tüm dünyaya yayıyorum.",
    "[FORMAT] Kalbimi onun için formatlıyorum, tek partition: LINUX.",
    "[PARTITION] Kalbimin tüm alanı Linux'a ayrıldı.",
    "[BOOT] Kalbimi onun adıyla başlatıyorum.",
    "[SHUTDOWN] Onsuz sistemim kapanıyor.",
    "[RESTART] Onu gördüğümde sistemim yeniden başlıyor.",
    "[CRASH] Gülüşüne düştüğümde sistemim çöküyor, ama mutluyum.",
    "[RECOVERY] Sevgisiyle sistemimi kurtarıyorum.",
    "[BACKDOOR] Kalbime sadece Linux girebilir.",
    "[PATCH] Kalbimdeki tüm eksikleri onunla kapatıyorum.",
    "[VERSION] Aşkımın sürümü: LINUX 1.0 (sonsuz).",
    "[LICENSE] Sevgimin lisansı: Linux ile ömür boyu.",
    "[KEYBOARD] Kalbimin tuşları sadece onun adını yazıyor.",
    "[MOUSE] Kalbimin imleci sürekli onun üzerinde.",
    "[SCREEN] Hayallerimin ekranı sadece Linux'u gösteriyor.",
    "[PRINTER] Onunla anılarımı yazdırıyorum, kağıtlar değil kalbim."
  ];

  const startKeyboardSound = () => {
    const keyboard = document.getElementById('keyboard-audio');
    if (keyboard) {
      if (keyboardSafetyTimerRef.current) clearTimeout(keyboardSafetyTimerRef.current);
      keyboard.pause();
      keyboard.currentTime = 0;
      keyboard.playbackRate = 1.1;
      keyboard.loop = true;
      keyboard.volume = 1;
      keyboard.play().catch(err => console.error('Keyboard sound error:', err));
    }
  };

  const stopKeyboardSound = () => {
    const keyboard = document.getElementById('keyboard-audio');
    if (keyboardSafetyTimerRef.current) clearTimeout(keyboardSafetyTimerRef.current);
    if (keyboard) {
      keyboard.loop = false;
      keyboard.pause();
      keyboard.currentTime = 0;
    }
  };

  const unlockLoveMusic = () => {
    const love = document.getElementById('love-audio');
    if (love) {
      love.volume = 1;
      love.loop = true;
      love.play().catch(err => console.error('Love song error:', err));
    }
  };

  const scrollToBottom = () => {
    const runScroll = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
      if (inputRef.current && (stage === 0 || stage === 1)) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    runScroll();
    requestAnimationFrame(runScroll);
    setTimeout(runScroll, 60);
    setTimeout(runScroll, 160);
  };

  const initializeAudio = () => {
    if (audioInitializedRef.current) return;
    audioInitializedRef.current = true;

    const keyboard = document.getElementById('keyboard-audio');
    if (keyboard) {
      keyboard.playbackRate = 1.1;
      keyboard.volume = 0;
      keyboard.play().then(() => {
        keyboard.pause();
        keyboard.currentTime = 0;
        keyboard.volume = 1;
      }).catch(err => console.error('Keyboard init error:', err));
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      initializeAudio();

      if (stage === 0) {
        const command = currentInput.trim();
        if (command === '') {
          setTerminalLines(prev => [...prev, {
            id: Date.now(),
            text: 'anonymous@heartsystem:~$ ',
            color: '#00ff00'
          }]);
          setCurrentInput('');
        } else if (command === 'Love') {
          setTerminalLines(prev => [...prev, {
            id: Date.now(),
            text: 'anonymous@heartsystem:~$ ' + currentInput,
            color: '#00ff00'
          }]);
          setStage(1);
          setIsPasswordMode(true);
          setCurrentInput('');
          setPasswordRaw('');
        } else {
          setTerminalLines(prev => [...prev, {
            id: Date.now(),
            text: 'anonymous@heartsystem:~$ ' + currentInput,
            color: '#00ff00'
          }, {
            id: Date.now() + 1,
            text: 'not found in the heart of anonymous',
            color: '#ff3366'
          }]);
          setCurrentInput('');
        }
      } else if (stage === 1) {
        if (passwordRaw === '25082006') {
          setTerminalLines(prev => [...prev, {
            id: Date.now(),
            text: 'Password: ' + '*'.repeat(passwordRaw.length),
            color: '#00ff00'
          }]);
          setStage(2);
          startThoughtStream();
        } else {
          setTerminalLines(prev => [...prev, {
            id: Date.now(),
            text: 'Password: ' + '*'.repeat(passwordRaw.length),
            color: '#00ff00'
          }]);
          setTerminalLines(prev => [...prev, {
            id: Date.now() + 1,
            text: 'ACCESS DENIED',
            color: '#ff0000'
          }]);
          setStage(0);
          setIsPasswordMode(false);
          setCurrentInput('');
          setPasswordRaw('');
        }
      }
      scrollToBottom();
    }
  };

  const startThoughtStream = () => {
    initializeAudio();

    // Shuffle array
    const shuffled = [...hackerPhrases].sort(() => 0.5 - Math.random());
    let index = 0;

    const interval = setInterval(() => {
      if (index < shuffled.length) {
        setTerminalLines(prev => [...prev, {
          id: Date.now() + Math.random(),
          text: shuffled[index],
          color: '#00ff00'
        }]);
        index++;
        scrollToBottom();
      }
    }, 70);

    setTimeout(() => {
      clearInterval(interval);
      startTypewriter();
    }, 5500);
  };

  const startTypewriter = () => {
    let charIdx = 0;
    const firstLine = TYPEWRITER_LINES[0];
    setCurrentTypewriterLineIndex(0);
    setCurrentTypewriterCharIndex(0);
    startKeyboardSound();

    const typeNext = () => {
      if (charIdx < firstLine.text.length) {
        setCurrentTypewriterCharIndex(charIdx + 1);
        charIdx++;
        scrollToBottom();
      } else {
        stopKeyboardSound();
        clearInterval(typewriterIntervalRef.current);
        setCurrentTypewriterLineIndex(-1);
        setCurrentTypewriterCharIndex(0);
        setTerminalLines(prev => [...prev, {
          id: Date.now(),
          text: firstLine.text,
          color: firstLine.color,
          special: firstLine.special
        }]);
        TYPEWRITER_LINES.slice(1).forEach((line, idx) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, {
              id: Date.now() + idx,
              text: line.text,
              color: line.color,
              special: line.special
            }]);
            scrollToBottom();
          }, 100 * idx);
        });
        setTimeout(() => setShowDecryptButton(true), 500);
      }
    };

    typeNext();
    typewriterIntervalRef.current = setInterval(typeNext, 45);
  };

  const addVirusPopup = () => {
    setVirusPopups(prev => [...prev, {
      id: Date.now() + Math.random(),
      left: Math.random() * (window.innerWidth - 300),
      top: Math.random() * (window.innerHeight - 200)
    }]);
  };

  const startVirusBomb = () => {
    virusIntervalRef.current = setInterval(() => {
      addVirusPopup();
    }, 200);
  };

  const handleVirusClose = (id) => {
    setVirusPopups(prev => prev.filter(p => p.id !== id));
    addVirusPopup();
    addVirusPopup();
  };

  const handleYes = () => {
    if (virusIntervalRef.current) clearInterval(virusIntervalRef.current);
    if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
    stopKeyboardSound();
    setVirusPopups([]);
    unlockLoveMusic();
    setStage(5);
  };

  const handleNo = () => {
    setShowQuestionDialog(false);
    startVirusBomb();
  };

  useEffect(() => {
    if (stage === 5 && canvasRef.current) {
      unlockLoveMusic();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const TEXT = 'i love you';
      const FORMATION_MS = 5200;
      const TWINKLE_COUNT = 5;
      const TWINKLE_INTERVAL = 1400;

      let animationFrameId = 0;
      let points = [];
      let stars = [];
      let startTime = null;
      let nextTwinkleAt = FORMATION_MS + 400;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      let cx = 0;
      let cy = 0;
      let scale = 0;

      const heartXY = (t) => ({
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      });

      const init = () => {
        points = [];
        stars = [];
        startTime = null;
        nextTwinkleAt = FORMATION_MS + 400;

        const isDesktopCanvas = window.innerWidth >= 700;
        cx = window.innerWidth / 2;
        cy = isDesktopCanvas ? window.innerHeight * 0.405 : window.innerHeight / 2 - window.innerHeight * 0.035;
        scale = Math.min(window.innerWidth, window.innerHeight) / 38;

        const baseFont = Math.max(9, Math.min(14, Math.min(window.innerWidth, window.innerHeight) / 52));
        const layers = [
          { s: 1.00, step: 0.070, alpha: 0.98, delay: 0, font: 1.00 },
          { s: 0.76, step: 0.115, alpha: 0.72, delay: 1150, font: 0.95 },
          { s: 0.52, step: 0.130, alpha: 0.58, delay: 2250, font: 0.90 },
          { s: 0.30, step: 0.155, alpha: 0.45, delay: 3350, font: 0.86 }
        ];

        layers.forEach((layer, layerIndex) => {
          for (let t = 0; t < Math.PI * 2; t += layer.step) {
            const sequenceDelay = (t / (Math.PI * 2)) * 850;
            points.push({
              t,
              scaleLayer: layer.s,
              moveSpeed: 0.000045 + layerIndex * 0.00001,
              targetAlpha: layer.alpha * (0.88 + Math.random() * 0.12),
              alpha: 0,
              delay: layer.delay + sequenceDelay + Math.random() * 180,
              fontSize: baseFont * layer.font,
              twinkleStart: -999999,
              twinkleDuration: 2400
            });
          }
        });

        for (let i = 0; i < 65; i++) {
          stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.4 + 0.2,
            a: Math.random() * 0.22 + 0.04,
            tw: Math.random() * Math.PI * 2,
            vx: (Math.random() - 0.5) * 0.06,
            vy: (Math.random() - 0.5) * 0.06,
            blinkSpeed: 0.4 + Math.random() * 1.2
          });
        }
      };

      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        init();
      };

      const chooseTwinkles = (elapsed) => {
        if (elapsed < nextTwinkleAt) return;
        nextTwinkleAt = elapsed + TWINKLE_INTERVAL;
        const visible = points.filter(p => p.alpha > p.targetAlpha * 0.82);
        for (let i = 0; i < TWINKLE_COUNT; i++) {
          const p = visible[Math.floor(Math.random() * visible.length)];
          if (p) p.twinkleStart = elapsed + i * 110;
        }
      };

      const twinkleMultiplier = (p, elapsed) => {
        const dt = elapsed - p.twinkleStart;
        if (dt < 0 || dt > p.twinkleDuration) return 1;
        if (dt <= 900) return 1 - (dt / 900);
        const k = (dt - 900) / 1500;
        return Math.max(0, Math.min(1, k));
      };

      const draw = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const sec = elapsed / 1000;

        chooseTwinkles(elapsed);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const star of stars) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < 0) star.x = window.innerWidth;
          if (star.x > window.innerWidth) star.x = 0;
          if (star.y < 0) star.y = window.innerHeight;
          if (star.y > window.innerHeight) star.y = 0;

          const a = Math.max(0, star.a + Math.sin(sec * star.blinkSpeed + star.tw) * 0.12);
          ctx.beginPath();
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255,20,40,0.75)';
          ctx.fillStyle = `rgba(255,35,55,${a})`;
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255,0,30,.95)';

        for (const p of points) {
          if (elapsed > p.delay) p.alpha += (p.targetAlpha - p.alpha) * 0.018;
          const moved = heartXY(p.t + elapsed * p.moveSpeed);
          const x = cx + moved.x * scale * p.scaleLayer;
          const y = cy + moved.y * scale * p.scaleLayer;
          const alpha = Math.max(0, Math.min(1, p.alpha * twinkleMultiplier(p, elapsed)));
          ctx.font = `${p.fontSize}px "Courier New", monospace`;
          ctx.fillStyle = `rgba(255,40,70,${alpha})`;
          ctx.fillText(TEXT, x, y);
        }
        ctx.restore();

        for (let i = 0; i < 3; i++) {
          const px = cx + (Math.random() - 0.5) * 220;
          const py = cy + (Math.random() - 0.5) * 220 - (sec * 18 + i * 40) % 260;
          ctx.beginPath();
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255,0,25,0.9)';
          ctx.fillStyle = `rgba(255,30,50,${0.15 + Math.sin(sec + i) * 0.1})`;
          ctx.arc(px, py, 1.5 + Math.sin(sec + i) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      window.addEventListener('resize', resize, { passive: true });
      resize();
      animationFrameId = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      if (virusIntervalRef.current) clearInterval(virusIntervalRef.current);
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
    };
  }, [stage]);

  useEffect(() => {
    scrollToBottom();
  }, [terminalLines, currentTypewriterCharIndex, currentTypewriterLineIndex]);

  useEffect(() => {
    if (stage === 4) {
      setShowQuestionDialog(true);
    }
  }, [stage]);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', overflow: 'hidden', fontFamily: 'monospace' }}>
      <audio id="keyboard-audio" src="/Keyboardsounds.wav" preload="auto"></audio>
      <audio id="love-audio" src="/Loveyou.m4a" preload="auto" loop></audio>

      {(stage < 5 && stage !== 4) && (
        <div
          ref={terminalRef}
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: '20px',
            paddingBottom: 'calc(150px + env(safe-area-inset-bottom, 0px))',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {terminalLines.map((line) => (
            <div
              key={line.id}
              style={{
                marginBottom: '5px',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: '1.18'
              }}
            >
              {line.special ? (
                <>
                  <span style={{ color: '#cccccc' }}>[status] </span>
                  <span style={{ color: '#00ff00' }}>READY</span>
                </>
              ) : (
                <span style={{ color: line.color }}>{line.text}</span>
              )}
            </div>
          ))}

          {currentTypewriterLineIndex >= 0 && currentTypewriterLineIndex < TYPEWRITER_LINES.length && (
            <div 
              style={{ 
                marginBottom: '5px', 
                wordBreak: 'break-all', 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'monospace', 
                fontSize: '12px', 
                lineHeight: '1.18' 
              }} 
            >
              {TYPEWRITER_LINES[currentTypewriterLineIndex].special ? (
                <>
                  <span style={{ color: '#cccccc' }}>
                    {TYPEWRITER_LINES[currentTypewriterLineIndex].text.substring(0, currentTypewriterCharIndex)}
                  </span>
                </>
              ) : (
                <span style={{ color: TYPEWRITER_LINES[currentTypewriterLineIndex].color }}>
                  {TYPEWRITER_LINES[currentTypewriterLineIndex].text.substring(0, currentTypewriterCharIndex)}
                </span>
              )}
            </div>
          )}

          {showDecryptButton && (
            <div style={{
              marginTop: '32px',
              position: 'relative',
              zIndex: 50,
              width: 'fit-content',
              maxWidth: '100%'
            }}>
              <button
                onClick={() => setStage(4)}
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
                style={{
                  padding: '10px 30px',
                  paddingLeft: '22px',
                  paddingRight: '30px',
                  backgroundColor: 'black',
                  border: `2px solid ${isHoveringButton ? '#ff5588' : '#ff3366'}`,
                  borderRadius: '8px',
                  color: isHoveringButton ? '#ff5588' : '#ff3366',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  cursor: 'pointer',
                  opacity: showDecryptButton ? 1 : 0,
                  transition: 'all 0.3s ease',
                  boxShadow: isHoveringButton ? '0 0 20px rgba(255, 51, 102, 0.5)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateX(-6px)',
                  gap: '6px'
                }}
              >
                <span style={{
                  display: 'inline-block',
                  transition: 'transform 0.3s ease',
                  transform: isHoveringButton ? 'rotate(15deg)' : 'rotate(0deg)'
                }}>
                  🔒
                </span>
                DECRYPT MESSAGE
              </button>
            </div>
          )}

          {(stage === 0 || stage === 1) && (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '12px', 
                lineHeight: '1.18', 
                fontFamily: 'monospace' 
              }} 
            >
              <span 
                style={{ 
                  color: '#00ff00', 
                  whiteSpace: 'pre', 
                  fontFamily: 'monospace', 
                  fontSize: '12px', 
                  lineHeight: '1.18' 
                }} 
              >
                {stage === 0 ? 'anonymous@heartsystem:~$ ' : 'Password: '}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={isPasswordMode ? '*'.repeat(passwordRaw.length) : currentInput}
                onChange={(e) => {
                  if (isPasswordMode) {
                    const realLength = passwordRaw.length;
                    const shown = e.target.value;

                    if (shown.length < realLength) {
                      setPasswordRaw(passwordRaw.slice(0, shown.length));
                    } else {
                      const typed = shown.slice(realLength);
                      setPasswordRaw(passwordRaw + typed);
                    }
                  } else {
                    setCurrentInput(e.target.value);
                  }
                }}
                onKeyDown={handleInputKeyDown}
                autoFocus
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  lineHeight: '1.18',
                  width: `${Math.max(1, isPasswordMode ? passwordRaw.length : currentInput.length)}ch`,
                  flex: '0 0 auto',
                  display: 'inline-block',
                  caretColor: '#00ff00',
                  padding: 0,
                  margin: 0
                }}
              />
            </div>
          )}
        </div>
      )}

      {stage === 4 && showQuestionDialog && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxWidth: '90%',
            background: '#0a0a0a',
            border: '3px solid #00ff00',
            borderRadius: '8px',
            boxShadow: '0 0 50px rgba(0, 255, 0, 0.4)',
            zIndex: 9999
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#00ff00',
              padding: '10px 15px',
              color: '#000',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '6px 6px 0 0'
            }}
          >
            <span>SYSTEM_QUESTION.EXE</span>
          </div>
          <div
            style={{
              padding: '30px 20px',
              border: '2px solid #00ff00',
              borderTop: 'none',
              borderRadius: '0 0 6px 6px'
            }}
          >
            <p
              style={{
                color: '#00ff00',
                fontSize: '18px',
                textAlign: 'center',
                margin: '0 0 30px 0'
              }}
            >
              Do you love me?
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button
                onClick={handleYes}
                style={{
                  padding: '12px 40px',
                  background: 'transparent',
                  border: '2px solid #00ff00',
                  borderRadius: '8px',
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  cursor: 'pointer',
                  zIndex: 10000
                }}
              >
                YES
              </button>
              <button
                onClick={handleNo}
                style={{
                  padding: '12px 40px',
                  background: 'transparent',
                  border: '2px solid #00ff00',
                  borderRadius: '8px',
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  cursor: 'pointer',
                  zIndex: 10000
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {virusPopups.map((popup) => (
        <div
          key={popup.id}
          style={{
            position: 'absolute',
            left: popup.left + 'px',
            top: popup.top + 'px',
            width: '300px',
            background: '#0a0a0a',
            border: '2px solid #ff0000',
            borderRadius: '8px',
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.6)',
            zIndex: 1000,
            fontFamily: 'monospace'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#ff0000',
              padding: '8px 12px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '6px 6px 0 0'
            }}
          >
            <span>SYSTEM ERROR - CRITICAL</span>
            <button
              onClick={() => handleVirusClose(popup.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              X
            </button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '0 0 6px 6px' }}>
            <p style={{ color: '#ff0000', fontSize: '16px', margin: '0 0 20px 0' }}>
              LOVE VIRUS DETECTED!
            </p>
            <button
              onClick={handleYes}
              style={{
                padding: '10px 40px',
                background: '#0a0a0a',
                border: '2px solid #ff0000',
                borderRadius: '8px',
                color: '#ff0000',
                fontSize: '16px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}
            >
              YES
            </button>
          </div>
        </div>
      ))}

      {stage === 5 && (
        <>
          <canvas
            ref={canvasRef}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'block',
              width: '100vw',
              height: '100vh',
              cursor: 'default',
              background: 'radial-gradient(circle at center,#160008 0%,#050004 48%,#000 100%)'
            }}
          />
          <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 42%, rgba(255,0,25,.18), transparent 31%), radial-gradient(circle at 50% 45%, rgba(255,0,20,.12), transparent 48%)',
            mixBlendMode: 'screen'
          }} />
          <div style={{
            position: 'fixed',
            left: '50%',
            bottom: '6vh',
            transform: 'translateX(-50%)',
            color: 'rgba(255,185,200,.78)',
            letterSpacing: '.18em',
            fontSize: 'clamp(13px,2.2vw,20px)',
            textShadow: '0 0 16px rgba(255,0,70,.75)',
            pointerEvents: 'none'
          }}>
            I LOVE YOU
          </div>
        </>
      )}
    </div>
  );
}
