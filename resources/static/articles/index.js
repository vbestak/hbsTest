function submitForm(event) {
  event.preventDefault();

  let article = {
    components: [],
    articleIntl: []
  };

  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    const formData = new FormData(form);

    if (form.name === "component") {
      article["components"].push(formDataToObject(formData));
    } else if (form.name === "articleIntl") {
      article["articleIntl"].push(formDataToObject(formData));
    } else {
      article = { ...article, ...formDataToObject(formData) };
    }
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(article)
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
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


function formDataToObject(formData) {
  const res = {};

  for (const [key, value] of formData.entries()) {
    res[key] = value;
  }

  return res;
}
