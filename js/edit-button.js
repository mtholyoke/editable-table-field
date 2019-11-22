// Compiled to regular JS manually using https://babeljs.io/repl/
/**
 * @file
 * Run.
 */

(($, Drupal) => {
    /**
     * Executes.
     *
     * @type {Drupal~behavior}
     *
     * @prop {Drupal~behaviorAttach} attach
     *   Makes
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
