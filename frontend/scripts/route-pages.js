// Runs after `craco build`. Render's static hosting only serves files that exist, so
// refreshing /services/<key> returned "Not Found". Copying the app's index.html to
// build/services/<key>/index.html gives every service page a real file (Render serves
// it at both /services/<key> and /services/<key>/); the app then routes as usual.
// Keys come from SERVICES in src/data/content.js: every service with `sections`
// has a page.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const build = path.join(root, "build");
const content = fs.readFileSync(path.join(root, "src/data/content.js"), "utf8");
const keys = [...content.matchAll(/key: "([\w-]+)"[^\n]*\bsections:/g)].map((m) => m[1]);

if (!keys.length) throw new Error("route-pages: no service pages found in content.js");

const html = fs.readFileSync(path.join(build, "index.html"));
for (const key of keys) {
  const dir = path.join(build, "services", key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}
console.log(`route-pages: wrote ${keys.length} service pages (${keys.join(", ")})`);
