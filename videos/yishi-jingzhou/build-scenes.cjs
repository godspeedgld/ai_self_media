// 生成 compositions/s1..s14.html —— 「大意失荆州」14 场景
// 视觉系统: 墨黑底 #14120F / 宣纸字 #E8DCC0 / 描金 #D4A853 / 印章红 #C03A2B / 暗金 #9A927F
const fs = require("fs");

const CSS = `
  @font-face { font-family: "HFZh"; src: local("Microsoft YaHei"), local("微软雅黑"); }
  #root { position: absolute; inset: 0; font-family: "HFZh", "Noto Sans JP", sans-serif; background: #14120F; }
  .frame { position: absolute; inset: 26px; border: 1px solid rgba(212,168,83,0.28); pointer-events: none; }
  .ink1 { position: absolute; width: 900px; height: 900px; border-radius: 50%; background: radial-gradient(circle, rgba(212,168,83,0.05), transparent 65%); left: -200px; top: -250px; }
  .ink2 { position: absolute; width: 1100px; height: 1100px; border-radius: 50%; background: radial-gradient(circle, rgba(154,146,127,0.05), transparent 65%); right: -300px; bottom: -350px; }
  .big { color: #E8DCC0; font-weight: 900; }
  .gold { color: #D4A853; }
  .red { color: #C03A2B; }
  .dim { color: #9A927F; }
`;

const shell = (id, body, js) => `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>${CSS}</style>
      <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
        <div class="frame" data-layout-ignore></div>
${body}
      </div>
      <script>
        const tl = gsap.timeline({ paused: true });
${js}
        window.__timelines["${id}"] = tl;
      <\/script>
    </template>
  </body>
</html>
`;

// 常用片段 ---------------------------------------------------------------
const ambience = (dur, b1 = "b1", b2 = "b2") => `
        tl.fromTo("#${b1}", { x: 0, y: 0 }, { x: 120, y: 60, duration: ${dur}, ease: "none" }, 0);
        tl.fromTo("#${b2}", { x: 0, y: 0 }, { x: -140, y: -70, duration: ${dur}, ease: "none" }, 0);`;

const ambienceHtml = `<div class="clip" id="AMB" data-start="0" data-duration="DUR" data-track-index="9" data-layout-ignore>
          <div class="ink1" id="b1"></div>
          <div class="ink2" id="b2"></div>
        </div>`;

const scenes = [];

// s1 设问 0–15.1 ----------------------------------------------------------
scenes.push({
  id: "s1", start: 0, dur: 15.1,
  body: `
        <div class="clip" id="c-title" data-start="0" data-duration="15.1" data-track-index="0">
          <div id="g-title" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <div id="t1" class="big" style="font-size:150px; letter-spacing:0.08em;">大意失<span class="gold">荆州</span></div>
            <div id="t2" class="red" style="font-size:96px; font-weight:900; margin-top:10px; opacity:0;">真的是大意的吗？</div>
          </div>
        </div>
        <div class="clip" id="c-cards" data-start="6.2" data-duration="8.9" data-track-index="1">
          <div style="position:absolute; left:0; right:0; top:790px; display:flex; justify-content:center; gap:34px;">
            <div id="k1" style="opacity:0; padding:20px 38px; border:2px solid rgba(212,168,83,0.5); border-radius:14px; color:#E8DCC0; font-size:38px; font-weight:700;">三国演义说：可惜啦</div>
            <div id="k2" style="opacity:0; padding:20px 38px; border:2px solid rgba(212,168,83,0.5); border-radius:14px; color:#E8DCC0; font-size:38px; font-weight:700;">关羽一时大意</div>
            <div id="k3" style="opacity:0; padding:20px 38px; border:2px solid rgba(192,58,43,0.7); border-radius:14px; color:#E8DCC0; font-size:38px; font-weight:700;">就怪糜芳？</div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#t1", { opacity: 0.25, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power4.out" }, 0);
        tl.fromTo("#t2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.5);
        tl.to("#t1", { scale: 0.82, duration: 0.6, ease: "power2.inOut" }, 2.6);
        [["#k1", 6.2], ["#k2", 9.0], ["#k3", 12.2]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at);
        });
        tl.to("#k3", { scale: 1.08, duration: 0.25, ease: "power2.out" }, 13.6);
        tl.to("#k3", { scale: 1, duration: 0.25, ease: "power2.inOut" }, 13.85);`,
});

// s2 怎么守 15.1–33.3 ------------------------------------------------------
scenes.push({
  id: "s2", start: 15.1, dur: 18.2,
  body: `
        <div class="clip" id="c-q" data-start="0.2" data-duration="18" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
            <div id="q1" class="big" style="font-size:84px;">回过头来看——<span class="gold">关羽守的荆州，应该怎么守？</span></div>
          </div>
        </div>
        <div class="clip" id="c-reveal" data-start="14.2" data-duration="4" data-track-index="1">
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column;">
            <div id="r1" style="opacity:0;"><span class="dim" style="font-size:56px; font-weight:700;">荆州的主体，其实就叫做</span></div>
            <div id="r2" class="gold" style="font-size:170px; font-weight:900; letter-spacing:0.1em; opacity:0;">江汉平原</div>
            <div id="r3" style="width:640px; height:6px; background:#D4A853; border-radius:3px; margin-top:18px;"></div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#q1", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.out" }, 0.2);
        tl.fromTo("#r1", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 14.2);
        tl.fromTo("#r2", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }, 14.4);
        tl.fromTo("#r3", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, ease: "power3.out" }, 14.8);
        tl.to("#c-q", { opacity: 0.15, duration: 0.5, ease: "power1.inOut" }, 14.2);`,
});

// s3 地形四至 33.3–45.1 ----------------------------------------------------
const mapBase = `
  <svg viewBox="0 0 900 640" width="1180" height="840" id="map">
    <rect x="170" y="150" width="560" height="360" rx="40" fill="rgba(232,220,192,0.07)" stroke="rgba(212,168,83,0.35)" stroke-width="2"/>
    <text x="450" y="345" text-anchor="middle" fill="#E8DCC0" font-size="40" font-weight="700" id="m-plain">江汉平原</text>
    <g id="m-w" fill="#A89F8D"><path d="M120 240 l34 -60 34 60 z"/><path d="M96 320 l30 -52 30 52 z"/><path d="M132 400 l32 -56 32 56 z"/></g>
    <g id="m-s" fill="#A89F8D"><path d="M300 585 l32 -56 32 56 z"/><path d="M420 590 l30 -52 30 52 z"/><path d="M540 585 l32 -56 32 56 z"/></g>
    <path id="m-river" d="M60 620 q160 -26 340 -12 q210 16 460 6" fill="none" stroke="#3E7C8F" stroke-width="8" stroke-linecap="round"/>
    <g id="m-n"><rect x="330" y="118" width="240" height="26" rx="13" fill="#D4A853" opacity="0"/><circle cx="450" cy="131" r="11" fill="#D4A853"/></g>
    <g id="m-e"><rect x="716" y="230" width="26" height="200" rx="13" fill="#D4A853" opacity="0"/><circle cx="729" cy="330" r="11" fill="#D4A853"/></g>
  </svg>`;
scenes.push({
  id: "s3", start: 33.3, dur: 11.8,
  body: `
        <div class="clip" id="c-map" data-start="0.05" data-duration="11.6" data-track-index="0">
          <div id="g-map" style="position:absolute; left:370px; top:100px;">
            ${mapBase}
          </div>
        </div>
        <div class="clip" id="c-lbl" data-start="0.5" data-duration="11.3" data-track-index="1">
          <div id="lb-w" class="dim" style="position:absolute; left:265px; top:400px; font-size:44px; font-weight:900; opacity:0;">西·山</div>
          <div id="lb-ss" class="dim" style="position:absolute; left:810px; top:795px; font-size:44px; font-weight:900; opacity:0;">南·山</div>
          <div id="lb-r" style="position:absolute; left:1130px; top:820px; font-size:44px; font-weight:900; color:#3E7C8F; opacity:0;">南·江</div>
          <div id="lb-n" class="gold" style="position:absolute; left:760px; top:150px; font-size:52px; font-weight:900; opacity:0;">北 ← 要守</div>
          <div id="lb-e" class="gold" style="position:absolute; left:1440px; top:430px; font-size:52px; font-weight:900; opacity:0;">东 ← 要守</div>
        </div>`,
  js: `
        tl.fromTo("#g-map", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.05);
        tl.fromTo("#lb-w", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0.5);
        tl.fromTo("#lb-ss", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 2.4);
        tl.fromTo("#m-river", { attr: { "stroke-dashoffset": 900 }, strokeDasharray: 900 }, { attr: { "stroke-dashoffset": 0 }, duration: 1.2, ease: "power2.inOut" }, 4.0);
        tl.fromTo("#lb-r", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 4.4);
        tl.fromTo("#lb-n", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, 7.9);
        tl.fromTo("#lb-e", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.8)" }, 8.3);
        tl.to("#m-n rect", { opacity: 1, duration: 0.35, ease: "power1.out" }, 7.9);
        tl.to("#m-e rect", { opacity: 1, duration: 0.35, ease: "power1.out" }, 8.3);
        tl.to("#m-plain", { opacity: 0.5, duration: 0.5, ease: "power1.inOut" }, 8.0);`,
});

// s4 襄阳门户 45.1–53.5 ----------------------------------------------------
scenes.push({
  id: "s4", start: 45.1, dur: 8.4,
  body: `
        <div class="clip" id="c-gate" data-start="0.2" data-duration="8.2" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:90px;">
            <svg viewBox="0 0 260 320" width="330" height="406" id="gate-svg">
              <rect x="30" y="60" width="200" height="240" rx="18" fill="rgba(232,220,192,0.06)" stroke="rgba(212,168,83,0.4)" stroke-width="3"/>
              <g id="gate-door">
                <rect x="105" y="150" width="50" height="150" rx="8" fill="#D4A853" opacity="0.9"/>
                <circle cx="118" cy="230" r="5" fill="#14120F"/>
              </g>
              <text x="130" y="110" text-anchor="middle" fill="#E8DCC0" font-size="44" font-weight="900">襄阳</text>
            </svg>
            <div style="display:flex; flex-direction:column; gap:26px; align-items:flex-start;">
              <div id="s4-portal" class="big" style="font-size:96px;">襄阳 = <span class="gold">江汉平原的门户</span></div>
              <div id="s4-drop" style="opacity:0;"><span class="dim" style="font-size:46px; font-weight:700;">门户一丢，</span><span class="red" style="font-size:56px; font-weight:900;">门户洞开</span></div>
            </div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#gate-svg", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 0.2);
        tl.fromTo("#s4-portal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.3);
        tl.fromTo("#gate-door", { rotation: 0, transformOrigin: "105px 150px" }, { rotation: -70, duration: 0.9, ease: "power2.in" }, 5.0);
        tl.fromTo("#s4-drop", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 5.6);
        tl.to("#gate-svg", { opacity: 0.55, duration: 0.6, ease: "power1.inOut" }, 6.4);`,
});

// s5 南阳 53.5–75.3 --------------------------------------------------------
scenes.push({
  id: "s5", start: 53.5, dur: 21.8,
  body: `
        <div class="clip" id="c-ny" data-start="0.2" data-duration="21.6" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;">
            <div id="ny-t" class="big" style="font-size:92px;">还有一个容易被忘掉的地方——<span class="gold">南阳</span></div>
            <div id="ny-sub" style="opacity:0;"><span style="color:#E8DCC0; font-size:42px; font-weight:700;">要完成</span><span class="gold" style="font-size:50px; font-weight:900;">隆中对</span><span style="color:#E8DCC0; font-size:42px; font-weight:700;">，不光是襄阳，还要有南阳</span></div>
            <svg viewBox="0 0 900 240" width="840" height="224" id="ny-map" style="opacity:0;">
              <circle cx="450" cy="70" r="16" fill="#D4A853"/><text x="450" y="40" text-anchor="middle" fill="#D4A853" font-size="38" font-weight="900">南阳</text>
              <circle cx="450" cy="190" r="16" fill="#E8DCC0"/><text x="450" y="232" text-anchor="middle" fill="#E8DCC0" font-size="38" font-weight="700">襄阳</text>
              <line id="ny-link" x1="450" y1="86" x2="450" y2="174" stroke="#9A927F" stroke-width="5"/>
              <text x="530" y="138" fill="#9A927F" font-size="30">在襄阳北边</text>
            </svg>
            <div id="chu-card" style="opacity:0; padding:14px 40px; border:2px solid rgba(192,58,43,0.65); border-radius:14px; color:#E8DCC0; font-size:38px; font-weight:700;">楚国，春秋大国，<span class="red" style="font-weight:900;">春秋五霸之一</span></div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#ny-t", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.2);
        tl.fromTo("#ny-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 7.0);
        tl.fromTo("#ny-map", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 9.2);
        tl.fromTo("#ny-link", { attr: { "stroke-dashoffset": 90 }, strokeDasharray: 90 }, { attr: { "stroke-dashoffset": 0 }, duration: 0.6, ease: "power2.inOut" }, 9.9);
        tl.fromTo("#chu-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 14.6);
        tl.to("#chu-card", { scale: 1.04, duration: 0.3, ease: "power2.out" }, 17.5);
        tl.to("#chu-card", { scale: 1, duration: 0.3, ease: "power2.inOut" }, 17.8);`,
});

// s6 方城防线 75.3–102.1 ---------------------------------------------------
scenes.push({
  id: "s6", start: 75.3, dur: 26.8,
  body: `
        <div class="clip" id="c-fc" data-start="0.2" data-duration="26.6" data-track-index="0">
          <div style="position:absolute; left:330px; top:120px;">
            <svg viewBox="0 0 900 560" width="1180" height="735">
              <circle cx="450" cy="420" r="18" fill="#E8DCC0"/>
              <text x="450" y="486" text-anchor="middle" fill="#E8DCC0" font-size="40" font-weight="700">襄阳</text>
              <circle cx="450" cy="180" r="20" fill="#D4A853"/>
              <text x="450" y="120" text-anchor="middle" fill="#D4A853" font-size="44" font-weight="900">南阳·前进基地</text>
              <path id="fc-wall" d="M240 250 L360 150 L560 150 L680 250" fill="none" stroke="#D4A853" stroke-width="10" stroke-linecap="round"/>
              <g id="fc-shield" opacity="0">
                <path d="M420 250 l30 -14 30 14 v26 q0 26 -30 40 q-30 -14 -30 -40 z" fill="none" stroke="#9A927F" stroke-width="5"/>
                <text x="450" y="300" text-anchor="middle" fill="#9A927F" font-size="28">天下无事：守</text>
              </g>
              <g id="fc-out" opacity="0">
                <line x1="680" y1="250" x2="820" y2="180" stroke="#C03A2B" stroke-width="9" stroke-linecap="round"/>
                <polygon points="820,180 794,176 806,198" fill="#C03A2B"/>
                <text x="770" y="300" fill="#C03A2B" font-size="34" font-weight="900">出方城·征天下</text>
              </g>
              <g id="fc-key" opacity="0">
                <text x="450" y="560" text-anchor="middle" fill="#D4A853" font-size="42" font-weight="900">南阳 = 争夺天下的关键点</text>
              </g>
            </svg>
          </div>
        </div>`,
  js: `
        tl.fromTo("#c-fc", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.2);
        tl.fromTo("#fc-wall", { attr: { "stroke-dashoffset": 560 }, strokeDasharray: 560 }, { attr: { "stroke-dashoffset": 0 }, duration: 1.4, ease: "power2.inOut" }, 1.7);
        tl.fromTo("#fc-shield", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 9.4);
        tl.to("#fc-out", { opacity: 1, duration: 0.45, ease: "power1.out" }, 13.2);
        tl.to("#fc-shield", { opacity: 0.25, duration: 0.5, ease: "power1.inOut" }, 13.4);
        tl.fromTo("#fc-out", { x: -30 }, { x: 0, duration: 0.5, ease: "power2.out" }, 13.2);
        tl.fromTo("#fc-key", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 21.0);`,
});

// s7 北疆小结 102.1–114.2 --------------------------------------------------
scenes.push({
  id: "s7", start: 102.1, dur: 12.1,
  body: `
        <div class="clip" id="c-sum" data-start="0.3" data-duration="11.8" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:40px;">
            <div id="s7-t" class="dim" style="font-size:52px; font-weight:700;">对江汉平原来说，北边有两个关键点</div>
            <div style="display:flex; gap:70px;">
              <div id="s7-xym" style="opacity:0; padding:26px 70px; border:3px solid #D4A853; border-radius:18px; color:#D4A853; font-size:72px; font-weight:900;">① 襄阳</div>
              <div id="s7-ny" style="opacity:0; padding:26px 70px; border:3px solid rgba(212,168,83,0.55); border-radius:18px; color:#D4A853; font-size:72px; font-weight:900;">② 南阳</div>
            </div>
            <div id="s7-floor" style="opacity:0;"><span class="dim" style="font-size:48px; font-weight:700;">但底线是——</span><span class="big" style="font-size:64px; font-weight:900;">至少要有襄阳</span></div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#s7-t", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.4);
        tl.fromTo("#s7-xym", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.6)" }, 2.6);
        tl.fromTo("#s7-ny", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.6)" }, 3.0);
        tl.fromTo("#s7-floor", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 7.9);
        tl.to("#s7-ny", { opacity: 0.35, duration: 0.5, ease: "power1.inOut" }, 8.3);
        tl.to("#s7-xym", { scale: 1.06, duration: 0.3, ease: "power2.out" }, 8.3);
        tl.to("#s7-xym", { scale: 1, duration: 0.3, ease: "power2.inOut" }, 8.6);`,
});

// s8 两山夹一江 114.2–143.7 --------------------------------------------------
scenes.push({
  id: "s8", start: 114.2, dur: 29.5,
  body: `
        <div class="clip" id="c-east" data-start="0.05" data-duration="29.3" data-track-index="0">
          <div style="position:absolute; left:330px; top:110px;">
            <svg viewBox="0 0 900 620" width="1180" height="813">
              <g id="e-m1" fill="#A89F8D" opacity="0">
                <path d="M560 120 l36 -66 36 66 z"/><path d="M640 200 l34 -60 34 60 z"/><path d="M700 300 l36 -64 36 64 z"/><path d="M720 420 l32 -58 32 58 z"/>
                <text x="600" y="80" fill="#9A927F" font-size="34" font-weight="900">大别山脉</text>
              </g>
              <g id="e-m2" fill="#A89F8D" opacity="0">
                <path d="M560 500 l36 -66 36 66 z"/><path d="M650 560 l34 -60 34 60 z"/>
                <text x="590" y="612" fill="#9A927F" font-size="34" font-weight="900">罗霄山脉</text>
              </g>
              <path id="e-river-wide" d="M60 300 q180 -60 360 -30 q160 26 300 22" fill="none" stroke="#3E7C8F" stroke-width="70" stroke-linecap="round" opacity="0.9"/>
              <path id="e-river-narrow" d="M60 300 q180 -60 360 -30 q160 26 300 22" fill="none" stroke="#3E7C8F" stroke-width="14" stroke-linecap="round" opacity="0"/>
              <circle cx="836" cy="286" r="12" fill="#D4A853"/>
              <text x="836" y="248" text-anchor="middle" fill="#D4A853" font-size="32" font-weight="900">九江</text>
            </svg>
          </div>
          <div id="e-label" style="position:absolute; left:0; right:0; top:190px; text-align:center; opacity:0;">
            <span class="gold" style="font-size:110px; font-weight:900; letter-spacing:0.12em;">两山夹一江</span>
            <div id="e-narrow" style="margin-top:14px;"><span class="dim" style="font-size:44px; font-weight:700;">江面瞬间收窄——天然的好防线</span></div>
          </div>
          <div id="e-cities" style="position:absolute; left:0; right:0; top:845px; text-align:center; opacity:0;">
            <span class="dim" style="font-size:38px; font-weight:700;">今：九江 · 黄冈 · 黄陂一带</span>
          </div>
        </div>`,
  js: `
        tl.fromTo("#c-east", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.2);
        tl.fromTo("#e-river-wide", { opacity: 0 }, { opacity: 0.9, duration: 0.6, ease: "power1.out" }, 0.08);
        tl.fromTo("#e-m1", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.6);
        tl.fromTo("#e-m2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 2.0);
        tl.to("#e-river-wide", { attr: { "stroke-dashoffset": 900 }, strokeDasharray: 900, duration: 2.2, ease: "power1.inOut" }, 4.4);
        tl.fromTo("#e-river-narrow", { attr: { "stroke-dashoffset": 900 }, strokeDasharray: 900, opacity: 0 }, { attr: { "stroke-dashoffset": 0 }, opacity: 1, duration: 1.6, ease: "power2.inOut" }, 8.7);
        tl.to("#e-river-wide", { opacity: 0.12, duration: 0.6, ease: "power1.inOut" }, 8.7);
        tl.fromTo("#e-label", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.5)" }, 10.0);
        tl.fromTo("#e-cities", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 12.9);
        tl.to("#e-label", { scale: 1.05, duration: 0.4, ease: "power2.out" }, 13.8);
        tl.to("#e-label", { scale: 1, duration: 0.4, ease: "power2.inOut" }, 14.2);`,
});

// s9 武汉会战 143.7–174.5 ---------------------------------------------------
scenes.push({
  id: "s9", start: 143.7, dur: 30.8,
  body: `
        <div class="clip" id="c-38" data-start="0.1" data-duration="30.4" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; gap:40px;">
            <div id="w-year" style="display:flex; align-items:baseline; gap:26px;">
              <span class="red" style="font-size:120px; font-weight:900;">1938</span>
              <span class="big" style="font-size:72px; font-weight:900;">武汉会战</span>
            </div>
            <div id="w-blocks" style="display:flex; gap:26px; margin-top:6px;">
              <div id="w-b1" style="opacity:0; width:150px; height:20px; background:#C03A2B; border-radius:6px;"></div>
              <div id="w-b2" style="opacity:0; width:150px; height:20px; background:#C03A2B; border-radius:6px;"></div>
              <div id="w-b3" style="opacity:0; width:150px; height:20px; background:#C03A2B; border-radius:6px;"></div>
            </div>
            <div id="w-caption" class="dim" style="font-size:44px; font-weight:700; opacity:0;">两山夹一江，层层阻击</div>
            <div style="display:flex; gap:80px; align-items:center; margin-top:10px;">
              <div id="w-lose" style="opacity:0; padding:16px 40px; border:3px solid #C03A2B; border-radius:14px; color:#C03A2B; font-size:54px; font-weight:900;">会战失利</div>
              <div id="w-but" class="dim" style="font-size:50px; font-weight:900; opacity:0;">但是——</div>
              <div id="w-cost" style="opacity:0; padding:16px 40px; border:3px solid #D4A853; border-radius:14px; color:#D4A853; font-size:54px; font-weight:900;">大大消耗了日军</div>
            </div>
            <div id="w-after" class="dim" style="font-size:42px; font-weight:700; opacity:0;">此后日军再打长沙、常德、宜昌，都变得非常吃力</div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#w-year", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.15);
        [["#w-b1", 6.3], ["#w-b2", 7.3], ["#w-b3", 8.3]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.out" }, at);
        });
        tl.fromTo("#w-caption", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 6.6);
        tl.fromTo("#w-lose", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power4.out" }, 14.4);
        tl.fromTo("#w-but", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 16.2);
        tl.fromTo("#w-cost", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 16.9);
        tl.fromTo("#w-after", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 22.3);`,
});

// s10 条件清单 174.5–188.1 ---------------------------------------------------
scenes.push({
  id: "s10", start: 174.5, dur: 13.6,
  body: `
        <div class="clip" id="c-list" data-start="0.3" data-duration="13.3" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:44px;">
            <div id="l-t" class="big" style="font-size:76px; font-weight:900;">要守住荆州，就要守住——</div>
            <div style="display:flex; gap:90px;">
              <div style="display:flex; flex-direction:column; gap:24px; align-items:center;">
                <div id="l-n" class="gold" style="font-size:56px; font-weight:900;">北</div>
                <div id="l-n1" style="opacity:0; padding:16px 46px; border:2px solid rgba(212,168,83,0.55); border-radius:12px; color:#E8DCC0; font-size:44px; font-weight:700;">襄阳</div>
                <div id="l-n2" style="opacity:0; padding:16px 46px; border:2px solid rgba(212,168,83,0.55); border-radius:12px; color:#E8DCC0; font-size:44px; font-weight:700;">南阳</div>
              </div>
              <div style="display:flex; flex-direction:column; gap:24px; align-items:center;">
                <div id="l-e" class="gold" style="font-size:56px; font-weight:900;">东</div>
                <div id="l-e1" style="opacity:0; padding:16px 46px; border:2px solid rgba(62,124,143,0.7); border-radius:12px; color:#E8DCC0; font-size:44px; font-weight:700;">九江（柴桑）</div>
                <div id="l-e2" style="opacity:0; padding:16px 46px; border:2px solid rgba(62,124,143,0.7); border-radius:12px; color:#E8DCC0; font-size:44px; font-weight:700;">大别山脉</div>
                <div id="l-e3" style="opacity:0; padding:16px 46px; border:2px solid rgba(62,124,143,0.7); border-radius:12px; color:#E8DCC0; font-size:44px; font-weight:700;">罗霄山脉</div>
              </div>
            </div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#l-t", { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.3);
        tl.fromTo("#l-n", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, 1.6);
        tl.fromTo("#l-e", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, 1.9);
        [["#l-n1", 2.3], ["#l-n2", 2.9]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, at);
        });
        [["#l-e1", 3.6], ["#l-e2", 4.2], ["#l-e3", 4.8]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, at);
        });
        tl.to("#l-t", { scale: 1.04, duration: 0.3, ease: "power2.out" }, 9.0);
        tl.to("#l-t", { scale: 1, duration: 0.3, ease: "power2.inOut" }, 9.3);`,
});

// s11 曹孙瓜分 188.1–210.7 ---------------------------------------------------
scenes.push({
  id: "s11", start: 188.1, dur: 22.6,
  body: `
        <div class="clip" id="c-who" data-start="0.3" data-duration="22.3" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:46px;">
            <div id="w11-t" class="big" style="font-size:66px; font-weight:900;">可当时，<span class="red">关羽</span>手里是什么样子？</div>
            <svg viewBox="0 0 1000 300" width="1250" height="375" id="w11-map">
              <rect x="380" y="90" width="240" height="130" rx="22" fill="rgba(232,220,192,0.08)" stroke="rgba(212,168,83,0.5)" stroke-width="2"/>
              <text x="500" y="170" text-anchor="middle" fill="#E8DCC0" font-size="38" font-weight="700">关羽的荆州</text>
              <g id="w11-cao" opacity="0">
                <rect x="150" y="60" width="180" height="70" rx="14" fill="rgba(192,58,43,0.16)" stroke="#C03A2B" stroke-width="3"/>
                <text x="240" y="108" text-anchor="middle" fill="#C03A2B" font-size="40" font-weight="900">曹操</text>
                <text x="240" y="170" text-anchor="middle" fill="#9A927F" font-size="28">襄阳 · 南阳</text>
                <line x1="330" y1="95" x2="380" y2="110" stroke="#C03A2B" stroke-width="5"/>
              </g>
              <g id="w11-sun" opacity="0">
                <rect x="670" y="60" width="180" height="70" rx="14" fill="rgba(62,124,143,0.16)" stroke="#3E7C8F" stroke-width="3"/>
                <text x="760" y="108" text-anchor="middle" fill="#6FB4C8" font-size="40" font-weight="900">孙权</text>
                <text x="760" y="170" text-anchor="middle" fill="#9A927F" font-size="28">江夏 · 柴桑</text>
                <line x1="670" y1="95" x2="620" y2="110" stroke="#3E7C8F" stroke-width="5"/>
              </g>
            </svg>
            <div id="w11-sub" style="opacity:0;"><span class="dim" style="font-size:46px; font-weight:700;">北边要地全在</span><span class="red" style="font-size:52px; font-weight:900;">曹操</span><span class="dim" style="font-size:46px; font-weight:700;">手里，东边全在</span><span style="color:#6FB4C8; font-size:52px; font-weight:900;">孙权</span><span class="dim" style="font-size:46px; font-weight:700;">手里</span></div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#w11-t", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.4);
        tl.fromTo("#w11-map", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 1.6);
        tl.fromTo("#w11-cao", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, 2.6);
        tl.fromTo("#w11-sun", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, 8.9);
        tl.fromTo("#w11-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 13.4);`,
});

// s12 砧板鱼肉 210.7–223 ----------------------------------------------------
scenes.push({
  id: "s12", start: 210.7, dur: 12.3,
  body: `
        <div class="clip" id="c-meat" data-start="0.2" data-duration="12.1" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:60px;">
            <svg viewBox="0 0 1100 300" width="1210" height="330" id="meat-svg">
              <rect x="180" y="180" width="740" height="70" rx="16" fill="rgba(154,146,127,0.22)" stroke="rgba(154,146,127,0.5)" stroke-width="3"/>
              <g id="meat-block">
                <rect x="460" y="90" width="180" height="110" rx="20" fill="#C03A2B" opacity="0.85"/>
                <text x="550" y="160" text-anchor="middle" fill="#E8DCC0" font-size="42" font-weight="900">荆州</text>
              </g>
              <g id="knife" opacity="0">
                <rect x="180" y="60" width="190" height="52" rx="10" fill="#E8DCC0" opacity="0.9"/>
                <rect x="130" y="72" width="60" height="26" rx="8" fill="#A89F8D"/>
                <text x="270" y="50" text-anchor="middle" fill="#C03A2B" font-size="34" font-weight="900">曹操·刀</text>
              </g>
              <g id="fork" opacity="0">
                <line x1="920" y1="70" x2="800" y2="120" stroke="#E8DCC0" stroke-width="12" stroke-linecap="round"/>
                <line x1="800" y1="120" x2="772" y2="92" stroke="#E8DCC0" stroke-width="7" stroke-linecap="round"/>
                <line x1="800" y1="120" x2="786" y2="86" stroke="#E8DCC0" stroke-width="7" stroke-linecap="round"/>
                <line x1="800" y1="120" x2="802" y2="88" stroke="#E8DCC0" stroke-width="7" stroke-linecap="round"/>
                <text x="948" y="58" text-anchor="middle" fill="#6FB4C8" font-size="34" font-weight="900">孙权·叉</text>
              </g>
            </svg>
            <div id="meat-line" class="big" style="font-size:78px; font-weight:900; opacity:0;">想什么时候吃，就什么时候吃</div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#meat-svg", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.2);
        tl.fromTo("#meat-block", { scale: 0.7, transformOrigin: "550px 145px" }, { scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 0.3);
        tl.fromTo("#knife", { opacity: 0, x: -180 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 3.3);
        tl.fromTo("#fork", { opacity: 0, x: 180 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 6.3);
        tl.to("#knife", { rotation: 6, transformOrigin: "275px 86px", duration: 0.4, ease: "sine.inOut" }, 8.3);
        tl.to("#knife", { rotation: 0, duration: 0.4, ease: "sine.inOut" }, 8.7);
        tl.to("#fork", { rotation: -6, transformOrigin: "934px 95px", duration: 0.4, ease: "sine.inOut" }, 8.9);
        tl.to("#fork", { rotation: 0, duration: 0.4, ease: "sine.inOut" }, 9.3);
        tl.fromTo("#meat-line", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 9.2);`,
});

// s13 平衡外交 223–255.9 -----------------------------------------------------
scenes.push({
  id: "s13", start: 223, dur: 32.9,
  body: `
        <div class="clip" id="c-bal" data-start="0.2" data-duration="32.7" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; gap:40px;">
            <div id="b-t" class="big" style="font-size:70px; font-weight:900; margin-top:30px;">唯一的战略空间：<span class="gold">让两家互相忌惮</span></div>
            <svg viewBox="0 0 1100 330" width="1210" height="363" id="bal-svg">
              <line id="bal-beam" x1="200" y1="150" x2="900" y2="150" stroke="#D4A853" stroke-width="12" stroke-linecap="round"/>
              <polygon points="550,150 490,270 610,270" fill="none" stroke="#9A927F" stroke-width="6"/>
              <text x="550" y="316" text-anchor="middle" fill="#E8DCC0" font-size="36" font-weight="900">守荆州的当政者</text>
              <text x="200" y="110" text-anchor="middle" fill="#C03A2B" font-size="44" font-weight="900">曹操</text>
              <text x="900" y="110" text-anchor="middle" fill="#6FB4C8" font-size="44" font-weight="900">孙权</text>
            </svg>
            <div style="display:flex; gap:60px;">
              <div id="b-th1" style="opacity:0; padding:20px 40px; border:2px solid rgba(192,58,43,0.6); border-radius:14px; color:#E8DCC0; font-size:40px; font-weight:700;">曹操不想让<span class="red" style="font-weight:900;">孙权</span>独吞荆州</div>
              <div id="b-th2" style="opacity:0; padding:20px 40px; border:2px solid rgba(62,124,143,0.7); border-radius:14px; color:#E8DCC0; font-size:40px; font-weight:700;">孙权不想让<span style="color:#6FB4C8; font-weight:900;">曹操</span>独吞荆州</div>
            </div>
            <div id="b-move" class="dim" style="font-size:44px; font-weight:700; opacity:0;">你打我，我就靠向另一边——把握一个<span class="gold" style="font-weight:900;">「度」</span></div>
            <div id="b-seal" data-layout-allow-overlap style="position:absolute; left:760px; top:210px; opacity:0; padding:12px 52px; border:8px solid #D4A853; border-radius:16px; color:#D4A853; font-size:80px; font-weight:900; letter-spacing:0.2em; background:rgba(20,18,15,0.6);">平衡</div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#b-t", { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.2);
        tl.fromTo("#bal-svg", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 1.4);
        tl.fromTo("#b-th1", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 3.2);
        tl.fromTo("#b-th2", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 4.6);
        tl.fromTo("#b-move", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 10.2);
        tl.to("#bal-beam", { attr: { x1: 230, y1: 128, x2: 870, y2: 168 }, duration: 1.2, ease: "sine.inOut" }, 13.0);
        tl.to("#bal-beam", { attr: { x1: 170, y1: 168, x2: 930, y2: 128 }, duration: 1.2, ease: "sine.inOut" }, 20.0);
        tl.to("#bal-beam", { attr: { x1: 200, y1: 150, x2: 900, y2: 150 }, duration: 1.0, ease: "power2.inOut" }, 26.6);
        tl.fromTo("#b-seal", { opacity: 0, scale: 2.4, rotation: -14 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.4, ease: "power4.in" }, 28.5);`,
});

// s14 结论 255.9–277.3 -------------------------------------------------------
scenes.push({
  id: "s14", start: 255.9, dur: 21.4,
  body: `
        <div class="clip" id="c-fin" data-start="0.3" data-duration="21.1" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:56px;">
            <div id="f-t" class="dim" style="font-size:54px; font-weight:700;">守住荆州，最重要的不是军事能力——</div>
            <div style="display:flex; gap:80px;">
              <div id="f-c1" style="padding:34px 60px; border:3px solid rgba(212,168,83,0.6); border-radius:18px; text-align:center; opacity:0;">
                <div class="gold" style="font-size:52px; font-weight:900;">长袖善舞的<br/>政治与外交</div>
                <div class="red" style="font-size:44px; font-weight:900; margin-top:14px;">关羽 ✗</div>
              </div>
              <div id="f-c2" style="padding:34px 60px; border:3px solid rgba(154,146,127,0.5); border-radius:18px; text-align:center; opacity:0;">
                <div class="dim" style="font-size:52px; font-weight:900;">军事能力</div>
                <div class="gold" style="font-size:44px; font-weight:900; margin-top:14px;">关羽 ✓✓✓</div>
              </div>
            </div>
            <div id="f-line" class="big" style="font-size:66px; font-weight:900; opacity:0;">守荆州的人选，<span class="red">从一开始或许就不是很好的选择</span></div>
          </div>
        </div>`,
  js: `
        tl.fromTo("#f-t", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.4);
        tl.fromTo("#f-c2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.2);
        tl.fromTo("#f-c1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 5.1);
        tl.to("#f-c1", { borderColor: "#C03A2B", duration: 0.4, ease: "power1.inOut" }, 10.1);
        tl.fromTo("#f-line", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 18.3);
        tl.to("#f-t", { opacity: 0.4, duration: 0.5, ease: "power1.inOut" }, 18.3);`,
});

// 输出 ----------------------------------------------------------------------
for (const sc of scenes) {
  const amb = ambience(sc.dur).replace("DUR", "");
  const body = sc.body + ambienceHtml.replace("DUR", String(sc.dur));
  const js = sc.js + "\n" + ambience(sc.dur);
  fs.writeFileSync(`compositions/${sc.id}.html`, shell(sc.id, body, js));
  console.log(`${sc.id}  ${sc.start}–${(sc.start + sc.dur).toFixed(1)}s  (${sc.dur}s)  写入完成`);
}
console.log("场景总数:", scenes.length);
