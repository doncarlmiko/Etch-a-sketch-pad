const container=document.querySelector('.content-container');

let counter;
let counter2


const gridSize = 60;

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
            divColumns.style.width=`${cellWidthSize}px`;
            divColumns.style.height=`${cellHeightSize}px`;

            //Hovers each columns and change its color.
            divColumns.addEventListener("mouseover",(colorColumn)=>{
                colorColumn.target.style.backgroundColor="red";
            });
        }
        container.appendChild(divRows);
        divRows.classList.add('rows');

    }
}

createGrid(gridSize);
    

