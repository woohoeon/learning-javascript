/**
 * chapter7
 */
(() => {

    /**
     * 블록 스코프
     */
    console.log('before block');
    {
        console.log('inside block');
        const x = 3;
        console.log(x);
    }
    // console.log(`outside block; x=${x}`); // ReferenceError: Can't find variable: x

    /**
     * 변수 숨기기
     */
    {
        // 외부 블록
        let x = 'blue';
        console.log(x);
        {
            // 내부 블록
            let x = 3;
            console.log(x);
        }
        console.log(x);
    }
    console.log(typeof x);

    /**
     * 클로저
     * 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우가 많습니다.
     * 이런 것을 보통 클로저(closure)라고 부릅니다. 스코프를 함수 주변으로 좁히는(closing) 것이라고 생각해도 됩니다. 
     */
    let globalFunc;
    {
        let blockVar = 'a';
        globalFunc = function () {
            console.log(blockVar);
        };
    }
    globalFunc();
    // 일반적으로 스코프에서 빠져나가면 해당 스코프에서 선언한 변수는 메모리에서 제거해도 안전합니다.
    // 여기서는 스코프 안에서 함수를 정의했고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 스코프를 계속 유지합니다.

    /**
     * 즉시 호출하는 함수 표현식
     */
    // 함수 표현식을 사용하면 즉시 호출하는 함수 표현식(IIFE)이란 것을 만들 수 있습니다.
    (function () {
        // IIFE 바디
    })();

    /**
     * 함수 스코프와 호이스팅
     */
    // let을 쓰면, 변수를 선언하기 전 사용하려 할 때 에러가 일어납니다.
    // 반면 var로 변수를 선언하면 선언하기 전에도 사용할 수 있습니다.
    console.log(x1); // undefined
    var x1 = 3;
    console.log(x1); // 3
    // 자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어올립니다.
    // 여기서 중요한 것은 선언만 끌어올려진다는 것이며, 할당은 끌어올려지지 않는다는 겁니다.
    // 자바스크립트는 다음과 같이 해석합니다.
    // var x1;
    // x1;
    // x1 = 3;
    // x1;

    /**
     * 함수 호이스팅
     */
    // var로 선언된 변수와 마찬가지로, 함수 선언도 스코프 맨 위로 끌어올려집니다.
    f();
    function f() {
        console.log('f');
    }

    // 변수에 할당한 함수 표현식은 끌어올려지지 않습니다.
    // f2();
    // let f2 = function () {
    //     console.log('f');
    // };


})();