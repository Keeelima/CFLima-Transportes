# CF.Lima Transportes — Mudanças e Fretes

Site institucional da **CF.Lima Transportes**, empresa de mudanças e fretes de Jacareí (SP).

Feito em **HTML, CSS e JavaScript puro** — sem framework, sem build, sem dependência externa.
Não há `npm install`, não há passo de compilação: os arquivos que estão no repositório são
exatamente os que vão para o ar.

> **Stack:** HTML5 · CSS3 · JavaScript (ES5, vanilla) · hospedagem estática na Vercel

---

## 📄 Páginas

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `index.html` | Banner, números da empresa, serviços, fotos, avaliações e FAQ |
| Sobre | `sobre.html` | História da empresa, tempo de estrada e cidades atendidas |
| Serviços | `servicos.html` | Os 6 serviços detalhados |
| Galeria | `galeria.html` | Fotos com ampliação (lightbox navegável por teclado) |
| Contato | `contato.html` | Formulário de orçamento, telefones e mapa do Google |
| Erro 404 | `404.html` | Página de erro personalizada |

---

## 📁 Estrutura

```
CfLimaTransportes/
├── index.html            Página inicial
├── sobre.html            Sobre a empresa
├── servicos.html         Serviços
├── galeria.html          Galeria de fotos
├── contato.html          Contato e orçamento
├── 404.html              Página de erro
├── css/
│   └── style.css         Todo o visual (tokens de cor no topo do arquivo)
├── js/
│   └── main.js           Menu, animações, galeria, carrossel e formulário
├── images/               Fotos da frota, logo, ícones e a arte do banner
├── favicon.ico           Ícone da aba do navegador
├── site.webmanifest      Dados para instalar o site no celular
├── robots.txt            Instruções para os buscadores
├── sitemap.xml           Mapa do site para o Google
├── vercel.json           Cabeçalhos de segurança e cache
├── .vercelignore         Arquivos que não vão para o site publicado
├── .gitignore
└── README.md
```

---

## 💻 Rodar no computador

Dá para abrir **`index.html` com dois cliques** — tudo funciona, inclusive a galeria.

Para simular um servidor de verdade (URLs limpas, `robots.txt`, manifest):

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois acesse <http://localhost:8000>.

---

## ⚙️ Configuração

### Ano de fundação, WhatsApp e limite de texto

Tudo fica no topo de `js/main.js`:

```js
var CONFIG = {
  anoFundacao: 2015,            // ano em que a CFlima começou a trabalhar
  whatsapp: "5512997766193",    // 55 + DDD + número, só dígitos
  limiteTexto: 700              // tamanho máximo da mensagem enviada
};
```

Todos os textos de **"X anos de estrada"** são calculados a partir de `anoFundacao` —
o número nunca fica desatualizado sozinho.

### Endereço do site

O domínio `cflimatransportes.com.br` aparece nas tags canônicas e Open Graph das
páginas, no `sitemap.xml` e no `robots.txt`. Se o endereço final for outro
(ex.: `cflima-transportes.vercel.app`), substitua em todos esses arquivos.

> No VS Code: **Ctrl + Shift + H** (localizar e substituir em todos os arquivos).

### Números da seção de destaque

Em `index.html` e `sobre.html`, procure por `<!-- ✏️ EDITÁVEL`:

```html
<div class="numero__valor" data-contador="2500" data-sufixo="+">2.500+</div>
```

Os valores atuais (2.500 mudanças, 20 cidades, 98% de indicação) são **exemplos** —
troque pelos reais antes de divulgar o site.

### Avaliações

Em `index.html`, seção `id="avaliacoes"`, estão quatro avaliações reais recebidas no
Google, com o texto como o cliente escreveu. Para acrescentar outra, copie um bloco
`<article class="depoimento">` inteiro e troque o texto, a letra do avatar e o nome.

> O site **não** declara nota média (`aggregateRating`) nos dados estruturados: o Google
> não exibe estrelas na busca para avaliação que a própria empresa publica no site dela.
> As estrelas aparecem pelo perfil do Google Meu Negócio.

### Banner e foto do topo

São duas coisas diferentes, e vale não trocar uma pela outra:

- **A arte oficial** (`images/banner.jpg`) aparece **inteira**, na proporção original,
  na seção `.faixa-marca` do `index.html` — logo depois dos números. Sem corte e sem
  escurecimento, então o logo, os selos e o telefone ficam legíveis inclusive no celular.
- **O fundo do topo** (hero) é uma **foto**: `images/frente.jpeg`, definida no CSS em
  `.hero__midia`. Ali a imagem é cortada (`background-size: cover`) e recebe um véu
  escuro por cima, porque o site escreve o próprio título em cima dela.

⚠️ Não use uma arte com texto como fundo do hero. Numa tela de celular o corte deixa
visível só a faixa central da imagem — cerca de 18% da largura — e todo o resto some.

O arquivo `images/banner.png` (2,5 MB) é o original e fica guardado no repositório
só como fonte para futuras edições; ele está no `.vercelignore` e não vai para o ar.
Ao trocar a arte, gere um `.jpg` e atualize os atributos `width`/`height` do `<img>`
no `index.html`.

### Mapa

O mapa da CF.Lima já está incorporado em `contato.html`. Para trocar:
Google Maps → **Compartilhar** → **Incorporar um mapa** → **Copiar HTML**, e substitua
só o `src` do `<iframe>`.

⚠️ Ao colar, **apague o `style="border:0;"`** que o Google inclui — estilo inline é
bloqueado pela política de segurança do site (a borda já vem do CSS).

---

## 🔧 Pendências conhecidas

Ajustes finos que valem revisar:

- **Instagram**: o link no rodapé está como `href="#"` — coloque o endereço real ou apague o bloco `<a class="rede" ...>`.
- **Horário de atendimento**: hoje "segunda a sábado, das 7h às 19h" (rodapé e contato).
- **Segundo telefone**: aparece **(12) 97406-6193** na foto `images/pequeno.jpeg`. Se estiver ativo, vale acrescentar na página de contato.

---

## 🚀 Deploy

### GitHub e Vercel são coisas separadas

- **GitHub** guarda o código. Subir aqui **não** coloca o site no ar.
- **Vercel** hospeda e publica. É ela que gera o endereço que as pessoas acessam.

O que liga os dois é importar o repositório na Vercel **uma única vez**. Feito isso,
todo `git push` para a branch `main` publica a nova versão automaticamente.

### Atualizar o repositório

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

### Publicar na Vercel (primeira vez)

1. Entre em <https://vercel.com> e faça login com a conta do GitHub.
2. **Add New… → Project → Import Git Repository**.
3. Escolha o repositório `CFLima-Transportes`.
4. Em *Framework Preset*, selecione **Other** (é site estático, não tem build).
5. Deixe *Build Command* e *Output Directory* vazios e clique em **Deploy**.

### Domínio próprio

No projeto da Vercel: **Settings → Domains → Add**. Aponte o DNS conforme a instrução
que aparece na tela. O certificado HTTPS é emitido automaticamente e de graça.

---

## 🔒 Segurança

| Proteção | Onde | Para que serve |
|---|---|---|
| `Content-Security-Policy` | `vercel.json` | Só permite carregar código e imagens do próprio site — bloqueia injeção de script |
| `Strict-Transport-Security` | `vercel.json` | Obriga o navegador a usar sempre HTTPS |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | `vercel.json` | Impede que coloquem o site dentro de uma página falsa (clickjacking) |
| `X-Content-Type-Options: nosniff` | `vercel.json` | Impede o navegador de "adivinhar" tipos de arquivo |
| `Referrer-Policy` | `vercel.json` | Não vaza o endereço das páginas para terceiros |
| `Permissions-Policy` | `vercel.json` | Bloqueia câmera, microfone e localização |
| `rel="noopener noreferrer"` | links externos | Impede que a aba aberta manipule a página original |
| Campo-armadilha + tempo mínimo | `contato.html` / `js/main.js` | Barra robôs de spam no formulário |
| Limpeza de texto e limite de tamanho | `js/main.js` | O que o visitante digita nunca vira HTML/código |
| Sem `eval`, sem `innerHTML`, sem script inline | `js/main.js` | Compatível com a CSP mais rígida |
| Sem bibliotecas externas | site inteiro | Nada de CDN: zero risco de código de terceiro ser adulterado |

**Sobre o formulário:** ele não envia nada para servidor nenhum. A mensagem é montada
dentro do próprio navegador e aberta no WhatsApp. Como não existe banco de dados,
também não existe dado de cliente para vazar.

Depois de publicar, teste em <https://securityheaders.com> — a nota deve ser **A** ou **A+**.

---

## 🛠️ Manutenção do dia a dia

| Quero… | Vá em… |
|---|---|
| Trocar textos | o `.html` da página correspondente |
| Trocar cores | `css/style.css`, bloco `01. TOKENS` no topo |
| Acrescentar foto | `galeria.html` — copie um bloco `<button class="foto">` |
| Acrescentar serviço | `servicos.html` — copie um bloco `<article class="card">` |
| Acrescentar avaliação | `index.html` — copie um bloco `<article class="depoimento">` |
| Mudar telefone | busque `5512997766193` (links) e `(12) 99776-6193` (texto) em todos os arquivos, e `CONFIG.whatsapp` em `js/main.js` |

---

## ♿ Acessibilidade e desempenho

- Navegação completa por teclado (`Tab`, `Esc`, setas na galeria)
- Texto alternativo em todas as fotos
- Contraste alto e área de toque confortável no celular
- Respeita "reduzir movimento" do sistema (desliga as animações)
- Imagens com `loading="lazy"` e dimensões declaradas (o layout não "pula")
- Funciona mesmo com JavaScript desativado — nada some da página

---

## 📞 Contato

**CF.Lima Transportes** — Mudanças e Fretes
São José dos Campos / SP · (12) 99776-6193

---

© CF.Lima Transportes. Código e conteúdo de uso exclusivo da empresa.