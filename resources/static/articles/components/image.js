const componentHTML = `
     <div class="mb-3">
      <label for="src" class="form-label">Image src</label>
      <input type="text" class="form-control" id="src" name="src" value="{{src}}" />
    </div>
  `;

const template = Handlebars.compile(componentHTML);

export { template as imageComponent };