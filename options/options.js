const moveRowUp = function () {
  const row = this.closest("tr");
  const sibling = row?.previousElementSibling;
  sibling?.parentNode.insertBefore(row, sibling);
}

const moveRowDown = function () {
  const row = this.closest("tr");
  const sibling = row?.nextElementSibling;
  sibling?.parentNode.insertBefore(sibling, row);
}

const copyRow = function () {
  const row = this.closest("tr");
  const rowParent = row?.parentNode;
  if (rowParent) {
    const clone = row.cloneNode(true);
    const sibling = row.nextElementSibling;
    assignEvents(clone);
    rowParent.insertBefore(clone, sibling);
    return clone;
  }
  return null;
}

const removeRow = function () {
  const row = this.closest("tr");
  const rowParent = row?.parentNode;
  rowParent?.removeChild(row);
}

const assignEvents = function (root) {
  root.querySelectorAll(".btn-move-up")
    .forEach(btn => btn.onclick = moveRowUp);

  root.querySelectorAll(".btn-move-down")
    .forEach(btn => btn.onclick = moveRowDown);

  root.querySelectorAll(".btn-copy")
    .forEach(btn => btn.onclick = copyRow);

  root.querySelectorAll(".btn-delete")
    .forEach(btn => btn.onclick = removeRow);
}

assignEvents(document);
