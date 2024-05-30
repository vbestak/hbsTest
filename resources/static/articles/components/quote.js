const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
      {{#each languages}}
        <fieldset class="content fade d-none" role="tabpanel" data-tab-target="{{this}}" aria-labelledby="{{this}}">
          <label for="data" class="form-label">Quote</label>
          <textarea class="form-control" id="data" name="data">{{data}}</textarea>
        </fieldset>
      {{/each}}
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as quoteComponent };