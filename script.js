function getTemplate() {
  const params = new URLSearchParams(window.location.search);
  return params.get("template") || "corporate";
}

function applyColors() {
  const p = document.getElementById("primaryColor").value;
  const s = document.getElementById("secondaryColor").value;
  const a = document.getElementById("accentColor").value;

  document.documentElement.style.setProperty("--primary", p);
  document.documentElement.style.setProperty("--secondary", s);
  document.documentElement.style.setProperty("--accent", a);
}

document.addEventListener("input", (e) => {
  if (e.target && e.target.type === "color") applyColors();
});

function loadTemplate() {
  const t = getTemplate();
  const canvas = document.getElementById("canvas");
  let html = "";

  if (t === "corporate") {
    html = `
    <div class="corporate">
      <div class="header">
        <h1 contenteditable="true">Your Title</h1>
        <p contenteditable="true">Your subtitle goes here</p>
      </div>
      <div class="section">
        <h3 contenteditable="true">Overview</h3>
        <p contenteditable="true">Paste your overview text here...</p>
        <div class="features">
          <div class="box" contenteditable="true">Feature one</div>
          <div class="box" contenteditable="true">Feature two</div>
          <div class="box" contenteditable="true">Feature three</div>
          <div class="box" contenteditable="true">Feature four</div>
        </div>
      </div>
      <div class="footer" contenteditable="true">Your Company Name</div>
    </div>`;
  }

  if (t === "split") {
    html = `
    <div class="split">
      <div class="header">
        <h1 contenteditable="true">Your Title</h1>
        <p contenteditable="true">Subtitle here</p>
      </div>
      <div class="section content">
        <div>
          <h3 contenteditable="true">Overview</h3>
          <p contenteditable="true">Main content...</p>
        </div>
        <div>
          <h3 contenteditable="true">Features</h3>
          <div class="box" contenteditable="true">Feature one</div>
          <div class="box" contenteditable="true">Feature two</div>
          <div class="box" contenteditable="true">Feature three</div>
        </div>
      </div>
      <div class="footer" contenteditable="true">Your Company</div>
    </div>`;
  }

  if (t === "minimal") {
    html = `
    <div class="minimal">
      <div class="header">
        <h1 contenteditable="true">Your Title</h1>
        <p contenteditable="true">Subtitle</p>
      </div>
      <div class="section">
        <p contenteditable="true">Paste your content here...</p>
      </div>
      <div class="footer" contenteditable="true">Your Company</div>
    </div>`;
  }

  if (t === "hero-cards") {
    html = `
    <div class="hero-cards">
      <div class="hero">
        <h1 contenteditable="true">Big Hero Title</h1>
        <p contenteditable="true">Hero subtitle text</p>
      </div>
      <div class="section cards">
        <div class="box" contenteditable="true">Card one</div>
        <div class="box" contenteditable="true">Card two</div>
        <div class="box" contenteditable="true">Card three</div>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "editorial") {
    html = `
    <div class="editorial">
      <div class="header">
        <h1 contenteditable="true">Editorial Title</h1>
        <p contenteditable="true">Subtitle</p>
      </div>
      <div class="section columns">
        <p contenteditable="true">Column text 1...</p>
        <p contenteditable="true">Column text 2...</p>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "grid") {
    html = `
    <div class="grid">
      <div class="header">
        <h1 contenteditable="true">Grid Layout</h1>
        <p contenteditable="true">Subtitle</p>
      </div>
      <div class="section grid-wrap">
        <div class="box" contenteditable="true">Block 1</div>
        <div class="box" contenteditable="true">Block 2</div>
        <div class="box" contenteditable="true">Block 3</div>
        <div class="box" contenteditable="true">Block 4</div>
        <div class="box" contenteditable="true">Block 5</div>
        <div class="box" contenteditable="true">Block 6</div>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "product") {
    html = `
    <div class="product">
      <div class="header">
        <h1 contenteditable="true">Product Name</h1>
        <p contenteditable="true">Short tagline</p>
      </div>
      <div class="section product-wrap">
        <div>
          <p contenteditable="true">Product description...</p>
        </div>
        <div>
          <div class="box" contenteditable="true">Benefit 1</div>
          <div class="box" contenteditable="true">Benefit 2</div>
          <div class="box" contenteditable="true">Benefit 3</div>
        </div>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "brief") {
    html = `
    <div class="brief">
      <div class="header">
        <h1 contenteditable="true">Executive Brief</h1>
        <p contenteditable="true">Subtitle</p>
      </div>
      <div class="section summary">
        <p contenteditable="true">Key summary points...</p>
      </div>
      <div class="section">
        <p contenteditable="true">Details go here...</p>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "dark") {
    html = `
    <div class="dark">
      <div class="header">
        <h1 contenteditable="true">Dark Premium</h1>
        <p contenteditable="true">Bold subtitle</p>
      </div>
      <div class="section">
        <div class="box" contenteditable="true">Highlight 1</div>
        <div class="box" contenteditable="true">Highlight 2</div>
        <div class="box" contenteditable="true">Highlight 3</div>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  if (t === "startup") {
    html = `
    <div class="startup">
      <div class="header">
        <h1 contenteditable="true">Startup Title</h1>
        <p contenteditable="true">Build fast. Ship faster.</p>
      </div>
      <div class="section callouts">
        <div class="box" contenteditable="true">Fast</div>
        <div class="box" contenteditable="true">Secure</div>
        <div class="box" contenteditable="true">Scalable</div>
        <div class="box" contenteditable="true">Modern</div>
      </div>
      <div class="footer" contenteditable="true">Your Brand</div>
    </div>`;
  }

  canvas.innerHTML = html;
}

loadTemplate();

// Export to PDF
function downloadPDF() {
  const element = document.getElementById("canvas");
  const opt = {
    margin: 0.5,
    filename: "one-pager.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };
  html2pdf().set(opt).from(element).save();
}
