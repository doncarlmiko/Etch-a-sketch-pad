const container=document.querySelector('.content-container');
const gridSize=document.querySelector('#gridNumber');
const changeGridSize=document.querySelector('#changeGridSize');
const penColor=document.querySelector('#penColor');
const backgroundFillColor=document.querySelector('#backgroundFillColor');


const defaultGridSize = 10;
penColor.value ='black';


let isDrawing = false; // Track if the user is holding the mouse button

//Displays the number of grids based on the user input
changeGridSize.addEventListener('click',()=>{
    if(gridSize.value <=0){
        alert('Minimum of one grid!');
        gridSize.value='1';
    }
    else if(gridSize.value <=64){
        createGrid(gridSize.value,penColor.value);
    }
    else{
        alert('Maximum of 64 grid!');
        gridSize.value='1';
    }
});

penColor.addEventListener("input", () => {
    console.log("Pen color changed to:", penColor.value);
});

backgroundFillColor.addEventListener("input",()=>fillColor());


function createGrid(size){
    //Clears the container to display the new number of grids.
    container.textContent="";
    let counter;
    let counter2;
    
    // Adjust cell size
    const cellWidthSize = 500 / size; 
    const cellHeightSize = 500/size;

    for(counter=0; counter<size; counter++){
        const divRows=document.createElement('div');
        
        for(counter2=0; counter2<size; counter2++){
            const divColumns=document.createElement('div');
            
            divRows.appendChild(divColumns);
            divColumns.classList.add('columns');

            //Adjust cell size depending on the grid size.
            divColumns.style.width=`${cellWidthSize}px`;
            divColumns.style.height=`${cellHeightSize}px`;
            
            selectGridCell(divColumns);
        }

        container.appendChild(divRows);
        divRows.classList.add('rows');
    }
}

function selectGridCell(divColumns){
    //Events for drawing on the cells.
    
    divColumns.addEventListener("click",(clickCell)=>{
        clickCell.target.style.backgroundColor = penColor.value;
       
        storePenColor(penColor.value);
    });

    divColumns.addEventListener("mousedown",()=>{
        isDrawing = true;
    });

    divColumns.addEventListener("mousemove", (event) => {
        if (isDrawing && event.target.classList.contains("columns")) {
          event.target.style.backgroundColor = penColor.value; // Change color when dragging
          storePenColor(penColor.value);
        }
      });

    divColumns.addEventListener("mouseup", () => {
        isDrawing = false;
      });
}

let penColorHistory=[];
//Store the pen color everytime the user changes it.
function storePenColor(penColor){
    if(!penColorHistory.includes(penColor)){
        penColorHistory.push(penColor);
    }
    
    console.log(penColorHistory);
}

//Change the background of the grid cells.
function fillColor(){
    const fillAllCells= document.querySelectorAll('.columns');
    fillAllCells.forEach((fillCell)=>{
        fillCell.style.backgroundColor=backgroundFillColor.value;
    })
}

createGrid(defaultGridSize);


