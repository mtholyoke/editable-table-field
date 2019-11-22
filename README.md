# editable-table-field

This module is a naïve proof-of-concept for creating a custom Drupal 8 field type for the `<editable-table>` web component from the [ELMS:LN LRNWebComponents monorepo](https://github.com/elmsln/lrnwebcomponents/), as a lightweight alternative to the [HAX module](https://www.drupal.org/project/hax).

## Installation and usage

:joy: Good luck.

This is not intended to be used in production, so we are deliberately not packaging it as a production-ready module.

We are developing it in the context of a live D8 project, and do so by cloning this project inside our custom modules directory and adding it to the `.gitignore` for the outer project.

Once it’s there, enable the module using your favorite method and then create a field that uses it.

## Current state

The edit button fires a JS alert, and we’re working on making it open the modal. After that will be connecting the actual JS.

## Future plans

If/when it works, we will decide whether to repackage it as a one-shot or try to expand to the more general case of using other LRNWebComponents (or other web components in general).

Depending on how that goes, the latter feels like a great candidate to become a contrib module at drupal.org. Watch this space.

This repo currently includes a copy of the `<editable-table>` web component, and through clever use of `npm` and associated scripts we expect to be able to build a distributable bundle to simplify what actually needs to be committed for production. We’re not opposed to taking advantage of [Libraries API](https://www.drupal.org/project/libraries) instead of including any of the other project’s code, but that also needs some work done to be ready for prime time.
