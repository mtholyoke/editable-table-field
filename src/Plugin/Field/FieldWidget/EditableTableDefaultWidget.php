<?php

namespace Drupal\editable_table_field\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\ReplaceCommand;


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
    // Add the helper JS to the containing (nonmodal) form.
    $form['#attached']['library'][] = 'editable_table_field/field_widget';

    $value = $items[$delta]->table ?: '';
    $element['table'] = [
      '#type' => 'textfield',
      '#title' => t('Table'),
      '#default_value' => $value,
      '#empty_value' => '',
      '#placeholder' => '<editable-table/>',
    ];
    // Parts of the CSS ID of the table element above.
    $wrapper = ['edit', $items->getName(), $delta, 'table'];

    // Non-editable copy that we can apply the actual display code to:
    $element['table_display'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      'content' => ['#markup' => $value],
      '#attributes' => ['class' => ['baz']],
    ];

    // Launch the modal for editing the field contents.
    $element['button'] = [
      '#type' => 'submit',
      '#value' => t('Edit me!'),
      '#name' => 'modal-open-button',
      '#ajax' => [
        'callback' => [$this, 'modalEditForm'],
        'wrapper' => Html::cleanCssIdentifier(implode('-', $wrapper)),
      ],
    ];

    return $element;
  }

  /**
   * Ajax callback handler for editing the element.
   */
  public static function modalEditForm($form, &$form_state) {
    // get the id for the field
    $trigger = $form_state->getTriggeringElement();
    $field = $trigger['#parents'][0];
    $delta = $trigger['#parents'][1];
    $value = $form_state->getValue($field)[$delta]['table'];
    $widget = $form[$field]['widget'][$delta]['table'];
    $wrapper = $trigger['#ajax']['wrapper'];

    //create the form itself
    $content = [
      '#type' => 'container',
      'temp_ui' => [
        '#type' => 'fieldset',
        '#title' => t('Temp UI for ajax test'),
        'text' => $widget,
        'save' => [
          '#type' => 'submit',
          '#value' => t('Save'),
          '#attributes' => ['class' => ['use-ajax-submit']],
          '#attached' => ['library' => ['field_widget/field_widget', 'editable-table/editable-table']],
        ],
        'cancel' => [
          '#type' => 'submit',
          '#value' => t('Cancel'),
          '#attributes' => ['class' => ['use-ajax-cancel']],
          '#attached' => ['library' => ['field_widget/field_widget']],
        ],
      ],
      'content' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        'content' => ['#markup' => $value],
        '#attributes' => ['class' => ['foo']],
      ],
      '#attached' => ['library' => ['core/drupal.dialog.ajax']],
    ];
    $title = "Editable table";
    $response = new AjaxResponse();
    #$response->addCommand(new ReplaceCommand('#' . $wrapper, ['#markup' => 'yay!']));
    // TODO: maxwidth?
    $response->addCommand(new OpenModalDialogCommand($title, $content, ['width' => '95%']));
    return $response;
  }
}
