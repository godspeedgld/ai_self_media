// 生成 compositions/s1..s5.html —— 「改歌」双人搞笑段子（KTV 霓虹喜剧风）
// 视觉系统: 暗夜紫 #0F0E1E / 歌词粉 #FF5FA2 / 吐槽蓝 #4FC3F7 / 冷白 #F5F5F7 / 灰紫 #8A8FA3
const fs = require("fs");

const CSS = `
  @font-face { font-family: "HFZh"; src: local("Microsoft YaHei"), local("微软雅黑"); }
  #root { position: absolute; inset: 0; font-family: "HFZh", "Noto Sans JP", sans-serif; background: #0F0E1E; }
  .frame { position: absolute; inset: 26px; border: 1px solid rgba(138,143,163,0.22); pointer-events: none; }
  .badge-l { position: absolute; left: 44px; top: 44px; padding: 10px 26px; border-radius: 999px; border: 2px solid rgba(255,95,162,0.6); color: #FF5FA2; font-size: 28px; font-weight: 900; }
  .badge-r { position: absolute; right: 44px; top: 44px; padding: 10px 26px; border-radius: 999px; border: 2px solid rgba(79,195,247,0.6); color: #4FC3F7; font-size: 28px; font-weight: 900; }
  .glow-p { position: absolute; width: 900px; height: 900px; border-radius: 50%; background: radial-gradient(circle, rgba(255,95,162,0.06), transparent 65%); left: -200px; top: -240px; }
  .glow-c { position: absolute; width: 1100px; height: 1100px; border-radius: 50%; background: radial-gradient(circle, rgba(79,195,247,0.06), transparent 65%); right: -300px; bottom: -340px; }
  .ink { color: #F5F5F7; } .pink { color: #FF5FA2; } .cyan { color: #4FC3F7; } .dim { color: #8A8FA3; }
  .lyric { padding: 30px 70px; border-radius: 22px; background: rgba(255,95,162,0.08); border: 3px solid rgba(255,95,162,0.65); box-shadow: 0 0 60px rgba(255,95,162,0.18); text-align: center; }
  .bubble { position: relative; padding: 26px 54px; border-radius: 26px; background: rgba(79,195,247,0.1); border: 3px solid rgba(79,195,247,0.7); text-align: center; }
  .lyric-t { color: #FF5FA2; font-size: 68px; font-weight: 900; line-height: 1.4; }
  .bubble-t { color: #4FC3F7; font-size: 52px; font-weight: 900; line-height: 1.35; }
`;

const shell = (id, dur, body, js) => `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>${CSS}</style>
      <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
        <div class="frame" data-layout-ignore></div>
        <div class="badge-l" data-layout-ignore>🎤 改编歌手</div>
        <div class="badge-r" data-layout-ignore>🚽 陪同监工</div>
${body}
      </div>
      <script>
        const tl = gsap.timeline({ paused: true });
${js}
        window.__timelines["${id}"] = tl;
      </script>
    </template>
  </body>
</html>
`;

const amb = (dur) => ({
  html: `<div class="clip" id="amb-${dur}" data-start="0" data-duration="${dur}" data-track-index="8" data-layout-ignore>
          <div class="glow-p" id="gp${dur}"></div>
          <div class="glow-c" id="gc${dur}"></div>
        </div>`,
  js: `
        tl.fromTo("#gp${dur}", { x: 0, y: 0 }, { x: 110, y: 50, duration: ${dur}, ease: "none" }, 0);
        tl.fromTo("#gc${dur}", { x: 0, y: 0 }, { x: -120, y: -60, duration: ${dur}, ease: "none" }, 0);`,
});

const scenes = [];

// s1 0–30.6 开唱 + 第一次打断
scenes.push({ id: "s1", start: 0, dur: 30.6, body: `
        <div class="clip" id="c1" data-start="0.1" data-duration="9.5" data-track-index="0">
          <div id="g1" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px; opacity:0;">
            <div class="dim" style="font-size:36px; font-weight:700;">改编歌 · 齐秦《夜夜夜夜》</div>
            <div class="lyric"><div class="lyric-t">想问天 —— 你在哪里？</div></div>
          </div>
        </div>
        <div class="clip" id="c2" data-start="10.0" data-duration="3.4" data-track-index="1">
          <div id="g2" style="position:absolute; right:140px; top:330px; opacity:0;">
            <div class="bubble"><div class="bubble-t">呃…… 我在拉屎 💩</div></div>
          </div>
        </div>
        <div class="clip" id="c3" data-start="13.4" data-duration="5.0" data-track-index="2">
          <div id="g3" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">我想问问我自己</div></div>
          </div>
        </div>
        <div class="clip" id="c4" data-start="18.48" data-duration="2.4" data-track-index="3">
          <div id="g4" style="position:absolute; right:200px; top:430px; opacity:0;">
            <div class="bubble"><div class="bubble-t">问呗</div></div>
          </div>
        </div>
        <div class="clip" id="c5" data-start="21.0" data-duration="9.6" data-track-index="4">
          <div id="g5" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">一开始我聪明，结束我聪明<br/><span style="font-size:52px;">聪明的几乎的——毁掉了我自己</span></div></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#g1", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.1);
        tl.fromTo("#g2", { opacity: 0, x: 160, y: 40, rotation: 6 }, { opacity: 1, x: 0, y: 0, rotation: -3, duration: 0.4, ease: "back.out(1.6)" }, 10.0);
        tl.fromTo("#g3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 13.4);
        tl.fromTo("#g4", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 18.48);
        tl.fromTo("#g5", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 21.0);` });

// s2 30.6–49.0 这么惨 / 拉完了再说 / 迷信宿命
scenes.push({ id: "s2", start: 30.6, dur: 18.4, body: `
        <div class="clip" id="c1" data-start="0" data-duration="3.2" data-track-index="0">
          <div id="g1" style="position:absolute; right:150px; top:280px; opacity:0;">
            <div class="bubble"><div class="bubble-t">哦…… 这么惨</div></div>
          </div>
        </div>
        <div class="clip" id="c2" data-start="2.6" data-duration="8.4" data-track-index="1">
          <div id="g2" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">想问天，问大地</div></div>
          </div>
        </div>
        <div class="clip" id="c3" data-start="10.6" data-duration="4.4" data-track-index="2">
          <div id="g3" style="position:absolute; right:120px; top:340px; opacity:0;">
            <div class="bubble"><div class="bubble-t">不用不用！我拉屎呢 💩<br/>拉完了再说</div></div>
          </div>
        </div>
        <div class="clip" id="c4" data-start="14.4" data-duration="4.0" data-track-index="3">
          <div id="g4" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">或者是迷信，问问宿命啊</div></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#g1", { opacity: 0, x: 150 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.5)" }, 0.0);
        tl.fromTo("#g2", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 2.6);
        tl.fromTo("#g3", { opacity: 0, x: 150 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, 10.6);
        tl.fromTo("#g4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 14.4);` });

// s3 49.0–76.6 没救了 / 夜空里 / 别唱了
scenes.push({ id: "s3", start: 49.0, dur: 27.6, body: `
        <div class="clip" id="c1" data-start="0" data-duration="3.6" data-track-index="0">
          <div id="g1" style="position:absolute; right:220px; top:300px; opacity:0;">
            <div class="bubble"><div class="bubble-t">没救了</div></div>
          </div>
        </div>
        <div class="clip" id="c2" data-start="4.0" data-duration="7.5" data-track-index="1">
          <div id="g2" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; opacity:0;">
            <div class="lyric"><div class="lyric-t">放下所有，抛下所有</div></div>
            <div class="lyric" style="opacity:0.9;"><div class="lyric-t">让我漂流在安静的夜空里</div></div>
          </div>
        </div>
        <div class="clip" id="c3" data-start="12.4" data-duration="4.6" data-track-index="2">
          <div id="g3" style="position:absolute; right:150px; top:320px; opacity:0;">
            <div class="bubble"><div class="bubble-t">你也忒惨了点吧</div></div>
          </div>
        </div>
        <div class="clip" id="c4" data-start="17.0" data-duration="5.5" data-track-index="3">
          <div id="g4" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">你也不必牵强，再说爱我</div></div>
          </div>
        </div>
        <div class="clip" id="c5" data-start="23.4" data-duration="4.2" data-track-index="4">
          <div id="g5" style="position:absolute; left:0; right:0; top:300px; display:flex; justify-content:center; opacity:0;">
            <div class="bubble" style="transform:scale(1.15);"><div class="bubble-t">我靠！别唱了别唱了 🚽<br/>我拉完了就来找你</div></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#g1", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.0);
        tl.fromTo("#g2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 4.0);
        tl.fromTo("#g3", { opacity: 0, x: 150 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.5)" }, 12.4);
        tl.fromTo("#g4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 17.0);
        tl.fromTo("#g5", { opacity: 0, y: 60, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, 23.4);` });

// s4 76.6–94.5 我爱你 / 灵魂拼凑 / 片鱼片
scenes.push({ id: "s4", start: 76.6, dur: 17.9, body: `
        <div class="clip" id="c1" data-start="0.1" data-duration="8.2" data-track-index="0">
          <div id="g1" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">我从来没说过，我爱你</div></div>
          </div>
        </div>
        <div class="clip" id="c2" data-start="8.4" data-duration="9.5" data-track-index="1">
          <div id="g2" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; opacity:0;">
            <div class="lyric"><div class="lyric-t">反正我的灵魂，一片片掉落</div></div>
            <div id="puzzle" style="display:flex; gap:18px;">
              <div style="width:90px; height:90px; border-radius:12px; background:rgba(255,95,162,0.25); border:2px solid rgba(255,95,162,0.7); opacity:0;"></div>
              <div style="width:90px; height:90px; border-radius:12px; background:rgba(255,95,162,0.25); border:2px solid rgba(255,95,162,0.7); opacity:0;"></div>
              <div style="width:90px; height:90px; border-radius:12px; background:rgba(255,95,162,0.25); border:2px solid rgba(255,95,162,0.7); opacity:0;"></div>
              <div style="width:90px; height:90px; border-radius:12px; background:rgba(124,134,163,0.2); border:2px dashed rgba(138,143,163,0.8); opacity:0;"></div>
            </div>
            <div class="dim" style="font-size:38px; font-weight:700;">慢慢的拼凑…… 拼凑成一个完全不属于真正的我</div>
          </div>
        </div>
        <div class="clip" id="c3" data-start="11.9" data-duration="6" data-track-index="2">
          <div id="g3" style="position:absolute; left:0; right:0; top:830px; display:flex; justify-content:center; opacity:0;">
            <div class="bubble"><div class="bubble-t">哎…… 我怎么感觉，你像被片鱼片了呢 🐟</div></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#g1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.1);
        tl.fromTo("#g2", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 8.4);
        tl.fromTo("#puzzle div:nth-child(1)", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 9.2);
        tl.fromTo("#puzzle div:nth-child(2)", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 9.5);
        tl.fromTo("#puzzle div:nth-child(3)", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 9.8);
        tl.fromTo("#puzzle div:nth-child(4)", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, 11.2);
        tl.fromTo("#g3", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" }, 11.9);` });

// s5 94.5–101.4 punchline 收尾
scenes.push({ id: "s5", start: 94.5, dur: 6.9, body: `
        <div class="clip" id="c1" data-start="0.1" data-duration="5.4" data-track-index="0">
          <div id="g1" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="lyric"><div class="lyric-t">我不愿再放纵</div></div>
          </div>
        </div>
        <div class="clip" id="c2" data-start="5.3" data-duration="1.6" data-track-index="1">
          <div id="g2" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
            <div class="bubble" style="padding:36px 90px; transform:scale(1.3);"><div class="bubble-t" style="font-size:76px;">对！早睡早起身体好 ✨</div></div>
          </div>
        </div>
        <div class="clip" id="c3" data-start="6.4" data-duration="0.5" data-track-index="2">
          <div id="g3" style="position:absolute; inset:0; background:#0F0E1E; opacity:0;"></div>
        </div>`,
js: `
        tl.fromTo("#g1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.1);
        tl.to("#g1", { opacity: 0.3, duration: 0.4, ease: "power1.inOut" }, 4.4);
        tl.fromTo("#g2", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, 5.3);
        tl.to("#g3", { opacity: 1, duration: 0.45, ease: "power1.inOut" }, 6.4);` });

// 输出 ----------------------------------------------------------------------
let dur = 0;
for (const sc of scenes) {
  // 每场景独立 id 前缀，避免合成到同一页面后冲突
  const body = sc.body.replace(/id="c(\d)"/g, `id="${sc.id}-c$1"`).replace(/id="g(\d)"/g, `id="${sc.id}-g$1"`).replace(/id="puzzle"/g, `id="${sc.id}-puzzle"`);
  const js = sc.js
    .replace(/"#c(\d)/g, `"#${sc.id}-c$1`)
    .replace(/"#g(\d)/g, `"#${sc.id}-g$1`)
    .replace(/"#puzzle/g, `"#${sc.id}-puzzle`);
  const ambHtml = `<div class="clip" id="${sc.id}-amb" data-start="0" data-duration="${sc.dur}" data-track-index="8" data-layout-ignore>
          <div class="glow-p" id="${sc.id}-gp"></div>
          <div class="glow-c" id="${sc.id}-gc"></div>
        </div>`;
  const ambJs = `
        tl.fromTo("#${sc.id}-gp", { x: 0, y: 0 }, { x: 110, y: 50, duration: ${sc.dur}, ease: "none" }, 0);
        tl.fromTo("#${sc.id}-gc", { x: 0, y: 0 }, { x: -120, y: -60, duration: ${sc.dur}, ease: "none" }, 0);`;
  fs.writeFileSync(`compositions/${sc.id}.html`, shell(sc.id, sc.dur, body + "\n        " + ambHtml, js + "\n" + ambJs));
  dur = Math.max(dur, sc.start + sc.dur);
  console.log(`${sc.id}  ${sc.start.toFixed(1)}-${(sc.start + sc.dur).toFixed(1)}s`);
}
console.log("场景总数:", scenes.length, " 全片末尾:", dur.toFixed(1) + "s");
