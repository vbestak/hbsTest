import { paragraphComponent } from "./components/paragraph.js";
import { fileComponent } from "./components/file.js";
import { imageComponent } from "./components/image.js";
import { linkComponent } from "./components/link.js";
import { questionnaireComponent } from "./components/questionnaire.js";
import { quoteComponent } from "./components/quote.js";
import { videoComponent } from "./components/video.js";

document.addEventListener("DOMContentLoaded", function() {
  const createButton = document.getElementById("createComponentButton");
  createButton.addEventListener("click", createComponent);
});


const COMPONENT_TYPES = ["PARAGRAPH", "FILE", "IMAGE",/* "LINK", "QUESTIONNAIRE"*/, "QUOTE", "VIDEO"];
const COMPONENT_BASE = `
<div class="card card-body mt-2">
  <div class="mb-3 js-stay">
    <label>Component:</label>
    <select name="type" class="form-select">
      <option selected disabled hidden>EMPTY</option>
      ${COMPONENT_TYPES.map((type) => `<option value="${type}">${type}</option>`)}
    </select>
   </div>
</div>
`;

function createComponent() {
  const container = document.getElementById("componentContainer");
  const componentHolder = document.createElement("form");

  componentHolder.name = "component";

  componentHolder.innerHTML = COMPONENT_BASE;
  container.appendChild(componentHolder);

  componentHolder.querySelector("select").addEventListener("change", function(ev) {
    const selectedType = ev.target.value;
    displayInputFields(selectedType, componentHolder.querySelector("div"));
  });
}

function displayInputFields(selectedType, cardBody) {
  Array.from(cardBody.children).forEach(child => {
    if (child.classList.contains("js-stay")) return;
    cardBody.removeChild(child);
  });

  switch (selectedType) {
    case "FILE":
      return generateFileInputs(cardBody);
    case "IMAGE":
      return generateImageInputs(cardBody);
    case "LINK":
      return generateLinkInputs(cardBody);
    case "PARAGRAPH":
      return generateParagraphInputs(cardBody);
    case "QUESTIONNAIRE":
      return generateQuestionnaireInputs(cardBody);
    case "QUOTE":
      return generateQuoteInputs(cardBody);
    case "VIDEO":
      return generateVideoInputs(cardBody);
    default:
      return;
  }
}

function generateFileInputs(container) {
  container.insertAdjacentHTML("beforeend", fileComponent());
}

function generateImageInputs(container) {
  container.insertAdjacentHTML("beforeend", imageComponent());
}

function generateLinkInputs(container) {
  container.insertAdjacentHTML("beforeend", linkComponent());
}

function generateParagraphInputs(container) {
  container.insertAdjacentHTML("beforeend", paragraphComponent());
}

function generateQuestionnaireInputs(container) {
  container.insertAdjacentHTML("beforeend", questionnaireComponent());
}

function generateQuoteInputs(container) {
  container.insertAdjacentHTML("beforeend", quoteComponent());
}

function generateVideoInputs(container) {
  container.insertAdjacentHTML("beforeend", videoComponent());
}
