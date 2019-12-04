// const EditableTable = require ('../libraries/editable-table/editable-table.js'); 

// Uncaught SyntaxError: Cannot use import statement outside a module
import EditableTable from '../libraries/editable-table/editable-table.js'; 
/**
 * @file
 * Button to launch the modal dialog for editing the table.
 */

(($, Drupal) => {
  console.log(new EditableTable());
  /**
   * Creates an event handler to open the modal dialog.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the event handler to the appropriate button(s).
   */
  Drupal.behaviors.editorField = {
    attach: context => {
      $(".editor-wrapper", context).replaceWith(
        '<div class ="editor-wrapper"><EditableTable id ="table"> </EditableTable></div>'
        );
      console.log('hi!');
    }
  };
})(jQuery, Drupal);