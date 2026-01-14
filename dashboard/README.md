# Air Quality Monitoring Dashboard

An interactive web-based dashboard for monitoring air quality across Monash Malaysia Campus, specifically designed to detect and alert when smoking occurs.

**Built by:** Monash Smokers - No Smoking Team
**Campus:** Monash Malaysia Campus

## Features

### Core Functionality
- **Real-time Air Quality Monitoring** - Live tracking of AQI, PM2.5, PM10, CO2, NO2, temperature, and humidity
- **Interactive Campus Map** - Visual representation of sensor locations with color-coded status indicators
- **Smoke Detection System** - Automatic alerts when smoke is detected at any sensor location
- **Data Visualization** - Real-time charts showing historical trends for all air quality metrics
- **Testing Panel** - Simulate smoke detection events for demonstration and testing purposes
- **Alert System** - Toast notifications and alert banners with sound alerts for critical events
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Dashboard Components

#### 1. Overall Status Panel
- Campus-wide AQI average
- Active sensor count
- Daily smoke alert counter
- Quick statistics (temperature, humidity, PM2.5)

#### 2. Interactive Campus Map
- 8 sensor locations across campus
- Color-coded markers based on air quality (Good, Moderate, Unhealthy, Hazardous)
- Click sensors for detailed readings
- Hover for quick statistics
- Visual smoke alerts with animated markers

#### 3. Real-time Charts
- PM2.5 levels over time
- PM10 levels over time
- CO2 concentration tracking
- Temperature and humidity trends
- Auto-updating every 5 seconds

#### 4. Sensor Details
- Individual sensor cards with current readings
- Location information and area classification
- Modal view for detailed metrics
- Status indicators for each sensor

#### 5. Testing Panel
- One-click smoke simulation
- Random location selection
- Visual feedback and status updates
- Automatic reset after 30 seconds

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airqualitymonitor_dashboard/dashboard
   ```

2. **Add Campus Map (Optional)**
   - Place your campus map image in `dashboard/assets/campus-map/`
   - Supported formats: PNG, JPG, SVG
   - Recommended filename: `monash-campus-map.png` or `monash-campus-map.jpg`

3. **Launch the Dashboard**

   **Option A: Using Python**
   ```bash
   python -m http.server 8000
   ```
   Then open http://localhost:8000

   **Option B: Using Node.js**
   ```bash
   npx http-server
   ```

   **Option C: Direct File Access**
   - Simply open `index.html` in your web browser
   - Note: Some features may be limited without a web server

4. **Access the Dashboard**
   - Open your browser and navigate to the URL from step 3
   - The dashboard will initialize automatically

## Usage Guide

### Viewing Air Quality Data
1. The main map displays all sensor locations with color-coded markers
2. **Green** = Good air quality (AQI 0-50)
3. **Yellow** = Moderate air quality (AQI 51-100)
4. **Orange** = Unhealthy air quality (AQI 101-150)
5. **Red** = Hazardous air quality (AQI 151+)

### Checking Sensor Details
- **Hover** over any sensor marker for quick stats
- **Click** on a sensor marker or sensor card for detailed readings
- View all metrics: PM2.5, PM10, CO2, NO2, temperature, humidity

### Testing Smoke Detection
1. Locate the "Testing Panel" in the left sidebar
2. Click the "Trigger Smoke Alert" button
3. A smoke warning will appear at a random campus location
4. Observe the following:
   - Smoke marker animation on the map
   - Alert banner at the top
   - Toast notification with sound
   - Updated alert history
   - Elevated pollutant readings at the affected sensor
5. The alert will automatically clear after 30 seconds

### Keyboard Shortcuts
- **T** - Trigger test smoke alert
- **ESC** - Close modals and alerts

## Technical Details

### Data Simulation
The dashboard uses simulated air quality data based on typical readings for the Monash Malaysia Campus area (Bandar Sunway, Selangor). The simulation includes:
- Realistic baseline values for tropical climate
- Random variations to simulate natural fluctuations
- Location-based adjustments (e.g., higher readings near parking areas)
- Smoke event simulation with elevated pollutant levels

### Sensor Locations
The dashboard tracks 8 sensor locations:
1. Library Entrance (Academic Zone)
2. Student Hub (Student Area)
3. Engineering Building (Academic Zone)
4. Medical Building (Academic Zone)
5. Sports Complex (Recreation Area)
6. Parking Area A (Parking)
7. Cafeteria (Food Court)
8. Main Gate (Entry Point)

### AQI Calculation
Air Quality Index is calculated using the US EPA standard based on PM2.5 concentrations.

### Update Intervals
- Sensor data: Every 5 seconds
- Charts: Every 5 seconds
- Statistics: Every 5 seconds
- Time display: Every 1 second

## File Structure

```
dashboard/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Complete styling and responsive design
├── js/
│   ├── data.js            # Data simulation and management
│   ├── charts.js          # Chart.js visualization
│   ├── map.js             # Interactive map functionality
│   ├── alerts.js          # Alert and notification system
│   └── app.js             # Main application controller
├── assets/
│   └── campus-map/        # Campus map images (upload here)
│       └── README.md      # Instructions for map upload
└── data/                  # Reserved for future data storage
```

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript (ES6+)** - Application logic and interactivity
- **Chart.js** - Data visualization library
- **Web Audio API** - Alert sound generation
- **CSS Custom Properties** - Theming and color management

## Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Future Enhancements

- [ ] Integration with real sensor hardware
- [ ] Backend API for data persistence
- [ ] Historical data export (CSV, JSON)
- [ ] User authentication and roles
- [ ] Email/SMS alert notifications
- [ ] Weather data integration
- [ ] Predictive analytics
- [ ] PWA support for offline access
- [ ] Multi-language support

## Troubleshooting

### Charts Not Displaying
- Ensure you have an internet connection (Chart.js loads from CDN)
- Check browser console for errors
- Try refreshing the page

### Campus Map Not Showing
- Verify the image file is in `dashboard/assets/campus-map/`
- Check that the filename matches one of the supported names
- Ensure the image format is PNG, JPG, or SVG

### Alerts Not Working
- Check browser console for errors
- Ensure browser allows sound (some browsers block auto-play audio)
- Try manually triggering a test alert

## Data Privacy & Notes

- All data is simulated and runs entirely in the browser
- No data is collected or transmitted to external servers
- Real sensor integration will require backend implementation
- This is a demonstration/prototype version

## Credits

**Developed by:** Monash Smokers - No Smoking Team
**Institution:** Monash Malaysia Campus
**Purpose:** Campus air quality monitoring and smoke detection

## License

This project is developed for educational and demonstration purposes.

## Contact & Support

For questions, issues, or contributions, please contact the Monash Smokers - No Smoking Team.

---

**Version:** 1.0.0
**Last Updated:** January 2026
