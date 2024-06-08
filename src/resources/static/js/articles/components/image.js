const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
      {{#each languages}}
        <fieldset class="content fade d-none" role="tabpanel" data-tab-target="{{this}}" aria-labelledby="{{this}}">
            <input type="hidden" name="language" value="{{this}}" />
            <label for="src" class="form-label">Image src</label>
            <input type="text" class="form-control" id="src" name="src" value="{{src}}" />
         </fieldset>
      {{/each}}
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as imageComponent };