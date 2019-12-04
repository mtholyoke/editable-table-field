<?php

namespace Drupal\editable_table_field\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;


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
      '#title' => t('Table'),
      '#default_value' => isset($items[$delta]->table) ? $items[$delta]->table : "",
      '#empty_value' => '',
      '#placeholder' => t('Table'),
    ];

    // This is a sketch and might not be right.
    $element['button'] = [
      '#type' => 'submit',
      '#value' => t('Edit me!'),
      '#name' => 'modal-open-button',
      '#attributes' => [
        'class' => [
          'editable-table-field_edit-button', 
        ],
      ],
      '#ajax' => [
        'callback' => [$this, 'ajax_test_dialog_form_callback_modal'],
      ],
    ];

    return $element;
  }

  /**
   * AJAX callback handler for ajax_test_dialog_form().
   */
  public static function ajax_test_dialog_form_callback_modal($form, &$form_state) {
    // it's a custom name and might depend on your own field name. 
    $field_name = 'field_test';
    $value = $form_state->getValue($field_name)[0]['table'];
    $content = [
      '#type' => 'container',
      'content' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        'content' => ['#markup' => $value],
        '#attributes' => ['class' => ['editor-wrapper']],
      ],
      '#attached' => ['library' => ['core/drupal.dialog.ajax', 'editable_table_field/edit_button']],
    ];
    $title = "Hi, I'm a Modal";
    $response = new AjaxResponse();
    $response->addCommand(new OpenModalDialogCommand($title, $content, ['width' => '700']));
    return $response;
  }
}
