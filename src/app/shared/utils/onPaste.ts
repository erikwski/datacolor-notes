import { ElementRef } from '@angular/core';

/** avoid to paste HTML in contentEditable and parse to only text */
export const onPasteOnEl = (
  divElement: ElementRef<any>,
  pastedText: string
) => {
  if (divElement) {
    // Get the current selection
    const selection = window.getSelection();

    if (selection && selection.rangeCount == 0) {
      selection.addRange(document.createRange());
    }
    if (selection && selection.rangeCount > 0) {
      // Get the range of the current selection
      const range = selection?.getRangeAt(0);

      if (range) {
        // Delete the content in the current selection
        range?.deleteContents();

        // Insert the pasted text at the current selection
        range?.insertNode(document.createTextNode(pastedText));
      }

      // Move the selection to the end of the inserted content
      selection?.collapseToEnd();
    }
  }
};
