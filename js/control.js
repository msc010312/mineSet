// 지뢰생성버튼
const addbtn = document.querySelector('.add');
const conJoin = document.conJoin;
const row = conJoin.row;
const col = conJoin.col;

// 테이블 생성
const tbl = document.getElementById('map');

addbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const rowCol = {
        row: parseInt(row.value),
        col: parseInt(col.value),
    }
    const mineNumArr = {
        mineLimit: rowCol.row * rowCol.col,
    }

    newmap(rowCol);
    const minearr = setMine(mineNumArr);
    pushMine(minearr);
    // `pushMine` 실행 후 숫자 타일 생성
    mineNumber();
    row.value = '';
    col.value = '';
    row.focus();
});



function newmap(rowCol) {
    // 새 테이블 생성 시 기존 테이블 삭제
    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild)
    };

    // 최대크기 지정
    if (rowCol.row > 15 || rowCol.col > 15) {
        alert('최대크기는 15입니다')
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
};

// 왼쪽 클릭 함수
function leftClick(e) {
    const item = e.target
    if (item.classList.contains('flag') || item.classList.contains('q-mark')) {
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

    // 숫자칸이면 표시
    if (item.dataset.num) {
        item.textContent = item.dataset.num;
    }

}

// 오른쪽 클릭 함수
function rightClick(e) {
    e.preventDefault();
    const item = e.target
    if (item.classList.contains('flag')) {
        item.classList.replace('flag', 'q-mark');
    } else if (item.classList.contains('q-mark')) {
        item.classList.remove('q-mark');
    }
    else {
        item.classList.add('flag');
    }
}


// 지뢰 생성 함수 
function setMine(mineNumArr) {
    let minesarr = new Set(); // Set()을 이용한 중복데이터 제거
    let mineNum = (mineNumArr.mineLimit / 100) * 15 //전체크기의 15퍼만큼 생성(반올림)
    while (minesarr.size < mineNum) {
        let randomNum = Math.floor(Math.random() * mineNumArr.mineLimit)
        minesarr.add(randomNum); // 랜덤 상수 출력
    };
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
        mine.classList.remove('normal','flag','q-mark');
    });
    document.getElementById('map').style.pointerEvents = 'none';
    setTimeout(() => {
        alert('게임 오버!');
    }, 100);
}

// 숫자 표시 함수
function mineNumber() {
    const rows = tbl.rows.length;
    if(rows === 0) return;

    const cols = tbl.rows[0].cells.length;

    // 각 칸의 지뢰 개수를 계산
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = tbl.rows[i].cells[j];

            // 지뢰가 있는 칸이면 건너뜀
            if (cell.classList.contains('mine')) continue;

            let mineCount = countMinesAround(i, j, rows, cols);

            if (mineCount > 0) {
                cell.dataset.num = mineCount;
                cell.classList.add(`num${mineCount}`); // 숫자 타일 스타일 추가
            }
        }
    }
}

// 특정 좌표 (row, col) 주변의 지뢰 개수 계산  (DFS,BFS)
function countMinesAround(row, col, rows, cols) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],  // 위쪽 3칸
        [0, -1], [0, 1],    // 양 옆 2칸
        [1, -1], [1, 0], [1, 1]      // 아래쪽 3칸
    ];
    let mineCount = 0;

    directions.forEach(([dx, dy]) => {
        let newRow = row + dx;
        let newCol = col + dy;

        // 유효한 좌표인지 확인
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (tbl.rows[newRow].cells[newCol].classList.contains('mine')) {
                mineCount++;
            }
        }
    });

    return mineCount;
}

