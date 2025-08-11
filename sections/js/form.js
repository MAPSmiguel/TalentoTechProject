document.addEventListener('DOMContentLoaded', function() {
    const consumo = document.getElementById('consumo');
    const estrato = document.getElementById('estrato');
    const clima = document.getElementById('clima');
    const empresa = document.getElementById('empresa');
    const presupuesto = document.getElementById('presupuesto');
    const panel = document.getElementById('panel');
    const button = document.getElementById('button');
    const output = document.getElementById('output');

    button.addEventListener('click', function(){
        event.preventDefault();
        const consumoValue = parseFloat(consumo.value);
        const estratoValue = parseInt(estrato.value);
        const climaValue = clima.value;
        const empresaValue = empresa.value;
        const panelValue = panel.value;
        const presupuestoValue = presupuesto.value;

        let cs = 0;
        let subsidio = 0;
        let precioEnergia = 0;
        let potenciaPanel = 0;
        let valorPanel = 0;
        let presupuestoLim = 0;

        switch (empresaValue) {
            case 'epm':
                if (estratoValue <= 4){
                    precioEnergia = 888.86;
                }
                else {
                    precioEnergia = 1066.64;
                }
                break;
            case 'enel':
                if (estratoValue <= 4){
                    precioEnergia = 785.53;
                }
                else {
                    precioEnergia = 942.63;
                }
                break;
            case 'celsia':
                if (estratoValue <= 4){
                    precioEnergia = 706.72;
                }
                else {
                    precioEnergia = 849.67;
                } 
                break;
            default:
                output.innerHTML = 'Empresa no válida';
                return;
        }

        switch (panelValue) {
            case 'pequeño':
                potenciaPanel = 150;
                valorPanel = 340750;
                break;
            case 'mediano':
                potenciaPanel = 340;
                valorPanel = 615938;
                break;
            case 'grande':
                potenciaPanel = 450;
                valorPanel = 889963;
                break;
            case 'enorme':
                potenciaPanel = 550;
                valorPanel = 1152002;
                break;
            default:
                output.innerHTML = 'Panel no válido';
                return;
        }

        switch (climaValue) {
            case 'Templado':
                cs = 130;
                break;
            case 'Frio':
                cs = 130;
                break;
            case 'Calido':
                cs = 173;
                break;
            default:
                output.innerHTML = 'Clima no válido';
                return;
        }

        switch (estratoValue) {
            case 1:
                subsidio = 0.4;
                break;
            case 2:
                subsidio = 0.5;
                break;
            case 3:
                subsidio = 0.85;
                break;
            case 4:
                subsidio = 1;
                break;
            case 5:
                subsidio = 1.2;
                break;
            case 6:
                subsidio = 1.2;
                break;  
            default:
                output.innerHTML = 'Estrato no válido';
                return;              
        }

        switch (presupuestoValue) {
            case 'bajo':
                presupuestoLim = 800000;
                break;
            case 'medio':
                presupuestoLim = 1500000;
                break;
            case 'medio-alto':
                presupuestoLim = 2500000;
                break;
            case 'alto':
                presupuestoLim = 4000000;
                break;
            default:
                output.innerHTML = 'Presupuesto no válido';
                return;
        }


        const precioEnergiaMensual = precioEnergia * consumoValue;
        const energiaGenerada = potenciaPanel * 4 * 30; 
        let presupuestoUtil = 0;
        let numPaneles = 0;

        while (presupuestoUtil < presupuestoLim) {
            numPaneles++;
            presupuestoUtil = presupuestoUtil + valorPanel;
        }
        numPaneles--; //Número de paneles que se pueden comprar con el presupuesto
        const energiaTotalGenerada = (numPaneles * energiaGenerada)/1000; //Energía total generada por los paneles en un mes

        const gastoTotal = numPaneles * valorPanel;

        
        const gastoFamiliar = ((consumoValue - cs)*precioEnergia) + (cs*subsidio*precioEnergia);
        
        const ahorro = energiaTotalGenerada * precioEnergia;//Ganancia que se ahorraría al mes una vez recuperado
        const tiempoRecuperacion = Math.round(gastoTotal / ahorro); //Tiempo en meses para la recuperación de la inversión

        const gastoConPaneles = (gastoFamiliar - ahorro); //Gasto mensual con paneles



        if (numPaneles <= 0) {
            output.style.display = 'flex';
            output.textContent = `<h2>Tus resultados</h2> <br>` + 'Con el presupuesto seleccionado no es posible adquirir ningún panel.';
        } else if (gastoConPaneles <= 0) {
            output.style.display = 'flex';
            output.innerHTML = `<h2>Tus resultados</h2> <br>` + `Con el presupuesto seleccionado, puede adquirir ${numPaneles} panel(es) solar(es) que generarán aproximadamente ${energiaTotalGenerada} kW al mes.<br>` +
            `Empezarás a ahorrar ${gastoFamiliar.toFixed(2)} COP desde el primer mes! <br>` +
            `Para más información, consulta la siguiente página: <a href="https://autosolar.co/paneles-solares-24v" target="_blank">Compra de Paneles Solares</a>`;
        } 
        else {
            output.style.display = 'flex';
            output.innerHTML = `<h2>Tus resultados</h2> <br>` +
            `Con el presupuesto seleccionado, puede adquirir ${numPaneles} panel(es) solar(es) que generarán aproximadamente ${energiaTotalGenerada} kW al mes.<br>`+
            `El gasto mensual en energía eléctrica sin paneles sería de aproximadamente ${gastoFamiliar.toFixed(2)} COP.<br>` +
            `El gasto mensual en energía eléctrica con los paneles sería de aproximadamente ${gastoConPaneles.toFixed(2)} COP.<br>` +
            `El tiempo estimado para recuperar la inversión realizada en los paneles solares es de ${tiempoRecuperacion} meses. Una vez cumplido este tiempo, el ahorro mensual sería de aproximadamente ${ahorro.toFixed(2)} COP. <br>` +
            `Para más información, consulta la siguiente página: <a href="https://autosolar.co/paneles-solares-24v" target="_blank">Compra de Paneles Solares</a>`;
        }
    })
});