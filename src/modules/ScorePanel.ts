class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levleEle: HTMLElement;

    // 设置最高等级
    maxLevel: number;
    // 设置多少分升级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById("score")!;
        this.levleEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置分数增加
    addScore() {
        // 使分数增加
        this.score++;
        this.scoreEle.innerHTML = this.score + "";

        // 分数判断
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    // 提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levleEle.innerHTML = ++this.level + "";
        }
    }
}

export default ScorePanel