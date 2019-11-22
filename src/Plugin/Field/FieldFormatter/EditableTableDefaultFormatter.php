<?php

namespace Drupal\editable_table_field\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'EditableTableDefaultFormatter' formatter.
 *
 * @FieldFormatter(
 *   id = "EditableTableDefaultFormatter",
 *   label = @Translation("Editable table"),
 *   field_types = {
 *     "EditableTable"
 *   }
 * )
 */
class EditableTableDefaultFormatter extends FormatterBase {

  /**
   * Define how the field type is showed.
   *
   * Inside this method we can customize how the field is displayed inside
   * pages.
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#type' => 'markup',
        '#markup' => $item->table,
      ];
    }
    return $elements;
  }

}
