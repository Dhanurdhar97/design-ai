let lastData = null;

function applyColors() {
  const p = document.getElementById("primaryColor").value;
  const s = document.getElementById("secondaryColor").value;
  const a = document.getElementById("accentColor").value;

  document.documentElement.style.setProperty("--primary", p);
  document.documentElement.style.setProperty("--secondary", s);
  document.documentElement.style.setProperty("--accent", a);
}

function parseContent(text) {
  // Normalize line breaks
  const raw = text.replace(/\r/g, "").trim();
  const lines = raw.split("\n");

  const title = lines[0] || "Your Title";
  const subtitle = lines[1] || "Your subtitle here";

  // Everything after first 2 lines
  const body = lines.slice(2).join("\n").trim();

  let overviewParas = [];
  let features = [];

  let inFeatures = false;

  body.split("\n").forEach(line => {
    const l = line.trim();

    if (!l) return; // skip empty lines

    if (l.toLowerCase().includes("feature")) {
      inFeatures = true;
      return;
    }

    if (inFeatures && (l.startsWith("-") || l.startsWith("•"))) {
      features.push(l.replace(/^[-•]\s*/, "").trim());
    } else if (!inFeatures) {
      overviewParas.push(l);
    }
  });

  if (features.length === 0) {
    features = ["Feature One", "Feature Two", "Feature Three", "Feature Four"];
  }

  return { title, subtitle, overviewParas, features };
}

function randomLayout() {
  const layouts = ["a", "b", "c"];
  return layouts[Math.floor(Math.random() * layouts.length)];
}

function render(layout, data) {
  const { title, subtitle, overviewParas, features } = data;

  const overviewHtml = overviewParas.map(p => `<p>${p}</p>`).join("");
  const featuresHtml = features.map(f => `<div class="box">${f}</div>`).join("");

  let html = "";

  if (layout === "a") {
    html = `
      <div class="page layout-a">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section content">
          <h3>Overview</h3>
          ${overviewHtml}
          <div class="features">
            ${featuresHtml}
          </div>
        </div>
        <div class="footer">nFolks Data Solutions LLC</div>
      </div>
    `;
  }

  if (layout === "b") {
    html = `
      <div class="page layout-b">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section content">
          ${overviewHtml}
        </div>
        <div class="section features">
          ${featuresHtml}
        </div>
        <div class="footer">nFolks Data Solutions LLC</div>
      </div>
    `;
  }

  if (layout === "c") {
    html = `
      <div class="page layout-c">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="split">
          <div class="left">
            <h3>Overview</h3>
            ${overviewHtml}
          </div>
          <div class="right">
            <h3>Features</h3>
            ${featuresHtml}
          </div>
        </div>
        <div class="footer">nFolks Data Solutions LLC</div>
      </div>
    `;
  }

  document.getElementById("output").innerHTML = html;
}

function generate() {
  applyColors();
  const text = document.getElementById("rawContent").value;
  const data = parseContent(text);
  lastData = data;

  const layout = randomLayout();
  render(layout, data);
}

function regenerate() {
  if (!lastData) {
    alert("Generate first!");
    return;
  }
  applyColors();
  const layout = randomLayout();
  render(layout, lastData);
}
