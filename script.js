/**
 * @getElementsByClassName = Esta função irá pegar todas as imagens com a classe "imagem-para-alterar"
 * @Valor - Esta constante terá um valor de um array de 3 posições [0,1,2], sendo uma imagem diferente pra cada uma delas.
 */
 const imagem = document.body.getElementsByClassName("imagem-para-alterar");

 /**
  * @getElementsByClassName = Esta função irá pegar todas as imagens com a classe "nome-do-personagem"
  * @Valor - Esta constante terá um valor de um array de 3 posições [0,1,2], sendo um campo "nome" diferente pra cada uma delas.
  */
 const nome = document.body.getElementsByClassName("nome-do-personagem");
 
 /**
  * @getElementsByClassName = Esta função irá pegar todas as imagens com a classe "especie-do-personagem"
  * @Valor - Esta constante terá um valor de um array de 3 posições [0,1,2], sendo um campo "especie" diferente pra cada uma delas.
  */
 const especie = document.body.getElementsByClassName("especie-do-personagem");
 
 /**
  * @getElementsByClassName = Esta função irá pegar todas as imagens com a classe "status-do-personagem"
  * @Valor - Esta constante terá um valor de um array de 3 posições [0,1,2], sendo um campo "status" diferente pra cada uma delas.
  */
 const condicao = document.body.getElementsByClassName("status-do-personagem");

/**
 * @Objetivo - Atualizar os campos de nome, especie e status assim que a página é carregada.
 */

window.onload = () => {
    pegarPersonagem();
}


/**
  * @Objetivo - Traduzir o status do personagem
  */

traduzirCondicao = (status) => {
    if(status == 'unknown'){
        return 'Não sabemos';
    }else if(status == 'Alive'){
        return 'Sim';
    }else {
        return 'Não. Está morto';
    }
}

/**
  * @Objetivo - Gerar um número aleatório
  */
gerarValorAletorio = () => {
    return Math.floor(Math.random() * 671);
}

/**
  * @Título - Funque pega os dados do personagem
  * @descricão - Através de uma requisição GET, para a API do ricky and morty, pegamos os dados do personagem 
  */
pegarPersonagem = () => {

    let numeroAleatorio = gerarValorAletorio();
    let numeroAleatorio2 = gerarValorAletorio();
    let numeroAleatorio3 = gerarValorAletorio();



    Swal.fire({
        title: 'Reunindo Informações',
        html: 'Isso pode demorar alguns segundos',
        timerProgressBar: true,
        allowOutsideClick: true,
        didOpen: () => {
            Swal.showLoading()
                  
                return fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio},${numeroAleatorio2},${numeroAleatorio3}`, {
                method:'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-type": 'application/json'
                }
                }).then((response) => response.json()).then((data) => {
                
                    Swal.close()   
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Personagens encontrados!',
                        text: 'Pronto para mostrar os personagens',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1000
                    })

                    /**
                     * @Variavel_I_0 - É definida a variável "I" que sempre que essa função roda tem o seu valor definido como zero.
                     * @Variavel_I_1 - É necessário que ela exista, pois as constantes "imagem", "nome", "especie" e "condicao" são arrays de tamanho de 3. [0,1,2].
                     * @Variavel_I_2 - Então se pedirmos imagem[0], temos a primeira imagem, imagem[1] a segunda e assim por diante.
                     * 
                     * @Funcionamento_1 - Pegamos o array que vem como resposta da API e percoremo array para pegar os dados de cada personagem.
                     * @Funcionamento_2 - Para cada personagem encontrado (Sempre serão 3), irá pegar o nome, especie e status do personagem.
                     * @Funcionamento_3 - Com os valores do personagem, irá definir o valor de cada variável com os dados do personagem.
                     * @Funcionamento_4 - Na primeira vez, imagem[i] será igual a imagem[0]. Na segunda vez imagem[i] será igual a imagem[1] e assim por diante.
                     * @Funcionamento_5 - Para cada vez que o array "data" for percorrido, uma nova imagem receberá a imagem do personagem.
                     * @Funcionamento_6 - Após definir todos os valores para a box, "I" aumentará o seu valor em 1 até chegar em um máximo de 2 e voltar a 0.
                     */
                    i = 0;
                    data.forEach((personagem) => {
                        imagem[i].src = personagem.image;
                        imagem[i].alt = personagem.name;
                        nome[i].innerHTML = personagem.name;
                        especie[i].innerHTML = personagem.species;
                        condicao[i].innerHTML = traduzirCondicao(personagem.status);
                        i++;
                    });
                });
        },
    })

}
// ================================
// ================================

//Este é o único botão do site, por isso é utilizado o querySelector, caso exista mais de um, é recomendado selecionar por ID.
document.querySelector('button').onclick = pegarPersonagem;