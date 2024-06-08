import { formToPojo } from "../utils/index.js";
import { initiateComponentSelect, initiateCreateComponent, initiateTabs, resetActiveTab } from "./create.js";

const FORM_ID = "article";

function onSubmit(event) {
  event.preventDefault();
  const formPojo = formToPojo(this);
  const jsonData = JSON.stringify(formPojo);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  };

  fetch("/admin/articles", options)
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      return response.text();
    })
    .then(html => {

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      document.documentElement.innerHTML = doc.documentElement.innerHTML;
    }).then(() => {
      initiateOnSubmit();
      initiateCreateComponent();
      initiateComponentSelect(document.getElementById(FORM_ID));
      initiateTabs();
      resetActiveTab()
  })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function initiateOnSubmit() {
  document.getElementById(FORM_ID).addEventListener("submit", onSubmit);
}

document.addEventListener("DOMContentLoaded", function() {
  initiateOnSubmit();
});

