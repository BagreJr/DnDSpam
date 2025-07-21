document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("discoverButton");
    const classImage = document.getElementById("classImage");
    const className = document.getElementById("className");
    const classDescription = document.getElementById("classDescription");
    const galleryContainer = document.getElementById("galleryContainer");
    const galleryButton = document.getElementById("toggleGalleryButton");
    const gallery = document.getElementById("gallery");
	const subclassName = document.getElementById("subclassName") || document.createElement("h4");
	
	
	
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

    // Evento para hacer zoom en la imagen
    modalImage.addEventListener("click", (event) => {
        if (zoomLevel === 0) {
            modalImage.classList.add("zoomed");
            const rect = modalImage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            modalImage.style.setProperty("--zoom-x", `${x}%`);
            modalImage.style.setProperty("--zoom-y", `${y}%`);
            zoomLevel = 1;
        } else {
            modalImage.classList.remove("zoomed");
            zoomLevel = 0;
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
});
