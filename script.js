let lastData = null;

function applyColors() {
  const p = document.getElementById("primaryColor").value;
  const s = document.getElementById("secondaryColor").value;
  const a = document.getElementById("accentColor").value;

  document.documentElement.style.setProperty("--primary", p);
  document.documentElement.style.setProperty("--secondary", s);
  document.documentElement.style.setProperty("--accent", a);
}

// Simple summarizer: keep first 2 sentences
function summarize(text, maxSentences = 2) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, maxSentences).join(" ");
}

// Detect sections by keywords
function parseContent(text) {
  const raw = text.replace(/\r/g, "").trim();
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

  const title = lines[0] || "Your Title";
  const subtitle = lines[1] || "Your subtitle here";

  const bodyLines = lines.slice(2);

  let sections = {
    overview: [],
    benefits: [],
    features: [],
    others: []
  };

  let current = "overview";

  bodyLines.forEach(line => {
    const l = line.toLowerCase();

    if (l.includes("overview")) current = "overview";
    else if (l.includes("benefit")) current = "benefits";
    else if (l.includes("feature")) current = "features";
    else if (l.includes("impact") || l.includes("use case")) current = "others";

    if (line.startsWith("-") || line.startsWith("•")) {
      sections.features.push(line.replace(/^[-•]\s*/, ""));
    } else {
      sections[current].push(line);
    }
  });

  // Summarize long sections
  const overviewText = summarize(sections.overview.join(" "), 3) || "Overview will appear here.";
  const benefitsText = summarize(sections.benefits.join(" "), 3);
  const othersText = summarize(sections.others.join(" "), 3);

  let features = sections.features;
  if (features.length === 0) {
    features = ["Feature One", "Feature Two", "Feature Three", "Feature Four"];
  }

  return {
    title,
    subtitle,
    overview: overviewText,
    benefits: benefitsText,
    others: othersText,
    features
  };
}

function randomLayout() {
  const layouts = ["a", "b", "c"];
  return layouts[Math.floor(Math.random() * layouts.length)];
}

function render(layout, data) {
  const { title, subtitle, overview, benefits, others, features } = data;

  const featuresHtml = features.map(f => `<div class="box">${f}</div>`).join("");

  let extraSections = "";
  if (benefits) extraSections += `<h3>Benefits</h3><p>${benefits}</p>`;
  if (others) extraSections += `<h3>Additional</h3><p>${others}</p>`;

  let html = "";

  if (layout === "a") {
    html = `
      <div class="page layout-a" id="pdfContent">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section content">
          <h3>Overview</h3>
          <p>${overview}</p>
          ${extraSections}
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
      <div class="page layout-b" id="pdfContent">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="section content">
          <h3>Overview</h3>
          <p>${overview}</p>
          ${extraSections}
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
      <div class="page layout-c" id="pdfContent">
        <div class="header">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="split">
          <div class="left">
            <h3>Overview</h3>
            <p>${overview}</p>
            ${extraSections}
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

// Export to PDF
function downloadPDF() {
  const element = document.getElementById("pdfContent");
  if (!element) {
    alert("Generate the design first!");
    return;
  }

  const opt = {
    margin: 0.5,
    filename: "one-pager.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save();
}
