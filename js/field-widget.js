/**
 * @file
 * Helper functions for the form containing an editable-table field.
 */
let loaded = false;
let onClickAdded = false;
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
      $input.css("color", "red").after("(will be hidden instead of red)");

      const $close = $('[title="Close"]');
      const $cancel = $(".use-ajax-cancel");
      const $button = $(".use-ajax-submit");

      const $edit_button = $('[title="Edit me!"]');
      $edit_button.click(function() {
        if(!loaded) {
          loaded = $('.use-ajax-submit').length > 0 ? true : false ;
          $('.use-ajax-submit').before(
              '<div class="buttons">'
              +'<button '
              +'id="editmode-button" '
              +'aria-pressed="true" ' 
              +'controls="editmode"> '
              +'Toggle Edit Mode '
              +'</button> '
              +'</div> '
              +'<editable-table id="editmode" edit-mode></editable-table>');
        }
        if(loaded && !onClickAdded) {
          onClickAdded = true;
          var div = document.getElementById("editmode-button");
          div.onclick = function(e){
              e.preventDefault();
              let button = document.getElementById('editmode-button'),
              pressed = button.getAttribute('aria-pressed') === "true" ? "false" : "true";
              button.setAttribute('aria-pressed',pressed);
              document.getElementById('editmode').toggleEditMode();
          }
        }
    }());


      $cancel.click(_ => {
        $close.click();
        loaded = false;
        onClickAdded = false;
      });

      // eslint-disable-next-line no-unused-vars
      $button.click(_ => {
        const $data = $(".form-text");
        const $newInput = $data[$data.length - 1].value;
        $input.val($newInput);
        $close.click();
        loaded = false;
        onClickAdded = false;
      });
    }
  };
})(jQuery, Drupal);