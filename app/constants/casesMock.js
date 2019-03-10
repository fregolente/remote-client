export const ALL_LAWYER_CASES = [
  {
    id: 'uuuiiiiddddeeee',
    title: 'Pet abandoned by owner',
    description: 'My neighbour has a dog that always was my friend, but now he\'s abandoned and the owner does not care for it anymore',
    suggestedPrice: '$60',
    priceType: {
      label: 'by hour'
    },
    _createdAt: '12/25/18 11:45 PM',
    status: {
      label: 'Open'
    },
    caseRegions: {
      label: 'Washington',
      value: 1,
    },
    caseAreas: {
      label: 'Animal Laws',
      value: 1,
    },
  },
  {
    id: 'uuuiiiiddddffff',
    title: 'My partner stole my patent',
    description: 'I created a top notch tech and my partner in business opened a patent that did not had my name.',
    suggestedPrice: '$500',
    priceType: {
      label: 'by hour'
    },
    _createdAt: '12/25/18 07:52 AM',
    status: {
      label: 'Open'
    },
    caseRegions: {
      label: 'New York',
      value: 2,
    },
    caseAreas: {
      label: 'Business',
      value: 2,
    },
  },
  {
    id: 'uuuiiiiddddfffssssf',
    title: 'School bus hit my car',
    description: 'A school bus hit my car while it was parked and I got everything on video to prove it. I want the city to pay for it.',
    suggestedPrice: '$7000',
    priceType: {
      label: 'by case'
    },
    _createdAt: '12/25/18 11:52 AM',
    status: {
      label: 'Open'
    },
    caseRegions: {
      label: 'Ohio',
      value: 3,
    },
    caseAreas: {
      label: 'Car Accidents',
      value: 3,
    },
  }
];

export const ALL_LAWYER_FAVORITE_CASES = [ALL_LAWYER_CASES[1], ALL_LAWYER_CASES[2]];

export const ALL_USER_CASES = [ALL_LAWYER_CASES[0], ALL_LAWYER_CASES[1]];;
