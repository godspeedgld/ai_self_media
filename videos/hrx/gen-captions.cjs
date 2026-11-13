// 生成 compositions/captions.html —— OpenCC 繁→简 + 错字修正 + 分组
const fs = require("fs");
const OpenCC = require("opencc-js");
const words = require("./assets/transcript.json");
const HOST_DUR = 400.0;

const conv = OpenCC.Converter({ from: "tw", to: "cn" });
const FIXES = [
  ["黄乐女", "黄仁勋"],
  ["盗穷", "道琼"],
  ["一趴子打死", "一耙子打死"],
  ["假不通", "讲不通"],
  ["华人已经辞职", "黄仁勋已经辞职"],
  ["还创生", "还讲不通"],
];
const fixText = (s) => {
  let out = conv(s);
  for (const [from, to] of FIXES) out = out.split(from).join(to);
  return out;
};


// 词序列级修正（跨组短语）：滑动窗口拼接匹配 -> 替换词序列，时间按字符数比例合并
const SEQ_FIXES = [
  { from: '华人已经辞职', to: ['黄仁勋', '已经', '辞职'] },
  { from: '偷鸡的发动机', to: ['GE的发动机'] },
];
for (const fix of SEQ_FIXES) {
  const target = fix.from;
  let i = 0;
  while (i < words.length) {
    let acc = '', j = i;
    while (j < words.length && acc.length < target.length) {
      acc += conv(words[j].text).replace(/[，。？！?!,.s]/g, '');
      j++;
      if (acc.length >= target.length) break;
    }
    if (acc === target) {
      const spanStart = words[i].start, spanEnd = words[j - 1].end;
      const spanLen = spanEnd - spanStart;
      const totalChars = target.length;
      const repl = [];
      let cursor = 0;
      for (const txt of fix.to) {
        const s0 = spanStart + spanLen * (cursor / totalChars);
        cursor += txt.length;
        const s1 = spanStart + spanLen * (cursor / totalChars);
        repl.push({ text: txt, start: +s0.toFixed(2), end: +s1.toFixed(2) });
      }
      words.splice(i, j - i, ...repl);
      i += repl.length;
    } else { i++; }
  }
}
const SAFE = /[的了吗嘛吧呢啊就也都还去个条上来了后过先从那是地方要守说得看想搞]/;

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
        .ct { font-size: 54px; font-weight: 700; color: #F2F4F8; letter-spacing: 0.02em; text-shadow: 0 2px 14px rgba(6,8,13,0.85), 0 0 2px rgba(6,8,13,0.9); }
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
