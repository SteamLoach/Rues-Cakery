export const CAKE_OPTIONS = [
  {
    label: 'Size',
    options: [
      {
        label: '6" (serves 12)',
        price_modifier: 0,
        default: true,
      },
      {
        label: '8" (serves 20)',
        price_modifier: 10,
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
    label: 'Flavour',
    options: [
      {
        label: 'Chocolate',
        price_modifier: 0,
        default: true,
      },
      {
        label: 'Vanilla',
        price_modifier: 2,
        default: false,
      },
      {
        label: 'Red Velvet',
        price_modifier: 4,
        default: false,
      },
      {
        label: 'Lemon',
        price_modifier: 4,
        default: false,
      },
      {
        label: 'Carrot',
        price_modifier: 5,
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
    label: 'Icing',
    options: [
      {
        label: 'Chocolate',
        price_modifier: 0,
        default: true,
      },
      {
        label: 'Vanilla',
        price_modifier: 1.75,
        default: false,
      },
      {
        label: 'Cream Cheese',
        price_modifier: 4,
        default: false,
      },
      {
        label: 'Oreo',
        price_modifier: 6,
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
    label: 'Filling',
    options: [
      {
        label: 'No Filling',
        price_modifier: 0,
        default: true,
      },
      {
        label: 'Ganache',
        price_modifier: 2,
        default: false,
      },
      {
        label: 'Strawberry',
        price_modifier: 3,
        default: false,
      },
      {
        label: 'Raspberry',
        price_modifier: 4,
        default: false,
      },
    ]
  }
]