const componentHTML = `
     <fieldset data-group="componentIntl" data-group-array>
       {#each languages}}
         <fieldset class="content fade d-none" role="tabpanel" data-tab-target="{{this}}" aria-labelledby="{{this}}">
           <label for="link" class="form-label">Link</label>
           <input class="form-control" id="link" name="link" value="{{link}}"/>
         </fieldset>
      {{/each}}
     </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as linkComponent };