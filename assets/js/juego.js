
(()=> {
    "use strict"

    /*este codigo crea una baraja aleatorea con _.shuffle() */
    let deck = [];
    const tipos = ["C", "D", "H", "S"],
         especiales = ["A", "J", "Q", "K"]
    let puntosJugador = 0,
        puntosComputadora = 0;


    //referencias al html

    const btnPedir = document.querySelector(`#btnPedir`),
            btnNuevo = document.querySelector("#btnNuevo"),
            btnDetener = document.querySelector("#btnDetener");

    const divJugadorCartas = document.querySelector("#jugador-cartas"),
             divCartasComputadora = document.querySelector("#computadora-cartas");
    
    const puntosHtml = document.querySelectorAll("small");

    //funcion para crear la baraja 

    const crearDeck = () => {

        deck = [];
        for ( let i = 2; i <= 10; i++) {
            for( let tipo of tipos){
                deck.push(i + tipo);
            }
            
        }
        for (let tipo of tipos) { 
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        
        return _.shuffle(deck); /*revolver la baraja con shuffle*/
    }



    /*funcion para solicitar carta */

    const pedirCarta = () => {

        if(deck.length === 0){
            throw "No hay cartas en el deck";
        }
        return deck.pop(); 
    }

    /*funcion para extraer el valor de la carta elegida */ 

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length-1); /* este metodo
        estrae los valores que le pido de un string */
        let puntos = 0;

        if ( isNaN(valor)){
                puntos = (valor === "A")? 11 : 10;

        }else {
            
            puntos = valor * 1;

        }

        return puntos;
        //console.log(puntos);

    }


    /*isNaN() es un metodo que me dice si es o no un numero, devuelve true si no es un 
    numero, devuelve false si es un numero */

    


    //turno de la computadora se da cuando yo supero los 21 y cuando hago click
    //en el boton detener

    const turnoComputadora = (puntosMinimos ) => {
        do {
            const carta =  pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta( carta );
            puntosHtml[1].innerText= puntosComputadora;
        
            const imgCarta = document.createElement("img")
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add("carta");
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21 );

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos){
                alert("Nadie gana");
            } else if (puntosMinimos > 21){
                alert("computadora gana");
            }else if ( puntosComputadora > 21){
                alert("jugador gana")
            }else{
                alert("computadora gana");
            }
        }, 50);

        /* la funcion setTimeout permite que el codigo dentro de ella 
        se ejecute despues de todo el codigo */
    }

    //EVENTOS


    btnPedir.addEventListener("click", ()=>{
        
        const carta =  pedirCarta();
        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHtml[0].innerText= puntosJugador;

        const imgCarta = document.createElement("img")
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add("carta");
        divJugadorCartas.append(imgCarta);

        if(puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            // alert("Lo siento, perdiste!");
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21){
            console.log("tienes 21, genial!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador);
        }

    });

    btnDetener.addEventListener("click", ()=>{

        btnDetener.disabled = true;
        btnPedir.disabled = true;

        turnoComputadora (puntosJugador);
        
    });

    btnNuevo.addEventListener("click", ()=>{
        console.clear();
        deck = [];
        console.log(deck = crearDeck());
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
        divCartasComputadora.innerHTML = "";
        divJugadorCartas.innerHTML = "";
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    })


    /* el evento addEventListener es para cuando hagamos click en el boton
    se haga lo que esta en la funcion que se pasa como argumento */


})();


