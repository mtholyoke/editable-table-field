<?php

namespace Drupal\editable_table_field\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

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
      '#type' => 'button',
      '#value' => t('Edit me!'),
      '#attached' => ['library' => ['editable_table_field/edit_button']],
      // TODO: this part doesn't work and we need something like it that does.
      '#attributes' => [
        'class' => ['editable-table-field_edit-button'],
        'onclick' => 'return (false);',
      ],
    ];

    // $state = "start";
    //   $element['media_library_open_button'] = [
    //     '#type' => 'submit',
    //     '#value' => $this->t('Add media'),
    //     '#name' => 'media-library-open-button',
    //     '#attributes' => [
    //       'class' => [
    //         'media-library-open-button',
    //         'js-media-library-open-button',
    //       ],
    //       // The jQuery UI dialog automatically moves focus to the first :tabbable
    //       // element of the modal, so we need to disable refocus on the button.
    //       'data-disable-refocus' => 'true',
    //     ],
    //     '#media_library_state' => $state,
    //     '#ajax' => [
    //       'callback' => [static::class, 'openMediaLibrary'],
    //     ],
    //     '#submit' => [],
    //     // Allow the media library to be opened even if there are form errors.
    //     '#limit_validation_errors' => [],
    //   ];
    return $element;
  }

  // public static function openMediaLibrary(array $form, FormStateInterface $form_state) {
  //   $triggering_element = $form_state->getTriggeringElement();
  //   $library_ui = \Drupal::service('media_library.ui_builder')->buildUi($triggering_element['#media_library_state']);
  //   $dialog_options = MediaLibraryUiBuilder::dialogOptions();
  //   return (new AjaxResponse())
  //     ->addCommand(new OpenModalDialogCommand($dialog_options['title'], $library_ui, $dialog_options));
  // }

}
