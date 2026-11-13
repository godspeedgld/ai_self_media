// 生成 compositions/s1..s17.html —— 「大意失荆州」之后第三部：黄仁勋事件时评
// 视觉系统: 深夜蓝黑 #0B0F1A / 冷白 #F2F4F8 / 红 #E5484D / 蓝 #5B9BFF / 金 #E6B455 / 灰蓝 #7C8698
const fs = require("fs");

const CSS = `
  @font-face { font-family: "HFZh"; src: local("Microsoft YaHei"), local("微软雅黑"); }
  #root { position: absolute; inset: 0; font-family: "HFZh", "Noto Sans JP", sans-serif; background: #0B0F1A; }
  .frame { position: absolute; inset: 26px; border: 1px solid rgba(124,134,152,0.25); pointer-events: none; }
  .chap { position: absolute; left: 48px; top: 44px; color: #7C8698; font-size: 30px; font-weight: 700; letter-spacing: 0.14em; }
  .glow1 { position: absolute; width: 1000px; height: 1000px; border-radius: 50%; background: radial-gradient(circle, rgba(91,155,255,0.05), transparent 65%); left: -220px; top: -260px; }
  .glow2 { position: absolute; width: 1200px; height: 1200px; border-radius: 50%; background: radial-gradient(circle, rgba(229,72,77,0.05), transparent 65%); right: -320px; bottom: -380px; }
  .ink { color: #F2F4F8; }
  .red { color: #E5484D; }
  .blue { color: #5B9BFF; }
  .gold { color: #E6B455; }
  .dim { color: #7C8698; }
`;

const shell = (id, dur, chap, body, js) => `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>${CSS}</style>
      <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
        <div class="frame" data-layout-ignore></div>
        <div class="chap" data-layout-ignore>${chap}</div>
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

const scenes = [];

// s1 开场 0–25.0
scenes.push({ id: "s1", start: 0, dur: 25.0, chap: "01 / 17", body: `
        <div class="clip" id="c-t" data-start="0" data-duration="25" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px;">
            <div id="t1" class="ink" style="font-size:128px; font-weight:900; letter-spacing:0.06em; opacity:0.25;">黄仁勋辞职</div>
            <div id="t2" style="opacity:0;"><span class="dim" style="font-size:48px; font-weight:700;">理由：</span><span class="red" style="font-size:76px; font-weight:900;">出轨</span><span class="dim" style="font-size:56px; font-weight:900;"> + </span><span class="blue" style="font-size:76px; font-weight:900;">间谍</span></div>
          </div>
        </div>
        <div class="clip" id="c-k" data-start="9.5" data-duration="15.5" data-track-index="1">
          <div style="position:absolute; left:0; right:0; top:800px; display:flex; justify-content:center; gap:36px;">
            <div id="k1" style="opacity:0; padding:18px 40px; border:2px solid rgba(124,134,152,0.6); border-radius:12px; color:#E8DCC0; color:#F2F4F8; font-size:38px; font-weight:700;">搞臭一个人：黄色段子</div>
            <div id="k2" style="opacity:0; padding:18px 40px; border:2px solid rgba(91,155,255,0.6); border-radius:12px; color:#F2F4F8; font-size:38px; font-weight:700;">川普也被告过强奸</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#t1", { opacity: 0.25, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power4.out" }, 0.02);
        tl.fromTo("#t2", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 4.6);
        tl.fromTo("#k1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 10.2);
        tl.fromTo("#k2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 16.5);` });

// s2 间谍指控 25.0–43.8
scenes.push({ id: "s2", start: 25.0, dur: 18.8, chap: "02 / 17", body: `
        <div class="clip" id="c-a" data-start="0.1" data-duration="18.7" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:100px;">
            <div style="display:flex; flex-direction:column; gap:30px;">
              <div id="a-t" class="ink" style="font-size:96px; font-weight:900;">说说间谍吧</div>
              <div id="a-doc" style="opacity:0; padding:26px 50px; border:3px solid rgba(124,134,152,0.5); border-radius:16px; background:rgba(20,26,40,0.6);">
                <div class="dim" style="font-size:36px; font-weight:700;">过硬的证据报告</div>
                <div class="red" style="font-size:72px; font-weight:900; margin-top:8px;">❌ 拿不出来</div>
              </div>
            </div>
            <div id="a-q" class="red" style="font-size:300px; font-weight:900; opacity:0;">？</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#a-t", { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.15);
        tl.fromTo("#a-doc", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 6.5);
        tl.fromTo("#a-q", { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }, 14.8);` });

// s3 历史诱捕案例 43.8–89.5
const caseCard = (id, num, title, at) => `
        <div class="clip" id="c-${id}" data-start="${at}" data-duration="${(45.7 - at).toFixed(1)}" data-track-index="${num}">
          <div id="g-${id}" style="position:absolute; left:0; right:0; top:${250 + num * 170}px; display:flex; justify-content:center; opacity:0;">
            <div style="width:1100px; padding:24px 50px; border:2px solid rgba(229,72,77,0.55); border-radius:16px; background:rgba(20,26,40,0.55); display:flex; justify-content:space-between; align-items:center;">
              <div><span class="dim" style="font-size:34px; font-weight:700; margin-right:24px;">案例 ${num}</span><span class="ink" style="font-size:52px; font-weight:900;">${title}</span></div>
              <span class="red" style="font-size:44px; font-weight:900; padding:8px 28px; border:3px solid #E5484D; border-radius:10px;">直接诱捕</span>
            </div>
          </div>
        </div>`;
scenes.push({ id: "s3", start: 43.8, dur: 45.7, chap: "03 / 17", body: `
        <div class="clip" id="c-h" data-start="0" data-duration="45.7" data-track-index="0">
          <div id="h-t" style="position:absolute; left:0; right:0; top:96px; text-align:center;"><span class="gold" style="font-size:54px; font-weight:900;">历史剧本：手上有过硬证据时——</span></div>
        </div>
        ${caseCard("e1", 1, "经济间谍", 6.2)}
        ${caseCard("e2", 2, "发动机技术", 12.2)}
        ${caseCard("e3", 3, "手机芯片技术", 20.2)}
        <div class="clip" id="c-now" data-start="36.3" data-duration="9.4" data-track-index="4">
          <div style="position:absolute; left:0; right:0; top:830px; display:flex; justify-content:center;">
            <div id="now-card" style="padding:20px 54px; border-radius:14px; border:3px solid #E6B455; background:rgba(230,180,85,0.08); opacity:0;">
              <span class="gold" style="font-size:52px; font-weight:900;">这次没有诱捕——只是媒体爆料</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#h-t", { opacity: 0, y: -22 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.2);
        [["#g-e1", 6.2], ["#g-e2", 12.2], ["#g-e3", 20.2]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, at);
        });
        tl.to("#g-e3", { x: 14, duration: 0.16, ease: "power1.in" }, 30.0);
        tl.to("#g-e3", { x: -12, duration: 0.16, ease: "power1.inOut" }, 30.16);
        tl.to("#g-e3", { x: 0, duration: 0.2, ease: "power1.out" }, 30.32);
        tl.fromTo("#now-card", { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }, 36.5);` });

// s4 流行解读 89.5–99.8
scenes.push({ id: "s4", start: 89.5, dur: 10.3, chap: "04 / 17", body: `
        <div class="clip" id="c-r" data-start="0.2" data-duration="10.1" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:40px;">
            <div id="r-k" class="dim" style="font-size:46px; font-weight:700;">流行的解读是——</div>
            <div id="r-q" style="padding:40px 70px; border-left:10px solid #5B9BFF; background:rgba(91,155,255,0.07); opacity:0;">
              <span class="ink" style="font-size:60px; font-weight:900;">华人不能在这种关键企业里，担任核心职位</span>
            </div>
            <div id="r-b" style="opacity:0;"><span class="gold" style="font-size:50px; font-weight:900;">但这，只是一种解读 →</span></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#r-k", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.25);
        tl.fromTo("#r-q", { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 2.4);
        tl.fromTo("#r-b", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 7.0);` });

// s5 大国竞争 99.8–127.8
scenes.push({ id: "s5", start: 99.8, dur: 28.0, chap: "05 / 17", body: `
        <div class="clip" id="c-d" data-start="0.1" data-duration="27.9" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:52px;">
            <div id="d1" style="opacity:0;"><span class="dim" style="font-size:44px; font-weight:700;">我想从另一个角度解读——这个角度是</span></div>
            <div id="d2" class="gold" style="font-size:130px; font-weight:900; letter-spacing:0.1em; opacity:0;">大国竞争</div>
            <div id="d3" style="opacity:0;"><span class="ink" style="font-size:74px; font-weight:900;">回到原点：<span class="blue">美国为什么要搞 AI？</span></span></div>
            <div style="display:flex; gap:30px; opacity:0;" id="d4">
              <div style="padding:14px 36px; border:2px solid rgba(124,134,152,0.5); border-radius:999px; color:#7C8698; font-size:34px; font-weight:700;">互联网</div>
              <div style="padding:14px 36px; border:2px solid rgba(124,134,152,0.5); border-radius:999px; color:#7C8698; font-size:34px; font-weight:700;">移动互联网</div>
              <div style="padding:14px 36px; border:2px solid rgba(230,180,85,0.8); border-radius:999px; color:#E6B455; font-size:34px; font-weight:900;">AI</div>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#d1", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.3);
        tl.fromTo("#d2", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power4.out" }, 3.2);
        tl.fromTo("#d3", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 8.5);
        tl.fromTo("#d4", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 15.0);` });

// s6 VR/5G 127.8–161.6
const techCard = (id, cls, top, name, quote) => `
        <div class="clip" id="c-${id}" data-start="${top}" data-duration="${(33.8 - top).toFixed(1)}" data-track-index="${id === "vr" ? 1 : 2}">
          <div id="g-${id}" style="position:absolute; left:0; right:0; top:${top}px; display:flex; justify-content:center; opacity:0;">
            <div style="width:900px; padding:26px 60px; border-radius:18px; background:rgba(20,26,40,0.6); border:2px solid rgba(229,72,77,0.5); text-align:center;">
              <div class="${cls}" style="font-size:66px; font-weight:900;">${name}</div>
              <div class="dim" style="font-size:36px; font-weight:700; margin-top:8px;">${quote}</div>
            </div>
          </div>
        </div>`;
scenes.push({ id: "s6", start: 127.8, dur: 33.8, chap: "06 / 17", body: `
        <div class="clip" id="c-t6" data-start="0" data-duration="33.8" data-track-index="0">
          <div id="t6" style="position:absolute; left:0; right:0; top:100px; text-align:center; opacity:0;"><span class="ink" style="font-size:56px; font-weight:900;">每项新技术诞生时，都没人知道未来</span></div>
        </div>
        ${techCard("vr", "blue", 180, "VR", "吹得天花乱坠")}
        ${techCard("g5", "blue", 400, "5G", "当时牛逼得要死")}
        <div class="clip" id="c-dead" data-start="16.8" data-duration="17" data-track-index="3">
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
            <div id="dead-x" style="font-size:340px; font-weight:900; color:#E5484D; opacity:0;">✕</div>
            <div id="dead-t" style="position:absolute; left:0; right:0; top:800px; text-align:center; opacity:0;"><span class="red" style="font-size:72px; font-weight:900;">现在还有人听吗？——没了</span></div>
          </div>
        </div>`,
js: `
        tl.fromTo("#t6", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.2);
        tl.fromTo("#g-vr", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 4.5);
        tl.fromTo("#g-g5", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 9.5);
        tl.fromTo("#dead-x", { opacity: 0, scale: 3, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "power4.in" }, 17.2);
        tl.to("#g-vr", { opacity: 0.25, duration: 0.4, ease: "power1.inOut" }, 17.2);
        tl.to("#g-g5", { opacity: 0.25, duration: 0.4, ease: "power1.inOut" }, 17.4);
        tl.fromTo("#dead-t", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 18.0);` });

// s7 没人敢打包票 161.6–177.9
scenes.push({ id: "s7", start: 161.6, dur: 16.3, chap: "07 / 17", body: `
        <div class="clip" id="c-p" data-start="0.1" data-duration="16.2" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:44px;">
            <div id="p1" style="padding:26px 60px; border-radius:18px; border:2px solid rgba(91,155,255,0.6); background:rgba(91,155,255,0.08); opacity:0;">
              <span class="ink" style="font-size:58px; font-weight:900;">10 年之后成不成？给个准话</span>
            </div>
            <div id="p2" style="padding:26px 60px; border-radius:18px; border:3px solid #E5484D; background:rgba(229,72,77,0.08); opacity:0;">
              <span class="red" style="font-size:58px; font-weight:900;">不成，砍我头</span>
            </div>
            <div id="p3" style="display:flex; gap:26px; opacity:0;">
              <span class="dim" style="font-size:48px; font-weight:900;">大佬们敢吗？——</span>
              <span class="red" style="font-size:66px; font-weight:900;">没人敢</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#p1", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.5);
        tl.fromTo("#p2", { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power4.out" }, 6.9);
        tl.fromTo("#p3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 12.6);` });

// s8 深层政府 177.9–194.0
scenes.push({ id: "s8", start: 177.9, dur: 16.1, chap: "08 / 17", body: `
        <div class="clip" id="c-dp" data-start="0.1" data-duration="16" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:46px;">
            <div id="q1" style="opacity:0;"><span class="ink" style="font-size:64px; font-weight:900;">关键问题：<span class="gold">深层政府</span>为什么也愿意砸资源推动 AI？</span></div>
            <div id="q2" style="opacity:0;"><span class="dim" style="font-size:46px; font-weight:700;">他们肯定想过这个问题——可能还有</span><span class="gold" style="font-size:54px; font-weight:900;">另外一层考虑</span></div>
            <div id="q3" class="gold" style="font-size:170px; font-weight:900; opacity:0;">……</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#q1", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.4);
        tl.fromTo("#q2", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 10.5);
        tl.fromTo("#q3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, 13.8);` });

// s9 星球大战 194.0–221.4
scenes.push({ id: "s9", start: 194.0, dur: 27.4, chap: "09 / 17", body: `
        <div class="clip" id="c-sw" data-start="0" data-duration="27.4" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; gap:40px;">
            <div id="sw-t" class="gold" style="font-size:96px; font-weight:900; margin-top:60px; opacity:0;">当年：星球大战计划</div>
            <div style="display:flex; gap:50px; margin-top:20px;">
              <div id="sw-a" style="opacity:0; width:560px; padding:30px 40px; border-radius:18px; border:3px solid rgba(91,155,255,0.6); background:rgba(91,155,255,0.06); text-align:center;">
                <div class="blue" style="font-size:48px; font-weight:900;">搞成了</div>
                <div class="ink" style="font-size:38px; font-weight:700; margin-top:10px;">当然最好</div>
              </div>
              <div id="sw-b" style="opacity:0; width:560px; padding:30px 40px; border-radius:18px; border:3px solid #E5484D; background:rgba(229,72,77,0.06); text-align:center;">
                <div class="red" style="font-size:48px; font-weight:900;">搞不成</div>
                <div class="ink" style="font-size:38px; font-weight:700; margin-top:10px;">把对手也拖下水</div>
              </div>
            </div>
            <div id="sw-usr" style="opacity:0; display:flex; align-items:center; gap:30px;">
              <span class="ink" style="font-size:46px; font-weight:900;">苏联：紧张了，也得搞</span>
              <span class="red" style="font-size:52px; font-weight:900;">→ 被活活拖垮</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#sw-t", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }, 0.1);
        tl.fromTo("#sw-a", { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 4.5);
        tl.fromTo("#sw-b", { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 8.8);
        tl.fromTo("#sw-usr", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 13.5);
        tl.to("#sw-usr", { opacity: 0.45, duration: 0.6, ease: "power1.inOut" }, 23.0);` });

// s10 中国跟不跟 221.4–242.4
scenes.push({ id: "s10", start: 221.4, dur: 21.0, chap: "10 / 17", body: `
        <div class="clip" id="c-cn" data-start="0.2" data-duration="20.8" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:48px;">
            <div id="cn1" style="padding:26px 70px; border-radius:18px; border:3px solid #E5484D; background:rgba(229,72,77,0.08); opacity:0;">
              <span class="red" style="font-size:66px; font-weight:900;">中国一想：万一是真的，也得搞</span>
            </div>
            <div id="cn2" style="display:flex; align-items:center; gap:26px; opacity:0;">
              <span class="dim" style="font-size:44px; font-weight:700;">这就是</span>
              <span class="gold" style="font-size:60px; font-weight:900;">深层的算盘</span>
              <span class="dim" style="font-size:44px; font-weight:700;">——把对手拖下水</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#cn1", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }, 0.3);
        tl.fromTo("#cn2", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 12.5);` });

// s11 万万没想到 242.4–265.1
scenes.push({ id: "s11", start: 242.4, dur: 22.7, chap: "11 / 17", body: `
        <div class="clip" id="c-ns" data-start="0" data-duration="22.7" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:46px;">
            <div id="ns-t" class="red" style="font-size:120px; font-weight:900; opacity:0;">万万没想到</div>
            <div style="display:flex; gap:46px; align-items:center;" id="ns-r">
              <div style="padding:24px 44px; border-radius:16px; border:3px solid #5B9BFF; text-align:center; opacity:0;" id="ns-us">
                <div class="blue" style="font-size:40px; font-weight:900;">美国</div>
                <div class="ink" style="font-size:44px; font-weight:700; margin-top:6px;">全力以赴</div>
              </div>
              <div class="dim" style="font-size:56px; font-weight:900; opacity:0;" id="ns-vs">VS</div>
              <div style="padding:24px 44px; border-radius:16px; border:3px solid #E5484D; text-align:center; opacity:0;" id="ns-cn">
                <div class="red" style="font-size:40px; font-weight:900;">中国</div>
                <div class="ink" style="font-size:44px; font-weight:700; margin-top:6px;">≤ 1/5 成本</div>
              </div>
            </div>
            <div id="ns-g" class="gold" style="font-size:60px; font-weight:900; opacity:0;">始终只落后美国半代</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#ns-t", { opacity: 0, scale: 2.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }, 0.05);
        tl.fromTo("#ns-us", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 4.2);
        tl.fromTo("#ns-vs", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, 4.7);
        tl.fromTo("#ns-cn", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 5.0);
        tl.fromTo("#ns-g", { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }, 11.8);
        tl.fromTo("#ns-g", { x: 0 }, { x: 10, duration: 0.12, ease: "power1.in" }, 17.5);
        tl.to("#ns-g", { x: -8, duration: 0.12, ease: "power1.inOut" }, 17.62);
        tl.to("#ns-g", { x: 0, duration: 0.16, ease: "power1.out" }, 17.74);` });

// s12 七姐妹垃圾债 265.1–287.4
const sister = (i) => `<div class="clip" id="c-s7-${i}" data-start="${(5.2 + i * 0.55).toFixed(2)}" data-duration="${(22.2 - 5.2 - i * 0.55).toFixed(2)}" data-track-index="${i + 1}">
          <div id="s7g-${i}" style="position:absolute; left:${140 + i * 240}px; top:430px; width:190px; padding:20px 0; text-align:center; border-radius:14px; border:2px solid rgba(124,134,152,0.55); background:rgba(20,26,40,0.5); opacity:0;">
            <div class="dim" style="font-size:30px; font-weight:700;">七姐妹 ${i + 1}</div>
            <div id="s7j-${i}" class="red" style="font-size:34px; font-weight:900; margin-top:8px; opacity:0;">垃圾债</div>
          </div>
        </div>`;
scenes.push({ id: "s12", start: 265.1, dur: 22.3, chap: "12 / 17", body: `
        <div class="clip" id="c-j" data-start="0" data-duration="22.3" data-track-index="0">
          <div id="j-t" style="position:absolute; left:0; right:0; top:120px; text-align:center; opacity:0;"><span class="ink" style="font-size:60px; font-weight:900;">看看<span class="blue">科技七姐妹</span>的债券价格——</span></div>
          <div id="j-b" style="position:absolute; left:0; right:0; top:660px; text-align:center; opacity:0;">
            <span class="dim" style="font-size:40px; font-weight:700;">政府的钱 · 金融手段的钱 · 造势的钱——全用上了</span>
          </div>
        </div>
        ${[0,1,2,3,4,5,6].map(sister).join("\n        ")}
        <div class="clip" id="c-dj" data-start="10" data-duration="12.3" data-track-index="9">
          <div id="dj" style="position:absolute; left:0; right:0; top:700px; text-align:center; opacity:0;">
            <span class="red" style="font-size:48px; font-weight:900;">再看道琼股票那个死样子——一看就是没钱了</span>
          </div>
        </div>`,
js: `
        tl.fromTo("#j-t", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.3);
        ${[0,1,2,3,4,5,6].map(i => `tl.fromTo("#s7g-${i}", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, ${(5.2 + i * 0.55).toFixed(2)});`).join("\n        ")}
        tl.to("#s7j-6", { opacity: 1, duration: 0.3, ease: "power1.out" }, 5.5);
        ${[0,1,2,3,4,5].map(i => `tl.to("#s7j-${i}", { opacity: 1, duration: 0.25, ease: "power1.out" }, ${(7.5 + i * 0.4).toFixed(2)});`).join("\n        ")}
        tl.fromTo("#dj", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 15.9);` });

// s13 泡沫要破 287.4–310.6
scenes.push({ id: "s13", start: 287.4, dur: 23.2, chap: "13 / 17", body: `
        <div class="clip" id="c-bub" data-start="0.2" data-duration="23" data-track-index="0">
          <div style="position:absolute; inset:0;">
            <div id="bub" style="position:absolute; left:760px; top:190px; width:400px; height:400px; border-radius:50%; border:5px solid rgba(91,155,255,0.55); background:radial-gradient(circle at 35% 30%, rgba(91,155,255,0.14), rgba(91,155,255,0.02));">
              <div style="text-align:center; margin-top:158px;"><span class="blue" style="font-size:64px; font-weight:900;">AI 泡沫</span></div>
              <svg viewBox="0 0 400 400" width="400" height="400" style="position:absolute; inset:0;">
                <path id="crack" d="M200 40 L178 150 L235 210 L186 300" fill="none" stroke="#E5484D" stroke-width="8" stroke-linecap="round" pathLength="100" stroke-dasharray="100 120" stroke-dashoffset="110"/>
              </svg>
            </div>
            <div id="bub-t" style="position:absolute; left:0; right:0; top:680px; text-align:center; opacity:0;">
              <span class="red" style="font-size:84px; font-weight:900;">眼见着，泡沫要破</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#bub", { opacity: 0, y: 220, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "power1.out" }, 0.2);
        tl.to("#bub", { y: -60, duration: 6, ease: "sine.inOut" }, 1.8);
        tl.to("#bub", { y: -30, duration: 5, ease: "sine.inOut" }, 7.8);
        tl.fromTo("#crack", { attr: { "stroke-dashoffset": 110 }, strokeDasharray: "100 120" }, { attr: { "stroke-dashoffset": 0 }, duration: 1.6, ease: "power2.in" }, 15.5);
        tl.fromTo("#bub-t", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 16.2);
        tl.to("#bub", { scale: 1.06, duration: 0.5, ease: "power1.inOut" }, 18.5);
        tl.to("#bub", { scale: 1, duration: 0.5, ease: "power1.inOut" }, 19.0);` });

// s14 扯淡+没钱 310.6–338.1
scenes.push({ id: "s14", start: 310.6, dur: 27.5, chap: "14 / 17", body: `
        <div class="clip" id="c-n" data-start="0.1" data-duration="27.4" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; gap:42px;">
            <div style="display:flex; gap:40px;" id="n1">
              <div style="padding:18px 44px; border-radius:14px; border:2px solid rgba(124,134,152,0.55); color:#F2F4F8; font-size:42px; font-weight:900; opacity:0;" id="n1a">OpenAI</div>
              <div style="padding:18px 44px; border-radius:14px; border:2px solid rgba(124,134,152,0.55); color:#F2F4F8; font-size:42px; font-weight:900; opacity:0;" id="n1b">Anthropic</div>
            </div>
            <div style="position:relative; height:150px; width:100%;" >
              <div id="n2" style="position:absolute; inset:0; display:flex; align-items:center; opacity:0;"><span class="ink" style="font-size:54px; font-weight:900;">「AI 会毁灭人类」</span></div>
              <div id="n3" data-layout-allow-overlap style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0;">
                <span style="white-space:nowrap; padding:10px 70px; border:9px solid #E5484D; border-radius:18px; color:#E5484D; font-size:110px; font-weight:900;">扯淡</span>
              </div>
            </div>
            <div id="n4" style="opacity:0;"><span class="dim" style="font-size:40px; font-weight:700;">一个统计模型，理论上就讲不通怎么毁灭人类</span></div>
            <div id="n5" style="display:flex; gap:60px; align-items:center; opacity:0;">
              <span class="gold" style="font-size:78px; font-weight:900;">本质：没钱了</span>
              <span class="dim" style="font-size:42px; font-weight:700;">美债短期收益率 5% · 大公司债已是垃圾级</span>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#n1a", { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.4);
        tl.fromTo("#n1b", { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.7);
        tl.fromTo("#n2", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 5.9);
        tl.fromTo("#n3 span", { opacity: 0, scale: 2.8, rotation: -8 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.35, ease: "power4.in" }, 8.6);
        tl.fromTo("#n4", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 10.4);
        tl.fromTo("#n5", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 14.6);` });

// s15 替罪羊 338.1–354.1
const noItem = (id, txt, at) => `<div class="clip" id="c-${id}" data-start="${at}" data-duration="${(16 - at).toFixed(1)}" data-track-index="${3 + at}">
          <div id="g-${id}" style="position:absolute; left:0; right:0; top:${(270 + (at - 4.8) * 130).toFixed(0)}px; display:flex; justify-content:center; opacity:0;">
            <div style="width:1000px; padding:22px 50px; border-radius:14px; background:rgba(20,26,40,0.55); border:2px solid rgba(124,134,152,0.5); display:flex; align-items:center; gap:30px;">
              <span class="red" style="font-size:52px; font-weight:900;">✗</span>
              <span class="dim" style="font-size:46px; font-weight:700; text-decoration:line-through;">${txt}</span>
            </div>
          </div>
        </div>`;
scenes.push({ id: "s15", start: 338.1, dur: 16.0, chap: "15 / 17", body: `
        <div class="clip" id="c-sy" data-start="0.1" data-duration="15.9" data-track-index="0">
          <div id="sy-t" style="position:absolute; left:0; right:0; top:110px; text-align:center; opacity:0;"><span class="ink" style="font-size:66px; font-weight:900;">这时候，你总得有个<span class="gold">交代</span></span></div>
        </div>
        ${noItem("a", "不能说我们没钱了", 4.8)}
        ${noItem("b", "不能说我们搞不下去了", 6.6)}
        ${noItem("c", "更不能说：我们跟中国的竞争失败了", 8.4)}
        <div class="clip" id="c-sy2" data-start="11.5" data-duration="4.5" data-track-index="8">
          <div style="position:absolute; left:0; right:0; top:640px; display:flex; justify-content:center;">
            <div id="sy2" style="padding:20px 64px; border-radius:16px; border:6px solid #E6B455; color:#E6B455; font-size:76px; font-weight:900; opacity:0;">所以——得找个替罪羊</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#sy-t", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.3);
        [["#g-a", 4.8], ["#g-b", 6.6], ["#g-c", 8.4]].forEach(([sel, at]) => {
          tl.fromTo(sel, { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, at);
        });
        tl.fromTo("#sy2", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power4.out" }, 11.6);` });

// s16 黄仁勋 354.1–380.6
scenes.push({ id: "s16", start: 354.1, dur: 26.5, chap: "16 / 17", body: `
        <div class="clip" id="c-jh" data-start="0.2" data-duration="26.3" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; gap:38px;">
            <div id="jh-n" class="ink" style="font-size:96px; font-weight:900; opacity:0;">黄仁勋 <span class="dim" style="font-size:44px; font-weight:700;">往周边一看</span></div>
            <div style="display:flex; gap:36px;" id="jh-tags">
              <div id="jh-t1" style="opacity:0; padding:16px 44px; border-radius:999px; border:3px solid #E5484D; color:#E5484D; font-size:46px; font-weight:900;">华人</div>
              <div id="jh-t2" style="opacity:0; padding:16px 44px; border-radius:999px; border:3px solid #E5484D; color:#E5484D; font-size:46px; font-weight:900;">出轨对象也是华人</div>
              <div id="jh-t3" style="opacity:0; padding:16px 44px; border-radius:999px; border:2px solid rgba(124,134,152,0.6); color:#7C8698; font-size:42px; font-weight:700;">大小长短，各种合适</div>
            </div>
            <div id="jh-hit" style="margin-top:16px; opacity:0;">
              <span class="red" style="font-size:100px; font-weight:900; letter-spacing:0.08em;">出轨 + 间谍，一耙子打死</span>
            </div>
            <div id="jh-st" class="gold" style="font-size:54px; font-weight:900; opacity:0;">交代出来了！</div>
          </div>
        </div>`,
js: `
        tl.fromTo("#jh-n", { opacity: 0, y: -28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.3);
        tl.fromTo("#jh-t1", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 3.3);
        tl.fromTo("#jh-t2", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 5.7);
        tl.fromTo("#jh-t3", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 8.2);
        tl.fromTo("#jh-hit", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power4.out" }, 10.0);
        tl.fromTo("#jh-st", { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power4.in" }, 14.5);
        tl.fromTo("#jh-st", { rotation: 0 }, { rotation: -4, duration: 0.18, ease: "sine.inOut" }, 14.9);
        tl.to("#jh-st", { rotation: 0, duration: 0.18, ease: "sine.inOut" }, 15.08);` });

// s17 结论 380.6–399.44
scenes.push({ id: "s17", start: 380.6, dur: 18.9, chap: "17 / 17", body: `
        <div class="clip" id="c-f" data-start="0.1" data-duration="18.8" data-track-index="0">
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:52px;">
            <div id="f1" style="opacity:0;"><span class="dim" style="font-size:46px; font-weight:700;">所以，或许搞黄仁勋——</span></div>
            <div id="f2" style="opacity:0;"><span class="ink" style="font-size:56px; font-weight:700;">「华人身份」也许是原因之一，</span><span class="dim" style="font-size:46px; font-weight:700;">但更是——</span></div>
            <div id="f3" style="text-align:center; opacity:0;">
              <div class="red" style="font-size:96px; font-weight:900; letter-spacing:0.06em;">AI 这场盛宴，结束了</div>
              <div class="gold" style="font-size:58px; font-weight:900; margin-top:20px;">总得有人，出来交代</div>
            </div>
          </div>
        </div>`,
js: `
        tl.fromTo("#f1", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0.2);
        tl.fromTo("#f2", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 4.8);
        tl.fromTo("#f3", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }, 9.8);` });

// 输出 ----------------------------------------------------------------------
let dur = 0;
for (const sc of scenes) {
  fs.writeFileSync(`compositions/${sc.id}.html`, shell(sc.id, sc.dur, sc.chap, sc.body, sc.js));
  dur = Math.max(dur, sc.start + sc.dur);
  console.log(`${sc.id}  ${sc.start.toFixed(1)}–${(sc.start + sc.dur).toFixed(1)}s`);
}
console.log("场景总数:", scenes.length, " 全片末尾:", dur.toFixed(1) + "s");
