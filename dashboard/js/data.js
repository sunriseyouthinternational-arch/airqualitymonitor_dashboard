// Air Quality Data Simulation
// Note: This data is simulated based on typical air quality readings
// for the Monash Malaysia Campus area (Bandar Sunway, Selangor)

// Sensor locations around campus
const sensorLocations = [
    {
        id: 'sensor-1',
        name: 'Library Entrance',
        position: { x: 20, y: 30 }, // Percentage positions
        area: 'Academic Zone'
    },
    {
        id: 'sensor-2',
        name: 'Student Hub',
        position: { x: 45, y: 25 },
        area: 'Student Area'
    },
    {
        id: 'sensor-3',
        name: 'Engineering Building',
        position: { x: 70, y: 35 },
        area: 'Academic Zone'
    },
    {
        id: 'sensor-4',
        name: 'Medical Building',
        position: { x: 30, y: 60 },
        area: 'Academic Zone'
    },
    {
        id: 'sensor-5',
        name: 'Sports Complex',
        position: { x: 65, y: 70 },
        area: 'Recreation Area'
    },
    {
        id: 'sensor-6',
        name: 'Parking Area A',
        position: { x: 15, y: 75 },
        area: 'Parking'
    },
    {
        id: 'sensor-7',
        name: 'Cafeteria',
        position: { x: 50, y: 55 },
        area: 'Food Court'
    },
    {
        id: 'sensor-8',
        name: 'Main Gate',
        position: { x: 85, y: 50 },
        area: 'Entry Point'
    }
];

// Global data storage
let sensorsData = {};
let historicalData = {
    pm25: [],
    pm10: [],
    co2: [],
    temp: [],
    humidity: [],
    timestamps: []
};

let alertsToday = 0;
let alertHistory = [];

// AQI Calculation (US EPA Standard)
function calculateAQI(pm25) {
    if (pm25 <= 12.0) return Math.round((50 / 12.0) * pm25);
    if (pm25 <= 35.4) return Math.round(50 + ((100 - 50) / (35.4 - 12.1)) * (pm25 - 12.1));
    if (pm25 <= 55.4) return Math.round(100 + ((150 - 100) / (55.4 - 35.5)) * (pm25 - 35.5));
    if (pm25 <= 150.4) return Math.round(150 + ((200 - 150) / (150.4 - 55.5)) * (pm25 - 55.5));
    if (pm25 <= 250.4) return Math.round(200 + ((300 - 200) / (250.4 - 150.5)) * (pm25 - 150.5));
    return Math.round(300 + ((500 - 300) / (500.4 - 250.5)) * (pm25 - 250.5));
}

// Get AQI category
function getAQICategory(aqi) {
    if (aqi <= 50) return { level: 'Good', class: 'good', color: '#10b981' };
    if (aqi <= 100) return { level: 'Moderate', class: 'moderate', color: '#fbbf24' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', class: 'unhealthy', color: '#f97316' };
    if (aqi <= 200) return { level: 'Unhealthy', class: 'unhealthy', color: '#ef4444' };
    if (aqi <= 300) return { level: 'Very Unhealthy', class: 'hazardous', color: '#dc2626' };
    return { level: 'Hazardous', class: 'hazardous', color: '#7f1d1d' };
}

// Generate realistic baseline values for Monash Malaysia area
function generateBaselineData(sensorId) {
    // Monash Malaysia is in Selangor - typical tropical climate
    // Air quality can vary but generally moderate due to urban area

    const baseValues = {
        pm25: 15 + Math.random() * 20, // 15-35 μg/m³ (typical for Selangor)
        pm10: 25 + Math.random() * 30, // 25-55 μg/m³
        co2: 400 + Math.random() * 100, // 400-500 ppm (outdoor baseline)
        no2: 20 + Math.random() * 20, // 20-40 ppb
        temperature: 27 + Math.random() * 5, // 27-32°C (tropical)
        humidity: 65 + Math.random() * 20, // 65-85% (high humidity)
    };

    // Add variation based on sensor location
    if (sensorId.includes('parking')) {
        baseValues.pm25 += 10; // Higher near parking
        baseValues.pm10 += 15;
        baseValues.co2 += 50;
    }

    if (sensorId.includes('cafeteria') || sensorId.includes('food')) {
        baseValues.co2 += 30;
        baseValues.temperature += 2;
    }

    return baseValues;
}

// Initialize sensor data
function initializeSensorData() {
    sensorLocations.forEach(sensor => {
        const baseData = generateBaselineData(sensor.id);
        sensorsData[sensor.id] = {
            ...sensor,
            ...baseData,
            aqi: calculateAQI(baseData.pm25),
            status: 'active',
            lastUpdate: new Date(),
            smokeDetected: false
        };
    });
}

// Update sensor data with realistic variations
function updateSensorData() {
    Object.keys(sensorsData).forEach(sensorId => {
        const sensor = sensorsData[sensorId];

        // Add small random variations (±5%)
        sensor.pm25 = Math.max(5, sensor.pm25 + (Math.random() - 0.5) * 2);
        sensor.pm10 = Math.max(10, sensor.pm10 + (Math.random() - 0.5) * 3);
        sensor.co2 = Math.max(400, sensor.co2 + (Math.random() - 0.5) * 10);
        sensor.no2 = Math.max(10, sensor.no2 + (Math.random() - 0.5) * 2);
        sensor.temperature = 27 + Math.random() * 5; // Recalculate temperature
        sensor.humidity = 65 + Math.random() * 20; // Recalculate humidity

        // Recalculate AQI
        sensor.aqi = calculateAQI(sensor.pm25);
        sensor.lastUpdate = new Date();

        // Clamp values to reasonable ranges
        sensor.pm25 = Math.min(150, sensor.pm25);
        sensor.pm10 = Math.min(250, sensor.pm10);
        sensor.co2 = Math.min(1000, sensor.co2);
        sensor.no2 = Math.min(100, sensor.no2);
    });

    // Update historical data
    updateHistoricalData();
}

// Update historical data for charts
function updateHistoricalData() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Calculate averages across all sensors
    const avgPM25 = Object.values(sensorsData).reduce((sum, s) => sum + s.pm25, 0) / Object.keys(sensorsData).length;
    const avgPM10 = Object.values(sensorsData).reduce((sum, s) => sum + s.pm10, 0) / Object.keys(sensorsData).length;
    const avgCO2 = Object.values(sensorsData).reduce((sum, s) => sum + s.co2, 0) / Object.keys(sensorsData).length;
    const avgTemp = Object.values(sensorsData).reduce((sum, s) => sum + s.temperature, 0) / Object.keys(sensorsData).length;
    const avgHumidity = Object.values(sensorsData).reduce((sum, s) => sum + s.humidity, 0) / Object.keys(sensorsData).length;

    historicalData.pm25.push(avgPM25.toFixed(1));
    historicalData.pm10.push(avgPM10.toFixed(1));
    historicalData.co2.push(avgCO2.toFixed(0));
    historicalData.temp.push(avgTemp.toFixed(1));
    historicalData.humidity.push(avgHumidity.toFixed(1));
    historicalData.timestamps.push(timeStr);

    // Keep only last 20 data points
    if (historicalData.timestamps.length > 20) {
        historicalData.pm25.shift();
        historicalData.pm10.shift();
        historicalData.co2.shift();
        historicalData.temp.shift();
        historicalData.humidity.shift();
        historicalData.timestamps.shift();
    }
}

// Simulate smoke detection at a sensor
function simulateSmokeDetection(sensorId = null) {
    // If no sensor specified, pick a random one
    if (!sensorId) {
        const sensorIds = Object.keys(sensorsData);
        sensorId = sensorIds[Math.floor(Math.random() * sensorIds.length)];
    }

    const sensor = sensorsData[sensorId];

    // Dramatically increase pollutant levels to simulate smoke
    sensor.pm25 = 85 + Math.random() * 30; // High PM2.5 (smoke)
    sensor.pm10 = 120 + Math.random() * 40; // High PM10
    sensor.co2 = 700 + Math.random() * 200; // Elevated CO2
    sensor.no2 = 60 + Math.random() * 30; // Elevated NO2
    sensor.aqi = calculateAQI(sensor.pm25);
    sensor.smokeDetected = true;

    // Create alert
    const alert = {
        id: `alert-${Date.now()}`,
        sensorId: sensor.id,
        sensorName: sensor.name,
        timestamp: new Date(),
        message: `Smoke detected at ${sensor.name}`,
        severity: 'high',
        readings: {
            pm25: sensor.pm25.toFixed(1),
            pm10: sensor.pm10.toFixed(1),
            aqi: sensor.aqi
        }
    };

    alertHistory.unshift(alert);
    alertsToday++;

    // Reset smoke detection after 30 seconds
    setTimeout(() => {
        sensor.smokeDetected = false;
        // Gradually reduce levels back to normal
        const normalData = generateBaselineData(sensor.id);
        sensor.pm25 = normalData.pm25;
        sensor.pm10 = normalData.pm10;
        sensor.co2 = normalData.co2;
        sensor.no2 = normalData.no2;
        sensor.aqi = calculateAQI(sensor.pm25);
    }, 30000);

    return alert;
}

// Get overall campus AQI (average of all sensors)
function getOverallAQI() {
    const aqiValues = Object.values(sensorsData).map(s => s.aqi);
    const avgAQI = aqiValues.reduce((sum, aqi) => sum + aqi, 0) / aqiValues.length;
    return Math.round(avgAQI);
}

// Get overall campus statistics
function getCampusStats() {
    const avgTemp = Object.values(sensorsData).reduce((sum, s) => sum + s.temperature, 0) / Object.keys(sensorsData).length;
    const avgHumidity = Object.values(sensorsData).reduce((sum, s) => sum + s.humidity, 0) / Object.keys(sensorsData).length;
    const avgPM25 = Object.values(sensorsData).reduce((sum, s) => sum + s.pm25, 0) / Object.keys(sensorsData).length;

    return {
        temperature: avgTemp.toFixed(1),
        humidity: avgHumidity.toFixed(1),
        pm25: avgPM25.toFixed(1),
        activeSensors: Object.keys(sensorsData).length,
        totalSensors: sensorLocations.length
    };
}

// Initialize data on load
initializeSensorData();

// Update data every 5 seconds
setInterval(updateSensorData, 5000);
