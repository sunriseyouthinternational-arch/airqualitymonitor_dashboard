// Main Application Controller

// Update current time display
function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    timeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Update overall statistics
function updateOverallStats() {
    const stats = getCampusStats();
    const overallAQI = getOverallAQI();
    const category = getAQICategory(overallAQI);

    // Update overall AQI
    const aqiElement = document.getElementById('overallAQI');
    aqiElement.textContent = overallAQI;
    aqiElement.className = `status-value aqi-${category.class}`;

    // Update active sensors
    document.getElementById('activeSensors').textContent =
        `${stats.activeSensors}/${stats.totalSensors}`;

    // Update quick stats
    document.getElementById('avgTemp').textContent = `${stats.temperature}°C`;
    document.getElementById('avgHumidity').textContent = `${stats.humidity}%`;
    document.getElementById('avgPM25').textContent = `${stats.pm25} μg/m³`;

    // Update alerts today
    document.getElementById('smokeAlertsToday').textContent = alertsToday;
}

// Initialize the application
function initializeApp() {
    console.log('🌱 Initializing Air Quality Dashboard...');

    // Show welcome message
    showToast('Air Quality Dashboard initialized successfully', 'success', 3000);

    // Initialize map
    initializeMap();

    // Initialize charts
    initializeCharts();

    // Generate initial sensor cards
    generateSensorCards();

    // Update time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Update stats
    updateOverallStats();
    setInterval(updateOverallStats, 5000);

    // Update charts every 5 seconds
    setInterval(updateCharts, 5000);

    // Update sensor cards every 10 seconds
    setInterval(generateSensorCards, 10000);

    // Setup test button
    const testBtn = document.getElementById('testSmokeBtn');
    testBtn.addEventListener('click', triggerTestSmokeAlert);

    // Show data source information
    setTimeout(() => {
        showToast(
            'Using simulated air quality data for Monash Malaysia Campus area',
            'info',
            5000
        );
    }, 2000);

    console.log('✅ Dashboard ready!');
}

// Handle window resize for responsive elements
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Resize charts if needed
        if (pm25Chart) pm25Chart.resize();
        if (pm10Chart) pm10Chart.resize();
        if (co2Chart) co2Chart.resize();
        if (tempHumidChart) tempHumidChart.resize();
    }, 250);
});

// Handle visibility change to optimize performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Dashboard hidden - reducing update frequency');
        // Could reduce update intervals here if needed
    } else {
        console.log('Dashboard visible - resuming normal updates');
        // Force immediate update when user returns
        updateSensorData();
        updateOverallStats();
        updateCharts();
        generateSensorCards();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Press 'T' to trigger test smoke alert
    if (event.key === 't' || event.key === 'T') {
        if (!event.target.matches('input, textarea')) {
            triggerTestSmokeAlert();
        }
    }

    // Press 'Escape' to close modals
    if (event.key === 'Escape') {
        closeSensorModal();
        closeAlert();
    }
});

// Export data function (for future use)
function exportData() {
    const exportData = {
        timestamp: new Date().toISOString(),
        sensors: sensorsData,
        alerts: alertHistory,
        statistics: {
            overallAQI: getOverallAQI(),
            campusStats: getCampusStats(),
            alertsToday: alertsToday
        }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `air-quality-data-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    showToast('Data exported successfully', 'success', 3000);
}

// Print/Screenshot preparation
function preparePrint() {
    window.print();
}

// Add print styles optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.duration > 100) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
        }
    }
});

try {
    performanceObserver.observe({ entryTypes: ['measure'] });
} catch (e) {
    console.log('Performance monitoring not available');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    showToast('An error occurred. Please refresh the page.', 'danger', 5000);
});

// Service worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is implemented
    // navigator.serviceWorker.register('/sw.js').then(function(registration) {
    //     console.log('Service Worker registered:', registration);
    // }).catch(function(error) {
    //     console.log('Service Worker registration failed:', error);
    // });
}

// Expose useful functions to window for console debugging
window.dashboardDebug = {
    exportData,
    triggerTestSmokeAlert,
    updateCharts,
    sensorsData,
    alertHistory,
    getOverallAQI,
    getCampusStats
};

console.log('💡 Tip: Use window.dashboardDebug to access debugging functions');
