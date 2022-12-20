import * as yup from 'yup';

export const schemeLogin = yup.object({
  email: yup
    .string()
    .email('* Email tidak valid!')
    .required('* Email tidak boleh kosong!'),
  password: yup
    .string()
    .required('* Password tidak boleh kosong!')
    .min(6, '* Password harus 6 karakter!'),
});

export const schemeRegister = yup.object({
  name: yup.string().required('* Harap masukan nama anda!'),
  email: yup
    .string()
    .email('* Email tidak valid!')
    .required('* Email tidak boleh kosong!'),
  password: yup
    .string()
    .required('* Password tidak boleh kosong!')
    .min(6, '* Password harus 6 karakter!'),
  currentPassword: yup
    .string()
    .required('* Harap masukan konfirmasi password!')
    .min(6, '* Password harus 6 karakter!')
    .oneOf([yup.ref('password'), null], '* Password harus sesuai!'),
});
