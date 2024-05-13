const componentHTML = `
     <fieldset data-group="componentIntl" data-group-array>
       <fieldset>
         <label for="link" class="form-label">Link</label>
         <input class="form-control" id="link" name="link" value="{{link}}"/>
       </fieldset>
     </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as linkComponent };