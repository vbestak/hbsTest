import { selectClosestParentFieldset } from "./selectClosestParentFieldset.js";

const DATA_GROUP_ROOT_NAME = "root";
const DATA_GROUP_ATTRIBUTE = "group";
const DATA_GROUP_ARRAY_ATTRIBUTE = "group-array";

function formToPojo(form) {
  const serialized = {};

  function serializeFieldset(fieldset) {
    const isGroupType = fieldset.hasAttribute("data-" + DATA_GROUP_ARRAY_ATTRIBUTE);
    const data = isGroupType ? [] : {};

    if (!isGroupType) {
      const inputs = fieldset.querySelectorAll("input, select, textarea");

      inputs.forEach(input => {
        const closestFieldSet = input.closest("fieldset");

        if (fieldset.isSameNode(closestFieldSet)) {
          const fieldName = input.name;
          const value = input.value;
          data[fieldName] = value;
        }
      });
    }


    fieldset.querySelectorAll("fieldset").forEach(nestedFieldset => {
      const closestFieldSet = selectClosestParentFieldset(nestedFieldset);

      if (!closestFieldSet) return;
      if (!closestFieldSet.isSameNode(fieldset)) return;

      const group = nestedFieldset.dataset[DATA_GROUP_ATTRIBUTE];

      const nestedData = serializeFieldset(nestedFieldset);
      if (nestedData === null) return;

      if (isGroupType) {
        data.push(nestedData);
      } else if(group) {
        data[group] = nestedData;
      }
    });

    return data;
  }

  const fieldset = form.querySelector(":scope > fieldset");
  const group = fieldset.dataset[DATA_GROUP_ATTRIBUTE];
  if (group !== DATA_GROUP_ROOT_NAME) return serialized;

  return serializeFieldset(fieldset);
}

export { formToPojo };