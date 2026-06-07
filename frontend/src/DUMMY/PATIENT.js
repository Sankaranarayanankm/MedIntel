export const PATIENT_SERVICES = [
  {
    _id: "SB001",
    patient: {
      name: "John Doe",
      age: 32,
      gender: "male",
      phone: "9876543210",
    },
    service: {
      name: "Blood Test",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500",
      scheduleSlots: [
        "12/01/2026 - 10:10 AM",
        "12/01/2026 - 11:00 AM",
        "13/01/2026 - 09:30 AM",
      ],
      instructions: [
        "Fast for 8-10 hours before the test",
        "Drink plenty of water",
        "Carry a valid ID proof",
      ],
    },
    timeSlot: "12/01/2026 - 10:10 AM",
    adminCancel: false,
    status: "confirmed",
    paymentMethod: "online",
    fee: 500,
  },

  {
    _id: "SB002",
    patient: {
      name: "Sarah Wilson",
      age: 27,
      gender: "female",
      phone: "9876543211",
    },
    service: {
      name: "ECG",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500",
      scheduleSlots: [
        "13/01/2026 - 11:00 AM",
        "13/01/2026 - 02:00 PM",
        "14/01/2026 - 10:00 AM",
      ],
      instructions: [
        "Wear comfortable clothing",
        "Avoid heavy exercise before the test",
        "Inform staff about medications",
      ],
    },
    timeSlot: "13/01/2026 - 11:00 AM",
    adminCancel: false,
    status: "pending",
    paymentMethod: "cash",
    fee: 800,
  },

  {
    _id: "SB003",
    patient: {
      name: "Michael Brown",
      age: 45,
      gender: "male",
      phone: "9876543212",
    },
    service: {
      name: "MRI Scan",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500",
      scheduleSlots: ["14/01/2026 - 02:30 PM", "15/01/2026 - 09:00 AM"],
      instructions: [
        "Remove all metal objects",
        "Carry previous scan reports",
        "Inform doctor if you have implants",
      ],
    },
    timeSlot: "14/01/2026 - 02:30 PM",
    adminCancel: false,
    status: "completed",
    paymentMethod: "online",
    fee: 4500,
  },

  {
    _id: "SB004",
    patient: {
      name: "Emily Davis",
      age: 36,
      gender: "female",
      phone: "9876543213",
    },
    service: {
      name: "Vaccination",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
      scheduleSlots: ["15/01/2026 - 09:00 AM", "15/01/2026 - 11:00 AM"],
      instructions: [
        "Bring vaccination records",
        "Stay for 15 minutes after vaccination",
        "Report any allergies beforehand",
      ],
    },
    timeSlot: "15/01/2026 - 09:00 AM",
    adminCancel: false,
    status: "confirmed",
    paymentMethod: "cash",
    fee: 700,
  },

  {
    _id: "SB005",
    patient: {
      name: "David Miller",
      age: 51,
      gender: "male",
      phone: "9876543214",
    },
    service: {
      name: "Physiotherapy",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
      scheduleSlots: ["16/01/2026 - 04:00 PM", "17/01/2026 - 10:00 AM"],
      instructions: [
        "Wear loose clothing",
        "Bring previous medical reports",
        "Arrive 15 minutes early",
      ],
    },
    timeSlot: "16/01/2026 - 04:00 PM",
    adminCancel: true,
    status: "cancelled",
    paymentMethod: "online",
    fee: 1500,
  },
];

export const PATIENT_APPOINTMENTS = [
  {
    _id: "APT001",
    patient: {
      name: "John Doe",
      age: 32,
      gender: "male",
      phone: "9876543210",
    },
    doctor: {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
    },
    status: "confirmed",
    timeSlot: "12/01/2026 - 10:10 AM",
    reason: "Chest pain and shortness of breath",
    adminCancel: false,
    paymentMethod: "online",
    cancelReason: "",
    fee: 1200,
  },
  {
    _id: "APT002",
    patient: {
      name: "Sarah Wilson",
      age: 27,
      gender: "female",
      phone: "9876543211",
    },
    doctor: {
      name: "Dr. Michael Lee",
      specialization: "Neurology",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
    },
    status: "pending",
    timeSlot: "13/01/2026 - 11:00 AM",
    reason: "Frequent headaches",
    adminCancel: false,
    paymentMethod: "cash",
    cancelReason: "",
    fee: 1500,
  },
  {
    _id: "APT003",
    patient: {
      name: "Michael Brown",
      age: 45,
      gender: "male",
      phone: "9876543212",
    },
    doctor: {
      name: "Dr. Emily Davis",
      specialization: "Dermatology",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500",
    },
    status: "completed",
    timeSlot: "14/01/2026 - 02:30 PM",
    reason: "Skin allergy treatment",
    adminCancel: false,
    paymentMethod: "online",
    cancelReason: "",
    fee: 1000,
  },
  {
    _id: "APT004",
    patient: {
      name: "Emily Davis",
      age: 36,
      gender: "female",
      phone: "9876543213",
    },
    doctor: {
      name: "Dr. Robert Wilson",
      specialization: "Orthopedics",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500",
    },
    status: "confirmed",
    timeSlot: "15/01/2026 - 09:00 AM",
    reason: "Knee joint pain",
    adminCancel: false,
    paymentMethod: "cash",
    cancelReason: "",
    fee: 1800,
  },
  {
    _id: "APT005",
    patient: {
      name: "David Miller",
      age: 51,
      gender: "male",
      phone: "9876543214",
    },
    doctor: {
      name: "Dr. Olivia Brown",
      specialization: "Pediatrics",
      image:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500",
    },
    status: "cancelled",
    timeSlot: "16/01/2026 - 04:00 PM",
    reason: "Follow-up consultation",
    adminCancel: true,
    paymentMethod: "online",
    cancelReason: "Doctor unavailable",
    fee: 900,
  },
  {
    _id: "APT006",
    patient: {
      name: "Sophia Taylor",
      age: 24,
      gender: "female",
      phone: "9876543215",
    },
    doctor: {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
    },
    status: "completed",
    timeSlot: "17/01/2026 - 10:30 AM",
    reason: "Routine heart checkup",
    adminCancel: false,
    paymentMethod: "online",
    cancelReason: "",
    fee: 1200,
  },
  {
    _id: "APT007",
    patient: {
      name: "James Anderson",
      age: 40,
      gender: "male",
      phone: "9876543216",
    },
    doctor: {
      name: "Dr. Michael Lee",
      specialization: "Neurology",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
    },
    status: "confirmed",
    timeSlot: "18/01/2026 - 01:15 PM",
    reason: "Migraine evaluation",
    adminCancel: false,
    paymentMethod: "cash",
    cancelReason: "",
    fee: 1500,
  },
  {
    _id: "APT008",
    patient: {
      name: "Olivia Thomas",
      age: 30,
      gender: "female",
      phone: "9876543217",
    },
    doctor: {
      name: "Dr. Emily Davis",
      specialization: "Dermatology",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500",
    },
    status: "pending",
    timeSlot: "19/01/2026 - 03:45 PM",
    reason: "Acne treatment consultation",
    adminCancel: false,
    paymentMethod: "online",
    cancelReason: "",
    fee: 1000,
  },
];
