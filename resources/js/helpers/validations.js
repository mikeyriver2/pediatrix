/**
 * @var value - actual value
 * @var type - type of numeric validation
 */

export function validateIsNumeric(value, type = null){
    return !isNaN(value);
}