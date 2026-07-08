// ===================================================
// faixa de palavras passando (ticker) - abaixo do banner
// as palavras aparecem em ordem aleatoria a cada carregamento
// ===================================================
document.addEventListener('DOMContentLoaded', function () {
  const palavrasTicker = [
    "ARCHAEA", "EXTREMÓFILAS", "HIPERTERMÓFILAS", "HALÓFILAS",
    "ACIDÓFILAS", "ALCALÓFILAS", "PSICRÓFILAS", "METANOGÊNESE",
    "DOMÍNIO ARCHAEA", "WOESE & FOX", "1990", "FONTES HIDROTERMAIS",
    "LAGOS HIPERSALINOS", "LIGAÇÃO ÉTER", "MICROBIOMA INTESTINAL",
    "PCR E DNA-POLIMERASE"
  ];
  function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }
  const tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    const embaralhadas = embaralhar(palavrasTicker);
    const htmlPalavras = embaralhadas
      .map(function (p) {
        return '<span>' + p + '</span><span class="ponto">•</span>';
      })
      .join('');
    // duplica o conteudo para o loop ficar continuo (sem "salto")
    tickerTrack.innerHTML = htmlPalavras + htmlPalavras;
  }
});
// ===================================================
// logica do simulado da secao "Questoes sobre Archaea"
// ===================================================
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
// ===================================================
// sombra no cabecalho quando a pagina eh rolada
// ===================================================
document.addEventListener('DOMContentLoaded', function () {
  const cabecalho = document.querySelector('.cabecalho');
  if (!cabecalho) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      cabecalho.classList.add('rolou');
    } else {
      cabecalho.classList.remove('rolou');
    }
  });
});
// ===================================================
// botao flutuante "voltar ao topo"
// ===================================================
document.addEventListener('DOMContentLoaded', function () {
  const btnTopo = document.getElementById('btn-topo');
  if (!btnTopo) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btnTopo.classList.add('mostrar');
    } else {
      btnTopo.classList.remove('mostrar');
    }
  });
  btnTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
// ===================================================
// destaque no card da galeria ao clicar em "ver na galeria"
// nos cards de habitat: rola ate o card certo e da um efeito
// de scale + sombra azul por alguns milissegundos
// ===================================================
document.addEventListener('DOMContentLoaded', function () {
  const botoesGaleria = document.querySelectorAll('.botao-galeria[data-alvo]');
  botoesGaleria.forEach(function (botao) {
    botao.addEventListener('click', function (evento) {
      const alvoId = botao.dataset.alvo;
      const cardAlvo = document.getElementById(alvoId);
      if (!cardAlvo) return;
      // controla a rolagem manualmente para centralizar o card certo na tela
      evento.preventDefault();
      cardAlvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // remove o destaque caso ainda esteja ativo de um clique anterior
      cardAlvo.classList.remove('destaque-azul');
      // forca o reinicio da transicao mesmo em cliques repetidos
      void cardAlvo.offsetWidth;
      cardAlvo.classList.add('destaque-azul');
      setTimeout(function () {
        cardAlvo.classList.remove('destaque-azul');
      }, 1600);
    });
  });
});