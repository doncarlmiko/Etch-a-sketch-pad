const container=document.querySelector('.content-container');

let counter;
let counter2;

let isDrawing = false; // Track if the user is holding the mouse button
const gridSize = 20;

function createGrid(size){
    //const totalCells = size * size;
    container.textContent="";
    
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

            //Events for drawing on the cells.
            divColumns.addEventListener("click",(clickCell)=>{
                clickCell.target.style.backgroundColor = "red";
            });

            divColumns.addEventListener("mousedown",()=>{
                isDrawing = true;
            });

            divColumns.addEventListener("mousemove", (event) => {
                if (isDrawing && event.target.classList.contains("columns")) {
                  event.target.style.backgroundColor = "red"; // Change color when dragging
                }
              });

            divColumns.addEventListener("mouseup", () => {
                isDrawing = false;
              });
        }

        container.appendChild(divRows);
        divRows.classList.add('rows');
    }
}



createGrid(gridSize);
    

