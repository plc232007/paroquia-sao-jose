# Brief de revisão de design — Paróquia São José

## Ancoragem no assunto (atualizado — devoção real da paróquia)
Não é mais iconografia genérica de São José. A paróquia tem uma devoção própria e específica:
**São José das Mãos Piedosas** — a imagem que fica na igreja, com a mão direita estendida
(gesto de acolhida e proteção) e a mão esquerda segurando um lírio/vara florida (fidelidade à
vontade de Deus). Celebração toda quarta-feira, 19h, com partilha de testemunhos ao final.
Fonte: `https://www.paroquiasaojose.org/missa-votiva-de-sao-jose-das-maos-piedosas/`.

Isso é muito mais forte que iconografia genérica de santo — é a identidade *desta* paróquia
especificamente, ninguém mais no mundo tem essa mesma imagem com esse mesmo nome. É isso que
vira o elemento assinatura, substituindo qualquer proposta genérica de "vara florida decorativa"
por algo com conteúdo real por trás.

**Fotos reais da imagem** (baixar para `assets/img/`, ainda não estão no repo):
```
https://www.paroquiasaojose.org/wp-content/uploads/2024/12/Imagem_1-1024x682.jpeg
https://www.paroquiasaojose.org/wp-content/uploads/2024/12/Imagem_2-682x1024.jpeg
https://www.paroquiasaojose.org/wp-content/uploads/2024/12/Imagem_3.1-1024x682.jpeg
https://www.paroquiasaojose.org/wp-content/uploads/2024/12/Imagem_3.2-1024x682.jpeg
```
(o sandbox onde eu trabalho não tem esse domínio liberado pra `wget`/`curl` — baixe local ou
peça pro Claude Code rodando na sua máquina, que tem internet livre.)

**Paleta extraída das fotos reais** (mais fiel ao objeto de devoção do que o azul genérico
atual):
```
--lilas            #8a7ba3   manto externo da imagem (lilás/cinza-arroxeado)
--dourado-manto    #c9a227   (já existe — bate exatamente com o dourado do bordado da túnica, mantém)
--terracota-tunica #b98a5a   túnica interna dourada/ocre
--lirio-branco     #fbf9f2   branco quente das flores, não branco puro
```
Proposta: manter `--azul-escuro`/`--azul` como cor institucional geral do site (menu, rodapé,
identidade "paróquia"), mas usar `--lilas` + `--terracota-tunica` como paleta **exclusiva da
seção/página de Mãos Piedosas** — isso cria uma sub-identidade coerente com o resto sem forçar
o site inteiro a virar lilás.

## Sistema de tokens (mantendo o que já funciona, cortando o que é clichê)

**Cor** — manter a paleta atual, ela é tematicamente correta (azul = manto de José na
iconografia tradicional, dourado = liturgia/sacro). O problema nunca foi a cor, foi o uso dela
em formas genéricas.
```
azul-escuro  #232e6a   (mantém)
azul         #0170B9   (mantém)
dourado      #c9a227   (mantém, mas usar com mais parcimônia — reservar pra 1 elemento por seção)
texto        #3a3a3a   (mantém)
cinza-claro  #F5F5F5   (mantém)
```

**Tipografia** — manter Playfair Display + Roboto (a dupla já está no repo e no README como
identidade estabelecida; trocar agora seria descartar trabalho sem ganho real). O ajuste é de
**peso/escala**, não de fonte: reduzir o uso de Playfair só a H1/H2, nunca em rótulos ou botões
onde hoje aparece através do `.card h3`.

**Layout** — estrutura de página mantém-se (hero → seções → cards → footer), isso é
apropriado pro conteúdo (não é um site que precisa de layout experimental). O que muda é o
*enchimento* de cada bloco decorativo:

```
ANTES (genérico)                      DEPOIS (ancorado no assunto)
┌─────────────────┐                   ┌─────────────────┐
│   ○ círculo      │                   │  ╱ vara florida  │
│   decorativo     │        →          │   linha fina,    │
│   abstrato       │                   │   sai da borda   │
└─────────────────┘                   └─────────────────┘

ícone card:                            ícone card:
● gradiente + svg genérico    →        recorte de madeira/serrote como
  (chave, relógio, etc)                moldura do ícone, não círculo cheio

botão pill 999px               →       botão com canto reto + chanfro único
                                        no canto (referência a esquadria/esquadro
                                        de carpinteiro, sem virar literal demais)
```

## Elemento assinatura (revisado)
O gesto da **mão direita estendida** é o elemento assinatura — não é decoração abstrata, é o
próprio significado da devoção ("acolhida e proteção"). Dois usos concretos:
1. Um SVG de linha fina só do contorno da mão aberta (traçado simples, não realista/clip-art),
   usado como o mesmo tipo de divisor que a vara florida faria — mas carregando o significado
   certo em vez de um genérico.
2. Foto real da imagem (`Imagem_1` ou `Imagem_2` da lista acima) como imagem de fundo do hero
   da página dedicada — substitui qualquer ilustração por fotografia documental real, que é
   sempre mais forte que ícone genérico quando você tem o objeto de devoção real disponível.

Ainda vale manter o lírio como motivo secundário (ele já é parte da própria imagem, não é
invenção), mas em segundo plano — o protagonista visual é a mão.

## Página dedicada (conteúdo que falta hoje)
Hoje "Mãos Piedosas" é só um link externo no `index.html`. Criar
`paroquia/sao-jose-das-maos-piedosas.html` seguindo o mesmo padrão de `data-raiz`/`data-pagina`
das outras páginas, com:
- Hero com foto real da imagem (paleta lilás/terracota desta seção, não azul institucional).
- Texto sobre o significado do gesto (mão estendida = acolhida/proteção; lírio = fidelidade),
  já disponível na página original — trazer o conteúdo real, não reescrever.
- Horário fixo: quarta-feira, 19h — isso é informação prática, deve estar visível sem precisar
  ler o parágrafo inteiro (ex: um destaque tipo "badge" de horário, não escondido no texto corrido).
- Menção ao momento de partilha de testemunhos ao final da missa.
- Link de volta pro card na home deve apontar pra essa página nova, não mais pro site antigo.

## O que cortar sem substituir
- Círculos abstratos do `.pagina-hero::before/::after` — cortar, não substituir por outra forma. Não precisa de decoração ali.
- Gradiente diagonal genérico nos ícones de card — substituir por um recorte/silhueta mais plana com 1 cor sólida (azul-escuro) e o próprio ícone em traço fino, sem fundo circular.

## Prioridade de execução (nesta ordem)
1. **Acessibilidade primeiro**: adicionar `:focus-visible` visível em `.btn`, `nav.menu a`, `.card` — isso não é estético, é funcional, e está faltando hoje.
2. Baixar as 4 fotos reais da imagem de Mãos Piedosas para `assets/img/` (renomear pra algo legível, ex: `sao-jose-maos-piedosas-01.jpg`).
3. Criar `paroquia/sao-jose-das-maos-piedosas.html` com conteúdo real (ver seção "Página dedicada" acima) — sem isso, qualquer trabalho visual fica em cima de uma página que não existe.
4. Atualizar o card/link da home pra apontar pra essa página nova, com a foto real como thumbnail em vez do genérico atual.
5. Aplicar a paleta `--lilas`/`--terracota-tunica`/`--lirio-branco` só nessa página/seção.
6. Trocar botão pill por formato com chanfro (baixo risco, alto impacto visual) — no resto do site.
7. Trocar ícone de card (gradiente→traço fino) — no resto do site.
8. Cortar círculos decorativos do `.pagina-hero`.
9. Desenhar o SVG da mão estendida como elemento assinatura (maior esforço, por último e com mais iteração/crítica antes de aprovar).
10. Reduzir uso do dourado a 1 elemento de destaque por seção (auditoria visual, sem mudança de token).

Não fazer tudo de uma vez. Um commit por item, screenshot antes/depois de cada um.
