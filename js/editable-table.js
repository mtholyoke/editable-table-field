// import '@lrnwebcomponents/editable-table/editable-table.js';
(($,_) => {
    console.log("hi");
    $.ajax({
        url: 'https://drive.google.com/file/d/1XrvDGCuS9MrfYr6kZUgMEUBcNBGoKQFK/view?usp=sharing',
        dataType: "script",
        success: (response) => {
          console.log("yay!", response)
        }
      });

})(jQuery, Drupal);

