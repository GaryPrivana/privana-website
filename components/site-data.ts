export const navItems = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const clubSegments = [
  {
    title: 'Golf & Country Clubs',
    subtitle: 'Tee sheet, dining, member services',
    image: '/assets/clubs/golf-country.svg'
  },
  {
    title: 'Racquet & Athletic Clubs',
    subtitle: 'Courts, coaching, programming',
    image: '/assets/clubs/racquet-athletic.svg'
  },
  {
    title: 'Sporting & Lifestyle Clubs',
    subtitle: 'Experiences, events, activities',
    image: '/assets/clubs/sporting-lifestyle.svg'
  },
  {
    title: 'Wellness & Spa Retreats',
    subtitle: 'Schedules, treatments, journeys',
    image: '/assets/clubs/wellness-spa.svg'
  },
  {
    title: 'Private Hospitality Clubs',
    subtitle: 'High-touch service orchestration',
    image: '/assets/clubs/private-hospitality.svg'
  },
  {
    title: 'Coastal / Resort Clubs',
    subtitle: 'Rooms, amenities, multi-venue flow',
    image: '/assets/clubs/coastal-resort.svg'
  }
];

export const aiChips = [
  'Privana AI Assistant',
  'Live Member Sentiment',
  'Smart Inventory Tools',
  'Auto-Generated Board Reports',
  'Forecast Simulator',
  'Engagement Scoring'
];

export const platformModules = [
  {
    title: 'Club Operations',
    icon: 'operations',
    description:
      'Coordinate day-to-day club activity from one connected platform.'
  },
  {
    title: 'CRM',
    icon: 'crm',
    description: 'Manage leads, relationships, and member journeys with clarity.'
  },
  {
    title: 'Reservations',
    icon: 'reservations',
    description:
      'Handle tee times, dining, courts, classes, and bookings seamlessly.'
  },
  {
    title: 'Membership',
    icon: 'membership',
    description:
      'Support onboarding, billing, renewals, and engagement across the member lifecycle.'
  },
  {
    title: 'Hotel & Rooms',
    icon: 'hotel',
    description:
      'Power room bookings, in-stay service, and hospitality workflows.'
  },
  {
    title: 'Inventory',
    icon: 'inventory',
    description:
      'Track stock, purchasing, and operational usage with smarter controls.'
  }
] as const;
