# /optimize-images - Optimize Project Images

Analyze and optimize images in the public folder.

## Instructions

### Phase 1: Scan Images

Find all images in `/public/images/`:
- JPG, JPEG, PNG, WebP, GIF, SVG
- Calculate total size
- Identify oversized images (>500KB for photos, >100KB for icons)

### Phase 2: Analysis Report

```
📊 Image Optimization Report

📁 Total images: 45
📦 Total size: 12.5 MB

🔴 Oversized (need optimization):
   /heroes/yoga-hero.jpg - 2.1 MB (should be <500KB)
   /programmes/retreat.jpg - 1.8 MB

🟡 Could be optimized:
   /testimonials/client1.jpg - 450KB

✅ Already optimized: 40 images

Potential savings: ~4.2 MB (34%)
```

### Phase 3: Optimization Options

For each oversized image, offer:

1. **Resize**: Reduce dimensions (max 1920px for heroes, 800px for cards)
2. **Compress**: Reduce quality (85% for photos, lossless for graphics)
3. **Convert**: Change format (WebP for better compression)
4. **Generate responsive**: Create multiple sizes for srcset

### Phase 4: Execute Optimization

Using available tools:
```bash
# Using ImageMagick (if available)
convert input.jpg -resize 1920x -quality 85 output.jpg

# Using sharp via Node (if available)
npx sharp-cli resize 1920 --quality 85 input.jpg -o output.jpg
```

### Phase 5: Update References

After optimization:
- Update any hardcoded image paths if filenames changed
- Verify images still display correctly
- Update CREDITS.md if needed

## Image Guidelines for This Project

| Type | Max Width | Max Size | Format |
|------|-----------|----------|--------|
| Hero | 1920px | 500KB | JPG/WebP |
| Card | 800px | 200KB | JPG/WebP |
| Thumbnail | 400px | 100KB | JPG/WebP |
| Icon | 64px | 10KB | SVG/PNG |
| Logo | 200px | 50KB | SVG/PNG |

## Next.js Image Optimization

Remember: Next.js `<Image>` component auto-optimizes at runtime.
Focus on source image quality and reasonable base sizes.
