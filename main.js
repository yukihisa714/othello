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
            console.log(col, row);
            if (!ARRAY[row][col].num) {
                ARRAY[row][col].num = nowColor;
                reflecColor(ARRAY[row][col]);
                nowColor *= -1;
            }
        });
    }
}

function reflecColor(block) {
    block.stone.style.background = COLORS[block.num + 1];
}

ARRAY[MATH_NUM / 2][MATH_NUM / 2].num = -1;
ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2].num = 1;
ARRAY[MATH_NUM / 2][MATH_NUM / 2 - 1].num = 1;
ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2 - 1].num = -1;

reflecColor(ARRAY[MATH_NUM / 2][MATH_NUM / 2]);
reflecColor(ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2]);
reflecColor(ARRAY[MATH_NUM / 2][MATH_NUM / 2 - 1]);
reflecColor(ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2 - 1]);


function a(sx, sy, mx, my) {
    let x = sx + mx;
    let y = sy + my;
    let result = false;
    if (x < 0 || MATH_NUM <= x || y < 0 || MATH_NUM <= y) {
        while (ARRAY[y][x].num === nowColor * -1) {
            if (x < 0 || MATH_NUM <= x || y < 0 || MATH_NUM <= y) {
                break;
            }
            if (!ARRAY[y][x].num) {
                break;
            }
            if (ARRAY[y + my][x + mx].num === nowColor) {
                result = true;
                break;
            };
            x += mx;
            y += my;
        }
    }
    return result;
}

function b(sx, sy, mx, my) {
    let x = sx + mx;
    let y = sy + my;
    while (ARRAY[y][x].num === nowColor * -1) {
        ARRAY[y][x].num = nowColor;
        x += mx;
        y += my;
    }
}