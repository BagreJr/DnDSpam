document.addEventListener("DOMContentLoaded", () => {
    // --- 1. DATOS DE CONSEJOS DEL ASISTENTE ---
    
    // Aquí tienes el grupo de consejos para la clase Alchemist en el formato que solicitaste:
    // He creado consejos y recomendaciones para cada una de tus clases.
    const assistantData = {
        "Alchemist": {
            advice: "¡La gestión de 'Reagents' (Reactivos) es clave! No los gastes todos en la primera pelea. Decide si vale más potenciar una bomba para daño masivo o guardarlos para crear pociones de curación o utilidad en un descanso.",
            easy: ["Mad Bomber (enfocado en daño y explosiones directas)", "Mutagenist (bonus de estadísticas simples y potentes)"],
            hard: ["Xenoalchemist (gestión compleja de 'grafts' y mascotas)", "Dynamo Engineer (sistema de hechizos único y restrictivo)"]
        },
        "Artificer": {
            advice: "¡Tu inteligencia es tu mejor arma! No eres un simple hechicero; eres un inventor. Tu verdadero poder radica en tus Infusiones y tu Pericia con Herramientas. Prepara las infusiones correctas después de cada descanso largo y usa tu 'Flash of Genius'  para salvar a tu equipo en el momento clave. La preparación lo es todo.",
            easy: ["Armorer (Simple y resistente, elige entre daño a distancia o tanque melee)", "Forgewright (Un guerrero directo que encanta su arma y la usa para 'smites' arcanos)","Enhanced (Combate melee simple con una cuchilla oculta y mejoras corporales pasivas)"],
            hard: ["Machinist (Control de múltiples Autómatas que requieren tu acción de bonificación para activarse)","Chronothief (Gestión de cargas de Cronómetro y un uso muy intensivo de la economía de acciones)"]
        },
        "Barbarian": {
            advice: "¡Olvida lo que sabías del Bárbaro estándar! Tu poder ahora reside en los Savage Exploits. Tu Furia (Rage) es muy limitada al principio, así que úsala solo en el combate más duro. Concéntrate en usar tus Exploits para controlar el campo, potenciar tus críticos y apoyar a tu equipo.",
            easy: ["Path of the Champion (Muy pasivo, te da un Estilo de Lucha y mejora tus Exploits y críticos sin añadir complejidad)","Path of the Juggernaut (Enfocado en el combate simple, te da empujones automáticos, te hace inmune a ser derribado y daña estructuras)"],
            hard: ["Path of the Warden (Añade lanzamiento de hechizos de Druida, lo que requiere gestionar 'slots' y concentración además de la Furia)","Path of the Dreadnought (Cambia totalmente la Furia a un 'pool' de asaltos que debes microgestionar, activando y desactivando tu Furia tácticamente como acción bonus)"]
        },
        "Bard": {
            advice: "¡Tu Carisma es tu sinfonía! Eres el alma del grupo y un maestro de la versatilidad. Tu poder principal es la Inspiración Bárdica; úsala tácticamente para potenciar a tus aliados en sus tiradas de ataque, habilidad o salvación. Recuerda que eres un 'Jack of All Trades', así que no temas intentar cualquier prueba de habilidad. Tu magia y tus 'Magical Secrets' te permiten adaptarte a cualquier situación. ¡Inspira, manipula y sé el centro de atención!",
            easy: ["College of Lore (El bardo clásico centrado en las habilidades y el soporte.)", "College of Glamour ('Mantle of Inspiration' es una excelente acción de bonificación para dar puntos de golpe temporales y reposicionar a tu equipo.)"],
            hard: ["College of Apocalypse (Muy complejo. Altera la progresión de tu dado de Inspiración Bárdica y añade un nuevo subsistema de 'Eldritch Melodies' que se usan como acciones con recargas separadas y un riesgo de locura al cambiarlas.)", "College of Creation (Requiere doble gestión.)"]
        },
        "Binder": {
            advice: "¡Tu poder reside en tus Vestigios! Eres la clase más versátil del juego, capaz de cambiar tu rol (tanque, DPS, apoyo, explorador) cada día. Tu verdadero desafío es la preparación: estudia los Vestigios y elige la combinación correcta para el día siguiente después de cada descanso largo. No temas usar 'Rebinding' si tu elección inicial no fue la correcta para la situación.",
            easy: ["Legion’s Lodge (Se enfoca en potenciar tus 'Minor Spirits', dándote más cantrips y la habilidad de 'quemar' un espíritu para un gran daño de ráfaga)", "Society of the Stygian Seal (Un combatiente melee directo con teletransportación en cada golpe.)"],
            hard: ["Brotherhood of Ascetics (Requiere mucha gestión de acciones para activar y desactivar tus Vestigios)", "The Avatarists (Gestión de una 'mascota' que es una extensión de ti.)"]
        },
        "Blood Hunter": {
            advice: "Tu vida es tu munición. La mecánica central de esta clase es el 'Sacrificio Vital', donde sacrificas tus HP máximos para potenciar tus 'Ritos de Sangre' y tu 'Ofrenda Carmesí'. La Constitución es tu estadística clave, ya que determina tu reserva de vida para sacrificar y la CD de salvación de tus Ritos. ¡Gestiona tu salud con cuidado y decide cuándo vale la pena el sacrificio por el poder!",
            easy: ["Order of the Ascension (Un 'power-up' simple con acción de bonificación, 'Forma Radiante', que te da un ataque a distancia y una reacción de apoyo)", "Order of Transference (En lugar de atacar, puedes usar 'Transferencia Vital' para curar aliados o dañar enemigos con un toque)"],
            hard: ["Order of Temporal Knights (Muy táctica, se centra en manipular la economía de acciones, cediendo tus acciones/reacciones o robando las de los enemigos)", "Order of Alchemists (Implica gestionar una lista de 'Mutágenos'latentes y decidir cuáles activar al 'Mutar')"]
        },
        "Captain": {
            advice: "¡Tu Carisma lo es todo! Potencia tu Liderazgo, las Habilidades de tu Cohort y tus Tácticas de Guerra. Eres una clase de 'mascota': tu Cohorte es tu segunda mitad, úsalo para flanquear, proteger y activar 'Combo Actions'. Tu recurso principal son los 'Battle Dice', que se recargan al 'iniciar el combate', ¡así que úsalos sin miedo! Tu economía de acción es clave: gestiona bien tus Acciones de Bonificación,  tus Reacciones y tus 'Combo Actions'.",
            easy: ["Star Banner (Muy directo, te da 'Extra Attack' y convierte tu escudo en un arma arrojadiza que siempre regresa)", "Turtle Banner (Enfocado 100% en defensa pasiva)"],
            hard: ["Demon Banner (La más compleja. No tienes cohorte; te transformas en él gestionando dos hojas de personaje)", "Treant Banner (Control de terreno. Tu efectividad depende de crear y moverte por terreno difícil)"]
        },
        "Cleric": {
            advice: "¡Tu Sabiduría (Wisdom) es tu conexión con lo divino! Eres el pilar del grupo, capaz de ser sanador, guerrero y soporte. Tu mayor fortaleza es la preparación: a diferencia de otros, puedes cambiar toda tu lista de hechizos preparados cada descanso largo. Tu Divine Domain te da hechizos que siempre están listos y define tu rol. No olvides tu Channel Divinity; es tu as bajo la manga que recarga con un descanso corto y te da habilidades únicas de subclase",
            easy: ["Life Domain (El sanador por excelencia; la mayoría de sus rasgos son mejoras pasivas a tus curaciones como Disciple of Life y Blessed Healer)", "War Domain (Un guerrero simple y directo; ganas armas marciales/armadura pesada y un ataque extra como bonus action)"],
            hard: ["Guardian Domain (Gestión de una 'pet'; tu Guardian Angel tiene sus propias estadísticas y requiere tu bonus action)", "Peril Domain (Gestión de un recurso único y complejo para nuevos jugadores)"]
        },
        "Commoner": {
            advice: "¡El documento te ruega que no juegues esta clase, así que ignóralo! Tu poder es la pura terquedad. Tu estadística clave es la Constitución; define tu AC, tu reducción de daño y tus salvaciones. Tu recurso principal es Grit: no lo malgastes, guárdalo para las tiradas de salvación o los ataques que deben acertar. Tu Old Reliable es tu arma principal, y Common No More es tu gran recompensa por sobrevivir.",
            easy: ["Laborer (El tanque. Simple. Golpea fuerte y construye cosas.)", "Town Guard (El guerrero. Gana armadura, escudo y Exploits que usan Grit para un combate directo y efectivo.)"],
            hard: ["Old Timer (Un hechicero con Rustic Spellcasting. Debes preparar hechizos de Druida y gestionar 2 ranuras de conjuro por descanso corto.)"]
        },
        "Craftsman": {
            advice: "¡Si no existe, invéntalo! Eres el maestro de la forja y el taller. Tu verdadero poder radica en tus Masterwork Properties y tu Active Crafting. Prepara el equipo correcto después de cada descanso largo y usa tu Tool Belt para sacar la solución exacta en el momento clave. ¡Un artesano siempre está preparado!",
            easy: ["Armigers’ Guild (El tanque definitivo. Mejoras de armadura pasivas y una defensa simple y robusta)", "Bladeworkers’ Guild (Un guerrero directo centrado en el daño, con Fighting Style y la habilidad Sabotaging Strike para romper defensas)"],
            hard: ["Clockworkers’ Guild (Gestión de dos 'constructs' que requieren sacrificar uno de tus ataques para ser comandados)", "Mechanauts’ Guild (Control de un Mechanaut's Apparatus con su propia reserva de HP, reglas de pilotaje y reparaciones)"]
        },
        "Druid": {
            advice: "¡Eres la encarnación de la naturaleza! Tu mayor fuerza es la adaptabilidad. Usa tu Spellcasting para controlar el campo de batalla con enredaderas y tormentas, y tu Wild Shape para explorar, espiar o  tanquear. Recuerda cambiar tus hechizos preparados después de un descanso largo para adaptarte a cualquier desafío. Eres el híbrido definitivo.",
            easy: ["Circle of Land (El druida 'caster' clásico. Obtienes hechizos extra y Natural Recovery para recuperar 'spell slots'. Simple y efectivo.)", "Circle of Guardians (Un guerrero simple. Entra en Guardian Form como bonus action, obtén AC, y golpea con Extra Attack.)"],
            hard: ["Circle of the Moon (La versión de este PDF es compleja. Debes gestionar 7+ Greater Beast Forms personalizadas que escalan en 4 niveles distintos.)", "Circle of Configuration (Olvida las bestias, eres un robot. Gestionas un Construct Form con 3 'configurations' y sus propias acciones.)"]
        },
        "Fighter": {
            advice: "Tu verdadero poder son los Martial Exploits.¡Gasta esos Exploit Dice! Se recargan en un *short rest*, así que úsalos constantemente para controlar el campo, hacer daño extra y potenciar tus habilidades. Sigues siendo el maestro del daño sostenido con Extra Attack y con Action Surge. Usa Second Wind como bonus action para aguantar más que nadie.",
            easy: ["Champion (Bonificaciones pasivas directas al daño y al critico)", "Swordsage (Se centra en una simple transformación de bonus action, Battle Trance, para ganar buffs)"],
            hard: ["Dynamic Duelist (Requiere cambiar constantemente de posturas para usar tus habilidades)", "Iron Oppressor (Control de múltiples cadenas, seis opciones de Tempered Technique y uso de reactions)"]
        },
        "Gadgeteer": {
            advice: "¡Tu cerebro es tu mejor arma, pero tu 'Prototype' define cómo la usas! Tu elección de nivel 2 es clave. Usa tu 'AI Companion' para superar checks de Inteligencia y no olvides aplicar tu 'Overcharge' en cada turno para maximizar el daño. ¡La clave es elegir los 'Gadgets' correctos para cada misión!",
            easy: ["Photonist (Un 'blaster' puro. Tus 'Laser Gauntlets' te dan daño consistente y directo usando tu Inteligencia y tu 'Overcharge')", "Mastermaker (Mejoras pasivas y permanentes como 'Thermalsight' y 'Carbon Fiber Skin' que no requieren gestión activa)"],
            hard: ["Nanoengineer (Gestión de recursos intensiva. Debes balancear tus 'Nano points' entre curar, dañar  e invertir en tu AC)", "Drone Jockey (Manejo de múltiples 'pets'. Requiere gestionar diferentes tipos de drones, su HP, y tu 'bonus action' para comandarlos)"]
        },
        "Gunslinger": {
            advice: "¡El riesgo está en tu sangre! Tu poder se basa en tu increíble capacidad de hacer críticos. Eres un 'damage dealer', así que el posicionamiento es clave. Usa tus Exploit Dice con sabiduría para potenciar tus disparos o salir de un apuro. No olvides que Quick Draw te da ventaja en iniciativa, ¡así que actúa primero! Maximiza tu Destreza y prepárate para esos Critical Shot.",
            easy: ["Lucky Son of a Bitch (Simple y divertido. Se basa en la suerte, con re-rolls y evasiones.)", "Sharpshooter (El francotirador. Se centra en disparar desde la posición Prone y usar tu Focused Shot para un crítico garantizado.)"],
            hard: ["Grenadier (Requiere gestión de área de efecto (AoE), arriesgándote a golpear aliados.)", "Janissary (Muy táctico. Se enfoca en el posicionamiento de tus aliados para activar sus features.)"]
        },
        "Illrigger": {
            advice: "¡Eres un agente del infierno, y tu poder se basa en la gestión de recursos! Tu mecánica central es Baleful Interdict. Coloca tus seals sabiamente como bonus action o al golpear y luego quemarlo sin gastar acción cuando el enemigo reciba daño de cualquier fuente para maximizar tu impacto. No olvides usar tus Interdiction Boons y tu Infernal Conduit para apoyar o destruir.",
            easy: ["Shadowmaster (enfocado en sigilo y en conseguir ventaja para activar su Strike from the Dark)", "Painkiller (Un 'tanque' marcial directo que usa heavy armor y da órdenes, muy resistente)"],
            hard: ["Brass Banker (Un 'debuffer' táctico que aplica 'buffs' con penalizaciones; requiere un posicionamiento y selección de objetivos muy cuidadosos)", "Fatebreaker (Un 'anti-mago' y 'debuffer' que puede leer los pensamientos de enemigos interdictos y se especializa en control psíquico)"]
        },
        "Investigator": {
            advice: "No eres un lanzador de conjuros tradicional; tu poder reside en tu grimorio de rituales (Ritualist) y tu habilidad para lanzarlos instantáneamente con Rushed Incantation. En combate, tu daño principal proviene de Exploit Weakness, así que asegúrate de acertar un ataque con arma cada turno. Tu Occult Specialization y tus Trinkets definen tu rol, ¡úsalos sabiamente!",
            easy: ["Exterminator (Un guerrero directo. Más armadura y armas. Simple y efectivo.)", "King of Curses (Puro daño melee. Añade daño pasivo y eventualmente obtiene un segundo Exploit Weakness con Divine Dismantler.)"],
            hard: ["Contractualist (Una subclase de 'pet' que gestiona múltiples Soul Contracts, las estadísticas de las criaturas invocadas, y límites de CR que escalan)", "Time Operative (Su Trinket principal, Chronomancer's Pocketwatch, te permite repetir tu turno completo, lo cual es tácticamente muy complejo de optimizar.)"]
        },
        "Magus": {
            advice: "¡Tu poder reside en la fusión de la espada y el hechizo! Tu habilidad clave es Spellstrike. Prioriza tu Inteligencia, ya que alimenta tu Spellcasting y tu Arcane Armory. No temas gastar recursos, puedes recuperarlos con Arcane Regeneration en un descanso corto. Usa Ethereal Jaunt para entrar y salir del combate cada vez que lanzas un hechizo.",
            easy: ["Order of Aether Blade (Muy directo, te permite usar Inteligencia para el daño de tu Aether Blade y te enfocas en un solo atributo)", "Order of Blade Dancers (Activa tu Blade Dance como un 'power-up' simple para obtener bonificaciones pasivas al combate)"],
            hard: ["Order of Spellswords (Alta complejidad, debes gestionar tres sistemas a la vez: Spell Slots, Exploit Dice y tu Spellsword's Armory)", "Order of Evolution (Muy situacional, requiere gestionar habilidades de monstruos que robas con Evolved Armory y gastar recursos escalables para reusarlas)"]
        },
        "Martyr": {
            advice: "¡Tu vida es tu recurso! Eres un 'tanque' que usa su propia sangre. Tu poder central es el Spellcasting y el daño masivo de Torment pagando más HP. La clave es el equilibrio: gasta vida agresivamente, pero usa tu Divine Healing como acción bonus para recuperarte justo a tiempo. Tu Undying Conviction es tu seguro de vida. Prioriza Sabiduría y Constitución.",
            easy: ["Burden of Humanity (Un líder de apoyo simple. Gana armadura pesada y usa su reacción Human Spirit para sanar a un aliado que cae a 0 HP)", "Burden of Revolution (Un combatiente melee directo. Gana armadura pesada y tu Sainted Reprisal ahora funciona a distancia, haciéndolo más fácil de usar)"],
            hard: ["Burden of Discord (Muy complejo. Gestionas la Coin of Chaos, un recurso que compartes con el DM, y activas efectos aleatorios con Havoc!)", "Burden of the End (Enfocado en hechizos. Requiere gastar más vida para potenciar tus conjuros, añadiendo otra capa de gestión de HP)"]
        },
        "Monk": {
            advice: "¡Tu poder fluye de tu Ki! Tu Wisdom y Dexterity son tu AC, influye en el CD de tus salvaciones y tu reserva total de Ki. Tu versatilidad no viene de serie, sino de los Techniques que eliges, como Stunning Strike. Administra tu Ki hasta el nivel 11, donde Warrior's Spirit te da un uso de 1 Ki gratis por turno.",
            easy: ["Way of the Open Hand (El monje clásico. Potencia tus 'Techniques' de golpeo con usos gratuitos)", "Way of the Drunken Fist (un estilo de 'pegar y correr' muy efectivo)"],
            hard: ["Way of the Wu Jen (Debes gestionar Spell Slots y una lista de Spells Known además de todo tu Ki)", "Way of the Flagellant (Compleja de optimizar. Usas tu bonus action para múltiples Art of Punishment y debes autoinfligirte daño)"]
        },
        "Necromancer": {
            advice: "¡Tu poder reside en la muerte! Eres un invocador frágil pero poderoso. Tu principal desafío es la gestión de recursos: tus Thralls y tus puntos de Charnel Touch. Usa Black Arcana para convertir tus ranuras de hechizo en más puntos, que alimentan casi todas tus habilidades. Posiciona a tus Thralls para protegerte, ¡eres el general de tu propio ejército de la muerte!",
            easy: ["Death Knight (Muy simple. Gana armadura, armas y Extra Attack para pegar en melee, ganando Temp HP con Charnel Resilience)", "Overlord (Un líder que se enfoca en control spells de su lista de subclase y en buffar a sus Thralls con Charnel Aura)"],
            hard: ["Necrodancer (Requiere una gestión de economía de acciones muy compleja. Debes hacer que tus Thralls usen su acción para Dance y así ganar tu Backup Dancers Bonus)", "Pharaoh (Añade un recurso completamente nuevo, Charnel Divinity, que debes gestionar y recargar usando tus puntos de Charnel Touch)"]
        },
        "Paladin": {
            advice: "¡Tu Carisma es tu poder! No eres solo un guerrero; eres un campeón bendecido. Tu poder real viene de gestionar dos recursos: tus spell slots para el Divine Smite y tu reserva de Divine Favor para curar y potenciar las habilidades de tu Sacred Oath. ¡Tu Aura of Protection salvará al grupo, así que mantente cerca de tus aliados!",
            easy: ["Oath of Devotion (El paladín icónico. Buffea tu arma con Sacred Weapon y su aura pasiva Aura of Devotion protege a todos de ser encantados)", "Oath of Vengeance (Enfocado en cazar a un solo objetivo)"],
            hard: ["Oath of the Blade (Añade una nueva capa de recursos. Ganas Martial Exploits y Exploit Dice, que debes gestionar además de tus spell slots y Divine Favor)", "Oath of the Timekeepers (Muy técnico. Juegas con la economía de acciones, retrasas el daño con Tactical Tardiness y sacrificas recursos en descansos largos con Future Conditional)"]
        },
        "Psionico": {
            advice: "Tu poder no se mide en spell slots, sino en un flujo constante de Psi Points. Tu rasgo clave es Psionic Mastery, que te da puntos gratis cada turno. ¡No los acumules! Gasta esos puntos gratis en cada turno para potenciar tus Psionic Disciplines. Eres una batería que se recarga sola, no un cañón de un solo uso. Tu Inteligencia lo es todo, úsala para tus saves y ataques.",
            easy: ["Awakened Mind (Enfoque simple en la disciplina de Telepathy y daño psíquico directo)", "Unleashed Mind (Un 'blaster' simple enfocado en el daño, ganando un rampage die para más poder y usando Telekinesis)"],
            hard: ["Shaper’s Mind (Una clase 'pet' que debe gestionar la posición, los comandos y las mejoras de su Astral Construct)", "Knowing Mind (Requiere gestionar un recurso secundario complejo)"]
        },
        "Ranger": {
            advice: "¡Eres un cazador adaptable! Tu pilar en combate es Favored Foe; úsalo como bonus action en tu primer turno contra el objetivo prioritario para añadir daño a cada golpe. A diferencia de otros Rangers, tú preparas tus hechizos cada día, como un Druid, así que adapta tu lista de hechizos a los desafíos que esperas. Finalmente, tu verdadera personalización viene de los Survivalist Knacks, ¡úsalos para definir tu estilo de exploración y combate!",
            easy: ["Hunter (Un arquetipo clásico y directo. Hunter's Prey te da opciones de daño simples y efectivas)", "Deadeye Sniper (Simple para combate a distancia. Gana un dado de daño extra si no te mueves)"],
            hard: ["Stormchaser (Manejo de un recurso único, que ganas con casi cualquier acción y que cambia el poder de tus dados de static die)", "Slime Rancher (Gestiona una Ooze y debes gastar el hp de tu compañero como recurso para usar tus habilidades)"]
        },
        "Rogue": {
            advice: "¡Eres un maestro de la precisión y los trucos! Tu vida depende del Sneak Attack. Asegúrate de activarlo CADA turno, ya sea teniendo ventaja o un aliado junto a tu objetivo. Pero tu verdadera navaja suiza son los Devious Exploits. No olvides usarlos para controlar el combate.",
            easy: ["Swashbuckler (El más simple. Fancy Footwork y Rakish Audacity te dan Sneak Attack fácil y movilidad gratis)", "Scout (Movilidad de nivel experto. Skirmisher te permite reposicionarte como reacción sin coste alguno)"],
            hard: ["Arcane Trickster (Requiere gestionar un 1/3 de lanzador de conjuros, con ranuras de hechizo y hechizos conocidos)", "Saboteur (Un sistema de artesanía de Explosives completamente nuevo que consume tus Exploit Dice y requiere mucha preparación)"]
        },
        "Savant": {
            advice: "¡El saber te hace letal! Eres un experto en... bueno, en todo. Tu poder principal es Adroit Analysis: usa tu acción adicional para designar un 'Focus' y destrúyelo. Pero tu verdadera fortaleza son las reacciones. Gástalas sabiamente para controlar la batalla y hacer brillar a tu equipo.",
            easy: ["Adeptus Administratum (Apoyo social y buffos directos potenciando la acción de Help)", "Investigator (Buen balance de combate melee simple con Rough & Tumble y utilidad fuera de combate)"],
            hard: ["Culinarian (Requiere gestionar un Cook Book, recolectar Samples de monstruos y preparar Morsels tras cada descanso)", "Virtuoso (Requiere tu acción y acción adicional para mantener el Wondrous Theme y añade más opciones de reacción)"]
        },
        "Sorcerer": {
            advice: "Sos la magia pura; no la estudias, sos ella. Tu verdadero poder no está en la cantidad de hechizos que conoces, sino en cómo los usas. Gestiona tus Sorcery Points de tu Font of Magic como tu recurso más valioso. Son tu combustible para Metamagic y para crear más Spell Slots. ¡No tengas miedo de quemar recursos para terminar una pelea con un Quicken Spell o un Twinned Spell devastador!",
            easy: ["Draconic Bloodline (resistente con más HP y AC, daño elemental extra y alas)", "Storm Sorcery (Increíble movilidad y daño AoE pasivo)"],
            hard: ["Gifted One (Gestión de una lista de hechizos mucho más grande, 2 Metamagic adicionales y nuevas opciones de acción complejas)", "Toon Magic (Tu lista de hechizos principal es aleatoria después de cada descanso)"]
        },
        "Vagabond": {
            advice: "Eres un luchador desesperado: tu poder se dispara al estar con la mitad de tu vida o menos, lo que activa habilidades como Desperate Fury y Desperate Attack. Si te quedas sin dados, usa Overexertion para un último esfuerzo, y recupera aliento con Breather entre combates.",
            easy: ["Justicar (Simple, se enfoca en marcar un objetivo a la vez)", "Pugilist (Combatiente desarmado directo que golpea duro con Hand-to-Hand y aguanta castigo con Thick-Skinned)"],
            hard: ["Feylost (Depende del azar de la tabla Fey Moods y debe adaptarse a condiciones aleatorias)", "Experiment X (Alta gestión de opciones, eligiendo y cambiando múltiples Mutation en diferentes niveles)"]
        },
        "Vessel": {
            advice: "Eres un combatiente que no depende de armaduras. Tu poder principal es el Spirit Mantle, que activa tu Spiritual Defense y tu Iridescent Strike. No temas gastar tus Vessel Magic slots, ¡se recargan en un descanso corto! Guarda tu Archon Form para el combate, es tu As.",
            easy: ["The Fallen (Muy directo. Te da competencia en armas marciales y te deja usarlas para tu Iridescent Strike. Su Archon Form es un tanque que provoca con Divine Challenge.)", "The Titan (El tanque definitivo. Ganas más vida con Elder Fortitude y tu Archon Form se hace Gigante con Elder Growth.)"],
            hard: ["The Mythic Hero (Reemplaza tus hechizos de subclase por Mythic Exploits, un sistema completamente nuevo de maniobras con sus propios dados, que debes gestionar.)", "The Parasite (Muy complejo. Tu Archon Form usa su reacción, para almacenar habilidades de monstruos y usarlas después.)"]
        },
        "Warden": {
            advice: "¡Eres el muro impenetrable! Tu Constitución es tu estadística principal. Tu ciclo de combate gira en torno a tu bonus action para tu Guardian Tactics: usa Block para que un aliado use tu AC, Challenge para forzar a un enemigo a atacarte, o Grasp para que no escapen. Tu Reacción es vital: ¡guarda tu Interrupt para anular el ataque múltiple más peligroso de un enemigo! No sos un DPS, sos el protector que permite que los demás brillen.",
            easy: ["Godsworn (Un protector de apoyo simple que mejora Block con un d4 a tiradas y da acceso a hechizos de clérigo)", "Windkeeper (Control simple del campo de batalla para empujar y tirar de los enemigos)"],
            hard: ["Cosmic Seeker (Requiere gestionar la posición de tus Planetarium orbs para extender el rango de tus Tactics)", "Eye of Twilight (Gestión de una espada móvil que aplica tus efectos y requiere posicionamiento)"]
        },
        "Warlock": {
            advice: "¡Tu pacto define tu poder! tu elección más crucial ocurre en el nivel 1 con tu Pact Boon, ya que este define tu habilidad de lanzamiento de hechizos. Además, eres un lanzador preparado que recupera sus espacios de conjuro en un Long Rest, no en uno corto.¡Combina tu Patron y tus Eldritch Invocations para crear un especialista único!",
            easy: ["The Fiend (Ganas Temporary Hit Points al matar y puedes alterar el destino con Dark One's Own Luck)", "The Hexblade (Usa tu estadística de conjuros para atacar con Hex Warrior y aplica una potente maldición con Hexblade's Curse)"],
            hard: ["The Alabaster (Requiere gestión de una mascota completa, tu Bound Guardian. Debes comandarlo con tu bonus action y gestionar sus propios recursos, para tus habilidades)", "The Magician (Depende de múltiples ability checks. tus features te obligan a hacer ability checks para lanzar cantrips que no conoces o transmutar tus hechizos, con un riesgo real de que el conjuro falle)"]
        },
        "Warlord": {
            advice: "¡La batalla es una sinfonía y tú eres el director! Tu verdadera fuerza no está en tu espada, sino en tus aliados. Tu economía de acción se centra en potenciar a tu equipo: usa tu Inspiring Word como bonus action para curar y tus Tactical Exploits para darles acciones extra a tus compañeros. Tu Leadership Style define tu estadística principal y tu rol en el combate. ¡Tu éxito es el éxito del grupo!",
            easy: ["Academy of Chivalry (Un caballero de primera línea que usa sus reacciones para que los aliados superen salvaciones y da attack orders adicionales)", "Academy of Liberty (Un líder popular que da support orders como bonus action y usa su reacción para repartir el daño entre el grupo)"],
            hard: ["Academy of Dawnbringer (Gestiona un nuevo recurso, que aplicas a los aliados y detonas con tu acción para dar temp HP )", "Academy of Zeal (Añade lanzamiento de hechizos de la lista del Clérigo y usos de Channel Divinity)"]
        },
        "Warmage": {
            advice: "¡Tu poder no está en grandes hechizos, sino en la perfección de los cantrips! Tu Warmage Edge es tu principal fuente de daño; asegúrate de usarlo cada turno. Los Warmage Tricks son tu caja de herramientas: elige trucos que se sincronicen con tus cantrips favoritos. Guarda tu Arcane Surge para el momento decisivo en que necesites duplicar ese daño.",
            easy: ["House of Lancers (El monje arcano. Combina Unarmored Defense basada en INT con Hand-to-Hand Arcana y Shock Trooper para alta movilidad)", "House of Pawns (La subclase versátil. Gana Warmage Tricks adicionales y puede tomar prestados los mejores tricks de otras subclases)"],
            hard: ["House of Roulette (Extremadamente compleja. Debes gestionar Chips of Fate y apostar en una tabla de d100 con Spin the Wheel como bonus action)", "House of Dice (Muy aleatoria y gestiona Dice of Fate. Tu Chaos Roll puede salvarte o lanzarte fireball a ti mismo)"]
        },
        "Witch": {
            advice: "Sos la maestro del control y el debuff! Tu poder principal es la combinación de tus Hexes y la habilidad Insidious Spell. Usa tu Acción para aplicar un Hex clave y luego, en tu siguiente turno, lanza tu gran hechizo de control.  No olvides a tu Familiar; es una de las mejores mascotas del juego: ataca usando tu estadística de hechizo, es más resistente y puedes ordenarle. ¡Y abusa de Cackle! Es tu Acción Bonus clave para mantener tus Hexes activos turno tras turno sin gastar más acciones.",
            easy: ["White Magic (Simple y un sanador muy efectivo.)", "Red Magic (Un blaster directo. Su Hex: Imperil elimina resistencias enemigas y te permite maximizar el daño)"],
            hard: ["Blue Magic (Muy compleja y depende del GM. Dejas de aprender hechizos al subir de nivel.)", "Blood Magic (Alto riesgo, alta recompensa. Gestionas tus Puntos de Vida como un recurso.)"]
        },
        "Wizard": {
            advice: "Sos la definición de un glass cannon. Tu poder reside en tu Spellbook y tu Inteligencia. La preparación de conjuros lo es todo; un mal día de preparación es un mal día de aventura. No olvides usar Arcane Recovery en cada descanso corto para recuperar spell slots. Tu supervivencia depende de tu posicionamiento y tus conjuros defensivos.",
            easy: ["School of Evocation (Muy directo. Te permite lanzar bolas de fuego sin preocuparte por tus aliados.)", "School of Abjuration (Enfocado en la defensa. Ganas un Arcane Ward que te da Temp HP pasivamente y se recarga al lanzar conjuros de abjuración.)"],
            hard: ["School of Automata (Manejo de múltiples pets. Requiere slots de conjuro para crear tus constructs y consume tu bonus action cada turno para comandarlos.)", "Mystic Savant (Añade una mecánica de Battle Dice. Debes gestionar este nuevo recurso y elegir entre una lista de Stratagems.)"]
        }
    };

    // --- 2. DOM REFERENCES ---
    const assistantContainer = document.getElementById("dndAssistant");
    const assistantImage = document.getElementById("assistantImage");
    const assistantBubble = document.getElementById("assistantBubble");
    const assistantTitle = document.getElementById("assistantTitle");
    const assistantAdvice = document.getElementById("assistantAdvice");
    const assistantEasy = document.getElementById("assistantEasy");
    const assistantHard = document.getElementById("assistantHard");

    // Referencias a las imágenes del DOM principal (de script.js)
    const mainClassImage = document.getElementById("classImage");
    const galleryModalImage = document.getElementById("modalImage");

    let currentClass = null; // Para saber qué consejo mostrar
    let bubbleHover = false; // Para saber si el mouse está sobre la burbuja
    let iconHover = false;   // Para saber si el mouse está sobre el icono

    // --- 3. CORE FUNCTIONS ---

    /**
     * Actualiza la apariencia y el consejo del asistente.
     * @param {string} className - El nombre de la clase (ej. "Barbarian")
     */
    function updateAssistant(className) {
        // Busca en el array 'classes' (definido en script.js)
        const classDataGlobal = typeof classes !== 'undefined' ? classes.find(c => c.name === className) : null;
        // Busca en nuestros datos de consejos
        const adviceData = assistantData[className];
        
        if (classDataGlobal && adviceData) {
            currentClass = className; // Guardar la clase actual
            
            // --- ¡CAMBIO AQUÍ! ---
            // Extraemos el nombre del archivo (ej: "barbarian.webp") de la ruta original (ej: "images/barbarian.webp")
            const originalImagePath = classDataGlobal.image;
            const filename = originalImagePath.split('/').pop(); // Obtiene "barbarian.webp"
            
            // Construimos la nueva ruta apuntando a la carpeta "assistant"
            const newAssistantImageSrc = "assistant/" + filename; 
            
            assistantImage.src = newAssistantImageSrc; // Usar la nueva ruta
            // --- FIN DEL CAMBIO ---

            assistantTitle.textContent = `Consejo para: ${className}`;
            assistantAdvice.textContent = adviceData.advice;
            assistantEasy.textContent = adviceData.easy.join(", ");
            assistantHard.textContent = adviceData.hard.join(", ");
            
            assistantContainer.classList.remove("hidden"); // Mostrar el asistente
        } else {
            currentClass = null; // No hay datos

            // --- ¡CAMBIO AQUÍ! ---
            // Si no hay clase (o es "default"), mostramos la imagen "default" del asistente
            assistantImage.src = "assistant/default.webp"; 
            // Ya no ocultamos el contenedor, solo la burbuja
            // assistantContainer.classList.add("hidden"); // <- Esta línea se elimina/comenta
            assistantBubble.classList.remove("show"); // Ocultar burbuja
        }
    }

    /**
     * Extrae el nombre de la clase del 'src' de una imagen.
     * Ej: "images/barbarian.webp" -> "Barbarian"
     */
    function getClassNameFromSrc(src) {
        if (!src || typeof classes === 'undefined') return null;
        
        const parts = src.split('/');
        const filename = parts[parts.length - 1]; // "barbarian.webp"
        
        // Usamos el array 'classes' (de script.js) para encontrar el nombre correcto
        const classEntry = classes.find(c => c.image.endsWith(filename));
        return classEntry ? classEntry.name : null; // Devuelve el nombre "bonito" (ej. "Blood Hunter")
    }

    // --- 4. EVENT LISTENERS ---

    // Mostrar/Ocultar burbuja al interactuar con el asistente
    assistantContainer.addEventListener("mouseenter", () => {
        iconHover = true;
        if (currentClass) { // Solo mostrar si hay un consejo
            assistantBubble.classList.add("show");
        }
    });

    assistantContainer.addEventListener("mouseleave", () => {
        iconHover = false;
        // Espera un momento antes de cerrar, por si el usuario se mueve a la burbuja
        setTimeout(() => {
            if (!bubbleHover && !iconHover) {
                 assistantBubble.classList.remove("show");
            }
        }, 100);
    });
    
    // Añadimos listeners a la burbuja misma para que no se cierre
    assistantBubble.addEventListener("mouseenter", () => {
        bubbleHover = true;
    });
    
    assistantBubble.addEventListener("mouseleave", () => {
        bubbleHover = false;
        // Espera un momento
        setTimeout(() => {
            if (!bubbleHover && !iconHover) {
                 assistantBubble.classList.remove("show");
            }
        }, 100);
    });

    // Observador para detectar cambios en las imágenes principales
    const observerCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                const newSrc = mutation.target.src;
                const detectedClass = getClassNameFromSrc(newSrc);
                
                updateAssistant(detectedClass);
                
                // Si la imagen cambia, oculta la burbuja para que el usuario
                // tenga que volver a hacer hover para ver el nuevo consejo.
                assistantBubble.classList.remove("show");
            }
        }
    };

    const observer = new MutationObserver(observerCallback);
    
    // Observar la imagen del "Discover" y la del Modal
    if (mainClassImage) {
        observer.observe(mainClassImage, { attributes: true });
    }
    if (galleryModalImage) {
        observer.observe(galleryModalImage, { attributes: true });
    }
});