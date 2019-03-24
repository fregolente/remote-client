export const ALL_LAWYER_CASES = [
  {
    id: 'uuuiiiiddddeeee',
    title: 'Pet abandoned by owner',
    description: 'My neighbour has a dog that always was my friend, but now he\'s abandoned and the owner does not care for it anymore',
    suggestedPrice: 60,
    priceType: {
      id: '5c686cb3194bb801501ebe9b',
      label: 'by hour',
    },
    _createdAt: '12/25/18 11:45 PM',
    status: {
      label: 'Open',
    },
    region: {
      id: '5c5f36f754eccd2b5cf4b8f0',
      label: 'Washington',
      value: 1,
    },
    practiceArea: {
      id: '5c5f32c8fc01942e3852ad00',
      label: 'Animal Laws',
      value: 1,
    },
  },
  {
    id: 'uuuiiiiddddffff',
    title: 'My partner stole my patent',
    description: 'I created a top notch tech and my partner in business opened a patent that did not had my name.',
    suggestedPrice: 500,
    priceType: {
      id: '5c686cb3194bb801501ebe9b',
      label: 'by hour',
    },
    _createdAt: '12/25/18 07:52 AM',
    status: {
      label: 'Open',
    },
    region: {
      id: '5c5f370354eccd2b5cf4b8f2',
      label: 'New York',
      value: 2,
    },
    practiceArea: {
      id: '5c5f32c4fc01942e3852acff',
      label: 'Business',
      value: 2,
    },
  },
  {
    id: 'uuuiiiiddddfffssssf',
    title: 'School bus hit my car',
    description: 'A school bus hit my car while it was parked and I got everything on video to prove it. I want the city to pay for it.',
    suggestedPrice: 7000,
    priceType: {
      id: '5c686d3b194bb801501ebe9d',
      label: 'by case',
    },
    _createdAt: '12/25/18 11:52 AM',
    status: {
      label: 'Open',
    },
    region: {
      id: '5c6f3e300b221c0e08c605e1',
      label: 'Ohio',
      value: 3,
    },
    practiceArea: {
      id: '5c5f32befc01942e3852acfe',
      label: 'Car Accidents',
      value: 3,
    },
  }
];

export const ALL_LAWYER_FAVORITE_CASES = [ALL_LAWYER_CASES[1], ALL_LAWYER_CASES[2]];

export const ALL_USER_CASES = [ALL_LAWYER_CASES[0], ALL_LAWYER_CASES[1]];;
