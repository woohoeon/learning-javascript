/**
 * Chapter13
 * 
 * 함수와 추상적 사고
 * 
 * 함수는 마치 카멜레온 같습니다. 함수는 자신이 존재하는 컨텍스트에 따라 다양한 모습을 취합니다. 우리가
 * 가장 먼저 되짚어 볼, 가장 간단한 일면은 코드를 재사용하는 수단이라는 측면입니다.
 */
(() => {

    /**
     * 서브루틴으로서의 함수
     * 
     * 서브루틴(subroutine)은 아주 오래 된 개념이며 복잡한 코드를 간단하게 만드는 기초적인 수단입니다.
     * 서브루틴은 반복되는 작업의 일부를 떼어내서 이름을 붙이고, 언제든 그 이름을 부르기만 하면 실행합니다.
     * 서브루틴은 프로시저(procedure), 루틴(routine), 서브프로그램(subprogram), 매크로(macro) 등
     * 다양한 이름으로 불립니다.
     */
    {
        // 서브루틴은 대개 어떤 알고리즘을 나타내는 형태입니다. 알고리즘이란, 주어진 작업을 수행하는 방법이죠,
        // 오늘이 윤년(leap year)인지 판단하는 알고리즘을 봅시다.
        const year = new Date().getFullYear();
        if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
        else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
        else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
        else console.log(`${year} is a leap year`);

        // 프로그램 안에서 이 코드를 10번, 100번 실행해야 한다고 생각해 봅시다. 그런데 콘솔이 기록 하는 메세지
        // 를 바꿔야 한다면? 이 코드를 쓰는 부분을 일일이 찾아다니면 바꿔야 합니다! 서브루틴은 바로 그런 문제를
        // 해결합니다.

        const printLeapYearStatus = function () {
            const year = new Date().getFullYear();
            if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
            else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
            else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
            else console.log(`${year} is a leap year`);
        };
    }

    /**
     * 값을 반환하는 서브루틴으로서의 함수
     * 
     * 한 단계 더 추상화해서 함수를 값을 반환하는 서브루틴으로 생각해봅시다.
     */
    {
        const isCurrentYearLeapYear = function () {
            const year = new Date().getFullYear();
            if (year % 4 !== 0) return false;
            else if (year % 100 !== 0) return true;
            else if (year % 400 !== 0) return false;
            else return true;
        };

        // 이제 새로 만든 함수의 반환값을 활용하는 예제를 생각해 봅시다.
        const daysInMonth = [31, isCurrentYearLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31,
            30, 31, 30, 31];
    }

    /**
     * 함수로서의 함수
     * 
     * 이제 함수를 함수로서 생각해 볼 시간입니다. 수학을 좋아한다면 함수를 일종의 관계로 생각할 수 있을 겁니다.
     * 입력이 들어가면 결과가 나오는 관계 말입니다. 입력은 모두 어떤 결과와 관련되어 있습니다. 프로그래머들은
     * 이렇게 함수의 수학적인 정의에 충실한 함수를 순수한 함수(pure function)라고 부릅니다. 하스켈(Haskell)
     * 같은 언어는 오직 순수한 함수만 허용하기도 합니다.
     * 
     * 그러면 순수한 함수는 우리가 여태까지 생각해 본 함수와 어떤 면에서 다를까요? 가장 중요한 차이는, 순수한
     * 함수에서는 입력이 같으면 결과도 반드시 같다는 점입니다. isCurrentYearLeapYear는 언제 호출하느냐에
     * 따라서 true를 반환하기도 하고 false를 반환하기도 하므로 순수한 함수라고 할 수 없습니다. 둘때, 순수한 함수
     * 에는 부수 효과(side effect)가 없어야 합니다. 즉, 함수를 호출한다고 해서 프로그램의 상태가 바뀌어서는 안
     * 된다는 뜻입니다. 지금까지 살펴본 함수에는 부수 효과가 없었습니다. 콘솔에 기록하는 것은 결과라고 봐야하니까요.
     * 간단한 예를 하나 봅시다.
     */
    {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        let colorIndex = -1;
        const getNextRainbowColor = function () {
            if (++colorIndex >= colors.length) colorIndex = 0;
            return colors[colorIndex];
        };
        // getNextRainbowColor 함수는 호출할 때마다 무지개의 일곱 가지 색깔을 하나씩 반환합니다. 이 함수는
        // 순수한 함수의 두 가지 정의를 모두 어깁니다. 입력이 같아도(매개변수가 없다는 점이 같습니다) 결과가 항상
        // 다르고, 변수 colorIndex를 바꾸는 부수 효과가 있습니다.

        // 잠시 윤년 문제로 돌아가서, 이 함수를 순수 함수로 고치려면 어떻게 해야 할까요?
        const isLeapYear = function (year) {
            if (year % 4 !== 0) return false;
            else if (year % 100 !== 0) return true;
            else if (year % 400 !== 0) return false;
            else return true;
        };

        // 새로운 함수는 입력이 같으면 결과도 항상 같고, 다른 효과는 전혀 없으므로 순수한 함수라고 볼 수 있습니다.

        // getNextRainbowColor 함수를 순수한 함수로 고치는 건 손이 조금 더 갑니다. 먼저 외부 변수를 클로저로
        // 감싸는 방법을 봅시다.
        {
            const getNextRainbowColor = (function () {
                const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
                let colorIndex = -1;
                return function () {
                    if (++colorIndex >= colors.length) colorIndex = 0;
                    return colors[colorIndex];
                };
            })();

            // 이제 부수 효과가 없어졌지만, 아직은 입력이 같아도 결과가 다를 수 있으므로 순수한 함수라고 볼 수는 없습니다.
            // 아마 이 함수는 반복적으로 호출할 겁니다. 예를 들어, 브라우저에서 어떤 요소의 색깔을 0.5초마다 바꾸고 싶다면
            // 다음과 같은 코드를 쓰게 될 겁니다.
            setInterval(function () {
                document.querySelector('.rainbow').style['background-color'] = getNextRainbowColor();
            }, 500);

            // 이 코드에는 별 문제가 없어 보이고, 의도도 분명히 드러납니다. 클래스가 rainbow인 html 요소의 색깔을 계속
            // 바꾸는 거죠. 문제는, 만약 프로그램의 다른 부분에서 getNextRainbowColor()를 호출한다면 이 코드드 그
            // 영향을 받는다는 겁니다. 이제 부수 효과가 있는, 다시 말해 외부에 영향을 주는 함수가 과연 좋은 것인지 생각해
            // 볼 만한 시기입니다. 여기서는 이터레이터를 사용하는 것이 더 나은 방법니다.
            const getRainbowIterator = function () {
                const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
                let colorIndex = -1;
                return {
                    next() {
                        if (++colorIndex >= colors.length) colorIndex = 0;
                        return { value: colors[colorIndex], done: false };
                    }
                };
            };

            // 이제 getRainbowIterator는 순수한 함수 입니다. 이 함수는 항상 같은 것(이터레이터)을 반환하며 외부에 아무
            // 영향도 주지 않습니다. 사용법이 바뀌긴 했지만, 훨씬 안전합니다.

            const rainbowIterator = getRainbowIterator();
            setInterval(function () {
                document.querySelector('.rainbow').style['background-color'] = rainbowIterator.next().value;
            }, 500);

            // 결국 next() 메서드는 매번 다른 값을 봔환할 테니, 문제를 뒤로 미뤘을 뿐 아니냐고 생각할 수도 있습니다. 틀린 말은
            // 아니지만, next()는 함수가 아니라 메서드라는 점에 주목할 필요가 있습니다. 메서드는 자신이 속한 객체라는 컨텍스트
            // 안에서 동작하므로 메서드의 동작은 그 객체에 의해 좌우됩니다. 프로그램의 다른 부분에서 getRainbowIterator를
            // 호출하더라도 독립적인 이터레이터가 생성되므로 다른 이터레이터를 간섭하지 않습니다.
        }

        /**
         * 그래서?
         * 
         * 서브루틴을 쓰면 자주 사용하는 동작을 하나로 묶을 수 있다는 매우 분명한 장점이 있습니다.
         * 순수한 함수는 조금 더 복잡한 문제이며, 왜? 라는 의문에 대한 답도 더 추상적인 형태입니다.
         * 순수한 함수를 쓰면 코드를 테스트하기 쉽고, 이해하기 쉽고, 재사용하기도 더 쉬우니까 처럼 대답하는 편이 좋습니다.
         */

        /**
         * 함수도 객체다
         * 
         * 자바스크립트 함수는 Function 객체의 인스턴트입니다. typeof v를 사용하면 v가 함수일 때 "function"이 반환된다는
         * 사실은 알아둘 만합니다.
         */

        /**
         * IIFE와 비동기적 코드
         * 
         * 6장에서 IIFE(즉시 호출하는 함수 표현식)에 대해서 알아봤습니다. IIFE를 이용해서 클로저를 만들 수 있다는 것도
         * 알았습니다. 이제 IIFE로 비동기적 코드를 처리하는 중요한 예제를 하나 살펴 봅시다.
         * 
         * IIFE를 사용하는 사례 중 하나는 비동기적 코드가 정확히 동작할 수 있도록 새 변수를 새 스코프에 만드는 겁니다.
         * 5초에서 시작하고 카운트다운이 끝나면 "go"를 표시하는 고전적 타이머 예제를 만들어 봅시다.
         */
        {
            var i;
            for (i = 5; i >= 0; i--) {
                setTimeout(() => {
                    console.log(i === 0 ? "go!" : i);
                }, (5 - i) * 1000);
            }

            // -1 이 여섯 번 출력됩니다. setTimeout에 전달된 함수가 루프 안에서 실행되지 않고 루프가 종료된 뒤에 실행됐기
            // 때문입니다.
            // let을 사용해 블록 수준 스코프를 만들면 이 문제는 해결되지만, 비동기적 프로그래밍에 익숙하지 않다면 아 되는구나,
            // 하고 넘어가지 말고 이 예제를 정확히 이해해야 합니다.

            // 블록 스코프 변수가 도입되기 전에는 이런 문제를 해결하기 위해 함수를 하나 더 썼습니다. 함수를 하나 더 쓰면
            // 스코프가 새로 만들어지고 각 단계에서 i의 값이 클로저에 캡처됩니다. 이름 붙은 함수를 쓰는 예제를 먼저 봅시다.
            const loopBody = i => {
                setTimeout(() => {
                    console.log(i === 0 ? "go!" : i);
                }, (5 - i) * 1000);
            };
            var i;
            for (i = 5; i >= 0; i--) {
                loopBody(i);
            }

            // 루프의 각 단계에서 loopBody 함수가 호출됩니다. 자바스크립트는 매개변수를 값으로 넘깁니다. 따라서 루프의 각
            // 단계에서 함수에 전달되는 것은 변수 i가 아니라 i의 값입니다.

            // 하지만 루프에 한 번 쓰고 말 함수에 일일이 이름을 붙이는 건 성가신 일입니다. 익명 함수를 만들어 즉시 호출하는
            // IIFE를 사용하는 게 더 낫습니다.
            var i;
            for (i = 5; i >= 0; i--) {
                (function (i) {
                    setTimeout(() => {
                        console.log(i === 0 ? "go!" : i);
                    }, (5 - i) * 1000);
                })(i);
            }

            // 블록 스코프 변수를 사용하면 스코프 하나 때문에 함수를 새로 만드는 번거로운 일을 하지 않아도 됩니다. 블록 스코프
            // 변수를 사용하면 이 예제를 극도로 단순화할 수 있습니다.
            for (let i = 5; i >= 0; i--) {
                setTimeout(() => {
                    console.log(i === 0 ? "go!" : i);
                }, (5 - i) * 1000);
            }

            // 이번에는 for루프 안에 let 키워드를 썼습니다. let 키워드를 이런 식으로 사용하면 자바스크립트는 루프의 단계마다
            // 변수 i의 복사본을 새로 만듭니다. 따라서 setTimeout에 전달한 함수가 실행될 때는 독립 스코프에서 변수를 받습니다.
        }

        /**
         * 변수로서의 함수
         * 
         * 숫자나 문자열, 배열은 변수라고 생각해도 별 거부감이 없습니다. 변수는 데이터라는 생각, 배열이나 객체는 데이터의 모임
         * 이라는 생각은 익숙하니까요 하지만 변수를 이렇게 이해하면 함수의 잠재력을 완전히 깨닫기 어려울 수 있습니다. 함수도
         * 다른 변수와 마찬가지로 이리저리 전달할 수 있다는 사실을 떠올리기 어렵기 때문입니다. 함수는 능동적인 것이므로, 우리가
         * 보통 수동적이라고 생각하는 데이터와 연결이 잘 되지 않을 수 있습니다. 물론 함수는 호출되었을 때는 능동적입니다. 하지만
         * 호출하기 전에는 다른 변수와 마찬가지로 수동적입니다.
         * 
         * 이해를 돕는 비유를 하나 소개하겠습니다. 슈퍼마켓에 과일을 사러 간다고 합시다. 이때 과일은 데이터라고 생각 할 수
         * 있습니다. 그런데 사과와 바나나를 넣어 스무디를 만들고 싶어져서, 블렌더도 하나 사기로 했습니다. 블렌더는 함수라고 생각
         * 할 수 있습니다. 과일을 넣으면 스무디를 만드는 능동적인 것이니까요. 하지만 블렌더는 전원을 연결하고 과일을 넣기 전에는,
         * 과일과 마찬가지로 하나의 물건일 뿐입니다. 카트에서 꺼내 계산대에 올리고, 결제하고, 쇼핑백에 넣어 집으로 가져옵니다.
         * 과일과 다를 게 하나도 없습니다. 블렌더가 과일과 달라질 때는 전원을 연결하고 과일을 넣었을 때뿐입니다.
         * 
         * 자, 변수가 있을 수 있는 곳에는 함수도 있을 수 있습니다. 그럼 이 사실은 무엇을 의미할까요?
         * 간추려 보면, 다음과 같은 일을 할 수도 있다는 뜻입니다.
         * 
         *  * 함수를 가리키는 변수를 만들어 별명을 정할 수 있습니다.
         *  * 배열에 함수를 넣을 수 있습니다. 물론 다른 타입의 데이터와 섞일 수 있습니다.
         *  * 함수를 객체의 프로퍼티로 사용할 수 있습니다.
         *  * 함수를 함수에 전달할 수 있습니다.
         *  * 함수가 함수를 반환할 수 있습니다.
         *  * 함수를 매개변수로 받는 함수를 반환하는 것도 물론 가능합니다.
         */
        {
            // 우선 가장 이해하기 쉬운 것, 함수에 별명을 붙이는 것부터 생각해 봅시다. 짧은 코드 안에서 여러 번 호출해야 하는 함수가
            // 있습니다. 그런데 이 함수의 이름이 너무 길어서 타이핑하기 번거로울 뿐 아니라, 코드를 읽기도 무척 어려울 것 같습니다.
            // 함수도 데이터이므로 짧은 이름의 변수에 저장할 수 있습니다.
            function addThreeSquareAddFiveTakeSquareRoot(x) {
                // 설마 이런 이름을 짓지는 않겠지만...
                return Math.sqrt(Math.pow(x + 3, 2) + 5);
            }

            // 별명을 쓰기전
            const answer = (addThreeSquareAddFiveTakeSquareRoot(5) +
                addThreeSquareAddFiveTakeSquareRoot(2)) / addThreeSquareAddFiveTakeSquareRoot(7);

            // 별명을 쓰면 이렇게 바뀝니다.
            const f = addThreeSquareAddFiveTakeSquareRoot;
            const answer2 = ((f(5) + f(2)) / f(7));

            // 물론 이 예제는 완전히 인위적이고, 실제 이런 상황에 처할 일은 거의 없을 겁니다. 하지만 20장에서 배울 노드 개발에서 자주
            // 쓰이는 네임스페이스에서는 계속 쓰는 패턴입니다. 다음 예제를 보십시오.
            const Money = require('math-money'); // require는 라이브러리를 불러오는 노드 함수입니다. 
            const oneDollar = Money.Doller(1);

            // Money.Dollar도 길게 느껴지면 이렇게 해도 됩니다.
            const Dollar = Money.Dollar;
            const twoDollars = Dollar(2);
            // oneDollar와 twoDollars는 같은 타입의 인스턴스입니다.
            // 이제 더 추상적으로 생각해 봅시다.

            /**
             * 배열 안의 함수
             * 
             * 배열 안에 함수를 쓰는 패턴은 그리 오래되지 않았지만 점점 늘어나고 있고, 특정 상황에서는 대단히 유용합니다. 자주 하는
             * 일을 한 셋으로 묶은 파이프라인이 좋은 예입니다. 배열을 사용하면 작업 단계를 언제든 쉽게 바꿀 수 있다는 장점이 있습니다.
             * 어떤 작업을 빼야 한다면 배열에서 제거하기만 하면 되고, 추가할 작업이 있다면 배열에 추가하기만 하면 됩니다.
             * 
             * 그래픽 변형(transformation)을 예로 들어 봅시다. 시각화 소프트웨어를 만들 때는 변형을 파이프라인으로 묶어서 적용할
             * 때가 많습니다. 다음은 자주 사용하는 2차원 변형의 한 예입니다.
             */
            {
                const sin = Math.sin;
                const cos = Math.cos;
                const theta = Math.PI / 4;
                const zoom = 2;
                const offset = [1, -3];

                const pipeline = [
                    function rotate(p) {
                        return {
                            x: p.x * cos(theta) - p.y * sin(theta),
                            y: p.x * sin(theta) + p.y * cos(theta),
                        };
                    },
                    function scale(p) {
                        return { x: p.x * zoom, y: p.y * zoom };
                    },
                    function translate(p) {
                        return { x: p.x + offset[0], y: p.y + offset[1] };
                    },
                ];

                // 이제 pipeline은 2D 변형에 필요한 함수의 배열입니다.
                // 점 하나를 변형해 봅시다.
                const p = { x: 1, y: 1 };
                let p2 = p;
                for (let i = 0; i < pipeline.length; i++) {
                    p2 = pipeline[i](p2);
                }

                // p2는 이제 p1을 좌표 원점 기준으로 45도 회전하고(rotate)
                // 원점에서 2 단위만큼 떨어뜨린 후(scale)
                // 1단위 오른쪽, 3단위 아래쪽으로 움직인(translate) 점입니다.

                // 이 예제는 아주 기본적인 것이지만, 함수를 배열에 저장하는 장점을 엿보기에는 충분하리라고 생각합니다.
                // 파이프라인의 각 함수를 호출 할 때 사용한 문법을 보면, 괄호를 써서 함수를 호출합니다.
                // 일정한 순서에 따라 함수를 실행해야 한다면 파이프라인을 써서 효율적으로 일할 수 있습니다.

                /**
                 * 함수에 함수 전달
                 * 
                 * 함수에 함수를 전달하는 예제는 setTimeout과 forEach에서 이미 봤습니다. 함수에 함수를 전달하는 다른 용도는
                 * 비동기적 프로그래밍입니다. 이런 용도로 전달하는 함수를 보통 콜백(callback)이라 부르며, 약자로 cb를 쓸 때가
                 * 많습니다. 콜백 함수는 자신을 감싼 함수가 실행을 마쳤을때 호출됩니다.
                 * 
                 * 함수에 함수를 전달하는 대표적인 사례가 콜백이긴 하지만, 그게 전부는 아닙니다. 함수는 동작이고, 함수를 받은 함수
                 * 는 그 동작을 활용할 수 있습니다. 배열에 들어있는 숫자를 모두 더하는 단순한 함수 sum이 필요하다고 합시다(배열에
                 * 숫자가 아닌 것이 들어있을 때를 대비한 체크나 에러처리는 생략하겠습니다). 그런 함수는 쉽게 만들 수 있습니다.
                 * 그런데 숫자의 제곱(square)을 합해서 반환하는 함수가 필요하다면? 물론 새 함수 sumOfSquares를 만들어도 됩
                 * 니다. 그런데, 세제곱을 합해서 반환하는 함수도 필요하다면? 이런 상황에서 함수에 함수를 전달한다는 발상이 필요합
                 * 니다.
                 */
                {
                    function sum(arr, f) {
                        // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씁니다.
                        if (typeof f != 'function') f = x => x;

                        return arr.reduce((a, x) => a += f(x), 0);
                    }
                    sum([1, 2, 3]); // 6
                    sum([1, 2, 3], x => x * x); // 14
                    sum([1, 2, 3], x => Math.pow(x, 3)); // 36
                }

                /**
                 * 함수를 반환하는 함수
                 * 
                 * 함수를 반환하는 함수는 아마 함수의 가장 난해한 사용법이겠지만, 그만큼 유용하기도 합니다. 어떤 기능이 있는 것을
                 * 만든다는 점에서, 함수를 반환하는 함수를 일종의 3D프린터라고 생각 할 수 있을 겁니다.
                 * 
                 * sum 함수를 다시 생각해 봅시다. 이 함수는 각 요소를 더하기 전에 해당 요소를 바꾸는 함수를 받습니다. 원한다면
                 * sumOfSquares 함수를 만들 수도 있다고 했습니다. 그런데 상황이 바뀌어서, 그런 함수가 정말 필요하다고 해봅시
                 * 다. 배열과 함수를 받는 함수로는 만족스러운 결과를 얻을 수 있고, 배열 하나만 받아서 제곱의 합을 반환하는 함수가
                 * 필요합니다.
                 * 
                 * 먼저, 이미 만들어 둔 sum 함수를 활용하는 방법이 있습니다.
                 */
                {
                    function sum(arr, f) {
                        // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씁니다.
                        if (typeof f != 'function') f = x => x;

                        return arr.reduce((a, x) => a += f(x), 0);
                    }

                    function sumOfSquares(arr) {
                        return sum(arr, x => x * x);
                    }

                    // 물론 이렇게 해도 됩니다. 필요한 것이 함수 하나라면 가장 간단한 해결책이 될 수 있습니다. 하지만 제곱근의 합을
                    // 구하는 함수, 세제곱의 합을 구하는 함수, 하는 식으로 이런 패턴이 계속 반복된다면 어떻게 해야 할까요? 필요한 함
                    // 수를 반환하는 함수를 만들어 문제를 해결할 수 있습니다.
                    function newSummer(f) {
                        return arr => sum(arr, f);
                    }

                    // 새 함수 newSummer가 반환하는 함수는 단 하나의 매개변수만 받으면서도, 우리가 원하는 중간 함수를 마음대로
                    // 쓸 수 있습니다. 다음 예제를 보십시오.
                    const newSumOfSquares = newSummer(x => x * x);
                    const sumOfCubes = newSummer(x => Math.pow(x, 3));
                    newSumOfSquares([1, 2, 3]); // returns 14
                    sumOfCubes([1, 2, 3]); // returns 36

                    // NOTE_ 이 예제처럼 매개변수 여러 개를 받는 함수를 매개변수 하나만 받는 함수로 바꾸는 것을 커링(currying)
                    // 이라 부릅니다. 커링이라는 이름은 이 패턴을 만든 미국의 수학자 하스켈 커리(Haskell Curry)의 이름을 딴 것 입
                    // 니다.

                    // 함수가 함수를 반환하는 패턴은 좀 복잡한 편입니다. 함수를 반환하는 함수의 예제를 더 보고 싶다면 자바스크립트 웹
                    // 개발 프레임워크로 널리 쓰이는 익스프레스(Express)나 Koa 같은 미들웨어 패키지를 살펴보십시오. 미들웨어는 대
                    // 개 함수를 반환하는 함수 형태로 만들어집니다.
                }

                /**
                 * 재귀
                 */
            }
        }
    }

})();