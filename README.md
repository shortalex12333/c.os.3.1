# CelesteOS v3.1 - Enterprise RAG Platform

A sophisticated ChatGPT-style interface for enterprise RAG (Retrieval-Augmented Generation) platforms, designed for high-value clients with professional-grade features and polish.

## 🌟 Features

- **Sophisticated UI**: ChatGPT-inspired interface with enterprise polish
- **Blue Gradient System**: Version 32 recreation with smooth transitions
- **AI Solution Cards**: Multi-solution display with confidence indicators
- **Responsive Design**: Desktop (760px) and mobile (390px) optimized
- **Advanced Animations**: 280ms/200ms/60ms motion specifications
- **Component Library**: Complete design token system with variants
- **Glass Morphism**: Advanced backdrop blur effects
- **Enterprise Grade**: Built for $15k/month platform standards

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Key URLs

- **Main Interface**: `http://localhost:3000`
- **Comparison Frame**: `http://localhost:3000#comparison`
- **Mobile Testing**: Use browser dev tools

## 🏗️ Architecture

### Core Components
- **App.tsx**: Main controller with background system
- **ChatArea.tsx**: Main chat interface with message handling
- **AISolutionCard.tsx**: Basic solution card component
- **AISolutionCardLibrary.tsx**: Advanced component library with variants
- **Sidebar.tsx**: Navigation with glass morphism effects
- **InputArea.tsx**: Chat input with modern styling

### Design System
- **4px Grid System**: All spacing follows 4px increments
- **Eloquia Typography**: Display for titles, Text for body content
- **Design Tokens**: CSS custom properties for consistency
- **Responsive Scaling**: Professional mobile adaptations

## 🎨 Component Library

### AI Solution Card Variants
```tsx
<AISolutionCardLibrary
  solutions={data}
  variant={{
    state: 'expanded',      // expanded | collapsed
    confidence: 'high',     // low | medium | high
    mode: 'desktop',        // desktop | mobile
    motion: 'default'       // default | reduced-motion
  }}
/>
```

### Confidence Badge Colors
- **High**: Blue gradient (#0070FF → #00A4FF)
- **Medium**: Light blue (#dbeafe)
- **Low**: Grey (#f3f4f6)

## 📱 Responsive Design

| Platform | Max Width | Padding | Card Padding |
|----------|-----------|---------|--------------|
| Desktop | 760px | 24px | 24px |
| Mobile | 390px | 16px | 16px/12px |

## ✨ Motion Specifications

- **Expand**: 280ms cubic-bezier(0.22,0.61,0.36,1)
- **Collapse**: 200ms cubic-bezier(0.22,0.61,0.36,1)
- **Stagger**: 60ms intervals between elements
- **Accessibility**: Full reduced motion support

## 🛠️ Development

### Adding Components
1. Follow existing patterns in `/components`
2. Use design tokens from `globals.css`
3. Implement responsive variants
4. Include motion specifications
5. Add accessibility support

### Testing
- Desktop layout validation
- Mobile responsive testing
- Motion timing verification
- Accessibility compliance
- Performance optimization

## 📈 Performance

- **60fps Animations**: GPU acceleration with transforms
- **Bundle Optimization**: Tree-shaking and code splitting
- **Memory Efficient**: Proper cleanup and state management
- **Accessibility**: WCAG 2.1 AA compliance

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=your_api_endpoint
VITE_ENV=production
```

### Browser Support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📚 Documentation

See `/guidelines/Guidelines.md` for complete implementation details, component usage, and development workflow.

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use design tokens consistently
3. Maintain 60fps performance
4. Test desktop and mobile thoroughly
5. Update documentation

---

**CelesteOS v3.1** - Enterprise-grade ChatGPT-style interface with sophisticated design, advanced features, and professional polish suitable for high-value enterprise clients.