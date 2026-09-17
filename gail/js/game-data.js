// Game Configuration & Route Data for GAIL Energy Connect
// Based on GAIL's official Pradhan Mantri Urja Ganga / JHBDPL pipeline network

const GAME_DATA = {
  title: "GAIL Energy Connect",
  tagline: "Jodo Pipeline. Jagao Shehar.",
  campaign: "#WahKyaEnergyHai",
  
  // Pipeline Segments along the Eastern corridor
  segments: [
    {
      id: "seg-1",
      name: "Jagdishpur → Varanasi",
      sourceNode: "jagdishpur",
      targetNode: "varanasi",
      requiredPipe: "pipe-feeder",
      label: "Feeder Trunk",
      cityId: "varanasi",
      hint: "Need High-Pressure Feeder Pipe from Jagdishpur source"
    },
    {
      id: "seg-2",
      name: "Varanasi → Patna",
      sourceNode: "varanasi",
      targetNode: "patna",
      requiredPipe: "pipe-straight",
      label: "Gangetic Trunk",
      cityId: "patna",
      hint: "Need Straight Pipe to cross along Bihar corridor"
    },
    {
      id: "seg-3",
      name: "Patna → Bokaro → Ranchi",
      sourceNode: "patna",
      targetNode: "ranchi",
      requiredPipe: "pipe-junction",
      label: "Bokaro Junction",
      cityId: "ranchi",
      hint: "Need T-Junction Pipe to bifurcate towards Jharkhand & Odisha"
    },
    {
      id: "seg-4",
      name: "Bokaro → Cuttack",
      sourceNode: "ranchi",
      targetNode: "cuttack",
      requiredPipe: "pipe-curve",
      label: "Odisha Trunk",
      cityId: "cuttack",
      hint: "Need Curved Pipe heading south to Millennium City Cuttack"
    },
    {
      id: "seg-5",
      name: "Cuttack → Bhubaneswar",
      sourceNode: "cuttack",
      targetNode: "bhubaneswar",
      requiredPipe: "pipe-twin",
      label: "Twin-City Link",
      cityId: "bhubaneswar",
      hint: "Need Twin-City Link to connect capital Bhubaneswar"
    },
    {
      id: "seg-6",
      name: "Bokaro → Kolkata",
      sourceNode: "bhubaneswar",
      targetNode: "kolkata",
      requiredPipe: "pipe-city",
      label: "Bengal Terminal",
      cityId: "kolkata",
      hint: "Need City Connector Pipe to energize the City of Joy"
    }
  ],

  // Pipe pieces available to the player in bottom dock - styled like the official GAIL yellow pipes
  pipePieces: [
    {
      type: "pipe-feeder",
      name: "HP Feeder",
      desc: "High-pressure feeder trunk with safety valve",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <rect x="14" y="12" width="36" height="12" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <line x1="14" y1="14" x2="50" y2="14" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
        <circle cx="28" cy="8" r="5" fill="none" stroke="#e65100" stroke-width="2"/>
        <line x1="28" y1="8" x2="28" y2="12" stroke="#e65100" stroke-width="2"/>
        <rect x="11" y="7" width="4" height="22" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="42" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
      </svg>`
    },
    {
      type: "pipe-straight",
      name: "Straight Trunk",
      desc: "Long-distance corridor pipe with dual joint flanges",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <rect x="4" y="12" width="46" height="12" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <line x1="4" y1="14" x2="50" y2="14" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
        <rect x="9" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="14" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="36" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="41" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
      </svg>`
    },
    {
      type: "pipe-junction",
      name: "T-Junction",
      desc: "Multi-state flanged distributor junction",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <rect x="4" y="8" width="46" height="10" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <rect x="22" y="16" width="10" height="16" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <line x1="4" y1="10" x2="50" y2="10" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
        <rect x="7" y="5" width="3" height="16" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="44" y="5" width="3" height="16" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="18" y="27" width="18" height="3" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
      </svg>`
    },
    {
      type: "pipe-curve",
      name: "Curved Spur",
      desc: "90-degree regional directional elbow pipe",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <path d="M 12 30 L 12 18 Q 12 10 20 10 L 46 10" fill="none" stroke="url(#yellowPipeGrad)" stroke-width="11" stroke-linecap="round"/>
        <path d="M 12 30 L 12 18 Q 12 10 20 10 L 46 10" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.8" stroke-linecap="round"/>
        <rect x="38" y="4" width="3" height="15" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="43" y="4" width="3" height="15" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="4" y="22" width="16" height="3" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="4" y="27" width="16" height="3" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
      </svg>`
    },
    {
      type: "pipe-twin",
      name: "Twin-City Link",
      desc: "Dual-manifold pipeline connecting twin cities with pressure balance",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <rect x="4" y="12" width="46" height="12" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <line x1="4" y1="14" x2="50" y2="14" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
        <circle cx="18" cy="8" r="4.5" fill="#0b244d" stroke="#ffde03" stroke-width="1.8"/>
        <circle cx="18" cy="8" r="1.8" fill="#00e676"/>
        <circle cx="36" cy="8" r="4.5" fill="#0b244d" stroke="#ffde03" stroke-width="1.8"/>
        <circle cx="36" cy="8" r="1.8" fill="#00e676"/>
        <rect x="9" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <rect x="42" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
      </svg>`
    },
    {
      type: "pipe-city",
      name: "City Terminal",
      desc: "CGD city gate station with regulator manifold",
      svg: `<svg viewBox="0 0 54 36" class="dock-pipe-svg">
        <rect x="4" y="12" width="28" height="12" rx="2" fill="url(#yellowPipeGrad)" stroke="#b37b00" stroke-width="1.2"/>
        <line x1="4" y1="14" x2="32" y2="14" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
        <rect x="8" y="8" width="3" height="20" rx="1" fill="#ffde03" stroke="#b37b00" stroke-width="1"/>
        <circle cx="38" cy="18" r="11" fill="#0b244d" stroke="#ffde03" stroke-width="2.5"/>
        <circle cx="38" cy="18" r="4" fill="#00e676"/>
        <line x1="38" y1="18" x2="43" y2="13" stroke="#ffb703" stroke-width="1.8"/>
      </svg>`
    }
  ],

  // 6 Signature Cities and their awakening profiles
  cities: {
    varanasi: {
      id: "varanasi",
      name: "Varanasi",
      state: "Uttar Pradesh",
      tagline: "Spiritual Heritage Embraces Clean Fuel",
      heritage: "Kashi Vishwanath Corridor",
      heritageIcon: "🛕",
      heritageHighlight: "Sacred riverfront ghats & grand corridor powered with clean piped natural gas.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "🛕", text: "Kashi Vishwanath Corridor lit with clean energy" },
        { icon: "🛺", text: "CNG Green Autos cruising the Ghats" },
        { icon: "🏠", text: "50,000+ PNG Piped Kitchens" },
        { icon: "🍽️", text: "Clean gas for bustling street cafes" }
      ],
      funFact: "Part of Section-1 of JHBDPL, Varanasi was among the earliest CGD networks activated under PM Urja Ganga!",
      quote: "No smoke, pure devotion. Blue flame cooking transforms daily life."
    },
    patna: {
      id: "patna",
      name: "Patna",
      state: "Bihar",
      tagline: "Gangetic Capital Powers Green Commute",
      heritage: "Golghar Heritage Granary",
      heritageIcon: "🏛️",
      heritageHighlight: "Historic 1786 beehive stupa-dome monument overlooking green CNG transport.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "🏛️", text: "Golghar heritage vista powered by clean energy" },
        { icon: "🚕", text: "Green CNG Taxis & City Buses" },
        { icon: "🏠", text: "Thousands of residential PNG connections" },
        { icon: "🏥", text: "Clean reliable energy for AIIMS & hospitals" }
      ],
      funFact: "Pipelines cross beneath the mighty river beds using advanced Horizontal Directional Drilling (HDD) technology!",
      quote: "Cleaner air over the Ganga — Patna moves on GAIL CNG."
    },
    ranchi: {
      id: "ranchi",
      name: "Ranchi",
      state: "Jharkhand",
      tagline: "Industrial Heartland Modernizes",
      heritage: "Birsa Munda & Waterfalls",
      heritageIcon: "🏹",
      heritageHighlight: "Chota Nagpur tribal heritage preserving pristine forests with blue flame energy.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "🏹", text: "Birsa heritage belt protected by clean fuel" },
        { icon: "🚗", text: "Eco-friendly CNG private & public transport" },
        { icon: "🏭", text: "Clean natural gas for steel & engineering plants" },
        { icon: "🏠", text: "Safe piped gas replacing cylinder queues" }
      ],
      funFact: "Supplied through the Bokaro hub, natural gas fuels both heavy industries and everyday households!",
      quote: "High-temperature furnaces now burn clean natural gas."
    },
    cuttack: {
      id: "cuttack",
      name: "Cuttack",
      state: "Odisha",
      tagline: "Millennium City Awakens with Clean Fuel",
      heritage: "Barabati Fort & Silver Filigree",
      heritageIcon: "⛵",
      heritageHighlight: "Historic 1,000-year maritime fortress & silver artisans glowing with blue flame.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "⛵", text: "Barabati & Bali Jatra maritime heritage glowing" },
        { icon: "🛺", text: "CNG Green Autos cruising the Mahanadi banks" },
        { icon: "🏠", text: "30,000+ PNG piped residential kitchens" },
        { icon: "🪙", text: "Smokeless blue flame for Silver Filigree artisans" }
      ],
      funFact: "GAIL Gas operates the City Gas Distribution (CGD) network across the historic Millennium City of Cuttack!",
      quote: "Silver City shines brighter with smokeless, eco-friendly blue flame energy."
    },
    bhubaneswar: {
      id: "bhubaneswar",
      name: "Bhubaneswar",
      state: "Odisha",
      tagline: "Smart City of Temples & Tech",
      heritage: "Lingaraj Temple & Konark Sun Wheel",
      heritageIcon: "🛕",
      heritageHighlight: "11th-century Kalinga architecture masterpiece leading Odisha's smart green era.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "🛕", text: "Lingaraj Temple smart heritage precinct" },
        { icon: "🚌", text: "Clean Mo-Bus public transportation" },
        { icon: "🏠", text: "Smart city households powered by PNG" },
        { icon: "🏢", text: "IT Parks & biotech corridors using clean fuel" }
      ],
      funFact: "Connected through the Angul-Dhamra section, enabling port and industrial synergy across coastal Odisha!",
      quote: "A temple city leading the modern smart energy revolution."
    },
    kolkata: {
      id: "kolkata",
      name: "Kolkata",
      state: "West Bengal",
      tagline: "City of Joy Welcomes Blue Flame Era",
      heritage: "Howrah Bridge & Victoria Memorial",
      heritageIcon: "🌉",
      heritageHighlight: "Grand cantilever landmark over the Hooghly shining as public transport turns green.",
      points: 500,
      impactGain: 17,
      elements: [
        { icon: "🌉", text: "Howrah Bridge & Hooghly ferries adopting clean gas" },
        { icon: "🚕", text: "Iconic yellow taxis transitioning to green CNG" },
        { icon: "🏠", text: "Piped PNG in historic & modern residential lanes" },
        { icon: "🏭", text: "Jute and engineering mills adopting clean gas" }
      ],
      funFact: "GAIL's network in Eastern India now spans over 3,200 km, energizing 32+ CGD geographical areas!",
      quote: "Wah Kya Energy Hai! The entire eastern corridor is now connected."
    }
  },

  // Citizen Mode buffs
  citizenModes: {
    general: {
      name: "Citizen Connector",
      icon: "⚡",
      buffDescription: "Balanced network points across all sectors",
      multiplier: 1.0
    },
    home: {
      name: "PNG Kitchen Master",
      icon: "🏠",
      buffDescription: "+25% Bonus on Domestic Living & Clean Cooking",
      multiplier: 1.25
    },
    commute: {
      name: "Green CNG Champion",
      icon: "🚗",
      buffDescription: "+25% Bonus on Clean Urban Mobility",
      multiplier: 1.25
    },
    industry: {
      name: "Clean Industry Pioneer",
      icon: "🏭",
      buffDescription: "+25% Bonus on Industrial Energy & Jobs",
      multiplier: 1.25
    }
  },

  // Scoring table
  scoring: {
    connectionCorrect: 150,
    cityEnergized: 500,
    cgdActivated: 750,
    comboStreak3: 500,
    comboStreak5: 1200,
    flawlessBonus: 1000,
    speedBonusMax: 800
  },

  // Badges
  badges: [
    { threshold: 1, id: "badge-starter", title: "Energy Starter", icon: "🟢", desc: "Energized your 1st city" },
    { threshold: 3, id: "badge-connector", title: "Pipeline Connector", icon: "🔵", desc: "Linked 3 major regional hubs" },
    { threshold: 4, id: "badge-champion", title: "City Energizer", icon: "🟠", desc: "Brought clean fuel to 4 cities" },
    { threshold: 5, id: "badge-master", title: "Master Energy Connector", icon: "🏆", desc: "Wah Kya Energy Hai! Complete Network Master" }
  ],

  // Simulated live weekly leaderboard
  leaderboard: [
    { rank: 1, name: "Rohit S. (Kolkata)", score: 14850, badge: "Master Energy Connector" },
    { rank: 2, name: "Ananya M. (Bhubaneswar)", score: 14120, badge: "Master Energy Connector" },
    { rank: 3, name: "Amit K. (Patna)", score: 13680, badge: "Master Energy Connector" },
    { rank: 4, name: "Priya V. (Varanasi)", score: 12940, badge: "City Energizer" },
    { rank: 5, name: "Vikram S. (Ranchi)", score: 12200, badge: "City Energizer" }
  ]
};

window.GAME_DATA = GAME_DATA;
