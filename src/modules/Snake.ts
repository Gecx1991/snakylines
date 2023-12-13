// 定义类
class Snake {
    // 获取一个表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体（包含蛇头）
    bodies: HTMLCollection;

    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById("snake")!;
        // this.head =  document.querySelector('#snake > div')!;
        // 断言 查询返回元素结果类型为 HTMLElement
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById("snake")!.getElementsByTagName('div');
    }

    // 获取蛇的坐标（蛇头坐标）

    // 获取x轴坐标
    get X() {
        return this.head.offsetLeft;
    }
    // 获取Y轴坐标
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头坐标
    set X(value) {
        if (this.X === value) {
            return;
        }

        // 判断 x 的合法范围 0 ~290
        if (value < 0 || value > 290) {
            // 蛇撞墙了
            throw new Error('蛇撞墙了!');
        }

        // 修改x时,是在修改水平坐标,蛇在左右移动, 向左移动时不能向右移动，反之亦然（即不能掉头）
        // 当发生掉头时,头节点（第一节身体）和第二节身体的位置会相等（第一节身体位置计算完成，后续的身体才位置才进行的调整 moveBody()），可以以此来判断是否发生了掉头
        // this.bodies[1] -> 判断有第二节身体
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 水平方向发生了调头
            // 如果发生调头，让蛇反方向继续移动
            if (value > this.X) {
                // 说明此时蛇向右调头, 此时使蛇继续往左走
                value = this.X - 10;
            } else {
                // 蛇向左调头时
                value = this.X + 10;
            }
        }


        // 移动身体
        this.moveBody();

        this.head.style.left = value + "px";
        this.checkHeadBody();
    }
    set Y(value) {
        if (this.Y === value) {
            return;
        }

        if (value < 0 || value > 290) {
            // 蛇撞墙了
            throw new Error('蛇撞墙了!');
        }


        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 垂直方向发生了调头
            // 如果发生调头，让蛇反方向继续移动
            if (value > this.Y) {
                // 说明此时蛇向下调头, 此时使蛇继续往上走
                value = this.Y - 10;
            } else {
                // 蛇向上调头时
                value = this.Y + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.top = value + "px";

        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody() {
        // insertAdjacentHTML() 方法将指定的文本解析为 Element 元素，并将结果节点插入到 DOM 树中的指定位置。
        // 它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用 innerHTML 操作更快。
        // 'beforebegin'：元素自身的前面。
        // 'afterbegin'：插入元素内部的第一个子节点之前。
        // 'beforeend'：插入元素内部的最后一个子节点之后。
        // 'afterend'：元素自身的后面
        // 向element中添加一个 div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // 添加一个蛇的身体移动的方法
    moveBody() {
        /**
         * 将后面身体的位置设置为前面身体的位置
         * 例如：
         * 第4节身体的位置设置为当前第3节身体的位置,
         * 第3节身体的位置设置为当前第2节身体的位置。。。
         */

        // 遍历所有身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前面一节身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";
        }
    }


    // 检查身体是否和蛇头相撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error("撞到自己了！");
            }
        }
    }

}

export default Snake;