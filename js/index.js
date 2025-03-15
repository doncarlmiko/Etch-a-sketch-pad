const container=document.querySelector('.content-container');

let counter;
let counter2
    for(counter=0; counter<16; counter++){
        const divRows=document.createElement('div');
        
        for(counter2=0; counter2<16; counter2++){
            const divColumns=document.createElement('div');
            divRows.appendChild(divColumns);
            divColumns.classList.add('columns');

            //Hovers each columns and change its color.
            divColumns.addEventListener("mouseover",(colorColumn)=>{
                colorColumn.target.style.backgroundColor="red";
            })
        }
        container.appendChild(divRows);
        divRows.classList.add('rows');

    }

