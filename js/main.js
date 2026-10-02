/* ==========================================================================
   APYS PRODUÇÕES — Scripts do site
   --------------------------------------------------------------------------
   1. Cabeçalho: muda de fundo ao rolar
   2. Menu mobile (hambúrguer)
   3. Destaque do link ativo na navegação
   4. Scroll reveal (animações de entrada)
   5. Botão "Voltar ao topo"
   6. Acordeão do FAQ
   7. Formulário de contato (validação + envio)
   8. Ano atual no rodapé
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. CABEÇALHO
     ------------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });


  /* ------------------------------------------------------------------------
     2. MENU MOBILE
     ------------------------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  navToggle.addEventListener('click', function () {
    setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha o menu ao clicar em um link
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  // Fecha com a tecla Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Garante que o menu não fique "preso" aberto ao redimensionar para desktop
  window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });


  /* ------------------------------------------------------------------------
     3. LINK ATIVO NA NAVEGAÇÃO
     Destaca no menu a seção que está visível na tela.
     ------------------------------------------------------------------------ */
  var navLinks = nav.querySelectorAll('a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }


  /* ------------------------------------------------------------------------
     4. SCROLL REVEAL
     Adiciona .is-visible aos elementos .reveal quando entram na tela.
     Itens irmãos (ex.: cards de uma grade) aparecem em sequência.
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');

  // Pequeno atraso em cascata para itens de listas/grades
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    if (parent && /grid|timeline/.test(parent.className)) {
      var index = Array.prototype.indexOf.call(parent.children, el);
      el.style.setProperty('--reveal-delay', (index * 0.1) + 's');
    }
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // anima apenas uma vez
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }


  /* ------------------------------------------------------------------------
     5. VOLTAR AO TOPO
     Rola suavemente até o início da página (sem JS, o link #home já funciona).
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.back-to-top').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    });
  });


  /* ------------------------------------------------------------------------
     6. ACORDEÃO (FAQ)
     Abre um item por vez. Para permitir vários abertos, defina
     SINGLE_OPEN = false.
     ------------------------------------------------------------------------ */
  var SINGLE_OPEN = true;
  var triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (SINGLE_OPEN) {
        triggers.forEach(function (other) {
          if (other !== trigger) toggleItem(other, false);
        });
      }
      toggleItem(trigger, !isOpen);
    });
  });

  function toggleItem(trigger, open) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }


  /* ------------------------------------------------------------------------
     7. FORMULÁRIO DE CONTATO
     - Valida os campos no navegador.
     - Se o atributo data-endpoint do <form> tiver uma URL (ex.: Formspree),
       envia via fetch. Caso contrário, abre o app de e-mail (mailto).
     ------------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');

  if (form) {
    var statusEl = form.querySelector('.form-status');

    var messages = {
      nome: 'Por favor, informe seu nome.',
      email: 'Informe um e-mail válido.',
      mensagem: 'Escreva sua mensagem.'
    };

    function validateField(field) {
      var wrapper = field.closest('.form-field');
      var errorEl = wrapper.querySelector('.field-error');
      var valid = field.value.trim() !== '' && field.checkValidity();

      wrapper.classList.toggle('has-error', !valid);
      field.setAttribute('aria-invalid', String(!valid));
      errorEl.textContent = valid ? '' : messages[field.name];
      return valid;
    }

    // Revalida enquanto a pessoa corrige o campo
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.closest('.form-field').classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.textContent = '';

      var fields = form.querySelectorAll('input, textarea');
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);
      var endpoint = form.dataset.endpoint;
      var submitBtn = form.querySelector('[type="submit"]');

      if (endpoint) {
        // Envio via serviço externo (Formspree, Getform, etc.)
        submitBtn.disabled = true;
        statusEl.textContent = 'Enviando...';

        fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Falha no envio');
            form.reset();
            statusEl.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
          })
          .catch(function () {
            statusEl.textContent = 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.';
          })
          .finally(function () { submitBtn.disabled = false; });
      } else {
        // Fallback: abre o app de e-mail com a mensagem preenchida
        var subject = 'Contato pelo site — ' + data.get('nome');
        var body = data.get('mensagem') + '\n\n' + data.get('nome') + '\n' + data.get('email');
        window.location.href = 'mailto:' + form.dataset.mailto +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        statusEl.textContent = 'Abrimos seu aplicativo de e-mail para concluir o envio.';
      }
    });
  }


  /* ------------------------------------------------------------------------
     8. ANO ATUAL NO RODAPÉ
     ------------------------------------------------------------------------ */
  var yearEl = document.getElementById('ano-atual');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
