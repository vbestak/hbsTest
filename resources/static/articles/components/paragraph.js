const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
       {{#each languages}}
        <fieldset class="content fade d-none" role="tabpanel" data-tab-target="{{this}}" aria-labelledby="{{this}}">
          <label for="description" class="form-label">Text content</label>
          <input type="text" class="form-control" id="data" name="data" value="{{data}}" />
        </fieldset>
      {{/each}}
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as paragraphComponent };