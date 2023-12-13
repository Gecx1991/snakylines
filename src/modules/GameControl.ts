import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";


// 游戏控制器 控制所有其他的类
class GameControl {

    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 蛇的移动方向（按键方向）
    direction: string = '';

    // 允许的方向键集合
    directions: Array<string>;
    // directions: string[];


    // 创建游戏是否结束标识
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 10);
        this.directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Up", "Down", "Left", "Right"];

        this.init();
    }

    // 游戏初始化方法，调用后游戏开始
    // bind 创建绑定函数
    // bind() 最简单的用法是创建一个函数，无论如何调用，它都会使用特定的 this 值进行调用。
    // JavaScript 新手经常犯的一个错误是将一个方法从对象中提取出来，然后再调用，并期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。
    // 然而，如果不做特殊处理的话，通常会丢失原始对象。使用这个函数加上原始的对象来创建一个绑定函数，巧妙地解决了这个问题：
    init() {
        // document.addEventListener('keydown',this.keyDownHandler.bind(this));
        document.addEventListener('keydown', (event) => {
            if (this.directions.includes(event.key)) {
                this.direction = event.key;
            }
        });
        // 使蛇移动
        this.run();
    }

    // 创建一个键盘按下的响应函数
    // keyDownHandler(event: KeyboardEvent) {
    //     this.direction = event.key;
    // }

    // 蛇移动的方法
    run() {
        /**
         * 根据 this.direction 来使蛇的位置改变
         * 向上 top 减少
         * 向下 top 增加
         * 向左 left 减少
         * 向右 left 增加
         * ArrowUp ArrowDown ArrowLeft ArrowRight
         * Up Down Left Right 兼容 IE
         */

        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }

        // 判断蛇吃到食物
        this.checkEat(X, Y);

        try {
            // 修改蛇的 X、Y值
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + " GAME OVER!!! ");
            this.isLive = false;
        }

        // 开启一个定时调用  
        // run()方法 中调用 setTimeout ,setTimeout里调用run(),递归调用 达到run()一直执行的效果
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 检查蛇是否吃到食物了
    checkEat(X: number, Y: number) {
        // 蛇吃到了食物
        if (X === this.food.X && Y === this.food.Y) {
            // 食物位置进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
    }


}

export default GameControl;