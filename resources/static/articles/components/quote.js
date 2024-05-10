const componentHTML = `
     <div class="mb-3">
      <label for="data" class="form-label">Quote</label>
      <textarea class="form-control" id="data" name="data">{{data}}</textarea>
    </div>
  `;

const template = Handlebars.compile(componentHTML);

export { template as quoteComponent };