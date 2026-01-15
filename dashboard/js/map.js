// Interactive Campus Map Management

let mapContainer;
let sensorMarkers = {};
let smokeAlertMarkers = [];

// Initialize the campus map
function initializeMap() {
    mapContainer = document.getElementById('campusMap');

    // Try to load campus map image
    loadCampusMapImage();

    // Create sensor markers
    createSensorMarkers();

    // Update sensor marker positions and colors every 5 seconds
    setInterval(updateSensorMarkers, 5000);
}

// Load campus map image if available
function loadCampusMapImage() {
    const mapPlaceholder = mapContainer.querySelector('.map-placeholder');

    // Try common image names
    const possibleImages = [
        'assets/campus-map/monash-campus-map.png',
        'assets/campus-map/monash-campus-map.jpg',
        'assets/campus-map/campus-map.png',
        'assets/campus-map/campus-map.jpg',
        'assets/campus-map/map.png',
        'assets/campus-map/map.jpg'
    ];

    let imageLoaded = false;

    possibleImages.forEach(imagePath => {
        const img = new Image();
        img.onload = function() {
            if (!imageLoaded) {
                imageLoaded = true;
                mapPlaceholder.innerHTML = '';
                const mapImage = document.createElement('img');
                mapImage.src = imagePath;
                mapImage.alt = 'Monash Malaysia Campus Map';
                mapImage.className = 'campus-map-image';
                mapPlaceholder.appendChild(mapImage);

                // Keep the data source note
                const note = document.createElement('p');
                note.className = 'data-source-note';
                note.innerHTML = 'Note: Using simulated air quality data based on Monash Malaysia Campus area.<br>Real sensor data will be integrated when available.';
                mapPlaceholder.appendChild(note);
            }
        };
        img.src = imagePath;
    });
}

// Create sensor markers on the map
function createSensorMarkers() {
    sensorLocations.forEach(sensor => {
        const marker = document.createElement('div');
        marker.className = 'sensor-marker';
        marker.id = `marker-${sensor.id}`;
        marker.style.left = `${sensor.position.x}%`;
        marker.style.top = `${sensor.position.y}%`;
        marker.style.transform = 'translate(-50%, -50%)';

        // Set initial color based on AQI
        const sensorData = sensorsData[sensor.id];
        const category = getAQICategory(sensorData.aqi);
        marker.classList.add(category.class);
        marker.textContent = sensorData.aqi;

        // Add click event
        marker.addEventListener('click', () => showSensorModal(sensor.id));

        // Add hover tooltip
        marker.addEventListener('mouseenter', (e) => showSensorTooltip(e, sensor.id));
        marker.addEventListener('mouseleave', hideSensorTooltip);

        mapContainer.appendChild(marker);
        sensorMarkers[sensor.id] = marker;
    });
}

// Update sensor markers with current data
function updateSensorMarkers() {
    Object.keys(sensorMarkers).forEach(sensorId => {
        const marker = sensorMarkers[sensorId];
        const sensorData = sensorsData[sensorId];
        const category = getAQICategory(sensorData.aqi);

        // Remove all category classes
        marker.classList.remove('good', 'moderate', 'unhealthy', 'hazardous');

        // Add new category class
        marker.classList.add(category.class);

        // Update AQI value
        marker.textContent = sensorData.aqi;

        // Add pulsing animation if smoke detected
        if (sensorData.smokeDetected) {
            marker.style.animation = 'pulseSmoke 1s infinite';
        } else {
            marker.style.animation = '';
        }
    });
}

// Show sensor tooltip on hover
function showSensorTooltip(event, sensorId) {
    const sensor = sensorsData[sensorId];
    const tooltip = document.createElement('div');
    tooltip.className = 'sensor-tooltip';
    tooltip.id = 'sensor-tooltip';

    const category = getAQICategory(sensor.aqi);

    tooltip.innerHTML = `
        <h4>${sensor.name}</h4>
        <p><strong>AQI:</strong> ${sensor.aqi} (${category.level})</p>
        <p><strong>PM2.5:</strong> ${sensor.pm25.toFixed(1)} μg/m³</p>
        <p><strong>PM10:</strong> ${sensor.pm10.toFixed(1)} μg/m³</p>
        <p><strong>Temp:</strong> ${sensor.temperature.toFixed(1)}°C</p>
        <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem;">Click for details</p>
    `;

    // Position tooltip
    const marker = event.currentTarget;
    const rect = marker.getBoundingClientRect();
    const containerRect = mapContainer.getBoundingClientRect();

    mapContainer.appendChild(tooltip);

    // Smart positioning based on sensor location to avoid edge overflow
    const tooltipRect = tooltip.getBoundingClientRect();
    const markerCenterX = rect.left - containerRect.left;
    const markerCenterY = rect.top - containerRect.top;
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    let left, top;

    // Determine horizontal position (left or right of marker)
    if (markerCenterX > containerWidth * 0.6) {
        // Sensor on right side - position tooltip to the left
        left = markerCenterX - tooltipRect.width - 10;
    } else {
        // Sensor on left/center - position tooltip to the right
        left = markerCenterX + 50;
    }

    // Determine vertical position (above or below marker)
    if (markerCenterY > containerHeight * 0.7) {
        // Sensor on bottom - position tooltip above
        top = markerCenterY - tooltipRect.height - 10;
    } else {
        // Sensor on top/middle - position tooltip at same level or below
        top = markerCenterY;
    }

    // Apply calculated positions with bounds checking
    tooltip.style.left = `${Math.max(5, Math.min(left, containerWidth - tooltipRect.width - 5))}px`;
    tooltip.style.top = `${Math.max(5, Math.min(top, containerHeight - tooltipRect.height - 5))}px`;
}

// Hide sensor tooltip
function hideSensorTooltip() {
    const tooltip = document.getElementById('sensor-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Show sensor details modal
function showSensorModal(sensorId) {
    const sensor = sensorsData[sensorId];
    const category = getAQICategory(sensor.aqi);

    const modal = document.getElementById('sensorModal');
    const modalTitle = document.getElementById('modalSensorName');
    const modalDetails = document.getElementById('modalSensorDetails');

    modalTitle.textContent = sensor.name;
    modalDetails.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <p style="color: #94a3b8; margin-bottom: 0.5rem;">Location: ${sensor.area}</p>
            <p style="color: #94a3b8;">Last Updated: ${sensor.lastUpdate.toLocaleTimeString()}</p>
        </div>

        <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h3 style="color: ${category.color}; margin-bottom: 0.5rem;">Air Quality Index: ${sensor.aqi}</h3>
            <p style="color: #cbd5e1;">Status: ${category.level}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">PM2.5</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.pm25.toFixed(1)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">μg/m³</p>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">PM10</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.pm10.toFixed(1)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">μg/m³</p>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">CO2</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.co2.toFixed(0)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">ppm</p>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">NO2</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.no2.toFixed(1)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">ppb</p>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">Temperature</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.temperature.toFixed(1)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">°C</p>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: #94a3b8; font-size: 0.85rem;">Humidity</p>
                <p style="font-size: 1.5rem; font-weight: 600; color: #f1f5f9;">${sensor.humidity.toFixed(1)}</p>
                <p style="color: #94a3b8; font-size: 0.75rem;">%</p>
            </div>
        </div>

        ${sensor.smokeDetected ? `
            <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <p style="color: #ef4444; font-weight: 600;">⚠️ SMOKE DETECTED</p>
                <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.5rem;">Elevated pollutant levels detected at this location</p>
            </div>
        ` : ''}
    `;

    modal.classList.remove('hidden');
}

// Close sensor modal
function closeSensorModal() {
    const modal = document.getElementById('sensorModal');
    modal.classList.add('hidden');
}

// Add smoke alert marker at random position
function addSmokeAlertMarker() {
    // Get random sensor for smoke detection
    const sensorIds = Object.keys(sensorsData);
    const randomSensorId = sensorIds[Math.floor(Math.random() * sensorIds.length)];
    const sensor = sensorsData[randomSensorId];

    // Create smoke alert marker at sensor position
    const smokeMarker = document.createElement('div');
    smokeMarker.className = 'smoke-alert-marker';
    smokeMarker.style.left = `${sensor.position.x}%`;
    smokeMarker.style.top = `${sensor.position.y}%`;
    smokeMarker.style.transform = 'translate(-50%, -50%)';

    mapContainer.appendChild(smokeMarker);
    smokeAlertMarkers.push(smokeMarker);

    // Remove marker after 30 seconds
    setTimeout(() => {
        smokeMarker.remove();
        const index = smokeAlertMarkers.indexOf(smokeMarker);
        if (index > -1) {
            smokeAlertMarkers.splice(index, 1);
        }
    }, 30000);

    return sensor;
}

// Generate sensor cards in the grid
function generateSensorCards() {
    const sensorGrid = document.getElementById('sensorGrid');
    sensorGrid.innerHTML = '';

    Object.values(sensorsData).forEach(sensor => {
        const category = getAQICategory(sensor.aqi);

        const card = document.createElement('div');
        card.className = `sensor-card ${category.class}`;
        card.onclick = () => showSensorModal(sensor.id);

        card.innerHTML = `
            <h4>${sensor.name}</h4>
            <div class="sensor-metrics">
                <div class="sensor-metric-row">
                    <span class="metric-label">AQI</span>
                    <span class="metric-value" style="color: ${category.color};">${sensor.aqi}</span>
                </div>
                <div class="sensor-metric-row">
                    <span class="metric-label">PM2.5</span>
                    <span class="metric-value">${sensor.pm25.toFixed(1)} μg/m³</span>
                </div>
                <div class="sensor-metric-row">
                    <span class="metric-label">Temperature</span>
                    <span class="metric-value">${sensor.temperature.toFixed(1)}°C</span>
                </div>
                <div class="sensor-metric-row">
                    <span class="metric-label">Humidity</span>
                    <span class="metric-value">${sensor.humidity.toFixed(1)}%</span>
                </div>
            </div>
        `;

        sensorGrid.appendChild(card);
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('sensorModal');
    if (event.target === modal) {
        closeSensorModal();
    }
});
