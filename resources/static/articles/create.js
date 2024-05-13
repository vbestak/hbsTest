import {
  fileComponent,
  imageComponent,
  linkComponent,
  paragraphComponent,
  questionnaireComponent,
  quoteComponent,
  videoComponent
} from "./components/index.js";
import { selectClosestParentFieldset } from "../utils/index.js";


const COMPONENT_TYPES = ["PARAGRAPH", "FILE", "IMAGE",/* "LINK", "QUESTIONNAIRE"*/, "QUOTE", "VIDEO"];
const COMPONENT_BASE = `
<fieldset class="card card-body mt-2">
  <div class="mb-3 js-stay">
    <label>Component:</label>
    <select name="type" class="form-select">
      <option selected disabled hidden>EMPTY</option>
      ${COMPONENT_TYPES.map((type) => `<option value="${type}">${type}</option>`)}
    </select>
   </div>
</fieldset>
`;

function createComponent() {
  const container = document.getElementById("componentContainer");
  const componentHolder = document.createElement("div");

  componentHolder.innerHTML = COMPONENT_BASE;
  container.appendChild(componentHolder);

  componentHolder.querySelector("select").addEventListener("change", function(ev) {
    const selectedType = ev.target.value;
    displayInputFields(selectedType, componentHolder.querySelector("fieldset"));
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



function initiateCreateComponent() {
  const createButton = document.getElementById("createComponentButton");
  createButton.addEventListener("click", createComponent);
}

function initiateComponentSelect(form) {
  form.getElementById("componentContainer").querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", function(ev) {
      const selectedType = ev.target.value;
      displayInputFields(selectedType, selectClosestParentFieldset(select));
    });
  })
}

document.addEventListener("DOMContentLoaded", function() {
  initiateCreateComponent();
});

export { initiateComponentSelect, initiateCreateComponent }