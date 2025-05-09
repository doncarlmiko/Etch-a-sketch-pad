const container = document.querySelector('.content-container');
const gridSize = document.querySelector('#gridNumber');
const changeGridSize = document.querySelector('#changeGridSize');
const penColor = document.querySelector('#penColor');
const backgroundFillColor = document.querySelector('#backgroundFillColor');
const Pen = document.querySelector('#Pen');
const FillColorButton = document.querySelector('#Fill');
const eraseCellButton = document.querySelector('#EraseCell');
const eraseAllCellButton=document.querySelector('#eraseAllCell');
const darkShadingButton=document.querySelector('#darkShadingCell');
const rainbowCell= document.querySelector('#rainbowCell');


const defaultGridSize = 10;
penColor.value = '#000000';

let backgroundGridColors = []; //Stores the background color of the grid.
let penColorHistory = []; // Stores manually selected colors

// Displays the number of grids based on user input
changeGridSize.addEventListener('click', () => {
    if (gridSize.value <= 0) {
        alert('Minimum of one grid!');
    } else if (gridSize.value <= 64) {
        createGrid(gridSize.value);
    } else {
        alert('Maximum of 64 grids!');
        gridSize.value = '1';
    }
});

//Pen color picker color input
const customColorPicker = document.querySelector('.custom-color-picker-pen');

const customColorPickerFill = document.querySelector('.custom-color-picker-fill');

penColor.addEventListener('input', () => {
    customColorPicker.style.backgroundColor = penColor.value; // Update pen color
});

backgroundFillColor.addEventListener('input', () => {
    customColorPickerFill.style.backgroundColor = backgroundFillColor.value; // Update fill color
});

let isPenDisabled = false; // Pen is working by default
Pen.addEventListener('click',(event)=>{
    isPenDisabled = false;
    isDarkShade=true; // locks the Shading button.
    isEraseDisabled=true; //unlocks the Erase button.
    isRainbowDisabled =true; //locks the Rainbow button.
    selectGridCell();
    changeButtonColor(event.target); // Change button colors based on state
});

// Listen for background fill color change
FillColorButton.addEventListener("click", (event)=>{
    isPenDisabled = true; // locks the pen button.
    isDarkShade=true; // locks the Shading button.
    isEraseDisabled=true; //unlocks the Erase button.
    isRainbowDisabled =true; //locks the Rainbow button.
    fillColor();
    changeButtonColor(event.target); // Change button colors based on state
});

let isRainbowDisabled =false;
rainbowCell.addEventListener('click',(event)=>{
    isRainbowDisabled = false;
    isPenDisabled = true; // locks the pen button.
    isDarkShade=true; // locks the Shading button.
    isEraseDisabled=true; //unlocks the Erase button.
    drawRainbowColor();
    changeButtonColor(event.target); // Change button colors based on state
});

let isEraseDisabled=false;
eraseCellButton.addEventListener("click", (event)=>{
    isEraseDisabled=false; //unlocks the Erase button.
    isPenDisabled = true; //locks the Pen button.
    isDarkShade=true; // locks the Dark Shading button.
    isRainbowDisabled =true; //locks the Rainbow button.
    eraseCell();
    changeButtonColor(event.target); // Change button colors based on state
});

eraseAllCellButton.addEventListener('click',(event)=>{
    isEraseDisabled=true; //unlocks the Erase button.
    isPenDisabled = true;
    isDarkShade=true; // locks the Dark Shading button.
    isRainbowDisabled =true; //locks the Rainbow button.
    eraseAllCell();
    changeButtonColor(event.target);
});

let isDarkShade=false;
darkShadingButton.addEventListener('click', (event)=>{
    isEraseDisabled=true; //Locks the Erase button.
    isPenDisabled = true; //locks the Pen button.
    isRainbowDisabled =true; //locks the Rainbow button.
    isDarkShade=false; // unlock shading button when clicked again.
    darkShading();
    changeButtonColor(event.target); // Change button colors based on state
});

window.addEventListener('resize', () => {
    createGrid(gridSize.value || defaultGridSize); // Recreate grid with current size
});

function changeButtonColor(target) {
    // Reset all button colors first
    Pen.style.backgroundColor = "";
    FillColorButton.style.backgroundColor = "";
    darkShadingButton.style.backgroundColor = "";
    eraseCellButton.style.backgroundColor = "";
    rainbowCell.style.backgroundColor = "";
    eraseAllCellButton.style.backgroundColor = "";

    // Change the background color of the clicked button
    target.style.backgroundColor = "#46544a";
}

// Function to create grid
function createGrid(size) {
    container.textContent = ""; // Clears the container
    backgroundGridColors = []; // Reset color storage
    manuallyColoredCells = []; // Reset manually colored cells

    // Dynamically get the width and height of the content-container
    const containerStyles= window.getComputedStyle(container);
    const containerWidth = parseFloat(containerStyles.width);
    const containerHeight = parseFloat(containerStyles.height);

    const cellWidth= containerWidth / size; // Calculate cell width
    const cellHeight= containerHeight / size; // Calculate cell height

    for (let row = 0; row < size; row++) {
        const divRows = document.createElement('div');
        divRows.classList.add('rows');

        for (let col = 0; col < size; col++) {
            const divColumns = document.createElement('div');
            divColumns.classList.add('columns');
            divColumns.style.width = `${cellWidth}px`; // Set cell width dynamically
            divColumns.style.height = `${cellHeight}px`;// Set cell height dynamically
            divRows.appendChild(divColumns);
        }
        container.appendChild(divRows);
    }
    getGridColors(); // Store initial colors after grid creation
}

// Function to handle cell selection
let isDrawing = false;
function selectGridCell() {
    const gridColumns=document.querySelectorAll('.columns');

        //Button events for Pen button.
        gridColumns.forEach((cell,index)=>{
            cell.addEventListener("click", (event) => {
                    if (isPenDisabled) return;
                    event.target.style.backgroundColor = penColor.value;

                    penColorCell(cell,index,penColor.value);
            });
    
           cell.addEventListener("mousedown", () => {
                if (isPenDisabled) return;
                isDrawing = true;
                
            });
    
            cell.addEventListener("mousemove", (event) => {
                if (isPenDisabled) return;

                if (isDrawing && event.target.classList.contains("columns")) {
                    event.target.style.backgroundColor = penColor.value;
    
                    penColorCell(cell,index,penColor.value);
                }
            });
    
            cell.addEventListener("mouseup", () => {
                if (isPenDisabled) return;
                isDrawing = false;
            });
            
        });
    getGridColors();
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
   backgroundGridColors = []; // Reset storage

    [...document.querySelectorAll(".rows")].flatMap(row =>
        [...row.children].forEach(cell => {
            const bgColor = window.getComputedStyle(cell).backgroundColor;
            backgroundGridColors.push(rgbToHex(bgColor)); // Store in hex format
        })
    );

    console.log("Stored Colors:", backgroundGridColors);
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
            backgroundGridColors[index] = backgroundFillColor.value; // Update stored colors
        }
            console.log("Pen Color History:", penColorHistory);
            console.log("Current Cell Color:", hexColor);
            console.log("Condition Check:", !penColorHistory.includes(hexColor));
    });

    console.log("Updated Background Colors:", backgroundGridColors);
}

let manuallyColoredCells = []; // Array to track manually colored cells
function manuallyColorCell(index) {
    if (!manuallyColoredCells.includes(index)) {
        manuallyColoredCells.push(index); // Store the index
    }
}

function eraseCell(){
    const deleteCell=document.querySelectorAll('.columns');
    deleteCell.forEach((cell,index)=>{
        cell.addEventListener('click',()=>{
            if(isEraseDisabled) return;

            const manuallyColoredIndex = manuallyColoredCells.indexOf(index);

            //Check if the manuallyColoredIndex is greater than -1.
            if (manuallyColoredIndex != -1){
                //Remove the index of the selected cell.
                manuallyColoredCells.splice(manuallyColoredIndex,1);
                penColorHistory.splice(manuallyColoredIndex,1);

                cell.style.opacity='1';
                cell.style.backgroundColor = backgroundGridColors[backgroundGridColors.length-1];
                backgroundGridColors[index] = backgroundFillColor.value; // Update stored colors
            }
        });
    });
}

function eraseAllCell(){
    const eraseAll = document.querySelectorAll('.columns');
    eraseAll.forEach((eraseCell,index)=>{
        //eraseCell.style.backgroundColor=backgroundGridColors[backgroundGridColors.length-1];
        
        const eraseColoredIndex = manuallyColoredCells.indexOf(index);

        if (eraseColoredIndex != -1){
            manuallyColoredCells.splice(eraseColoredIndex,1);
            penColorHistory.splice(eraseColoredIndex,1);
            eraseCell.style.backgroundColor=backgroundGridColors[backgroundGridColors.length-1];
        }
        eraseCell.style.opacity='1';
    });
}


let isDrawingDarkShade = false;
function darkShading(){
    const darkShadeColor = document.querySelectorAll('.columns');
    darkShadeColor.forEach((cell, index)=>{

        cell.addEventListener('click',(event)=>{
            if(isDarkShade) return;
            darkenCell(event.target,index);
            
        });

        cell.addEventListener("mousedown", () => {
            if(isDarkShade) return;
            isDrawingDarkShade = true;
        });

        cell.addEventListener("mousemove", (event) => {
            if(isDarkShade) return;
            
            if (isDrawingDarkShade && event.target.classList.contains("columns")) {
                darkenCell(event.target, index);
            }
        });

        cell.addEventListener("mouseup", () => {
            if(isDarkShade) return;
            isDrawingDarkShade =false;
        });

    });
}

    //a function that darkens the cell.
function darkenCell(cell,index){
    let currentColor=window.getComputedStyle(cell).backgroundColor;
    let darkerColor = darkenRGB(currentColor,5);
    cell.style.backgroundColor= darkerColor;
    penColorCell(cell,index,rgbToHex(darkerColor));
}

    
function darkenRGB(rgb,percent){
    const rgbValues=rgb.match(/\d+/g); //regex pattern in finding numeric value in rgb.
    if (!rgbValues) return rgb;

    //Conver RGB values to integers and darkens the color.
    let r = Math.max(0, parseInt(rgbValues[0]) - (255*percent / 100)); 
    let g = Math.max(0, parseInt(rgbValues[1]) - (255*percent / 100));
    let b = Math.max(0, parseInt(rgbValues[2]) - (255*percent / 100));
        
    return `rgb(${r}, ${g}, ${b})`;
}

let isRainbowColor=false;
//a function that lets you draw a random colored cells.
function drawRainbowColor(){
    const rainbowColorCell = document.querySelectorAll('.columns');
    rainbowColorCell.forEach((cell, index)=>{
        
        cell.addEventListener('click',()=>{
            if(isRainbowDisabled) return;
            penColorCell(cell,index,createRandomColor());
        });
    
        cell.addEventListener("mousedown", () => {
            if(isRainbowDisabled) return;
            isRainbowColor = true;
        });
    
        cell.addEventListener("mousemove", (event) => {
            if(isRainbowDisabled) return;
                
            if (isRainbowColor && event.target.classList.contains("columns")) {
               
                penColorCell(cell,index,createRandomColor());
            }
        });
    
        cell.addEventListener("mouseup", () => {
            if(isRainbowDisabled) return;
            isRainbowColor =false;
        });
    
    });   
}

//generates a rgb color
function createRandomColor(){
    let randomRgbColor=[];
    let RandomNumber;
    let colorIndex;

    for(colorIndex=0; colorIndex<3; colorIndex++){
        //Generates a RandomNumber
        RandomNumber= getRandomIndexNumber(100,255);
        randomRgbColor.push(RandomNumber);
    }
    let rgbColor=`rgb(${randomRgbColor})`;
    return rgbColor;
}

/*Generates a random number with a limit of min and max number. */
function getRandomIndexNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

createGrid(defaultGridSize);

