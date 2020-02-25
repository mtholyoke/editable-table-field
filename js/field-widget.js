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
      //get the text area with raw data and hide it
      const $input = $(".input-table").hide();
      //if there is data (the table has been created) - parse it into js object
      $data = $input.val().length > 0 ? JSON.parse($input.val()): {};
      $keys = Object.keys($data);

      //add a preview of the tabe if there is none
      if($(".edit-me").length===0){
        $input.after('<editable-table-display aria-pressed="false" class="edit-me"></editable-table-display>');
        $table = $('.edit-me');
        // add the data to the table if there is any data
        if($keys.length > 0) {
          $(".warning").hide();
          $keys.forEach(k => {
            $table[0][k] = $data[k];
          });
        }
        else {
          //if there is no data, add a warning that will say so
          $table.before("<div class ='warning'>No table has been created yet. Click 'Edit me!' to start creating a table</div>");
        }
      }

      const $close = $('[title="Close"]');
      const $cancel = $(".use-ajax-cancel");
      const $button = $(".use-ajax-submit");
      const $edit_button = $('[title="Edit me!"]');

      //when the edit button has been clicked
      $edit_button.click(function() {
        //if it's the first loading, add a template table
        if(!loaded) {
          loaded = $('.use-ajax-submit').length > 0;
          $('.use-ajax-submit').before("<div class='mystery'>"+$template_table+"</div>");
        }
        //if it isn't, but the modal is newly open, add the data to the table. 
        //Tell the user if there are any erroes
        if(loaded && !onClickAdded) {
          $tab =  $(".the_table");
          try {
            $keys.forEach(k => {
              $tab[0][k] = $data[k];
            });
          }
          catch(e) {
            console.log("small issues, all good\n", e);
          }
          onClickAdded = true;
          // add toggle mode buttons so the user can switch between edit and display mode
          var div = document.getElementById("editmode-button");
          div.onclick = function(e){
              e.preventDefault();
              // originally used to be:
              //  pressed = button.getAttribute('aria-pressed')=== "true" ? "false" : "true"
              // reverse to that if breaks :) 
              let button = document.getElementById('editmode-button'),
              pressed = !button.getAttribute('aria-pressed');
              button.setAttribute('aria-pressed', pressed);
              document.getElementById('editmode').toggleEditMode();
          }
        }
    }());

      // cancel button behavior
      $cancel.click(_ => {
        $close.click();
        loaded = false;
        onClickAdded = false;
      });

      // save button behavior
      $button.click(_ => {
        const $editedTable = $(".the_table")[0];
        // save all data into toSave object
        const $toSave = {
          caption: $editedTable.caption,
          data: $editedTable.data,
          hideBordered: $editedTable.hideBordered,
          hideCondensed: $editedTable.hideCondensed,
          hideStriped: $editedTable.hideStriped,
          hideResponsive: $editedTable.hideResponsive,
          hideDisplay: $editedTable.hideDisplay,
          hideSort: $editedTable.hideSort,
          hideFilter: $editedTable.hideFilter,
          hideSortFilter: $editedTable.hideSortFilter,
          csvData: $editedTable.csvData,
          dataCsv: $editedTable.dataCsv,
          editMode: $editedTable.editMode,
          th: $editedTable.th,
          row: $editedTable.row,
          tr: $editedTable.tr,
          cell: $editedTable.cell,
          td: $editedTable.td,
          bordered: $editedTable.bordered,
          caption: $editedTable.caption,
          columnHeader: $editedTable.columnHeader,
          condensed: $editedTable.condensed,
          data: $editedTable.data,
          filter: $editedTable.filter,
          footer: $editedTable.footer,
          rowHeader: $editedTable.rowHeader,
          responsive: $editedTable.responsive,
          sort: $editedTable.sort,
          striped: $editedTable.striped,
          thead: $editedTable.thead,
          tbody: $editedTable.tbody,
          tfoot: $editedTable.tfoot,
        };

        // save it to text-area 
        $input.val(JSON.stringify($toSave));

        // update preview view
        $table = $('.edit-me')
        $keys = Object.keys($toSave);
        $keys.forEach(k => {
          $table[0][k] = $toSave[k];
        });

        // hide the warning
        $(".warning").hide();

        // close
        $close.click();
        loaded = false;
        onClickAdded = false;
      });
    }
  };
})(jQuery, Drupal);