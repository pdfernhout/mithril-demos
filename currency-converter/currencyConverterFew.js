define(["require", "exports", '../vendor/maquette/maquette'], function (require, exports, maquette) {
    var h = maquette.h;
    var projector = maquette.createProjector({});
    var minPrecision = 0;
    var maxPrecision = 9;
    var conversionRatesToDollars = {
        dollars: 1.0,
        pounds: 0.69,
        euros: 0.9
    };
    var model = {
        amount: '100.00',
        currency: 'dollars',
        precision: '2',
        currencyError: false,
        precisionError: false
    };
    function setPrecision(event) {
        var precision = event.target.value;
        model.precision = '' + precision;
        if (getPrecision() !== parseInt(model.precision)) {
            model.precisionError = true;
        }
        else {
            model.precisionError = false;
        }
    }
    function getPrecision() {
        var precision = parseInt(model.precision);
        if (isNaN(precision))
            return 0;
        if (precision < minPrecision)
            return minPrecision;
        else if (precision > maxPrecision)
            return maxPrecision;
        return precision;
    }
    function setCurrencyValue(currency, event) {
        var newValue = event.target.value;
        model.currency = currency;
        model.amount = newValue;
        model.currencyError = isNaN(parseFloat(newValue));
    }
    var inputDollars = setCurrencyValue.bind(null, 'dollars');
    var inputEuros = setCurrencyValue.bind(null, 'euros');
    var inputPounds = setCurrencyValue.bind(null, 'pounds');
    function getCurrencyValue(currency) {
        if (model.currency === currency) {
            return model.amount;
        }
        // convert currency
        var amount = parseFloat(model.amount);
        var dollarAmount = amount * conversionRatesToDollars[model.currency];
        var result = dollarAmount / conversionRatesToDollars[currency];
        if (isNaN(result)) {
            return '???';
        }
        return '' + result.toFixed(getPrecision());
    }
    function renderMaquette() {
        return h('div', { id: 'currency-converter', classes: { currencyError: model.currencyError, precisionError: model.precisionError } }, [
            h('div', [
                'Precision: ',
                h('input', { value: '' + model.precision, oninput: setPrecision, type: 'number' })
            ]),
            h('hr'),
            h('div', [
                h('span.label', 'US Dollars'),
                h('input', { value: getCurrencyValue('dollars'), oninput: inputDollars })
            ]),
            h('div', [
                h('span.label', 'Euros'),
                h('input', { value: getCurrencyValue('euros'), oninput: inputEuros })
            ]),
            h('div', [
                h('span.label', 'Pounds'),
                h('input', { value: getCurrencyValue('pounds'), oninput: inputPounds })
            ])
        ]);
    }
    projector.append(document.body, renderMaquette);
});
