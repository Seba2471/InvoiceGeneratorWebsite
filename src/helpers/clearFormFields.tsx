export default function clearFormFields<T>(
  form: T,
  fields: Array<{ fieldName: keyof T; clearValue: boolean }>,
  setForm: Function,
) {
  const newForm = { ...form };

  fields.forEach((field) => {
    if (field.clearValue) {
      newForm[field.fieldName] = {
        ...form[field.fieldName],
        value: '',
        error: '',
        showError: false,
      };
    } else {
      newForm[field.fieldName] = {
        ...form[field.fieldName],
        error: '',
        showError: false,
      };
    }
  });

  setForm(newForm);
}
