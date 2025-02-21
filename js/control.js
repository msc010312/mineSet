// 지뢰생성버튼
const addbtn = document.querySelector('.add');
const conJoin = document.conJoin;
const row = conJoin.row;
const col = conJoin.col;
const mine = conJoin.mine;

addbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const rowCol = {
        row: parseInt(row.value),
        col: parseInt(col.value),
    }
    const mineNumArr = {
        mineNum: parseInt(mine.value),
        mineLimit: rowCol.row * rowCol.col,
    }

    newmap(rowCol);
    const minearr = setMine(mineNumArr);
    pushMine(minearr);
    row.value = '';
    col.value = '';
    mine.value = '';
});



function newmap(rowCol) {
    // const row = document.getElementById('row').value;
    // const col = document.getElementById('col').value;

    // 테이블 생성
    const tbl = document.getElementById('map');

    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild)
    };
    if (rowCol.row > 10 || rowCol.col > 10) {
        alert('최대크기는 10입니다')
    } else if (rowCol.row != rowCol.col) {
        alert('가로 세로 길이를 같게 해주세요')
    } else {
        for (let i = 0; i < rowCol.row; i++) {
            const newtr = document.createElement('tr')
            for (let j = 0; j < rowCol.col; j++) {
                const newtd = document.createElement('td');
                newtd.classList.add('normal')
                newtd.addEventListener('click', (e) => {
                    if(e.target.classList.contains('flag')){
                        return;
                    }
                    if (e.target.classList.contains('mine')) {
                        gameOver();
                    }
                     else {
                        e.target.classList.add('open');
                        e.target.classList.remove('normal');
                        e.target.style.setProperty('border-color','#8d0d26',"important")
                    }
                });
                newtd.addEventListener('contextmenu',(e)=>{
                    e.preventDefault();
                    e.target.classList.toggle('flag');
                })
                newtr.appendChild(newtd);
            }
            tbl.appendChild(newtr);
        }
    }
    // const calltd = document.querySelector('#map>tr>td')
    // calltd.addEventListener('click', (e) => {
    //     if (e.target.tagName === 'td' && e.target.classList.contains('normal')) {
    //         e.target.classList.add('open')
    //     }
    // });
};


// 지뢰 생성
function setMine(mineNumArr) {
    let minesarr = new Set();
    while (minesarr.size < mineNumArr.mineNum) {
        let randomNum = Math.floor(Math.random() * mineNumArr.mineLimit)
        // console.log(randomNum)
        minesarr.add(randomNum);
    };
    // console.log(minesarr)
    return Array.from(minesarr);
}

// 지뢰 삽입
function pushMine(minesarr) {
    const tdArr = document.getElementsByTagName('td');
    for (let i = 0; i < tdArr.length; i++) {
        if (minesarr.includes(i)) {
            tdArr[i].classList.add('mine')
        }
    }
}