import React, { useState, useEffect } from 'react';
import Checkbox from '../UI/Form/Checkbox';
import InputFile from '../UI/Form/InputFile';
import InputText from '../UI/Form/InputText';
import Radio from '../UI/Form/Radio';
import Select from '../UI/Form/Select';
import TextArea from '../UI/Form/TextArea';
import LoadingButton from '../UI/LoadingButton/LoadingButton';
import validate from '../../helpers/validate';
import useAuth from '../../hooks/useAuth';
import { featuesOptions, roomsOptions, statusOptions } from './InputOptions';

export default function HotelForm(props) {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [form, setForm] = useState({
    name: {
      value: '',
      valid: false,
      error: '',
      rules: ['required', { rule: 'min', length: 4 }],
    },
    description: {
      value: '',
      valid: false,
      error: '',
      rules: ['required', { rule: 'min', length: 4 }],
    },
    city: {
      value: '',
      valid: false,
      error: '',
      rules: ['required', { rule: 'min', length: 2 }],
    },
    rooms: {
      value: 2,
      valid: true,
      error: '',
      rules: ['required', { rule: 'includes', options: roomsOptions }],
    },
    features: {
      value: [],
      valid: true,
      error: '',
      rules: [],
    },
    image: {
      value: null,
      valid: true,
      error: '',
      rules: [],
    },
    status: {
      value: 0,
      valid: false,
      error: '',
      rules: ['required', { rule: 'includes', options: statusOptions }],
    },
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      props.onSubmit({
        name: form.name.value,
        description: form.description.value,
        city: form.city.value,
        rooms: form.rooms.value,
        features: form.features.value,
        status: form.status.value,
        userId: auth.userId,
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (props.hotel) {
      setForm((form) => {
        const newForm = { ...form };
        for (const key in props.hotel) {
          newForm[key].value = props.hotel[key];
          newForm[key].valid =
            validate(form[key].rules, props.hotel[key]) === '' ? true : false;
        }
        return newForm;
      });
    }
  }, [props.hotel]);

  const changeHandler = (fieldName, value) => {
    const error = validate(form[fieldName].rules, value);
    let valid = false;
    if (form[fieldName].rules.length === 0) {
      valid = true;
    } else {
      valid = error ? false : true;
    }
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        valid,
        error: error,
      },
    });
  };

  const formIsValid = () => {
    let isValid = true;
    Object.keys(form).forEach(function (key, index) {
      if (!form[key].valid) {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <form onSubmit={submit}>
      <InputText
        label="Nazwa"
        value={form.name.value}
        onChange={(value) => changeHandler('name', value)}
        error={form.name.error}
      />
      <InputText
        className="mt-3"
        label="Miejscowość"
        value={form.city.value}
        onChange={(value) => changeHandler('city', value)}
        error={form.city.error}
      />
      <TextArea
        className="mt-3"
        label="Opis"
        value={form.description.value}
        onChange={(value) => changeHandler('description', value)}
        error={form.description.error}
      />
      <Select
        className="mt-3"
        label="Ilość pokoi"
        value={form.rooms.value}
        onChange={(value) => changeHandler('rooms', value)}
        options={roomsOptions}
        error={form.rooms.error}
      />
      <h5 className="mt-3"> Udogodnienia</h5>
      <Checkbox
        value={form.features.value}
        onChange={(value) => changeHandler('features', value)}
        options={featuesOptions}
      />

      <h5 className="mt-3"> Zdjęcie</h5>
      <InputFile onChange={(value) => changeHandler('image', value)} />

      <h5 className="mt-3"> Status</h5>
      <Radio
        value={form.status.value}
        name="status"
        onChange={(value) => changeHandler('status', value)}
        error={form.status.error}
        showError={form.status.showError}
        options={statusOptions}
      />
      <div className="text-right">
        <LoadingButton
          disabled={!formIsValid()}
          loading={loading}
          className="btn-success mt-4"
        >
          {props.buttonText}
        </LoadingButton>
      </div>
    </form>
  );
}
