const componentHTML = `
    <fieldset data-group="componentIntl" data-group-array>
       <fieldset>
        <!-- TODO -->
       </fieldset>
    </fieldset>
  `;

const template = Handlebars.compile(componentHTML);

export { template as questionnaireComponent };