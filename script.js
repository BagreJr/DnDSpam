document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("discoverButton");
    const classImage = document.getElementById("classImage");
    const className = document.getElementById("className");
    const classDescription = document.getElementById("classDescription");
    const galleryContainer = document.getElementById("galleryContainer");
    const galleryButton = document.getElementById("toggleGalleryButton");
    const gallery = document.getElementById("gallery");

    // Lista de clases con imágenes y descripciones
    const classes = [
{ name: "Alchemist", image: "images/alchemist.webp", description: "Un genio de las ciencias mágicas y la creación de pociones y elixires.", link: "https://homebrewery.naturalcrit.com/share/km9PgnczNSRA" },
{ name: "Artificer", image: "images/artificer.webp", description: "Maestros de la magia y la tecnología, que crean artefactos mágicos y construcciones complejas.", link: "https://homebrewery.naturalcrit.com/share/XlnxbXPJwSb_" },
{ name: "Barbarian", image: "images/barbarian.webp", description: "Guerreros primitivos que canalizan su furia en combate, capaces de resistir grandes daños y desatar su fuerza bruta.", link: "https://homebrewery.naturalcrit.com/share/EMNC8JdcJ-I1" },
{ name: "Bard", image: "images/bard.webp", description: "Músicos encantadores y maestros de la magia, cuya música inspira y controla la magia.", link: "https://homebrewery.naturalcrit.com/share/nqImfN7DQmo8" },
{ name: "Binder", image: "images/binder.webp", description: "Mortal que establece pactos con entidades sobrenaturales para obtener poder.", link: "https://homebrewery.naturalcrit.com/share/Rq5NbuBPOkD5" },
{ name: "Blood Hunter", image: "images/blood_hunter.webp", description: "Cazadores que emplean magia oscura y sacrificios de sangre para cazar monstruos y defender a los inocentes.", link: "https://homebrewery.naturalcrit.com/share/zB7dBsU3NoaA" },
{ name: "Captain", image: "images/captain.webp", description: "Un líder carismático y estratega, que guía a sus compañeros con autoridad y determinación.", link: "https://homebrewery.naturalcrit.com/share/4_dADwfpFgLl" },
{ name: "Cleric", image: "images/cleric.webp", description: "Canalizan el poder de los dioses para sanar, proteger y combatir las fuerzas del mal.", link: "https://homebrewery.naturalcrit.com/share/ypjQ6cODzLs3" },
{ name: "Craftsman", image: "images/craftsman.webp", description: "Experto en la creación de objetos mágicos y artefactos con fines prácticos o poderosos.", link: "https://homebrewery.naturalcrit.com/share/MnBaupC_WVWe" },
{ name: "Druid", image: "images/druid.webp", description: "Guardianes de la naturaleza con habilidades para transformarse en animales y controlar los elementos naturales.", link: "https://homebrewery.naturalcrit.com/share/e3kR64Zn-Qin" },
{ name: "Fighter", image: "images/fighter.webp", description: "Guerrero experto en el combate físico, con habilidades para dominar cualquier tipo de arma.", link: "https://homebrewery.naturalcrit.com/share/ObJ7sUAx1Ggn" },
{ name: "Gadgeteer", image: "images/gadgeteer.webp", description: "Inventor que utiliza una combinación de ingenio y dispositivos mecánicos para resolver cualquier problema.", link: "https://homebrewery.naturalcrit.com/share/1pBjFWWMDUME" },
{ name: "Gunslinger", image: "images/gunslinger.webp", description: "Tirador experto con pistolas, rápido en el combate y letal con cada disparo.", link: "https://homebrewery.naturalcrit.com/share/K2ZWpZUCPF_Q" },
{ name: "Illrigger", image: "images/illriger.webp", description: "Un individuo que forja contratos oscuros con entidades infernales para obtener poder a cambio de su alma.", link: "https://homebrewery.naturalcrit.com/share/YkHqcotv-KCQ" },
{ name: "Investigator", image: "images/investigador.webp", description: "Profesional en resolver misterios y desentrañar secretos, con una mente aguda y habilidades excepcionales para el rastreo.", link: "https://homebrewery.naturalcrit.com/share/Vdd_tiCoHg9d" },
{ name: "Magus", image: "images/magus.webp", description: "Talentoso en el uso de magia mediante el dominio de espadas y hechizos combinados.", link: "https://homebrewery.naturalcrit.com/share/ghElGwEE2Io9" },
{ name: "Martyr", image: "images/martyr.webp", description: "Héroe que sacrifica su propio bienestar por el bien de los demás, con un fuerte sentido del sacrificio y la redención.", link: "https://homebrewery.naturalcrit.com/share/o8FUKqZUgoT7" },
{ name: "Monk", image: "images/monk.webp", description: "Experto en artes marciales y en la meditación, que canaliza su energía interior para mejorar sus habilidades físicas y espirituales.", link: "https://homebrewery.naturalcrit.com/share/guTke3mXD9Nk" },
{ name: "Necromancer", image: "images/necromancer.webp", description: "Ente que manipula las fuerzas de la muerte y controla a los muertos para servir a sus fines oscuros.", link: "https://homebrewery.naturalcrit.com/share/yrujLNR8NHGX" },
{ name: "Paladin", image: "images/paladin.webp", description: "Caballero sagrado que combate el mal con el poder divino y un fuerte código de honor.", link: "https://homebrewery.naturalcrit.com/share/QL_7_qGcSaio" },
{ name: "Ranger", image: "images/ranger.webp", description: "Explorador experto en el uso de arcos y el sigilo, con un vínculo profundo con la naturaleza.", link: "https://homebrewery.naturalcrit.com/share/usNwevklFcoN" },
{ name: "Rogue", image: "images/rogue.webp", description: "Experto en el sigilo, la evasión y las trampas, ideal para misiones que requieren astucia y agilidad.", link: "https://homebrewery.naturalcrit.com/share/TQg2QgZKbsDv" },
{ name: "Savant", image: "images/savant.webp", description: "Conocedor profundo de las artes arcanas o la ciencia, con habilidades excepcionales para el estudio y la enseñanza.", link: "https://homebrewery.naturalcrit.com/share/3Lw7KbWJnUsy" },
{ name: "Sorcerer", image: "images/sorcerer.webp", description: "Un hechicero que canaliza su magia a través de su linaje o conexión con fuerzas sobrenaturales.", link: "https://homebrewery.naturalcrit.com/share/NOEmC8CLMj9P" },
{ name: "Vessel", image: "images/vessel.webp", description: "Un ser marcado por una conexión especial con espíritus, otorgándole poderes místicos y transformadores.", link: "https://homebrewery.naturalcrit.com/share/vBYpvFeHFy6v" },
{ name: "Warden", image: "images/warden.webp", description: "Defensores de tierras y territorios, especializados en la protección de lo que es sagrado o valioso.", link: "https://homebrewery.naturalcrit.com/share/90VpGRQPU-Cn" },
{ name: "Warlock", image: "images/warlock.webp", description: "Ser que obtiene poder mediante pactos con entidades sobrenaturales a cambio de favores y lealtad.", link: "https://homebrewery.naturalcrit.com/share/kLwQFqpQ7pei" },
{ name: "Warlord", image: "images/warlord.webp", description: "Señor de la guerra, un líder militar que dirige a sus tropas con astucia y habilidad estratégica en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/3IUIglJ_K-O4" },
{ name: "Warmage", image: "images/warmage.webp", description: "Estratega experto que domina un area de magia especializada para devastar a sus enemigos en el campo de batalla.", link: "https://homebrewery.naturalcrit.com/share/rau8aywbKXzF" },
{ name: "Witch", image: "images/witch.webp", description: "Una usuaria de la magia arcana que emplea encantamientos y maldiciones para manipular el destino.", link: "https://homebrewery.naturalcrit.com/share/cl5HbkIH2xFw" },
{ name: "Wizard", image: "images/wizard.webp", description: "Erudito en el estudio y dominio de la magia arcana, capaz de lanzar poderosos hechizos y controlarla con precisión.", link: "https://homebrewery.naturalcrit.com/share/ymEiMM7-iT9H" }
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
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
            let finalClass = classes[Math.floor(Math.random() * classes.length)];

            setTimeout(() => {
                classImage.src = finalClass.image;
                className.textContent = finalClass.name;
                classDescription.innerHTML = `${finalClass.description} <br> <br> <a href="${finalClass.link}" target="_blank">Más información de la clase</a>`;
                classDescription.classList.remove("hidden");
                launchConfetti();

                setTimeout(() => {
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
                caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description }<br> <br> <a href="${selectedClass.link}" target="_blank">Más información de la clase</a>`;
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
		caption.innerHTML = `<strong>${selectedClass.name}</strong><br>${selectedClass.description}<br>
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
