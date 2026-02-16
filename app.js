const formulario1 = document.getElementById('formulario1');
        const formulario2 = document.getElementById('formulario2');
        const Nombre1 = document.getElementById('Nombre1');
        const Nombre2 = document.getElementById('Nombre2');
        const Edad1 = document.getElementById('Edad1');
        const Edad2 = document.getElementById('Edad2');
        const friocalor1 = document.getElementById('frio/calor1');
        const friocalor2 = document.getElementById('frio/calor2');
        const dulcesalado1 = document.getElementById('dulce/salado1');
        const dulcesalado2 = document.getElementById('dulce/salado2');
        const salircasa1 = document.getElementById('salir/casa1');
        const salircasa2 = document.getElementById('salir/casa2');
        const appleandroid1 = document.getElementById('apple/android1');
        const appleandroid2 = document.getElementById('apple/android2');
        const tipopeli1 = document.getElementById('tipopeli1');
        const tipopeli2 = document.getElementById('tipopeli2');
        const CMM1 = document.getElementById('CMM1');
        const CMM2 = document.getElementById('CMM2');
        const casarse_relacionarse1 = document.getElementById('casarse/relacionarse1');
        const casarse_relacionarse2 = document.getElementById('casarse/relacionarse2');
        const pasatiempo1 = document.getElementById('pasatiempo1');
        const pasatiempo2 = document.getElementById('pasatiempo2');
        const foto1 = document.getElementById('foto1');
        const foto2 = document.getElementById('foto2');
        const boton = document.getElementById('boton');
        const divResultado = document.getElementById('resultado');
        const audio = document.getElementById('audioResultado');
        const modal = document.getElementById('modal');
        const modalResultado = document.getElementById('modal-resultado');
        const cerrarModal = document.getElementById('cerrar-modal');
        const contadorDiv = document.getElementById('contador');

        boton.addEventListener('click', (e) => {
            e.preventDefault();

            const campos = [
                Nombre1, Edad1, friocalor1, dulcesalado1, salircasa1, appleandroid1, tipopeli1, CMM1, casarse_relacionarse1, pasatiempo1,
                Nombre2, Edad2, friocalor2, dulcesalado2, salircasa2, appleandroid2, tipopeli2, CMM2, casarse_relacionarse2, pasatiempo2
            ];
            let camposVacios = campos.some(campo => campo.value === "" || campo.value === undefined || campo.value === null || campo.value === "Selecciona una opción");
            if (camposVacios) {
                alert("Por favor, rellena todos los campos antes de calcular la compatibilidad.");
                return;
            }

            let resultado = 0;
            const nombrePersona1 = Nombre1.value;
            const nombrePersona2 = Nombre2.value;

            // ----------- Comparación de edades -----------
            const edad1 = parseInt(Edad1.value);
            const edad2 = parseInt(Edad2.value);
            const difEdad = Math.abs(edad1 - edad2);
            if (difEdad <= 3) {
                resultado += 20;
            } else if (difEdad <= 6) {
                resultado += 15;
            } else if (difEdad > 10) {
                resultado += 5;
            }

            // ----------- Team frío o calor -----------
            if (friocalor1.value === friocalor2.value) {
                resultado += 10;
            } else {
                resultado += 2;
            }

            // ----------- Dulce o salado -----------
            if (dulcesalado1.value === dulcesalado2.value) {
                resultado += 5;
            } else {
                resultado += 1;
            }

            // ----------- Salir o estar en casa -----------
            if (salircasa1.value === salircasa2.value) {
                resultado += 10;
            } else {
                resultado += 4;
            }

            // ----------- Apple o Android -----------
            if (appleandroid1.value === appleandroid2.value) {
                resultado += 5;
            } else {
                resultado += 3;
            }

            // ----------- Tipo de peli favorito -----------
            if (tipopeli1.value === tipopeli2.value) {
                resultado += 5;
            } else {
                resultado += 2;
            }

            // ----------- Ciudad, mar o montaña -----------
            if (CMM1.value === CMM2.value) {
                resultado += 10;
            } else {
                // Variaciones
                const cmmSet = new Set([CMM1.value, CMM2.value]);
                if (cmmSet.has('ciudad') && cmmSet.has('montaña')) {
                    resultado += 3;
                } else if (cmmSet.has('ciudad') && cmmSet.has('mar')) {
                    resultado += 6;
                } else if (cmmSet.has('montaña') && cmmSet.has('mar')) {
                    resultado += 8;
                }
            }

            // ----------- Casarse o relación libre -----------
            if (casarse_relacionarse1.value === casarse_relacionarse2.value) {
                resultado += 20;
            } else {
                resultado -= 20;
            }

            // ----------- Pasatiempo -----------
            if (pasatiempo1.value === pasatiempo2.value) {
                resultado += 15;
            } else {
                const pasatiempos = [pasatiempo1.value, pasatiempo2.value];
                if (pasatiempos.includes('leer') && pasatiempos.includes('musica')) {
                    resultado += 8;
                } else if (pasatiempos.includes('videojuegos') && pasatiempos.includes('series')) {
                    resultado += 10;
                } else if (pasatiempos.includes('musica') && pasatiempos.includes('series')) {
                    resultado += 8;
                } else {
                    resultado += 5;
                }
            }

            divResultado.innerText = "";

            //------------------------------Mostrar resultado-----------------------
            modalResultado.style.display = "none";
            contadorDiv.style.display = "block";
            modal.style.display = "block";

            // --- Contador animado ---
            let repeticiones = 80;
            let contador = 0;
            let intervalo = setInterval(() => {
                let numeroRandom = Math.floor(Math.random() * 100) + 1;
                contadorDiv.innerHTML = `<span>Calculando resultado<br><b>${numeroRandom}%</b></span>`;
                contador++;
                if (contador >= repeticiones) {
                    clearInterval(intervalo);
                    contadorDiv.textContent = "";
                    modalResultado.style.display = "block";

        
                    let foto1URL = null;
                    let foto2URL = null;
                    if (foto1.files && foto1.files[0]) {
                        foto1URL = URL.createObjectURL(foto1.files[0]);
                    }
                    if (foto2.files && foto2.files[0]) {
                        foto2URL = URL.createObjectURL(foto2.files[0]);
                    }

                    let resultadoHTML = "";
                    if (foto1URL && foto2URL) {
                        resultadoHTML += `<div style='display:flex;justify-content:center;gap:10px;'>`;
                        resultadoHTML += `<img src='${foto1URL}' alt='Foto 1' style='width:80px;height:80px;border-radius:50%;object-fit:cover;'>`;
                        resultadoHTML += `<span style='font-size:2em;'>+</span>`;
                        resultadoHTML += `<img src='${foto2URL}' alt='Foto 2' style='width:80px;height:80px;border-radius:50%;object-fit:cover;'>`;
                        resultadoHTML += `</div>`;
                    } else if (foto1URL && !foto2URL) {
                        resultadoHTML += `<div style='display:flex;justify-content:center;gap:10px;'>`;
                        resultadoHTML += `<img src='${foto1URL}' alt='Foto 1' style='width:80px;height:80px;border-radius:50%;object-fit:cover;'>`;
                        resultadoHTML += `<span style='font-size:2em;'>+</span>`;
                        resultadoHTML += `<span style='font-size:1.2em;'>${nombrePersona2}</span>`;
                        resultadoHTML += `</div>`;
                    } else if (!foto1URL && foto2URL) {
                        resultadoHTML += `<div style='display:flex;justify-content:center;gap:10px;'>`;
                        resultadoHTML += `<span style='font-size:1.2em;'>${nombrePersona1}</span>`;
                        resultadoHTML += `<span style='font-size:2em;'>+</span>`;
                        resultadoHTML += `<img src='${foto2URL}' alt='Foto 2' style='width:80px;height:80px;border-radius:50%;object-fit:cover;'>`;
                        resultadoHTML += `</div>`;
                    } else {
                        resultadoHTML += `<h2>${nombrePersona1} + ${nombrePersona2}</h2>`;
                    }
                    resultadoHTML += `<h3>El resultado del calculo es de: ${resultado}% compatibles</h3>`;
                    // Bloques condicionales para mensaje personalizado
                    if (resultado >= 90) {
                        // Mensaje para compatibilidad muy alta
                        resultadoHTML += `<p>¡Son almas gemelas!</p>`;
                    } else if (resultado >= 75) {
                        // Mensaje para compatibilidad alta
                        resultadoHTML += `<p>Hacen una muy buena pareja!!</p>`;
                    } else if (resultado >= 50) {
                        // Mensaje para compatibilidad media
                        resultadoHTML += `<p>Deberian de conocerse un poco más, intentelo!.</p>`;
                    } else if (resultado >= 20) {
                        // Mensaje para compatibilidad baja
                        resultadoHTML += `<p>Muy baja compatibilidad para ser pareja pero aun pueden ser amigos.</p>`;
                    } else {
                        // Mensaje para compatibilidad muy baja
                         resultadoHTML += `<p>Ustedes son como el agua y el aceite.</p>`;
                    }
                    modalResultado.innerHTML = resultadoHTML;

                    //------------------------------Reproducir sonido-----------------------
                    audio.pause();
                    audio.currentTime = 0;
                    if (resultado >= 90 ) {
                        audio.src = "MarriedLife.mp3";
                    } else if (resultado >= 75 ) {
                        audio.src = "Symphony.mp3";
                    } else if (resultado >= 50 ) {
                        audio.src = "Lease.mp3";
                    } else if (resultado >= 20 ) {
                        audio.src = "diredire.mp3";
                    } else {
                        audio.src = "sad.mp3";
                    }
                    audio.play();
                }
            }, 35);

   
            cerrarModal.onclick = function() {
                modal.style.display = "none";
                audio.pause();
                audio.currentTime = 0;
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    audio.pause();
                    audio.currentTime = 0;


                }
            }
        });