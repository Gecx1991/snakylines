// 定义类
class Food {
    element: HTMLElement;
    constructor() {
        // 获取页面中food元素 并赋值给element  ! 表示不为空 不需要判断
        this.element = document.getElementById("food")!;
    }

    // 获取食物 x轴坐标的方法

    get X() {
        return this.element.offsetLeft;
    }

    // 获取Y轴坐标
    get Y() {
        return this.element.offsetTop;
    }

    change() {
        // 生成一个随机位置
        // 食物位置 0 ~ 290位置
        // 蛇移动一次是一格 一格大小10px ，所以要求食物位置是10的倍数

        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    }
}

export default Food