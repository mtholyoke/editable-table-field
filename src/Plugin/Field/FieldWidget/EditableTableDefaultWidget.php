<?php

namespace Drupal\editable_table_field\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Plugin implementation of the 'EditableTableDefaultWidget' widget.
 *
 * @FieldWidget(
 *   id = "EditableTableDefaultWidget",
 *   label = @Translation("Editable table"),
 *   field_types = {
 *     "EditableTable"
 *   }
 * )
 */
class EditableTableDefaultWidget extends WidgetBase {

  /**
   * Define the form for the field type.
   *
   * Inside this method we can define the form used to edit the field type.
   *
   * Here there is a list of allowed element types: https://goo.gl/XVd4tA
   */
  public function formElement(FieldItemListInterface $items, $delta, Array $element, Array &$form, FormStateInterface $formState) {
    $element['table'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Table'),
      '#default_value' => isset($items[$delta]->table) ? $items[$delta]->table : "",
      '#empty_value' => '',
      '#placeholder' => '<editable-table></editable-table>',
    ];

    // This is a sketch and might not be right.
    $element['open_editor'] = [
      '#type' => 'link',
      '#title' => $this->t('Edit me!'),
      '#url' => Url::fromRoute('editable_table_field.edit_form'),
      '#attached' => ['library' => ['editable_table_field/edit_button']],
      // TODO: this part doesn't work and we need something like it that does.
      '#attributes' => [
        'class' => ['use-ajax', 'button'],
      ],
    ];

    $element['#attached']['library'][] = 'core/drupal.dialog.ajax';

    return $element;
  }

}
