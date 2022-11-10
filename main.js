const MATH_NUM = 8;
const TABLE = document.getElementById("table");

let nowColor = 1;
const COLORS = ["white", "black"];

const ARRAY = [];
for (let row = 0; row < MATH_NUM; row++) {
    const TR = document.createElement("tr");
    TABLE.appendChild(TR);
    ARRAY[row] = [];
    for (let col = 0; col < MATH_NUM; col++) {
        const TD = document.createElement("td");
        TD.classList.add("block");
        TR.appendChild(TD);
        ARRAY[row][col] = { num: undefined, elm: TD, stone: undefined };
        TD.addEventListener("click", () => {
            console.log(col, row);
            if (!ARRAY[row][col].num) {
                ARRAY[row][col].num = nowColor;
                nowColor *= -1;
                const STONE = document.createElement("div");
                STONE.classList.add("stone");
                STONE.style.background = COLORS[(nowColor + 1) / 2];
                TD.appendChild(STONE);
            }
        });
    }
}

ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2 - 1].elm.click();
ARRAY[MATH_NUM / 2 - 1][MATH_NUM / 2].elm.click();
ARRAY[MATH_NUM / 2][MATH_NUM / 2].elm.click();
ARRAY[MATH_NUM / 2][MATH_NUM / 2 - 1].elm.click();

function a(sx, sy, mx, my) {
    let x = sx + mx;
    let y = sy + my;
    let result = false;
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
    return result;
}