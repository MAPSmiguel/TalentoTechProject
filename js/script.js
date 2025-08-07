
document.addEventListener("DOMContentLoaded", function () {
    fetch("data/AumentoGlobal.json")
        .then((response) => response.json())
        .then((data) => {
            // 1. Obtener todos los años y el más reciente
            const allYears = data.map((item) => item.Year);
            const maxYear = Math.max(...allYears);

            // 2. Filtrar solo datos del año más reciente
            const dataUltimoAno = data.filter(item => item.Year === maxYear && item.Solar_electricity != null);

            // 3. Crear un diccionario con el valor final por país
            const crecimientoPorPais = {};
            dataUltimoAno.forEach(item => {
                crecimientoPorPais[item.Entity] = item.Solar_electricity;
            });

            // 4. Ordenar países por mayor valor y tomar los 10 primeros
            const top10 = Object.entries(crecimientoPorPais)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(entry => entry[0]); // extrae solo los nombres

            // 5. Obtener todos los años únicos ordenados
            const yearsSet = new Set();
            data.forEach((item) => yearsSet.add(item.Year));
            const years = Array.from(yearsSet).sort((a, b) => a - b);

            // 6. Crear datasets por país
            const datasets = top10.map((pais) => {
                const datosPais = data.filter((item) => item.Entity === pais);

                const dict = {};
                datosPais.forEach((item) => {
                    dict[item.Year] = item.Solar_electricity;
                });

                const valores = years.map((year) => dict[year] ?? null);

                return {
                    label: pais,
                    data: valores,
                    borderWidth: 2,
                    fill: false,
                    borderColor: getRandomColor(),
                    backgroundColor: getRandomColor(),
                };
            });

            // 7. Crear el gráfico
            const ctx = document.getElementById("solarChart").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: datasets,
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: `Top 10 países con mayor generación solar en ${maxYear}`,
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },
                    },
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false,
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Año",
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Electricidad Solar (MW o TWh)",
                            },
                        },
                    },
                },
            });

            // Función de color aleatorio
            function getRandomColor() {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return `rgba(${r}, ${g}, ${b}, 0.7)`;
            }
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/AumentoGlobal.json")
        .then((response) => response.json())
        .then((data) => {
            const year1 = 2010;
            const year2 = Math.max(...data.map(item => item.Year));
            const topN = 10;

            // Agrupar por país y año
            function agruparDatosPorAno(ano) {
                const filtrado = data.filter(d => d.Year === ano && d.Solar_electricity != null);
                const porPais = {};

                filtrado.forEach(d => {
                    porPais[d.Entity] = (porPais[d.Entity] || 0) + d.Solar_electricity;
                });

                return porPais;
            }

            const datos2010 = agruparDatosPorAno(year1);
            const datos2024 = agruparDatosPorAno(year2);

            // Ordenar por los que más generaron en el año más reciente
            const top10paises = Object.entries(datos2024)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topN)
                .map(([pais]) => pais);

            // Obtener valores alineados
            const valores2010 = top10paises.map(p => datos2010[p] ?? 0);
            const valores2024 = top10paises.map(p => datos2024[p] ?? 0);

            const ctx = document.getElementById("comparacionSolar").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: top10paises,
                    datasets: [
                        {
                            label: `Generación solar en ${year1}`,
                            data: valores2010,
                            backgroundColor: "rgba(54, 162, 235, 0.7)"
                        },
                        {
                            label: `Generación solar en ${year2}`,
                            data: valores2024,
                            backgroundColor: "rgba(255, 99, 132, 0.7)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: `Comparación de generación solar: ${year1} vs ${year2}`
                        },
                        legend: {
                            position: "top"
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false
                        }
                    },
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "País"
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Generación solar (MW o TWh)"
                            }
                        }
                    }
                }
            });
        });
});


