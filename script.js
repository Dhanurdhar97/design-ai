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
  reader.onload = () => {
    logoImg.src = reader.result;
  };
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
contactInput.addEventListener("input", () => {
  contactText.innerText = contactInput.value;
});
websiteInput.addEventListener("input", () => {
  websiteText.innerText = websiteInput.value;
});

// Header style
headerStyle.addEventListener("change", () => {
  header.className = "header " + headerStyle.value;
});

// Title size & align
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

// PDF Export (A4, 1 page)
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
