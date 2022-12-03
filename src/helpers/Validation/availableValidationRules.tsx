export type availableRules = {
  required: Function;
  email: Function;
  min: Function;
  number: Function;
};

export const validate: availableRules = {
  required(value: any) {
    return value ? '' : 'Pole wymagane';
  },
  email(value: string) {
    return validateEmail(value) ? '' : 'Email jest nie poprawny';
  },
  min(value: string, data: { length: number }) {
    return value.length >= data.length
      ? ''
      : 'Minimalna długość hasła to 6 znaków';
  },
  number(value: any) {
    return !isNaN(Number(value.toString())) ? '' : 'Wartości musi być liczbą';
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
