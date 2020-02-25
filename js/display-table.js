(($, Drupal) => {
  /**
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   */
  Drupal.behaviors.editableTableDisplayTable = {
    attach: () => {
      const $div = $("#undrepressure");
      // get data and create a display table with this data
      const $data = JSON.parse($div.text());
      $div.replaceWith(
        '<editable-table-display aria-pressed="false" class="edit-me"></editable-table-display>'
      );
      const $table = $(".edit-me");
      const $keys = Object.keys($data);
      $keys.forEach(k => {
        $table[0][k] = $data[k];
      });
    }
  };
})(jQuery, Drupal);
