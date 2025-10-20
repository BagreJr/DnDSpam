

document.addEventListener("DOMContentLoaded", () => {
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

    // --- NUEVAS VARIABLES PARA EL GRIMORIO ---
    const spellbookButton = document.getElementById("spellbookButton");
    const spellbookContainer = document.getElementById("spellbookContainer");
    const exitSpellbookButton = document.getElementById("exitSpellbookButton");
    const spellList = document.getElementById("spellList");
	const searchSpell = document.getElementById("searchSpell");
	
    // Filtros
    const filterClass = document.getElementById("filterClass");
    const filterLevel = document.getElementById("filterLevel");
    const filterType = document.getElementById("filterType");
	const filterSchool = document.getElementById("filterSchool");
    const filterRitual = document.getElementById("filterRitual");
	const filterDamage = document.getElementById("filterDamage");
    const sortSpells = document.getElementById("sortSpells");

    let allSpells = []; // Aquí guardaremos los 900+ hechizos
    let isSpellsLoaded = false; // Para cargarlos solo una vez
    // Lista de clases con imágenes y descripciones
    const classes = [
{ name: "Alchemist", image: "images/alchemist.webp", description: "Un genio de las ciencias mágicas y la creación de pociones y elixires.", link: "https://homebrewery.naturalcrit.com/share/km9PgnczNSRA", subclasses: ["Amorist", "Apothecary", "Dynamo Engineer", "Ionizer", "Mad Bomber", "Mutagenist", "Ooze Rancher", "Pigmentist", "Polymorphist", "Resonator", "Venomsmith", "Xenoalchemist"] },
{ name: "Artificer", image: "images/artificer.webp", description: "Maestros de la magia y la tecnología, que crean artefactos mágicos y construcciones complejas.", link: "https://homebrewery.naturalcrit.com/share/XlnxbXPJwSb_", subclasses: ["Aeronaut", "Agent", "Alchemist", "Archivist", "Armorer", "Battle Smith", "Biomancer", "Chronothief", "Composer", "Dungeoneer", "Enhanced", "Forgewright", "Machinist", "Mechanic", "Pilot", "Puppeteer", "Reanimator", "Venomist", "Wandslinger"] },
{ name: "Barbarian", image: "images/barbarian.webp", description: "Guerreros primitivos que canalizan su furia en combate, capaces de resistir grandes daños y desatar su fuerza bruta.", link: "https://homebrewery.naturalcrit.com/share/EMNC8JdcJ-I1", subclasses: ["Path of the Ancestral Guardian", "Path of the Battlerager", "Path of the Beast", "Path of the Berserker", "Path of the Brute", "Path of the Burning Rage", "Path of the Champion", "Path of the Deep", "Path of the Devourer", "Path of the Dreadnought", "Path of the Drifter", "Path of the Favored", "Path of the Fin", "Path of the Kaiju", "Path of Heavy Metal", "Path of the Inferno", "Path of the Juggernaut", "Path of the Muscle Wizard", "Path of the Lycan", "Path of the Mutant", "Path of the Reaver", "Path of the Storm Herald", "Path of Terror", "Path of the Titan", "Path of the Totem Warrior", "Path of Tranquility", "Path of the Warden", "Path of the Wrecker", "Path of Wild Magic", "Path of the World Tree", "Path of the Zealot"] },
{ name: "Bard", image: "images/bard.webp", description: "Músicos encantadores y maestros de la magia, cuya música inspira y controla la magia.", link: "https://homebrewery.naturalcrit.com/share/nqImfN7DQmo8", subclasses: ["College of Birdsong", "College of Blade Conductors", "College of Cantors", "College of Chance", "College of Chaos", "College of Command", "College of Creation", "College of Crossroads", "College of Cyberwave", "College of Drama", "College of Eloquence", "College of Eulogies", "College of Fine Art", "College of Fools", "College of Glamour", "College of Glory", "College of Graffiti", "College of Jesters", "College of Lore", "College of the Mad God", "College of Many Faces", "College of Masks", "College of Radiance", "College of Revelry", "College of Romance", "College of the Spheres", "College of Swords", "College of the Vanguard", "College of Valor", "College of Whispers", "College of the Wilds"] },
{ name: "Binder", image: "images/binder.webp", description: "Mortal que establece pactos con entidades sobrenaturales para obtener poder.", link: "https://homebrewery.naturalcrit.com/share/Rq5NbuBPOkD5", subclasses: ["The Avatarists", "Brotherhood of Ascetics", "Church of Gyx", "Ishtar’s Faithful", "Legion’s Lodge", "Order of Crimson Binding", "Society of the Stygian Seal"] },
{ name: "Blood Hunter", image: "images/blood_hunter.webp", description: "Cazadores que emplean magia oscura y sacrificios de sangre para cazar monstruos y defender a los inocentes.", link: "https://homebrewery.naturalcrit.com/share/zB7dBsU3NoaA", subclasses: ["Order of Alchemists", "Order of Ascension",  "Order of Dawnbringer", "Order of Heretics", "Order of Ichor", "Order of the Pale Moon", "Order of Reapers", "Order of Salt & Iron", "Order of Sorcery", "Order of Transference", "Order of Undying Thirst", "Order of Witch Knights"] },
{ name: "Captain", image: "images/captain.webp", description: "Un líder carismático y estratega, que guía a sus compañeros con autoridad y determinación.", link: "https://homebrewery.naturalcrit.com/share/4_dADwfpFgLl", subclasses: ["Demon Banner", "Dragon Banner", "Eagle Banner", "Jolly Roger Banner", "Lion Banner", "Ram Banner", "Raven Banner", "Sport Banner", "Star Wolf Banner", "Treant Banner", "Turtle Banner"] },
{ name: "Cleric", image: "images/cleric.webp", description: "Canalizan el poder de los dioses para sanar, proteger y combatir las fuerzas del mal.", link: "https://homebrewery.naturalcrit.com/share/ypjQ6cODzLs3", subclasses: ["Arcana Domain", "Beauty Domain", "Blood Domain", "Cataclysm Domain", "Chaos Domain", "Death Domain", "Destruction Domain", "Evolution Domain", "Exorcist Domain", "Forge Domain", "Grave Domain", "Hearth Domain", "Knowledge Domain", "Life Domain", "Light Domain", "Luck Domain", "Madness Domain", "Mysticism Domain", "Nature Domain", "Occult Domain", "Order Domain", "Peace Domain", "Peril Domain", "Pestilence Domain", "Poverty Domain", "Rum Domain", "Shadow Domain", "Shrine Warden Domain", "Steel Domain", "Sun Above Domain", "Tempest Domain", "Thieves Domain", "Time Domain", "Travel Domain", "Trickery Domain", "Twilight Domain", "Void Domain", "War Domain", "Wealth Domain"] },
{ name: "Commoner", image: "images/commoner.webp", description: "Aunque simple, el potencial de un humano es infinito. Con humildad, resistencia y una voluntad inquebrantable, son capaces de enfrentar desafíos que parecerían fuera de su alcance.", link: "https://homebrewery.naturalcrit.com/share/OJJEj04Qu-zG", subclasses: ["Farmer", "Innkeeper", "Laborer", "Old Timer", "Town Guard"] },
{ name: "Craftsman", image: "images/craftsman.webp", description: "Experto en la creación de objetos mágicos y artefactos con fines prácticos o poderosos.", link: "https://homebrewery.naturalcrit.com/share/MnBaupC_WVWe", subclasses: ["Arcane Maesters’ Guild", "Armigers’ Guild", "Bladeworkers’ Guild", "Calibaron’s Guild", "Clockworkers’ Guild", "Courtiers’ Guild", "Forgeknight’s Guild", "Liveoaks’ Guild", "Luminaries’ Guild", "Mechanauts’ Guild", "Scrappers’ Guild", "Thunderlords’ Guild", "Trappers’ Guild"] },
{ name: "Druid", image: "images/druid.webp", description: "Guardianes de la naturaleza con habilidades para transformarse en animales y controlar los elementos naturales.", link: "https://homebrewery.naturalcrit.com/share/e3kR64Zn-Qin", subclasses: ["Circle of the Ancients", "Circle of the City", "Circle of Configuration", "Circle of the Deep", "Circle of the Depths", "Circle of Disaster", "Circle of Dreams", "Circle of the Fist", "Circle of Guardians", "Circle of the Harvest", "Circle of Land", "Circle of the Moon", "Circle of the Obelisk", "Circle of Pollen", "Circle of the Self Sacrifice", "Circle of the Shepherd", "Circle of Spores", "Circle of the Sower", "Circle of Stars", "Circle of Stones", "Circle of the Tempest", "Circle of the Tides", "Circle of Vermin", "Circle of the Yokai", "Circle of Wildfire", "Circle of the Wild Gift", "Circle of the Wyrm", "Primal Circle"] },
{ name: "Fighter", image: "images/fighter.webp", description: "Guerrero experto en el combate físico, con habilidades para dominar cualquier tipo de arma.", link: "https://homebrewery.naturalcrit.com/share/ObJ7sUAx1Ggn", subclasses: ["Arcane Archer", "Arcane Knight", "Bestiarius", "Bone Knight", "Brawler", "Cavalier", "Celestial Lancer", "Champion", "Commander", "Corsair", "Crusader", "Dynamic Duelist", "Dungeoneer", "Echo Knight", "Guardian", "Guerrilla", "Mage Hand Magus", "Mandalorian", "Marksman", "Master at Arms", "Master of Hounds", "Mutant Knight", "Mystic Warrior", "Quartermaster", "Rations", "Opportunists", "Pseudomorph", "Renegade", "Firearm Upgrades", "Relentless Hunter", "Rune Knight", "Samurai", "Stonecrusher", "Swordsage", "Tinker Knight", "Schematics", "Witch Knight"] },
{ name: "Gadgeteer", image: "images/gadgeteer.webp", description: "Inventor que utiliza una combinación de ingenio y dispositivos mecánicos para resolver cualquier problema.", link: "https://homebrewery.naturalcrit.com/share/1pBjFWWMDUME", subclasses: ["Drone Jockey", "Futurist", "Hardlight Architect", "Mastermaker", "Nanoengineer"] },
{ name: "Gunslinger", image: "images/gunslinger.webp", description: "Tirador experto con pistolas, rápido en el combate y letal con cada disparo.", link: "https://homebrewery.naturalcrit.com/share/K2ZWpZUCPF_Q", subclasses: ["Big Game Hunter", "Covert Operative", "Gun Tank", "Gun-Ko Master", "Gundead", "Grenadier", "High Roller", "Holy Marksman", "Janissary", "Laserist", "League of Shadows", "Lucky Son of a Bitch", "Musketeer", "Pistolero", "Sharpshooter", "Space Cowboy", "Spellslinger", "Storm Gunner", "Trick Shot", "Twice-Damned", "White Hat"] },
{ name: "Illrigger", image: "images/illriger.webp", description: "Un individuo que forja contratos oscuros con entidades infernales para obtener poder a cambio de su alma.", link: "https://homebrewery.naturalcrit.com/share/YkHqcotv-KCQ", subclasses: ["Architect of Ruin", "Black Menagerist", "Brass Banker", "Cardinals of Inferno", "Despotic Ruler", "Fatebreaker", "Fiendish Marksman", "Hellspeaker", "Nails of Odium", "Painkiller", "Queen’s Champion", "Radiant Sentinel", "Sanguine Knight", "Shadowmaster", "Forsaken"] },
{ name: "Investigator", image: "images/investigador.webp", description: "Profesional en resolver misterios y desentrañar secretos, con una mente aguda y habilidades excepcionales para el rastreo.", link: "https://homebrewery.naturalcrit.com/share/Vdd_tiCoHg9d", subclasses: ["Antiquarian", "Archivist", "Conspiracy Theorist", "Containment Specialist", "Contractor", "Cursed Energy Specialist", "Decommissioner", "Detective", "Exterminator", "Infernal Agent", "Inquisitor", "Kid Sleuth", "Medium", "Occultist", "Spy", "Time Operative", "Witch Hunter"] },
{ name: "Magus", image: "images/magus.webp", description: "Talentoso en el uso de magia mediante el dominio de espadas y hechizos combinados.", link: "https://homebrewery.naturalcrit.com/share/ghElGwEE2Io9", subclasses: ["Order of Arcanists", "Order of Arcane Archers", "Order of Armorers", "Order of the Aurora", "Order of Blades", "Order of Blade Dancers", "Order of Conduits", "Order of Evolution", "Order of Hexblades", "Order of the Occultism", "Order of Scales", "Order of Spellswords", "Order of Sentinels", "Order of Spellbreakers", "Order of Travelers"] },
{ name: "Martyr", image: "images/martyr.webp", description: "Héroe que sacrifica su propio bienestar por el bien de los demás, con un fuerte sentido del sacrificio y la redención.", link: "https://homebrewery.naturalcrit.com/share/o8FUKqZUgoT7", subclasses: ["Burden of Anonymity", "Burden of Ascension", "Burden of Atonement", "Burden of Calamity", "Burden of Discord", "Burden of the End", "Burden of Fame", "Burden of Humanity", "Burden of Levity", "Burden of Mercy", "Burden of Rebirth", "Burden of Revolution", "Burden of Truth", "Burden of Tyranny", "Burden of Uncharted"] },
{ name: "Monk", image: "images/monk.webp", description: "Experto en artes marciales y en la meditación, que canaliza su energía interior para mejorar sus habilidades físicas y espirituales.", link: "https://homebrewery.naturalcrit.com/share/guTke3mXD9Nk", subclasses: ["Way of the Astral Self", "Way of the Ascendant Dragon", "Way of the Boulder", "Way of the Bow", "Way of the Brawler", "Way of the Dodo", "Way of the Drunken Fist", "Way of the Eight Gates", "Way of the Feather", "Way of Ferocity", "Way of the Flagellant", "Way of the Flowing River", "Way of the Four Fists", "Way of Gravity", "Way of the Hurricane", "Way of the Mask", "Way of the Open Hand", "Way of Radiance", "Way of the Reaper", "Way of the Sacred Inks", "Way of the Shadow Arts", "Way of Street Fighting", "Way of the Vigilante", "Way of the Void", "Way of the Warped", "Way of the Wu Jen", "Way of the Wuxia"] },
{ name: "Necromancer", image: "images/necromancer.webp", description: "Ente que manipula las fuerzas de la muerte y controla a los muertos para servir a sus fines oscuros.", link: "https://homebrewery.naturalcrit.com/share/yrujLNR8NHGX", subclasses: ["Black Rider", "Blood Ascendent", "Bow of the Grave", "Corpse Florist", "Crone", "Divine Soul", "Dead Mist Acolyte", "Death Knight", "Harbinger of Darkness", "Necrodancer", "Overlord", "Pale Master", "Pharaoh", "Plague Lord", "Reanimator", "Reaper", "Toymaker"] },
{ name: "Paladin", image: "images/paladin.webp", description: "Caballero sagrado que combate el mal con el poder divino y un fuerte código de honor.", link: "https://homebrewery.naturalcrit.com/share/QL_7_qGcSaio", subclasses: ["Oath of the Ancients", "Oath of Beauty", "Oath of the Blade", "Oath of the Bound", "Oath of Conquest", "Oath of the Corsair", "Oath of the Crown", "Oath of Devotion", "Oath of the Doomforged", "Oath of the Eternal Dragon", "Oath of Eternal Night", "Oath of the Exorcist", "Oath of the Forge", "Oath of Glory", "Oath of Heresy", "Oath of Inquisition", "Oath of Liberty", "Oath of Mysticism", "Oath of Preservation", "Oath of Prosperity", "Oath of Redemption", "Oath of Revelry", "Oath of the Sepulcher", "Oath of the Shield", "Oath of Storms", "Oath of the Sun", "Oath of Vengeance", "Oath of the Watchers", "Oath of Winter", "Oath of the Yojimbo", "The Oathless", "Oathbreaker"] },
{ name: "Psionico", image: "images/psion.webp", description: "La realidad se desvía hacia donde van tus pensamientos. Los psiónicos canalizan la voluntad pura, transformando el pensamiento, la emoción y la memoria en fuerza psíquica pura.", link: "https://homebrewery.naturalcrit.com/share/MoGx_lZZ32mC", subclasses: ["Awakened Mind", "Consuming Mind", "Elemental Mind", "Shaper’s Mind", "Transcended Mind", "Unleashed Mind","Wandering Mind"] },
{ name: "Ranger", image: "images/ranger.webp", description: "Explorador experto en el uso de arcos y el sigilo, con un vínculo profundo con la naturaleza.", link: "https://homebrewery.naturalcrit.com/share/usNwevklFcoN", subclasses: ["Beastborne", "Beast Master", "Bounty Hunter", "Buccaneer", "Deadeye Sniper", "Drakewarden", "Druidic Guardian", "Dunestrider", "Fey Wanderer", "Freerunner", "Gloom Stalker", "Grim Warden", "Horizon Walker", "Highwayman", "Hunter", "Monster Slayer", "Nomad", "Reconnaissance Scout", "Ronin", "Skysworn", "Shadowbane", "Spiritbound", "Spellbreaker", "Stargazer", "Swarmkeeper", "Vigilante", "Wrangler"] },
{ name: "Rogue", image: "images/rogue.webp", description: "Experto en el sigilo, la evasión y las trampas, ideal para misiones que requieren astucia y agilidad.", link: "https://homebrewery.naturalcrit.com/share/TQg2QgZKbsDv", subclasses: ["Arachnoid Stalker", "Arcane Trickster", "Angler", "Assassin", "Bloodknife", "Chameleon", "Charlatan", "Duskcaller", "Enforcer", "Daredevil", "Duelist", "Falconer", "Gambler", "Grifter", "Infiltrator", "Inquisitive", "Jumper", "Justicar", "Magehunter", "Mastermind", "Phantom", "Ruffian", "Saboteur", "Scoundrel", "Scout", "Socialite", "Soulknife", "Shadow Master", "Skinchanger", "Surgeon", "Swashbuckler", "Tamaya", "Temporal Trickster", "Thief", "Titan Slayer"] },
{ name: "Savant", image: "images/savant.webp", description: "Conocedor profundo de las artes arcanas o la ciencia, con habilidades excepcionales para el estudio y la enseñanza.", link: "https://homebrewery.naturalcrit.com/share/3Lw7KbWJnUsy", subclasses: ["Archaeologist", "Culinarian", "Engineer", "Investigator", "Naturalist", "Mentors", "Occultist", "Orator", "Philosopher", "Physician", "Rune Scribe", "Tactician", "Tinker", "Virtuoso", "Voyager"] },
{ name: "Sorcerer", image: "images/sorcerer.webp", description: "Un hechicero que canaliza su magia a través de su linaje o conexión con fuerzas sobrenaturales.", link: "https://homebrewery.naturalcrit.com/share/NOEmC8CLMj9P", subclasses: ["Aberrant Mind", "The Chained", "Clockwork Soul", "Divine Soul", "Divine Right", "Draconic Bloodline", "Emberheart", "Emotion Lord", "Faeblood", "Gifted One", "Greensinger", "Hellspawn", "Jinx", "Lunar Sorcery", "Mirrorkin", "Mutagenic Bloodline", "Nanite Host", "Oozemaster", "Radiation Freak", "Reincarnated Hero", "Shadow", "Spiritborn", "Spirit Caller", "Stoneblood", "Storm Sorcery", "Toon Magic", "Vampiric Soul", "Voidwielder", "Waveborn", "Wild Magic"] },
{ name: "Vagabond", image: "images/vagabond.webp", description: "Exiliados, perseguidos o simplemente inquietos que viven en movimiento. El camino es su hogar y la desesperación, su mayor maestra.", link: "https://homebrewery.naturalcrit.com/share/7LePIfQ0CLhu", subclasses: ["Adrenaline Junkie", "Brigand", "Experiment X", "Feylost", "Gourmand", "Houndmaster","Justicar","Knight Errant","Mage Brand","Mindblade","Plague Doctor","Pugilist","Rōnin","Troubadour"] },
{ name: "Vessel", image: "images/vessel.webp", description: "Un ser marcado por una conexión especial con espíritus, otorgándole poderes místicos y transformadores.", link: "https://homebrewery.naturalcrit.com/share/vBYpvFeHFy6v", subclasses: ["The Ancient Wyrms", "The Ascended", "The Beyond", "The Cataclysm", "The Cursed", "The Fallen", "The Formless", "The Mushroom Prince", "The Mythic Hero", "The Parasite", "The Overgrown", "The Titan", "The Trickster", "The Undying"] },
{ name: "Warden", image: "images/warden.webp", description: "Defensores de tierras y territorios, especializados en la protección de lo que es sagrado o valioso.", link: "https://homebrewery.naturalcrit.com/share/90VpGRQPU-Cn", subclasses: ["Bloodwrath Guardian", "Carrion King", "Eye of Twilight", "Fey Trailblazer", "Godsworn", "Grey Watchman", "Hellkeeper", "Iceheart Bastion", "Lawbringer", "Loreseeker", "Nightgaunt", "Soulblood Shaman", "Stoneheart Defender", "Storm Sentinel", "Verdant Protector", "Witchbane Hunter"] },
{ name: "Warlock", image: "images/warlock.webp", description: "Ser que obtiene poder mediante pactos con entidades sobrenaturales a cambio de favores y lealtad.", link: "https://homebrewery.naturalcrit.com/share/kLwQFqpQ7pei", subclasses: ["The Alabaster", "The Archfey", "The Archmage", "The Celestial", "The Coven", "The Dead Mists", "The Elder Sphinx", "The Fathomless", "The Fiend", "The Future You", "The Genie", "The GM", "The Great Old One", "The Great Wyrm", "The Hexblade", "The King", "The Legacy", "The Legendary Hero", "The Magician", "The Mummy Lord", "The Primeval Growth", "The Shinigami", "The Singularity", "The Star", "The Swarm", "The Symbiont", "The Titan", "The Unblinking", "The Undead", "The Undying", "The Wild Hunt"] },
{ name: "Warlord", image: "images/warlord.webp", description: "Señor de la guerra, un líder militar que dirige a sus tropas con astucia y habilidad estratégica en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/3IUIglJ_K-O4", subclasses: ["Academy of Chivalry", "Academy of Dawnbringer", "Academy of Dreadlords", "Academy of Ferocity", "Academy of Schemes", "Academy of Skalds", "Academy of Tactics"] },
{ name: "Warmage", image: "images/warmage.webp", description: "Estratega experto que domina un area de magia especializada para devastar a sus enemigos en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/rau8aywbKXzF", subclasses: ["House of Bishops", "House of Coalition Arcanist", "House of Darts", "House of Dice", "House of Go", "House of Kings", "House of Knights", "House of Queens", "House of Lancers", "House of Pawns", "House of Rooks", "House of Roulette"] },
{ name: "Witch", image: "images/witch.webp", description: "Una usuaria de la magia arcana que emplea encantamientos y maldiciones para manipular el destino.", link: "https://homebrewery.naturalcrit.com/share/cl5HbkIH2xFw", subclasses: ["Black Magic", "Blood Magic", "Blue Magic", "Duskcaller Magic", "Fragrant Magic", "Gingerbread Magic", "Green Magic", "Lunar Magic", "Purple Magic", "Red Magic", "Sky Magic", "Steel Magic", "Tea Magic", "Technicolor Magic", "White Magic"] },
{ name: "Wizard", image: "images/wizard.webp", description: "Erudito en el estudio y dominio de la magia arcana, capaz de lanzar poderosos hechizos y controlarla con precisión.", link: "https://homebrewery.naturalcrit.com/share/ymEiMM7-iT9H", subclasses: ["Familiar Master", "Magic Missile Mage", "Mystic Savant", "Order of Scribes", "School of Abjuration", "School of Automata", "School of Bladesinging", "School of Conjuration", "School of Chronomancy", "School of Divination", "School of Enchantment", "School of Evocation", "School of Gastronomy", "School of Graviturgy", "School of Hardlight", "School of Hexcraft", "School of Illusion", "School of Necromancy", "School of Metallurgy", "School of Somnomancy", "School of Theurgy", "School of Teleportation", "School of Transmutation", "School of War Magic", "School of Warp Watcher", "Shinobi"] }
    ];

    // Función para lanzar confetti
    function launchConfetti() {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    // Evento del botón para jugar
    button.addEventListener("click", () => {
        button.disabled = true;
        button.style.opacity = "0.5";
		
		quizButton.disabled = true;
		quizButton.style.opacity = "0.5";
		
        let shuffleCount = 25;
        let interval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * classes.length);
            classImage.src = classes[randomIndex].image;
            className.textContent = "? ? ?";
			classDescription.classList.add("hidden");
			subclassName.textContent = "";
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
            let finalClass = classes[Math.floor(Math.random() * classes.length)];
			let randomSubclass = finalClass.subclasses[Math.floor(Math.random() * finalClass.subclasses.length)];
			
            setTimeout(() => {
                classImage.src = finalClass.image;
                className.textContent = finalClass.name;
                classDescription.innerHTML = `Subclase: ${randomSubclass}<br> <br> ${finalClass.description} <br> <a href="${finalClass.link}" target="_blank">Más información de la clase</a>`;
                classDescription.classList.remove("hidden");
				subclassName.textContent = `Subclase: ${randomSubclass}`;
                launchConfetti();

                setTimeout(() => {
					if (subclassName) {
                        subclassName.classList.add("show-subclass");
                    }
                    button.disabled = false;
                    button.style.opacity = "1";
					quizButton.disabled = false;
                    quizButton.style.opacity = "1";
                }, 1500);
            }, 100);
        }, shuffleCount * 100);
    });
		// Galeria
    const galleryImages = document.querySelectorAll(".gallery img");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("imageCaption");
    const closeButton = document.getElementById("closeModal");

    let zoomLevel = 0;

    // Evento para abrir la imagen en el modal con su información
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            zoomLevel = 0;
            modalImage.src = img.src;
            showImage(currentIndex);
            // Extraer solo el nombre del archivo para comparar correctamente
            const imgFileName = img.src.split("/").pop();

            // Buscar la clase correspondiente en la lista
            const selectedClass = classes.find(cls => cls.image.endsWith(imgFileName));

            if (selectedClass) {
                caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description}<br><br>
                <a href="${selectedClass.link}" target="_blank">La Clase</a>`;
            } else {
                caption.innerHTML = "Información no disponible";
            }

            modal.style.display = "flex";
        });
    });

// Evento para hacer zoom en la imagen (alterna el estado)
    modalImage.addEventListener("click", (event) => {
        // Alterna la clase 'zoomed'
        modalImage.classList.toggle("zoomed");

        if (modalImage.classList.contains("zoomed")) {
            // Si acabamos de hacer zoom...
            zoomLevel = 1;
            // Calculamos la posición inicial del click para el primer zoom
            const rect = modalImage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            modalImage.style.setProperty("--zoom-x", `${x}%`);
            modalImage.style.setProperty("--zoom-y", `${y}%`);
        } else {
            // Si acabamos de quitar el zoom...
            zoomLevel = 0;
        }
    });

    // Evento para mover la "lupa" (NUEVO)
    modalImage.addEventListener("mousemove", (event) => {
        // Solo actualiza la posición si la imagen tiene zoom (zoomLevel es 1)
        if (zoomLevel === 1) {
            const rect = modalImage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            
            // Actualiza continuamente el punto de origen del zoom (la lupa)
            modalImage.style.setProperty("--zoom-x", `${x}%`);
            modalImage.style.setProperty("--zoom-y", `${y}%`);
        }
    });
	
    // Evento para cerrar el modal con la "X"
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalImage.classList.remove("zoomed");
    });

    // Cerrar el modal si se hace clic fuera de la imagen
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalImage.classList.remove("zoomed");
        }
    });
	
// Navegación
	// Variables para la navegación
	let currentIndex = 0;

	// Función para actualizar la imagen y el texto del modal
	function updateModalImage(index) {
		const selectedClass = classes[index];
		modalImage.src = selectedClass.image;
		caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description}<br><br>
			<a href="${selectedClass.link}" target="_blank">La Clase</a>`;
	}
	
	// Función para mostrar una imagen en el modal
    function showImage(index) {
        if (index < 0) index = classes.length - 1;
        if (index >= classes.length) index = 0;
        currentIndex = index;
        modalImage.src = classes[index].image;
        zoomLevel = 0;
        modalImage.classList.remove("zoomed");
				const selectedClass = classes[index];
		modalImage.src = selectedClass.image;
		caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description}<br><br>
			<a href="${selectedClass.link}" target="_blank">La Clase</a>`;
    }
	
	
	// Evento para abrir la imagen en el modal con flechas
	galleryImages.forEach((img, index) => {
		img.addEventListener("click", () => {
			zoomLevel = 0;
			currentIndex = index;
			showImage(currentIndex);
			updateModalImage(currentIndex);
			modal.style.display = "flex";
		});
	});

	// Evento para avanzar a la siguiente imagen
	document.getElementById("nextImage").addEventListener("click", () => {
		currentIndex = (currentIndex + 1) % classes.length;
		updateModalImage(currentIndex);
	});

	// Evento para retroceder a la imagen anterior
	document.getElementById("prevImage").addEventListener("click", () => {
		currentIndex = (currentIndex - 1 + classes.length) % classes.length;
		updateModalImage(currentIndex);
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
	
	
// ---- QUIZ ---- //


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
            { text: "Leo cada libro en busca de conocimiento oculto", classes: ["Wizard","Psion","Savant"] },
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
            { text: "Uso magia sutil para humillarlo sin que lo note", classes: ["Wizard","Warlock","Sorcerer","Witch","Psion"] },
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
            { text: "Lanzo un hechizo de luz para abrir camino", classes: ["Wizard","Sorcerer","Warmage","Psion"] },
            { text: "Subo a un árbol para ubicarme mejor", classes: ["Rogue","Monk"] },
            { text: "Grito pidiendo ayuda, seguro alguien escucha", classes: ["Commoner","Bard","Captain"] },
            { text: "Construyo un artefacto improvisado para orientarme", classes: ["Artificer","Craftsman","Gadgeteer","Alchemist"] },
            { text: "Me siento en calma, espero y dejo que la fe me guíe", classes: ["Cleric","Paladin","Martyr","Warden"] }
        ]
    },
    {
        question: "Un espíritu te ofrece conocimiento prohibido a cambio de tu memoria ¿Qué haces?",
        options: [
            { text: "Acepto, el conocimiento es más valioso que mi pasado", classes: ["Wizard","Psion","Warlock","Necromancer"] },
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
            { text: "Le robo los conjuros", classes: ["Wizard","Sorcerer","Warmage","Psion"] },
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
            { text: "Lanzo un hechizo para cambiar su apariencia", classes: ["Wizard","Sorcerer","Psion","Witch"] },
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
            { text: "Lanzo un hechizo para convertirlos en gatos", classes: ["Sorcerer","Psion","Witch"] },
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
            { text: "La clavo en una piedra para que este eternamente sola", classes: ["Wizard","Magus","Vessel","Psion"] }
        ]
    },
    {
        question: "Un niño te pide que le enseñes a ser héroe ¿Qué haces?",
        options: [
            { text: "Lo entreno a golpes, la vieja escuela", classes: ["Barbarian","Fighter","Ranger"] },
            { text: "Le enseño que el conocimiento es poder", classes: ["Wizard","Savant","Psion"] },
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
            { text: "Lanzo un hechizo para que olvide quién soy", classes: ["Wizard","Warlock","Witch","Psion"] },
            { text: "Lo contrato para que trabaje conmigo", classes: ["Illrigger","Captain","Warlord","Warden"] },
            { text: "Le mejoro la póliza y le cobro comisión", classes: ["Artificer","Craftsman","Alchemist","Gadgeteer"] }
        ]
    },
	    {
        question: "Encontras a un niño hambriento robando pan en el mercado. El guardia está a punto de arrestarlo. ¿Qué haces?",
        options: [
            { text: "Detengo al guardia.", classes: ["Paladin","Cleric","Martyr","Warden"] },
            { text: "Le enseño al niño a robar sin ser atrapado.", classes: ["Rogue","Vagabond","Investigator","Commoner"] },
            { text: "Uso magia para alterar la memoria del guardia y dejarlo libre.", classes: ["Wizard","Sorcerer","Psion","Warlock","Witch"] },
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
            { text: "Lo manipulo para que dedique el resto de su vida a reparar el daño hecho.", classes: ["Investigator","Psion","Craftsman","Gadgeteer"] }
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
            { text: "Me río del dilema.", classes: ["Witch","Vessel","Psion","Warmage"] }
        ]
    },
    {
        question: "Un demonio exige tributo de un pueblo pobre a cambio de no destruirlo. ¿Qué haces?",
        options: [
            { text: "Lucho contra el demonio aunque muera intentándolo.", classes: ["Barbarian","Paladin","Fighter","Blood Hunter"] },
            { text: "Negocio con él, buscando un acuerdo más justo.", classes: ["Captain","Investigator","Warlord","Savant"] },
            { text: "Lo manipulo con engaños y magia para evitar el tributo.", classes: ["Wizard","Warlock","Psion","Witch"] },
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
            { text: "Manipulo la percepción pública para borrar toda sospecha.", classes: ["Wizard","Warlock","Witch","Psion"] },
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
            { text: "Acepto con entusiasmo, todo poder es un regalo sin importar el costo.", classes: ["Warlock","Witch","Psion","Vessel"] },
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
            { text: "Uso el dilema para manipular al grupo y ganar control.", classes: ["Warlock","Witch","Psion","Warmage"] }
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
			{ text: "La Cara", classes: ["Investigator", "Psion"] },
			{ text: "El Protegido", classes: ["Binder","Commoner","Gadgeteer"] },
            { text: "El Malvado", classes: ["Illrigger","Necromancer"] }
        ]
    }
];

let currentQuestionIndex = 0;
let answers = [];

// Mostrar contenedor del Quiz y ocultar lo demás
quizButton.addEventListener("click", () => {
    mainContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    answers = [];

    // Separar las preguntas fijas de las que no lo son
    const fixed = quizQuestions.filter(q => q.fixed);
    const notFixed = quizQuestions.filter(q => !q.fixed);

    // Mezclar las que no son fijas
    shuffleArray(notFixed);

    // Combinar: primero la fija, luego las aleatorias
    shuffledQuestions = [...notFixed, ...fixed];

    quizResult.innerHTML = "";
    showQuestion();
	
	quizBar.max = quizQuestions.length;
	quizBar.value = 0;
	quizRemaining.textContent = `${quizQuestions.length} preguntas restantes`;
}

function updateProgress(currentIndex) {
quizBar.value = currentIndex;
quizRemaining.textContent = `${quizQuestions.length - currentIndex} preguntas restantes`;
}

function showQuestion() {
    const q = shuffledQuestions[currentQuestionIndex];
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = "";

    q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.addEventListener("click", () => selectOption(btn, opt.classes));
        quizOptions.appendChild(btn);
    });

    backButton.classList.toggle("hidden", currentQuestionIndex === 0);
}


function selectOption(button, classes) {
    button.classList.add("fade-out");
    answers[currentQuestionIndex] = classes;
	
	answerSound.currentTime = 0;
	answerSound.play();
	updateProgress(currentQuestionIndex + 1);
	
    setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResult();
        }
    }, 400);
}


quizButton.addEventListener("click", () => {
    mainContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    exitQuiz.classList.remove("hidden");
    // Reproduce el audio
    quizAudio.currentTime = 0;
    quizAudio.play().catch(err => console.log("No se pudo reproducir el audio:", err));
    startQuiz();
});


// Botón atrás
backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

// Botón Salir
quizButton.addEventListener("click", () => {
	quizAudio.currentTime = 0;
    mainContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    exitQuiz.classList.remove("hidden"); // <-- lo mostramos
    startQuiz();
});

exitQuiz.addEventListener("click", () => {
    quizAudio.currentTime = 0;
    quizContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
    quizResult.innerHTML = "";
});

function showResult() {
    quizQuestion.textContent = "";
    quizOptions.innerHTML = "";
	quizAudio.currentTime = 0;
    backButton.classList.add("hidden");
    exitQuiz.classList.remove("hidden");

    let score = {};
    answers.forEach(selected => {
        selected.forEach(cls => {
            score[cls] = (score[cls] || 0) + 1;
        });
    });

    const result = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    const finalClass = classes.find(c => c.name.toLowerCase() === result.toLowerCase());

    // Lanzar confeti
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });

    if (finalClass) {
        quizResult.innerHTML = `
            <h3>¡Eres ${finalClass.name}!</h3>
            <p>${finalClass.description}</p>
            <div style="margin-top:20px;">
                <img src="${finalClass.image}" alt="${finalClass.name}" style="width:400px; max-width:90%; border-radius:10px;">
            </div>
            <br>
            <button id="restartQuiz">Volver al inicio</button>
        `;
    } else {
        quizResult.innerHTML = `<h3>Tu clase es: ${result}</h3>`;
    }

    document.getElementById("restartQuiz").addEventListener("click", () => {
        quizContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
        quizResult.innerHTML = "";
    });
}

function shuffleArray(array) {
    // Algoritmo de Fisher-Yates para mezclar
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ---- TIER LIST y SPELL BOOK ---- //

    const tierListButton = document.getElementById("tierListButton");
    const tierListContainer = document.getElementById("tierListContainer");
    const exitTierListButton = document.getElementById("exitTierListButton");
    const addTierRowButton = document.getElementById("addTierRowButton");
    const itemBank = document.getElementById("itemBank");
    const tierRowsContainer = document.getElementById("tierRowsContainer");
	const downloadTierListButton = document.getElementById("downloadTierListButton");

// ... (después de los listeners de tierListButton y exitTierListButton) ...

spellbookButton.addEventListener("click", () => {
    mainContainer.classList.add("hidden");
    quizContainer.classList.add("hidden");
    tierListContainer.classList.add("hidden");
    spellbookContainer.classList.remove("hidden");

    // Carga los hechizos solo la primera vez
    if (!isSpellsLoaded) {
        loadSpells();
    }
});

exitSpellbookButton.addEventListener("click", () => {
    spellbookContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
});
    let draggedItem = null; // Variable para guardar el item que se está arrastrando

    // Función para añadir eventos de Drop (soltar) a una zona
    function addDragEventsToZone(zone) {
        // 1. Cuando un item está SOBRE la zona
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); // Necesario para permitir el drop
            zone.classList.add("drag-over");
        });

        // 2. Cuando un item DEJA de estar sobre la zona
        zone.addEventListener("dragleave", () => {
            zone.classList.remove("drag-over");
        });

        // 3. Cuando un item es SOLTADO en la zona
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("drag-over");
            
            if (draggedItem) { // Si realmente estamos arrastrando algo
                zone.appendChild(draggedItem); // Mueve el item a esta zona
            }
        });
    }

    // Función para poblar el banco de items con las clases
    function populateItemBank() {
        // Usamos la misma constante 'classes' que ya tienes definida
        classes.forEach(cls => {
            const item = document.createElement("div");
            item.classList.add("tier-item");
            item.draggable = true;
            // ID único para referencia
            item.id = `tier-item-${cls.name.replace(/\s+/g, '-')}`; 

            const img = document.createElement("img");
            img.src = cls.image;
            img.alt = cls.name;

            const nameSpan = document.createElement("span");
            nameSpan.textContent = cls.name;

            item.appendChild(img);
            item.appendChild(nameSpan);

            // Eventos de Drag (arrastrar) para el item
            item.addEventListener("dragstart", () => {
                draggedItem = item; // Guarda el item que estamos arrastrando
                // 'setTimeout' es un truco para que el estilo se aplique después de "levantar" el item
                setTimeout(() => item.classList.add("dragging"), 0);
            });

            item.addEventListener("dragend", () => {
                if(draggedItem) {
                    draggedItem.classList.remove("dragging"); // Limpia el estilo
                }
                draggedItem = null; // Suelta el item
            });

            itemBank.appendChild(item); // Añade el item al banco
        });
    }
    
    // 1. Poblar el banco de items al cargar la página
    populateItemBank();

    // 2. Añadir eventos a TODAS las zonas de drop existentes (las filas por defecto + el banco)
    document.querySelectorAll(".tier-dropzone").forEach(zone => {
        addDragEventsToZone(zone);
    });

    // 3. Botón de añadir nueva fila
    addTierRowButton.addEventListener("click", () => {
        const newRow = document.createElement("div");
        newRow.classList.add("tier-row");

        // Generar un color aleatorio para la etiqueta
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

        // Añadimos el HTML de la fila, incluyendo el botón de borrado
        newRow.innerHTML = `
            <div class="tier-label" contenteditable="true" style="background-color: ${randomColor};">Nueva Fila</div>
            <button class="delete-tier-row-button">×</button>
            <div class="tier-dropzone"></div>
        `;
        
        // --- Conectar los eventos a la fila NUEVA ---

        // a) Conectar el evento de borrado al nuevo botón 'X'
        const newDeleteButton = newRow.querySelector('.delete-tier-row-button');
        addDeleteEventToButton(newDeleteButton);

        // b) Conectar el evento de dropzone a la nueva zona
        const newDropzone = newRow.querySelector(".tier-dropzone");
        addDragEventsToZone(newDropzone);

        // Añadir la nueva fila al contenedor
        tierRowsContainer.appendChild(newRow);
    });

    // 4. Botones para mostrar/ocultar el Tier List
    tierListButton.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        quizContainer.classList.add("hidden"); // Ocultar quiz si está abierto
        tierListContainer.classList.remove("hidden");
    });

    exitTierListButton.addEventListener("click", () => {
        tierListContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
    });

    // --- NUEVAS FUNCIONES PARA BORRAR FILAS ---

    /**
     * Mueve todos los items de una fila al banco y luego la elimina.
     */
    function handleTierRowDelete(deleteButton) {
        // 1. Encontrar la fila padre
        const rowToDelete = deleteButton.closest('.tier-row');
        if (!rowToDelete) return;

        // 2. Encontrar todos los items (.tier-item) dentro de esa fila
        const itemsToMove = rowToDelete.querySelectorAll('.tier-item');
        
        // 3. Mover cada item de vuelta al banco (#itemBank)
        itemsToMove.forEach(item => {
            itemBank.appendChild(item); // itemBank está definido globalmente
        });

        // 4. Eliminar la fila del DOM
        rowToDelete.remove();
    }

    /**
     * Añade el listener de click a un botón de borrado, incluyendo una confirmación.
     */
    function addDeleteEventToButton(button) {
        button.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres borrar esta fila? Los items volverán al banco.')) {
                handleTierRowDelete(button);
            }
        });
    }

    // Conectar la lógica de borrado a los botones que YA existen en el HTML
    document.querySelectorAll('.delete-tier-row-button').forEach(button => {
        addDeleteEventToButton(button);
    });

    // ---- FIN TIER LIST ---- //
	
// ---- GRIMORIO DE HECHIZOS ---- //

/**
* Carga los hechizos desde el archivo spells.json
 */
async function loadSpells() {
    try {
        const response = await fetch('spells.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allSpells = await response.json();
        isSpellsLoaded = true;

// --- SECCIÓN MODIFICADA ---
        // Mapeo de nombres "bonitos" del array 'classes' a las claves "feas" del JSON
        // Añade aquí cualquier otra excepción que encuentres
        const classJsonMap = {
            "Bard": "bardo",
            "Cleric": "clerigo",
            "Druid": "druida",
            "Paladin": "paladin",
            "Ranger": "ranger",
            "Sorcerer": "sorcerer",
            "Warlock": "warlock",
            "Wizard": "wizard",
            "Artificer": "artificer",
            "Warmage": "warmage",
            "Witch": "witch",
            "Martyr": "martyrs", // Excepción: 'Martyr' -> 'martyrs'
            "Vessel": "The Vessel", // Excepción: 'Vessel' -> 'The Vessel'
            "Necromancer": "Necromancer",
            "Magus": "Magus",
            "Investigator": "Investigator"
            // Nota: "Shaman" no está en tu array 'classes', así que no se añadirá al filtro.
            // Si quieres añadirlo, primero debes añadir "Shaman" a tu array 'classes' principal.
        };
		
		const damageTypes = [
                { value: "acid", display: "Ácido" },
                { value: "bludgeoning", display: "Contundente" }, // (Golpe)
                { value: "cold", display: "Frío" },
                { value: "fire", display: "Fuego" },
                { value: "force", display: "Fuerza" },
                { value: "lightning", display: "Rayo" },
                { value: "necrotic", display: "Necrótico" },
                { value: "piercing", display: "Perforante" },
                { value: "poison", display: "Veneno" },
                { value: "psychic", display: "Psíquico" },
                { value: "radiant", display: "Radiante" },
                { value: "slashing", display: "Cortante" },
                { value: "thunder", display: "Trueno" }
            ];
		
		// Ordena la lista alfabéticamente por el nombre a mostrar
            damageTypes.sort((a, b) => a.display.localeCompare(b.display));

            // Añade cada tipo de daño al <select>
            damageTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.value; // ej: "acid"
                option.textContent = type.display; // ej: "Ácido"
                filterDamage.appendChild(option);
            });
		
	// Limpiar el filtro (por si acaso)
			filterClass.innerHTML = '<option value="all">Todas las Clases</option>';

			// Poblar el filtro de clases dinámicamente
			classes.forEach(cls => {
				const jsonKey = classJsonMap[cls.name];
				// Si la clase existe en nuestro mapa Y en el JSON...
				if (jsonKey && allSpells.length > 0 && allSpells[0].hasOwnProperty(jsonKey)) {
					const option = document.createElement('option');
					option.value = jsonKey; // El valor es la clave del JSON (ej: "martyrs")
					option.textContent = cls.name; // El texto es el nombre bonito (ej: "Martyr")
					filterClass.appendChild(option);
				}
			});

            // 1. Encontrar todas las escuelas únicas
            const allSchools = allSpells.map(spell => spell.Escuela);
            // Usamos 'Set' para eliminar duplicados
            const uniqueSchools = [...new Set(allSchools)]; 
            
            // 2. Ordenarlas alfabéticamente
            uniqueSchools.sort((a, b) => (a || "").localeCompare(b || "")); 

            // 3. Añadirlas al <select>
            uniqueSchools.forEach(school => {
                if (school) { // Evita valores nulos o vacíos
                    const option = document.createElement('option');
                    // Capitaliza la primera letra para que se vea mejor
                    const displayName = school.charAt(0).toUpperCase() + school.slice(1);
                    option.value = school;
                    option.textContent = displayName;
                    filterSchool.appendChild(option);
                }
            });
            // --- FIN DEL NUEVO BLOQUE ---

			// Añadir listeners a los filtros
			const allFilters = [filterClass, filterLevel, filterType, filterSchool, filterRitual, filterDamage, sortSpells];
			allFilters.forEach(filter => {
				filter.addEventListener('change', applyFiltersAndSort);
			});
			
			searchSpell.addEventListener('input', applyFiltersAndSort);
			
			// Renderizar la lista inicial
			applyFiltersAndSort();

		} catch (error) {
			console.error("Error al cargar los hechizos:", error);
			spellList.innerHTML = `<p style="color: red;">Error al cargar el libro de hechizos. Revisa el archivo spells.json.</p>`;
		}
	}

/**
 * Aplica los filtros y el orden seleccionados, y luego llama a renderSpells
 */
/**
 * Aplica los filtros y el orden seleccionados, y luego llama a renderSpells
 */
function applyFiltersAndSort() {
    let filteredSpells = [...allSpells]; // Empezamos con la lista completa

    // 1. Filtrar
    const classVal = filterClass.value;
    const levelVal = filterLevel.value;
    const typeVal = filterType.value;
    const ritualVal = filterRitual.value;
	const schoolVal = filterSchool.value;
	const damageVal = filterDamage.value;
	
	
    // Obtenemos el valor del buscador, lo pasamos a minúsculas y quitamos espacios
    const searchVal = searchSpell.value.toLowerCase().trim();
    // --- FIN ---
    // --- LÓGICA DE FILTRADO MODIFICADA ---
    if (classVal !== 'all') {
        // classVal ya es la clave correcta del JSON (ej: "bardo", "martyrs", "The Vessel")
        // Filtramos donde el valor de esa clave sea 1 (significa "sí")
        filteredSpells = filteredSpells.filter(spell => spell[classVal] === 1);
    }
    if (levelVal !== 'all') {
        // Comparamos 'Nivel' (del JSON) con el valor del filtro (convertido a número)
        filteredSpells = filteredSpells.filter(spell => spell.Nivel == levelVal);
    }
    if (typeVal !== 'all') {
        // El filtro nos da "Arcano", "Divino" o "Primal".
        // Mapeamos eso a las claves A, D, P de tu JSON.
        if (typeVal === 'Arcano') {
            filteredSpells = filteredSpells.filter(spell => spell.A === 1);
        } else if (typeVal === 'Divino') {
            filteredSpells = filteredSpells.filter(spell => spell.D === 1);
        } else if (typeVal === 'Primal') {
            filteredSpells = filteredSpells.filter(spell => spell.P === 1);
        }
    }
	
	if (schoolVal !== 'all') {
        // Filtra donde la 'Escuela' del hechizo sea igual al valor seleccionado
        filteredSpells = filteredSpells.filter(spell => 
            spell.Escuela === schoolVal
        );
    }
	
    if (ritualVal !== 'all') {
        // El filtro nos da "true" o "false"
        // Mapeamos eso a "si" o "no" de tu JSON
        if (ritualVal === 'true') {
            filteredSpells = filteredSpells.filter(spell => spell.ritual === "si");
        } else if (ritualVal === 'false') {
            filteredSpells = filteredSpells.filter(spell => spell.ritual === "no");
        }
    }
    if (damageVal !== 'all') {
        // Buscamos el término exacto en inglés. Ej: "fire damage"
        // Esto es más seguro que buscar solo "fire" (que podría estar en "firefly")
        const searchTerm = damageVal + " damage"; 
        
        filteredSpells = filteredSpells.filter(spell => {
            // Comprobamos que la clave "efecto" exista
            if (spell.efecto) {
                // Convertimos el texto del efecto a minúsculas
                // y comprobamos si incluye nuestro término de búsqueda
                return spell.efecto.toLowerCase().includes(searchTerm);
            }
            return false; // Si no hay "efecto", no se incluye
        });
    }
	
	// --- NUEVO FILTRO DE BÚSQUEDA (se aplica después de los otros) ---
    if (searchVal.length > 0) {
        filteredSpells = filteredSpells.filter(spell => 
            spell.Nombre.toLowerCase().includes(searchVal)
        );
    }
    // --- FIN ---

    // 2. Ordenar
    // --- LÓGICA DE ORDEN MODIFICADA ---
    const sortVal = sortSpells.value;
    if (sortVal === 'name') {
        // Ordenamos por la clave "Nombre"
        filteredSpells.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    } else if (sortVal === 'level') {
        // Ordenamos por la clave "Nivel"
        filteredSpells.sort((a, b) => a.Nivel - b.Nivel);
    }
    // --- FIN LÓGICA DE ORDEN ---

    // 3. Renderizar
    renderSpells(filteredSpells);
}

/**
 * Muestra los hechizos en el HTML
 * @param {Array} spells - El array de hechizos (ya filtrados y ordenados)
 */
function renderSpells(spells) {
    // Limpiar la lista anterior
    spellList.innerHTML = '';

    if (spells.length === 0) {
        spellList.innerHTML = '<p>No se encontraron hechizos con esos filtros.</p>';
        return;
    }

    // Mapa para volver a convertir claves de JSON en nombres bonitos
    // (Inverso al mapa de loadSpells)
    const classDisplayMap = {
        "bardo": "Bardo",
        "clerigo": "Clérigo",
        "druida": "Druida",
        "paladin": "Paladín",
        "ranger": "Ranger",
        "sorcerer": "Hechicero",
        "warlock": "Brujo",
        "wizard": "Mago",
        "artificer": "Artificero",
        "warmage": "Mago de Guerra",
        "witch": "Bruja",
        "martyrs": "Mártir",
        "The Vessel": "Vessel",
        "Necromancer": "Nigromante",
        "Magus": "Magus",
        "Investigator": "Investigador",
        "Shaman": "Chamán"
        // (Asegúrate de que los nombres aquí coincidan con lo que quieres mostrar)
    };

// --- NUEVO: Mapa de traducción para Tiempo de Lanzamiento ---
    const castingTimeMap = {
        "action": "1 Acción",
        "bonus action": "1 Bonus Action",
        "reaction": "1 Reacción",
        "1 minute": "1 Minuto",
        "10 minutes": "10 Minutos",
        "1 hour": "1 Hora", // Tu JSON puede tener "1 Hour" o "1 hour"
        "8 hours": "8 Horas",
        "12 hours": "12 Horas",
        "24 hours": "24 Horas"
        // (puedes añadir más si los descubres)
    };

    // Crear una tarjeta por cada hechizo
    spells.forEach(spell => {
        const spellCard = document.createElement('div');
        spellCard.className = 'spell-card';
        
        // 1. Construir string de Tipos de Magia (Arcano, Divino, Primal)
        let magicTypes = [];
        if (spell.A === 1) magicTypes.push('Arcano');
        if (spell.D === 1) magicTypes.push('Divino');
        if (spell.P === 1) magicTypes.push('Primal');
        const typeString = magicTypes.length > 0 ? magicTypes.join(', ') : 'N/A';

        // 2. Construir string de Componentes (V, S, M)
        let components = [];
        if (spell.verbal === "si") components.push('V');
        if (spell.somatico === "si") components.push('S');
        if (spell.material === "si") components.push('M');
        const compString = components.join(', ');

        // 3. Construir string de Clases
        let spellClasses = [];
        // Iteramos sobre las claves de nuestro mapa
        for (const key in classDisplayMap) {
            if (spell[key] === 1) { // Si el hechizo tiene esta clase (valor 1)
                spellClasses.push(classDisplayMap[key]); // Añadimos el nombre bonito
            }
        }
        const classString = spellClasses.length > 0 ? spellClasses.join(', ') : 'N/A';
        
		// 4. Obtener y traducir el tiempo de lanzamiento
        // IMPORTANTE: Tu clave JSON es "Casting time" (con espacio)
        const originalCastingTime = spell["Casting time"] || "N/A";
        // Buscamos la traducción; si no existe, usamos el valor original
        const translatedCastingTime = castingTimeMap[originalCastingTime.toLowerCase()] || originalCastingTime;

        // 5. Construir la tarjeta HTML
        spellCard.innerHTML = `
            <h4>${spell.Nombre}</h4>
            <p class="spell-meta">
                Nivel ${spell.Nivel} (${spell.Escuela || 'N/A'})
                ${spell.ritual === "si" ? ' (Ritual)' : ''}
            </p>
            <p class="spell-meta">
                <strong>Tiempo:</strong> ${translatedCastingTime} | 
                <strong>Rango:</strong> ${spell.Range || 'N/A'} | 
                <strong>Duración:</strong> ${spell.duracion || 'N/A'}
            </p>
            <p class="spell-meta">
                <strong>Componentes:</strong> ${compString}
                ${spell.material === "si" && spell.descripcion_material ? ` (${spell.descripcion_material})` : ''}
            </p>
            <p class="spell-type">Tipo: ${typeString}</p>
            <p class="spell-classes">Clases: ${classString}</p>
            <p class="spell-description">${spell.efecto || 'Sin descripción.'}</p>
            ${spell.level_alto ? `<p class="spell-description"><strong>A mayor nivel:</strong> ${spell.level_alto}</p>` : ''}
        `;
        // --- FIN SECCIÓN MODIFICADA ---

        spellList.appendChild(spellCard);
    });
}

});
