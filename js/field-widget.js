/**
 * @file
 * Helper functions for the form containing an editable-table field.
 */
let loaded = false;
let onClickAdded = false;

const $template_table = '<div class="mystery"><div class="buttons">'
  +'<button '
  +'id="editmode-button" '
  +'aria-pressed="true" ' 
  +'controls="editmode"> '
  +'Toggle Edit Mode '
  +'</button> '
  +'</div> '
  +'<editable-table class="the_table" id="editmode" edit-mode></editable-table></div>';

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
    attach: _ => {
      const $input = $("#edit-field-web-component-0-table");
      $input.css("color", "red").after("(will be hidden instead of red)");

      const $close = $('[title="Close"]');
      const $cancel = $(".use-ajax-cancel");
      const $button = $(".use-ajax-submit");
      const $edit_button = $('[title="Edit me!"]');
      $edit_button.click(function() {
        if(!loaded) {
          loaded = $('.use-ajax-submit').length > 0 ? true : false ;
          $('.use-ajax-submit').before("<div class='mystery'>"+$template_table+"</div>");
        }
        if(loaded && !onClickAdded) {
          $tab =  $(".the_table");
          try {
            // console.log($tab);
            $items = JSON.parse($input.val());
            console.log($items);
            $keys = Object.keys($items);
            console.log($keys);
            $keys.forEach(k => {
              console.log($tab[0].k);
              console.log($items[k]);

              $tab[0][k] = $items[k];
            });
          }
          catch(e) {
            console.log("small issues, all good\n", e);
          }
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
        const $editedTable = $(".the_table")[0];
        const $toSave = JSON.stringify({
          caption: $editedTable.caption,
          data: $editedTable.data,
        });
        // const $toSave = $("editable-table")[0].shadowRoot.innerHTML;
        $input.val($toSave);
        $close.click();
        loaded = false;
        onClickAdded = false;
      });
    }
  };
})(jQuery, Drupal);