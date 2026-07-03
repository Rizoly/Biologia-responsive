// logica do simulado da secao "Questoes sobre Archaea"
document.addEventListener('DOMContentLoaded', function () {
  const cartas = document.querySelectorAll('.questao-card');
  const resultadoBox = document.getElementById('resultado-quiz');
  const resultadoTexto = document.getElementById('resultado-texto');
  const btnRefazer = document.getElementById('btn-refazer');
  const totalQuestoes = cartas.length;

  let acertos = 0;
  let respondidas = 0;

  // registra o clique em cada alternativa de cada questao
  cartas.forEach(function (carta) {
    const correta = carta.dataset.correta;
    const alternativasBox = carta.querySelector('.alternativas');
    const botoes = carta.querySelectorAll('.alternativa');

    botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
        // impede responder mais de uma vez a mesma questao
        if (alternativasBox.classList.contains('respondida')) return;

        const escolhida = botao.dataset.letra;
        const acertou = escolhida === correta;

        alternativasBox.classList.add('respondida');

        // marca a alternativa correta e, se houver erro, a alternativa escolhida
        botoes.forEach(function (b) {
          if (b.dataset.letra === correta) b.classList.add('correta');
        });
        if (!acertou) botao.classList.add('incorreta');

        // efeito visual discreto no card (aumento suave + sombra colorida)
        carta.classList.add(acertou ? 'correta' : 'incorreta', 'destaque');
        setTimeout(function () {
          carta.classList.remove('destaque');
        }, 1400);

        if (acertou) acertos++;
        respondidas++;

        if (respondidas === totalQuestoes) {
          mostrarResultado();
        }
      });
    });
  });

  // calcula e exibe o resultado final do simulado
  function mostrarResultado() {
    const erros = totalQuestoes - acertos;
    const aproveitamento = Math.round((acertos / totalQuestoes) * 100);
    resultadoTexto.textContent =
      'Acertos: ' + acertos + ' | Erros: ' + erros + ' | Aproveitamento: ' + aproveitamento + '%';
    resultadoBox.classList.add('mostrar');
  }

  // reinicia o simulado, limpando respostas e efeitos visuais
  btnRefazer.addEventListener('click', function () {
    acertos = 0;
    respondidas = 0;

    cartas.forEach(function (carta) {
      const alternativasBox = carta.querySelector('.alternativas');
      alternativasBox.classList.remove('respondida');
      carta.classList.remove('correta', 'incorreta', 'destaque');
      carta.querySelectorAll('.alternativa').forEach(function (b) {
        b.classList.remove('correta', 'incorreta');
      });
    });

    resultadoBox.classList.remove('mostrar');
  });
});
