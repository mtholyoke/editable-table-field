let loaded = false;
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
      const $input = $("#edit-field-web-component-0-table", context);
      // $input.hide();
      if (!loaded) {
        console.log("okay");
        $.getScript(
          "HTTPS://LITS.LNDO.SITE/MODULES/CONTRIB/EDITABLE-TABLE-FIELD/js/main.js"
        );
        $.getScript(
          "HTTPS://LITS.LNDO.SITE/MODULES/CONTRIB/EDITABLE-TABLE-FIELD/js/1.js"
        );
        $.getScript(
          "HTTPS://LITS.LNDO.SITE/MODULES/CONTRIB/EDITABLE-TABLE-FIELD/js/2.js"
        );
        $.getScript(
          "HTTPS://LITS.LNDO.SITE/MODULES/CONTRIB/EDITABLE-TABLE-FIELD/js/3.js"
        );
        loaded = true;
      }
      $input
        .css("color", "red")
        .after("(will be hidden instead of red)")
        .after("<wired-spinner spinning duration='800'/>");
      // This may need an onChange handler to update the displayed copy.

      const $close = $('[title="Close"]');
      const $cancel = $(".use-ajax-cancel");
      const $button = $(".use-ajax-submit");

      $cancel.click(_ => {
        $close.click();
      });

      // eslint-disable-next-line no-unused-vars
      $button.click(_ => {
        const $data = $(".form-text");
        const $newInput = $data[$data.length - 1].value;
        $input.val($newInput);
        $close.click();
      });
    }
  };
})(jQuery, Drupal);
