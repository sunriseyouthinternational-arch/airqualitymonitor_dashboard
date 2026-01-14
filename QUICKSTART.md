# Quick Start Guide - Air Quality Dashboard

## Getting Started in 3 Steps

### Step 1: Upload Campus Map (Optional)
Place your Monash Malaysia Campus map image in:
```
dashboard/assets/campus-map/
```

Supported formats: PNG, JPG, SVG

Recommended filename: `monash-campus-map.png`

### Step 2: Launch the Dashboard

Choose one of these methods:

**Method A: Python (Simplest)**
```bash
cd dashboard
python -m http.server 8000
```
Then open: http://localhost:8000

**Method B: Node.js**
```bash
cd dashboard
npx http-server
```

**Method C: Direct Access**
```bash
cd dashboard
# Simply open index.html in your browser
```

### Step 3: Test Smoke Detection

1. Look at the left sidebar for "🧪 Testing Panel"
2. Click "Trigger Smoke Alert" button
3. Watch the smoke warning appear on the map!

## Features Overview

✅ **Real-time Air Quality Monitoring** - Live AQI, PM2.5, PM10, CO2, temperature, humidity
✅ **Interactive Campus Map** - 8 sensor locations across campus
✅ **Smoke Detection Alerts** - Visual warnings + sound notifications
✅ **Data Visualization** - Real-time charts and graphs
✅ **Testing Panel** - Simulate smoke events
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Key Information

- **Data Source**: Simulated data based on Monash Malaysia Campus area (Selangor)
- **Updates**: Every 5 seconds
- **Sensors**: 8 locations across campus
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Keyboard Shortcuts

- **T** - Trigger test smoke alert
- **ESC** - Close modals

## Need Help?

Check the full documentation in `dashboard/README.md`

---

**Built by:** Monash Smokers - No Smoking Team
**Campus:** Monash Malaysia Campus
