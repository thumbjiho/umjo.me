// GitHub Pages는 실제 파일이 있는 주소만 연다. /projects 같은 React 라우트로 바로 들어오면 404가 나므로
// 빌드 뒤 App.jsx의 라우트마다 dist/<route>/index.html 을 복사해 두고, 나머지 주소는 404.html 로 앱을 띄운다.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const routes = [...readFileSync("src/App.jsx", "utf8").matchAll(/path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "/");

for (const route of routes) {
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, html);
}
writeFileSync("dist/404.html", html);
console.log(`spa-routes: ${routes.join(", ")} + 404.html`);
