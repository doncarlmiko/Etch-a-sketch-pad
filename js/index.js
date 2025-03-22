const container = document.querySelector('.content-container');
const gridSize = document.querySelector('#gridNumber');
const changeGridSize = document.querySelector('#changeGridSize');
const penColor = document.querySelector('#penColor');
const backgroundFillColor = document.querySelector('#backgroundFillColor');

const defaultGridSize = 10;
penColor.value = '#000000';

let isDrawing = false; // Track if the user is holding the mouse button
let backgroundGridcolors = [];
let penColorHistory = []; // Stores manually selected colors

// Displays the number of grids based on user input
changeGridSize.addEventListener('click', () => {
    if (gridSize.value <= 0) {
        alert('Minimum of one grid!');
        gridSize.value = '1';
    } else if (gridSize.value <= 64) {
        createGrid(gridSize.value);
    } else {
        alert('Maximum of 64 grids!');
        gridSize.value = '1';
    }
});

// Listen for background fill color change
backgroundFillColor.addEventListener("input", () => fillColor());

// Function to create grid
function createGrid(size) {
    container.textContent = ""; // Clears the container
    backgroundGridcolors = []; // Reset color storage

    const cellSize = 500 / size; // Adjust cell size dynamically

    for (let row = 0; row < size; row++) {
        const divRows = document.createElement('div');
        divRows.classList.add('rows');

        for (let col = 0; col < size; col++) {
            const divColumns = document.createElement('div');
            divColumns.classList.add('columns');
            divColumns.style.width = `${cellSize}px`;
            divColumns.style.height = `${cellSize}px`;
            divRows.appendChild(divColumns);
            
            
        }

        container.appendChild(divRows);
    }
    selectGridCell();
    getGridColors(); // Store initial colors after grid creation
}

// Function to handle cell selection
function selectGridCell() {
    const gridColumns=document.querySelectorAll('.columns');

    gridColumns.forEach((cell,index)=>{
        cell.addEventListener("click", (event) => {
            event.target.style.backgroundColor = penColor.value;

            penColorCell(cell,index,penColor.value);
            getGridColors();
        });
    })

    gridColumns.forEach((cell)=>{
        cell.addEventListener("mousedown", () => {
        isDrawing = true;
    });
    });
    
    gridColumns.forEach((cell,index)=>{
        cell.addEventListener("mousemove", (event) => {

            if (isDrawing && event.target.classList.contains("columns")) {
                event.target.style.backgroundColor = penColor.value;

                penColorCell(cell,index,penColor.value);
                getGridColors();
            }
        });
    });

    gridColumns.forEach((cell)=>{
        cell.addEventListener("mouseup", () => {
            isDrawing = false;
        });    
    });
}

// Store manually selected pen colors
function penColorCell(cell,index,penColor) {
        penColorHistory.push(penColor);
        cell.style.backgroundColor = penColor;
        manuallyColorCell(index);
    console.log("Pen Color History:", penColorHistory);
}

// Convert RGB color format to Hex format
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g); // Extract numbers
    if (!rgbValues) return rgb; // Return as is if invalid

    return `#${rgbValues.map(x => {
        const hex = parseInt(x).toString(16); // Convert to hex
        return hex.length === 1 ? "0" + hex : hex; // Ensure two digits
    }).join('')}`;
}

// Store grid cell background colors in hex format
function getGridColors() {
    backgroundGridcolors = []; // Reset storage

    [...document.querySelectorAll(".rows")].flatMap(row =>
        [...row.children].forEach(cell => {
            const bgColor = window.getComputedStyle(cell).backgroundColor;
            backgroundGridcolors.push(rgbToHex(bgColor)); // Store in hex format
        })
    );

    console.log("Stored Colors:", backgroundGridcolors);
}

// Change the background of uncolored grid cells
function fillColor() {
    const fillAllCells = document.querySelectorAll('.columns');

    fillAllCells.forEach((fillCell, index) => {
        const currentColor = window.getComputedStyle(fillCell).backgroundColor;
        const hexColor = rgbToHex(currentColor); // Convert to hex for comparison

        // If the cell was NOT manually colored, update it
        if (!manuallyColoredCells.includes(index)){
            fillCell.style.backgroundColor = backgroundFillColor.value;
            backgroundGridcolors[index] = backgroundFillColor.value; // Update stored colors
            
        }
            console.log("Pen Color History:", penColorHistory);
            console.log("Current Cell Color:", hexColor);
            console.log("Condition Check:", !penColorHistory.includes(hexColor));
    });

    console.log("Updated Background Colors:", backgroundGridcolors);
}

let manuallyColoredCells = []; // Array to track manually colored cells

function manuallyColorCell(index) {
    if (!manuallyColoredCells.includes(index)) {
        manuallyColoredCells.push(index); // Store the index
    }
}
createGrid(defaultGridSize);
