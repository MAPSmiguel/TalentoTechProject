document.addEventListener('DOMContentLoaded', function(){
    fetch('data/EnergiaSolar2000.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarras2000').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Entity),
                    datasets: [{
                        label: 'Energía Solar producida (TWh)',
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
                                text: 'Energía Solar producida (TWh)',
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