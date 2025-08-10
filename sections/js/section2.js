document.addEventListener('DOMContentLoaded', function(){
    fetch('data/EnergiaSolar1980.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarras1980').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Entity),
                    datasets: [{
                        label: 'Energía Solar Producida (TWh)',
                        data: data.map(item => item['Solar Generation - TWh']),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54,162,235,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Energía Solar Producida (TWh)',
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Países y Regiones',
                            }
                        }
                    }
                }
            });
        });
});