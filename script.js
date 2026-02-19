// ===== Header & Title Controls (same as Phase 1) =====
const logoInput = document.getElementById("logoInput");
const logoImg = document.getElementById("logo");

const toggleLogo = document.getElementById("toggleLogo");
const toggleContact = document.getElementById("toggleContact");
const toggleWebsite = document.getElementById("toggleWebsite");

const contactInput = document.getElementById("contactInput");
const websiteInput = document.getElementById("websiteInput");

const contactText = document.getElementById("contactText");
const websiteText = document.getElementById("websiteText");

const header = document.getElementById("header");
const headerStyle = document.getElementById("headerStyle");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const titleSize = document.getElementById("titleSize");
const titleAlign = document.getElementById("titleAlign");

const primaryColor = document.getElementById("primaryColor");
const bgColor = document.getElementById("bgColor");

const downloadBtn = document.getElementById("downloadBtn");

// Logo upload
logoInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { logoImg.src = reader.result; };
  reader.readAsDataURL(file);
});

// Toggles
toggleLogo.addEventListener("change", () => {
  logoImg.style.display = toggleLogo.checked ? "block" : "none";
});
toggleContact.addEventListener("change", () => {
  contactText.style.display = toggleContact.checked ? "block" : "none";
});
toggleWebsite.addEventListener("change", () => {
  websiteText.style.display = toggleWebsite.checked ? "block" : "none";
});

// Text inputs
contactInput.addEventListener("input", () => { contactText.innerText = contactInput.value; });
websiteInput.addEventListener("input", () => { websiteText.innerText = websiteInput.value; });

// Header style
headerStyle.addEventListener("change", () => {
  header.className = "header " + headerStyle.value;
});

// Title size & alignment
function updateTitleStyle() {
  title.className = titleSize.value + " " + titleAlign.value;
  subtitle.className = titleAlign.value;
}
titleSize.addEventListener("change", updateTitleStyle);
titleAlign.addEventListener("change", updateTitleStyle);
updateTitleStyle();

// Colors
primaryColor.addEventListener("input", () => {
  document.documentElement.style.setProperty("--primary", primaryColor.value);
});
bgColor.addEventListener("input", () => {
  document.getElementById("canvas").style.background = bgColor.value;
});

// ===== Grid & Blocks =====
const rowsInput = document.getElementById("rowsInput");
const colsInput = document.getElementById("colsInput");
const applyGridBtn = document.getElementById("applyGridBtn");
const grid = document.getElementById("grid");

// Block controls
const noBlockMsg = document.getElementById("noBlockMsg");
const blockControls = document.getElementById("blockControls");
const blockStyleSel = document.getElementById("blockStyle");
const blockTextSizeSel = document.getElementById("blockTextSize");
const blockBgColor = document.getElementById("blockBgColor");
const toggleBlockText = document.getElementById("toggleBlockText");
const toggleBlockBullets = document.getElementById("toggleBlockBullets");
const toggleBlockImage = document.getElementById("toggleBlockImage");
const blockImageInput = document.getElementById("blockImageInput");

let selectedBlock = null;

applyGridBtn.addEventListener("click", () => {
  const rows = parseInt(rowsInput.value, 10);
  const cols = parseInt(colsInput.value, 10);

  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  const total = rows * cols;
  for (let i = 0; i < total; i++) {
    const block = document.createElement("div");
    block.className = "block card text-m";

    const text = document.createElement("div");
    text.className = "block-text";
    text.contentEditable = "true";
    text.innerText = "Click to edit text...";

    const ul = document.createElement("ul");
    ul.className = "block-bullets";
    ul.style.display = "none";
    ul.innerHTML = "<li contenteditable='true'>Bullet 1</li><li contenteditable='true'>Bullet 2</li>";

    const img = document.createElement("img");
    img.className = "block-image";
    img.style.display = "none";

    block.appendChild(text);
    block.appendChild(ul);
    block.appendChild(img);

    block.addEventListener("click", (e) => {
      e.stopPropagation();
      selectBlock(block);
    });

    grid.appendChild(block);
  }

  deselectBlock();
});

function selectBlock(block) {
  document.querySelectorAll(".block").forEach(b => b.classList.remove("selected"));
  block.classList.add("selected");
  selectedBlock = block;

  noBlockMsg.style.display = "none";
  blockControls.style.display = "block";

  // Sync controls
  blockStyleSel.value = block.classList.contains("section") ? "section" : "card";
  blockTextSizeSel.value = block.classList.contains("text-s") ? "s" : block.classList.contains("text-l") ? "l" : "m";
  blockBgColor.value = rgbToHex(block.style.backgroundColor || "#ffffff");

  const textEl = block.querySelector(".block-text");
  const bulletsEl = block.querySelector(".block-bullets");
  const imgEl = block.querySelector(".block-image");

  toggleBlockText.checked = textEl.style.display !== "none";
  toggleBlockBullets.checked = bulletsEl.style.display !== "none";
  toggleBlockImage.checked = imgEl.style.display !== "none";
}

function deselectBlock() {
  selectedBlock = null;
  document.querySelectorAll(".block").forEach(b => b.classList.remove("selected"));
  noBlockMsg.style.display = "block";
  blockControls.style.display = "none";
}

document.body.addEventListener("click", (e) => {
  if (!e.target.closest(".block")) {
    deselectBlock();
  }
});

// Block controls events
blockStyleSel.addEventListener("change", () => {
  if (!selectedBlock) return;
  selectedBlock.classList.remove("card", "section");
  selectedBlock.classList.add(blockStyleSel.value);
});

blockTextSizeSel.addEventListener("change", () => {
  if (!selectedBlock) return;
  selectedBlock.classList.remove("text-s", "text-m", "text-l");
  selectedBlock.classList.add("text-" + blockTextSizeSel.value);
});

blockBgColor.addEventListener("input", () => {
  if (!selectedBlock) return;
  selectedBlock.style.background = blockBgColor.value;
});

toggleBlockText.addEventListener("change", () => {
  if (!selectedBlock) return;
  selectedBlock.querySelector(".block-text").style.display = toggleBlockText.checked ? "block" : "none";
});

toggleBlockBullets.addEventListener("change", () => {
  if (!selectedBlock) return;
  selectedBlock.querySelector(".block-bullets").style.display = toggleBlockBullets.checked ? "block" : "none";
});

toggleBlockImage.addEventListener("change", () => {
  if (!selectedBlock) return;
  selectedBlock.querySelector(".block-image").style.display = toggleBlockImage.checked ? "block" : "none";
});

blockImageInput.addEventListener("change", (e) => {
  if (!selectedBlock) return;
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imgEl = selectedBlock.querySelector(".block-image");
    imgEl.src = reader.result;
    imgEl.style.display = "block";
    toggleBlockImage.checked = true;
  };
  reader.readAsDataURL(file);
});

// Helper
function rgbToHex(rgb) {
  if (!rgb || rgb === "transparent") return "#ffffff";
  const res = rgb.match(/\d+/g);
  if (!res) return "#ffffff";
  return "#" + res.slice(0,3).map(x => (+x).toString(16).padStart(2,"0")).join("");
}

// ===== PDF Export (A4, 1 page) =====
downloadBtn.addEventListener("click", () => {
  const element = document.getElementById("canvas");
  const opt = {
    margin: 0,
    filename: "one-pager.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }
  };
  html2pdf().set(opt).from(element).save();
});
