export interface SanskritTerm {
  devanagari: string;
  iast: string;
  phonetic: string;
  category: 'Tridosha' | 'Dhatu' | 'Rasa' | 'Agni & Ama' | 'Rasayana' | 'Dinacharya' | 'Mahabhuta';
  shortMeaning: string;
  deepDescription: string;
  scripturalContext: string;
  sourceText: string;
}

export interface SanskritShloka {
  id: string;
  title: string;
  devanagari: string;
  iast: string;
  translation: string;
  significance: string;
  source: string;
}

export const SANSKRIT_SHLOKAS: SanskritShloka[] = [
  {
    id: 'swastha-definition',
    title: 'The Definition of True Health (स्वस्थ लक्षणम्)',
    devanagari: 'समदोषः समाग्निश्च समधातुमलक्रियः।\nप्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥',
    iast: 'Samadoṣaḥ samāgniśca samadhātumalakriyaḥ |\nPrasannātmendriyamanāḥ svastha ityabhidhīyate ||',
    translation: 'One whose doshas are in equilibrium, whose digestive fire is balanced, whose bodily tissues and metabolic wastes function in harmony, and whose soul, senses, and mind reside in calm serenity—that person is termed Swastha (truly healthy).',
    significance: 'Ayurveda’s legendary holistic definition of health goes far beyond the mere absence of physical symptoms; it requires emotional equanimity, sensory clarity, and spiritual contentment.',
    source: 'Sushruta Samhita, Sutrasthana 15:48',
  },
  {
    id: 'ayurveda-purpose',
    title: 'The Dual Purpose of Ayurveda (आयुर्वेद प्रयोजनम्)',
    devanagari: 'प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणम्।\nआतुरस्य विकारप्रशमनं च॥',
    iast: 'Prayojanaṁ cāsya svasthasya svāsthyarakṣaṇam |\nĀturasya vikāra-praśamanaṁ ca ||',
    translation: 'The fundamental objective of this science is to preserve and protect the vibrant health of the healthy, and to thoroughly alleviate and pacify diseases in the afflicted.',
    significance: 'Classical Ayurveda places primary precedence on preventive vitality (Swasthyarakshanam) and daily circadian harmony (Dinacharya) before therapeutic intervention.',
    source: 'Charaka Samhita, Sutrasthana 30:26',
  },
  {
    id: 'tridosha-governance',
    title: 'Equilibrium of the Three Bodily Forces (दोष साम्यम्)',
    devanagari: 'वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः।\nविकृताविकृता देहं घ्नन्ति ते वर्तयन्ति च॥',
    iast: 'Vāyuḥ pittaṁ kaphaśceti trayo doṣāḥ samāsataḥ |\nVikṛtā-avikṛtā dehaṁ ghnanti te vartayanti ca ||',
    translation: 'Vata, Pitta, and Kapha are in brief the three vital biological humors (Doshas). In their aggravated, disturbed state, they dismantle the body; in their natural, harmonious equilibrium, they nourish, uphold, and sustain life.',
    significance: 'Highlights the dynamic balance of nature’s wind, fire, and water elements circulating through human physiology.',
    source: 'Ashtanga Hridaya, Sutrasthana 1:6',
  },
  {
    id: 'ojas-essence',
    title: 'Ojas: The Supreme Radiant Essence (ओजस् लक्षणम्)',
    devanagari: 'यत् सारं सर्वधातूनां यत् तत् परममुच्यते।\nओजस्तत् सर्वभूतानां स्थितिर्यदनुवर्तते॥',
    iast: 'Yat sāraṁ sarvadhātūnāṁ yat tat paramamucyate |\nOjastat sarvabhūtānāṁ sthitiryadanuvartate ||',
    translation: 'That which is the quintessential biological essence of all seven bodily tissue layers is hailed as supreme. It is Ojas—the radiant foundation upon which the immune defense and enduring vitality of all living beings depends.',
    significance: 'Ojas is the ultimate physical and energetic product of complete digestion and mindful sattvic living.',
    source: 'Charaka Samhita, Sutrasthana 17:74',
  },
];

export const SANSKRIT_TERMS: SanskritTerm[] = [
  // Tridosha
  {
    devanagari: 'वात',
    iast: 'Vāta',
    phonetic: 'VAA-tuh',
    category: 'Tridosha',
    shortMeaning: 'Principle of kinetic movement and nervous conduction',
    deepDescription: 'Governed by Vayu (Air) and Akasha (Ether). Controls breathing, cellular division, nerve transmission, motor impulses, and sensory perception. Qualities: dry, light, cold, mobile, subtle, clear.',
    scripturalContext: 'Charaka: "Vata is the commander of all bodily processes; without Vata, Pitta and Kapha are immobile like clouds in the sky."',
    sourceText: 'Charaka Samhita',
  },
  {
    devanagari: 'पित्त',
    iast: 'Pitta',
    phonetic: 'PIT-tuh',
    category: 'Tridosha',
    shortMeaning: 'Principle of transformation, digestion, and heat',
    deepDescription: 'Governed by Tejas (Fire) and Jala (Water). Manages enzymatic conversion, stomach digestion, visual discernment, body warmth, and intellectual bravery. Qualities: hot, sharp, light, oily, liquid.',
    scripturalContext: 'Sushruta: "Pitta is responsible for color, heat, digestion, radiance, courage, and mental brilliance."',
    sourceText: 'Sushruta Samhita',
  },
  {
    devanagari: 'कफ',
    iast: 'Kapha',
    phonetic: 'KUH-fuh',
    category: 'Tridosha',
    shortMeaning: 'Principle of cohesion, lubrication, and structural stability',
    deepDescription: 'Governed by Prithvi (Earth) and Jala (Water). Provides tissue mass, joint lubrication, immune stamina, endurance, and compassionate emotional steadfastness. Qualities: heavy, slow, cool, oily, smooth.',
    scripturalContext: 'Ashtanga Hridaya: "Kapha builds physical stamina, patience, forgiveness, and holds all tissues bound in unity."',
    sourceText: 'Ashtanga Hridaya',
  },
  {
    devanagari: 'प्रकृति',
    iast: 'Prakṛti',
    phonetic: 'PRAH-kri-tee',
    category: 'Tridosha',
    shortMeaning: 'Inborn constitutional baseline determined at conception',
    deepDescription: 'The unique ratio of Vata, Pitta, and Kapha formed at the moment of conception (Shukra-Shonita Samyoga), unaffected by temporary imbalances. Your inherent lifelong genetic and spiritual temperament.',
    scripturalContext: 'Charaka: "As poisonous worms are born from poison without being harmed by it, so is each individual born with their Prakriti."',
    sourceText: 'Charaka Samhita, Indriya Sthana',
  },
  {
    devanagari: 'विकृति',
    iast: 'Vikṛti',
    phonetic: 'VIK-ri-tee',
    category: 'Tridosha',
    shortMeaning: 'Current state of doshic imbalance and deviation',
    deepDescription: 'The transient perturbation of doshas caused by improper diet, erratic seasonal shifts (Rituviparyaya), emotional stress, or aging. Clinical Ayurveda aims to return Vikriti back to pristine Prakriti.',
    scripturalContext: 'Ashtanga Sangraha: "Health is Prakriti; disease is Vikriti."',
    sourceText: 'Ashtanga Sangraha',
  },

  // Agni & Ama
  {
    devanagari: 'अग्नि',
    iast: 'Agni',
    phonetic: 'UG-nee',
    category: 'Agni & Ama',
    shortMeaning: 'The biological digestive and metabolic sacred flame',
    deepDescription: 'The transformative catalytic energy responsible for cellular digestion, nutrient assimilation, tissue genesis, and sensory perception. Categorized into Jatharagni (gut), 5 Bhutagnis (elemental), and 7 Dhatwagnis (tissues).',
    scripturalContext: 'Charaka: "When Agni is extinguished, the person dies; when Agni is balanced, the person lives long, disease-free, and radiant."',
    sourceText: 'Charaka Samhita, Chikitsa Sthana 15',
  },
  {
    devanagari: 'आम',
    iast: 'Āma',
    phonetic: 'AAH-muh',
    category: 'Agni & Ama',
    shortMeaning: 'Unmetabolized endotoxic residue and cellular sludge',
    deepDescription: 'Formed when Agni is weak (Mandagni). Ama is sticky, foul-smelling, heavy, and obstructive, clogging micro-channels (Srotas) and creating the breeding ground for autoimmune inflammation.',
    scripturalContext: 'Madhava Nidana: "Ama is the root origin of nearly all internal systemic disorders."',
    sourceText: 'Madhava Nidana',
  },

  // Rasayana & Ojas
  {
    devanagari: 'ओजस्',
    iast: 'Ojas',
    phonetic: 'OH-jus',
    category: 'Rasayana',
    shortMeaning: 'Superfine nectar of biological immunity and supreme vitality',
    deepDescription: 'The eighth and most subtle refinement of all seven bodily tissue layers. Manifests physically as glowing skin, clear radiant eyes, unshakeable immune resistance, and spiritual contentment.',
    scripturalContext: 'Sushruta: "Loss of Ojas causes fear, chronic fatigue, loss of complexion, and bodily decline."',
    sourceText: 'Sushruta Samhita, Sutrasthana 15',
  },
  {
    devanagari: 'रसायन',
    iast: 'Rasāyana',
    phonetic: 'ruh-SAA-yuh-nuh',
    category: 'Rasayana',
    shortMeaning: 'Science of cellular rejuvenation, longevity, and revitalized tissues',
    deepDescription: 'Literally means "the path or vehicle (Ayana) through which optimal plasma nourishment (Rasa) flows." Classical Rasayana formulas (like Chyawanprash, Ashwagandha, and Triphala) preserve youth and sharpen mental fortitude.',
    scripturalContext: 'Charaka Samhita Chikitsa Sthana 1: "Rasayana imparts longevity, memory, intellect, disease immunity, youth, and lustrous complexion."',
    sourceText: 'Charaka Samhita',
  },
  {
    devanagari: 'मेध्य रसायन',
    iast: 'Medhya Rasāyana',
    phonetic: 'MED-hyuh ruh-SAA-yuh-nuh',
    category: 'Rasayana',
    shortMeaning: 'Nootropic botanicals enhancing memory, discernment, and intellect',
    deepDescription: 'Specific classical herbs that nourish the three cognitive faculties: Dhi (acquisition of wisdom), Dhriti (retention and processing), and Smriti (recall). Premier examples: Brahmi, Shankhpushpi, Mandukaparni, and Yashtimadhu.',
    scripturalContext: 'Charaka Samhita: "Medhya herbs elevate mental longevity, clarity of speech, and eradicate psychic turbidity."',
    sourceText: 'Charaka Samhita, Chikitsa Sthana 1:3',
  },

  // Sapta Dhatu
  {
    devanagari: 'रस धातु',
    iast: 'Rasa Dhātu',
    phonetic: 'RUH-suh DHAH-too',
    category: 'Dhatu',
    shortMeaning: 'Plasma, lymphatic fluid, and primary nutrient nectar',
    deepDescription: 'The primary tissue formed directly from properly digested food (Ahara Rasa). Its sacred function is Prinana (nourishment, hydration, and emotional satisfaction).',
    scripturalContext: 'Sushruta: "Rasa nourishes the blood and provides continuous satisfaction to all bodily structures."',
    sourceText: 'Sushruta Samhita',
  },
  {
    devanagari: 'रक्त धातु',
    iast: 'Rakta Dhātu',
    phonetic: 'RUK-tuh DHAH-too',
    category: 'Dhatu',
    shortMeaning: 'Red blood tissue, cellular oxygenation, and vitality',
    deepDescription: 'Derived from Rasa when acted upon by Ranjaka Pitta in the liver and spleen. Its function is Jivana (sustaining life breath, warm vitality, and cellular oxygen transport).',
    scripturalContext: 'Charaka: "Pure blood preserves strength, complexion, happiness, and long life."',
    sourceText: 'Charaka Samhita',
  },
  {
    devanagari: 'अस्थि धातु',
    iast: 'Asthi Dhātu',
    phonetic: 'US-thee DHAH-too',
    category: 'Dhatu',
    shortMeaning: 'Skeletal bone tissue, teeth, and structural architecture',
    deepDescription: 'The fifth tissue layer governed by Earth and Air elements. Its primary physiological duty is Dharana (holding the bodily frame erect and shielding vulnerable internal organs). Seat of Vata dosha.',
    scripturalContext: 'Ashtanga Hridaya: "Asthi bestows stability and supports the bodily frame."',
    sourceText: 'Ashtanga Hridaya',
  },
  {
    devanagari: 'मज्जा धातु',
    iast: 'Majjā Dhātu',
    phonetic: 'MUJ-jaa DHAH-too',
    category: 'Dhatu',
    shortMeaning: 'Nervous tissue, cerebrospinal fluid, and bone marrow',
    deepDescription: 'Fills bone cavities and forms the brain and nervous transmission conduits. Its sacred function is Purana (filling emptiness) and bestowing unctuous ease, sensory perception, and intellect.',
    scripturalContext: 'Charaka: "Majja gives unctuous strength, joy, reproductive semen vitality, and fills the bone matrices."',
    sourceText: 'Charaka Samhita',
  },

  // Shad Rasa (Six Tastes)
  {
    devanagari: 'मधुर रस',
    iast: 'Madhura Rasa',
    phonetic: 'MUH-dhoo-ruh RUH-suh',
    category: 'Rasa',
    shortMeaning: 'Sweet taste (Earth + Water); nourishing, building, soothing',
    deepDescription: 'Constructed from Prithvi and Jala. Builds all 7 tissues, enhances Ojas, calms Vata and Pitta, but aggravates Kapha in excess. Found in Ghee, whole milk, grains, and sweet roots.',
    scripturalContext: 'Charaka: "Madhura rasa is soothing, restorative, pleasing to the mind, and builds vital tissue."',
    sourceText: 'Charaka Samhita, Sutrasthana 26',
  },
  {
    devanagari: 'तिक्त रस',
    iast: 'Tikta Rasa',
    phonetic: 'TIK-tuh RUH-suh',
    category: 'Rasa',
    shortMeaning: 'Bitter taste (Air + Ether); cooling, detoxifying, lightening',
    deepDescription: 'Constructed from Vayu and Akasha. The most cooling and clarifying taste. Pacifies Pitta and Kapha, cleanses blood (Rakta Shodhana), scrapes Ama, kindles sluggish Agni without generating heat.',
    scripturalContext: 'Charaka: "Though not pleasing to the tongue initially, Tikta clears toxins, stops burning, and purifies milk."',
    sourceText: 'Charaka Samhita, Sutrasthana 26',
  },
  {
    devanagari: 'कषाय रस',
    iast: 'Kaṣāya Rasa',
    phonetic: 'kuh-SHAA-yuh RUH-suh',
    category: 'Rasa',
    shortMeaning: 'Astringent taste (Air + Earth); toning, drying, binding',
    deepDescription: 'Constructed from Vayu and Prithvi. Tightens mucosal membranes, halts bleeding, heals wounds (Ropana), and dries fluid stagnation. Pacifies Pitta and Kapha; aggravates dry Vata in excess.',
    scripturalContext: 'Sushruta: "Kashaya tightens relaxed channels and draws out excess moisture."',
    sourceText: 'Sushruta Samhita',
  },

  // Dinacharya
  {
    devanagari: 'ब्राह्म मुहूर्त',
    iast: 'Brāhma Muhūrta',
    phonetic: 'BRAAH-muh moo-HOOR-tuh',
    category: 'Dinacharya',
    shortMeaning: 'Sacred pre-dawn hour (approx. 96 minutes before sunrise)',
    deepDescription: 'The time of maximum Sattva and atmospheric Prana. Waking during Brahma Muhurta activates pineal melatonin clearing, stimulates natural peristalsis, and attunes the mind for meditation.',
    scripturalContext: 'Ashtanga Hridaya: "One should awaken during Brahma Muhurta to preserve vital life and physical health."',
    sourceText: 'Ashtanga Hridaya, Sutrasthana 2:1',
  },
  {
    devanagari: 'अभ्यङ्ग',
    iast: 'Abhyaṅga',
    phonetic: 'ubh-YUNG-guh',
    category: 'Dinacharya',
    shortMeaning: 'Full-body ritual self-massage with warm medicated botanical oil',
    deepDescription: 'A revered daily practice. Calms the sympathetic nervous system, nourishes the 7 dermal layers, delays aging (Jarahara), dispels fatigue (Shramahara), and pacifies erratic Vata.',
    scripturalContext: 'Charaka Samhita: "Just as a cart wheel becomes strong and resistant to wear when smeared with oil, so does the body when treated daily with Abhyanga."',
    sourceText: 'Charaka Samhita, Sutrasthana 5:85',
  },
  {
    devanagari: 'अनुपान',
    iast: 'Anupāna',
    phonetic: 'uh-noo-PAA-nuh',
    category: 'Dinacharya',
    shortMeaning: 'Vehicle or carrier fluid taken with herbal medicine',
    deepDescription: 'A liquid taken alongside or following herbal formulations (e.g. warm milk, pure honey, warm water, aloe vera, ghee). In Ayurveda, the Anupana guides the herbal active to its target tissue (Dhatu) and enhances bioavailability.',
    scripturalContext: 'Charaka: "As a drop of oil spreads quickly over water, so does medicine quickly permeate the body when escorted by the right Anupana."',
    sourceText: 'Charaka Samhita, Sutrasthana 27',
  },
];
