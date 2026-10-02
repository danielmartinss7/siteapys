# Apys Produções — Site institucional

Site one-page, responsivo (mobile-first), feito em HTML, CSS e JavaScript puros, sem build nem dependências.

## Como visualizar

Abra o `index.html` no navegador. Se preferir um servidor local:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

Para publicar, envie a pasta inteira para qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, Hostinger etc.).

## Estrutura

```
index.html            → todas as seções (Home, Sobre, Serviços, Como funciona,
                        Portfólio, Depoimentos, Preços, FAQ, Contato, Rodapé)
css/style.css         → estilos, organizados por seção (índice no topo do arquivo)
js/main.js            → menu mobile, scroll reveal, carrossel, acordeão, formulário
assets/img/           → versões do logotipo (branco, dourado, preto, vinho, marinho)
```

## Identidade visual

| Cor | Hex | Variável CSS |
|---|---|---|
| Vinho escuro | `#73030D` | `--wine` |
| Vermelho terracota | `#8F0F16` | `--terracotta` |
| Azul-marinho escuro | `#051A59` | `--navy` |
| Azul médio | `#003B7E` | `--blue` |
| Amarelo/dourado | `#FCAD3B` | `--gold` |

- **Títulos:** Fraunces (serifada, com ar retrô)
- **Corpo:** Work Sans (sans-serif)

Todas as cores e fontes ficam em `:root`, no início de `css/style.css`.

## O que falta preencher (procure por `TODO` no código)

1. **Logo em alta resolução:** os PNGs em `assets/img/` foram recortados do manual de aplicações e têm resolução limitada. Substitua pelos arquivos originais, de preferência em **SVG**, com os mesmos nomes.
2. **Textos finais:** história da produtora (em "Sobre nós") e respostas do FAQ.
3. **Formulário:** sem configuração, o botão abre o app de e-mail de quem está visitando. Para receber as mensagens direto, crie um formulário no [Formspree](https://formspree.io) (ou serviço parecido) e cole a URL no atributo `data-endpoint` do `<form id="contact-form">`.
4. **Imagem de compartilhamento** (`og:image`, 1200×630) no `<head>`.

## Como atualizar conteúdo

- **Fotos da equipe:** `assets/img/equipe/` (quadradas, 400×400, rosto centralizado). O recorte hexagonal é aplicado pelo CSS.
- **Portfólio:** capas em `assets/img/portfolio/` (16:9). O comentário acima de `.portfolio-grid` explica como adicionar novos projetos.
- **Contatos:** WhatsApp, e-mail e Instagram aparecem na seção Contato e no rodapé (e o e-mail também em `data-mailto` do formulário).

## Acessibilidade e desempenho

- Contraste adequado entre texto e fundo em todas as combinações da paleta
- Navegação por teclado, link "Pular para o conteúdo", acordeão e menu com atributos ARIA
- Animações discretas, desligadas automaticamente para quem ativou "reduzir movimento" no sistema
- Sem JavaScript, o conteúdo continua todo visível
