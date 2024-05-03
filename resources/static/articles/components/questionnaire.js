const componentHTML = `
     <div class="mb-3">
      <label for="description" class="form-label">Text content</label>
      <textarea class="form-control" id="description" name="data">{{content}}</textarea>
    </div>
  `;

const template = Handlebars.compile(componentHTML);

export { template as questionnaireComponent };