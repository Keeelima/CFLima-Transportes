# CFlima Mudanças e Fretes — site institucional

Site estático em **HTML + CSS + JavaScript puro**. Sem framework, sem build,
sem dependência externa: é só copiar a pasta e publicar.

---

## 📁 Estrutura

```
meu-site/
├── index.html          Página inicial (banner, números, serviços, fotos, avaliações, FAQ)
├── sobre.html          História da empresa e tempo de estrada
├── servicos.html       Os 6 serviços em detalhe
├── galeria.html        Aba de fotos com ampliação (lightbox)
├── contato.html        Formulário de orçamento + contatos + mapa
├── 404.html            Página de erro personalizada
├── css/
│   └── style.css       Todo o visual do site
├── js/
│   └── main.js         Menu, animações, galeria, carrossel e formulário
├── images/             Fotos, logo e ícones
├── favicon.ico         Ícone da aba do navegador
├── site.webmanifest    Dados do site para celular (ícone na tela inicial)
├── robots.txt          Instruções para o Google
├── sitemap.xml         Mapa do site para o Google
├── vercel.json         Cabeçalhos de segurança e cache da Vercel
├── .vercelignore       Arquivos que não vão para o site publicado
├── .gitignore
└── README.md           Este arquivo
```

---

## ✅ Checklist antes de publicar

Faça estes ajustes **antes** de colocar o site no ar:

### 1. Trocar o endereço do site
Abra os arquivos abaixo e substitua **`cflimatransportes.com.br`** pelo endereço real
(ex.: `cflima-mudancas.vercel.app` ou `www.cflima.com.br`):

`index.html`, `sobre.html`, `servicos.html`, `galeria.html`, `contato.html`,
`sitemap.xml` e `robots.txt`.

> Dica: no VS Code use **Ctrl + Shift + H** (localizar e substituir em todos os arquivos).

### 2. Confirmar o ano de fundação  ⚠️ importante
Em `js/main.js`, primeira parte do arquivo:

```js
var CONFIG = {
  anoFundacao: 2015,          // <-- coloque o ano REAL em que a empresa começou
  whatsapp: "5512997766193",  // 55 + DDD + número, só dígitos
  limiteTexto: 700
};
```

Todos os lugares que mostram **"X anos de estrada"** são calculados a partir daí —
não precisa mexer em mais nada, e o número nunca fica desatualizado.

### 3. Colocar o seu banner
Salve a arte do banner como **`images/banner.jpg`** (tamanho recomendado: 1920 × 1080).
Enquanto esse arquivo não existir, o site usa `images/frente.jpeg` automaticamente —
ou seja, nunca fica quebrado.

### 4. Ajustar os números da seção de destaque  ⚠️
Em `index.html` e `sobre.html`, procure por `<!-- ✏️ EDITÁVEL` na seção de números
e coloque valores reais:

```html
<div class="numero__valor" data-contador="2500" data-sufixo="+">2.500+</div>
```

Hoje estão como exemplo: 2.500 mudanças, 20 cidades e 98% de clientes que indicam.

### 5. Avaliações — já estão com clientes reais ✅
Em `index.html`, seção `id="avaliacoes"`, estão as quatro avaliações recebidas no
Google: **Renan Dimitroff, Livia Souza, Virmary Arzola e Lucas**. O texto foi mantido
como o cliente escreveu (só foram recolocados os pontos finais que o Google tira
quando o texto é copiado).

Todas estão exibindo **5 estrelas** — confira no seu perfil do Google se a nota de
cada um bate. Se algum tiver dado 4, é só apagar um bloco `<svg>` das estrelas
daquele depoimento.

Para acrescentar mais avaliações, copie um bloco `<article class="depoimento">`
inteiro e troque o texto, a letra do avatar e o nome.

> O site **não** declara nota média (`aggregateRating`) nos dados estruturados: o
> Google não exibe estrela na busca para avaliação que a própria empresa publica no
> site dela. As suas estrelas aparecem pelo perfil do Google Meu Negócio.

### 6. Redes sociais
No rodapé de todas as páginas existe um link do Instagram com `href="#"`.
Coloque o link real ou apague aquele bloco `<a class="rede" ...>`.

### 7. Mapa do Google — já está no ar ✅
O mapa oficial da **CF.Lima Transportes** já está incorporado em `contato.html`,
com o botão "Abrir no Google Maps" logo abaixo. O cabeçalho de segurança
(`frame-src` no `vercel.json`) já libera o domínio do Google.

Se um dia precisar trocar o mapa: Google Maps → **Compartilhar** → **Incorporar um
mapa** → **Copiar HTML**, e substitua só o endereço do `src` do `<iframe>`.
⚠️ Ao colar, **apague o `style="border:0;"`** que o Google inclui — estilo inline é
bloqueado pela política de segurança do site (a borda já está no CSS).

### 8. Outros ajustes finos
- **Cidades atendidas**: listas em `sobre.html` e `contato.html`.
- **Horário de atendimento**: hoje "segunda a sábado, das 7h às 19h" (rodapé e contato).
- **Segundo telefone**: aparece **(12) 97406-6193** no caminhão menor da foto
  `images/pequeno.jpeg`. Se ele estiver ativo, vale acrescentar na página de contato.

---

## 🚀 Como publicar na Vercel

### Opção A — arrastar a pasta (mais rápido, sem Git)
1. Crie uma conta em <https://vercel.com>.
2. No painel, clique em **Add New… → Project → Deploy**.
3. Arraste a pasta inteira do site.
4. Em *Framework Preset*, escolha **Other** (é site estático, não tem build).
5. Clique em **Deploy**. Em segundos o site está no ar.

### Opção B — pelo GitHub (recomendado, atualiza sozinho)
```bash
git init
git add .
git commit -m "Site CFlima Mudanças e Fretes"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```
Depois, na Vercel: **Add New… → Project → Import Git Repository**.
A partir daí, todo `git push` publica a nova versão automaticamente.

### Opção C — pelo terminal
```bash
npm i -g vercel
vercel          # pré-visualização
vercel --prod   # publica de verdade
```

### Domínio próprio
No projeto da Vercel: **Settings → Domains → Add**. Aponte o DNS conforme a
instrução que aparece na tela. O HTTPS é emitido automaticamente e de graça.

---

## 🔒 Segurança

O que já vem configurado:

| Proteção | Onde | Para que serve |
|---|---|---|
| `Content-Security-Policy` | `vercel.json` | Só permite carregar código e imagens do próprio site — bloqueia injeção de script |
| `Strict-Transport-Security` | `vercel.json` | Obriga o navegador a usar sempre HTTPS |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | `vercel.json` | Impede que coloquem o seu site dentro de um site falso (clickjacking) |
| `X-Content-Type-Options: nosniff` | `vercel.json` | Impede o navegador de "adivinhar" tipos de arquivo |
| `Referrer-Policy` | `vercel.json` | Não vaza o endereço das suas páginas para terceiros |
| `Permissions-Policy` | `vercel.json` | Bloqueia câmera, microfone e localização |
| `rel="noopener noreferrer"` | todos os links externos | Impede que a aba aberta manipule a página original |
| Campo-armadilha + tempo mínimo | `contato.html` / `js/main.js` | Barra robôs de spam no formulário |
| Limpeza de texto e limite de tamanho | `js/main.js` | O que o visitante digita nunca vira HTML/código |
| Sem `eval`, sem `innerHTML`, sem script inline | `js/main.js` | Compatível com a política de segurança mais rígida |
| Sem bibliotecas externas | site inteiro | Nada de CDN: zero risco de código de terceiro ser adulterado |

**Sobre os dados do formulário:** ele não envia nada para servidor nenhum.
A mensagem é montada dentro do próprio navegador e aberta no WhatsApp.
Como não há banco de dados, também não há dado de cliente para vazar.

Depois de publicar, teste em <https://securityheaders.com> — a nota deve ser **A** ou **A+**.

---

## 🛠️ Como mexer no site depois

| Quero… | Vá em… |
|---|---|
| Trocar textos | o `.html` da página correspondente |
| Trocar cores | `css/style.css`, bloco `01. TOKENS` no topo |
| Acrescentar foto | `galeria.html` — copie um bloco `<button class="foto">` inteiro |
| Acrescentar serviço | `servicos.html` — copie um bloco `<article class="card">` |
| Acrescentar avaliação | `index.html` — copie um bloco `<article class="depoimento">` |
| Mudar telefone | busque `5512997766193` (links) e `(12) 99776-6193` (texto) em todos os arquivos, e `CONFIG.whatsapp` em `js/main.js` |

### Ver o site no computador antes de publicar
Basta dar **duplo clique em `index.html`** — funciona tudo, inclusive a galeria.
Se quiser simular o servidor de verdade:

```bash
npx serve .
# ou
python -m http.server 8000
```

---

## ♿ Acessibilidade e desempenho

- Navegação completa por teclado (`Tab`, `Esc`, setas na galeria)
- Textos alternativos em todas as fotos
- Contraste alto e área de toque confortável no celular
- Respeita "reduzir movimento" do sistema (desliga as animações)
- Imagens com `loading="lazy"` e dimensões declaradas (não "pula" o layout)
- Funciona mesmo com JavaScript desativado — nada some da página

---

© CFlima Mudanças e Fretes — (12) 99776-6193
