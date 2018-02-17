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
                    console.log(i === 0 ? "go" : i);
                }, (5 - i) * 1000);
            };
            var i;
            for (i = 5; i >= 0; i--) {
                loopBody(i);
            }
        }
    }

})();