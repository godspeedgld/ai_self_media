// 生成 captions.html —— 直接用校验过的台词行表（不走自动分组，杜绝跨组断词）
const fs = require("fs");
const HOST_DUR = 101.6;

// 定稿台词行表（用户校验后的版本）start = 该行开口时间
const LINES = [
  { start: 0.2,   tua: false, text: "🎵 改编歌哦——想问天，你在哪里啊 🎵" },
  { start: 10.0,  tua: true,  text: "呃…… 我在拉屎 💩" },
  { start: 13.2,  tua: false, text: "🎵 我想问问我自己 🎵" },
  { start: 18.48, tua: true,  text: "问呗" },
  { start: 21.0,  tua: false, text: "🎵 一开始我聪明，结束我聪明，聪明的几乎的毁掉了我自己 🎵" },
  { start: 30.51, tua: true,  text: "哦…… 这么惨" },
  { start: 33.2,  tua: false, text: "🎵 想问天，问大地 🎵" },
  { start: 41.3,  tua: true,  text: "不用不用！我拉屎呢 💩 拉完了再说" },
  { start: 45.0,  tua: false, text: "🎵 或者是迷信，问问宿命啊 🎵" },
  { start: 49.0,  tua: true,  text: "没救了" },
  { start: 53.2,  tua: false, text: "🎵 放下所有，抛下所有，让我漂流在安静的夜空里 🎵" },
  { start: 61.54, tua: true,  text: "哦，你也忒惨了点吧" },
  { start: 66.0,  tua: false, text: "🎵 你也不必牵强，再说爱我 🎵" },
  { start: 72.48, tua: true,  text: "我靠！别唱了别唱了 🚽 我拉完了就来找你" },
  { start: 76.64, tua: false, text: "🎵 我从来没说过，我爱你 🎵" },
  { start: 85.09, tua: false, text: "🎵 反正我的灵魂一片片掉落，慢慢的拼凑，拼凑成一个完全不属于真正的我 🎵" },
  { start: 88.3,  tua: true,  text: "哎，我怎么感觉你像被片鱼片了呢 🐟" },
  { start: 94.51, tua: false, text: "🎵 我不愿再放纵 🎵" },
  { start: 100.02, tua: true, text: "对！早睡早起身体好 ✨" },
];

const wins = LINES.map((line, i) => {
  const open = Math.max(0, +(line.start - 0.06).toFixed(2));
  const nextOpen = LINES[i + 1] ? Math.max(0, +(LINES[i + 1].start - 0.06).toFixed(2)) : HOST_DUR;
  const close = Math.min(nextOpen, open + 12);
  return { open, close: Math.max(close, open + 0.5), text: line.text, tua: line.tua };
});

const divs = wins
  .map(
    (w, i) =>
      `    <div id="cg${i}" class="clip cap ${w.tua ? "tua" : "sing"}" data-start="${w.open}" data-duration="${(w.close - w.open).toFixed(2)}" data-track-index="0"><span class="ct">${w.text}</span></div>`
  )
  .join("\n");
const tweens = wins
  .map((w, i) => {
    const from = w.tua ? "{ opacity: 0, x: 60 }" : "{ opacity: 0, x: -60 }";
    return `  tl.fromTo("#cg${i} .ct", ${from}, { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" }, ${w.open});`;
  })
  .join("\n");

const html = `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>
        @font-face { font-family: "HFZh"; src: local("Microsoft YaHei"), local("微软雅黑"); }
        #root { position: absolute; inset: 0; }
        .cap { position: absolute; left: 0; right: 0; bottom: 104px; display: flex; justify-content: center; font-family: "HFZh", "Noto Sans JP", sans-serif; overflow: visible; }
        .ct { font-size: 54px; font-weight: 900; letter-spacing: 0.02em; white-space: nowrap; }
        .sing .ct { color: #FF5FA2; text-shadow: 0 0 22px rgba(255,95,162,0.45), 0 2px 12px rgba(6,6,12,0.9); }
        .tua .ct { color: #4FC3F7; text-shadow: 0 0 22px rgba(79,195,247,0.45), 0 2px 12px rgba(6,6,12,0.9); }
      </style>
      <div id="root" data-composition-id="caps" data-width="1920" data-height="1080" data-track-kind="captions">
${divs}
      </div>
      <script>
        const tl = gsap.timeline({ paused: true });
${tweens}
        window.__timelines["caps"] = tl;
      <\/script>
    </template>
  </body>
</html>
`;

fs.writeFileSync("compositions/captions.html", html);
console.log("captions.html 完成, 组数:", wins.length, "（唱歌:", wins.filter(w=>!w.tua).length, "吐槽:", wins.filter(w=>w.tua).length + "）");
