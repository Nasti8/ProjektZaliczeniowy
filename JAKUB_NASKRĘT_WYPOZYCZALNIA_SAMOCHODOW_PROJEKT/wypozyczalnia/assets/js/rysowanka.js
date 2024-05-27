const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".wyczysc_canvas"),
    UndoCanvas = document.querySelector(".cofnij_canvas"),
    saveImg = document.querySelector(".zapisz_zdjecie"),
    ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; 
};

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
};

const drawCircle = (e) => {
    ctx.beginPath(); 
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    fillColor.checked ? ctx.fill() : ctx.stroke(); 
};

const drawTriangle = (e) => {
    ctx.beginPath(); 
    ctx.moveTo(prevMouseX, prevMouseY); 
    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); 
    ctx.closePath(); 
    fillColor.checked ? ctx.fill() : ctx.stroke(); 
};

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY; 
    ctx.beginPath(); 
    ctx.lineWidth = brushWidth; 
    ctx.strokeStyle = selectedColor; 
    ctx.fillStyle = selectedColor; 
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// Dodanie obsługi kliknięcia na przycisk kształtu
const shapeBtns = document.querySelectorAll(".option.tool");

shapeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id; // Ustawiam narzędzie na identyfikator przycisku
        highlightSelectedTool(); // Podświetlam wybrane narzędzie
    });
});

const colorPickerChangeHandler = () => {
    selectedColor = colorPicker.value; // Pobieram wartość koloru z elementu <input type="color">
};

colorPicker.addEventListener("change", colorPickerChangeHandler);

const drawing = (e) => {
    if (!isDrawing) return; 
    ctx.putImageData(snapshot, 0, 0); 

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); 
        ctx.stroke(); 
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
};

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        highlightSelectedTool(); // Podświetlam wybrane narzędzie
    });
});

sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value;
});

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { 
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); 
    link.download = `${Date.now()}.jpg`; 
    link.href = canvas.toDataURL(); 
    link.click();
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

// Funkcja do podświetlania wybranego narzędzia
const highlightSelectedTool = () => {
    toolBtns.forEach(btn => {
        btn.classList.remove("active");
    });
    shapeBtns.forEach(btn => {
        btn.classList.remove("active");
        if (btn.id === selectedTool) {
            btn.classList.add("active");
        }
    });
};

// Wywołanie funkcji na początku, aby ustawić domyślne podświetlenie
highlightSelectedTool();

// Historia operacji na płótnie
const canvasHistory = [];
let lastAction = null; 

const saveSnapshot = () => {
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    lastAction = null;
};

const undoAction = () => {
    if (canvasHistory.length > 1) {
        canvasHistory.pop();
        ctx.putImageData(canvasHistory[canvasHistory.length - 1], 0, 0);
        lastAction = "undo";
    } else if (canvasHistory.length === 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
        lastAction = "clear";
    }
};

UndoCanvas.addEventListener("click", undoAction);

canvas.addEventListener("mousedown", () => {
    if (selectedTool !== "eraser") {
        saveSnapshot();
    }
});

clearCanvas.addEventListener("click", () => {
    saveSnapshot(); 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    setCanvasBackground();
    lastAction = "clear";
});

canvas.addEventListener("mouseup", () => {
    if (lastAction === null && selectedTool !== "eraser") {
        saveSnapshot();
    }
    lastAction = null;
});

