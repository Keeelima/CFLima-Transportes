/* ==========================================================================
   CFlima Mudanças e Fretes — JavaScript principal
   Sem bibliotecas externas. Compatível com Content-Security-Policy estrita
   (nenhum script inline, nenhum eval, nenhum innerHTML com dado do usuário).
   --------------------------------------------------------------------------
   1.  Configuração editável
   2.  Marca "js" no <html> (evita piscar do conteúdo)
   3.  Cabeçalho fixo
   4.  Menu mobile
   5.  Animações de entrada
   6.  Contadores + anos de empresa
   7.  Galeria com lightbox
   8.  Carrossel de avaliações
   9.  Formulário -> WhatsApp (com validação e proteção anti-spam)
   10. Botão voltar ao topo
   11. Ano no rodapé
   ========================================================================== */

(function () {
  "use strict";

  /* ===================== 1. CONFIGURAÇÃO EDITÁVEL ======================= */
  /* >>> ALTERE AQUI se mudar o telefone ou o ano de fundação da empresa <<< */
  var CONFIG = {
    anoFundacao: 2015,            // ano em que a CFlima começou a trabalhar
    whatsapp: "5512997766193",    // 55 + DDD + número, só dígitos
    limiteTexto: 700              // tamanho máximo da mensagem enviada
  };

  /* ============ 2. MARCA "js" NO <html> (evita piscar do conteúdo) ====== */
  document.documentElement.classList.add("js");

  var reduzirMovimento =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Atalhos utilitários */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  document.addEventListener("DOMContentLoaded", function () {

    /* ======================= 3. CABEÇALHO FIXO ========================== */
    var cabecalho = $(".cabecalho");
    var btnTopo = $(".fab--topo");

    function aoRolar() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (cabecalho) cabecalho.classList.toggle("is-fixo", y > 24);
      if (btnTopo) btnTopo.classList.toggle("is-visivel", y > 520);
    }

    var travado = false;
    window.addEventListener(
      "scroll",
      function () {
        if (travado) return;
        travado = true;
        window.requestAnimationFrame(function () {
          aoRolar();
          travado = false;
        });
      },
      { passive: true }
    );
    aoRolar();

    /* ========================= 4. MENU MOBILE =========================== */
    var hamburguer = $(".hamburguer");
    var menu = $(".menu-mobile");

    function fecharMenu() {
      if (!menu || !hamburguer) return;
      menu.classList.remove("is-aberto");
      hamburguer.classList.remove("is-aberto");
      hamburguer.setAttribute("aria-expanded", "false");
      document.body.classList.remove("trava-scroll");
    }

    if (hamburguer && menu) {
      hamburguer.addEventListener("click", function () {
        var abrir = !menu.classList.contains("is-aberto");
        menu.classList.toggle("is-aberto", abrir);
        hamburguer.classList.toggle("is-aberto", abrir);
        hamburguer.setAttribute("aria-expanded", abrir ? "true" : "false");
        document.body.classList.toggle("trava-scroll", abrir);
        if (abrir) {
          var primeiro = $("a", menu);
          if (primeiro) primeiro.focus();
        }
      });

      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", fecharMenu);
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fecharMenu();
      });
    }

    /* ==================== 5. ANIMAÇÕES DE ENTRADA ======================= */
    var alvos = $$(".reveal");
    if (alvos.length) {
      if (!("IntersectionObserver" in window) || reduzirMovimento) {
        alvos.forEach(function (el) { el.classList.add("is-visivel"); });
      } else {
        var obs = new IntersectionObserver(
          function (entradas) {
            entradas.forEach(function (ent) {
              if (ent.isIntersecting) {
                ent.target.classList.add("is-visivel");
                obs.unobserve(ent.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );
        alvos.forEach(function (el) { obs.observe(el); });
      }
    }

    /* ============== 6. CONTADORES + ANOS DE EMPRESA ===================== */
    var anosDeEstrada = Math.max(
      1,
      new Date().getFullYear() - CONFIG.anoFundacao
    );

    /* preenche automaticamente todo lugar que mostra os anos de empresa */
    $$("[data-anos]").forEach(function (el) {
      if (el.hasAttribute("data-contador")) {
        el.setAttribute("data-contador", String(anosDeEstrada));
        el.textContent = "0";
      } else {
        el.textContent = String(anosDeEstrada);
      }
    });
    $$("[data-ano-fundacao]").forEach(function (el) {
      el.textContent = String(CONFIG.anoFundacao);
    });

    function animarContador(el) {
      var alvo = parseFloat(el.getAttribute("data-contador")) || 0;
      var sufixo = el.getAttribute("data-sufixo") || "";
      var prefixo = el.getAttribute("data-prefixo") || "";
      var decimais = parseInt(el.getAttribute("data-decimais"), 10) || 0;

      /* formata no padrão brasileiro: 2.500 / 4,9 */
      function formatar(n) {
        try {
          return n.toLocaleString("pt-BR", {
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais
          });
        } catch (err) {
          return n.toFixed(decimais).replace(".", ",");
        }
      }

      if (reduzirMovimento) {
        el.textContent = prefixo + formatar(alvo) + sufixo;
        return;
      }
      var duracao = 1500;
      var inicio = null;

      function passo(agora) {
        if (inicio === null) inicio = agora;
        var p = Math.min((agora - inicio) / duracao, 1);
        var suave = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = prefixo + formatar(alvo * suave) + sufixo;
        if (p < 1) window.requestAnimationFrame(passo);
      }
      window.requestAnimationFrame(passo);
    }

    var contadores = $$("[data-contador]");
    if (contadores.length) {
      if (!("IntersectionObserver" in window)) {
        contadores.forEach(animarContador);
      } else {
        var obsNum = new IntersectionObserver(
          function (entradas) {
            entradas.forEach(function (ent) {
              if (ent.isIntersecting) {
                animarContador(ent.target);
                obsNum.unobserve(ent.target);
              }
            });
          },
          { threshold: 0.5 }
        );
        contadores.forEach(function (el) { obsNum.observe(el); });
      }
    }

    /* ==================== 7. GALERIA COM LIGHTBOX ======================= */
    var fotos = $$(".foto");
    var lightbox = $(".lightbox");

    if (fotos.length && lightbox) {
      var lbImg = $(".lightbox__img", lightbox);
      var lbLegenda = $(".lightbox__legenda", lightbox);
      var lbContador = $(".lightbox__contador", lightbox);
      var lbFechar = $(".lightbox__fechar", lightbox);
      var lbAnt = $(".lightbox__btn--ant", lightbox);
      var lbProx = $(".lightbox__btn--prox", lightbox);
      var atual = 0;
      var ultimoFoco = null;

      function mostrar(i) {
        atual = (i + fotos.length) % fotos.length;
        var botao = fotos[atual];
        var img = $("img", botao);
        var src = botao.getAttribute("data-full") || (img ? img.getAttribute("src") : "");
        var legenda =
          botao.getAttribute("data-legenda") ||
          (img ? img.getAttribute("alt") : "") ||
          "";

        if (lbImg) {
          lbImg.setAttribute("src", src);
          lbImg.setAttribute("alt", legenda);
        }
        /* textContent (nunca innerHTML) — nada do conteúdo vira HTML */
        if (lbLegenda) lbLegenda.textContent = legenda;
        if (lbContador) {
          lbContador.textContent = atual + 1 + " / " + fotos.length;
        }
      }

      function abrir(i) {
        ultimoFoco = document.activeElement;
        mostrar(i);
        lightbox.classList.add("is-aberto");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("trava-scroll");
        if (lbFechar) lbFechar.focus();
      }

      function fechar() {
        lightbox.classList.remove("is-aberto");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("trava-scroll");
        if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
      }

      fotos.forEach(function (botao, i) {
        botao.addEventListener("click", function () { abrir(i); });
      });

      if (lbFechar) lbFechar.addEventListener("click", fechar);
      if (lbAnt) lbAnt.addEventListener("click", function () { mostrar(atual - 1); });
      if (lbProx) lbProx.addEventListener("click", function () { mostrar(atual + 1); });

      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) fechar();
      });

      document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("is-aberto")) return;
        if (e.key === "Escape") fechar();
        else if (e.key === "ArrowLeft") mostrar(atual - 1);
        else if (e.key === "ArrowRight") mostrar(atual + 1);
        else if (e.key === "Tab") {
          /* mantém o foco preso dentro do lightbox */
          var focaveis = $$("button", lightbox);
          if (!focaveis.length) return;
          var primeiro = focaveis[0];
          var ultimo = focaveis[focaveis.length - 1];
          if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault();
            ultimo.focus();
          } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primeiro.focus();
          }
        }
      });
    }

    /* =================== 8. CARROSSEL DE AVALIAÇÕES ===================== */
    var trilho = $(".avaliacoes__trilho");
    if (trilho) {
      var itens = $$(".depoimento", trilho);
      var pontosBox = $(".carrossel__pontos");
      var btnAnt = $(".carrossel__btn--ant");
      var btnProx = $(".carrossel__btn--prox");
      var pontos = [];

      if (pontosBox && itens.length) {
        itens.forEach(function (_, i) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "ponto";
          b.setAttribute("aria-label", "Ir para a avaliação " + (i + 1));
          b.addEventListener("click", function () { irPara(i); });
          pontosBox.appendChild(b);
          pontos.push(b);
        });
      }

      function larguraItem() {
        if (!itens.length) return 1;
        var estilo = window.getComputedStyle(trilho);
        var gap = parseFloat(estilo.columnGap || estilo.gap) || 0;
        return itens[0].getBoundingClientRect().width + gap;
      }

      function indiceAtual() {
        return Math.round(trilho.scrollLeft / larguraItem());
      }

      function irPara(i) {
        var max = itens.length - 1;
        var alvo = Math.max(0, Math.min(i, max));
        trilho.scrollTo({
          left: alvo * larguraItem(),
          behavior: reduzirMovimento ? "auto" : "smooth"
        });
      }

      /* chegou ao fim da rolagem? (o último item pode não ficar no início) */
      function noFim() {
        return trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
      }

      function atualizarPontos() {
        var i = noFim() ? itens.length - 1 : indiceAtual();
        pontos.forEach(function (p, k) {
          p.classList.toggle("is-ativo", k === i);
        });
      }

      trilho.addEventListener("scroll", function () {
        window.requestAnimationFrame(atualizarPontos);
      }, { passive: true });

      if (btnAnt) btnAnt.addEventListener("click", function () { irPara(indiceAtual() - 1); });
      if (btnProx) btnProx.addEventListener("click", function () { irPara(indiceAtual() + 1); });

      atualizarPontos();
      window.addEventListener("resize", atualizarPontos);

      /* passagem automática, pausada ao interagir */
      if (!reduzirMovimento && itens.length > 1) {
        var timer = window.setInterval(function () {
          if (document.hidden) return;
          irPara(noFim() ? 0 : indiceAtual() + 1);
        }, 6500);

        ["pointerenter", "focusin", "touchstart"].forEach(function (ev) {
          trilho.addEventListener(ev, function () {
            window.clearInterval(timer);
          }, { passive: true });
        });
      }
    }

    /* ============ 9. FORMULÁRIO -> WHATSAPP (seguro, sem servidor) ======= */
    var form = $("#form-orcamento");
    if (form) {
      var status = $(".form__status", form);
      var carregadoEm = Date.now();

      /* remove caracteres de controle e limita o tamanho:
         nada do que o visitante digita vira HTML em nenhum momento */
      function limpar(txt, max) {
        return String(txt || "")
          .replace(/[\u0000-\u001F\u007F]/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim()
          .slice(0, max || 120);
      }

      function avisar(msg, ok) {
        if (!status) return;
        status.textContent = msg;
        status.className = "form__status " + (ok ? "is-ok" : "is-erro");
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        /* armadilha anti-robô: campo escondido que só um bot preencheria */
        var isca = form.querySelector('input[name="website"]');
        if (isca && isca.value !== "") return;

        /* envio rápido demais = provável robô */
        if (Date.now() - carregadoEm < 2500) {
          avisar("Aguarde um instante antes de enviar.", false);
          return;
        }

        var nome = limpar(form.nome ? form.nome.value : "", 80);
        var telefone = limpar(form.telefone ? form.telefone.value : "", 25);
        var servico = limpar(form.servico ? form.servico.value : "", 60);
        var origem = limpar(form.origem ? form.origem.value : "", 90);
        var destino = limpar(form.destino ? form.destino.value : "", 90);
        var mensagem = limpar(
          form.mensagem ? form.mensagem.value : "",
          CONFIG.limiteTexto
        );

        var digitos = telefone.replace(/\D/g, "");

        if (nome.length < 2) {
          avisar("Por favor, informe seu nome.", false);
          if (form.nome) form.nome.focus();
          return;
        }
        if (digitos.length < 10 || digitos.length > 13) {
          avisar("Informe um telefone válido com DDD. Ex.: (12) 99999-9999", false);
          if (form.telefone) form.telefone.focus();
          return;
        }

        var linhas = [
          "Olá, CFlima! Gostaria de um orçamento.",
          "",
          "Nome: " + nome,
          "Telefone: " + telefone
        ];
        if (servico) linhas.push("Serviço: " + servico);
        if (origem) linhas.push("Origem: " + origem);
        if (destino) linhas.push("Destino: " + destino);
        if (mensagem) linhas.push("", "Detalhes: " + mensagem);

        var url =
          "https://wa.me/" +
          CONFIG.whatsapp +
          "?text=" +
          encodeURIComponent(linhas.join("\n"));

        avisar(
          "Tudo certo! Estamos abrindo o WhatsApp com o seu pedido de orçamento.",
          true
        );

        var aba = window.open(url, "_blank", "noopener,noreferrer");
        if (!aba) window.location.href = url; /* caso o pop-up seja bloqueado */
      });
    }

    /* ===================== 10. BOTÃO VOLTAR AO TOPO ===================== */
    if (btnTopo) {
      btnTopo.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: reduzirMovimento ? "auto" : "smooth"
        });
      });
    }

    /* ======================== 11. ANO NO RODAPÉ ========================= */
    $$("[data-ano-atual]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  });
})();
