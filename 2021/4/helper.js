const validate_regexp = (value, regexp) => new RegExp(regexp).test(value)
const validate_minmax = (regexp, value, [min, max]) => validate_regexp(value, regexp) && parseInt(value) >= min && parseInt(value) <= max
const validate_year = (value, minmax) => validate_minmax("^[0-9]{4}$", value, minmax)
const validate_unit = (value, [unit, minmax]) => validate_minmax(`[0-9]+${unit}`, value, minmax)
const validate_units = (value, units) => units.filter(unit => validate_unit(value, unit)).length > 0
const validate_hex = value => validate_regexp(value, "^#[0-9a-f]{6}$")
const validate_pid = value => validate_regexp(value, "^[0-9]{9}$")
const validate_strings = (value, valid_items) => valid_items.split('|').includes(value)

const build_objects = data => data
  .map(row => row.replace(new RegExp("\n", "g"), " ")
  .split(" ")
  .map(keyvalue => keyvalue.split(":")))
  .map(entries => Object.fromEntries(entries))

const valid_objects_by_fields = (objects, optional_field, length) => {
  return objects.filter(object => {
    const keys = Object.keys(object)
    return keys.length === length || (keys.length === length-1 && !keys.includes(optional_field))
  })
}

const valid_objects_by_values = (objects, options) => {
  return objects.filter(object => {
    const valid_fields = Object.keys(object).filter(key => options[key](object[key]))
    const length = Object.keys(options).length
    return valid_fields.length === length || (valid_fields.length === length-1 && !valid_fields.includes("cid"))
  })
}

module.exports.build_objects = build_objects
module.exports.valid_objects_by_fields = valid_objects_by_fields
module.exports.valid_objects_by_values = valid_objects_by_values
module.exports.validate_hex = validate_hex
module.exports.validate_units = validate_units
module.exports.validate_year = validate_year
module.exports.validate_pid = validate_pid
module.exports.validate_strings = validate_strings

