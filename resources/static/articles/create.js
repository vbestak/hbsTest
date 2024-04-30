const COMPONENT_TYPES = ["FILE", "IMAGE", "LINK", "PARAGRAPH", "QUESTIONNAIRE", "QUOTE", "VIDEO"];
const COMPONENT_BASE = `
<div class="card card-body mt-2">
  <div class="mb-3 js-stay">
    <label>Component Type:</label>
    <select name="componentType" class="form-select">
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
  // TODO
}

function generateImageInputs(container) {
  // TODO
}

function generateLinkInputs(container) {
  // TODO
}

function generateParagraphInputs(container) {
  const textAreaHTML = `
     <div class="mb-3">
      <label for="description" class="form-label">Text content: {{title}}</label>
      <textarea class="form-control" id="description" name="data">{{content}}</textarea>
    </div>
  `;

  var template = Handlebars.compile(textAreaHTML);

// Define data for rendering
  var data = {
    title: "Hello",
    content: "This is some content."
  };

  container.insertAdjacentHTML("beforeend", template(data));
}

function generateQuestionnaireInputs(container) {
  // TODO
}

function generateQuoteInputs(container) {
  // TODO
}

function generateVideoInputs(container) {
  // TODO
}
