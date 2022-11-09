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

