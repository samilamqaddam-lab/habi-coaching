# /stock-image - Search Stock Images

Search for royalty-free stock images across multiple platforms.

## Arguments

- `query` (required): Search terms for the image
- `orientation` (optional): `landscape`, `portrait`, or `square`
- `count` (optional): Number of results (default: 10)

## Instructions

1. Use the MCP stock-images tool to search across:
   - Pexels
   - Unsplash
   - Pixabay

2. Present results with:
   - Thumbnail preview (if available)
   - Dimensions
   - Photographer credit
   - Direct download URL

3. If user selects an image, offer to:
   - Download to `/public/images/` with appropriate naming
   - Optimize the image (resize, compress)
   - Update component to use the new image

## Search Tips

For this project, prefer images that:
- Evoke growth, transformation, transcendence
- Are nature-based (mountains, trees, paths, light)
- Avoid humans as main focus (unless specifically needed)
- Work well in split layouts (portrait for hero)
- Have warm, golden-hour lighting

## Example Usage

```
/stock-image mountain sunset transcendence
/stock-image zen meditation space portrait
/stock-image corporate meeting professional
```

## Image Naming Convention

Save images as:
```
/public/images/heroes/<page>-<description>.jpg
/public/images/programmes/<program-name>.jpg
/public/images/testimonials/<name>.jpg
```

## Attribution

Most platforms require attribution. Store credits in:
`/public/images/CREDITS.md`
