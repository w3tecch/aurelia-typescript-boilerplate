import { Rule, ValidationController } from 'aurelia-validation';

/**
 * Some regex pattern for validation
 */
export const isInteger = /^[0-9]*$/;
export const isNumber = /^[0-9]+(?:\.[0-9]+)?$/;
export const isAmount = /^[0-9]{1,3}('[0-9]{3})*$/; //matches amounts, separated by comma, e.g. 12'555'432
export const amount = /\B(?=(\d{3})+(?!\d))/g; //format a string of numbers to separate thousands, e.g. 10'000
export const swissPrefix = /^0041[\d ]*$/; //check if number has swiss prefix
export const specialPrefix = /^0[8,9]00[\d ]*$/; //check if number has 0800 or 0900 prefix
export const swissPhoneNumber = /^0041 \d{2} \d{3}( \d{2}){2}$/; //matches swiss number, eg. 0041 44 761 11 11
export const specialPhoneNumber = /^0[8,9]00 \d{3} \d{3}$/; //matches swiss number, eg. 0800 800 800
export const generalPhoneNumber = /^\d{4} \d{2} \d{3} \d{2}( \d{1,2}){1,}$/; //matches phone number, eg. 0043 11 233 44 55 6
export const urlString = /^https?:\/\//; //matches urls
export const protocol = /.*:\/\/.*/; //matches any string which contains ://

/**
 * Checkes if someting is empty or satisfies a function
 */
export const isEmptyOrSatisfies = (
  value: any,
  satisfies: (value: any) => boolean
): boolean => {
  if (!value || String.isEmpty(value) || (Array.isArray(value) && value.length === 0)) {
    return true;
  }
  return satisfies(value);
};

/**
 * Count the applicable rules for an object
 */
export const countApplicableRules = <T>(rules: Rule<T, any>[][], object: T): number => {
  return rules && rules.reduce(
    (total, rules) =>
      rules.reduce((acc, rule) => acc + (!rule.when || rule.when(object) ? 1 : 0), total)
    , 0);
};

/**
 * Usefull in activate or attached methods to check filled fields or to force check a field
 * This method can even check objects in arrays
 */
export const validateFilledFieldsWithValidationRules = <M, T>(
  rules: Rule<M, any>[][],
  model: T,
  controller: ValidationController,
  forceProperty?: string,
): void => {
  rules.forEach(rulesItem =>
    rulesItem.forEach(rule => {
      if (
        (rule.property.name && !String.isEmpty(model[rule.property.name]))
        || rule.config[`length`]
        || (forceProperty && forceProperty === rule.property.name)
      ) {
        controller.validate({
          object: model,
          propertyName: rule.property.name
        });
      } else if (Array.isArray(model)) {
        model.forEach(arrayModel => {
          validateFilledFieldsWithValidationRules(rules, arrayModel, controller, forceProperty);
        });
      }
    })
  );
};

export const controllerValidByRules = <T>(
  rules: Rule<T, any>[][],
  model: T,
  controller: ValidationController
): boolean => {
  return !controller.validating
    && controller[`results`].length >= countApplicableRules<T>(rules, model)
    && controller.errors.length === 0;
};

export const validatePhoneNumber = (
  value: string
): boolean => {
  if (swissPrefix.test(value)) {
    return swissPhoneNumber.test(value);
  }
  if (specialPrefix.test(value)) {
    return specialPhoneNumber.test(value);
  }
  return generalPhoneNumber.test(value);
};

export const validateURL = (
  value: string
): boolean => {
  return urlString.test(value);
};

export const validateProtocol = (
  value: string
): boolean => {
  return protocol.test(value);
};
