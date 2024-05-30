const componentHTML = `
     <fieldset data-group="componentIntl" data-group-array>
        {{#each languages}}
          <fieldset class="content fade d-none" role="tabpanel" data-tab-target="{{this}}" aria-labelledby="{{this}}">
            <label for="src" class="form-label">Video src</label>
            <input type="text" class="form-control" id="src" name="src" value="{{content}}" />
         </fieldset>
       {{/each}}
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as videoComponent };