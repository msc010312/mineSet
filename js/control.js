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

    // 새 테이블 생성 시 기존 테이블 삭제
    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild)
    };

    // 최대크기 지정
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

                // 왼쪽 클릭 이벤트
                newtd.addEventListener('click', leftClick);

                // 오른쪽 클릭 이벤트
                newtd.addEventListener('contextmenu', rightClick);

                // 게임 시작시 클릭 활성화
                tbl.style.pointerEvents = 'all';
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
    startTimer();
};

// 왼쪽 클릭 함수
function leftClick(e) {
    const item = e.target
    if (item.classList.contains('flag')|| item.classList.contains('q-mark')) {
        return; // 깃발, 물음표를 눌렀을 경우 바로 리턴시킴
    }
    if (item.classList.contains('mine')) { // 지뢰를 눌렀을때 이벤트 처리
        const mines = document.querySelectorAll('.mine');
        mines.forEach(item => {
            item.style.setProperty('border-color', '#8d0d26')
        });
        gameOver();
    }
    else {
        item.classList.replace('normal', 'open'); // 일반칸을 눌렀을 경우
    }
}

// 오른쪽 클릭 함수
function rightClick(e) {
    e.preventDefault();
    const item = e.target
    if (item.classList.contains('flag')) {
        item.classList.replace('flag', 'q-mark');
    } else if(item.classList.contains('q-mark')) {
        item.classList.remove('q-mark');
        // item.classList.remove('flag');
    } 
    else {
        item.classList.add('flag');
    }
    // if (e.target.classList.contains('q-mark')) {
    //     e.target.classList.remove('q-mark')
    // }
}


// 지뢰 생성 함수
function setMine(mineNumArr) {
    let minesarr = new Set(); // Set()을 이용한 중복데이터 제거
    while (minesarr.size < mineNumArr.mineNum) {
        let randomNum = Math.floor(Math.random() * mineNumArr.mineLimit)
        // console.log(randomNum)
        minesarr.add(randomNum); // 랜덤 상수 출력
    };
    // console.log(minesarr)
    return Array.from(minesarr); // 랜덤 상수 배열에 추가
}

// 지뢰 삽입 함수
function pushMine(minesarr) {
    const tdArr = document.getElementsByTagName('td');
    for (let i = 0; i < tdArr.length; i++) {
        if (minesarr.includes(i)) {
            tdArr[i].classList.add('mine')
        }
    }
}

// 게임오버 함수
function gameOver() {
    const allMines = document.querySelectorAll('.mine');
    allMines.forEach(mine => {
        mine.classList.remove('normal');
    });
    document.getElementById('map').style.pointerEvents = 'none';
    setTimeout(() => {
        alert('게임 오버!');
    }, 100);
}

// 타이머 함수
function startTimer() {
    let cnt = 0;
}

// 숫자 표시 함수
function mineNumber() {
    
}