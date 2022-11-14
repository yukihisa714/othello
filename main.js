const MATH_NUM = 8;
const TABLE = document.getElementById("table");

let nowColor = 1;
const COLORS = ["white", "green", "black"];

const ARRAY = [];
for (let row = 0; row < MATH_NUM; row++) {
    const TR = document.createElement("tr");
    TABLE.appendChild(TR);
    ARRAY[row] = [];
    for (let col = 0; col < MATH_NUM; col++) {
        const TD = document.createElement("td");
        TD.classList.add("block");
        TR.appendChild(TD);
        ARRAY[row][col] = { num: 0, elm: TD, stone: document.createElement("div") };
        ARRAY[row][col].stone.classList.add("stone");
        reflecColor(ARRAY[row][col]);
        TD.appendChild(ARRAY[row][col].stone);
        TD.addEventListener("click", () => {
            set(col, row);
        });
    }
}

function reflecColor(block) {
    block.stone.style.background = COLORS[block.num + 1];
}

const MATH_HALF_NUM = MATH_NUM / 2;
ARRAY[MATH_HALF_NUM][MATH_HALF_NUM].num = -1;
ARRAY[MATH_HALF_NUM - 1][MATH_HALF_NUM].num = 1;
ARRAY[MATH_HALF_NUM][MATH_HALF_NUM - 1].num = 1;
ARRAY[MATH_HALF_NUM - 1][MATH_HALF_NUM - 1].num = -1;

reflecColor(ARRAY[MATH_HALF_NUM][MATH_HALF_NUM]);
reflecColor(ARRAY[MATH_HALF_NUM - 1][MATH_HALF_NUM]);
reflecColor(ARRAY[MATH_HALF_NUM][MATH_HALF_NUM - 1]);
reflecColor(ARRAY[MATH_HALF_NUM - 1][MATH_HALF_NUM - 1]);

function check(sx, sy, mx, my) {
    let x = sx + mx;
    let y = sy + my;
    let result = false;
    if (0 <= x && x < MATH_NUM && 0 <= y && y < MATH_NUM) {
        while (ARRAY[y][x].num === -nowColor) {
            if (x < 0 || MATH_NUM <= x || y < 0 || MATH_NUM <= y) {
                break;
            }
            if (!ARRAY[y][x].num) {
                break;
            }
            const px = x + mx;
            const py = y + my;
            if (px < 0 || MATH_NUM <= px || py < 0 || MATH_NUM <= py) {
                break;
            }
            if (ARRAY[py][px].num === nowColor) {
                result = true;
                break;
            };
            x = px;
            y = py;
        }
    }
    return result;
}

function reverse(sx, sy, mx, my) {
    let x = sx + mx;
    let y = sy + my;
    while (ARRAY[y][x].num === -nowColor) {
        ARRAY[y][x].num = nowColor;
        reflecColor(ARRAY[y][x]);
        x += mx;
        y += my;
    }
}

function set(sx, sy) {
    if (ARRAY[sy][sx].num) return;
    let i = 0;
    for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
            if (x || y) {
                if (check(sx, sy, x, y)) {
                    reverse(sx, sy, x, y);
                    i++;
                }
            }
        }
    }
    if (i) {
        ARRAY[sy][sx].num = nowColor;
        reflecColor(ARRAY[sy][sx]);
        nowColor *= -1;
    }
    return i;
}