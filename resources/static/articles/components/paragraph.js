const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
       <fieldset>
        <label for="description" class="form-label">Text content</label>
        <input type="text" class="form-control" id="data" name="data" value="{{data}}" />
      </fieldset>
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as paragraphComponent };