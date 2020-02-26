/**
 * @file
 * Helper functions for the form containing an editable-table field.
 */
let loaded = false;
let onClickAdded = false;

const $templateTable =
  '<div class="mystery"><div class="buttons">' +
  "<button " +
  'id="editmode-button" ' +
  'aria-pressed="true" ' +
  'controls="editmode"> ' +
  "Toggle Edit Mode " +
  "</button> " +
  "</div> " +
  '<editable-table class="the_table" id="editmode" edit-mode></editable-table></div>';

const $warningTemplate =
  "<div class ='warning'>No table has been created yet. Click 'Edit me!' to start creating a table</div>";

function shouldDelete() {
  // eslint-disable-next-line no-restricted-globals, no-alert
  const conf = confirm("Are you sure you want to delete the table?");
  return conf;
}
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
    attach: () => {
      // get the text area with raw data and hide it
      const $input = $(".input-table").hide();
      // if there is data (the table has been created) - parse it into js object
      const $data = $input.val().length > 0 ? JSON.parse($input.val()) : {};
      const $keys = Object.keys($data);

      // add a preview of the tabe if there is none
      if ($(".edit-me").length === 0) {
        $input.after(
          '<editable-table-display aria-pressed="false" class="edit-me"></editable-table-display>'
        );
        const $table = $(".edit-me");
        // add the data to the table if there is any data
        if ($keys.length > 0) {
          $(".warning").hide();
          $keys.forEach(k => {
            $table[0][k] = $data[k];
          });
        } else {
          // if there is no data, add a warning that will say so
          $table.before($warningTemplate);
        }
      }

      const $close = $('[title="Close"]');
      const $cancel = $(".use-ajax-cancel");
      const $button = $(".use-ajax-submit");
      const $editButton = $('[title="Edit me!"]');

      // when the edit button has been clicked
      $editButton.click(
        (() => {
          // if it's the first loading, add a template table
          if (!loaded) {
            loaded = $(".use-ajax-submit").length > 0;
            $(".use-ajax-submit").before(
              `<div class='mystery'>${$templateTable}</div>`
            );
          }
          // if it isn't, but the modal is newly open, add the data to the table.
          // Tell the user if there are any erroes
          if (loaded && !onClickAdded) {
            const $tab = $(".the_table");
            try {
              $keys.forEach(k => {
                $tab[0][k] = $data[k];
              });
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log("small issues, all good\n", e);
            }
            onClickAdded = true;
            // add toggle mode buttons so the user can switch between edit and display mode
            const div = document.getElementById("editmode-button");
            div.onclick = e => {
              e.preventDefault();
              // originally used to be:
              //  pressed = button.getAttribute('aria-pressed')=== "true" ? "false" : "true"
              // reverse to that if breaks :)
              const button = document.getElementById("editmode-button");

              const pressed = !button.getAttribute("aria-pressed");
              button.setAttribute("aria-pressed", pressed);
              document.getElementById("editmode").toggleEditMode();
            };
            $(".delete-button").click(() => {
              const $delete = shouldDelete();
              if ($delete) {
                // close
                $cancel.click();
                $(".input-table").val("");
                const $warning = $(".warning");
                if ($warning.length > 0) {
                  $warning.show();
                } else {
                  $(".edit-me").before($warningTemplate);
                }
                $(".edit-me").replaceWith(
                  '<editable-table-display aria-pressed="false" class="edit-me"></editable-table-display>'
                );
              }
            });
          }
        })()
      );

      // cancel button behavior
      $cancel.click(() => {
        $close.click();
        loaded = false;
        onClickAdded = false;
      });

      // save button behavior
      $button.click(() => {
        const $editedTable = $(".the_table")[0];
        // console.log($(".the_table"));
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
          columnHeader: $editedTable.columnHeader,
          condensed: $editedTable.condensed,
          filter: $editedTable.filter,
          footer: $editedTable.footer,
          rowHeader: $editedTable.rowHeader,
          responsive: $editedTable.responsive,
          sort: $editedTable.sort,
          striped: $editedTable.striped,
          thead: $editedTable.thead,
          tbody: $editedTable.tbody,
          tfoot: $editedTable.tfoot
        };

        // save it to text-area
        $input.val(JSON.stringify($toSave));

        // update preview view
        const $table = $(".edit-me");
        const $newKeys = Object.keys($toSave);
        $newKeys.forEach(k => {
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
