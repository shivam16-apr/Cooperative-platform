export const EXPERTISE_BRANCHES = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: 'Zap',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    description: 'Wiring, MCB repair, appliance connection, short circuits',
    avgRate: '₹450/hr'
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: 'Droplets',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    description: 'Pipe leaks, bathroom fittings, water heater installation',
    avgRate: '₹400/hr'
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: 'Hammer',
    badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    description: 'Furniture repair, door locks, modular kitchen woodwork',
    avgRate: '₹380/hr'
  },
  {
    id: 'cleaner',
    name: 'Cleaner',
    icon: 'Sparkles',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    description: 'Deep home cleaning, sofa sanitization, pest control',
    avgRate: '₹300/hr'
  },
  {
    id: 'painter',
    name: 'Painter',
    icon: 'Paintbrush',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    description: 'Wall painting, waterproof coating, texture finish',
    avgRate: '₹350/hr'
  },
  {
    id: 'mechanic',
    name: 'Mechanic',
    icon: 'Wrench',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    description: 'Car & bike repair, battery jumpstart, oil service',
    avgRate: '₹480/hr'
  },
  {
    id: 'gardener',
    name: 'Gardener',
    icon: 'Sprout',
    badgeColor: 'bg-green-500/10 text-green-600 border-green-500/20',
    description: 'Lawn mowing, tree trimming, landscaping, organic garden care',
    avgRate: '₹320/hr'
  },
  {
    id: 'ac_tech',
    name: 'AC Technician',
    icon: 'Wind',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    description: 'HVAC servicing, gas refilling, compressor repair',
    avgRate: '₹500/hr'
  }
];

export const DEMO_WORKERS = {
  electrician: {
    id: 'w_101',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@fixmate.in',
    expertiseId: 'electrician',
    expertiseTitle: 'Master Electrician',
    rating: 4.9,
    totalReviews: 148,
    completedJobsCount: 342,
    totalEarnings: 48500,
    walletBalance: 4200,
    serviceRadiusKm: 12,
    city: 'New Delhi, Delhi NCR',
    avatar: null,
    verificationLevel: 3,
    verificationStatus: 'Level 3 - Gold Verified Pro (Aadhaar Linked)',
    isOnline: true,
    badges: ['Skill India Certified', 'Aadhaar Verified', 'Top Rated 2026', 'Fast Responder']
  },
  plumber: {
    id: 'w_102',
    name: 'Suresh Sharma',
    phone: '+91 98123 45678',
    email: 'suresh.sharma@fixmate.in',
    expertiseId: 'plumber',
    expertiseTitle: 'Senior Plumbing Specialist',
    rating: 4.8,
    totalReviews: 94,
    completedJobsCount: 215,
    totalEarnings: 32800,
    walletBalance: 2600,
    serviceRadiusKm: 15,
    city: 'Indiranagar, Bengaluru',
    avatar: null,
    verificationLevel: 3,
    verificationStatus: 'Level 3 - Gold Verified Pro (Aadhaar Linked)',
    isOnline: true,
    badges: ['Certified Plumber', 'Police Verified', '24/7 Callout']
  }
};

export const INITIAL_AVAILABLE_JOBS = [
  {
    id: 'JOB-9021',
    title: 'Short Circuit in Distribution Board & Tripping MCB',
    expertiseId: 'electrician',
    customerName: 'Sunita Agarwal',
    customerPhone: '+91 98112 34567',
    address: 'House 742, Sector 14, Gurugram',
    distanceKm: 2.4,
    urgency: 'High - Immediate',
    payout: 850,
    estimatedDuration: '1.5 hrs',
    postedTime: '10 mins ago',
    description: 'Main breaker keeps tripping every time the living room AC is switched on. Smells faint burning near the DB panel.',
    requirements: ['Safety Gloves Required', 'Bring Multimeter', 'MCB Replacement Spare']
  },
  {
    id: 'JOB-9022',
    title: 'Havells Ceiling Fan & Chandelier Light Installation',
    expertiseId: 'electrician',
    customerName: 'Dr. Rajesh Verma',
    customerPhone: '+91 98223 45678',
    address: 'Flat 402, Shivalik Tower, Sector 62, Noida',
    distanceKm: 4.1,
    urgency: 'Medium',
    payout: 650,
    estimatedDuration: '1 hr',
    postedTime: '25 mins ago',
    description: 'Need installation of 1 smart ceiling fan with remote control and 1 decorative crystal chandelier in dining area.',
    requirements: ['High Ladder Required', 'Anchoring Bolts']
  },
  {
    id: 'JOB-9023',
    title: 'Kitchen Sink Drain Pipe & RO Water Purifier Leakage Repair',
    expertiseId: 'plumber',
    customerName: 'Priya Nair',
    customerPhone: '+91 98334 56789',
    address: 'Villa 12, Green Glen Layout, Bellandur, Bengaluru',
    distanceKm: 1.8,
    urgency: 'Urgent',
    payout: 750,
    estimatedDuration: '1 hr',
    postedTime: '5 mins ago',
    description: 'Severe water leakage underneath double-bowl kitchen sink and water purifier connection. Needs pipe seal replacement.',
    requirements: ['P-Trap Replacement', 'Teflon Tape & Sealant']
  },
  {
    id: 'JOB-9024',
    title: 'Voltas 1.5 Ton Split AC Deep Foam Jet Service',
    expertiseId: 'ac_tech',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 98445 67890',
    address: 'B-12 Malviya Nagar, Near Main Market, New Delhi',
    distanceKm: 5.8,
    urgency: 'Scheduled Today',
    payout: 1250,
    estimatedDuration: '2.5 hrs',
    postedTime: '40 mins ago',
    description: 'Annual servicing for 2 split AC units. Cooling is low and indoor filter needs chemical foam jet wash.',
    requirements: ['Jet Wash Pump', 'Foam Cleaner']
  },
  {
    id: 'JOB-9025',
    title: 'Wooden Wardrobe Door Hinge Repair & Sliding Track Fix',
    expertiseId: 'carpenter',
    customerName: 'Ananya Deshmukh',
    customerPhone: '+91 98556 78901',
    address: '15 Shivaji Park, Dadar West, Mumbai',
    distanceKm: 3.2,
    urgency: 'Normal',
    payout: 900,
    estimatedDuration: '2 hrs',
    postedTime: '1 hour ago',
    description: 'Master bedroom wardrobe door hinge broken and 2 internal wooden shelves collapsed.',
    requirements: ['Soft-close Hinges', 'Wood Screws & Brackets']
  }
];

export const INITIAL_ACTIVE_JOBS = [
  {
    id: 'JOB-8840',
    title: 'Copper Earthing Line & Voltage Surge Protector Fitment',
    expertiseId: 'electrician',
    customerName: 'Prof. A. K. Mishra',
    customerPhone: '+91 98667 89012',
    address: 'Tower 4, Penthouse 201, Express Greens, Sector 137, Noida',
    distanceKm: 1.5,
    status: 'In Progress',
    payout: 1400,
    startedAt: '14:15 PM',
    estimatedDuration: '2 hrs',
    description: 'Install heavy-duty surge protection device (SPD) in main panel and test earth resistance.',
    stepsCompleted: 2,
    totalSteps: 3,
    notes: 'Customer requested quick check of solar inverter bypass switch as well.'
  }
];

export const INITIAL_COMPLETED_JOBS = [
  {
    id: 'JOB-8799',
    title: '3-Phase Sub-panel Wiring & Industrial Socket',
    date: 'Yesterday, 4:30 PM',
    customerName: 'Kailash Auto Works, Okhla',
    rating: 5,
    payout: 1600,
    paymentStatus: 'Paid (Direct UPI)',
    invoiceNo: 'INV-2026-0901',
    review: 'Ramesh bhai did an outstanding job wiring our high-power car lift. Very punctual, clean work and thoroughly tested voltage load!'
  },
  {
    id: 'JOB-8762',
    title: 'Anchor Smart Touch Switch Board Installation (4 Gang)',
    date: 'Sep 07, 2026',
    customerName: 'Kavita Joshi',
    rating: 5,
    payout: 950,
    paymentStatus: 'Paid (Wallet)',
    invoiceNo: 'INV-2026-0895',
    review: 'Fast and professional! Neutral wire was missing in old switch box but Ramesh ji wired it cleanly.'
  },
  {
    id: 'JOB-8710',
    title: 'Kitchen Short Circuit Fix in Restaurant',
    date: 'Sep 05, 2026',
    customerName: 'Bikanervala Sweets, Karol Bagh',
    rating: 5,
    payout: 2100,
    paymentStatus: 'Paid (Bank NEFT)',
    invoiceNo: 'INV-2026-0870',
    review: 'Saved our dinner service! Came within 20 minutes on a Friday evening.'
  }
];

export const VERIFICATION_DATA = {
  overallLevel: 3,
  levelName: 'Level 3 - Gold Verified Pro (Aadhaar Linked)',
  statusBadge: 'UIDAI & Police Verified',
  completionPercentage: 100,
  documents: [
    {
      id: 'gov_id',
      name: 'Aadhaar Card Verification',
      status: 'Verified (UIDAI)',
      issuer: 'Unique Identification Authority of India',
      verifiedDate: 'Jan 15, 2025',
      badge: 'ShieldCheck'
    },
    {
      id: 'police_check',
      name: 'State Police Character Verification',
      status: 'Passed (Clear)',
      issuer: 'Delhi Police Department',
      verifiedDate: 'Feb 10, 2026',
      badge: 'FileCheck'
    },
    {
      id: 'trade_cert',
      name: 'National Trade Certificate (NTC)',
      status: 'Verified (Active)',
      issuer: 'Ministry of Skill Development & Entrepreneurship (NCVT)',
      verifiedDate: 'Mar 01, 2024 (Permanent)',
      badge: 'Award'
    },
    {
      id: 'insurance_cert',
      name: 'Shramik Suraksha & Accidental Cover',
      status: 'Active Coverage',
      issuer: 'FixMate Worker Welfare Fund',
      verifiedDate: 'Valid till Sep 2027',
      badge: 'HeartPulse'
    }
  ]
};

export const WELFARE_DATA = {
  insurancePolicyNumber: 'FM-WEL-994821',
  coverageAmount: '₹5,00,000',
  hospitalizationCover: '₹1,00,000 / year',
  accidentCover: '₹4,00,000',
  familyCoverIncluded: true,
  loanEligibility: {
    maxAmount: 25000,
    interestRate: '0% interest for 30 days',
    repaymentTerm: 'Weekly automatic deduction',
    status: 'Eligible for instant approval'
  },
  healthVouchers: [
    { id: 'v1', title: 'Free Annual Executive Health Checkup', code: 'HEALTH-2026-ALEX', status: 'Available' },
    { id: 'v2', title: 'Free Eye Test & Prescription Glasses Discount', code: 'VISION-PRO-50', status: 'Available' }
  ],
  toolDiscounts: [
    { brand: 'DeWalt Tools', discount: '20% OFF', code: 'DEWALT-FIXMATE' },
    { brand: 'Fluke Meters', discount: '15% OFF', code: 'FLUKE-FIXMATE' },
    { brand: 'Bosch Professional', discount: '25% OFF', code: 'BOSCH-FIXMATE' }
  ]
};

export const NOTIFICATIONS_LIST = [
  {
    id: 'n1',
    title: 'High Payout Job Nearby! ⚡',
    message: 'New Short Circuit job 2.4 km away offering ₹850.',
    time: '5m ago',
    read: false,
    type: 'job'
  },
  {
    id: 'n2',
    title: 'Payout Transferred Successfully 💰',
    message: '₹4,800 was transferred to your linked bank account ending in 4092.',
    time: '2h ago',
    read: false,
    type: 'payout'
  },
  {
    id: 'n3',
    title: '5-Star Review Received ⭐',
    message: 'Apex Auto Garage gave you 5 stars: "Outstanding work on 3-Phase wiring!"',
    time: '1d ago',
    read: true,
    type: 'review'
  },
  {
    id: 'n4',
    title: 'Welfare Benefit Active 🏥',
    message: 'Your ₹5,00,000 FixMate Worker Health & Safety policy has been renewed.',
    time: '2d ago',
    read: true,
    type: 'welfare'
  }
];
