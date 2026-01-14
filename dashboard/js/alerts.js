// Alert and Notification Management

// Show alert banner
function showAlertBanner(message, duration = 10000) {
    const alertBanner = document.getElementById('alertBanner');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertBanner.classList.remove('hidden');

    // Auto-hide after duration
    if (duration > 0) {
        setTimeout(() => {
            closeAlert();
        }, duration);
    }
}

// Close alert banner
function closeAlert() {
    const alertBanner = document.getElementById('alertBanner');
    alertBanner.classList.add('hidden');
}

// Show toast notification
function showToast(message, type = 'info', duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = getToastIcon(type);

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);

    // Play alert sound for danger toasts
    if (type === 'danger') {
        playAlertSound();
    }
}

// Get toast icon based on type
function getToastIcon(type) {
    const icons = {
        success: '✅',
        warning: '⚠️',
        danger: '🚨',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Play alert sound (simple beep using Web Audio API)
function playAlertSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800; // Frequency in Hz
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Update alert history display
function updateAlertHistory() {
    const alertHistoryContainer = document.getElementById('alertHistory');

    if (alertHistory.length === 0) {
        alertHistoryContainer.innerHTML = '<p class="no-alerts">No alerts today</p>';
        return;
    }

    // Show last 5 alerts
    const recentAlerts = alertHistory.slice(0, 5);

    alertHistoryContainer.innerHTML = recentAlerts.map(alert => `
        <div class="alert-history-item ${alert.severity === 'high' ? 'smoke-alert' : ''}">
            <strong>${alert.message}</strong>
            <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.25rem;">
                AQI: ${alert.readings.aqi} | PM2.5: ${alert.readings.pm25} μg/m³
            </div>
            <span class="alert-time">${alert.timestamp.toLocaleTimeString()}</span>
        </div>
    `).join('');
}

// Handle smoke detection alert
function handleSmokeAlert(alert) {
    // Show alert banner
    showAlertBanner(`🚨 Smoke Detected at ${alert.sensorName}! AQI: ${alert.readings.aqi}`, 0);

    // Show toast notification
    showToast(
        `Smoke detected at ${alert.sensorName}. Immediate attention required!`,
        'danger',
        10000
    );

    // Update alert history
    updateAlertHistory();

    // Update alert count
    document.getElementById('smokeAlertsToday').textContent = alertsToday;

    // Log to console
    console.log('Smoke Alert:', alert);
}

// Check for critical AQI levels
function checkCriticalAQI() {
    Object.values(sensorsData).forEach(sensor => {
        const category = getAQICategory(sensor.aqi);

        // Alert if AQI is unhealthy or worse and not already alerted
        if (sensor.aqi > 100 && !sensor.alertShown) {
            showToast(
                `Air quality at ${sensor.name} is ${category.level} (AQI: ${sensor.aqi})`,
                'warning',
                7000
            );
            sensor.alertShown = true;

            // Reset alert flag after 5 minutes
            setTimeout(() => {
                sensor.alertShown = false;
            }, 300000);
        }
    });
}

// Trigger test smoke alert
function triggerTestSmokeAlert() {
    const testBtn = document.getElementById('testSmokeBtn');
    const testStatus = document.getElementById('testStatus');

    // Disable button temporarily
    testBtn.disabled = true;
    testBtn.textContent = 'Simulating...';

    // Show status message
    testStatus.classList.remove('hidden');
    testStatus.textContent = '🧪 Initiating smoke detection simulation...';

    setTimeout(() => {
        // Add smoke marker on map
        const affectedSensor = addSmokeAlertMarker();

        // Simulate smoke detection in data
        const alert = simulateSmokeDetection(affectedSensor.id);

        // Handle the alert
        handleSmokeAlert(alert);

        // Update status
        testStatus.textContent = `✅ Smoke alert triggered at ${affectedSensor.name}. Alert will clear in 30 seconds.`;

        // Re-enable button
        setTimeout(() => {
            testBtn.disabled = false;
            testBtn.textContent = 'Trigger Smoke Alert';
        }, 2000);

        // Hide status message after 5 seconds
        setTimeout(() => {
            testStatus.classList.add('hidden');
        }, 5000);
    }, 1000);
}

// Auto-check for critical AQI every 30 seconds
setInterval(checkCriticalAQI, 30000);
