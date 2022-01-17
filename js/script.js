let easy = document.getElementById("easy");
let intermediate = document.getElementById("intermediate");
let hard = document.getElementById("hard");
let categories = document.getElementById("categories");
let options = document.getElementById("options");
let game = document.getElementById("game");
let container = document.getElementById("container");
let Minutos = document.getElementById("Minutos");
let Segundos = document.getElementById("Segundos");
let Centesimas = document.getElementById("Centesimas");
let wordlist = document.getElementById("wordlist");
let wordlist__ul = document.getElementById("wordlist__ul");

let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
];
let cat_easy = ["abajo","arpa","asco","baño","bicho","caos","canoa","caja","cara","cero","cita","gasa","hilo","ingle","licor","ligar","luces","lados","mira","muslo","nado","ninfa","norte","paro","picar","prosa","pilas","pipa","parar","potro","sal","sapo","tallo","todo","tenaz","uso","ven","voraz",
];
let cat_int = ["abierto","adoptar","aparte","arriesgado","borrar","coagular","compuestos","cripta","detalles","diagrama","disfraz","diurno","hormigas","inmenso","juzgar","minuto","mollete","nadar","nodos","pecaminoso","pocion","portero","prematuro","queja","rayos","seno","torero","turgente","vago",
];
let cat_hard = ["bestia","bostezo","bozal","claridad","comer","costra","doce","exasperante","fechas","firma","golondrina","gramos","graso","incierto","infamia","innovar","licor","maicena","masaje","merengue","palma","papado","parados","pera","repostar","ruedas","tanque","toque","traje","utilizar",
];

let directions = ["hor", "vert", "diag"];
let level = null;
let size;
let ar_words = [];
let ar_dirs = [];
let dir;
let add;
let exist = false;
let correct = true;
let listsize;
let wordlist__li;

let clicks = [];

/*Seleccionamos el nivel al principio del juego a través de inputs radios*/
const selectLevel = (event) => {
  let e = event.target;
  if (e.nodeName == "INPUT") {
    level = e.id;
    //console.log(level)
  }
}; //fin funcion select nivel

/*Función para crear  el tablero de la sopa de letras*/
let create = () => {
  /*Cambio el tamaño del tablero según la dificultad que haya elegido el usuario*/
  if (level == "easy") {
    size = 8;
  } else if (level == "intermediate") {
    size = 10;
  } else if (level == "hard") {
    size = 13;
  }

  /*Creo la matriz*/
  let matriz = Array(size);
  for (let x = 0; x < size; x++) {
    matriz[x] = Array(size);
  }
  let words_used = []; //creo un array donde guardaré las palabras que usaré en la lista

  //Controlo el tamaño de la lista de palabras según el nivel

  if (level == "easy") {
    listsize = 9;
  }

  if (level == "intermediate") {
    listsize = 13;
  }

  if (level == "hard") {
    listsize = 15;
  }

  let words;
  /*Controlo que no se repitan las palabras en la lista*/
  while (words_used.length < listsize) {
    //let words;

    //Hago una lista de palabras distintas según el nivel
    if (level == "easy") {
      let random_easy = Math.floor(Math.random() * cat_easy.length);
      words = cat_easy[random_easy];
    }

    if (level == "intermediate") {
      let random_int = Math.floor(Math.random() * cat_int.length);
      words = cat_int[random_int];
    }

    if (level == "hard") {
      let random_hard = Math.floor(Math.random() * cat_hard.length);
      words = cat_hard[random_hard];
    }
    let exist = false;
    let wordlist__li = document.createElement("li");
    wordlist__li.className = "wordlist__li";

    for (let i = 0; i < words_used.length; i++) {
      if (words_used[i] == words) {
        exist = true;
      }
    }

    if (!exist) {
      words_used[words_used.length] = words;
      wordlist__li.append(words);
      wordlist__ul.append(wordlist__li);
    }

    //console.log(words_used)
  }
  //console.log(words)

  /*Hago la suma de la longitud de la palabra con la longitud de la fila*/

  let split_words;
  /*creo posiciones randoms*/
  let randomX = Math.floor(Math.random() * (size - 1)); //random de posición en el tablero
  let randomY = Math.floor(Math.random() * (size - 1)); //random de posición en el tablero

  for (let j = 0; j < words_used.length; j++) {
    /*divido la palabra en letras*/
    console.log(words_used[j]);
    split_words = words_used[j].toUpperCase().split("");
    /*si sumo la longitud del array de letras de palabras con la posición inicial entonces podré saber si la palabra me cabe*/
    add = split_words.length + randomX;
    /*creo un array de direcciones para que cada palabra tenga una dirección random*/
    let randomDir = Math.floor(Math.random() * directions.length); //random de posiciones en el array de direcciones
    let dir = directions[randomDir];

    ar_dirs.push(dir);
  }

  for (let k = 0; k < ar_dirs.length; k++) {
    if (ar_dirs[k] == "hor" && add < size) {
      for (let i = 0; i < split_words.length; i++) {
        if (matriz[randomX][i] === undefined) {
          matriz[randomX][i] = words[i];
          
        }
      }
    }  else if (ar_dirs[k] == "vert" && add < size) {
      for (let i = 0; i < split_words.length; i++) {
        if (matriz[i][randomY] === undefined) {
          matriz[i][randomY] = words[i];
        }
       
      }
      
    } else if (ar_dirs[k] == "vert" && add < size) {
      for (let i = 0; i < split_words.length; i++) {
        if (matriz[i][i] === undefined) {
          matriz[i][i] = words[i];
        }
      }
      
  }
}

  /*Último paso: rellenar los huecos restantes de la matriz con letras random del array*/
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      let random_letter = Math.floor(Math.random() * letters.length);
      if (matriz[i][j] === undefined) {
        matriz[i][j] = letters[random_letter];
      }
    }
  }
  /*dibujo la matriz*/
  draw(matriz);
}; //fin funcion

const draw = (matriz) => {
  //inicializo el cronómetro
  tiempo = setInterval(crono, 100);

  //escondo las opciones iniciales
  options.style.display = "none";

  //estilos del contenedor del juego
  container.style.display = "flex";
  container.style.justifyContent = "space-evenly";
  container.style.flexDirection = "column";

  //según el nivel cambio el título
  let level__text = document.createElement("h4");
  if (level == "easy") {
    level__text.textContent = "Nivel Fácil";
  }

  if (level == "intermediate") {
    level__text.textContent = "Nivel Intermedio";
  }

  if (level == "hard") {
    level__text.textContent = "Nivel Difícil";
  }
  level__text.className = "level";

  //Aquí dibujo el tablero de la sopa de letras

  let table = document.createElement("table");

  for (let i = 0; i < matriz.length; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < matriz.length; j++) {
      let td = document.createElement("td");

      td.innerHTML = matriz[i][j];
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  container.appendChild(level__text);
  container.appendChild(table);
  game.appendChild(container);

  table.classList.add("table");
  container.classList.add("container");
};

//Creo el cronómetro
let centesimas = 0;
let minutos = 0;
let segundos = 0;
let tiempo;

const crono = () => {
  centesimas++;
  if (centesimas > 99) {
    segundos++;
    centesimas = 0;
  }
  if (segundos > 59) {
    minutos++;
    segundos = 0;
  }

  if (centesimas < 10) {
    Centesimas.textContent = ":" + ("0" + centesimas).slice(-2);
  } else {
    Centesimas.textContent = ":" + centesimas;
  }
  if (minutos < 10) {
    Minutos.textContent = ("0" + minutos).slice(-2);
  } else {
    Minutos.textContent = ":" + minutos;
  }
  if (segundos < 10) {
    Segundos.textContent = ":" + ("0" + segundos).slice(-2);
  } else {
    Segundos.textContent = ":" + segundos;
  }
};

//función para jugar a la sopa de letras.
//controlar que estén en distinta fila??
const playGame = (event) => {
  if (event.target.nodeName == "TD") {
    console.log(event.target);
    event.target.style.backgroundColor = "blue";
    clicks.push(event.target.innerHTML);
    console.log(clicks.join(""));
  }

  console.log(clicks.join("").length);
  console.log(size);
  //console.log(cont)
  let cont = 0;
  for (let i = 0; i < ar_words.length; i++) {
    if (ar_words[i] == clicks.join("") && clicks.join("").length < size) {
      console.log("encontrado");
      cont++;
      clicks.splice(0, clicks.length);
    }

    if (clicks.join("").length >= size) {
      console.log("no encontrado");
    }

    console.log(cont);
    if (cont == ar_words.length) {
      alert("Enhorabuena, has finalizado el juego");
      clearInterval(tiempo);
    }
  }
};

play.addEventListener("click", create);
options.addEventListener("click", selectLevel);
container.addEventListener("mousedown", playGame);
