export type CommunitySector = "crops" | "dairy" | "poultry" | "fisheries" | "pets";

export interface CommunityAnswer {
  id: string;
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  isVerifiedExpert: boolean;
  registrationBadge?: string;
  createdAt: string;
  createdAtEn: string;
  content: string;
  contentEn: string;
  clinicalAction?: string;
  clinicalActionEn?: string;
  upvotes: number;
  isAccepted: boolean;
  expertProfileLink?: string;
  consultationFee?: number;
}

export interface CommunityQuestion {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  sector: CommunitySector;
  cropOrAnimal: string;
  cropOrAnimalEn: string;
  authorName: string;
  authorLocation: string;
  authorLocationEn: string;
  authorAvatar: string;
  authorRole: "farmer" | "dairy_farmer" | "poultry_farmer" | "fish_farmer" | "pet_owner";
  createdAt: string;
  createdAtEn: string;
  upvotes: number;
  views: number;
  isSolved: boolean;
  hasExpertAnswer: boolean;
  images: string[];
  answers: CommunityAnswer[];
}

export const MOCK_COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: "q-101",
    title: "বোরো ধানের শীষ বের হওয়ার মুখে গোড়ায় কালো দাগ ও শীষ শুকিয়ে সাদা হয়ে যাচ্ছে, কী করণীয়?",
    titleEn: "Boro rice neck turning black and panicles turning white just before emergence, what to do?",
    description:
      "আমার ব্রি ধান-২৮ জাতের ৪ বিঘা জমিতে গত ৩ দিন ধরে শীষের গোড়ায় বাদামী-কালো রিং তৈরি হচ্ছে এবং অনেক শীষ শুকিয়ে চিটা হয়ে যাচ্ছে। জমিতে এখনও হালকা পানি আছে। আমি ইতিপূর্বে ইউরিয়া দিয়েছি। এখন কোন ছত্রাকনাশক স্প্রে করলে দ্রুত দমন হবে?",
    descriptionEn:
      "On my 4 bighas of BRRI Dhan-28, brown-black rings appeared at the neck of emerging panicles 3 days ago. Grains are drying out and turning into empty chaff. Standing water is present. I recently topdressed with urea. Which fungicide should I spray immediately?",
    sector: "crops",
    cropOrAnimal: "বোরো ধান (ব্রি ধান-২৮)",
    cropOrAnimalEn: "Boro Rice (BRRI-28)",
    authorName: "মো. রফিকুল ইসলাম",
    authorLocation: "দিনাজপুর সদর, রংপুর বিভাগ",
    authorLocationEn: "Dinajpur Sadar, Rangpur",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    authorRole: "farmer",
    createdAt: "২ ঘণ্টা আগে",
    createdAtEn: "2 hours ago",
    upvotes: 42,
    views: 380,
    isSolved: true,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-101-1",
        authorId: "exp-dr-ramesh-patel",
        authorName: "কৃষিবিদ ড. রমেশ প্যাটেল",
        authorTitle: "প্রধান বৈজ্ঞানিক কর্মকর্তা (উদ্ভিদ রোগতত্ত্ব), ব্রি ফেলো",
        authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "DAE / BARI Reg #7821",
        createdAt: "১ ঘণ্টা আগে",
        createdAtEn: "1 hour ago",
        content:
          "এটি নিশ্চিতভাবেই বোরো ধানের মারাত্মক 'শীষ ব্লাস্ট' (Neck Blast - Magnaporthe oryzae)। ইউরিয়া সারের মাত্রাতিরিক্ত প্রয়োগ ও রাতের কুয়াশা এবং দিনের রোদের আর্দ্রতা এর প্রধান কারণ। এখনই ইউরিয়া সার প্রয়োগ সম্পূর্ণ বন্ধ রাখুন। প্রতি শতকে ৫ গ্রাম হারে পটাশ সার উপরিপ্রয়োগ করতে পারেন।",
        contentEn:
          "This is clearly a severe outbreak of Boro Rice Neck Blast (Magnaporthe oryzae). High nitrogen from urea combined with cool morning dew and warm daylight accelerates spore development. Cease all urea application immediately. Apply MOP (Potash) at 5g per decimal.",
        clinicalAction:
          "জরুরি স্প্রে প্রেসক্রিপশন: ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি (যেমন ট্রুপার/দিফা) প্রতি লিটার পানিতে ০.৭৫ গ্রাম অথবা অ্যাজোক্সিস্ট্রবিন + ডাইফেনোকোনাজোল (যেমন এমিস্টার টপ) প্রতি লিটার পানিতে ১ মিলি হারে মিশিয়ে বিকেলে স্প্রে করুন। ৫ দিন পর দ্বিতীয় স্প্রে নিশ্চিত করুন।",
        clinicalActionEn:
          "Emergency Rx: Spray Tricyclazole 75 WP @ 0.75g/L water OR Azoxystrobin + Difenoconazole @ 1ml/L in late afternoon. Repeat a second spray after 5 days.",
        upvotes: 68,
        isAccepted: true,
        expertProfileLink: "/experts/exp-dr-ramesh-patel",
        consultationFee: 150
      }
    ]
  },
  {
    id: "q-102",
    title: "ডেইরি গাভীর শরীরে ছোট ছোট শক্ত গোল পিন্ড ও পা ফুলে গেছে, দুধ উৎপাদন অর্ধেকে নেমেছে",
    titleEn: "Dairy cow has small hard nodules across hide, swollen hocks, and milk yield dropped by 50%",
    description:
      "আমার ৫ বছর বয়সী অস্ট্রেলিয়ান ফ্রিজিয়ান গাভীটির গত দুদিন ধরে ১০৪° ফারেনহাইট জ্বর। সারা শরীরে মার্বেলের মতো শক্ত গোটা দেখা দিয়েছে এবং পেছনের ডান পা ফুলে গিয়ে দাঁড়াতে পারছে না। মুখে লালা ঝরছে। পাশের খামারেও একই সমস্যা দেখা গেছে। খামারের বাকি ৪টি বাছুরকে কীভাবে আলাদা ও নিরাপদ রাখবো?",
    descriptionEn:
      "My 5-year-old Australian Friesian cow developed a 104°F fever two days ago. Solid marble-sized nodular lesions have appeared all over her neck and flank. Her hind hock is swollen and she struggles to stand. Frothy saliva is dripping. How should I isolate my 4 calves to keep them safe?",
    sector: "dairy",
    cropOrAnimal: "ডেইরি গাভী (হোলস্টাইন ফ্রিজিয়ান)",
    cropOrAnimalEn: "Dairy Cow (Holstein Friesian)",
    authorName: "হাজী মো. খোরশেদ আলম",
    authorLocation: "ঈশ্বরদী, পাবনা",
    authorLocationEn: "Ishwardi, Pabna",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    authorRole: "dairy_farmer",
    createdAt: "৪ ঘণ্টা আগে",
    createdAtEn: "4 hours ago",
    upvotes: 56,
    views: 512,
    isSolved: true,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-102-1",
        authorId: "exp-sarah-jenkins",
        authorName: "ডা. তানিয়া আহমেদ, ডিভিএম",
        authorTitle: "ভেটেরিনারি সার্জন, বোভাইন ক্লিনিক্যাল বিশেষজ্ঞ, বিএইউ",
        authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "BVC Reg #VET-5419",
        createdAt: "৩ ঘণ্টা আগে",
        createdAtEn: "3 hours ago",
        content:
          "এটি ক্লাসিক্যাল ল্যাম্পি স্কিন ডিজিজ (Lumpy Skin Disease - LSD)। এটি একটি ক্যাপপ্রিপক্স ভাইরাস দ্বারা হয় এবং মশা, মাছি ও ডাঁশের মাধ্যমে দ্রুত সুস্থ গরুতে ছড়ায়। আক্রান্ত গাভীটিকে অবিলম্বে মশারি টাঙিয়ে বাকি গরু থেকে কমপক্ষে ৩০ ফুট দূরে আলাদা করুন। বাছুরকে কোনো অবস্থাতেই এই গাভীর কাঁচা দুধ খাওয়াবেন না।",
        contentEn:
          "This is classical Lumpy Skin Disease (LSD) caused by Capripoxvirus, vectored primarily by biting flies, mosquitoes, and ticks. Place the infected cow under a treated mosquito net at least 30 feet away from the healthy herd. Never feed raw milk from this cow to nursing calves.",
        clinicalAction:
          "চিকিৎসা প্রোটোকল: জ্বরের জন্য প্যারাসিটামল বোলাস (ওজন অনুযায়ী) এবং সেকেন্ডারি ব্যাকটেরিয়াল ইনফেকশন ও পা পচা রোধে একজন রেজিস্ট্রার্ড ভেটেরিনারি সার্জনের প্রেসক্রিপশন অনুযায়ী অ্যান্টিবায়োটিক ও অ্যান্টিহিস্টামিনিক শুরু করুন। ক্ষতস্থানে নিমপাতা সেদ্ধ পানি ও পভিডোন আয়োডিন স্প্রে করুন।",
        clinicalActionEn:
          "Clinical Protocol: Administer Paracetamol bolus for pyrexia, along with supportive antihistaminics and broad-spectrum cover for secondary bacteremia per registered vet Rx. Clean nodular lesions with boiled neem leaf water and Povidone-Iodine.",
        upvotes: 84,
        isAccepted: true,
        expertProfileLink: "/experts/exp-sarah-jenkins",
        consultationFee: 250
      }
    ]
  },
  {
    id: "q-103",
    title: "সোনালি ব্রয়লার মুরগির সাদা চুনের মতো পাতলা পায়খানা ও ঝিঁমুনি, প্রতিদিন ২০-২৫টি মারা যাচ্ছে",
    titleEn: "Sonali broiler chickens passing white chalky droppings and huddling, 20-25 dying daily",
    description:
      "আমার ৩,০০০ সোনালি মুরগির ফার্মের বয়স আজ ২২ দিন। গত দুদিন ধরে মুরগিগুলো একসাথে এক কোণায় জড়ো হয়ে চোখ বুজে ঝিমোচ্ছে। ড্রপিংসে চুনের মতো সাদা পানির ভাগ বেশি এবং ক্ষুধা একেবারেই নেই। লিটার শুকনো রাখার চেষ্টা করছি। এটা কি গামবোরো নাকি রানিক্ষেত? কীভাবে লস কমাবো?",
    descriptionEn:
      "In my flock of 3,000 Sonali chickens at day 22, the birds started huddling in corners with ruffled feathers and closed eyes 2 days ago. Droppings are profuse, chalky white, and feed intake plummeted by 70%. Is this IBD (Gumboro) or Newcastle (Ranikhet)? How can I mitigate mortality?",
    sector: "poultry",
    cropOrAnimal: "সোনালি ব্রয়লার মুরগি (বয়স ২২ দিন)",
    cropOrAnimalEn: "Sonali Broiler (Day 22)",
    authorName: "কামরুল হাসান সুমন",
    authorLocation: "ভালুকা, ময়মনসিংহ",
    authorLocationEn: "Bhaluka, Mymensingh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    authorRole: "poultry_farmer",
    createdAt: "৫ ঘণ্টা আগে",
    createdAtEn: "5 hours ago",
    upvotes: 38,
    views: 420,
    isSolved: false,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-103-1",
        authorId: "exp-dr-khalid-sheikh",
        authorName: "ডা. মো. খালিদ সাইফুল্লাহ",
        authorTitle: "পোল্ট্রি মেডিসিন কনসালট্যান্ট ও এভিয়ান প্যাথলজিস্ট",
        authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "BVC Reg #VET-6022",
        createdAt: "৩ ঘণ্টা আগে",
        createdAtEn: "3 hours ago",
        content:
          "বয়স (২২ দিন) এবং চুনের মতো ডায়রিয়া বিবেচনায় এটি মারাত্মক ইনফেকশাস বার্সাল ডিজিজ বা গামবোরো (Gumboro / IBD) হওয়ার আশঙ্কা শতকরা ৯০ ভাগ। এই সময় ভুলেও কোনো অ্যান্টিবায়োটিক চালাবেন না, এতে কিডনি বিকল হয়ে মৃত্যুর হার দ্বিগুণ হবে। রোগাক্রান্ত মৃত পাখির থাই ও বুকের মাংসে ছোপ ছোপ রক্তের দাগ এবং পায়ুপথের ভেতরে থাকা বার্সা ফুলে গেছে কি না পোস্টমর্টেমে দেখে নিন।",
        contentEn:
          "Given the day 22 timing and white chalky diarrhea, this strongly indicates acute Infectious Bursal Disease (IBD / Gumboro). DO NOT administer heavy antibiotics right now—it causes nephrosis and spikes mortality. Inspect deceased birds for bursal edema and thigh petechial hemorrhages.",
        clinicalAction:
          "তাৎক্ষণিক ব্যবস্থাপনা: পানিতে পর্যাপ্ত ভিটামিন সি, ইলেক্ট্রোলাইট ও কিডনি টনিক বা ডিটক্সিফায়ার (যেমন রেনাল কেয়ার) দিন। গুড় বা গ্লুকোজ পানি শক্তি জোগাতে সাহায্য করবে। শেডের বায়োসিকিউরিটি জোরদার করে পটাশিয়াম পারম্যাঙ্গানেট দিয়ে ফুটবাথ নিশ্চিত করুন।",
        clinicalActionEn:
          "Emergency Action: Provide oral electrolytes, Vitamin C, and nephroprotective tonics in drinking water. Glucose water aids hydration. Disinfect footbaths with potassium permanganate immediately.",
        upvotes: 49,
        isAccepted: false,
        expertProfileLink: "/experts/exp-dr-khalid-sheikh",
        consultationFee: 200
      }
    ]
  },
  {
    id: "q-104",
    title: "পাঙ্গাশ ও কার্প মিশ্র চাষের পুকুরে ভোরবেলা মাছ ভেসে খাবি খাচ্ছে, পানির রং ঘন কালচে সবুজ",
    titleEn: "Pangas and Carp gasping at water surface at dawn, pond water turned deep scum green",
    description:
      "আমার দেড় একরের পুকুরে প্রায় ৮,০০০ পাঙ্গাশ ও রুই-কাতলার পোনা আছে। গত ৩ দিন ধরে প্রতিদিন সূর্য ওঠার আগে মাছগুলো পানির উপরে মুখ তুলে বাতাস খাচ্ছে। সূর্য উঠলে আবার নিচে চলে যায়। তবে গতকাল থেকে কিছু পাঙ্গাশের পেট ফুলে ভাসতে দেখা যাচ্ছে। আমি দৈনিক ২৫ কেজি বাণিজ্যিক ভাসমান ফিড দিই। গ্যাস দূর করার উপায় কী?",
    descriptionEn:
      "In my 1.5-acre pond with 8,000 Pangas and Rui-Katla fingerlings, fish have been surfacing and gasping for air at 5:00 AM before sunrise for 3 days. They submerge after sunrise, but yesterday several fish floated belly up. I feed 25kg commercial feed daily. How to mitigate this toxic gas / oxygen crash?",
    sector: "fisheries",
    cropOrAnimal: "পাঙ্গাশ ও কার্প মিশ্র চাষ (পুকুর ১.৫ একর)",
    cropOrAnimalEn: "Pangas & Carp Poly-Culture (1.5 Acres)",
    authorName: "আব্দুল মোতালেব",
    authorLocation: "ত্রিশাল, ময়মনসিংহ",
    authorLocationEn: "Trishal, Mymensingh",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    authorRole: "fish_farmer",
    createdAt: "৮ ঘণ্টা আগে",
    createdAtEn: "8 hours ago",
    upvotes: 31,
    views: 310,
    isSolved: true,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-104-1",
        authorId: "exp-matsya-specialist",
        authorName: "মো. নাজমুল হুদা, এমএস",
        authorTitle: "সিনিয়র মৎস্য কর্মকর্তা ও অ্যাকুয়াকালচার বিশেষজ্ঞ",
        authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "Department of Fisheries (DoF) #DOF-229",
        createdAt: "৬ ঘণ্টা আগে",
        createdAtEn: "6 hours ago",
        content:
          "এটি অতিরিক্ত খাবারের অবশিষ্টাংশ এবং শেওলা (Algal Bloom) পচে পানিতে দ্রবীভূত অক্সিজেন (DO) শূন্যের কোঠায় নেমে যাওয়া এবং তলদেশে অ্যামোনিয়া ও বিষাক্ত হাইড্রোজেন সালফাইড গ্যাস জমার ক্লাসিক্যাল লক্ষণ। সূর্যোদয়ের পূর্বে শৈবাল অক্সিজেন তৈরি করতে পারে না বরং গ্রহণ করে, যার ফলে ভোরবেলা তীব্র অক্সিজেন ঘাটতি হয়।",
        contentEn:
          "This is acute dawn Dissolved Oxygen (DO) depletion paired with toxic ammonia build-up caused by algal bloom die-off and unconsumed feed decay. Micro-algae consume oxygen during nighttime, causing the critical dip right before sunrise.",
        clinicalAction:
          "জরুরি প্রতিকার: ১) আগামী ২ দিন মাছের খাবার দেওয়া ৫০% কমিয়ে দিন। ২) এখনই পুকুরে শ্যালো মেশিন দিয়ে পানি ছিটিয়ে কৃত্রিম অক্সিজেন তৈরি করুন অথবা হরা টেনে তলদেশের গ্যাস বের করুন। ৩) প্রতি শতকে ১০০ গ্রাম হারে জিওলাইট ও অক্সিজেন পাউডার (যেমন অক্সিফ্লো/অক্সিট্যাব) অবিলম্বে পানিতে ছিটিয়ে দিন।",
        clinicalActionEn:
          "Immediate Steps: 1) Cut feeding by 50% for 48 hours. 2) Aerate pond immediately via pump spray or rope dragging. 3) Apply Zeolite @ 100g/decimal and sodium percarbonate / Oxygen powder (OxyTab) immediately across the surface.",
        upvotes: 45,
        isAccepted: true,
        expertProfileLink: "/experts/exp-dr-ramesh-patel",
        consultationFee: 150
      }
    ]
  },
  {
    id: "q-105",
    title: "শীতকালীন টমেটো গাছে পাতা তামাটে হয়ে কুঁকড়ে যাচ্ছে এবং ফলে কালো ছোপ ছোপ পচন",
    titleEn: "Winter tomato leaves turning bronzed and curling, fruit developing dark rotting patches",
    description:
      "আমার দেড় বিঘা জমিতে বাহার জাতের হাইব্রিড টমেটোতে গত এক সপ্তাহের ঘন কুয়াশার পর এই রোগ দেখা দিয়েছে। প্রথমে নিচের পুরনো পাতায় পানি ভেজা ভেজা বাদামী দাগ হয়, পরে পুরো ডগা পচে ভেঙে পড়ছে। কাঁচা টমেটোর গায়েও শক্ত কালো ক্ষত তৈরি হচ্ছে। কোন ছত্রাকনাশক দিলে টমেটো সংরক্ষণ করা যাবে?",
    descriptionEn:
      "Following a week of heavy fog on my 1.5 bighas of Bahar Hybrid tomatoes, water-soaked brown lesions appeared on lower leaves, rapidly traveling up shoots. Green fruits are developing firm, sunken leathery black rot patches. What combination will halt this Late Blight?",
    sector: "crops",
    cropOrAnimal: "শীতকালীন হাইব্রিড টমেটো",
    cropOrAnimalEn: "Winter Hybrid Tomatoes",
    authorName: "সুব্রত কুমার রায়",
    authorLocation: "যশোর সদর, যশোর",
    authorLocationEn: "Jashore Sadar, Jashore",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    authorRole: "farmer",
    createdAt: "১০ ঘণ্টা আগে",
    createdAtEn: "10 hours ago",
    upvotes: 27,
    views: 290,
    isSolved: false,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-105-1",
        authorId: "exp-dr-ramesh-patel",
        authorName: "কৃষিবিদ ড. রমেশ প্যাটেল",
        authorTitle: "প্রধান বৈজ্ঞানিক কর্মকর্তা (উদ্ভিদ রোগতত্ত্ব)",
        authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "DAE / BARI Reg #7821",
        createdAt: "৭ ঘণ্টা আগে",
        createdAtEn: "7 hours ago",
        content:
          "এটি টমেটোর মারাত্মক নাবি ধসা বা লেইট ব্লাইট (Late Blight - Phytophthora infestans)। শীতকালের টানা কুয়াশা এবং ১৫-২০ ডিগ্রি সেলসিয়াস তাপমাত্রায় এই রোগ দ্রুত মহামারি রূপ নেয়। আক্রান্ত পচা পাতা ও টমেটো অবিলম্বে জমি থেকে তুলে মাটিতে পুঁতে ফেলুন। ভেজা অবস্থায় জমিতে কাজ করবেন না।",
        contentEn:
          "This is destructive Tomato Late Blight (Phytophthora infestans). Dense winter fog combined with 15–20°C temperatures accelerates the infection cycle. Remove severely infected fruits immediately and bury them outside the plot. Avoid handling plants while wet with morning dew.",
        clinicalAction:
          "ব্যবস্থাপনা: প্রতি লিটার পানিতে ম্যানকোজেব + মেটWorkerক্সিল (যেমন রিডোমিল গোল্ড) ২ গ্রাম অথবা সিমোক্সানিল + ম্যানকোজেব (যেমন কার্জেট) ২ গ্রাম মিশিয়ে কুয়াশা কেটে গেলে পুরো গাছে ভালো করে স্প্রে করুন। গাছে ড্রেনেজ ড্রিপ থাকলে শিকড়ে পানি জমতে দেবেন না।",
        clinicalActionEn:
          "Rx: Spray Metalaxyl + Mancozeb (Ridomil Gold) @ 2g/L or Cymoxanil + Mancozeb (Curzate) @ 2g/L as soon as morning dew dries. Ensure clean drainage along furrows.",
        upvotes: 39,
        isAccepted: true,
        expertProfileLink: "/experts/exp-dr-ramesh-patel",
        consultationFee: 150
      }
    ]
  },
  {
    id: "q-106",
    title: "বিড়ালের চুল অতিরিক্ত ঝরে পড়ছে ও কানের পেছনে চুলকিয়ে রক্ত বের করে ফেলছে",
    titleEn: "Cat shedding excessive fur and scratching behind ears until bleeding, localized scabs",
    description:
      "আমার পার্সিয়ান বিড়াল (বয়স ১ বছর) গত ৪ দিন ধরে কানের পেছনের অংশ এবং ঘাড় অনবরত থাবা দিয়ে চুলকাচ্ছে। লোম উঠে চামড়া লাল হয়ে গেছে এবং খুশকির মতো আঁশ উঠছে। ঘরে অন্য কোনো প্রাণী নেই। এটা কি ফ্লি/টিক অ্যালার্জি নাকি ফাঙ্গাল ইনফেকশন?",
    descriptionEn:
      "My 1-year-old Persian cat has been aggressively scratching her nape and behind the ears for 4 days, causing crusty abrasions and focal hair loss. Skin looks erythematous with dander-like scales. Is this Otodectic ear mite, flea bite hypersensitivity, or ringworm dermatophytosis?",
    sector: "pets",
    cropOrAnimal: "পার্সিয়ান বিড়াল (বয়স ১ বছর)",
    cropOrAnimalEn: "Persian Cat (Age 1 yr)",
    authorName: "মেহজাবিন চৌধুরী",
    authorLocation: "ধানমন্ডি, ঢাকা",
    authorLocationEn: "Dhanmondi, Dhaka",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    authorRole: "pet_owner",
    createdAt: "১ দিন আগে",
    createdAtEn: "1 day ago",
    upvotes: 19,
    views: 240,
    isSolved: true,
    hasExpertAnswer: true,
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80"
    ],
    answers: [
      {
        id: "ans-106-1",
        authorId: "exp-sarah-jenkins",
        authorName: "ডা. ফারহানা হক, ডিভিএম",
        authorTitle: "স্মল অ্যানিমেল প্র্যাকটিশনার ও পেট ডার্মাটোলজিস্ট",
        authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
        isVerifiedExpert: true,
        registrationBadge: "BVC Reg #VET-5419",
        createdAt: "১৮ ঘণ্টা আগে",
        createdAtEn: "18 hours ago",
        content:
          "কানের পেছনে গোলাকার চুল উঠে যাওয়া এবং আঁশ উঠা ডার্মাটোফাইটোসিস (রিংওয়ার্ম) বা ইয়ার মাইটস (Otodectes cynotis)-এর স্পষ্ট লক্ষণ। মানুষের হাতে বা মুখেও এটি ছড়াতে পারে (জুনোটিক), তাই খালি হাতে ক্ষতস্থান স্পর্শ করবেন না এবং হাত ভালো করে সাবান দিয়ে ধোবেন। বিড়ালটিকে কোনো মানুষের স্টেরয়েড মলম লাগাবেন না।",
        contentEn:
          "Focal alopecia with scaling around ears is highly indicative of Dermatophytosis (Ringworm) or Otodectic ear mites. This can be zoonotic, so wash hands with antiseptic after contact. Never apply human topical steroid creams to feline skin.",
        clinicalAction:
          "পরামর্শ: অবিলম্বে একটি এলিজাবেথান কলার (E-Collar) পরিয়ে দিন যাতে থাবা দিয়ে আর ক্ষত তৈরি করতে না পারে। ক্লোরহেক্সিডিন শ্যাম্পু দিয়ে হালকা স্নান এবং অ্যান্টিফাঙ্গাল স্প্রে বা কানের ড্রপ শুরু করার জন্য ডাক্তারের বিস্তারিত ডিজিটাল প্রেসক্রিপশন নিন।",
        clinicalActionEn:
          "Management: Fit an Elizabethan cone collar immediately to cease self-mutilation. Obtain a prescription for veterinary Chlorhexidine wipes and targeted topical antifungal solution.",
        upvotes: 31,
        isAccepted: true,
        expertProfileLink: "/experts/exp-sarah-jenkins",
        consultationFee: 200
      }
    ]
  }
];
