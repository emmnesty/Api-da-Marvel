// Parametros da Api

function paramsApi() {
    const publicKey = "fe564f7dc470dd1f77b79b9bcc8ca8f8";
    const privateKey = "COLOQUE AQUI SUA CHAVE PRIVADA";
    const ts = new Date().getTime();
  
    const hash = md5(`${ts}${privateKey}${publicKey}`);
  
    return { ts, publicKey, hash };
  }


function createPersonagem(personagem) {

  //Setar os alvos no html
  const content = document.querySelector("#content");
  const list = document.querySelector("#list");

  //criar o content
  const title = document.createElement("h3");
  title.classList.add("mt-2", "h5");
  title.innerText = "Personagem Marvel";

  const nomePersonagem = document.createElement("h1");
  nomePersonagem.classList.add("mt-2", "h3");
  nomePersonagem.innerText = personagem.name;

  const descPersonagem = document.createElement("p");
  descPersonagem.classList.add("mt-4", "mb-2")
  descPersonagem.innerText = personagem.description

  const img = document.createElement("img");
  img.classList.add("img-fluid");
  img.src = `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`

  const historias = document.createElement("h2");
  historias.classList.add("mt-4", "mb-2", "text-center");
  historias.innerText = "Histórias";

  //tabela
  const table = document.createElement("table");
  table.classList.add("table", "table-bordered", "mt-4");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const tableTitle = ["ID", "Titulo", "Tipo"];

  tableTitle.forEach(element => {
    const th = document.createElement("th");
    th.innerText = element;

    tr.append(th); 
    
  }); 

  const tbody = document.createElement("tbody");


  personagem.stories.items.forEach(element => {
    const tr1 = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = urlId(element.resourceURI);

    const td2 = document.createElement("td");
    td2.innerText = element.name;

    const td3 = document.createElement("td");
    td3.innerText = element.type;

    tr1.append(td1);
    tr1.append(td2);
    tr1.append(td3);

    tbody.append(tr1)
    
  })

  //criar a lista

  const aparicoes = document.createElement("h3");
  aparicoes.classList.add("mt-3", "h5", "text-white");
  aparicoes.innerText = "Lista de Aparições (comics)";

  const unorderedList = document.createElement("ul");
  unorderedList.classList.add("m-2","mt-4", "ml-4", "text-white");


  personagem.comics.items.forEach(element => {
    const li = document.createElement("li");
    li.innerText = element.name;

    unorderedList.append(li);
       
  });
 
  thead.append(tr)
  table.append(thead)
  table.append(tbody)
  
  content.append(title);
  content.append(nomePersonagem);
  content.append(descPersonagem);
  content.append(img);
  content.append(historias);
  content.append(table);

  list.append(aparicoes);
  list.append(unorderedList);
}

function urlId(url) {
  const id = url.split("/")
  const i = id.length - 1

  return id[i]
}

// Popupar Api 

function getApi(params) {
  const res = new XMLHttpRequest();

  res.onreadystatechange = function () {
    if (res.readyState == 4 && res.status == 200) {
      const response = JSON.parse(res.responseText);
      console.log(response.data.results[0]);
      createPersonagem(response.data.results[0]);
    }
  };
  res.open(
    "GET",
    `http://gateway.marvel.com/v1/public/characters/1009664?ts=${params.ts}&apikey=${params.publicKey}&hash=${params.hash}&nameStartsWith=e&limit=12`,
    true
  );
  res.send();
}

const ChamadaApi = paramsApi();
getApi(ChamadaApi);

