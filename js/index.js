const container=document.querySelector('.content-container');

let counter;
let counter2
    for(counter=0; counter<10; counter++){
        const divRows=document.createElement('div');
        
        for(counter2=0; counter2<4; counter2++){
            const divColumns=document.createElement('div');
            divRows.appendChild(divColumns);
            divColumns.classList.add('columns');
        }
        container.appendChild(divRows);
        divRows.classList.add('rows');
    }
