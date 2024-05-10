const componentHTML = `
     <div class="mb-3">
      <label for="description" class="form-label">Text content</label>
      <input type="text" class="form-control" id="data" name="data" value="{{data}}" />
    </div>
  `;

const template = Handlebars.compile(componentHTML);

export { template as paragraphComponent };