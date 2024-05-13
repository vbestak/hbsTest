function selectClosestParentFieldset(element) {
  let currentNode = element.parentNode;

  while (currentNode && currentNode !== document.documentElement) {
    if (currentNode.tagName === "FIELDSET") {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }

  return null;
}

export {selectClosestParentFieldset};