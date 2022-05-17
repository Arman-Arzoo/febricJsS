//function to initialization canvas
const initialCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500,
        height: 500,
        Selection: false,
        isDrawingMode: false,

    });
}
//funtion to set background image
const setBackgroundImage = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img;
        canvas.renderAll();
    })
}
// function to handel onClick event
const ToggleMode = (mode) => {
    if (mode === modes.pan) {
        if (currentMode === modes.pan) {
            currentMode = ''
        }
        else {
            currentMode = modes.pan
            canvas.isDrawingMode = false
        }
    }

    else if (mode === modes.drawing) {
        if (currentMode === modes.drawing) {
            currentMode = ''
            canvas.isDrawingMode = false
        }
        else {

            // canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
            // canvas.freeDrawingBrush.width = 10;
            canvas.freeDrawingBrush.color = color;
            currentMode = modes.drawing
            canvas.isDrawingMode = true;
        }
    }
    console.log(mode)

}
// function to set pan mode
const setEventPan = (canvas) => {
    //mouse move event
    canvas.on('mouse:move', (event) => {
        if (mousePressed && currentMode === modes.pan) {
            canvas.setCursor('grab')
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
            canvas.relativePan(delta);
        }
    })
    //mouse down event
    canvas.on('mouse:down', (event) => {
        if (currentMode === modes.pan) {
            mousePressed = true;
            canvas.setCursor('crosshair');
        }

    })
    //mouse up event
    canvas.on('mouse:up', (event) => {
        mousePressed = false;
        canvas.setCursor('default');
    })

}
//function to setColor event
const setColorListener = () => {
    const picker = document.getElementById('colorPicker');
    console.log("id", picker)
    picker.addEventListener('change', (event) => {
        console.log(event.target.value)
        color = event.target.value;
        canvas.freeDrawingBrush.color = color;

    })
}
//function to clear canvas

const clearCanvas = (canvas) => {

    canvas.getObjects().forEach((obj) => {
        if (obj !== canvas.backgroundImage) {
            canvas.remove(obj);
        }
    })
}
// ###########################################################################################################################################################

//initialization and function calling for canvas
const canvas = initialCanvas('canvas');
let mousePressed = false;
let color = "#000000";

//make a mode
let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing',
}

// ###########################################################################################################################################################
setBackgroundImage('bg.webp', canvas);
// create event listeners for the canvas
setEventPan(canvas);
setColorListener();
