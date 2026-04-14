export const contactFieldOrder = [
  'fullName',
  'clubName',
  'country',
  'stateOrCounty',
  'email',
  'phone',
  'message'
] as const;

export type ContactFieldName = (typeof contactFieldOrder)[number];

export type ContactFormInput = Record<ContactFieldName, string>;

export const contactFieldLabels: Record<ContactFieldName, string> = {
  fullName: 'Full Name',
  clubName: 'Club Name',
  country: 'Country',
  stateOrCounty: 'County / State',
  email: 'Email',
  phone: 'Phone Number',
  message: 'Message'
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptyContactFormInput = (): ContactFormInput => ({
  fullName: '',
  clubName: '',
  country: '',
  stateOrCounty: '',
  email: '',
  phone: '',
  message: ''
});

export function sanitizeContactInput(raw: Partial<Record<ContactFieldName, unknown>>): ContactFormInput {
  return contactFieldOrder.reduce((acc, fieldName) => {
    const value = raw[fieldName];
    acc[fieldName] = typeof value === 'string' ? value.trim() : '';
    return acc;
  }, emptyContactFormInput());
}

export function validateContactInput(data: ContactFormInput): Partial<Record<ContactFieldName, string>> {
  const errors: Partial<Record<ContactFieldName, string>> = {};

  for (const fieldName of contactFieldOrder) {
    if (!data[fieldName]) {
      errors[fieldName] = `${contactFieldLabels[fieldName]} is required.`;
    }
  }

  if (data.email && !emailPattern.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}

export function hasContactErrors(errors: Partial<Record<ContactFieldName, string>>) {
  return Object.keys(errors).length > 0;
}
