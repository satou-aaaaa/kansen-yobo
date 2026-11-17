// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、家と、その中の小さな炎。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="42" cy="56" r="26" fill="#fffdf7"/><circle cx="70" cy="34" r="14" fill="#f6d77a"/><circle cx="74" cy="70" r="9" fill="#fffdf7"/><path d="M30 58 l9 9 l17 -20" stroke="#b23a24" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
