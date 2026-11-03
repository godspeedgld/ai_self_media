// 生成 compositions/captions.html —— 从 captions.json 的字幕分组构建静态 HTML
const { groups } = require("./captions.json");
const fs = require("fs");

// 每组窗口: 开 = max(前组关, 首词前0.08s), 关 = min(下组开, 尾词+0.3)
const wins = groups.map((g, i) => {
  const open = Math.max(0, +(g.start - 0.08).toFixed(2));
  const nextOpen = groups[i + 1] ? Math.max(0, +(groups[i + 1].start - 0.08).toFixed(2)) : 65.4;
  const close = Math.min(nextOpen, +(g.end + 0.3).toFixed(2));
  return { open, close: Math.max(close, open + 0.3), text: g.text };
});

const divs = wins
  .map(
    (w, i) =>
      `    <div id="cg${i}" class="clip cap" data-start="${w.open}" data-duration="${(w.close - w.open).toFixed(2)}" data-track-index="0"><span class="ct">${w.text}</span></div>`
  )
  .join("\n");

const tweens = wins
  .map((w, i) => `  tl.fromTo("#cg${i} .ct", { opacity: 0.4 }, { opacity: 1, duration: 0.14, ease: "power1.out" }, ${w.open});`)
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
        .ct { font-size: 58px; font-weight: 700; color: #ECF6FF; letter-spacing: 0.02em; text-shadow: 0 2px 14px rgba(4,18,31,0.85), 0 0 2px rgba(4,18,31,0.9); }
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
console.log("captions.html 写入完成, 组数:", wins.length);
