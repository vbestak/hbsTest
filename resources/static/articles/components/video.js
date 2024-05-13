const componentHTML = `
     <fieldset data-group="componentIntl" data-group-array>
       <fieldset>
          <label for="src" class="form-label">Video src</label>
          <input type="text" class="form-control" id="src" name="src" value="{{content}}" />
       </fieldset>
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as videoComponent };