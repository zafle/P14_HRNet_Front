/**
 * Prevents unauthorized key inputs in a number field.
 * Allows only:
 * - Numeric digits (0-9)
 * - Arrow keys for navigation (Left, Right)
 * - Deletion keys (Backspace, Delete)
 * - Tab for navigation
 * - Edit actions using Ctrl or Meta (e.g., Ctrl+C, Ctrl+V)
 *
 * @param {KeyboardEvent} event - The keydown event to validate.
 */
export const preventUnauthorizedInputNumberKey = (event) => {
  if (
    !/[0-9]/.test(event.key) &&
    !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(
      event.key
    ) &&
    !(event.ctrlKey || event.metaKey)
  ) {
    event.preventDefault()
  }
}
