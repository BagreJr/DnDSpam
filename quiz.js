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


    function launchConfetti() {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
        // --- QUIZ --- (Keep your Quiz functions: quizQuestions, startQuiz, updateProgress, showQuestion, selectOption, showResult, shuffleArray)
    // Preguntas de ejemplo, puedes agregar
    const quizQuestions = [
    {
        question: "Un mapa antiguo muestra un tesoro en una zona letal. ¿Cómo procedes?",
        options: [
            { text: "Analizo los riesgos y preparo suministros para cada contingencia. Voy solo.", classes: ["Wizard", "Savant", "Magus", "Monk", "Sorcerer"] },
            { text: "Entreno mi cuerpo y afilo mi acero; la fuerza superará cualquier obstáculo.", classes: ["Fighter", "Barbarian", "Blood Hunter", "Vagabond", "Warden"] },
            { text: "Busco aliados que complementen mis debilidades.", classes: ["Binder", "Captain", "Bard", "Paladin", "Warlord"] },
            { text: "Estudio la fauna y el clima para moverme sin ser detectado.", classes: ["Ranger", "Druid", "Shaman", "Commoner", "Psion"] },
            { text: "Recluto mercenarios para que lo hagan y los traiciono.", classes: ["Illrigger", "Rogue", "Gunslinger", "Necromancer", "Witch"] },
            { text: "Creo algo mecánico o químico que me ayude.", classes: ["Craftsman", "Gadgeteer", "Artificer", "Alchemist", "Warmage"] },
            { text: "Una entidad superior me guiará.", classes: ["Cleric", "Warlock", "Investigator", "Vessel", "Martyr"] }
        ]
    },
    {
        question: "Una ciudad está bajo asedio. ¿Cuál es tu contribución principal a la defensa?",
        options: [
            { text: "Lidero desde la muralla, inspirando a los hombres con mi valor.", classes: ["Paladin", "Captain", "Warlord", "Fighter", "Warden"] },
            { text: "Saboteo las máquinas de asedio enemigas bajo el manto de la noche.", classes: ["Rogue", "Gunslinger", "Vagabond", "Investigator", "Savant"] },
            { text: "Desato una tormenta de energía arcana sobre las filas enemigas.", classes: ["Wizard", "Sorcerer", "Warmage", "Magus", "Warlock"] },
            { text: "Sano a los heridos y protejo las almas de los caídos.", classes: ["Cleric", "Martyr", "Vessel", "Shaman", "Druid"] },
            { text: "Fabrico defensas automatizadas y fortificaciones rápidas.", classes: ["Artificer", "Craftsman", "Gadgeteer", "Alchemist", "Commoner"] },
            { text: "Maldigo al ejército enemigo para sembrar el pánico en sus filas.", classes: ["Witch", "Necromancer", "Illrigger", "Binder", "Blood Hunter"] },
            { text: "Uso mi control mental para que los enemigos se ataquen entre sí.", classes: ["Psion", "Monk", "Bard", "Vessel", "Savant"] }
        ]
    },
    {
        question: "Encuentras una ruina sellada con magia antigua. ¿Cómo intentas abrirla?",
        options: [
            { text: "Decodifico los glifos usando mi intelecto y libros de referencia.", classes: ["Wizard", "Savant", "Investigator", "Alchemist", "Psion"] },
            { text: "Forzo la entrada usando herramientas de precisión o explosivos.", classes: ["Gunslinger", "Rogue", "Artificer", "Gadgeteer", "Craftsman"] },
            { text: "Intento una comunión espiritual con los guardianes del lugar.", classes: ["Shaman", "Druid", "Binder", "Cleric", "Monk"] },
            { text: "Uso la fuerza bruta para derribar la entrada.", classes: ["Barbarian", "Fighter", "Warden", "Blood Hunter", "Vagabond"] },
            { text: "Utilizo mi carisma para 'convencer' a la magia o a los guardianes.", classes: ["Bard", "Sorcerer", "Warlock", "Captain", "Warlord"] },
            { text: "Ofrezco una gota de mi sangre o un sacrificio para activar el sello.", classes: ["Martyr", "Blood Hunter", "Witch", "Necromancer", "Vessel"] },
            { text: "Busco una entrada natural que el tiempo haya creado.", classes: ["Ranger", "Commoner", "Druid", "Vagabond", "Shaman"] }
        ]
    },
    {
        question: "Un gremio te ofrece un contrato peligroso. ¿Qué es lo que más te interesa?",
        options: [
            { text: "El conocimiento u objetos raros que pueda encontrar.", classes: ["Wizard", "Savant", "Artificer", "Warlock", "Investigator"] },
            { text: "El pago en oro puro y la fama que esto me traerá.", classes: ["Gunslinger", "Rogue", "Bard", "Captain", "Illrigger"] },
            { text: "La oportunidad de probar mis habilidades contra enemigos dignos.", classes: ["Fighter", "Barbarian", "Monk", "Magus", "Warmage"] },
            { text: "Cumplir con mi deber y proteger a los inocentes involucrados.", classes: ["Paladin", "Cleric", "Warden", "Martyr", "Warlord"] },
            { text: "Materiales raros para mis inventos o pociones.", classes: ["Alchemist", "Craftsman", "Gadgeteer", "Necromancer", "Witch"] },
            { text: "Asegurarme de que la misión no altere el equilibrio natural.", classes: ["Druid", "Ranger", "Shaman", "Commoner", "Psion"] },
            { text: "La posibilidad de obtener un favor de una entidad poderosa.", classes: ["Binder", "Vessel", "Warlock", "Illrigger", "Sorcerer"] }
        ]
    },
    {
        question: "El grupo se pierde en un bosque encantado. ¿Cómo tomas el control?",
        options: [
            { text: "Interpreto las estrellas y el flujo de energía para encontrar la salida.", classes: ["Wizard", "Psion", "Savant", "Magus", "Shaman"] },
            { text: "Rastreo las huellas y estudio la vegetación para orientarnos.", classes: ["Ranger", "Druid", "Vagabond", "Investigator", "Commoner"] },
            { text: "Mantengo al grupo unido y enfocado mediante la disciplina.", classes: ["Captain", "Warlord", "Paladin", "Monk", "Fighter"] },
            { text: "Uso la música o historias para evitar que el miedo nos domine.", classes: ["Bard", "Sorcerer", "Vessel", "Warlock", "Binder"] },
            { text: "Construyo un dispositivo de navegación o uso químicos para marcar el camino.", classes: ["Artificer", "Gadgeteer", "Alchemist", "Craftsman", "Warmage"] },
            { text: "Camino al frente, recibiendo cualquier golpe que el bosque nos envíe.", classes: ["Warden", "Barbarian", "Blood Hunter", "Martyr", "Cleric"] },
            { text: "Busco atajos a través de los planos o sombras.", classes: ["Rogue", "Illrigger", "Necromancer", "Witch", "Gunslinger"] }
        ]
    },

    // --- TEMÁTICA 2: DIVERTIDAS (6-10) ---
    {
        question: "¡Un gnomo te ha robado los pantalones mientras dormías! ¿Qué haces?",
        options: [
            { text: "Lanzo un hechizo de localización y teletransporto mis pantalones.", classes: ["Wizard", "Sorcerer", "Warmage", "Psion", "Magus"] },
            { text: "Lo persigo gritando furiosamente hasta que se asuste.", classes: ["Barbarian", "Fighter", "Vagabond", "Gunslinger", "Blood Hunter"] },
            { text: "Organizo una partida de búsqueda con un plan táctico.", classes: ["Captain", "Warlord", "Investigator", "Savant", "Paladin"] },
            { text: "Le pido a los pájaros del bosque que recuperen mi prenda.", classes: ["Druid", "Ranger", "Shaman", "Commoner", "Bard"] },
            { text: "Le tiendo una trampa tecnológica con resortes y redes.", classes: ["Artificer", "Gadgeteer", "Craftsman", "Alchemist", "Rogue"] },
            { text: "Invoco a mi patrón o espíritu para que lo castigue.", classes: ["Warlock", "Binder", "Vessel", "Witch", "Cleric"] },
            { text: "Simplemente acepto que ahora soy un aventurero sin pantalones.", classes: ["Martyr", "Monk", "Commoner", "Vagabond", "Shaman"] }
        ]
    },
    {
        question: "En una fiesta, alguien te reta a un concurso de beber. ¿Cuál es tu estrategia?",
        options: [
            { text: "Uso mis conocimientos de alquimia para neutralizar el alcohol.", classes: ["Alchemist", "Savant", "Artificer", "Investigator", "Wizard"] },
            { text: "Confío en mi constitución física superior para aguantar más.", classes: ["Barbarian", "Fighter", "Warden", "Blood Hunter", "Commoner"] },
            { text: "Hago trucos de manos para vaciar mi copa en el suelo sin que me vean.", classes: ["Rogue", "Bard", "Gunslinger", "Vagabond", "Illrigger"] },
            { text: "Convierto el reto en un espectáculo musical para distraer al rival.", classes: ["Bard", "Captain", "Sorcerer", "Warlord", "Binder"] },
            { text: "Transfiero el efecto del alcohol a un objeto o sombra cercana.", classes: ["Warlock", "Witch", "Necromancer", "Vessel", "Psion"] },
            { text: "Uso mi energía interior para purificar mi cuerpo constantemente.", classes: ["Monk", "Paladin", "Cleric", "Martyr", "Magus"] },
            { text: "Simplemente no bebo; el deber siempre es lo primero.", classes: ["Warlord", "Captain", "Paladin", "Ranger", "Druid"] }
        ]
    },
    {
        question: "Un dragón te invita a cenar en lugar de comerte. ¿De qué hablas con él?",
        options: [
            { text: "De historia antigua y los secretos de la magia arcana.", classes: ["Wizard", "Savant", "Magus", "Warmage", "Psion"] },
            { text: "De estrategias militares y las debilidades de los reinos vecinos.", classes: ["Warlord", "Captain", "Fighter", "Illrigger", "Gunslinger"] },
            { text: "De la belleza de la naturaleza y el equilibrio de los planos.", classes: ["Druid", "Ranger", "Shaman", "Monk", "Commoner"] },
            { text: "De ingeniería, forja y cómo mejorar su guarida.", classes: ["Craftsman", "Artificer", "Gadgeteer", "Alchemist", "Investigator"] },
            { text: "Le cuento historias épicas y canciones de otros dragones.", classes: ["Bard", "Sorcerer", "Vessel", "Binder", "Warlock"] },
            { text: "De filosofía, moralidad y la redención de las almas.", classes: ["Cleric", "Paladin", "Martyr", "Warden", "Monk"] },
            { text: "De los mejores lugares para robar tesoros sin ser detectado.", classes: ["Rogue", "Vagabond", "Gunslinger", "Blood Hunter", "Necromancer"] }
        ]
    },
    {
        question: "Tu mascota (o familiar) empieza a hablar y dice que es un dios. ¿Cómo reaccionas?",
        options: [
            { text: "Tomo notas exhaustivas para un tratado teológico.", classes: ["Savant", "Investigator", "Wizard", "Alchemist", "Cleric"] },
            { text: "Le pido inmediatamente que bendiga mi equipo de combate.", classes: ["Fighter", "Gunslinger", "Paladin", "Craftsman", "Warden"] },
            { text: "Le exijo que me otorgue un nuevo nivel de poder o hechizos.", classes: ["Warlock", "Binder", "Sorcerer", "Vessel", "Magus"] },
            { text: "Le pregunto por qué no me ayudó a limpiar la casa antes.", classes: ["Commoner", "Bard", "Vagabond", "Ranger", "Shaman"] },
            { text: "Analizo si es una alucinación o un truco mental de un enemigo.", classes: ["Psion", "Monk", "Savant", "Witch", "Necromancer"] },
            { text: "Le pido que lidere a mi ejército/seguidores.", classes: ["Captain", "Warlord", "Illrigger", "Paladin", "Captain"] },
            { text: "Fabrico un altar tecnológico para amplificar su voz.", classes: ["Artificer", "Gadgeteer", "Warmage", "Artificer", "Gadgeteer"] }
        ]
    },
    {
        question: "Te encuentras un botón rojo en medio de una mazmorra que dice 'NO TOCAR'.",
        options: [
            { text: "Lo presiono inmediatamente para ver qué sucede por curiosidad.", classes: ["Sorcerer", "Bard", "Barbarian", "Commoner", "Vagabond"] },
            { text: "Analizo el mecanismo para detectar trampas antes de decidir.", classes: ["Artificer", "Rogue", "Investigator", "Savant", "Gadgeteer"] },
            { text: "Lanzo un conjuro de protección y luego lo presiono.", classes: ["Wizard", "Magus", "Warmage", "Warlock", "Cleric"] },
            { text: "Le ordeno a un subordinado o mercenario que lo toque por mí.", classes: ["Captain", "Warlord", "Illrigger", "Necromancer", "Binder"] },
            { text: "Me alejo; no vale la pena arriesgar el equilibrio de la misión.", classes: ["Ranger", "Monk", "Warden", "Druid", "Shaman"] },
            { text: "Rezo para que nadie más lo toque y pongo una advertencia.", classes: ["Paladin", "Martyr", "Cleric", "Vessel", "Warden"] },
            { text: "Intento desmantelar el botón para ver sus componentes.", classes: ["Craftsman", "Alchemist", "Artificer", "Gunslinger", "Blood Hunter"] }
        ]
    },

    // --- TEMÁTICA 3: MORALIDAD (11-15) ---
    {
        question: "Un huérfano roba pan para sus hermanos. El guardia te pide ayuda para atraparlo.",
        options: [
            { text: "Ayudo al guardia; la ley es la ley sin excepciones.", classes: ["Paladin", "Warlord", "Fighter", "Investigator", "Illrigger"] },
            { text: "Distraigo al guardia para que el niño escape.", classes: ["Rogue", "Bard", "Vagabond", "Commoner", "Ranger"] },
            { text: "Pago el pan del niño y le doy un sermón sobre la rectitud.", classes: ["Cleric", "Monk", "Warden", "Captain", "Savant"] },
            { text: "Uso magia para hacer que el guardia olvide lo que pasó.", classes: ["Wizard", "Psion", "Sorcerer", "Witch", "Warlock"] },
            { text: "Llevo al niño conmigo para entrenarlo como mi aprendiz.", classes: ["Magus", "Warmage", "Binder", "Blood Hunter", "Artificer"] },
            { text: "Sufro por no poder salvar a todos y me ofrezco a ir preso por él.", classes: ["Martyr", "Vessel", "Shaman", "Druid", "Cleric"] },
            { text: "Ignoro la situación; el mundo es cruel y cada quien sobrevive como puede.", classes: ["Gunslinger", "Necromancer", "Barbarian", "Alchemist", "Gadgeteer"] }
        ]
    },
    {
        question: "Tu patrón o deidad te ordena hacer algo que va en contra de tus valores personales.",
        options: [
            { text: "Obedezco sin cuestionar; mi poder proviene de ellos.", classes: ["Warlock", "Cleric", "Binder", "Vessel", "Necromancer"] },
            { text: "Busco un vacío legal en el contrato para evitar la tarea.", classes: ["Savant", "Wizard", "Rogue", "Investigator", "Illrigger"] },
            { text: "Me rebelo abiertamente, aunque pierda mi poder.", classes: ["Barbarian", "Fighter", "Martyr", "Vagabond", "Paladin"] },
            { text: "Trato de convencer a mi patrón de que hay una forma mejor.", classes: ["Bard", "Captain", "Warlord", "Sorcerer", "Shaman"] },
            { text: "Busco una solución tecnológica que reemplace el sacrificio pedido.", classes: ["Artificer", "Alchemist", "Gadgeteer", "Craftsman", "Warmage"] },
            { text: "Me retiro a meditar para encontrar el equilibrio entre ambos.", classes: ["Monk", "Druid", "Ranger", "Psion", "Warden"] },
            { text: "Realizo la tarea, pero uso el dolor para volverme más fuerte.", classes: ["Blood Hunter", "Martyr", "Necromancer", "Magus", "Witch"] }
        ]
    },
    {
        question: "Tienes la oportunidad de obtener un poder inmenso, pero alguien inocente sufrirá.",
        options: [
            { text: "Rechazo el poder; la integridad vale más que la fuerza.", classes: ["Paladin", "Cleric", "Monk", "Warden", "Ranger"] },
            { text: "Tomo el poder; el fin justifica los medios para un bien mayor.", classes: ["Illrigger", "Warlord", "Captain", "Wizard", "Magus"] },
            { text: "Busco una forma de dividir el sufrimiento entre muchos para que sea leve.", classes: ["Savant", "Investigator", "Alchemist", "Warmage", "Psion"] },
            { text: "Acepto el poder y el sufrimiento yo mismo.", classes: ["Martyr", "Blood Hunter", "Vessel", "Shaman", "Druid"] },
            { text: "Engaño a la fuente del poder para obtenerlo sin pagar el precio.", classes: ["Rogue", "Warlock", "Witch", "Binder", "Gunslinger"] },
            { text: "Destruyo la fuente del poder para que nadie más caiga en la tentación.", classes: ["Barbarian", "Fighter", "Vagabond", "Artificer", "Commoner"] },
            { text: "Lo convierto en una historia sobre la ambición humana.", classes: ["Bard", "Sorcerer", "Commoner", "Vagabond", "Savant"] }
        ]
    },
    {
        question: "Un antiguo enemigo está indefenso y pide clemencia. ¿Qué haces?",
        options: [
            { text: "Lo ejecuto inmediatamente; la justicia ha llegado.", classes: ["Fighter", "Gunslinger", "Blood Hunter", "Illrigger", "Barbarian"] },
            { text: "Lo perdono y lo dejo ir, esperando que cambie.", classes: ["Cleric", "Paladin", "Martyr", "Druid", "Commoner"] },
            { text: "Lo entrego a las autoridades para un juicio justo.", classes: ["Captain", "Warlord", "Investigator", "Warden", "Monk"] },
            { text: "Le borro la memoria y le doy una nueva vida.", classes: ["Wizard", "Psion", "Sorcerer", "Witch", "Savant"] },
            { text: "Lo convierto en mi sirviente o lo ligo a mi voluntad.", classes: ["Necromancer", "Binder", "Vessel", "Warlock", "Magus"] },
            { text: "Lo uso como sujeto de pruebas para mis experimentos.", classes: ["Alchemist", "Artificer", "Gadgeteer", "Warmage", "Craftsman"] },
            { text: "Le robo todas sus pertenencias y lo abandono en el bosque.", classes: ["Rogue", "Vagabond", "Ranger", "Shaman", "Gunslinger"] }
        ]
    },
    {
        question: "Descubres que tu reino es próspero gracias a un pacto oscuro secreto.",
        options: [
            { text: "Expongo la verdad al pueblo, aunque traiga el caos.", classes: ["Bard", "Barbarian", "Vagabond", "Commoner", "Paladin"] },
            { text: "Mantengo el secreto para preservar la paz y la prosperidad.", classes: ["Warlord", "Captain", "Illrigger", "Investigator", "Warden"] },
            { text: "Busco una forma mágica de romper el pacto sin perder la prosperidad.", classes: ["Wizard", "Savant", "Magus", "Psion", "Warmage"] },
            { text: "Trato de renegociar el pacto con la entidad oscura.", classes: ["Warlock", "Binder", "Vessel", "Witch", "Sorcerer"] },
            { text: "Me aseguro de que el precio del pacto lo paguen los criminales.", classes: ["Rogue", "Blood Hunter", "Necromancer", "Gunslinger", "Fighter"] },
            { text: "Me retiro del reino; no quiero ser parte de esa mancha.", classes: ["Druid", "Ranger", "Shaman", "Monk", "Martyr"] },
            { text: "Fortalezco las defensas tecnológicas para cuando el pacto falle.", classes: ["Artificer", "Alchemist", "Gadgeteer", "Craftsman", "Artificer"] }
        ]
    },

    // --- TEMÁTICA 4: ASERTIVIDAD / TURBULENCIA (16-20) ---
    {
        question: "En una discusión grupal, todos están en desacuerdo contigo. ¿Cómo actúas?",
        options: [
            { text: "Impongo mi voluntad; sé que tengo razón.", classes: ["Captain", "Warlord", "Barbarian", "Illrigger", "Fighter"] },
            { text: "Trato de mediar y encontrar un punto medio que todos acepten.", classes: ["Bard", "Cleric", "Paladin", "Warden", "Commoner"] },
            { text: "Presento pruebas lógicas y datos para convencerlos.", classes: ["Savant", "Investigator", "Wizard", "Alchemist", "Artificer"] },
            { text: "Me retiro y hago las cosas a mi manera por separado.", classes: ["Rogue", "Vagabond", "Ranger", "Monk", "Gunslinger"] },
            { text: "Me adapto a lo que la mayoría quiera para evitar conflictos.", classes: ["Druid", "Shaman", "Martyr", "Vessel", "Commoner"] },
            { text: "Uso sutil manipulación emocional para que cambien de opinión.", classes: ["Warlock", "Witch", "Sorcerer", "Binder", "Psion"] },
            { text: "Dejo que el azar (o los dados) decida el camino.", classes: ["Gunslinger", "Bard", "Vagabond", "Warmage", "Magus"] }
        ]
    },
    {
        question: "Cuando fallas en una tarea importante, ¿qué es lo primero que piensas?",
        options: [
            { text: "Debo entrenar más duro para que no vuelva a pasar.", classes: ["Fighter", "Monk", "Warden", "Magus", "Warmage"] },
            { text: "Alguien o algo me saboteó; esto no fue mi culpa.", classes: ["Illrigger", "Warlock", "Witch", "Gunslinger", "Rogue"] },
            { text: "Analizo el error minuciosamente para aprender la lección.", classes: ["Savant", "Wizard", "Investigator", "Artificer", "Alchemist"] },
            { text: "Es una señal de que el destino tiene otro camino para mí.", classes: ["Cleric", "Druid", "Shaman", "Vessel", "Binder"] },
            { text: "Me hundo en la autocrítica y el arrepentimiento.", classes: ["Martyr", "Commoner", "Vagabond", "Blood Hunter", "Vessel"] },
            { text: "Busco una forma de convertir el fallo en una broma o anécdota.", classes: ["Bard", "Sorcerer", "Commoner", "Vagabond", "Bard"] },
            { text: "Lidero al grupo para arreglar el desastre de inmediato.", classes: ["Captain", "Warlord", "Paladin", "Fighter", "Warlord"] }
        ]
    },
    {
        question: "Te ofrecen un puesto de liderazgo permanente en una ciudad próspera.",
        options: [
            { text: "Acepto; nací para gobernar y organizar.", classes: ["Captain", "Warlord", "Savant", "Paladin", "Illrigger"] },
            { text: "Rechazo; mi libertad y el camino son lo único que importa.", classes: ["Vagabond", "Barbarian", "Ranger", "Gunslinger", "Rogue"] },
            { text: "Solo acepto si puedo usar la ciudad como laboratorio para mis ideas.", classes: ["Artificer", "Alchemist", "Wizard", "Gadgeteer", "Craftsman"] },
            { text: "Acepto, pero solo para proteger a la naturaleza o a los pobres.", classes: ["Druid", "Shaman", "Cleric", "Warden", "Commoner"] },
            { text: "Me aterra la responsabilidad y huyo de la oferta.", classes: ["Commoner", "Vagabond", "Martyr", "Witch", "Psion"] },
            { text: "Acepto para tener acceso a los recursos secretos del gobierno.", classes: ["Investigator", "Warlock", "Necromancer", "Magus", "Warmage"] },
            { text: "Pido que el grupo gobierne conmigo como un consejo.", classes: ["Bard", "Sorcerer", "Binder", "Blood Hunter", "Vessel"] }
        ]
    },
    {
        question: "¿Qué tan cómodo te sientes siendo el centro de atención?",
        options: [
            { text: "Me encanta; brillo cuando todos me miran.", classes: ["Bard", "Sorcerer", "Captain", "Paladin", "Warlord"] },
            { text: "Prefiero las sombras; el verdadero poder actúa sin ser visto.", classes: ["Rogue", "Investigator", "Illrigger", "Witch", "Necromancer"] },
            { text: "Me es indiferente, siempre que el trabajo se haga bien.", classes: ["Fighter", "Warden", "Monk", "Savant", "Wizard"] },
            { text: "Me pone nervioso; prefiero pasar desapercibido.", classes: ["Commoner", "Vagabond", "Druid", "Ranger", "Shaman"] },
            { text: "Uso el centro de atención para difundir un mensaje o fe.", classes: ["Cleric", "Martyr", "Vessel", "Binder", "Psion"] },
            { text: "Solo me importa si el público es gente que respeto.", classes: ["Magus", "Warmage", "Artificer", "Alchemist", "Blood Hunter"] },
            { text: "Depende de cuántas armas tenga cargadas en ese momento.", classes: ["Gunslinger", "Barbarian", "Fighter", "Craftsman", "Gadgeteer"] }
        ]
    },
    {
        question: "El mundo está llegando a su fin. ¿Cuál es tu última acción?",
        options: [
            { text: "Lucho hasta el último suspiro contra el fin.", classes: ["Fighter", "Barbarian", "Paladin", "Warden", "Blood Hunter"] },
            { text: "Me reúno con mis seres queridos y acepto el destino en paz.", classes: ["Commoner", "Druid", "Shaman", "Martyr", "Cleric"] },
            { text: "Intento un hechizo o invento de último minuto para salvar la realidad.", classes: ["Wizard", "Artificer", "Savant", "Alchemist", "Gadgeteer"] },
            { text: "Me aseguro de que el fin sea lo más espectacular y épico posible.", classes: ["Bard", "Sorcerer", "Gunslinger", "Warlord", "Warmage"] },
            { text: "Intento escapar a otro plano o dimensión.", classes: ["Warlock", "Psion", "Magus", "Rogue", "Vessel"] },
            { text: "Aprovecho el caos para saldar todas mis cuentas pendientes.", classes: ["Illrigger", "Investigator", "Necromancer", "Witch", "Vagabond"] },
            { text: "Trato de mediar con la fuerza que causa el fin del mundo.", classes: ["Binder", "Captain", "Vessel", "Warlock", "Shaman"] }
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
			{ text: "La Invocadora", classes: ["Necromancer","Shaman"] },
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
    quizProgress.classList.add('hidden');

    let score = {};
    answers.forEach(selected => {
        if (selected) {
            selected.forEach(cls => {
                score[cls] = (score[cls] || 0) + 1;
            });
        }
    });

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
        const finalClass = classes.find(c => c.name === result);
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
        // --- CASO MULTICLASE ---
        resultHTML = `
            <h3>¡Eres Multiclase!</h3>
            <p>Tus inclinaciones son tan variadas que no encajas en un solo molde. Tienes afinidad con:</p>
            <div style="margin: 20px 0;">
                <img src="images/multiclass.webp" alt="Multiclase" style="width:400px; max-width:90%; border-radius:10px; box-shadow: 0 0 15px rgba(255,215,0,0.5);">
            </div>
            <ul>`;
        
        topClasses.forEach(clsName => {
            const clsData = classes.find(c => c.name === clsName);
            if(clsData) {
                resultHTML += `<li><strong>${clsData.name}</strong> (<a href="${clsData.link}" target="_blank">Ver Detalles</a>)</li>`;
            } else {
                resultHTML += `<li><strong>${clsName}</strong></li>`;
            }
        });
        
        resultHTML += `</ul><p>¡Eres un personaje versátil capaz de dominar múltiples artes!</p>`;
    }

    quizResult.innerHTML = resultHTML + `<br><button id="restartQuiz" class="btn-primary">Volver al inicio</button>`;

    launchConfetti();

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
