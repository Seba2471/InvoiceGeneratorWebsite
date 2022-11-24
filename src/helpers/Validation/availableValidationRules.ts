export type availableRules = {
  required: Function;
  email: Function;
};

export const validate: availableRules = {
  required(value: any) {
    return value ? '' : 'Pole wymagane';
  },
  email(value: string) {
    return validateEmail(value) ? '' : 'Email jest nie poprawny';
  },
};

export function validateEmail(text: string) {
  var re = new RegExp(
    //eslint-disable-next-line
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm',
  );
  return re.test(text);
}
