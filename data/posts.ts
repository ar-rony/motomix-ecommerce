export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: number;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export const blogPosts: BlogPost[] = [
  // Existing 4 posts (keep them) + 16 new marketing posts = 20 total
  {
    id: 1,
    title: "A companion for extra sleeping",
    slug: "a-companion-for-extra-sleeping",
    excerpt: "Aliquet parturient in potenti id rutrum duis...",
    content: "...", // keep original
    date: "23 Jul 2016",
    author: "John Doe",
    category: "Maintenance",
    image: "/images/blog1.jpg",
    readTime: 5,
    tags: ["engine oil", "maintenance", "tips"],
  },
  // ... keep original id 2,3,4 as well, but I'll add new ones starting from id 5
  {
    id: 5,
    title: "5 Signs Your Motorcycle Engine Oil Needs Changing",
    slug: "5-signs-engine-oil-needs-changing",
    excerpt: "Don't ignore these warning signs. Learn when to replace your oil for maximum engine life and performance.",
    content: `
      <p>Regular oil changes are the cheapest insurance for your motorcycle engine. But how do you know when it's time? Here are 5 clear signs.</p>
      <h2>1. Dark, Gritty Oil on Dipstick</h2>
      <p>Fresh oil is amber and translucent. If it looks black and feels gritty, it's loaded with contaminants.</p>
      <h2>2. Unusual Engine Noise</h2>
      <p>Old oil loses viscosity, leading to louder valve train noise or knocking. If your engine sounds rougher, check the oil.</p>
      <h2>3. Burning Smell</h2>
      <p>If you smell burnt oil while riding, it might be overheating or leaking onto hot parts. Time for a change.</p>
      <h2>4. Low Oil Level Between Changes</h2>
      <p>Excessive consumption indicates worn rings or seals – but also means the remaining oil is stressed.</p>
      <h2>5. Mileage Based on Manual</h2>
      <p>Most motorcycles need oil every 3,000-5,000 miles (or annually). Trust your owner's manual.</p>
      <p><strong>Marketing tip:</strong> Sign up for our oil reminder service and get 10% off your next purchase.</p>
    `,
    date: "10 Jan 2025",
    author: "Mike Mechanic",
    category: "Engine Oil",
    image: "/images/blog-oil-change.jpg",
    readTime: 4,
    tags: ["engine oil", "maintenance", "tips", "oil change"],
  },
  {
    id: 6,
    title: "Summer vs Winter Motorcycle Oil: Which One Do You Need?",
    slug: "summer-vs-winter-motorcycle-oil",
    excerpt: "Temperature affects oil viscosity. Learn the difference between summer-grade and winter-grade oils to protect your engine year-round.",
    content: `
      <p>Motorcycle oils come with labels like 10W-40. The "W" stands for winter. Here's how to choose based on season.</p>
      <h2>Summer Riding (Hot weather)</h2>
      <p>Thicker oils like 20W-50 maintain film strength at high temperatures. Ideal for air-cooled engines in tropical climates.</p>
      <h2>Winter / Cold Weather</h2>
      <p>Lower first number (5W or 10W) flows faster at cold start, reducing wear. 10W-40 is a good all-rounder for moderate climates.</p>
      <h2>All-Season Synthetic Oils</h2>
      <p>Modern synthetics like Motul 7100 5W-40 work across a wide temperature range. They cost more but offer better protection.</p>
      <p><strong>Limited offer:</strong> Buy any 2 bottles of synthetic oil and get a free oil filter. Shop now!</p>
    `,
    date: "15 Feb 2025",
    author: "Sarah Chemist",
    category: "Engine Oil",
    image: "/images/blog-seasonal-oil.jpg",
    readTime: 3,
    tags: ["engine oil", "seasonal", "viscosity", "winter oil"],
  },
  {
    id: 7,
    title: "Why Your Motorcycle Tyre Tread Depth Matters (And How to Check It)",
    slug: "tyre-tread-depth-guide",
    excerpt: "Worn tyres are dangerous. Learn the legal limit, how to measure tread depth, and when to replace your tyres for safety.",
    content: `
      <p>Your tyres are the only contact patch with the road. Tread depth is critical for wet weather grip.</p>
      <h2>Legal Minimum Tread Depth</h2>
      <p>In most countries, motorcycle tyres must have at least 1mm of tread across the central 3/4 of the tyre. But experts recommend replacement at 1.5-2mm.</p>
      <h2>How to Check Tread Depth</h2>
      <p>Use a tread depth gauge or the "20p test" (insert a coin into grooves). Also look for wear bars – small rubber bridges inside grooves.</p>
      <h2>Signs of Uneven Wear</h2>
      <ul><li>Center wear – overinflation or too much highway riding</li><li>Edge wear – underinflation or aggressive cornering</li><li>Cracking – old rubber (replace every 5-6 years regardless of tread)</li></ul>
      <p><strong>Promotion:</strong> Get a free tread check and 15% off any new tyre purchase this month.</p>
    `,
    date: "20 Mar 2025",
    author: "Tyre Guru",
    category: "Tyres",
    image: "/images/blog-tread.jpg",
    readTime: 5,
    tags: ["tyres", "safety", "tread depth", "maintenance"],
  },
  {
    id: 8,
    title: "Castrol vs Motul vs Shell: Which Engine Oil is Best for Your Bike?",
    slug: "engine-oil-brand-comparison",
    excerpt: "We compare three top brands – Castrol, Motul, and Shell. See which one offers the best value, protection, and performance for your motorcycle.",
    content: `
      <p>Choosing the right oil brand can be overwhelming. We tested Castrol Power1, Motul 7100, and Shell Advance Ultra on a 300cc commuter bike.</p>
      <h2>Castrol Power1 20W-50 (Semi-synthetic)</h2>
      <p>Best for daily commuting. Smooth gear shifts, good value at $7-9 per liter. Slight drop in performance after 2,500 km.</p>
      <h2>Motul 7100 10W-40 (Full synthetic)</h2>
      <p>Premium choice for performance bikes. Excellent high-temperature stability, lasts up to 5,000 km. Price $12-15/liter.</p>
      <h2>Shell Advance Ultra 15W-50 (Full synthetic)</h2>
      <p>Great for long-distance touring. Superior engine cleanliness, reduces sludge. Mid-range price $10-12/liter.</p>
      <p><strong>Winner:</strong> Motul for sportbikes, Castrol for budget, Shell for touring. Check our bundle deals – buy 4 liters and save 20%.</p>
    `,
    date: "05 Apr 2025",
    author: "Test Rider",
    category: "Engine Oil",
    image: "/images/blog-brand-comparison.jpg",
    readTime: 4,
    tags: ["engine oil", "comparison", "Castrol", "Motul", "Shell"],
  },
  {
    id: 9,
    title: "Tubeless vs Tube Tyres: Which One Should You Choose?",
    slug: "tubeless-vs-tube-tyres",
    excerpt: "Tubeless tyres are becoming standard, but tube tyres still have advantages. We break down the pros, cons, and cost differences.",
    content: `
      <p>Most modern motorcycles come with tubeless tyres, but many classic and off-road bikes still use tube-type. Which is right for you?</p>
      <h2>Tubeless Tyres – Pros</h2>
      <ul><li>Puncture self-seals (slow leak instead of sudden deflation)</li><li>Lighter (no inner tube)</li><li>Run cooler, better heat dissipation</li><li>Easier to repair with plug kits</li></ul>
      <h2>Tube Tyres – Pros</h2>
      <ul><li>Cheaper upfront cost</li><li>Easier to change in remote areas (no special tools)</li><li>Better for spoked wheels (classic look)</li></ul>
      <h2>Which to Buy?</h2>
      <p>If you ride mostly on paved roads, go tubeless. For adventure or vintage bikes, tubes are fine. Upgrade your wheels to tubeless-ready rims for the best of both.</p>
      <p><strong>Offer:</strong> Buy any pair of tubeless tyres and get a free puncture repair kit.</p>
    `,
    date: "12 May 2025",
    author: "Wheel Expert",
    category: "Tyres",
    image: "/images/blog-tubeless.jpg",
    readTime: 4,
    tags: ["tyres", "tubeless", "tube tyres", "comparison"],
  },
  {
    id: 10,
    title: "Motorcycle Oil Change Guide: Step-by-Step for Beginners",
    slug: "oil-change-guide-beginners",
    excerpt: "Do it yourself and save money. Follow this simple 10-step guide to change your motorcycle oil and filter at home.",
    content: `
      <p>Changing your own oil is easy and saves $50-100 per service. Here's everything you need.</p>
      <h2>Tools Required</h2>
      <ul><li>Wrench for drain plug</li><li>Oil filter wrench</li><li>Oil drain pan</li><li>Funnel</li><li>New oil and filter</li></ul>
      <h2>Step-by-Step</h2>
      <ol><li>Warm up engine (oil flows easier)</li><li>Put bike on center stand</li><li>Remove drain plug and let oil drain</li><li>Replace crush washer and tighten plug</li><li>Remove old filter, lube new filter gasket, install hand-tight</li><li>Pour recommended amount of new oil</li><li>Check dipstick, run engine, check for leaks</li><li>Dispose of old oil properly</li></ol>
      <p><strong>DIY Kit:</strong> We sell complete oil change kits (oil + filter + crush washer) starting at $35. Free how-to video included.</p>
    `,
    date: "18 Jun 2025",
    author: "DIY Dude",
    category: "Engine Oil",
    image: "/images/blog-oil-change-guide.jpg",
    readTime: 6,
    tags: ["DIY", "oil change", "maintenance", "guide"],
  },
  {
    id: 11,
    title: "Top 5 Motorcycle Tyres for Rainy Season Riding",
    slug: "best-rain-tyres-motorcycle",
    excerpt: "Wet roads demand special tyres. We tested the best wet-weather tyres for commuters and sport riders.",
    content: `
      <p>Rain reduces grip by up to 50%. These tyres excel in wet conditions.</p>
      <h2>1. Michelin Pilot Street 2</h2>
      <p>Silica compound and deep grooves channel water away. Excellent for city commuting. Price $80-110.</p>
      <h2>2. Pirelli Angel GT</h2>
      <p>Sport-touring tyre with high silica content. Good for aggressive riding in rain. $120-150.</p>
      <h2>3. MRF Zapper S</h2>
      <p>Budget-friendly option with decent wet grip. $60-80. Great for 150cc commuters.</p>
      <h2>4. Metzeler Roadtec 01</h2>
      <p>Premium wet-weather performance, long life. $140-180.</p>
      <h2>5. CEAT Gripp XL</h2>
      <p>Affordable, good for Indian monsoons. $55-75.</p>
      <p><strong>Sale:</strong> All rain tyres 10% off + free fitting until end of monsoon season.</p>
    `,
    date: "01 Jul 2025",
    author: "Rain Rider",
    category: "Tyres",
    image: "/images/blog-rain-tyres.jpg",
    readTime: 3,
    tags: ["tyres", "rain", "safety", "wet weather"],
  },
  {
    id: 12,
    title: "Synthetic vs Mineral Engine Oil: Which is Worth Your Money?",
    slug: "synthetic-vs-mineral-oil",
    excerpt: "Synthetic oil costs twice as much. Does it really protect better? We explain the differences and help you decide.",
    content: `
      <p>The debate has raged for decades. Here are the facts.</p>
      <h2>Mineral Oil (Conventional)</h2>
      <p>Refined from crude oil. Breaks down faster, needs changes every 2,000-3,000 km. Cheaper ($5-7/L). Fine for older bikes or low-mileage use.</p>
      <h2>Synthetic Oil</h2>
      <p>Chemically engineered molecules. Lasts 5,000-7,000 km, better high-temperature stability, reduces engine wear. Costs $10-15/L.</p>
      <h2>Which to Choose?</h2>
      <p>If you ride hard, long distances, or have a high-performance engine, go synthetic. For short commutes on a budget, mineral works.</p>
      <p><strong>Hybrid option:</strong> Semi-synthetic blends give some benefits at mid-price. Try our starter pack – 2L semi-synthetic + filter for $25.</p>
    `,
    date: "22 Aug 2025",
    author: "Oil Analyst",
    category: "Engine Oil",
    image: "/images/blog-synthetic-vs-mineral.jpg",
    readTime: 4,
    tags: ["engine oil", "synthetic", "mineral", "comparison"],
  },
  {
    id: 13,
    title: "How to Choose the Right Tyre Size for Your Motorcycle",
    slug: "choose-correct-tyre-size",
    excerpt: "Wrong tyre size can ruin handling and safety. Use our guide to decode tyre markings and find the perfect fit.",
    content: `
      <p>Tyre sidewall markings like 120/70-17 tell you everything. Here's how to read them.</p>
      <h2>Decoding the Numbers</h2>
      <p><strong>120</strong> = width in mm<br><strong>70</strong> = aspect ratio (height is 70% of width)<br><strong>17</strong> = rim diameter in inches</p>
      <h2>Finding Your Bike's Recommended Size</h2>
      <p>Check your owner's manual or the sticker on the swingarm. Also note speed rating (H, V, Z) and load index.</p>
      <h2>Common Mistakes</h2>
      <ul><li>Going wider than stock – may rub on swingarm or chain</li><li>Changing aspect ratio too much – alters speedometer accuracy</li><li>Mixing radial and bias-ply tyres – dangerous</li></ul>
      <p><strong>Free service:</strong> Use our online tyre size calculator or visit our store for expert fitting advice.</p>
    `,
    date: "10 Sep 2025",
    author: "Fitment Pro",
    category: "Tyres",
    image: "/images/blog-tyre-size.jpg",
    readTime: 4,
    tags: ["tyres", "size guide", "fitment", "safety"],
  },
  {
    id: 14,
    title: "Motorcycle Tyre Pressure Guide: Why 2-3 PSI Makes a Big Difference",
    slug: "tyre-pressure-guide",
    excerpt: "Incorrect tyre pressure kills fuel economy, handling, and tyre life. Learn the ideal pressures for solo, pillion, and luggage loads.",
    content: `
      <p>Most riders ignore tyre pressure until a flat occurs. Here's why you should check it weekly.</p>
      <h2>Effects of Low Pressure</h2>
      <ul><li>Poor cornering grip (tyre squirms)</li><li>Increased rolling resistance (lower MPG)</li><li>Overheating and tread separation</li><li>Faster edge wear</li></ul>
      <h2>Effects of High Pressure</h2>
      <ul><li>Harsh ride</li><li>Reduced contact patch (less grip)</li><li>Center tread wears quickly</li></ul>
      <h2>Recommended Pressures</h2>
      <p>Solo riding: Front 28-32 PSI, Rear 32-36 PSI. With pillion or luggage: Add 2-4 PSI to rear.</p>
      <p>Check when tyres are cold. Use a quality digital gauge.</p>
      <p><strong>Promotion:</strong> Buy a digital tyre pressure gauge and get a free valve cap set.</p>
    `,
    date: "28 Oct 2025",
    author: "Pressure Patrol",
    category: "Tyres",
    image: "/images/blog-pressure.jpg",
    readTime: 3,
    tags: ["tyres", "pressure", "safety", "maintenance"],
  },
  {
    id: 15,
    title: "Top 10 Motorcycle Maintenance Tips Before a Long Road Trip",
    slug: "long-road-trip-maintenance",
    excerpt: "Planning a cross-country ride? Use this checklist to avoid breakdowns and enjoy a stress-free journey.",
    content: `
      <p>A little prep goes a long way. Here's what to check before hitting the highway.</p>
      <h2>1. Oil and Filter</h2>
      <p>Fresh oil if you're due. Top up if not.</p>
      <h2>2. Tyres</h2>
      <p>Check tread depth, pressure, and for cracks. Consider new tyres if less than 2mm tread.</p>
      <h2>3. Chain and Sprockets</h2>
      <p>Clean, lube, adjust slack. Replace if worn.</p>
      <h2>4. Brakes</h2>
      <p>Check pad thickness and brake fluid level.</p>
      <h2>5. Coolant</h2>
      <p>Top up and check for leaks.</p>
      <h2>6. Lights and Horn</h2>
      <p>Ensure all bulbs work.</p>
      <h2>7. Battery</h2>
      <p>Clean terminals, check charge.</p>
      <h2>8. Cables</h2>
      <p>Lubricate throttle and clutch cables.</p>
      <h2>9. Suspension</h2>
      <p>Look for leaks, adjust preload for load.</p>
      <h2>10. Tool Kit</h2>
      <p>Carry basic tools, tyre repair kit, first aid.</p>
      <p><strong>Travel bundle:</strong> Buy any 2L oil + tyre repair kit and save 15%.</p>
    `,
    date: "15 Nov 2025",
    author: "Trip Master",
    category: "Maintenance",
    image: "/images/blog-trip-maintenance.jpg",
    readTime: 6,
    tags: ["road trip", "maintenance", "checklist", "safety"],
  },
  {
    id: 16,
    title: "Motorcycle Oil Additives: Do They Really Work?",
    slug: "oil-additives-myths",
    excerpt: "From friction reducers to stop-leak additives – we separate fact from fiction. Save your money (or not).",
    content: `
      <p>You've seen them at auto stores: tiny bottles promising miraculous results. Are they worth it?</p>
      <h2>Friction Reducers (e.g., PTFE, Moly)</h2>
      <p>Modern oils already contain advanced friction modifiers. Adding extra can upset the oil's chemistry. Not recommended.</p>
      <h2>Engine Flush Additives</h2>
      <p>Useful for sludged engines. But if your oil is changed regularly, unnecessary. Use only before oil change.</p>
      <h2>Stop-Leak for Oil Seals</h2>
      <p>These swell rubber seals temporarily. Can mask the problem and later cause seal failure. Better to replace the seal.</p>
      <h2>Zinc (ZDDP) Additives</h2>
      <p>Flat-tappet engines (older bikes) may benefit, but modern catalytic converters get damaged. Check your bike's year.</p>
      <p>Verdict: Most additives are snake oil. Use quality oil and change it on time. Save your money for premium oil instead.</p>
    `,
    date: "02 Dec 2025",
    author: "Chemical Engineer",
    category: "Engine Oil",
    image: "/images/blog-additives.jpg",
    readTime: 5,
    tags: ["additives", "myths", "engine oil", "tips"],
  },
  {
    id: 17,
    title: "How to Store Motorcycle Tyres During Off-Season",
    slug: "store-tyres-off-season",
    excerpt: "Proper storage prevents flat spots, cracking, and ozone damage. Follow these steps to keep your tyres fresh until spring.",
    content: `
      <p>If you park your bike for winter or rainy season, don't neglect the tyres.</p>
      <h2>Clean Before Storing</h2>
      <p>Wash off road grime and brake dust. Use mild soap, not harsh solvents.</p>
      <h2>Reduce Pressure Slightly</h2>
      <p>Lower pressure to 15-20 PSI to reduce stress on sidewalls. Do not deflate completely.</p>
      <h2>Keep Tyres Off Cold Concrete</h2>
      <p>Place plywood or rubber mats underneath. Cold concrete accelerates hardening.</p>
      <h2>Avoid Ozone Sources</h2>
      <p>Don't store near electric motors (furnaces, water heaters) – they emit ozone that cracks rubber.</p>
      <h2>Cover Tyres</h2>
      <p>Use breathable covers, not plastic (traps moisture).</p>
      <p><strong>Storage tip:</strong> When you're ready to ride again, get a free tyre inspection with any service.</p>
    `,
    date: "20 Dec 2025",
    author: "Storage Expert",
    category: "Tyres",
    image: "/images/blog-tyre-storage.jpg",
    readTime: 3,
    tags: ["tyres", "storage", "off-season", "maintenance"],
  },
  {
    id: 18,
    title: "Best Motorcycle Oils for High-Mileage Engines",
    slug: "high-mileage-engine-oil",
    excerpt: "Engines with over 30,000 miles need special care. We recommend oils with extra seal conditioners and higher viscosity.",
    content: `
      <p>As engines age, clearances increase and seals harden. Here's what to look for.</p>
      <h2>Look for "High Mileage" Formulas</h2>
      <p>Brands like Castrol GTX High Mileage include seal swell agents and extra anti-wear additives.</p>
      <h2>Slightly Higher Viscosity</h2>
      <p>If you used 10W-40 before, try 20W-50. Thicker oil maintains pressure in worn bearings.</p>
      <h2>Semi-Synthetic vs Mineral</h2>
      <p>Full synthetic might leak past old seals. Semi-synthetic or high-quality mineral is safer.</p>
      <h2>Our Top Picks</h2>
      <ul><li>Motul 3100 20W-50 (semi-synthetic)</li><li>Valvoline VR1 20W-50 (racing oil with zinc)</li><li>Shell Advance AX7 10W-40 (good all-rounder)</li></ul>
      <p><strong>Discount code:</strong> HIMILE15 for 15% off on high-mileage oil bundles.</p>
    `,
    date: "05 Jan 2026",
    author: "Old Bike Specialist",
    category: "Engine Oil",
    image: "/images/blog-high-mileage.jpg",
    readTime: 4,
    tags: ["high mileage", "engine oil", "viscosity", "old bikes"],
  },
  {
    id: 19,
    title: "Motorcycle Tyre Rotation: Do You Need It?",
    slug: "tyre-rotation-myth",
    excerpt: "Unlike cars, motorcycle tyres usually don't get rotated. But there are exceptions. Learn why and when you might swap positions.",
    content: `
      <p>Car owners rotate tyres every 5,000 miles. Should you do the same on a bike?</p>
      <h2>Short Answer: Usually No</h2>
      <p>Front and rear tyres wear differently and have different sizes/construction. Most cannot be swapped.</p>
      <h2>Exception 1: Symmetrical Sizes</h2>
      <p>Some dual-sport or vintage bikes use same size front/rear. You can swap, but keep in mind directional tread patterns.</p>
      <h2>Exception 2: Removing a Tyre for Longevity</h2>
      <p>If you get a rear puncture early, replace the tyre. You can't "rotate" to even out wear because front wears slower.</p>
      <h2>Better Alternative</h2>
      <p>Check pressures monthly and replace tyres in pairs for balanced handling.</p>
      <p><strong>Advice:</strong> Save rotation effort – invest in a tyre pressure monitoring system (TPMS) instead.</p>
    `,
    date: "18 Feb 2026",
    author: "Tyre Tech",
    category: "Tyres",
    image: "/images/blog-rotation.jpg",
    readTime: 2,
    tags: ["tyres", "rotation", "myths", "maintenance"],
  },
  {
    id: 20,
    title: "Eco-Friendly Motorcycle Oils: Are They Better for the Environment?",
    slug: "eco-friendly-motorcycle-oils",
    excerpt: "Biodegradable and low-emission oils are gaining popularity. We review their performance, cost, and green credentials.",
    content: `
      <p>With environmental awareness growing, some riders are switching to eco-friendly lubricants. Do they work?</p>
      <h2>Types of Eco-Oils</h2>
      <ul><li>Biodegradable (ester-based) – breaks down faster if spilled</li><li>Low SAPS (low ash) – reduces particulate emissions</li><li>Re-refined base oils – recycled from used oil</li></ul>
      <h2>Performance</h2>
      <p>Modern biodegradable esters perform as well as synthetics but cost 30-50% more. They are not recommended for extended drain intervals.</p>
      <h2>Where to Use Them</h2>
      <p>Ideal for off-road riding (less environmental impact if leaked). For street use, low SAPS oils are a good compromise.</p>
      <h2>Our Recommendations</h2>
      <p>Motul E-Tech 100% biodegradable, Castrol Power1 Eco (low SAPS).</p>
      <p><strong>Earth Day Offer:</strong> 15% off all eco oils in April. Plus, we plant a tree for every purchase.</p>
    `,
    date: "22 Mar 2026",
    author: "Green Rider",
    category: "Engine Oil",
    image: "/images/blog-eco-oil.jpg",
    readTime: 4,
    tags: ["eco-friendly", "engine oil", "sustainability", "biodegradable"],
  },
];