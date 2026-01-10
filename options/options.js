const copyRow = function () {
  const row = this.closest("tr");
  const rowParent = row?.parentNode;
  if (rowParent) {
    const clone = row.cloneNode(true);
    const sibling = row.nextSibling;
    assignEvents(clone);
    rowParent.insertBefore(clone, sibling);
    return clone;
  }
  return null;
}

const removeRow = function () {
  const row = this.closest("tr");
  const rowParent = row?.parentNode;
  if (rowParent) {
    rowParent.removeChild(row);
  }
}

const assignEvents = function (root) {
  root.querySelectorAll(".btn-copy")
    .forEach(btn => btn.onclick = copyRow);

  root.querySelectorAll(".btn-delete")
    .forEach(btn => btn.onclick = removeRow);
}

assignEvents(document);
