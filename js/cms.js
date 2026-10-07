/**
 * IRONPULSE FITNESS - Shared CMS & Website Customizer
 * Allows Gym Owner/Admin to dynamically change:
 * 1. Single Head Trainer (Name, Specialty, Bio, Photo)
 * 2. Membership Plans & Fees (1 Mo, 3 Mo, 12 Mo)
 * 3. Gym Photos (Hero banner, facility photos)
 * 4. "Aaj Ye Krna H" (Today's Workout Schedule)
 */

const CMS_STORAGE_KEY = "ironpulse_gym_cms_v1";

const DEFAULT_CMS = {
  gymName: "IRONPULSE FITNESS",
  gymTagline: "PREMIUM STRENGTH & RECOVERY CLUB",
  gymPhone: "+91 98765 43210",
  gymEmail: "support@ironpulsefitness.com",
  gymAddress: "Plot 42, Sector 18 Commercial Hub, New Delhi / Azamgarh",
  
  // Gym Photos
  heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  aboutImage1: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
  aboutImage2: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",

  // Single Head Trainer Details
  trainer: {
    name: "Marcus Vance",
    role: "Head Strength & Bodybuilding Coach",
    experience: "12+ Years Coaching Experience",
    bio: "Certified Bio-mechanics Specialist, Olympic Lifting Mentor, and National Classic Physique Champion. Personalized guidance for every IronPulse member.",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=700&auto=format&fit=crop",
    phone: "+91 98765 43210",
    instagram: "@coach.marcus.iron"
  },

  // Membership Plans
  plans: [
    {
      id: "standard",
      name: "Standard Iron",
      duration: "1 Month",
      fee: 1999,
      tagline: "Ideal for short-term and beginner lifters",
      features: [
        "Full gym floor & weight arena access",
        "Standard locker & shower usage",
        "1 Free Trainer fitness evaluation",
        "Mobile app workout logger"
      ]
    },
    {
      id: "pro",
      name: "Pro Athlete",
      duration: "3 Months",
      fee: 4999,
      tagline: "Most Popular: Save ₹1,000 (Effective ₹1,666/mo)",
      features: [
        "24/7 Unlimited gym floor access",
        "Weekly Steam sauna & Ice bath recovery",
        "InBody 570 Bio-impedance analysis",
        "Custom Nutrition & Macro diet chart"
      ]
    },
    {
      id: "vip",
      name: "VIP Beast Ultimate",
      duration: "12 Months",
      fee: 14999,
      tagline: "Effective ₹1,249/mo (Massive 38% annual discount)",
      features: [
        "Everything in Pro Athlete + VIP Perks",
        "12 Complimentary 1-on-1 Coaching sessions",
        "Unlimited Steam, Sauna & Cryo recovery",
        "Private VIP locker & free protein shakes"
      ]
    }
  ],

  // "Aaj Ye Krna H" - Daily Workout Routine
  dailyWorkouts: {
    monday: {
      title: "Chest & Triceps Hypertrophy (Push)",
      focus: "Pectoralis Major & Triceps Lateral Head",
      intensity: "High (Heavy Resistance)",
      exercises: [
        "Flat Barbell Bench Press (4 Sets x 8-10 Reps)",
        "Incline Dumbbell Press (4 Sets x 10-12 Reps)",
        "Weighted Dips / Cable Crossover (3 Sets x 12-15 Reps)",
        "Overhead Triceps Rope Extension (4 Sets x 12 Reps)",
        "Close Grip Bench Press (3 Sets x 10 Reps)"
      ]
    },
    tuesday: {
      title: "Back Width & Biceps Protocol (Pull)",
      focus: "Latissimus Dorsi & Biceps Brachii",
      intensity: "Very High (Compound Loading)",
      exercises: [
        "Deadlifts / Rack Pulls (4 Sets x 6-8 Reps)",
        "Wide-Grip Lat Pulldowns (4 Sets x 10-12 Reps)",
        "Barbell Bent-Over Rows (4 Sets x 8-10 Reps)",
        "Incline Dumbbell Bicep Curls (4 Sets x 12 Reps)",
        "Hammer Rope Curls (3 Sets x 15 Reps)"
      ]
    },
    wednesday: {
      title: "Leg Day Destruction & Calves",
      focus: "Quadriceps, Hamstrings & Glutes",
      intensity: "Maximum (High Tension)",
      exercises: [
        "Barbell Back Squats (5 Sets x 6-10 Reps)",
        "Leg Press (Heavy 4 Sets x 12 Reps)",
        "Romanian Deadlifts (RDLs) (4 Sets x 10-12 Reps)",
        "Leg Extension & Lying Leg Curl Superset (3 Sets x 15 Reps)",
        "Standing Calf Raises (4 Sets x 20 Reps)"
      ]
    },
    thursday: {
      title: "Boulder Shoulders & Traps Power",
      focus: "Deltoids (Front, Side, Rear) & Trapezius",
      intensity: "High (Hypertrophy)",
      exercises: [
        "Standing Military Overhead Press (4 Sets x 8-10 Reps)",
        "Dumbbell Lateral Raises (5 Sets x 12-15 Reps - Strict Form)",
        "Rear Delt Reverse Flyes / Face Pulls (4 Sets x 15 Reps)",
        "Heavy Barbell Shrugs (4 Sets x 12 Reps)",
        "Hanging Knee Raises for Abs (3 Sets x 15 Reps)"
      ]
    },
    friday: {
      title: "Arm Farm & Core Assault",
      focus: "Biceps, Triceps & Abdominals",
      intensity: "Moderate-High (Pump & Density)",
      exercises: [
        "EZ-Bar Preacher Curls (4 Sets x 10-12 Reps)",
        "Skull Crushers (Lying Triceps Extension) (4 Sets x 10-12 Reps)",
        "Concentration Curls (3 Sets x 12 Reps)",
        "Triceps Cable Pushdowns (4 Sets x 15 Reps)",
        "Cable Woodchoppers & Plank Hold (3 Rounds)"
      ]
    },
    saturday: {
      title: "Full Body Conditioning & Functional HIIT",
      focus: "Cardiovascular Endurance & Athleticism",
      intensity: "High (Heart Rate 150+ BPM)",
      exercises: [
        "Kettlebell Swings (4 Sets x 20 Reps)",
        "Sled Push / Prowler Turf Sprints (5 Rounds x 30m)",
        "Rowing Machine / Assault Bike Intervals (10 Mins)",
        "Farmer's Walk (Heavy 4 Sets x 40m)",
        "Post-Workout Finnish Sauna & Ice Bath Recovery"
      ]
    },
    sunday: {
      title: "Active Recovery & Mobility Flow",
      focus: "Fascial Tissue Restoration & Nervous Balance",
      intensity: "Low (Restorative)",
      exercises: [
        "Full Body Foam Rolling & Trigger Point Release (15 Mins)",
        "Spine Decompression & Cobra Stretches",
        "Deep Hip Flexor & Hamstring Stretches (15 Mins)",
        "Light 30-Minute Outdoor Walk",
        "Nutrient-Dense Meal Prep & Hydration"
      ]
    }
  }
};

// Get CMS Data from LocalStorage
function getCmsData() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading CMS data:", e);
  }
  return DEFAULT_CMS;
}

// Save CMS Data to LocalStorage
function saveCmsData(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving CMS data:", e);
  }
}
