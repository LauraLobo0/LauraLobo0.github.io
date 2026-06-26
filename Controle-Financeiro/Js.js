const despesaList = []  // Array que armazena todas as despesas

/*
1.1 Nova Despesa no array despesas
1.2 Adicionar despesa na lista
1.3 Gerar estatística

 */
/**
 * Função construtora de objetos despesa
 * @param {*} desc 
 * @param {*} valor 
 */
const Despesa = function(desc="Não informado"
    , valor=0) {
    this.descricao = desc // Nome da despesa (ex: "Almoço")
    this.valor = valor // Valor da despesa (ex: 50.00)
}
/**
 * Adiciona uma nova despesa no array Despesas
 */
const criarDespesa = () => {
//1.1 Nova Despesa no array despesas
// Pega os valores dos inputs do HTML
    const descricao = document.querySelector("#descricao").value
    const valor = parseFloat(document.querySelector("#valor").value)
    // Cria objeto e adiciona ao array
    const despesaNova = new Despesa(descricao, valor)
    despesaList.push(despesaNova)
}
//1.2
const carregarLista = () => {
    const lista = document.querySelector("#lista")
    lista.innerHTML = "" // Limpa a lista antes de recarregar
    despesaList.forEach(despesa => {
        
        const div = document.createElement("div") 
        // Cria um novo elemento HTML <div> (totalmente vazio, sem conteúdo ou atributos)
        // Este elemento existe apenas na memória (JavaScript), ainda não aparece na página
        div.classList.add("item")
        //Adiciona a classe CSS chamada "item" à div criada
        // adicionar o texto da descricao e valor

        div.textContent = `${despesa.descricao}
                        - R$${despesa.valor}`
        // adicionar o elemento novo no div lista
        lista.appendChild(div)
    })
}

const gerarEstatisticas = () =>
     {
    const totalDeGastos = despesaList.reduce((total, despesa) => total + despesa.valor, 0)
    Maiormenor()
    AcimadeCem()
    MediaG()
    Porcentagem()

    gerarGrafico()
}

// 1. Ao clicar no btnAdicionar
const btn = document.querySelector("#btnAdicionar")
btn.addEventListener("click", ()=> {
    //criar um objeto despesa e adicionar no array
    criarDespesa()
    //adicionar os elementos da lista no html
    carregarLista()
    //gerar estatísticas
    gerarEstatisticas()
    
})
  
//Exibir o menor e o maior gasto innerhtml
function Maiormenor () 
{
    // Pega todos os valores
    const valores = despesaList.map(despesa => despesa.valor) // do array despesaList, pega apenas os valores e cria um novo array chamado valores

    // Encontra maior e menor valor
    const maiorValor = Math.max(...valores) // pega individualmente o maior valor contido em valores, destructuring => [10,50] => 10, 50
    const menorValor = Math.min(...valores)
    
    // Encontra o objeto da despesa com maior valor
    const despesaMaior = despesaList.find(despesa => despesa.valor === maiorValor)
    const despesaMenor = despesaList.find(despesa => despesa.valor === menorValor) //
    
    document.querySelector("#maiorGasto").innerHTML = `<p>Maior gasto: ${despesaMaior.descricao} - R$ ${maiorValor.toFixed(2)}</p>`
    
    document.querySelector("#menorGasto").innerHTML = `<p>Menor gasto: ${despesaMenor.descricao} - R$ ${menorValor.toFixed(2)}</p>`
}

//Quantidade de gastos acima de 100  filter

function AcimadeCem() 
{
    const valoresM = despesaList.filter((despesa) => {
        return despesa.valor > 100}) // retorno da função filter, filter retorna todos os elementos de um array que atendem a determinada condição
    const qtdValoresM = valoresM.length
    document.querySelector("#qtdValoresM").innerHTML = `<p>Quantidade de despesas acima de 100 reais: ${qtdValoresM}</p>`
}

//Media de gastos reduce + length

function MediaG()
{
    const totalDeGastos = despesaList.reduce((total, despesa) =>{
        return total + despesa.valor
    }, 0)

    const tamanho = despesaList.length
    const mediaVal = totalDeGastos / tamanho

    document.querySelector("#Media").innerHTML = `<p>Media dos valores das despesas: R$ ${mediaVal.toFixed(2)}</p>`
}

//% total de cada gasto  reduce da soma de tudo +  regra DE 3
function Porcentagem()
{
    const totalGeral = despesaList.reduce((total, despesa) => total + despesa.valor, 0)
    
    const container = document.querySelector("#porc")
    container.innerHTML = "<h3> Porcentagem de cada gasto:</h3>"
    
    despesaList.forEach(despesa => {
        const porcentagem = (despesa.valor * 100) / totalGeral
        
        const div = document.createElement("div")
        div.classList.add("porc")
        div.textContent = `${despesa.descricao}: ${porcentagem.toFixed(2)}%`
        container.appendChild(div)
    })
}

const gerarGrafico = () =>
{
  const descricoes = despesaList.map (despesa => despesa.descricao)
  const gastos = despesaList.map (despesa => despesa.valor) 
  console.log(gastos)
  const divGrafico = document.getElementById('grafico');
  divGrafico.innerHTML = "";

  const ctx = document.createElement ("canvas")
  divGrafico.appendChild(ctx)

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: descricoes,
      datasets: [{
        label: '# of Votes',
        data: gastos,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}