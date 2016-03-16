define(["require", "exports", "../vendor/maquette/maquette", 'dojo-core/request', './widget3D'], function (require, exports, maquette_1, request_1, widget3D) {
    var projector;
    function setProjector(newProjector) {
        projector = newProjector;
    }
    var colorString = 'green';
    function parseColor(input) {
        var div = document.createElement('div');
        div.style.color = input;
        var m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (m) {
            return parseInt(m[1]) * 256 * 256 + parseInt(m[2]) * 256 + parseInt(m[3]);
        }
        else {
            throw new Error('Color ' + input + ' could not be parsed.');
        }
    }
    function handleColorInput(evt) {
        colorString = evt.target.value;
        try {
            widget3D.setColor(parseColor(colorString));
        }
        catch (e) {
        }
    }
    // Return three random numbers in data field as JSON, like:
    // {"type":"uint8","length":3,"data":[29,34,166],"success":true}
    // CORS issue with: var randomNumberURL = 'http://qrng.anu.edu.au/API/jsonI.php?length=3&type=uint8';
    var randomNumberURL = 'randomColor.json';
    function requestColor(ev) {
        console.log('request color clicked');
        request_1.default(randomNumberURL).then(function (response) {
            var data = JSON.parse(response.data).data;
            var colorValue = data[0] * 256 * 256 + data[1] * 256 + data[2];
            // Introduce artificial delay to ensure scene will not be rerendered immediately
            setTimeout(function () {
                widget3D.setColor(colorValue);
                colorString = 'rgb(' + data[0] + ',' + data[1] + ', ' + data[2] + ')';
                projector.scheduleRender();
            }, 1000);
        });
        return true;
    }
    function stringForColorValue() {
        var result = widget3D.getColor().toString(16);
        while (result.length < 6) {
            result = '0' + result;
        }
        return result;
    }
    function renderMaquette() {
        return maquette_1.h('div', [
            maquette_1.h('p', {}, 'Experiment #3'),
            'Color:',
            maquette_1.h('input', {
                type: 'test',
                placeholder: 'Enter a color?',
                value: colorString,
                oninput: handleColorInput
            }),
            maquette_1.h('p.output', [
                'Color value: ' + stringForColorValue(),
                maquette_1.h('div', { style: "width: 20px; height: 20px; background-color:#" + stringForColorValue() })
            ]),
            maquette_1.h('button', {
                onclick: requestColor
            }, 'Request color'),
            maquette_1.h('div.threeD', {
                // style: {'border-width': '20px'},
                afterCreate: widget3D.setup
            })
        ]);
    }
    var projector = maquette_1.createProjector({});
    setProjector(projector);
    projector.append(document.body, renderMaquette);
});
