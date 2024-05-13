const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
      <fieldset>
        <label for="data" class="form-label">Quote</label>
        <textarea class="form-control" id="data" name="data">{{data}}</textarea>
      </fieldset>
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as quoteComponent };