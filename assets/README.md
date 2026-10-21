# Assets — Portfólio Pedro Paulo

Esta pasta guarda as imagens e o currículo do site. As imagens reais já estão otimizadas em **WebP**.

## Currículo (CV)

O botão **"Baixar currículo"** aponta para `assets/cv-pedro-paulo.pdf`.

✅ O arquivo já está nesta pasta, então o botão já funciona. Para atualizar, substitua o arquivo mantendo o mesmo nome.

## Imagens

| Onde aparece no site              | Arquivo                            | Dimensões |
| --------------------------------- | ---------------------------------- | --------- |
| Ilustração do hero                | `assets/icon-hero.webp`            | 960×960   |
| Foto de perfil (Sobre)            | `assets/pedro-icon.webp`           | 1000×1000 |
| Projeto · Pipeline B3 (diagrama)  | `assets/project-b3.webp`           | 1280×801  |
| Projeto · Pipeline B3 (dashboard) | `assets/project-b3-dashboard.webp` | 1152×720  |
| Projeto · DW de Marketing         | `assets/project-marketing-dw.webp` | 1280×801  |
| Projeto · Desafio Lighthouse      | `assets/project-lighthouse.webp`   | 1280×801  |
| Projeto · Torneios da FIFA        | `assets/project-soccer.webp`       | 1280×801  |
| Projeto · Petit Allegro           | `assets/project-ballet.webp`       | 1600×900  |
| Projeto · Studio Helena Fernandes | `assets/project-beleza.webp`       | 1600×900  |
| Open Graph (compartilhamento)     | `assets/card-link.jpg`             | 1200×630  |
| Favicon                           | `assets/favicon.svg`               | 64×64     |

O print do dashboard (`project-b3-dashboard.webp`) é do app no Streamlit; refaça a captura quando o dashboard mudar.

Para trocar uma imagem: salve o novo arquivo em `assets/` e atualize o `src` correspondente no `index.html` (mantenha `alt` descritivo e `loading="lazy"`).

## Como gerar WebP

As imagens reais foram convertidas de JPG/PNG para WebP (redução de ~90–97%). Para otimizar novas imagens, use [squoosh.app](https://squoosh.app/) ou Pillow:

```python
from PIL import Image
im = Image.open("foto.jpg").convert("RGB")
im.thumbnail((1600, 1600), Image.LANCZOS)   # cap no maior lado
im.save("foto.webp", "WEBP", quality=84, method=6)
```

## Recomendações

- Thumbs de projeto: proporção ~**8:5** (paisagem).
- Foto de perfil: **quadrada**.
