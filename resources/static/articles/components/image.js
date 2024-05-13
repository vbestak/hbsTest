const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
      <fieldset>
          <label for="src" class="form-label">Image src</label>
          <input type="text" class="form-control" id="src" name="src" value="{{src}}" />
       </fieldset>
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as imageComponent };