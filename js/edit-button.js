/**
 * @file
 * Button to launch the modal dialog for editing the table.
 */

(($, Drupal) => {
  /**
   * Creates an event handler to open the modal dialog.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the event handler to the appropriate button(s).
   */
  Drupal.behaviors.editableTableButton = {
    attach: context => {
      const $button = $(".editable-table-field_edit-button", context);
      $button.click(event => {
        alert("clicked!");
      });
    }
  };
})(jQuery, Drupal);
