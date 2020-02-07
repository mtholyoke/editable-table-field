// import '@lrnwebcomponents/editable-table/editable-table.js';
(($, _) => {
  // eslint-disable-next-line no-console
  console.log("hi");
  $.ajax({
    url:
      "https://drive.google.com/file/d/1XrvDGCuS9MrfYr6kZUgMEUBcNBGoKQFK/view?usp=sharing",
    dataType: "script",
    success: response => {
      // eslint-disable-next-line no-console
      console.log("yay!", response);
    }
  });
})(jQuery, Drupal);
