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

const TAB_ATTRIBUTE = "data-tab-target";
const COMPONENT_TYPES = ["PARAGRAPH", "FILE", "IMAGE", "QUOTE", "VIDEO"];
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

function getLanguages() {
  const DEFAULT = [];
  const container = document.getElementById("langData");
  if (!container) return DEFAULT;

  const formData = new FormData(container);
  const formObject = Object.fromEntries(formData);
  return Object.values(formObject);
}

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

  const data = { languages: getLanguages() };

  switch (selectedType) {
    case "FILE":
      generateFileInputs(cardBody, data);
      break;
    case "IMAGE":
      generateImageInputs(cardBody, data);
      break;
    case "LINK":
      generateLinkInputs(cardBody, data);
      break;
    case "PARAGRAPH":
      generateParagraphInputs(cardBody, data);
      break;
    case "QUESTIONNAIRE":
      generateQuestionnaireInputs(cardBody, data);
      break;
    case "QUOTE":
      generateQuoteInputs(cardBody, data);
      break;
    case "VIDEO":
      generateVideoInputs(cardBody, data);
      break;
    default:
      break;
  }

  resetActiveTab();
}

function generateFileInputs(container, data) {
  container.insertAdjacentHTML("beforeend", fileComponent(data));
}

function generateImageInputs(container, data) {
  container.insertAdjacentHTML("beforeend", imageComponent(data));
}

function generateLinkInputs(container, data) {
  container.insertAdjacentHTML("beforeend", linkComponent(data));
}

function generateParagraphInputs(container, data) {
  container.insertAdjacentHTML("beforeend", paragraphComponent(data));
}

function generateQuestionnaireInputs(container, data) {
  container.insertAdjacentHTML("beforeend", questionnaireComponent(data));
}

function generateQuoteInputs(container, data) {
  container.insertAdjacentHTML("beforeend", quoteComponent(data));
}

function generateVideoInputs(container, data) {
  container.insertAdjacentHTML("beforeend", videoComponent(data));
}

function resetActiveTab() {
  const button = document.querySelector(`button[${TAB_ATTRIBUTE}].active`);
  if (button) {
    button.click();
  }
}

function initiateCreateComponent() {
  const createButton = document.getElementById("createComponentButton");
  createButton.addEventListener("click", createComponent);
}

function initiateComponentSelect(form) {
  form.querySelector("#componentContainer").querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", function(ev) {
      const selectedType = ev.target.value;
      displayInputFields(selectedType, selectClosestParentFieldset(select));
    });
  });
}

function initiateTabs() {
  const buttons = document.querySelectorAll(`button[${TAB_ATTRIBUTE}]`);

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      const contents = document.querySelectorAll(".content");

      const target = button.getAttribute(TAB_ATTRIBUTE);

      buttons.forEach(function(button) {
        if (button.getAttribute(TAB_ATTRIBUTE) === target) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });

      contents.forEach(function(content) {
        if (content.getAttribute(TAB_ATTRIBUTE) === target) {
          content.classList.remove("d-none");
          content.classList.add("show");
        } else {
          content.classList.remove("show");
          content.classList.add("d-none");
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  initiateCreateComponent();
  initiateTabs();
});

export { initiateComponentSelect, initiateCreateComponent, initiateTabs };