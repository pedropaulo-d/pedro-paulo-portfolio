# Assets — Portfólio Pedro Paulo

Esta pasta guarda as imagens e o currículo do site. As imagens reais já estão otimizadas em **WebP**.

## Currículo (CV)

O botão **"Baixar currículo"** aponta para `assets/cv-pedro-paulo.pdf`.

✅ O arquivo já está nesta pasta, então o botão já funciona. Para atualizar, substitua o arquivo mantendo o mesmo nome.

## Imagens

| Onde aparece no site          | Arquivo                       | Dimensões |
| ----------------------------- | ----------------------------- | --------- |
| Ilustração do hero            | `assets/icon-hero.webp`       | 960×960   |
| Foto de perfil (Sobre)        | `assets/pedro-icon.webp`      | 1000×1000 |
| Projeto · Ballet Infantil     | `assets/project-ballet.webp`  | 1600×795  |
| Projeto · Beleza e Cosméticos | `assets/project-beleza.webp`  | 1600×741  |
| Open Graph (compartilhamento) | `assets/project-data.svg`     | 800×500   |
| Favicon                       | `assets/favicon.svg`          | 64×64     |

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
