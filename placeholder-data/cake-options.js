export const CAKE_OPTIONS = [
  {
    component: 'form-field-select',
    label: 'Size',
    options: [
      {
        label: '6" (serves 12)',
        value: 0,
        default: true,
      },
      {
        label: '8" (serves 20)',
        value: 10,
        default: true,
      }
    ],
    validations: [
      {
        validation: 'required',
        message: 'Please select a size'
      }
    ]
  },
  {
    component: 'form-field-select',
    label: 'Flavour',
    options: [
      {
        label: 'Chocolate',
        value: 0,
        default: true,
      },
      {
        label: 'Vanilla',
        value: 2,
        default: false,
      },
      {
        label: 'Red Velvet',
        value: 4,
        default: false,
      },
      {
        label: 'Lemon',
        value: 4,
        default: false,
      },
      {
        label: 'Carrot',
        value: 5,
        default: false,
      }
    ],
    validations: [
      {
        validation: 'required',
        message: 'Please select a flavour'
      }
    ]
  },
  {
    component: 'form-field-select',
    label: 'Icing',
    options: [
      {
        label: 'Chocolate',
        value: 0,
        default: true,
      },
      {
        label: 'Vanilla',
        value: 1.75,
        default: false,
      },
      {
        label: 'Cream Cheese',
        value: 4,
        default: false,
      },
      {
        label: 'Oreo',
        value: 6,
        default: false,
      },
    ],
    validations: [
      {
        validation: 'required',
        message: 'Please select a flavour'
      }
    ]
  },
  {
    component: 'form-field-select',
    label: 'Filling',
    options: [
      {
        label: 'No Filling',
        value: 0,
        default: true,
      },
      {
        label: 'Ganache',
        value: 2,
        default: false,
      },
      {
        label: 'Strawberry',
        value: 3,
        default: false,
      },
      {
        label: 'Raspberry',
        value: 4,
        default: false,
      },
    ]
  }
]