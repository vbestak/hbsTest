const componentHTML = `
     <div class="mb-3">
       <label for="link" class="form-label">Link</label>
       <input class="form-control" id="link" name="link" value="{{link}}"/>
     </div>
  `;

const template = Handlebars.compile(componentHTML);

export { template as linkComponent };