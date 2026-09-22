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
2. **Fotos da equipe:** em "Sobre nós", troque cada `<div class="team-photo">` por `<img class="team-photo" src="..." alt="...">`. O recorte hexagonal é aplicado sozinho.
3. **Portfólio:** as instruções estão no comentário acima de `.portfolio-grid`. Os cards aceitam imagem ou vídeo incorporado (YouTube ou Vimeo).
4. **Depoimentos:** preencha os textos de Vera e Elaine. Para adicionar mais, copie um `<figure class="testimonial">`; os pontos de navegação são gerados automaticamente.
5. **FAQ:** revise as respostas (a de formas de pagamento ainda é um texto provisório).
6. **Contatos e redes sociais:** número de WhatsApp (`wa.me/55...`), e-mail, Instagram e YouTube, na seção Contato e no rodapé.
7. **Formulário:** sem configuração, o botão abre o app de e-mail de quem está visitando. Para receber as mensagens direto, crie um formulário no [Formspree](https://formspree.io) (ou serviço parecido) e cole a URL no atributo `data-endpoint` do `<form id="contact-form">`.
8. **Imagem de compartilhamento** (`og:image`, 1200×630) no `<head>`.

## Acessibilidade e desempenho

- Contraste adequado entre texto e fundo em todas as combinações da paleta
- Navegação por teclado, link "Pular para o conteúdo", acordeão e menu com atributos ARIA
- Animações discretas, desligadas automaticamente para quem ativou "reduzir movimento" no sistema
- Sem JavaScript, o conteúdo continua todo visível
