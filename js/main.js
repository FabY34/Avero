document.addEventListener("DOMContentLoaded", () => {
  // === SPLASH SCREEN ===
  const btnEntrar = document.getElementById("btnEntrar");
  const btnCadastrar = document.getElementById("btnCadastrar");

  if (btnEntrar) btnEntrar.addEventListener("click", () => window.location.href = "login.html");
  if (btnCadastrar) btnCadastrar.addEventListener("click", () => window.location.href = "register.html");

  // === LOGIN ===
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("password").value.trim();

      const user = JSON.parse(localStorage.getItem('userAvero'));
      const perfil = JSON.parse(localStorage.getItem('perfilAvero'));

      if (!user || user.email !== email || user.senha !== senha) {
        alert("Usuário ou senha incorretos.");
        return;
      }

      alert("Login realizado com sucesso! (simulação)");

      if (!perfil) {
        window.location.href = "questionario.html";
      } else {
        window.location.href = "home.html";
      }
    });
  }

  // === REGISTRO ===
  if (document.querySelector('.register-screen')) {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('password').value.trim();

      if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const user = { nome, email, senha };
      localStorage.setItem('userAvero', JSON.stringify(user));

      window.location.href = 'questionario.html';
    });
  }

  // === QUESTIONÁRIO ===
  if (document.querySelector('.questionario-screen')) {
    const etapas = document.querySelectorAll('.etapa');
    const botoesProximo = document.querySelectorAll('.proximo');
    const botoesVoltar = document.querySelectorAll('.voltar');
    let etapaAtual = 0;

    function mostrarEtapa(index) {
      etapas.forEach((etapa, i) => etapa.classList.toggle('ativa', i === index));
    }

    botoesProximo.forEach(btn => {
      btn.addEventListener('click', () => {
        if (etapaAtual < etapas.length - 1) etapaAtual++;
        mostrarEtapa(etapaAtual);
      });
    });

    botoesVoltar.forEach(btn => {
      btn.addEventListener('click', () => {
        if (etapaAtual > 0) etapaAtual--;
        mostrarEtapa(etapaAtual);
      });
    });

    const slider = document.getElementById('slider');
    const valorSlider = document.getElementById('valorSlider');
    if (slider && valorSlider) {
      slider.addEventListener('input', () => {
        valorSlider.textContent = slider.value;
      });
    }

    const cursoForm = document.getElementById('cursoForm');
    const cursoCampo = document.getElementById('cursoCampo');
    cursoForm?.addEventListener('change', e => {
      cursoCampo.style.display = e.target.value === 'sim' ? 'block' : 'none';
    });

    const historicoForm = document.getElementById('historicoForm');
    const dadosProva = document.getElementById('dadosProva');
    historicoForm?.addEventListener('change', e => {
      dadosProva.style.display = e.target.value === 'sim' ? 'block' : 'none';
    });

    const botaoFinal = document.querySelector('#etapa10 button');
    botaoFinal?.addEventListener('click', () => {
      const dados = {};
      dados.escolaridade = document.querySelector('input[name="escolaridade"]:checked')?.value || '';
      dados.cidade = document.querySelector('input[name="cidade"]')?.value || '';
      dados.estado = document.querySelector('input[name="estado"]')?.value || '';
      dados.curso = document.querySelector('input[name="cursoDesejado"]')?.value || '';
      dados.integral = document.querySelector('input[name="integral"]:checked')?.value || '';
      dados.mobilidade = document.querySelector('input[name="mobilidade"]:checked')?.value || '';
      dados.valorMensal = document.querySelector('#slider')?.value || '';
      dados.media = document.querySelector('input[name="media"]')?.value || '';

      localStorage.setItem('perfilAvero', JSON.stringify(dados));
      alert('Questionário concluído com sucesso!');
      window.location.href = 'home.html';
    });
  }

  // === HOME ===
  if (document.querySelector('.home-screen')) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.tab');

    // ÍRIS GLOBAL (fora das abas)
    const irisGlobal = document.getElementById('irisGlobal');

    // Função para alternar abas
    function abrirAba(tabName, clickedBtn) {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      if (clickedBtn) clickedBtn.classList.add('active');
      const tabEl = document.getElementById(tabName);
      if (tabEl) tabEl.classList.add('active');

      // Mostrar/ocultar Íris global
      if (irisGlobal) {
        if (tabName === 'chat') {
          irisGlobal.classList.add('visible');
          irisGlobal.setAttribute('aria-hidden', 'false');
        } else {
          irisGlobal.classList.remove('visible');
          irisGlobal.setAttribute('aria-hidden', 'true');
        }
      }
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        abrirAba(btn.dataset.tab, btn);
      });
    });

    // === CHAT ===
    const sendButton = document.getElementById('sendMessage');
    const chatBox = document.getElementById('chatBox');
    const userMessage = document.getElementById('userMessage');

    function enviarMensagem() {
      const msg = userMessage.value.trim();
      if (!msg) return;

      const userBubble = document.createElement('div');
      userBubble.classList.add('chat-message', 'user');
      userBubble.textContent = msg;
      chatBox.appendChild(userBubble);
      chatBox.scrollTop = chatBox.scrollHeight;

      userMessage.value = '';

      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.classList.add('chat-message');
        botBubble.textContent = 'Entendi! Em breve terei respostas personalizadas.';
        botBubble.style.pointerEvents = 'none';
        chatBox.appendChild(botBubble);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 600);
    }

    if (sendButton) sendButton.addEventListener('click', enviarMensagem);
    if (userMessage) {
      userMessage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          enviarMensagem();
        }
      });
    }

    const perfil = JSON.parse(localStorage.getItem('perfilAvero'));
    if (perfil) {
      const abaFaculdades = document.getElementById('faculdades');
      if (perfil.curso && abaFaculdades) {
        const cursoInfo = document.createElement('p');
        cursoInfo.textContent = `📚 Curso de interesse: ${perfil.curso}`;
        abaFaculdades.prepend(cursoInfo);
      }
    }

    // Estado inicial correto
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) abrirAba(activeBtn.dataset.tab, activeBtn);
  }

  // Scroll effect (mantido)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });
});






