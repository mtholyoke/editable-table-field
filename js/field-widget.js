/**
 * @file
 * Helper functions for the form containing an editable-table field.
 */

(($, Drupal) => {
  /**
   * Hides the input element so it’s still usable in the modal.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Identifies the instances in the containing form but not the modal.
   */
  Drupal.behaviors.editableTableFieldWidget = {
    attach: context => {
      const $input = $(".field--type-editabletable input[type='text']", context);
      // $input.hide();
      $input.css('color', 'red').after('(will be hidden instead of red)');
      // This may need an onChange handler to update the displayed copy.
    }
  };
})(jQuery, Drupal);
