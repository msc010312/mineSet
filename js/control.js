const addbtn = document.querySelector('.add');
const conJoin = document.conJoin;
const row = conJoin.row;
const col = conJoin.col;

addbtn.addEventListener('click', ()=>{
    const rowCol = {
        row : row.value,
        col : col.value,
    }
    newmap(rowCol);
    // row.value = '';
    // col.value = '';
})

function newmap(rowCol){
    // const row = document.getElementById('row').value;
    // const col = document.getElementById('col').value;
    const tbl = document.getElementById('map');

    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild)
    };

    for (let i = 0; i < rowCol.row; i++) {
        const newtr = document.createElement('tr')
        for (let j = 0; j < rowCol.col; j++) {
            const newtd = document.createElement('td')
            newtr.appendChild(newtd)
        }
        tbl.appendChild(newtr)
    };

    
}