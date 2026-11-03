// 生成 compositions/captions.html —— 无剪辑映射（音频已整理），带同音字修正
const fs = require("fs");
const words = require("./assets/transcript.json");
const HOST_DUR = 277.5;

// 同音字修正（转写稿 → 正确写法），长的先替换
const FIXES = [
  ["意识大意丢了", "一时大意丢了"],
  ["长袖善武", "长袖善舞"],
  ["方程防线", "方城防线"],
  ["大边山脉", "大别山脉"],
  ["龙中队", "隆中对"],
  ["金周", "荆州"],
  ["迷房", "糜芳"],
  ["财商", "柴桑"],
  ["两山相恰", "两山相夹"],
  ["完远千里", "蜿蜒千里"],
  ["进去中原", "进取中原"],
  ["应该如何进去", "应该如何进取"],
  ["动开", "洞开"],
  ["春秋武霸", "春秋五霸"],
  ["打一长阳", "打宜昌"],
  ["打长德", "打常德"],
  ["关于", "关羽"],
];

const SAFE = /[的了吗嘛吧呢啊就也都还去个条上来了后过先从那是地方要守北东在]/;

// 分组（与前一部片相同规则：标点/停顿≥0.15s 必断，≥7 字延到安全字）
const groups = [];
let g = [];
let chars = 0;
for (let i = 0; i < words.length; i++) {
  const w = words[i];
  g.push(w);
  chars += w.text.replace(/[，。？!?,.\s]/g, "").length;
  const nxt = words[i + 1];
  const punct = /[，。？！?!,.]$/.test(w.text);
  const pause = nxt ? nxt.start - w.end : 9;
  const soft = chars >= 7 && SAFE.test(w.text) && nxt && !punct && pause < 0.15;
  if (punct || pause >= 0.15 || soft || chars >= 9) {
    groups.push(g);
    g = [];
    chars = 0;
  }
}
if (g.length) groups.push(g);

// 组级文本修正
const fixText = (s) => {
  let out = s;
  for (const [from, to] of FIXES) out = out.split(from).join(to);
  return out;
};

const wins = groups.map((g, i) => {
  const open = Math.max(0, +(g[0].start - 0.08).toFixed(2));
  const nextOpen = groups[i + 1] ? Math.max(0, +(groups[i + 1][0].start - 0.08).toFixed(2)) : HOST_DUR;
  const close = Math.min(nextOpen, +(g[g.length - 1].end + 0.3).toFixed(2));
  return { open, close: Math.max(close, open + 0.3), text: fixText(g.map((x) => x.text).join("")) };
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
        .ct { font-size: 54px; font-weight: 700; color: #E8DCC0; letter-spacing: 0.02em; text-shadow: 0 2px 14px rgba(10,9,7,0.85), 0 0 2px rgba(10,9,7,0.9); }
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
console.log("captions.html 完成, 组数:", wins.length, "末组尾:", wins[wins.length - 1].close + "s");
