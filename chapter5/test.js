/**
 * chapter 5
 */
(() => {

    /**
     * 해체 할당
     */
    // 객체 선언
    const obj = { b: 2, c: 3, d: 4 };

    // 해체 할당, 객체를 해체할 때는 반드시 변수 이름과 객체의 프로퍼티 이름이 일치해야 합니다.
    const { a, b, c } = obj;
    console.log(a); // undefined
    console.log(b); // 2
    console.log(c); // 3

    // 배열 선언
    const arr = [1, 2, 3];

    // 배열 해체 할당
    let [x, y] = arr;
    console.log(x); // 1
    console.log(y); // 2

    // 배열 선언    
    const arr2 = [1, 2, 3, 4, 5];

    // 할당 되지 않은 배열의 요소는 모두 버려집니다. 확산 연산자를 사용하면 남은 요소를 할당 할 수 있습니다.
    let [x2, y2, ...rest] = arr2;
    console.log(x2);
    console.log(y2);
    console.log(rest);

    // 배열 해체를 활용하면 변수의 값을 서로 바꿀 수 있습니다.
    let aa = 5, bb = 10;
    [aa, bb] = [bb, aa];
    console.log(aa);
    console.log(bb);

    /**
     * 템플릿 문자열의 표현식
     */
    const roomTempC = 21.5;
    let currentTempC = 19.5;
    const message = `The current temperature is ` +
        `${currentTempC - roomTempC}\u00b0C different than room temperature.`;
    console.log(message);

})();