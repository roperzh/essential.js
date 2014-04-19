Essential.Core.SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
Essential.Core.FIRST_LETTER_REGEXP = /^[a-z]/g;

Essential.Core.camelize = function (name) {
  return name.
  replace(Essential.Core.FIRST_LETTER_REGEXP, function (letter) {
    return letter.toUpperCase();
  }).
  replace(Essential.Core.SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  });
}
