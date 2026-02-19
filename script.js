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
  const lines = text.split("\n");
  const title = lines[0] || "Your Title";
  const subtitle = lines[1] || "Your subtitle here";

  let overview = "";
  let features = [];
  let inFeatures = false;

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.toLowerCase().includes("feature")) {
      inFeatures = true;
      continue;
    }
    if (inFeatures && line.startsWith("-")) {
      features.push(line.replace("-", "").trim());
    } else {
      overview += line + " ";
    }
  }

  if (features.length === 0) {
    features = ["Feature One", "Feature Two", "Feature Three", "Feature Four"];
  }

  return { title, subtitle, overview, features };
}

function randomLayout() {
  const layouts = ["a", "b", "c"];
  return layouts[Math.floor(Math.random() * layouts.length)];
}

function render(layout, data) {
  const { title, subtitle, overview, features } = data;

  let featuresHtml = features.map(f => `<div class="box">${f}</div>`).join("");

  let html = "";

  if (layout === "a") {
    html = `
      <div class="page layout-a">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section">
          <h3>Overview</h3>
          <p>${overview}</p>
        </div>
        <div class="section features">
          ${featuresHtml}
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
        <div class="content">
          <div class="left">
            <h3>Overview</h3>
            <p>${overview}</p>
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

  if (layout === "c") {
    html = `
      <div class="page layout-c">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section">
          <p>${overview}</p>
          <div class="features">
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
