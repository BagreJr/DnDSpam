document.addEventListener("DOMContentLoaded", () => {
    // Existing variable declarations (keep all of them)
    const button = document.getElementById("discoverButton");
    const classImage = document.getElementById("classImage");
    const className = document.getElementById("className");
    const classDescription = document.getElementById("classDescription");
    const galleryContainer = document.getElementById("galleryContainer");
    const galleryButton = document.getElementById("toggleGalleryButton");
    const gallery = document.getElementById("gallery");
	const subclassName = document.getElementById("subclassName") || document.createElement("h4");
	// QUIZ
	const quizButton = document.getElementById("quizButton");
	const quizContainer = document.getElementById("quizContainer");
	const quizQuestion = document.getElementById("quizQuestion");
	const quizOptions = document.getElementById("quizOptions");
	const backButton = document.getElementById("backButton");
	const quizResult = document.getElementById("quizResult");
	const mainContainer = document.querySelector(".container"); // Contenedor principal
	const exitQuiz = document.getElementById("exitQuiz");
	const quizAudio = document.getElementById("quizAudio");

	const quizProgress = document.getElementById("quizProgress");
	const quizBar = document.getElementById("quizBar");
	const quizRemaining = document.getElementById("quizRemaining");
	const answerSound = document.getElementById("answerSound");

    // --- GRIMORIO VARIABLES ---
    const spellbookButton = document.getElementById("spellbookButton");
    const spellbookContainer = document.getElementById("spellbookContainer");
    const exitSpellbookButton = document.getElementById("exitSpellbookButton");
    const spellList = document.getElementById("spellList");
	const searchSpell = document.getElementById("searchSpell");
    const filterClass = document.getElementById("filterClass");
    const filterLevel = document.getElementById("filterLevel");
    const filterType = document.getElementById("filterType");
	const filterSchool = document.getElementById("filterSchool");
    const filterRitual = document.getElementById("filterRitual");
	const filterDamage = document.getElementById("filterDamage");
    const sortSpells = document.getElementById("sortSpells");
    const toggleFavoritesButton = document.getElementById("toggleFavoritesButton");
    const favoriteSpellListContainer = document.getElementById("favoriteSpellList");
    const toggleSpellViewButton = document.getElementById("toggleSpellViewButton");

    // --- TIER LIST VARIABLES ---
    const tierListButton = document.getElementById("tierListButton");
    const tierListContainer = document.getElementById("tierListContainer");
    const exitTierListButton = document.getElementById("exitTierListButton");
    const addTierRowButton = document.getElementById("addTierRowButton");
    const itemBank = document.getElementById("itemBank");
    const tierRowsContainer = document.getElementById("tierRowsContainer");
    const subclassTierListButton = document.getElementById("subclassTierListButton"); // New button
    const tierListTitle = document.getElementById("tierListTitle"); // Title element
    const downloadTierListButton = document.getElementById("downloadTierListButton"); // Reference the new button
    // --- NEW TIER COLOR SEQUENCE ---
    const defaultTierConfigs = [
        // Corresponds to the initial HTML rows
        { label: 'S', color: '#ff7f7f' }, // Red
        { label: 'A', color: '#ffbf7f' }, // Orange
        { label: 'B', color: '#ffff7f' }, // Yellow
        { label: 'C', color: '#7fff7f' }, // Green
        { label: 'D', color: '#7fbfff' }, // Blue
        { label: 'E', color: '#3100f0' },
        { label: 'F', color: '#6200e1' },
        { label: 'G', color: '#9400d3' },
       { label: 'H', color: '#bf7fff' }, // Púrpura (Completando el espectro)
       { label: 'I', color: '#cc9eff' }, // Púrpura (Decayendo 1)
       { label: 'J', color: '#d4b2ff' }, // Púrpura (Decayendo 2)
       { label: 'K', color: '#dbc4ff' }, // Púrpura (Decayendo 3)
       { label: 'L', color: '#e2d4ff' }, // Púrpura (Decayendo 4)
       { label: 'M', color: '#e9e4ff' }, // Púrpura (Decayendo 5)
       { label: 'N', color: '#efefff' }, // Púrpura (Decayendo 6)
       { label: 'Ñ', color: '#ffffffff' }, // Púrpura (Decayendo 6)
       { label: 'O', color: '#bfbfbf' },  // Gris Neutro (Decaimiento completo)
       { label: 'P', color: '#666666ff' },
       { label: 'Q', color: '#353535ff' },
       { label: 'R', color: '#282828ff' }
    ];
    const fallbackColor = '#8f6262ff'; // Even Darker Gray for subsequent rows
    const fallbackLabel = 'Tier'; // Default label if we run out
    
    // --- STATE VARIABLES ---
    let favoriteSpells = [];
    let favoriteSpellsByCharacter = {}; // Object to hold lists
    let currentCharacter = "Default"; // Default character
    const FAVORITES_STORAGE_KEY = 'dndSpellFavoritesByCharacter_v1'; // Use a new key
    const characterSelect = document.getElementById("characterSelect");
    const addCharacterButton = document.getElementById("addCharacterButton");
    const renameCharacterButton = document.getElementById("renameCharacterButton");
    const deleteCharacterButton = document.getElementById("deleteCharacterButton");
    const currentCharacterNameSpan = document.getElementById("currentCharacterName"); // Optional span
    
    let showingFavorites = false;
    let isSpellViewSimplified = false;
    let allSpells = [];
    let isSpellsLoaded = false;
    let draggedItem = null; // For Tier List Drag-and-Drop
    let shuffledQuestions = []; // For Quiz Questions
    let currentQuestionIndex = 0; // For Quiz
    let answers = []; // For Quiz

 // --- NEW HP CALCULATOR VARIABLES ---
    const hpCalculatorButton = document.getElementById("hpCalculatorButton");
    const hpCalculatorContainer = document.getElementById("hpCalculatorContainer");
    const hpLevelInput = document.getElementById("hpLevelInput"); // New Level input
    const hpClassSelect = document.getElementById("hpClassSelect");
    const hpConModifier = document.getElementById("hpConModifier");
    const hpIsHillDwarf = document.getElementById("hpIsHillDwarf"); // New Checkbox
    const hpHasTough = document.getElementById("hpHasTough");       // New Checkbox
    const hpOtherBonus = document.getElementById("hpOtherBonus");   // New Other Bonus input
    const hpCalculatorResults = document.getElementById("hpCalculatorResults");
    const closeHpCalculator = document.getElementById("closeHpCalculator");
    let hpClassesPopulated = false; // Flag to prevent multiple population runs

    // --- DATA --- (Keep your 'classes' array here)
    const classes = [
        { name: "Alchemist", hitDie: 'd8', savingThrows: ['DEX', 'INT'], image: "images/alchemist.webp", description: "Un genio de las ciencias mágicas y la creación de pociones y elixires.", link: "https://homebrewery.naturalcrit.com/share/km9PgnczNSRA", subclasses: ["Amorist", "Apothecary", "Bowgunner","Dynamo Engineer", "Ionizer", "Mad Bomber", "Mutagenist", "Ooze Rancher", "Pigmentist", "Polymorphist", "Resonator", "Spectral Bomber", "Venomsmith", "Xenoalchemist"] },
        { name: "Artificer", hitDie: 'd8', savingThrows: ['CON', 'INT'], image: "images/artificer.webp", description: "Maestros de la magia y la tecnología, que crean artefactos mágicos y construcciones complejas.", link: "https://homebrewery.naturalcrit.com/share/XlnxbXPJwSb_", subclasses: ["Aeronaut", "Agent", "Alchemist", "Archivist", "Armorer", "Battle Smith", "Biomancer", "Chronothief", "Composer", "Cryptozoologist", "Dungeoneer", "Enhanced", "Forgewright", "Machinist", "Mechanic","Miner","Nuclear Engineer", "Pilot", "Puppeteer", "Reanimator", "Venomist", "Wandslinger"] },
        { name: "Barbarian", hitDie: 'd12', savingThrows: ['STR', 'CON'], image: "images/barbarian.webp", description: "Guerreros primitivos que canalizan su furia en combate, capaces de resistir grandes daños y desatar su fuerza bruta.", link: "https://homebrewery.naturalcrit.com/share/EMNC8JdcJ-I1", subclasses: ["Path of the Ancestral Guardian", "Path of the Battlerager", "Path of the Beast", "Path of the Berserker", "Path of the Brute", "Path of the Burning Rage", "Path of the Champion", "Path of the Deep", "Path of the Devourer", "Path of the Dreadnought", "Path of the Drifter", "Path of the Favored", "Path of the Fin","Path of the Glaicer", "Path of the Kaiju", "Path of Heavy Metal", "Path of the Infernal","Path of the Inferno", "Path of the Juggernaut", "Path of the Muscle Wizard", "Path of the Lycan", "Path of the Mutant", "Path of the Reaver", "Path of the Storm Herald", "Path of the Titan", "Path of the Totem Warrior", "Path of Tranquility", "Path of the Warden", "Path of the Wrecker", "Path of Wilds","Path of Wild Magic", "Path of the World Tree", "Path of the Zealot"] },
        { name: "Bard", hitDie: 'd8', savingThrows: ['DEX', 'CHA'], image: "images/bard.webp", description: "Músicos encantadores y maestros de la magia, cuya música inspira y controla la magia.", link: "https://homebrewery.naturalcrit.com/share/nqImfN7DQmo8", subclasses: ["College of Birdsong", "College of Blade Conductors", "College of Cantors", "College of Chance", "College of Chaos", "College of Command", "College of Creation", "College of Crossroads", "College of Cyberwave", "College of Drama", "College of Eloquence", "College of Eulogies", "College of Fey", "College of Fine Art", "College of Fools", "College of Glamour", "College of Glory", "College of Graffiti", "College of Jesters", "College of Lore", "College of the Mad God", "College of Many Faces", "College of Masks", "College of Mercantile","College of Radiance", "College of Revelry", "College of Romance", "College of the Spheres", "College of Swords", "College of the Vanguard", "College of Valor", "College of Whispers", "College of the Wilds"] },
        { name: "Binder", hitDie: 'd8', savingThrows: ['WIS', 'CHA'], image: "images/binder.webp", description: "Mortal que establece pactos con entidades sobrenaturales para obtener poder.", link: "https://homebrewery.naturalcrit.com/share/Rq5NbuBPOkD5", subclasses: ["The Avatarists", "Brotherhood of Ascetics", "Church of Gyx", "Ishtar’s Faithful", "Legion’s Lodge", "Order of Crimson Binding", "Society of the Stygian Seal"] },
        { name: "Blood Hunter", hitDie: 'd12', savingThrows: ['STR', 'CON'], image: "images/blood_hunter.webp", description: "Cazadores que emplean magia oscura y sacrificios de sangre para cazar monstruos y defender a los inocentes.", link: "https://homebrewery.naturalcrit.com/share/zB7dBsU3NoaA", subclasses: ["Order of Alchemists", "Order of Ascension",  "Order of Crystal","Order of Dawnbringer", "Order of Hellfire","Order of Heretics", "Order of Ichor", "Order of the Inquisition","Order of the Pale Moon", "Order of Temporal Knight", "Order of Reapers", "Order of Salt & Iron", "Order of Sorcery", "Order of Transference", "Order of Undying Thirst", "Order of Witch Knights","Order of the Wyrm"] },
        { name: "Captain", hitDie: 'd8', savingThrows: ['CON', 'CHA'], image: "images/captain.webp", description: "Un líder carismático y estratega, que guía a sus compañeros con autoridad y determinación.", link: "https://homebrewery.naturalcrit.com/share/4_dADwfpFgLl", subclasses: ["Astral Militarum Banner","Beast Banner","Dagger Banner","Demon Banner", "Dragon Banner", "Dreadnought Banner","Eagle Banner", "Holy Banner","Jolly Roger Banner", "Lion Banner", "Ram Banner", "Raven Banner", "Skull Banner","Sport Banner", "Star Banner","Star Wolf Banner", "Treant Banner", "Turtle Banner", "Yellow sign Banner"] },
        { name: "Cleric", hitDie: 'd8', savingThrows: ['WIS', 'CHA'], image: "images/cleric.webp", description: "Canalizan el poder de los dioses para sanar, proteger y combatir las fuerzas del mal.", link: "https://homebrewery.naturalcrit.com/share/ypjQ6cODzLs3", subclasses: ["Arcana Domain", "Beauty Domain", "Blood Domain", "Cataclysm Domain", "Chaos Domain", "Death Domain", "Destruction Domain", "Evolution Domain", "Exorcist Domain", "Forge Domain", "Grave Domain", "Hearth Domain", "Knowledge Domain", "Judgment Domain","Life Domain", "Light Domain", "Luck Domain", "Madness Domain", "Mechanicum Domain","Mysticism Domain", "Nature Domain", "Occult Domain", "Order Domain", "Peace Domain", "Peril Domain", "Pestilence Domain", "Poverty Domain", "Rum Domain", "Shadow Domain", "Shrine Warden Domain", "Steel Domain", "Sun Above Domain", "Tempest Domain", "Thieves Domain", "Time Domain", "Travel Domain", "Trickery Domain", "Twilight Domain", "Void Domain", "War Domain", "Wealth Domain"] },
        { name: "Commoner", hitDie: 'd8', savingThrows: ['STR', 'CON'], image: "images/commoner.webp", description: "Aunque simple, el potencial de un humano es infinito. Con humildad, resistencia y una voluntad inquebrantable, son capaces de enfrentar desafíos que parecerían fuera de su alcance.", link: "https://homebrewery.naturalcrit.com/share/OJJEj04Qu-zG", subclasses: ["Farmer", "Innkeeper", "Laborer", "Old Timer", "Servitor", "Town Guard"] },
        { name: "Craftsman", hitDie: 'd10', savingThrows: ['CON', 'INT'], image: "images/craftsman.webp", description: "Experto en la creación de objetos mágicos y artefactos con fines prácticos o poderosos.", link: "https://homebrewery.naturalcrit.com/share/MnBaupC_WVWe", subclasses: ["Arcane Maesters’ Guild", "Armigers’ Guild", "Bladeworkers’ Guild", "Calibaron’s Guild", "Clockworkers’ Guild", "Courtiers’ Guild", "Finesmith’s Guild","Forgeknight’s Guild", "Hexsmith’s Guild", "Liveoaks’ Guild", "Luminaries’ Guild", "Mechanauts’ Guild", "Scrappers’ Guild", "Thunderlords’ Guild", "Trappers’ Guild","Wintercarvers’ Guild"] },
        { name: "Druid", hitDie: 'd8', savingThrows: ['INT', 'WIS'], image: "images/druid.webp", description: "Guardianes de la naturaleza con habilidades para transformarse en animales y controlar los elementos naturales.", link: "https://homebrewery.naturalcrit.com/share/e3kR64Zn-Qin", subclasses: ["Circle of the Ancients", "Circle of the City", "Circle of Configuration", "Circle of the Deep", "Circle of the Depths", "Circle of Disaster", "Circle of Dreams", "Circle of the Fairy","Circle of the Fist", "Circle of Guardians", "Circle of the Harvest", "Circle of Land", "Circle of the Moon", "Circle of the Obelisk", "Circle of Petal","Circle of Pollen", "Circle of the Self Sacrifice", "Circle of the Shepherd", "Circle of Spores", "Circle of the Sower", "Circle of Stars", "Circle of Stones", "Circle of the Tempest", "Circle of the Tides", "Circle of Vermin", "Circle of the Yokai", "Circle of Wildfire", "Circle of the Wild Gift", "Circle of the Wyrm", "Primal Circle"] },
        { name: "Fighter", hitDie: 'd10', savingThrows: ['STR', 'CON'], image: "images/fighter.webp", description: "Guerrero experto en el combate físico, con habilidades para dominar cualquier tipo de arma.", link: "https://homebrewery.naturalcrit.com/share/ObJ7sUAx1Ggn", subclasses: ["Arcane Archer", "Arcane Knight", "Bestiarius", "Bone Knight", "Brawler", "Caelagarm Oath-Keeper", "Cavalier", "Celestial Lancer", "Champion", "Commander", "Corsair", "Crusader", "Dynamic Duelist", "Dungeoneer", "Echo Knight", "Guardian", "Guerrilla", "Mage Hand Magus", "Mandalorian", "Marksman", "Master at Arms", "Master of Hounds", "Mutant Knight", "Mystic Warrior", "Quartermaster", "Opportunists", "Pseudomorph", "Renegade", "Relentless Hunter", "Rune Knight", "Samurai", "Shadow Knight","Stonecrusher", "Swordsage", "Tinker Knight", "Witch Knight"] },
        { name: "Gadgeteer", hitDie: 'd6', savingThrows: ['DEX', 'INT'], image: "images/gadgeteer.webp", description: "Inventor que utiliza una combinación de ingenio y dispositivos mecánicos para resolver cualquier problema.", link: "https://homebrewery.naturalcrit.com/share/1pBjFWWMDUME", subclasses: ["Biohacker","Cyber Surgeon", "Drone Jockey", "Futurist", "Hardlight Architect", "Hologrammer","Jumper","Mastermaker", "Nanoengineer","Photonist","Quantum Mechanics"] },
        { name: "Gunslinger", hitDie: 'd8', savingThrows: ['DEX', 'CHA'], image: "images/gunslinger.webp", description: "Tirador experto con pistolas, rápido en el combate y letal con cada disparo.", link: "https://homebrewery.naturalcrit.com/share/K2ZWpZUCPF_Q", subclasses: ["Big Game Hunter", "Covert Operative", "Gun Tank", "Gun-Ko Master", "Gundead", "Grenadier", "High Roller", "Holy Marksman", "Janissary", "Laserist", "League of Shadows", "Lucky Son of a Bitch", "Musketeer", "Pistolero", "Sharpshooter", "Space Cowboy", "Spellslinger", "Storm Gunner", "Trick Shot", "Twice-Damned", "Wetslinger","White Hat"] },
        { name: "Illrigger", hitDie: 'd10', savingThrows: ['CON', 'CHA'], image: "images/illriger.webp", description: "Un individuo que forja contratos oscuros con entidades infernales para obtener poder a cambio de su alma.", link: "https://homebrewery.naturalcrit.com/share/YkHqcotv-KCQ", subclasses: ["Architect of Ruin", "Black Menagerist", "Brass Banker", "Cardinals of Inferno", "Despotic Ruler", "Fatebreaker", "Fiendish Marksman", "Hellspeaker", "Nails of Odium", "Painkiller", "Queen’s Champion", "Radiant Sentinel", "Sanguine Knight", "Shadowmaster", "Forsaken","Forsworn"] },
        { name: "Investigator", hitDie: 'd8', savingThrows: ['DEX', 'INT'], image: "images/investigador.webp", description: "Profesional en resolver misterios y desentrañar secretos, con una mente aguda y habilidades excepcionales para el rastreo.", link: "https://homebrewery.naturalcrit.com/share/Vdd_tiCoHg9d", subclasses: ["Antiquarian", "Archivist", "Conspiracy Theorist", "Containment Specialist", "Contractualist", "Cursed Energy Specialist", "Decommissioner", "Detective", "Exterminator", "Infernal Agent", "Inquisitor", "Kid Sleuth", "King of Curses","Medium", "Occultist", "Spy", "Time Operative", "Witch Hunter"] },
        { name: "Magus", hitDie: 'd10', savingThrows: ['CON', 'INT'], image: "images/magus.webp", description: "Talentoso en el uso de magia mediante el dominio de espadas y hechizos combinados.", link: "https://homebrewery.naturalcrit.com/share/ghElGwEE2Io9", subclasses: ["Order of Aether Blade","Order of Arcanists", "Order of Arcane Archers", "Order of Armorers", "Order of the Aurora", "Order of Blades", "Order of Blade Dancers", "Order of Conduits", "Order of Evolution", "Order of Hexblades", "Order of the Occultism", "Order of Scales", "Order of Spellswords", "Order of Sentinels", "Order of Spellbreakers", "Order of Travelers"] },
        { name: "Martyr", hitDie: 'd12', savingThrows: ['STR', 'WIS'], image: "images/martyr.webp", description: "Héroe que sacrifica su propio bienestar por el bien de los demás, con un fuerte sentido del sacrificio y la redención.", link: "https://homebrewery.naturalcrit.com/share/o8FUKqZUgoT7", subclasses: ["Burden of Anonymity", "Burden of Ascension", "Burden of Atonement", "Burden of Calamity", "Burden of Discord", "Burden of the End", "Burden of Fame", "Burden of Humanity", "Burden of Levity", "Burden of Primarch","Burden of Mercy", "Burden of Rebirth", "Burden of Revolution", "Burden of Truth", "Burden of Tyranny", "Burden of Uncharted"] },
        { name: "Monk", hitDie: 'd8', savingThrows: ['STR', 'DEX'], image: "images/monk.webp", description: "Experto en artes marciales y en la meditación, que canaliza su energía interior para mejorar sus habilidades físicas y espirituales.", link: "https://homebrewery.naturalcrit.com/share/guTke3mXD9Nk", subclasses: ["Way of the Astral Self", "Way of the Ascendant Dragon", "Way of the Boulder", "Way of the Bow", "Way of the Brawler", "Way of the Butterfly", "Way of the Dodo", "Way of the Drunken Fist", "Way of the Eight Gates", "Way of the Feather", "Way of Ferocity", "Way of the Flagellant", "Way of the Flowing River", "Way of the Four Fists", "Way of Gravity", "Way of the Hurricane", "Way of the Mask", "Way of the Open Hand", "Way of Radiance", "Way of the Reaper", "Way of the Riftwalker","Way of the Sacred Inks", "Way of the Shadow Arts", "Way of Street Fighting", "Way of the Vigilante", "Way of the Void", "Way of the Warped", "Way of the Wu Jen", "Way of the Wuxia"] },
        { name: "Necromancer", hitDie: 'd6', savingThrows: ['INT', 'CON'], image: "images/necromancer.webp", description: "Ente que manipula las fuerzas de la muerte y controla a los muertos para servir a sus fines oscuros.", link: "https://homebrewery.naturalcrit.com/share/yrujLNR8NHGX", subclasses: ["Black Rider", "Blood Ascendent", "Bonefist","Bow of the Grave", "Corpse Florist", "Crone", "Cyberghoul","Divine Soul", "Dead Mist Acolyte", "Death Knight", "Harbinger of Darkness", "Necrodancer", "Overlord", "Pale Master", "Pharaoh", "Plague Lord", "Reanimator", "Reaper", "Toymaker"] },
        { name: "Paladin", hitDie: 'd10', savingThrows: ['WIS', 'CHA'], image: "images/paladin.webp", description: "Caballero sagrado que combate el mal con el poder divino y un fuerte código de honor.", link: "https://homebrewery.naturalcrit.com/share/QL_7_qGcSaio", subclasses: ["Oath of the Ancients", "Oath of Avarice","Oath of Beauty", "Oath of the Blade", "Oath of the Bound", "Oath of Conquest", "Oath of the Corsair", "Oath of Cosmos","Oath of the Crown", "Oath of Devotion", "Oath of the Doomforged", "Oath of the Eternal Dragon", "Oath of Eternal Night", "Oath of the Exorcist", "Oath of the Forge", "Oath of Glory", "Oath of Heresy", "Oath of Inquisition", "Oath of Judgement","Oath of Liberty", "Oath of Neversetting Star","Oath of Mysticism", "Oath of Preservation", "Oath of Prosperity", "Oath of Redemption", "Oath of Revelry", "Oath of the Sanity", "Oath of the Shield", "Oath of Silence","Oath of Speed","Oath of Splendor","Oath of Solar","Oath of Storms", "Oath of the Sun", "Oath of Timekeeper","Oath of Vengeance", "Oath of the Watchers", "Oath of Winter", "Oath of the Yojimbo", "The Oathless", "Oathbreaker"] },
        { name: "Psionico", hitDie: 'd6', savingThrows: ['WIS', 'INT'], image: "images/psion.webp", description: "La realidad se desvía hacia donde van tus pensamientos. Los psiónicos canalizan la voluntad pura, transformando el pensamiento, la emoción y la memoria en fuerza psíquica pura.", link: "https://homebrewery.naturalcrit.com/share/MoGx_lZZ32mC", subclasses: ["Awakened Mind", "Consuming Mind", "Elemental Mind", "Knowing Mind","Shaper’s Mind", "Transcended Mind", "Unleashed Mind","Wandering Mind"] },
        { name: "Ranger", hitDie: 'd10', savingThrows: ['STR', 'DEX'], image: "images/ranger.webp", description: "Explorador experto en el uso de arcos y el sigilo, con un vínculo profundo con la naturaleza.", link: "https://homebrewery.naturalcrit.com/share/usNwevklFcoN", subclasses: ["Beastborne", "Beast Master", "Bounty Hunter", "Buccaneer", "Crystal Guardian","Deadeye Sniper", "Death Hunter","Drakewarden", "Druidic Guardian", "Dunestrider", "Fey Wanderer", "Freerunner", "Gloom Stalker", "Grim Warden", "Horizon Walker", "Highwayman", "Hunter", "Monster Slayer", "Nomad", "Reconnaissance Scout", "Ronin", "Skysworn", "Slim Rancher","Shadowbane", "Spiritbound", "Spellbreaker", "Stargazer", "Stormchaser","Swarmkeeper", "Trapper", "Vigilante", "Wrangler"] },
        { name: "Rogue", hitDie: 'd8', savingThrows: ['DEX', 'INT'], image: "images/rogue.webp", description: "Experto en el sigilo, la evasión y las trampas, ideal para misiones que requieren astucia y agilidad.", link: "https://homebrewery.naturalcrit.com/share/TQg2QgZKbsDv", subclasses: ["Arachnoid Stalker", "Arcane Trickster", "Angler", "Assassin", "Bloodknife", "Chameleon", "Charlatan", "Duskcaller", "Enforcer", "Daredevil", "Duelist", "Falconer", "Gambler", "Gloaming Knight","Grifter", "Infiltrator", "Inquisitive", "Jumper", "Justicar", "Magehunter", "Mastermind", "Phantom", "Ruffian", "Saboteur", "Scion of the Three","Scoundrel", "Scout", "Socialite", "Soulknife", "Shadow Master", "Skinchanger", "Steelsilk Operative","Surgeon", "Swashbuckler", "Tamaya", "Temporal Trickster", "Thief", "Titan Slayer","Windwalker"] },
        { name: "Savant", hitDie: 'd8', savingThrows: ['INT', 'WIS'], image: "images/savant.webp", description: "Conocedor profundo de las artes arcanas o la ciencia, con habilidades excepcionales para el estudio y la enseñanza.", link: "https://homebrewery.naturalcrit.com/share/3Lw7KbWJnUsy", subclasses: ["AdeAdeptus Administratum", "Archaeologist", "Culinarian", "Engineer", "Gunner","Investigator", "Naturalist", "Mentors", "Occultist", "Orator", "Philosopher", "Physician", "Rune Scribe", "Tactician", "Tinker", "Virtuoso", "Voyager"] },
        { name: "Sorcerer", hitDie: 'd6', savingThrows: ['CON', 'CHA'], image: "images/sorcerer.webp", description: "Un hechicero que canaliza su magia a través de su linaje o conexión con fuerzas sobrenaturales.", link: "https://homebrewery.naturalcrit.com/share/NOEmC8CLMj9P", subclasses: ["Aberrant Mind", "Aether Heart","Astral Sorcery","Bloodrazor","The Chained", "Clockwork Soul", "Cosmic Sorcery", "Dark Wild Magic","Divine Soul", "Divine Right", "Draconic Bloodline", "Emberheart", "Emotion Lord", "Faeblood", "Frost Sorcery", "Gifted One", "Greensinger", "Hellspawn", "Iron Sorcery","Jinx", "Lunar Sorcery", "Magnetism Sorcery", "Mirrorkin", "Mutagenic Bloodline", "Nanite Host", "Oozemaster", "Radiation Freak", "Reincarnated Hero", "Shadow", "Spiritborn", "Spirit Caller", "Stoneblood", "Storm Sorcery", "Toon Magic", "Vampiric Soul", "Voidwielder", "Waveborn", "Wild Magic"] },
        { name: "Vagabond", hitDie: 'd10', savingThrows: ['STR', 'CON'], image: "images/vagabond.webp", description: "Exiliados, perseguidos o simplemente inquietos que viven en movimiento. El camino es su hogar y la desesperación, su mayor maestra.", link: "https://homebrewery.naturalcrit.com/share/7LePIfQ0CLhu", subclasses: ["Adrenaline Junkie", "Brigand", "Experiment X", "Feylost", "Gourmand", "Houndmaster","Justicar","Knight Errant","Mage Brand","Mindblade","Plague Doctor","Pugilist","Rōnin","Troubadour"] },
        { name: "Vessel", hitDie: 'd10', savingThrows: ['CON', 'CHA'], image: "images/vessel.webp", description: "Un ser marcado por una conexión especial con espíritus, otorgándole poderes místicos y transformadores.", link: "https://homebrewery.naturalcrit.com/share/vBYpvFeHFy6v", subclasses: ["The Ancient Wyrms", "The Ascended", "The Beyond", "The Cataclysm", "The Cursed", "The Departed","The Fallen", "The Formless", "The Mushroom Prince", "The Mythic Hero", "The Parasite", "The Overgrown", "The Titan", "The Trickster", "The Undying"] },
        { name: "Warden", hitDie: 'd12', savingThrows: ['CON', 'STR'], image: "images/warden.webp", description: "Defensores de tierras y territorios, especializados en la protección de lo que es sagrado o valioso.", link: "https://homebrewery.naturalcrit.com/share/90VpGRQPU-Cn", subclasses: ["Beastblood Guardian", "Carrion King", "Cosmic Seeker","Elastic Hero","Eye of Twilight", "Diabolist","Drake Blooded","Fey Trailblazer", "Godsworn", "Grey Watchman", "Hellkeeper", "Iceheart Bastion", "Lawbringer", "Loreseeker", "Nightgaunt", "Soulblood Shaman", "Steel Shepherd","Stoneheart Defender", "Storm Sentinel", "Sun Watcher", "Titanblood Sentinel", "Verdant Protector", "Witchbane Hunter"] },
        { name: "Warlock", hitDie: 'd8', savingThrows: ['WIS', 'CHA'], hitDie: 'd8', savingThrows: ['WIS', 'CHA'], image: "images/warlock.webp", description: "Ser que obtiene poder mediante pactos con entidades sobrenaturales a cambio de favores y lealtad.", link: "https://homebrewery.naturalcrit.com/share/kLwQFqpQ7pei", subclasses: ["The Alabaster", "The Archfey", "The Archmage", "The Celestial", "The Coven", "The Dead Mists", "The Elder Sphinx", "The Fathomless", "The Fiend", "The Future You", "The Genie", "The GM", "The Great Tree","The Great Old One", "The Great Wyrm", "The Hexblade", "The King", "The Lantern","The Legacy", "The Legendary Hero", "The Magician", "The Mummy Lord", "The Primeval Growth", "The Shinigami", "The Singularity", "The Solar", "The Star", "The Swarm", "The Symbiont", "The Titan", "The Unblinking", "The Undead", "The Undying", "The Wild Hunt"] },
        { name: "Warlord", hitDie: 'd10', savingThrows: ['INT', 'CON'], image: "images/warlord.webp", description: "Señor de la guerra, un líder militar que dirige a sus tropas con astucia y habilidad estratégica en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/3IUIglJ_K-O4", subclasses: ["Academy of Chivalry", "Academy of Claws","Academy of Counsel","Academy of Dawnbringer", "Academy of Dreadlords", "Academy of Ferocity", "Academy of Liberty","Academy of Order","Academy of the Red","Academy of the Seadog","Academy of Schemes", "Academy of Skalds", "Academy of Tactics","Academy of Zeals"] },
        { name: "Warmage", hitDie: 'd8', savingThrows: ['INT', 'CON'], image: "images/warmage.webp", description: "Estratega experto que domina un area de magia especializada para devastar a sus enemigos en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/rau8aywbKXzF", subclasses: ["House of Bishops", "House of Coalition Arcanist", "House of Darts", "House of Dice", "House of Go", "House of Janus","House of Kings", "House of Knights", "House of Queens", "House of Lancers", "House of Pawns", "House of Rooks", "House of Roulette","House of Words"] },
        { name: "Witch", hitDie: 'd8', savingThrows: ['CHA', 'WIS'], image: "images/witch.webp", description: "Una usuaria de la magia arcana que emplea encantamientos y maldiciones para manipular el destino.", link: "https://homebrewery.naturalcrit.com/share/cl5HbkIH2xFw", subclasses: ["Black Magic", "Blood Magic", "Blue Magic", "Disformity Magic","Duskcaller Magic", "Fragrant Magic", "Fruit Magic","Gingerbread Magic", "Green Magic", "Lunar Magic", "Purple Magic", "Red Magic", "Sky Magic", "Steel Magic", "Tea Magic", "Technicolor Magic", "White Magic"] },
        { name: "Wizard", hitDie: 'd6', savingThrows: ['INT', 'WIS'], image: "images/wizard.webp", description: "Erudito en el estudio y dominio de la magia arcana, capaz de lanzar poderosos hechizos y controlarla con precisión.", link: "https://homebrewery.naturalcrit.com/share/ymEiMM7-iT9H", subclasses: ["Familiar Master", "Magic Missile Mage", "Mystic Savant", "Order of Embalmers", "Order of Scribes", "Origami Mage","School of Abjuration", "School of Animism","School of Automata", "School of Bladesinging", "School of Conjuration", "School of Chronomancy", "School of Divination", "School of Enchantment", "School of Evocation", "School of Gastronomy", "School of Graviturgy", "School of Hardlight", "School of Hexcraft", "School of Illusion", "School of Necromancy", "School of Metallurgy", "School of Somnomancy", "School of Theurgy", "School of Teleportation", "School of Transmutation", "School of War Magic", "School of Warp Watcher", "Shinobi"] }
    ];

    // --- FUNCIONES ---

    // Función para lanzar confetti
    function launchConfetti() {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }


    // --- NEW HP CALCULATOR FUNCTIONS ---
    function populateHpClassSelect() {
        if (hpClassesPopulated) return; // Only run once
        classes.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
        classes.forEach(cls => {
            const option = document.createElement("option");
            option.value = cls.name;
            option.textContent = cls.name;
            hpClassSelect.appendChild(option);
        });
        hpClassesPopulated = true;
    }

    function getMaxHitDieValue(hitDieString) {
        if (!hitDieString) return 6; // Default to d6 if missing
        const match = hitDieString.match(/d(\d+)/);
        return match ? parseInt(match[1]) : 6;
    }

    function calculateAndDisplayHp() {
    const targetLevel = parseInt(hpLevelInput.value);
    const selectedClassName = hpClassSelect.value;
    const conMod = parseInt(hpConModifier.value);
    const isHillDwarf = hpIsHillDwarf.checked;
    const hasTough = hpHasTough.checked;
    const otherBonusPerLevel = parseInt(hpOtherBonus.value) || 0; // Default to 0 if NaN

    // Get result elements
    const hpResultAverageEl = document.getElementById("hpResultAverage");
    const hpResultHitDieEl = document.getElementById("hpResultHitDie");
    const hpResultSavesEl = document.getElementById("hpResultSaves");
    const hpCalculationNoteEl = document.getElementById("hpCalculationNote");

    // Clear previous results initially
    hpResultAverageEl.textContent = "--";
    hpResultHitDieEl.textContent = "--";
    hpResultSavesEl.textContent = "--";
    hpCalculationNoteEl.innerHTML = "<small>Selecciona una clase y nivel.</small>";


    // --- Validations ---
    if (!selectedClassName) {
        hpCalculationNoteEl.innerHTML = "<small style='color:red;'>Por favor, selecciona una clase.</small>";
        return;
    }
    if (isNaN(targetLevel) || targetLevel < 1 || targetLevel > 20) {
         hpCalculationNoteEl.innerHTML = "<small style='color:red;'>Por favor, introduce un nivel válido (1-20).</small>";
        return;
    }
    if (isNaN(conMod)) {
         hpCalculationNoteEl.innerHTML = "<small style='color:red;'>Modificador CON inválido.</small>";
        return;
    }

    // --- Find Class Data ---
    const selectedClass = classes.find(cls => cls.name === selectedClassName);
    if (!selectedClass || !selectedClass.hitDie) {
         hpCalculationNoteEl.innerHTML = "<small style='color:red;'>Error: Datos de clase no encontrados.</small>";
        return;
    }

    // --- Calculations ---
    const maxHitDie = getMaxHitDieValue(selectedClass.hitDie);
    const averageHitDie = Math.floor(maxHitDie / 2) + 1; // Average (rounded up)
    const bonusPerLevel = conMod + (isHillDwarf ? 1 : 0) + (hasTough ? 2 : 0) + otherBonusPerLevel;

    let hpAtLevel1 = maxHitDie + bonusPerLevel;
    hpAtLevel1 = Math.max(1, hpAtLevel1); // Min HP at level 1 is 1

    let currentHp_Average = hpAtLevel1;
    let currentHp_Max = hpAtLevel1;

    for (let lvl = 2; lvl <= targetLevel; lvl++) {
        // Ensure at least 1 HP gain per level
        const gain_Average = Math.max(1, averageHitDie + bonusPerLevel);
        const gain_Max = Math.max(1, maxHitDie + bonusPerLevel);

        currentHp_Average += gain_Average;
        currentHp_Max += gain_Max;
    }

    // --- Display Results ---
    hpResultAverageEl.textContent = currentHp_Average;
    hpResultHitDieEl.textContent = selectedClass.hitDie;
    hpResultSavesEl.textContent = selectedClass.savingThrows.join(', ');

    // Update calculation note
    const avgGainText = `${averageHitDie} (promedio) + ${bonusPerLevel} (bonus)`;
    hpCalculationNoteEl.innerHTML = `<small>Promedio: ${hpAtLevel1} (N1) + (${avgGainText}) por nivel.</small>`;
}

    // --- EVENT LISTENERS ---

    // Evento del botón "Descubrir mi clase"
    button.addEventListener("click", () => {
        button.disabled = true;
        button.style.opacity = "0.5";
		quizButton.disabled = true;
		quizButton.style.opacity = "0.5";
        tierListButton.disabled = true;
        tierListButton.style.opacity = "0.5";
        spellbookButton.disabled = true;
        spellbookButton.style.opacity = "0.5";
        hpCalculatorButton.disabled = true;
        hpCalculatorButton.style.opacity = "0.5";

        let shuffleCount = 45;
        let interval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * classes.length);
            classImage.src = classes[randomIndex].image;
            className.textContent = "? ? ?";
			classDescription.classList.add("hidden");
			subclassName.textContent = "";
        }, 100); // Increased interval for visibility

        setTimeout(() => {
            clearInterval(interval);
            let finalClass = classes[Math.floor(Math.random() * classes.length)];
			let randomSubclass = finalClass.subclasses[Math.floor(Math.random() * finalClass.subclasses.length)];

            // Preload the final image
            const finalImage = new Image();
            finalImage.onload = () => {
                classImage.src = finalClass.image;
                className.textContent = finalClass.name;
                classDescription.innerHTML = `Subclase: ${randomSubclass}<br> <br> ${finalClass.description} <br> <a href="${finalClass.link}" target="_blank">Más información de la clase</a>`;
                classDescription.classList.remove("hidden");
				// subclassName is not used here, description contains it.
                launchConfetti();

                button.disabled = false;
                button.style.opacity = "1";
                quizButton.disabled = false;
                quizButton.style.opacity = "1";
                tierListButton.disabled = false;
                tierListButton.style.opacity = "1";
                spellbookButton.disabled = false;
                spellbookButton.style.opacity = "1";
                hpCalculatorButton.disabled = false;
                hpCalculatorButton.style.opacity = "1";
            };
            finalImage.src = finalClass.image; // Start loading

        }, shuffleCount * 100);
    });

    // --- GALERÍA ---
    const galleryImages = document.querySelectorAll(".gallery img");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("imageCaption");
    const closeButton = document.getElementById("closeModal");
    let zoomLevel = 0;
    let currentIndex = 0;

    function updateModalImage(index) {
        const selectedClass = classes[index];
        modalImage.src = selectedClass.image;
        caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description}<br><br>
			<a href="${selectedClass.link}" target="_blank">La Clase</a>`;
    }

    function showImage(index) {
        if (index < 0) index = classes.length - 1;
        if (index >= classes.length) index = 0;
        currentIndex = index;
        zoomLevel = 0;
        modalImage.classList.remove("zoomed");
        updateModalImage(currentIndex); // Use the function to set image and caption
        modal.style.display = "flex";
    }

    galleryImages.forEach((img, index) => {
		img.addEventListener("click", () => {
			showImage(index);
		});
	});

    modalImage.addEventListener("click", (event) => {
        modalImage.classList.toggle("zoomed");
        zoomLevel = modalImage.classList.contains("zoomed") ? 1 : 0;
        if (zoomLevel === 1) {
            const rect = modalImage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            modalImage.style.setProperty("--zoom-x", `${x}%`);
            modalImage.style.setProperty("--zoom-y", `${y}%`);
        }
    });

    modalImage.addEventListener("mousemove", (event) => {
        if (zoomLevel === 1) {
            const rect = modalImage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            modalImage.style.setProperty("--zoom-x", `${x}%`);
            modalImage.style.setProperty("--zoom-y", `${y}%`);
        }
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalImage.classList.remove("zoomed");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalImage.classList.remove("zoomed");
        }
    });

	document.getElementById("nextImage").addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent modal closing
		showImage(currentIndex + 1);
	});

	document.getElementById("prevImage").addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent modal closing
		showImage(currentIndex - 1);
	});

    document.addEventListener("keydown", (event) => {
        if (modal.style.display === "flex") {
            if (event.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                showImage(currentIndex + 1);
            } else if (event.key === "Escape") {
                modal.style.display = "none";
                modalImage.classList.remove("zoomed");
            }
        }
    });

    // --- QUIZ --- (Keep your Quiz functions: quizQuestions, startQuiz, updateProgress, showQuestion, selectOption, showResult, shuffleArray)
    // Preguntas de ejemplo, puedes agregar
    const quizQuestions = [
    {
        question: "Te das cuenta que el tabernero te quiere estafar ¿Qué haces?",
        options: [
            { text: "Lo beso para que sus labios no sigan hablandome", classes: ["Alchemist","Bard"] },
            { text: "Le muestro el arma", classes: ["Gunslinger", "Warlord", "Captain", "Warden","Gadgeteer","Warmage"] },
            { text: "Planeo como robarle luego", classes: ["Artificer","Investigator","Rogue","Necromancer"] },
            { text: "Lo reporto a las autoridades", classes: ["Paladin", "Cleric","Craftsman"] },
            { text: "Lo mato a golpes", classes: ["Blood Hunter","Barbarian", "Fighter","Ranger","Illrigger","Magus","Vessel"] },
			{ text: "Le hago un encantamiento para mi beneficio", classes: ["Warlock","Wizard", "Witch","Sorcerer","Psionico"] },
            { text: "Me voy en paz", classes: ["Monk", "Druid","Martyr","Commoner","Savant","Vagabond"]}
        ]
    },
    {
        question: "Un dragón aparece en el horizonte acercándose a tu pueblo ¿Qué haces?",
        options: [
            { text: "Tomo mi arma y me preparo a enfrentarlo", classes: ["Fighter","Barbarian","Paladin","Ranger","Blood Hunter"] },
            { text: "Busco un lugar para esconderme y esperar", classes: ["Rogue","Vagabond","Investigator"] },
            { text: "Intento dialogar con él, quizá podamos razonar", classes: ["Bard","Cleric","Sorcerer","Savant"] },
            { text: "Uso la magia para manipular la situación a mi favor", classes: ["Wizard","Warmage","Witch","Psionico"] },
            { text: "Organizo a la gente del pueblo para resistir juntos", classes: ["Warlord","Warden","Martyr","Captain","Warlord"] },
            { text: "Me uno al dragón y busco el caos", classes: ["Illrigger","Necromancer","Warlock"] }
        ]
    },
	    {
        question: "Encontras un cofre misterioso en medio del bosque ¿Qué haces?",
        options: [
            { text: "Lo abro sin pensarlo, la fortuna favorece a los valientes", classes: ["Barbarian","Fighter","Sorcerer","Warmage"] },
            { text: "Lo examino cuidadosamente en busca de trampas", classes: ["Rogue","Investigator","Artificer"] },
            { text: "Lanzo un hechizo para descubrir su naturaleza", classes: ["Wizard","Warlock","Witch","Psionico"] },
            { text: "Lo ignoro, no quiero arriesgarme por simple curiosidad", classes: ["Monk","Commoner","Druid","Magus"] },
            { text: "Lo reclamo en nombre de la justicia y el pueblo", classes: ["Paladin","Cleric","Martyr"] },
            { text: "Intento venderlo sin abrirlo, seguro alguien lo quiere", classes: ["Bard","Captain","Gunslinger"] }
        ]
    },
	    {
        question: "Un aliado cae herido en medio de la batalla ¿Qué haces?",
        options: [
            { text: "Lo curo de inmediato, su vida es prioridad", classes: ["Cleric","Paladin","Martyr","Druid"] },
            { text: "Sigo peleando, ya tendré tiempo de ayudar luego", classes: ["Fighter","Barbarian","Blood Hunter","Magus"] },
            { text: "Lo protejo con mi cuerpo para que nadie más lo hiera", classes: ["Warden","Captain","Vessel"] },
            { text: "Intento distraer al enemigo para ganar tiempo", classes: ["Bard","Investigator","Warmage"] },
            { text: "Aprovecho la distracción para atacar con todo", classes: ["Rogue","Vagabond","Wizard","Necromancer"] },
            { text: "Huyo, no puedo arriesgar mi vida también", classes: ["Warlock","Commoner","Illrigger"] }
        ]
    },
	{
        question: "Llegas a una biblioteca prohibida llena de tomos antiguos ¿Qué haces?",
        options: [
            { text: "Leo cada libro en busca de conocimiento oculto", classes: ["Wizard","Psionico","Savant"] },
            { text: "Busco magia oscura para volverme más poderoso", classes: ["Warlock","Necromancer","Witch"] },
            { text: "Quemo los libros, nadie debería acceder a este mal", classes: ["Paladin","Cleric","Martyr"] },
            { text: "Los robo para venderlos al mejor postor", classes: ["Rogue","Investigator","Sorcerer"] },
            { text: "Escribo mis propias teorías y notas sobre lo que encuentro", classes: ["Ranger","Artificer","Craftsman","Alchemist"] },
            { text: "No me interesa, salgo de ahí sin tocar nada", classes: ["Monk","Druid","Vagabond","Commoner"] }
        ]
    },
	{
        question: "Un noble arrogante te insulta en público ¿Cómo respondes?",
        options: [
            { text: "Le devuelvo el insulto con un chiste más ingenioso", classes: ["Bard","Savant","Captain"] },
            { text: "Le rompo la nariz ahí mismo", classes: ["Barbarian","Fighter","Blood Hunter","Illrigger","Magus"] },
            { text: "Uso magia sutil para humillarlo sin que lo note", classes: ["Wizard","Warlock","Sorcerer","Witch","Psionico"] },
            { text: "Ignoro el insulto, no vale mi energía", classes: ["Ranger","Monk","Druid","Commoner","Martyr"] },
            { text: "Recurro a mis contactos para arruinar su reputación", classes: ["Rogue","Investigator","Necromancer"] },
            { text: "Le doy un discurso para que reflexione sobre su arrogancia", classes: ["Paladin","Cleric","Warlord","Warden"] }
        ]
    },
    {
        question: "Te ofrecen un objeto maldito de enorme poder ¿Qué haces?",
        options: [
            { text: "Lo tomo sin dudar, el poder es mío", classes: ["Warlock","Necromancer","Witch","Illrigger","Vessel"] },
            { text: "Lo estudio en detalle antes de decidir", classes: ["Wizard","Artificer","Investigator","Savant"] },
            { text: "Lo destruyo, nadie debería usarlo", classes: ["Paladin","Cleric","Warden","Martyr"] },
            { text: "Lo escondo para que nadie más lo encuentre", classes: ["Vagabond","Druid"] },
            { text: "Intento usarlo para proteger a los demás", classes: ["Captain","Warlord","Blood Hunter"] },
            { text: "Lo vendo al mejor postor, negocios son negocios", classes: ["Rogue","Bard","Gunslinger","Craftsman","Alchemist"] }
        ]
    },
    {
        question: "Estás perdido en un pantano de noche ¿Qué haces?",
        options: [
            { text: "Busco señales naturales para orientarme", classes: ["Ranger","Druid","Vagabond"] },
            { text: "Lanzo un hechizo de luz para abrir camino", classes: ["Wizard","Sorcerer","Warmage","Psionico"] },
            { text: "Subo a un árbol para ubicarme mejor", classes: ["Rogue","Monk"] },
            { text: "Grito pidiendo ayuda, seguro alguien escucha", classes: ["Commoner","Bard","Captain"] },
            { text: "Construyo un artefacto improvisado para orientarme", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] },
            { text: "Me siento en calma, espero y dejo que la fe me guíe", classes: ["Cleric","Paladin","Martyr","Warden"] }
        ]
    },
    {
        question: "Un espíritu te ofrece conocimiento prohibido a cambio de tu memoria ¿Qué haces?",
        options: [
            { text: "Acepto, el conocimiento es más valioso que mi pasado", classes: ["Wizard","Psionico","Warlock","Necromancer"] },
            { text: "Lo rechazo, nada vale mi identidad", classes: ["Paladin","Cleric","Martyr","Monk"] },
            { text: "Negocio para reducir el precio", classes: ["Bard","Captain","Illrigger","Savant"] },
            { text: "Intento engañar al espíritu y llevarme el conocimiento gratis", classes: ["Rogue","Investigator","Vagabond"] },
            { text: "Le ofrezco algo alternativo como mi sangre o dolor", classes: ["Blood Hunter","Vessel","Binder"] },
            { text: "Lo atrapo en un artefacto o sello", classes: ["Artificer","Craftsman","Warden","Gadgeteer"] }
        ]
    },
    {
        question: "Un niño roba tu bolsa de monedas y huye ¿Qué haces?",
        options: [
            { text: "Lo persigo y recupero lo mío", classes: ["Rogue","Fighter","Ranger"] },
            { text: "Lo dejo ir, seguramente lo necesita más que yo", classes: ["Cleric","Monk","Druid","Martyr"] },
            { text: "Lo maldigo para que aprenda su lección", classes: ["Witch","Warlock","Necromancer"] },
            { text: "Lo uso como aprendiz, veo potencial en él", classes: ["Artificer","Alchemist","Captain","Investigator"] },
            { text: "Organizo a la guardia de la ciudad para atraparlo", classes: ["Paladin","Warlord","Warden"] },
            { text: "Lo dejo ir pero luego lo sigo desde las sombras", classes: ["Illrigger","Vagabond"] }
        ]
    },
	    {
        question: "4 goblins están golpeando a una jubilada ¿Qué haces?",
        options: [
            { text: "Me uno a la pelea, algo habra hecho la jubilada", classes: ["Illrigger","Rogue"] },
            { text: "Les grito una canción tan molesta que se van", classes: ["Bard","Savant","Captain"] },
            { text: "Me lanzo con furia desmedida y golpeo a todos", classes: ["Barbarian","Fighter","Blood Hunter","Vagabond"] },
            { text: "Convoco esqueletos para que la defiendan, es un buen entrenamiento", classes: ["Necromancer","Warlock","Witch","Binder"] },
            { text: "La protejo con un aura divina y hago smite en los goblins", classes: ["Paladin","Cleric","Warden","Martyr"] },
            { text: "Construyo un objeto para distraerlos", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] }
        ]
    },
    {
        question: "Encontras a un mago borracho tirado en la calle con un grimorio abierto ¿Qué haces?",
        options: [
            { text: "Le robo el grimorio", classes: ["Rogue","Illrigger","Vagabond"] },
            { text: "Lo despierto con un sermón sobre la responsabilidad", classes: ["Savant","Cleric","Paladin","Martyr"] },
            { text: "Le pongo un sombrero más gracioso y le saco retratos", classes: ["Bard","Captain"] },
            { text: "Lo dejo ahi tirado", classes: ["Artificer","Craftsman","Alchemist"] },
            { text: "Le robo los conjuros", classes: ["Wizard","Sorcerer","Warmage","Psionico"] },
            { text: "Lo cargo en la espalda y lo dejo en la taberna más cercana", classes: ["Fighter","Ranger","Monk","Warden"] }
        ]
    },
    {
        question: "Un pollo empieza a hablarte con voz demoníaca ¿Qué haces?",
        options: [
            { text: "Lo cocino", classes: ["Barbarian","Blood Hunter","Vessel"] },
            { text: "Lo adopto como familiar, es perfecto", classes: ["Witch","Warlock","Necromancer"] },
            { text: "Intento razonar con él, quizá necesite ayuda", classes: ["Cleric","Paladin","Bard"] },
            { text: "Lo estudio para replicarlo", classes: ["Alchemist","Artificer","Gadgeteer"] },
            { text: "Lo ignoro", classes: ["Savant","Captain","Commoner"] },
            { text: "Lo exorcizo con una patada voladora", classes: ["Monk","Illrigger","Magus"] }
        ]
    },
    {
        question: "Un rey te ofrece oro a cambio de que te cases con su hija ogra ¿Qué haces?",
        options: [
            { text: "Acepto, siempre quise una esposa", classes: ["Commoner","Vagabond","Warden"] },
            { text: "Acepto pero solo por el oro, después vemos", classes: ["Rogue","Necromancer","Illrigger"] },
            { text: "Declino con una canción romántica para suavizarlo", classes: ["Bard","Savant","Captain"] },
            { text: "Lanzo un hechizo para cambiar su apariencia", classes: ["Wizard","Sorcerer","Psionico","Witch"] },
            { text: "Acepto, y la respeto como es y me convierto en su campeón", classes: ["Paladin","Cleric","Martyr"] },
            { text: "Le construyo un esposo orco", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] }
        ]
    },
    {
        question: "Un goblin te desafía a un concurso de beber cerveza ¿Qué haces?",
        options: [
            { text: "Acepto y bebo hasta caer, nadie me gana", classes: ["Barbarian","Fighter","Blood Hunter"] },
            { text: "Le pongo laxantes en la jarra", classes: ["Rogue","Investigator","Illrigger"] },
            { text: "Lo animo para hacer una fiesta en vez de competir", classes: ["Bard","Captain","Savant"] },
            { text: "Le hago un hechizo para poder ganar", classes: ["Wizard","Warmage","Sorcerer","Witch"] },
            { text: "Le predico sobre los males del alcohol", classes: ["Cleric","Paladin","Martyr","Monk"] },
            { text: "Transformo la cerveza en una poción explosiva", classes: ["Alchemist","Artificer","Gadgeteer","Craftsman"] }
        ]
    },
    {
        question: "En un pueblo, todos los perros empiezan a ladrarte a la vez ¿Qué haces?",
        options: [
            { text: "Ladro más fuerte para imponer respeto", classes: ["Barbarian","Blood Hunter","Fighter"] },
            { text: "Lanzo un hechizo para convertirlos en gatos", classes: ["Sorcerer","Psionico","Witch"] },
            { text: "Me subo a un techo y me escondo", classes: ["Rogue","Investigator","Vagabond"] },
            { text: "Los bendigo y les doy comida, ahora son mis aliados", classes: ["Cleric","Paladin","Druid","Ranger"] },
            { text: "Los estudio como si fueran un fenómeno paranormal", classes: ["Wizard","Savant","Artificer","Alchemist"] },
            { text: "Organizo un desfile canino", classes: ["Bard","Captain","Warlord"] }
        ]
    },
    {
        question: "Tu espada empieza a hablarte y te pide vacaciones ¿Qué haces?",
        options: [
            { text: "La mando a trabajar igual", classes: ["Illrigger","Warlord","Captain"] },
            { text: "Le doy vacaciones, que luche mis puños", classes: ["Barbarian","Monk","Fighter"] },
            { text: "La fundo y hago un arma nueva mejorada", classes: ["Craftsman","Artificer","Alchemist"] },
            { text: "La mando a un retiro y la dejo de usar", classes: ["Cleric","Paladin","Martyr","Druid"] },
            { text: "La uso como show de comedia", classes: ["Bard","Commoner"] },
            { text: "La clavo en una piedra para que este eternamente sola", classes: ["Wizard","Magus","Vessel","Psionico"] }
        ]
    },
    {
        question: "Un niño te pide que le enseñes a ser héroe ¿Qué haces?",
        options: [
            { text: "Lo entreno a golpes, la vieja escuela", classes: ["Barbarian","Fighter","Ranger"] },
            { text: "Le enseño que el conocimiento es poder", classes: ["Wizard","Savant","Psionico"] },
            { text: "Le enseño a robar antes de que la vida lo golpee", classes: ["Rogue","Investigator","Vagabond"] },
            { text: "Le enseño a ayudar a los demás primero", classes: ["Cleric","Paladin","Martyr","Warden"] },
            { text: "Le enseño a hacer explotar cosas", classes: ["Artificer","Alchemist","Gadgeteer","Warmage"] },
            { text: "Le vendo la guía para héroes en fascículos", classes: ["Illrigger","Bard","Captain","Craftsman"] }
        ]
    },
    {
        question: "Un gnomo insiste en venderte seguros contra dragones ¿Qué haces?",
        options: [
            { text: "Lo golpeo por estafador", classes: ["Barbarian","Blood Hunter","Fighter"] },
            { text: "Firmo el contrato, nunca se sabe", classes: ["Commoner","Paladin","Cleric"] },
            { text: "Reviso el contrato en busca de cláusulas ocultas", classes: ["Investigator","Rogue","Savant"] },
            { text: "Lanzo un hechizo para que olvide quién soy", classes: ["Wizard","Warlock","Witch","Psionico"] },
            { text: "Lo contrato para que trabaje conmigo", classes: ["Illrigger","Captain","Warlord","Warden"] },
            { text: "Le mejoro la póliza y le cobro comisión", classes: ["Artificer","Craftsman","Alchemist","Gadgeteer"] }
        ]
    },
	    {
        question: "Encontras a un niño hambriento robando pan en el mercado. El guardia está a punto de arrestarlo. ¿Qué haces?",
        options: [
            { text: "Detengo al guardia.", classes: ["Paladin","Cleric","Martyr","Warden"] },
            { text: "Le enseño al niño a robar sin ser atrapado.", classes: ["Rogue","Vagabond","Investigator","Commoner"] },
            { text: "Uso magia para alterar la memoria del guardia y dejarlo libre.", classes: ["Wizard","Sorcerer","Psionico","Warlock","Witch"] },
            { text: "Aprovecho la situación para manipular al niño y ganarme un sirviente fiel.", classes: ["Illrigger","Necromancer","Binder","Vessel"] },
            { text: "Construyo un artefacto para proveer pan en el barrio y evitar futuros robos.", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist","Savant"] },
            { text: "Observo en silencio, el mundo enseña sus lecciones mejor que yo.", classes: ["Druid","Ranger","Monk","Blood Hunter","Barbarian"] }
        ]
    },
    {
        question: "Un rey injusto pero estable mantiene la paz con mano de hierro. Un grupo rebelde quiere tu ayuda para derrocarlo, aunque eso podría sumir al reino en caos. ¿Qué haces?",
        options: [
            { text: "Defiendo el orden existente, mejor un tirano que la anarquía.", classes: ["Warlord","Captain","Warden","Paladin","Illrigger"] },
            { text: "Me uno a los rebeldes, prefiero el riesgo del caos a la opresión.", classes: ["Barbarian","Rogue","Vagabond","Fighter","Ranger"] },
            { text: "Me convierto en consejero secreto del rey, manipulando desde las sombras para suavizar su crueldad.", classes: ["Investigator","Wizard","Savant","Warlock"] },
            { text: "Ofrezco mi poder al rey, pero con la condición de gobernar con mi influencia.", classes: ["Necromancer","Binder","Vessel","Illrigger"] },
            { text: "Armo y fortalezco al pueblo con mis inventos para que decidan su destino.", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] },
            { text: "Me retiro, el ciclo del poder no me concierne.", classes: ["Druid","Monk","Commoner","Martyr","Sorcerer"] }
        ]
    },
    {
        question: "Tenes prisionero al asesino de tu familia. Está desarmado, suplicando por su vida. Nadie sabrá qué decisión tomes. ¿Qué haces?",
        options: [
            { text: "Lo ejecuto con furia, la venganza es justicia.", classes: ["Bard","Barbarian","Blood Hunter","Ranger","Fighter"] },
            { text: "Lo entrego a las autoridades, la justicia no es mía para ejercer.", classes: ["Paladin","Cleric","Warlord","Captain"] },
            { text: "Lo libero, cargando yo con el peso de esa misericordia.", classes: ["Monk","Druid","Martyr","Commoner"] },
            { text: "Lo tomo como experimento, su sufrimiento servirá a mi conocimiento.", classes: ["Necromancer","Alchemist","Wizard","Savant","Witch"] },
            { text: "Lo obligo a servirme con pactos o juramentos, convirtiendo su crimen en mi fuerza.", classes: ["Warlock","Illrigger","Binder","Vessel"] },
            { text: "Lo manipulo para que dedique el resto de su vida a reparar el daño hecho.", classes: ["Investigator","Psionico","Craftsman","Gadgeteer"] }
        ]
    },
    {
        question: "Un pueblo entero está maldito: si rompes la maldición morirán 10 inocentes, si la dejas vivirán en sufrimiento perpetuo. ¿Qué decides?",
        options: [
            { text: "Rompo la maldición, mejor una muerte rápida que una vida de tormento.", classes: ["Cleric","Martyr","Paladin","Blood Hunter"] },
            { text: "No intervengo, el destino no debe alterarse.", classes: ["Druid","Monk","Ranger","Commoner"] },
            { text: "Busco una solución alternativa aunque me consuma la vida intentándolo.", classes: ["Wizard","Savant","Craftsman","Artificer"] },
            { text: "Uso la maldición como herramienta para mis propios fines.", classes: ["Warlock","Necromancer","Illrigger","Binder"] },
            { text: "Sacrifico a los inocentes sin dudar.", classes: ["Captain","Warlord","Warden","Magus","Sorcerer"] },
            { text: "Me río del dilema.", classes: ["Witch","Vessel","Psionico","Warmage"] }
        ]
    },
    {
        question: "Un demonio exige tributo de un pueblo pobre a cambio de no destruirlo. ¿Qué haces?",
        options: [
            { text: "Lucho contra el demonio aunque muera intentándolo.", classes: ["Barbarian","Paladin","Fighter","Blood Hunter"] },
            { text: "Negocio con él, buscando un acuerdo más justo.", classes: ["Captain","Investigator","Warlord","Savant"] },
            { text: "Lo manipulo con engaños y magia para evitar el tributo.", classes: ["Wizard","Warlock","Psionico","Witch"] },
            { text: "Propongo sacrificar al pueblo y quedarme con el botín.", classes: ["Necromancer","Illrigger","Vessel","Binder"] },
            { text: "Construyo defensas e inventos para resistir sus ataques.", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] },
            { text: "Llevo al pueblo a otro lugar, la tierra no vale más que la gente.", classes: ["Druid","Ranger","Monk","Commoner"] }
        ]
    },
    {
        question: "Un amigo tuyo confiesa que ha cometido un crimen terrible. Nadie lo sabe, y te pide ayuda para ocultarlo. ¿Qué haces?",
        options: [
            { text: "Lo entrego a la justicia, aunque me duela.", classes: ["Paladin","Cleric","Warden","Captain"] },
            { text: "Lo ayudo a esconder la verdad, la lealtad está por encima de la ley.", classes: ["Bard","Rogue","Vagabond","Barbarian","Fighter"] },
            { text: "Lo uso como herramienta, ahora su secreto me da poder sobre él.", classes: ["Illrigger","Necromancer","Binder","Vessel"] },
            { text: "Lo redimo con paciencia y disciplina, guiándolo hacia el bien.", classes: ["Monk","Martyr","Druid","Savant"] },
            { text: "Manipulo la percepción pública para borrar toda sospecha.", classes: ["Wizard","Warlock","Witch","Psionico"] },
            { text: "Diseño un sistema para que nunca vuelva a ocurrir algo así.", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] }
        ]
    },
    {
        question: "Durante una guerra, descubres que tu ejército planea masacrar a civiles para obtener ventaja estratégica. ¿Qué haces?",
        options: [
            { text: "Me rebelo contra mis superiores y defiendo a los inocentes.", classes: ["Paladin","Cleric","Martyr","Ranger"] },
            { text: "Obedezco órdenes, la victoria requiere sacrificios.", classes: ["Warlord","Captain","Illrigger","Magus","Sorcerer"] },
            { text: "Deserto, no lucharé en una guerra injusta.", classes: ["Monk","Vagabond","Commoner","Druid"] },
            { text: "Uso la masacre como oportunidad para experimentar con magia prohibida.", classes: ["Necromancer","Warlock","Witch","Binder"] },
            { text: "Diseño una estrategia alternativa que evite la masacre.", classes: ["Investigator","Craftsman","Savant","Artificer"] },
            { text: "Canalizo mi furia y lucho contra ambos bandos si es necesario.", classes: ["Barbarian","Blood Hunter","Fighter","Warmage"] }
        ]
    },
    {
        question: "Un poderoso artefacto puede salvar al mundo… o condenarlo, dependiendo de quién lo use. Vos lo encuentras primero. ¿Qué haces?",
        options: [
            { text: "Lo destruyo, demasiado poder para un mortal.", classes: ["Paladin","Cleric","Warden","Martyr"] },
            { text: "Lo guardo, confiando solo en mi voluntad.", classes: ["Fighter","Barbarian","Rogue","Blood Hunter"] },
            { text: "Lo estudio, quizás el riesgo valga el conocimiento.", classes: ["Wizard","Savant","Artificer","Alchemist"] },
            { text: "Lo uso para dominar y forjar mi propio imperio.", classes: ["Bard","Illrigger","Vessel","Binder","Necromancer"] },
            { text: "Lo escondo en la naturaleza, donde nadie pueda hallarlo.", classes: ["Druid","Ranger","Monk","Commoner"] },
            { text: "Lo vendo al mejor postor, no es mi problema.", classes: ["Vagabond","Investigator","Gunslinger","Captain"] }
        ]
    },
    {
        question: "Un dios te ofrece gran poder a cambio de tu libre albedrío. ¿Qué eliges?",
        options: [
            { text: "Acepto, los mortales no deberíamos rechazar lo divino.", classes: ["Cleric","Paladin","Martyr","Warden"] },
            { text: "Rechazo, prefiero vivir libre aunque sea débil.", classes: ["Monk","Druid","Vagabond","Commoner","Magus"] },
            { text: "Acepto, pero planeo traicionar al dios en el futuro.", classes: ["Rogue","Illrigger","Necromancer","Binder"] },
            { text: "Analizo el trato como un contrato y busco cláusulas ocultas.", classes: ["Investigator","Craftsman","Savant","Artificer"] },
            { text: "Acepto con entusiasmo, todo poder es un regalo sin importar el costo.", classes: ["Warlock","Witch","Psionico","Vessel"] },
            { text: "Le disparo al dios, nunca me gustó que me den órdenes.", classes: ["Gunslinger","Warmage","Blood Hunter","Barbarian"] }
        ]
    },
    {
        question: "Tu mejor amigo y un grupo de inocentes están en peligro. Solo puedes salvar a uno. ¿A quién eliges?",
        options: [
            { text: "Salvo a los inocentes, el bien común sobre lo personal.", classes: ["Paladin","Cleric","Captain","Martyr"] },
            { text: "Salvo a mi amigo, mi lealtad es inquebrantable.", classes: ["Warlord","Rogue","Barbarian","Fighter","Vagabond","Magus"] },
            { text: "Intento salvar a ambos aunque sea imposible.", classes: ["Druid","Ranger","Savant","Monk"] },
            { text: "Me retiro, no cargaré con una decisión tan cruel.", classes: ["Commoner","Warden","Investigator","Craftsman"] },
            { text: "Sacrifico a mi amigo para un ritual que salvará a los demás.", classes: ["Necromancer","Binder","Illrigger","Vessel"] },
            { text: "Uso el dilema para manipular al grupo y ganar control.", classes: ["Warlock","Witch","Psionico","Warmage"] }
        ]
    },
    {
		fixed: true,
        question: "¿Qué rol prefieres en un grupo?",
        options: [
            { text: "El Tanque", classes: ["Blood Hunter","Barbarian","Martyr"] },
            { text: "La Lider", classes: ["Captain","Warlord"] },
            { text: "El Sanador", classes: ["Bard", "Cleric"] },
			{ text: "La Ingeniera", classes: ["Artificer","Craftsman","Alchemist","Savant"] },
            { text: "La Magica", classes: ["Wizard","Warlock","Magus","Sorcerer", "Witch"] },
            { text: "El Protector", classes: ["Warden", "Paladin"] },
			{ text: "La Invocadora", classes: ["Necromancer"] },
            { text: "El Daño Puro", classes: ["Rogue", "Fighter","Gunslinger","Monk","Vessel","Warmage"] },
            { text: "La Superviviente", classes: ["Druid", "Ranger","Vagabond"] },
			{ text: "La Cara", classes: ["Investigator", "Psionico"] },
			{ text: "El Protegido", classes: ["Binder","Commoner","Gadgeteer"] },
            { text: "El Malvado", classes: ["Illrigger","Necromancer"] }
        ]
    }
    ];

    quizButton.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        tierListContainer.classList.add("hidden");
        spellbookContainer.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        exitQuiz.classList.remove("hidden");
        if (quizAudio) {
            quizAudio.currentTime = 0;
            quizAudio.play().catch(err => console.log("Audio playback failed:", err));
        }
        startQuiz();
    });

    function startQuiz() {
        currentQuestionIndex = 0;
        answers = [];

        const fixed = quizQuestions.filter(q => q.fixed);
        const notFixed = quizQuestions.filter(q => !q.fixed);
        shuffleArray(notFixed);
        shuffledQuestions = [...notFixed, ...fixed]; // Use the shuffled list

        quizResult.innerHTML = "";
        showQuestion();

        quizBar.max = shuffledQuestions.length; // Use shuffled length
        quizBar.value = 0;
        quizRemaining.textContent = `${shuffledQuestions.length} preguntas restantes`;
        quizProgress.classList.remove('hidden'); // Show progress bar
    }

    function updateProgress(currentIndex) {
        quizBar.value = currentIndex;
        quizRemaining.textContent = `${shuffledQuestions.length - currentIndex} preguntas restantes`;
    }

    function showQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showResult(); // Should not happen if selectOption logic is correct, but safe fallback
            return;
        }
        const q = shuffledQuestions[currentQuestionIndex];
        quizQuestion.textContent = q.question;
        quizOptions.innerHTML = "";

        shuffleArray(q.options).forEach((opt) => { // Shuffle options as well
            const btn = document.createElement("button");
            btn.textContent = opt.text;
            btn.addEventListener("click", () => selectOption(btn, opt.classes));
            quizOptions.appendChild(btn);
        });

        backButton.classList.toggle("hidden", currentQuestionIndex === 0);
        exitQuiz.classList.remove("hidden");
    }

    function selectOption(button, classes) {
        // Apply fade-out effect
        quizOptions.querySelectorAll('button').forEach(btn => {
            if (btn === button) {
                // Optionally highlight the selected button briefly
                btn.style.backgroundColor = '#ffcc00'; // Highlight color
            }
             btn.disabled = true; // Disable all buttons
             btn.classList.add("fade-out");
        });

        answers[currentQuestionIndex] = classes;

        if (answerSound) {
            answerSound.currentTime = 0;
            answerSound.play().catch(e => console.log("Answer sound failed:", e));
        }
        updateProgress(currentQuestionIndex + 1);

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 400); // Wait for fade-out
    }

    backButton.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            answers.pop(); // Remove the last answer
            updateProgress(currentQuestionIndex); // Update progress back
            showQuestion();
        }
    });

    exitQuiz.addEventListener("click", () => {
        if (quizAudio) quizAudio.pause();
        quizContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
        quizResult.innerHTML = "";
        quizProgress.classList.add('hidden'); // Hide progress bar on exit
    });

    function showResult() {
        quizQuestion.textContent = "";
        quizOptions.innerHTML = "";
        if (quizAudio) quizAudio.pause();
        backButton.classList.add("hidden");
        exitQuiz.classList.remove("hidden");
        quizProgress.classList.add('hidden'); // Hide progress bar on results

        let score = {};
        answers.forEach(selected => {
            if (selected) { // Ensure answer exists (if user went back)
                selected.forEach(cls => {
                    score[cls] = (score[cls] || 0) + 1;
                });
            }
        });

        // Find the class(es) with the highest score
        let maxScore = 0;
        let topClasses = [];
        for (const cls in score) {
            if (score[cls] > maxScore) {
                maxScore = score[cls];
                topClasses = [cls];
            } else if (score[cls] === maxScore) {
                topClasses.push(cls);
            }
        }

        let resultHTML = "";
        if (topClasses.length === 0) {
            resultHTML = `<h3>No pudimos determinar tu clase. ¡Inténtalo de nuevo!</h3>`;
        } else if (topClasses.length === 1) {
            const result = topClasses[0];
            const finalClass = classes.find(c => c.name === result); // Use direct name comparison
             if (finalClass) {
                 resultHTML = `
                    <h3>¡Tu clase es ${finalClass.name}!</h3>
                    <p>${finalClass.description}</p>
                    <div style="margin-top:20px;">
                        <img src="${finalClass.image}" alt="${finalClass.name}" style="width:400px; max-width:90%; border-radius:10px;">
                    </div>
                     <br>
                     <a href="${finalClass.link}" target="_blank">Ver Clase Completa</a>
                 `;
             } else {
                 resultHTML = `<h3>Tu clase es: ${result}</h3><p>(Descripción no encontrada)</p>`;
             }
        } else {
             resultHTML = `<h3>¡Tienes afinidad con varias clases!</h3><p>Las clases con las que más encajas son:</p><ul>`;
             topClasses.forEach(clsName => {
                 const clsData = classes.find(c => c.name === clsName);
                 if(clsData) {
                    resultHTML += `<li><strong>${clsData.name}</strong> (<a href="${clsData.link}" target="_blank">Ver Clase</a>)</li>`;
                 } else {
                     resultHTML += `<li><strong>${clsName}</strong></li>`;
                 }
             });
             resultHTML += `</ul><p>¡Considera un personaje multiclase o elige la que más te llame!</p>`;
        }


        quizResult.innerHTML = resultHTML + `<br><button id="restartQuiz">Volver al inicio</button>`;

        launchConfetti(); // Confetti on results

        document.getElementById("restartQuiz").addEventListener("click", () => {
            quizContainer.classList.add("hidden");
            mainContainer.classList.remove("hidden");
            quizResult.innerHTML = "";
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    // --- TIER LIST --- (Keep your Tier List functions and listeners)


    
// Función para limpiar las filas del tier list y devolver items al banco
    function resetTierListItems() {
        tierRowsContainer.querySelectorAll('.tier-dropzone .tier-item').forEach(item => {
            // No es necesario añadirlo explícitamente al banco aquí,
            // porque populateItemBank lo vaciará y rellenará de todos modos.
            // Simplemente los quitamos de las filas.
             item.remove(); // Opcionalmente podrías moverlos al bank si populateItemBank no lo vaciara
        });
        // También vaciamos el banco por si acaso (aunque populateItemBank ya lo hace)
        itemBank.innerHTML = '';
    }

    tierListButton.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        quizContainer.classList.add("hidden");
        spellbookContainer.classList.add("hidden");
        hpCalculatorContainer.classList.add("hidden");
        tierListContainer.classList.remove("hidden");
        tierListTitle.textContent = "Crea tu Tier List de Clases";

        resetTierListItems(); // <--- LLAMA A LA FUNCIÓN DE LIMPIEZA AQUÍ
        populateItemBank('class'); // Llena el banco DESPUÉS de limpiar
    });

    subclassTierListButton.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        quizContainer.classList.add("hidden");
        spellbookContainer.classList.add("hidden");
        hpCalculatorContainer.classList.add("hidden");
        tierListContainer.classList.remove("hidden");
        tierListTitle.textContent = "Crea tu Tier List de Subclases";

        resetTierListItems(); // <--- LLAMA A LA FUNCIÓN DE LIMPIEZA AQUÍ
        populateItemBank('subclass'); // Llena el banco DESPUÉS de limpiar
    });

    exitTierListButton.addEventListener("click", () => {
        tierListContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
    });

    function addDragEventsToZone(zone) {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("drag-over");
        });
        zone.addEventListener("dragleave", () => {
            zone.classList.remove("drag-over");
        });
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("drag-over");
            if (draggedItem) {
                zone.appendChild(draggedItem);
            }
        });
    }

function populateItemBank(mode = 'class') { // Restore mode parameter
    itemBank.innerHTML = ''; // Clear first

    const itemsToCreate = []; // Array to hold items before appending

    if (mode === 'class') {
        itemBank.innerHTML = '';
        classes.forEach(cls => {
            itemsToCreate.push({
                id: `tier-item-class-${cls.name.replace(/[^a-zA-Z0-9]/g, '-')}`,
                name: cls.name,
                image: cls.image,
                alt: cls.name,
                isClass: true
            });
        });
    } else if (mode === 'subclass') {
        itemBank.innerHTML = '';
        classes.forEach(cls => {
            if (cls.subclasses && cls.subclasses.length > 0) {
                cls.subclasses.sort((a, b) => a.localeCompare(b)); // Sort subclasses
                cls.subclasses.forEach(subclass => {
                    itemsToCreate.push({
                        id: `tier-item-subclass-${cls.name.replace(/[^a-zA-Z0-9]/g, '-')}-${subclass.replace(/[^a-zA-Z0-9]/g, '-')}`,
                        name: subclass,
                        image: cls.image, // Use parent class image
                        alt: `${subclass} (${cls.name})`,
                        isClass: false
                    });
                });
            }
        });
         // Optional: Sort all subclasses alphabetically regardless of parent class
         // itemsToCreate.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Create and append elements from the array
    itemsToCreate.forEach(itemData => {
        const item = document.createElement("div");
        item.classList.add("tier-item");
        item.draggable = true;
        item.id = itemData.id;

        const img = document.createElement("img");
        img.src = itemData.image;
        img.alt = itemData.alt;

        const nameSpan = document.createElement("span");
        nameSpan.textContent = itemData.name;
        if (itemData.isClass) {
             nameSpan.style.fontWeight = 'bold'; // Bold for main classes
        }

        item.appendChild(img);
        item.appendChild(nameSpan);

        item.addEventListener("dragstart", () => {
            draggedItem = item;
            setTimeout(() => item.classList.add("dragging"), 0);
        });
        item.addEventListener("dragend", () => {
            if (draggedItem) {
                draggedItem.classList.remove("dragging");
            }
            draggedItem = null;
        });
        itemBank.appendChild(item);
    });


    // Add drag events to the bank itself after populating
    addDragEventsToZone(itemBank);
}

    

    addTierRowButton.addEventListener("click", () => {
        const currentRowCount = tierRowsContainer.children.length; // How many rows exist *before* adding
        let nextConfig;

        if (currentRowCount < defaultTierConfigs.length) {
            // Use the next predefined config
            nextConfig = defaultTierConfigs[currentRowCount];
        } else {
            // Use fallback if we ran out of predefined ones
            nextConfig = { label: fallbackLabel, color: fallbackColor };
        }

        const newRow = document.createElement("div");
        newRow.classList.add("tier-row");

        // Use the determined color and label
        newRow.innerHTML = `
            <div class="tier-label" contenteditable="true" style="background-color: ${nextConfig.color};">${nextConfig.label}</div>
            <button class="delete-tier-row-button">×</button>
            <div class="tier-dropzone"></div>
        `;

        const newDeleteButton = newRow.querySelector('.delete-tier-row-button');
        addDeleteEventToButton(newDeleteButton); // Make sure the delete button works
        const newDropzone = newRow.querySelector(".tier-dropzone");
        addDragEventsToZone(newDropzone); // Make sure drag/drop works

        tierRowsContainer.appendChild(newRow);
    });

    // --- NEW DOWNLOAD TIER LIST FUNCTIONALITY ---
    downloadTierListButton.addEventListener('click', () => {
        const elementToCapture = document.getElementById('tierListContainer'); // Capture the whole container
        if (!elementToCapture) {
            console.error("Tier list container not found!");
            return;
        }

        // Temporarily disable buttons and show loading state
        downloadTierListButton.disabled = true;
        downloadTierListButton.textContent = 'Generando...';
        exitTierListButton.disabled = true; // Disable exit while generating
        addTierRowButton.disabled = true; // Disable add while generating

        // Options for html2canvas (optional, but can help)
        const options = {
            scale: 2, // Increase resolution for better quality
            useCORS: true, // If images might come from other domains
            logging: false, // Turn off console logs from the library
             // Attempt to capture the background color
            backgroundColor: window.getComputedStyle(document.body).backgroundColor,
            // Scroll to the top before capturing to ensure everything is rendered
            scrollY: -window.scrollY,
            scrollX: -window.scrollX,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        };


        html2canvas(elementToCapture, options).then(canvas => {
            // Convert canvas to image data URL (PNG)
            const imageDataUrl = canvas.toDataURL('image/png');

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = imageDataUrl;
            link.download = 'tierlist.png'; // Set the filename

            // Programmatically click the link to trigger download
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up

             // Restore button state
            downloadTierListButton.disabled = false;
            downloadTierListButton.textContent = 'Descargar Tier List';
            exitTierListButton.disabled = false;
            addTierRowButton.disabled = false;


        }).catch(err => {
            console.error('Error generating tier list image:', err);
            alert('Hubo un error al generar la imagen.');
             // Restore button state even on error
            downloadTierListButton.disabled = false;
            downloadTierListButton.textContent = 'Descargar Tier List';
            exitTierListButton.disabled = false;
            addTierRowButton.disabled = false;
        });
    });

    function handleTierRowDelete(deleteButton) {
    const rowToDelete = deleteButton.closest('.tier-row');
    if (!rowToDelete) return;
    const itemsToMove = rowToDelete.querySelectorAll('.tier-item');

    // Check which mode we are in to populate correctly if needed later
    // Or simply always move back to the bank regardless of mode currently displayed
    itemsToMove.forEach(item => {
        itemBank.appendChild(item); // Move back to the currently populated bank
    });
    rowToDelete.remove();
}

    function addDeleteEventToButton(button) {
        button.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres borrar esta fila? Los items volverán al banco.')) {
                handleTierRowDelete(button);
            }
        });
    }

    // Initial setup for existing elements
    document.querySelectorAll(".tier-dropzone").forEach(zone => addDragEventsToZone(zone));
    document.querySelectorAll('.delete-tier-row-button').forEach(button => addDeleteEventToButton(button));

    // --- GRIMORIO ---

    spellbookButton.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        quizContainer.classList.add("hidden");
        tierListContainer.classList.add("hidden");
        spellbookContainer.classList.remove("hidden");
        if (!isSpellsLoaded) {
            loadSpells();
        } else {
             // If spells are loaded, ensure the correct list (all or favs) is shown
             if (showingFavorites) {
                 renderFavoriteSpells(); // Re-render in case favs changed
                 spellList.classList.add('hidden');
                 favoriteSpellListContainer.classList.remove('hidden');
             } else {
                 applyFiltersAndSort(); // Re-apply filters to main list
                 spellList.classList.remove('hidden');
                 favoriteSpellListContainer.classList.add('hidden');
             }
        }
    });

    exitSpellbookButton.addEventListener("click", () => {
        spellbookContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
    });

    toggleSpellViewButton.addEventListener('click', () => {
        isSpellViewSimplified = !isSpellViewSimplified;
        const currentList = showingFavorites ? favoriteSpellListContainer : spellList;
        currentList.classList.toggle('simplified-view', isSpellViewSimplified);
        toggleSpellViewButton.textContent = isSpellViewSimplified ? 'Vista Extendida' : 'Vista Simplificada';

        // Ensure details are hidden/shown correctly on toggle
        const allCards = currentList.querySelectorAll('.spell-card');
        allCards.forEach(card => {
            const details = card.querySelector('.spell-details');
            if (details) {
                 details.classList.toggle('hidden', isSpellViewSimplified);
            }
            // Reset expanded state when switching views
            card.classList.remove('expanded');
        });
    });

    // Consolidated Click Handler for Spellbook Area (Handles Favorites AND Simplified View)
    spellbookContainer.addEventListener('click', (event) => {
        const favButton = event.target.closest('.favorite-button');
        const spellCard = event.target.closest('.spell-card');

        if (favButton) { // Favorite button clicked
            event.stopPropagation(); // Prevent card expand/collapse if clicking star
            const spellName = favButton.dataset.spellName;
            if (spellName) {
                toggleFavorite(spellName, favButton);
            }
        } else if (isSpellViewSimplified && spellCard) { // Card clicked in simplified view
            // Make sure the click wasn't on the favorite button we just handled
             if (!event.target.closest('.favorite-button')) {
                const details = spellCard.querySelector('.spell-details');
                // Only toggle the clicked card
                spellCard.classList.toggle('expanded');
                if (details) {
                    details.classList.toggle('hidden');
                }
                 // Optional: Collapse other expanded cards in the same list
                 const parentList = spellCard.closest('#spellList, #favoriteSpellList');
                 if (parentList) {
                     parentList.querySelectorAll('.spell-card.expanded').forEach(otherCard => {
                         if (otherCard !== spellCard) {
                             otherCard.classList.remove('expanded');
                             const otherDetails = otherCard.querySelector('.spell-details');
                             if (otherDetails) otherDetails.classList.add('hidden');
                         }
                     });
                 }
             }
        }
    });

    toggleFavoritesButton.addEventListener('click', () => {
   showingFavorites = !showingFavorites;
        const spellbookDiv = document.getElementById('spellbookContainer');

        // 1. Ocultar AMBAS listas primero para evitar solapamientos
        spellList.classList.add('hidden');
        favoriteSpellListContainer.classList.add('hidden');

        // 2. Limpiar el contenido de la lista que NO se va a mostrar (opcional pero seguro)
        if (showingFavorites) {
             spellList.innerHTML = ''; // Limpia la lista principal si vamos a mostrar favoritos
        } else {
             favoriteSpellListContainer.innerHTML = ''; // Limpia favoritos si vamos a mostrar la principal
        }


        // 3. Renderizar y Mostrar la lista correcta
        if (showingFavorites) {
            console.log("mostrar Favoritos"); // Para depuración
            renderFavoriteSpells(); // Renderiza en favoriteSpellListContainer
            favoriteSpellListContainer.classList.remove('hidden'); // Muestra la lista de favoritos
            toggleFavoritesButton.textContent = 'Ver Todos';
            toggleFavoritesButton.style.backgroundColor = '#5bc0de'; // Azul
            spellbookDiv.classList.add('showing-favorites');
        } else {
            console.log("mostrar Todos los Hechizos"); // Para depuración
            applyFiltersAndSort(); // Renderiza en spellList
            spellList.classList.remove('hidden'); // Muestra la lista principal
            toggleFavoritesButton.textContent = 'Ver Favoritos';
            toggleFavoritesButton.style.backgroundColor = '#f0ad4e'; // Amarillo original
            spellbookDiv.classList.remove('showing-favorites');
        }

        // 4. Aplicar vista simplificada/extendida a la lista AHORA visible
        const visibleList = showingFavorites ? favoriteSpellListContainer : spellList;
        visibleList.classList.toggle('simplified-view', isSpellViewSimplified);
        // Asegurarse de que las tarjetas en la lista visible respeten el estado de la vista
        visibleList.querySelectorAll('.spell-card').forEach(card => {
            const details = card.querySelector('.spell-details');
            if (details) details.classList.toggle('hidden', isSpellViewSimplified);
            card.classList.remove('expanded'); // Colapsar todo al cambiar de lista
        });
    });


    // --- FAVORITES FUNCTIONS ---
    function loadFavorites() {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
            try {
                favoriteSpellsByCharacter = JSON.parse(storedFavorites);
                // Ensure there's always a default list if the loaded data is weird
                if (typeof favoriteSpellsByCharacter !== 'object' || favoriteSpellsByCharacter === null) {
                    favoriteSpellsByCharacter = { "Default": [] };
                } else if (!favoriteSpellsByCharacter["Default"]) {
                    favoriteSpellsByCharacter["Default"] = []; // Ensure Default exists
                }
            } catch (e) {
                console.error("Error parsing favorites:", e);
                favoriteSpellsByCharacter = { "Default": [] }; // Initialize with default on error
            }
        } else {
            favoriteSpellsByCharacter = { "Default": [] }; // Initialize with default if nothing stored
        }
        // Load last selected character or default
        currentCharacter = localStorage.getItem('dndSpellCurrentCharacter') || "Default";
        // Make sure the loaded character actually exists in our data
        if (!favoriteSpellsByCharacter[currentCharacter]) {
            currentCharacter = "Default";
            localStorage.setItem('dndSpellCurrentCharacter', currentCharacter); // Save corrected character
        }
    }

    function saveFavorites() {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteSpellsByCharacter));
        // Also save the currently selected character
        localStorage.setItem('dndSpellCurrentCharacter', currentCharacter);
    }

    function toggleFavorite(spellName, buttonElement) {
    // Ensure the current character's list exists
        if (!favoriteSpellsByCharacter[currentCharacter]) {
            favoriteSpellsByCharacter[currentCharacter] = [];
        }

        const currentList = favoriteSpellsByCharacter[currentCharacter];
        const index = currentList.indexOf(spellName);

        if (index > -1) {
            currentList.splice(index, 1); // Remove from current character's list
        } else {
            currentList.push(spellName); // Add to current character's list
        }
        // No need to reassign, splice/push modify the array in place
        // favoriteSpellsByCharacter[currentCharacter] = currentList; // This line is redundant

        saveFavorites();
        updateFavoriteButtonState(spellName); // Update ALL buttons for this spell

        // If currently showing favorites for the *current character*, re-render that list
        if (showingFavorites) {
            renderFavoriteSpells();
        }
    }

function renderFavoriteSpells() {
    favoriteSpellListContainer.innerHTML = ''; // Limpia el contenedor PRIMERO

    // CREA el título H3 aquí DENTRO de la función
    const titleElement = document.createElement('h3');
    titleElement.id = "favoriteListTitle"; // Puedes mantener el ID si lo necesitas
    titleElement.textContent = `Favoritos de ${currentCharacter}`;
    favoriteSpellListContainer.appendChild(titleElement); // Añade el título al contenedor vacío

    // El resto de la lógica para obtener y mostrar los hechizos
    const currentFavs = favoriteSpellsByCharacter[currentCharacter] || [];
    const favoriteSpellObjects = allSpells.filter(spell => currentFavs.includes(spell.Nombre));

    if (favoriteSpellObjects.length === 0) {
        // Añade el mensaje de "no hay favoritos" directamente
        const p = document.createElement('p');
        p.textContent = `No has marcado ningún hechizo como favorito para ${currentCharacter}.`;
        favoriteSpellListContainer.appendChild(p);
        favoriteSpellListContainer.classList.toggle('simplified-view', isSpellViewSimplified);
        return; // Sal de la función si no hay favoritos
    }

    // Aplica el ordenamiento (sin cambios aquí)
    const sortVal = sortSpells.value;
    if (sortVal === 'name') {
       favoriteSpellObjects.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
   } else if (sortVal === 'level') {
       favoriteSpellObjects.sort((a, b) => a.Nivel - b.Nivel || a.Nombre.localeCompare(b.Nombre));
   }

    // Renderiza los hechizos (sin cambios aquí, se añaden después del título)
    renderSpells(favoriteSpellObjects, favoriteSpellListContainer);

    // Asegúrate que la vista simplificada/extendida se aplique correctamente (sin cambios aquí)
    favoriteSpellListContainer.classList.toggle('simplified-view', isSpellViewSimplified);
    favoriteSpellListContainer.querySelectorAll('.spell-card .spell-details').forEach(details => {
        details.classList.toggle('hidden', isSpellViewSimplified);
    });
    favoriteSpellListContainer.querySelectorAll('.spell-card').forEach(card => card.classList.remove('expanded'));
}

    function updateFavoriteButtonState(spellName) {
    // Check if the spell is in the *current character's* list
    const isFav = (favoriteSpellsByCharacter[currentCharacter] || []).includes(spellName);

    // Select buttons in BOTH lists (no change here needed)
    const buttons = document.querySelectorAll(`#spellList .favorite-button[data-spell-name="${spellName}"], #favoriteSpellList .favorite-button[data-spell-name="${spellName}"]`);
    buttons.forEach(button => {
        button.textContent = isFav ? '★' : '☆';
        button.classList.toggle('favorited', isFav);
        button.title = isFav ? `Quitar de ${currentCharacter}` : `Añadir a ${currentCharacter}`; // Update title
    });
    }

    // --- SPELL LOADING AND RENDERING ---
    async function loadSpells() {
        try {
            const response = await fetch('spells.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allSpells = await response.json();
            isSpellsLoaded = true;
            loadFavorites(); // Load favorites AFTER spells are loaded
            populateCharacterSelect();
            
            // --- Populate Filters (Keep this logic) ---
            const classJsonMap = { "Bard": "bardo", "Cleric": "clerigo", "Druid": "druida", "Paladin": "paladin", "Ranger": "ranger", "Sorcerer": "sorcerer", "Warlock": "warlock", "Wizard": "wizard", "Artificer": "artificer", "Warmage": "warmage", "Witch": "witch", "Martyr": "martyrs", "Vessel": "The Vessel", "Necromancer": "Necromancer", "Magus": "Magus", "Investigator": "Investigator", "Shaman": "Shaman" }; // Added Shaman
            const damageTypes = [ { value: "acid", display: "Ácido" }, { value: "bludgeoning", display: "Contundente" }, { value: "cold", display: "Frío" }, { value: "fire", display: "Fuego" }, { value: "force", display: "Fuerza" }, { value: "lightning", display: "Rayo" }, { value: "necrotic", display: "Necrótico" }, { value: "piercing", display: "Perforante" }, { value: "poison", display: "Veneno" }, { value: "psychic", display: "Psíquico" }, { value: "radiant", display: "Radiante" }, { value: "slashing", display: "Cortante" }, { value: "thunder", display: "Trueno" } ];

            // Populate Damage Filter
            damageTypes.sort((a, b) => a.display.localeCompare(b.display));
            filterDamage.innerHTML = '<option value="all">Cualquier Tipo de Daño</option>'; // Reset
            damageTypes.forEach(type => {
                filterDamage.add(new Option(type.display, type.value));
            });

            // Populate Class Filter
            filterClass.innerHTML = '<option value="all">Todas las Clases</option>'; // Reset
            classes.forEach(cls => {
                const jsonKey = classJsonMap[cls.name];
                if (jsonKey && allSpells.length > 0 && allSpells[0].hasOwnProperty(jsonKey)) {
                     filterClass.add(new Option(cls.name, jsonKey));
                }
            });
             // Manually add Shaman if needed and exists in JSON
             if (allSpells.length > 0 && allSpells[0].hasOwnProperty("Shaman")) {
                filterClass.add(new Option("Chamán", "Shaman"));
             }

            // Populate School Filter
            const uniqueSchools = [...new Set(allSpells.map(spell => spell.Escuela))].filter(Boolean).sort();
            filterSchool.innerHTML = '<option value="all">Todas las Escuelas</option>'; // Reset
            uniqueSchools.forEach(school => {
                const displayName = school.charAt(0).toUpperCase() + school.slice(1);
                 filterSchool.add(new Option(displayName, school));
            });

            // Add Event Listeners to Filters
            const allFilters = [filterClass, filterLevel, filterType, filterSchool, filterRitual, filterDamage, sortSpells, searchSpell];
            allFilters.forEach(filter => {
                 // Use 'input' for search for real-time filtering
                const eventType = filter === searchSpell ? 'input' : 'change';
                filter.addEventListener(eventType, applyFiltersAndSort);
            });

            applyFiltersAndSort(); // Initial render

        } catch (error) {
            console.error("Error loading spells:", error);
            spellList.innerHTML = `<p style="color: red;">Error al cargar el libro de hechizos. ${error.message}</p>`;
        }
    }

    function applyFiltersAndSort() {
        if (!isSpellsLoaded) return; // Don't filter if spells aren't loaded

        let filteredSpells = [...allSpells];
        const classVal = filterClass.value;
        const levelVal = filterLevel.value;
        const typeVal = filterType.value;
        const ritualVal = filterRitual.value;
        const schoolVal = filterSchool.value;
        const damageVal = filterDamage.value;
        const searchVal = searchSpell.value.toLowerCase().trim();
        const sortVal = sortSpells.value;

        // Apply filters
        if (classVal !== 'all') filteredSpells = filteredSpells.filter(spell => spell[classVal] === 1);
        if (levelVal !== 'all') filteredSpells = filteredSpells.filter(spell => spell.Nivel == levelVal);
        if (typeVal === 'Arcano') filteredSpells = filteredSpells.filter(spell => spell.A === 1);
        else if (typeVal === 'Divino') filteredSpells = filteredSpells.filter(spell => spell.D === 1);
        else if (typeVal === 'Primal') filteredSpells = filteredSpells.filter(spell => spell.P === 1);
        if (schoolVal !== 'all') filteredSpells = filteredSpells.filter(spell => spell.Escuela === schoolVal);
        if (ritualVal === 'true') filteredSpells = filteredSpells.filter(spell => spell.ritual === "si");
        else if (ritualVal === 'false') filteredSpells = filteredSpells.filter(spell => spell.ritual === "no");
        if (damageVal !== 'all') {
            const searchTerm = damageVal + " damage";
            filteredSpells = filteredSpells.filter(spell => spell.efecto && spell.efecto.toLowerCase().includes(searchTerm));
        }
        if (searchVal) {
            filteredSpells = filteredSpells.filter(spell => spell.Nombre.toLowerCase().includes(searchVal));
        }

        // Apply sorting
        if (sortVal === 'name') {
            filteredSpells.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
        } else if (sortVal === 'level') {
            filteredSpells.sort((a, b) => a.Nivel - b.Nivel || a.Nombre.localeCompare(b.Nombre)); // Secondary sort by name
        }

        renderSpells(filteredSpells, spellList); // Render into the main list container
         // Ensure correct view state is applied after filtering/sorting
         spellList.classList.toggle('simplified-view', isSpellViewSimplified);
          spellList.querySelectorAll('.spell-card .spell-details').forEach(details => {
              details.classList.toggle('hidden', isSpellViewSimplified);
          });
          spellList.querySelectorAll('.spell-card').forEach(card => card.classList.remove('expanded'));

    }

    function renderSpells(spells, container = spellList) {
        container.innerHTML = ''; // Clear the target container

        const isEmpty = spells.length === 0;
        const isEmptyFavorites = isEmpty && container === favoriteSpellListContainer;
        const isEmptyMain = isEmpty && container === spellList;

        if (isEmptyFavorites) {
             container.innerHTML = '<h3>Mis Hechizos Favoritos</h3><p>No has marcado ningún hechizo como favorito.</p>';
        } else if (isEmptyMain) {
             container.innerHTML = '<p>No se encontraron hechizos con esos filtros.</p>';
        }

        if(isEmpty) {
             // Still apply view class for consistency if user switches views later
            container.classList.toggle('simplified-view', isSpellViewSimplified);
            return; // Don't render cards if empty
        }

        // Add title back if it's the favorite list and not empty
        if (container === favoriteSpellListContainer) {
             container.innerHTML = '<h3>Mis Hechizos Favoritos</h3>';
        }

        const classDisplayMap = { "bardo": "Bardo", "clerigo": "Clérigo", "druida": "Druida", "paladin": "Paladín", "ranger": "Ranger", "sorcerer": "Hechicero", "warlock": "Brujo", "wizard": "Mago", "artificer": "Artificero", "warmage": "Mago de Guerra", "witch": "Bruja", "martyrs": "Mártir", "The Vessel": "Vessel", "Necromancer": "Nigromante", "Magus": "Magus", "Investigator": "Investigador", "Shaman": "Chamán" };
        const castingTimeMap = { "action": "1 Acción", "bonus action": "1 Acción Bonus", "reaction": "1 Reacción", "1 minute": "1 Minuto", "10 minutes": "10 Minutos", "1 hour": "1 Hora", "8 hours": "8 Horas", "12 hours": "12 Horas", "24 hours": "24 Horas" };

        spells.forEach(spell => {
            const spellCard = document.createElement('div');
            spellCard.className = 'spell-card';

            let magicTypes = [];
            if (spell.A === 1) magicTypes.push('Arcano');
            if (spell.D === 1) magicTypes.push('Divino');
            if (spell.P === 1) magicTypes.push('Primal');
            const typeString = magicTypes.join(', ') || 'N/A';

            let components = [];
            if (spell.verbal === "si") components.push('V');
            if (spell.somatico === "si") components.push('S');
            if (spell.material === "si") components.push('M');
            const compString = components.join(', ');

            let spellClasses = [];
            for (const key in classDisplayMap) {
                if (spell[key] === 1) spellClasses.push(classDisplayMap[key]);
            }
            const classString = spellClasses.join(', ') || 'N/A';

            const originalCastingTime = spell["Casting time"] || "N/A";
            const translatedCastingTime = castingTimeMap[originalCastingTime.toLowerCase()] || originalCastingTime;

            const isFav = favoriteSpells.includes(spell.Nombre);
            const detailsHiddenClass = isSpellViewSimplified ? 'hidden' : '';

            // Separate name and details for simplified view toggle
            spellCard.innerHTML = `
                <h4 class="spell-name">${spell.Nombre}</h4>
                <div class="spell-details ${detailsHiddenClass}">
                    <p class="spell-meta">
                        Nivel ${spell.Nivel} (${spell.Escuela || 'N/A'})
                        ${spell.ritual === "si" ? ' (Ritual)' : ''}
                    </p>
                    <p class="spell-meta">
                    <p><strong>Tiempo:</strong> ${translatedCastingTime} </p>
                    <p><strong>Rango:</strong> ${spell.Range || 'N/A'}</p>
                    <p><strong>Duración:</strong> ${spell.duracion || 'N/A'} </p>
                    </p>
                    <p class="spell-meta">
                        <strong>Componentes:</strong> ${compString}
                        ${spell.material === "si" && spell["descripcion material"] ? ` (${spell["descripcion material"]})` : ''}
                    </p>
                    <p class="spell-description">${spell.efecto || 'Sin descripción.'}</p>
                    ${spell["level alto"] ? `<p class="spell-description"><strong>A mayor nivel:</strong> ${spell["level alto"]}</p>` : ''}
                    <p class="spell-type">Tipo: ${typeString}</p>
                    <p class="spell-classes">Clases: ${classString}</p>
                </div>
            `;

            const favButton = document.createElement('button');
            favButton.className = `favorite-button ${isFav ? 'favorited' : ''}`;
            favButton.dataset.spellName = spell.Nombre;
            favButton.textContent = isFav ? '★' : '☆';
            favButton.title = isFav ? 'Quitar de favoritos' : 'Añadir a favoritos';
            // No listener here - handled by delegation on spellbookContainer

            spellCard.appendChild(favButton);
            container.appendChild(spellCard);
        });

        // Ensure the container has the correct view class AFTER rendering
        container.classList.toggle('simplified-view', isSpellViewSimplified);
    }

    function populateCharacterSelect() {
    characterSelect.innerHTML = ''; // Clear existing options
    const characterNames = Object.keys(favoriteSpellsByCharacter).sort(); // Get and sort names

    characterNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        if (name === currentCharacter) {
            option.selected = true; // Select the current character
        }
        characterSelect.appendChild(option);
    });
     // Update optional display span
     if(currentCharacterNameSpan) currentCharacterNameSpan.textContent = `Actual: ${currentCharacter}`;
     // Enable/disable buttons based on selection
     renameCharacterButton.disabled = (currentCharacter === "Default");
     deleteCharacterButton.disabled = (currentCharacter === "Default");

}

function switchCharacter(newName) {
    if (favoriteSpellsByCharacter[newName]) {
        currentCharacter = newName;
        populateCharacterSelect(); // Update dropdown selection
        saveFavorites(); // Save the new current character selection
         // If viewing favorites, refresh the list
        if (showingFavorites) {
            renderFavoriteSpells();
        }
        // Update the state of favorite buttons on the main list
        applyFiltersAndSort();
    } else {
        console.error("Character not found:", newName);
    }
}

// --- Add Event Listeners for New Buttons ---
characterSelect.addEventListener('change', (e) => {
    switchCharacter(e.target.value);
});

addCharacterButton.addEventListener('click', () => {
    const newCharName = prompt("Ingresa el nombre del nuevo personaje:");
    if (newCharName && newCharName.trim() !== "") {
        const cleanName = newCharName.trim();
        if (favoriteSpellsByCharacter[cleanName]) {
            alert("Ya existe un personaje con ese nombre.");
        } else {
            favoriteSpellsByCharacter[cleanName] = []; // Add new character with empty list
            switchCharacter(cleanName); // Switch to the new character
            // saveFavorites() is called within switchCharacter
        }
    }
});

renameCharacterButton.addEventListener('click', () => {
    if (currentCharacter === "Default") {
        alert("No se puede renombrar el personaje 'Default'.");
        return;
    }
    const newName = prompt(`Ingresa el nuevo nombre para "${currentCharacter}":`, currentCharacter);
    if (newName && newName.trim() !== "" && newName.trim() !== currentCharacter) {
        const cleanNewName = newName.trim();
        if (favoriteSpellsByCharacter[cleanNewName]) {
            alert("Ya existe un personaje con ese nombre.");
        } else {
            // Copy list, delete old, add new, update current
            const oldList = favoriteSpellsByCharacter[currentCharacter];
            delete favoriteSpellsByCharacter[currentCharacter];
            favoriteSpellsByCharacter[cleanNewName] = oldList;
            currentCharacter = cleanNewName; // Update currentCharacter *after* modifying the object
            populateCharacterSelect(); // Refresh dropdown
            saveFavorites(); // Save changes
             // Update favorite list title if showing favorites
            if (showingFavorites) {
               favoriteListTitle.textContent = `Favoritos de ${currentCharacter}`;
            }
        }
    }
});

deleteCharacterButton.addEventListener('click', () => {
    if (currentCharacter === "Default") {
        alert("No se puede borrar el personaje 'Default'.");
        return;
    }
    if (confirm(`¿Estás seguro que quieres borrar al personaje "${currentCharacter}" y todos sus favoritos?`)) {
        delete favoriteSpellsByCharacter[currentCharacter];
        currentCharacter = "Default"; // Revert to default
        populateCharacterSelect(); // Refresh dropdown
        saveFavorites(); // Save changes
         // If viewing favorites, switch view to default character's list
        if (showingFavorites) {
             renderFavoriteSpells();
        } else {
             // Refresh main list to update button tooltips potentially
             applyFiltersAndSort();
        }

    }
});

// --- NEW HP CALCULATOR LISTENERS ---
hpCalculatorButton.addEventListener("click", () => {
    mainContainer.classList.add("hidden");
    quizContainer.classList.add("hidden");
    tierListContainer.classList.add("hidden");
    spellbookContainer.classList.add("hidden");
    // Hide other specific containers if they exist (like character sheet)
    document.getElementById("characterSheetContainer")?.classList.add("hidden");

    hpCalculatorContainer.classList.remove("hidden");
    populateHpClassSelect(); // Ensure dropdown is filled
    calculateAndDisplayHp(); // Calculate on open
});

// Remove the specific calculate button listener
// calculateHpButton.addEventListener("click", calculateAndDisplayHp); <-- DELETE THIS LINE

closeHpCalculator.addEventListener("click", () => {
    hpCalculatorContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden"); // Show the main starting content
});

// Add listeners to all inputs for real-time calculation
hpLevelInput.addEventListener('input', calculateAndDisplayHp);
hpClassSelect.addEventListener('change', calculateAndDisplayHp);
hpConModifier.addEventListener('input', calculateAndDisplayHp);
hpIsHillDwarf.addEventListener('change', calculateAndDisplayHp);
hpHasTough.addEventListener('change', calculateAndDisplayHp);
hpOtherBonus.addEventListener('input', calculateAndDisplayHp);

    closeHpCalculator.addEventListener("click", () => {
        hpCalculatorContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden"); // Show the main starting content
    });

    // --- INITIALIZATION ---
    populateHpClassSelect(); // Populate HP class select on initial load

});