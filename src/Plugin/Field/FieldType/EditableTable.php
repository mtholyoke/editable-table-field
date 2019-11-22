<?php
namespace Drupal\editable_table_field\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface as StorageDefinition;

/**
 * Plugin implementation of the 'Editable table' field type.
 *
 * @FieldType(
 *   id = "EditableTable",
 *   label = @Translation("Editable table"),
 *   description = @Translation("Stores a table."),
 *   category = @Translation("Custom"),
 *   default_widget = "EditableTableDefaultWidget",
 *   default_formatter = "EditableTableDefaultFormatter"
 * )
 */
class EditableTable extends FieldItemBase {

  /**
   * Field type properties definition.
   *
   * Inside this method we defines all the fields (properties) that our
   * custom field type will have.
   *
   * Here there is a list of allowed property types: https://goo.gl/sIBBgO
   */
  public static function propertyDefinitions(StorageDefinition $storage) {
    $properties = [];
    $properties['table'] = DataDefinition::create('string')
      ->setLabel(t('Table'));
    return $properties;
  }

  /**
   * Field type schema definition.
   *
   * Inside this method we defines the database schema used to store data for
   * our field type.
   *
   * Here there is a list of allowed column types: https://goo.gl/YY3G7s
   */
  public static function schema(StorageDefinition $storage) {
    $columns = [];
    $columns['table'] = [
      'type' => 'char',
      'length' => 255,
    ];
    return [
      'columns' => $columns,
      'indexes' => [],
    ];
  }

  /**
   * Define when the field type is empty.
   *
   * This method is important and used internally by Drupal. Take a moment
   * to define when the field fype must be considered empty.
   */
  public function isEmpty() {
    $isEmpty =
      empty($this->get('table')->getValue());
    return $isEmpty;
  }

} // class
