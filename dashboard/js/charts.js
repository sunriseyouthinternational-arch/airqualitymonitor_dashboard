// Chart.js Configuration and Management

let pm25Chart, pm10Chart, co2Chart, tempHumidChart;

// Chart color scheme
const chartColors = {
    primary: '#2563eb',
    secondary: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    purple: '#8b5cf6'
};

// Common chart options
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#cbd5e1',
                font: {
                    family: 'Inter',
                    size: 11
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f1f5f9',
            bodyColor: '#cbd5e1',
            borderColor: '#475569',
            borderWidth: 1,
            padding: 10,
            displayColors: true
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(71, 85, 105, 0.3)',
                drawBorder: false
            },
            ticks: {
                color: '#94a3b8',
                font: {
                    family: 'Inter',
                    size: 10
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(71, 85, 105, 0.3)',
                drawBorder: false
            },
            ticks: {
                color: '#94a3b8',
                font: {
                    family: 'Inter',
                    size: 10
                }
            }
        }
    }
};

// Initialize PM2.5 Chart
function initPM25Chart() {
    const ctx = document.getElementById('pm25Chart').getContext('2d');
    pm25Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.timestamps,
            datasets: [{
                label: 'PM2.5 (μg/m³)',
                data: historicalData.pm25,
                borderColor: chartColors.danger,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `PM2.5: ${context.parsed.y} μg/m³`;
                        }
                    }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'μg/m³',
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Initialize PM10 Chart
function initPM10Chart() {
    const ctx = document.getElementById('pm10Chart').getContext('2d');
    pm10Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.timestamps,
            datasets: [{
                label: 'PM10 (μg/m³)',
                data: historicalData.pm10,
                borderColor: chartColors.warning,
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `PM10: ${context.parsed.y} μg/m³`;
                        }
                    }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'μg/m³',
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Initialize CO2 Chart
function initCO2Chart() {
    const ctx = document.getElementById('co2Chart').getContext('2d');
    co2Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.timestamps,
            datasets: [{
                label: 'CO2 (ppm)',
                data: historicalData.co2,
                borderColor: chartColors.info,
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `CO2: ${context.parsed.y} ppm`;
                        }
                    }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ppm',
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Initialize Temperature & Humidity Chart
function initTempHumidChart() {
    const ctx = document.getElementById('tempHumidChart').getContext('2d');
    tempHumidChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.timestamps,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: historicalData.temp,
                    borderColor: chartColors.danger,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    yAxisID: 'y'
                },
                {
                    label: 'Humidity (%)',
                    data: historicalData.humidity,
                    borderColor: chartColors.primary,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: '#475569',
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    },
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: '#94a3b8'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    },
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Update all charts with new data
function updateCharts() {
    if (pm25Chart) {
        pm25Chart.data.labels = historicalData.timestamps;
        pm25Chart.data.datasets[0].data = historicalData.pm25;
        pm25Chart.update('none'); // Update without animation for smooth real-time updates
    }

    if (pm10Chart) {
        pm10Chart.data.labels = historicalData.timestamps;
        pm10Chart.data.datasets[0].data = historicalData.pm10;
        pm10Chart.update('none');
    }

    if (co2Chart) {
        co2Chart.data.labels = historicalData.timestamps;
        co2Chart.data.datasets[0].data = historicalData.co2;
        co2Chart.update('none');
    }

    if (tempHumidChart) {
        tempHumidChart.data.labels = historicalData.timestamps;
        tempHumidChart.data.datasets[0].data = historicalData.temp;
        tempHumidChart.data.datasets[1].data = historicalData.humidity;
        tempHumidChart.update('none');
    }
}

// Initialize all charts
function initializeCharts() {
    // Generate initial historical data
    for (let i = 0; i < 10; i++) {
        updateSensorData();
    }

    initPM25Chart();
    initPM10Chart();
    initCO2Chart();
    initTempHumidChart();
}

// Set chart container heights
document.addEventListener('DOMContentLoaded', function() {
    const chartCanvases = document.querySelectorAll('.metric-card canvas');
    chartCanvases.forEach(canvas => {
        canvas.style.height = '250px';
    });
});
