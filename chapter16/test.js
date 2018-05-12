/**
 * Chapter16
 * 
 * Math
 * 
 * Math 객체는 애플리케이션을 개발하면서 자주 사용하게 될 수학 함수를 담고 있습니다.
 * 자바스크립트에는 정수 전용 클래스가 없습니다. 일반적으로는 자바스크립트의 숫자면 충분하다고 할 수 있습니다.
 * 자바스크립트는 복잡한 숫자나 아주 큰 숫자를 지원하지 못합니다. 복잡한 숫자나 아주 큰 숫자를 다뤄야 한다거나, 전문적인 수식 구조나
 * 알고리즘이 필요하다면 Math.js를 권합니다.
 */
(() => {

    /**
     * 숫자 형식
     * 
     * 자바스크립트의 숫자 형식 메서드는 모두 숫자가 아니라 문자열을 반환합니다. 해당 형식의 필요한 각종 기호를 온전하게 표현하려면 반드시
     * 문자열이어야 하기 때문입니다(물론 이런 문자열은 쉽게 숫자로 바꿀 수 있습니다). 따라서 숫자 형식을 바꾸는 건 실제로 표시하기 직전에
     * 해야 합니다. 숫자를 저장하거나 계산 할 때는 따로 형식을 지정하지 않은 숫자 타입이어야 합니다.
     */
    {
        /**
         * 고정 소수점
         * 
         * 소수점 뒤 자릿수를 지정하는 형식을 원한다면 toFixed()를 사용합니다.
         */
        {
            console.log('고정 소수점');
            const x = 19.51;
            console.log(x.toFixed(3)); // "19.510"
            console.log(x.toFixed(2)); // "19.51"
            console.log(x.toFixed(1)); // "19.5"
            console.log(x.toFixed(0)); // "20"

            // 이 숫자는 버림(truncation)이 아니라 반올림(round)입니다.
        }

        /**
         * 지수 표기법
         * 
         * 지수 표기법이 필요할 때는 toExponential()을 사용합니다.
         */
        {
            console.log('지수 표기법');
            const x = 3800.5;
            console.log(x.toExponential(4)); // "3.8005e+3"
            console.log(x.toExponential(3)); // "3.801e+3"
            console.log(x.toExponential(2)); // "3.80e+3"
            console.log(x.toExponential(1)); // "3.8e+3"
            console.log(x.toExponential(0)); // "4e+3"

            // toFixed()와 마찬가지로 반올림한 결과가 출력됩니다. 매개변수로 넘긴 정밀도에 따라 소수점 뒤에 숫자가 몇 개 나타날지 정해집니다.
        }

        /**
         * 고정 전체 자리수
         * 
         * 소수점이 어디 나타나든 관계없이 숫자 몇 개로 표현하느냐가 중요하다면 toPrecision()을 사용합니다.
         */
        {
            console.log('고정 전체 자리수');
            let x = 1000;
            console.log(x.toPrecision(5)); // "1000.0"
            console.log(x.toPrecision(4)); // "1000"
            console.log(x.toPrecision(3)); // "1.00e+3"
            console.log(x.toPrecision(2)); // "1.0e+3"
            console.log(x.toPrecision(1)); // "1e+3"
            x = 15.335;
            console.log(x.toPrecision(6)); // "15.3350";
            console.log(x.toPrecision(5)); // "15.335";
            console.log(x.toPrecision(4)); // "15.34";
            console.log(x.toPrecision(3)); // "15.3";
            console.log(x.toPrecision(2)); // "15";
            console.log(x.toPrecision(1)); // "2e+1";

            // 출력 결과는 반올림된 숫자이며 전체 자릿수는 매개변수로 넘긴 자릿수와 일치합니다. 필요할 경우 지수 표기법을 사용합니다.
        }

        /**
         * 다른 진수
         * 
         * 2진수나 8진수, 16진수 표현을 원한다면 toString()에 기수를 매개변수로 쓰면 됩니다.
         */
        {
            console.log('다른 진수');
            const x = 12;
            console.log(x.toString()); // "12" (10진수)
            console.log(x.toString(10)); // "12" (10진수)
            console.log(x.toString(16)); // "c" (16진수)
            console.log(x.toString(8)); // "14" (8진수)
            console.log(x.toString(2)); // "1100" (2진수)
        }

        /**
         * 고급 숫자 형식
         * 
         * 다양한 형식으로 숫자를 표시해야 한다면 자바스크립트 내장 메서드로는 곧 한계에 부딪힙니다. 주로 필요한 경우는 다음과 같습니다.
         *  *수천 자리의 아주 큰 숫자
         *  * 괄호를 쓰는 등, 음수 표현을 다르게 해야 하는 경우
         *  * 공학 표기법(지수 표기법과 비슷합니다.)
         * 실무에서 사용해야 한다면 Numeral.js 라이브러리를 권합니다.
         */
    }

    /**
     * 상수
     * 
     * Math 객체에는 몇 가지 중요한 상수가 프로퍼티로 내장되어 있습니다.
     */
    {
        console.log('상수');

        // 기본적인 상수
        console.log(Math.E); // 자연로그의 밑수(root): ~2.718
        console.log(Math.PI); // 원주율: ~3.142

        // 로그 관련 상수는 Math 객체의 프로퍼티로 호출해도 되지만, 자주 사용한다면 따로 상수에 할당해서 편리하게 사용하는게 좋습니다.
        console.log(Math.LN2); // 2의 자연로그: ~0.693
        console.log(Math.LN10); // 10의 자연로그: ~2.303
        console.log(Math.LOG2E); // Math.E의 밑수가 2인 로그: ~1.433
        console.log(Math.LOG10E); // Math.E의 상용 로그: 0.434

        // 대수 관련 상수
        console.log(Math.SQRT1_2); // 1/2의 제곱근: ~0.707
        console.log(Math.SQRT2); // 2의 제곱근: ~1.414
    }

    /**
     * 대수 함수
     */
    {
        /**
         * 거듭제곱
         * 
         * 제곱 관련 기본 함수는 Math.pow이며 제곱근, 세제곱근, e의 거듭제곱 등 자주 쓰이는 연산에는 간편 함수가 있습니다.
         */
        {
            // 제곱
            console.log(Math.pow(2, 3)); // 8
            console.log(Math.pow(1.7, 2.3)); // ~3.39

            // 제곱근
            console.log(Math.sqrt(16)); // 4
            console.log(Math.sqrt(15.5)); // ~3.94

            // 세제곱근
            console.log(Math.cbrt(27)); // 3
            console.log(Math.cbrt(22)); // ~2.8
        }

        /**
         * 로그 함수
         * 
         * 자연로그 함수는 Math.log입니다. 상용로그를 log, 자연로그를 ln이라고 표현하는 언어도 있으므로 자바스크립트의 log는 자연로그라고
         * 기억해야 합니다. ES6에서는 자주 쓰이는 상용로그 Math.log10함수가 생겼습니다.
         */
        {
            console.log(Math.log(Math.E));
            console.log(Math.log10(10)); // 1
        }

        /**
         * 기타 함수
         */
        {
            // x의 절대값
            console.log(Math.abs(-5.5)); // 5.5
            console.log(Math.abs(5.5)); // 5.5

            // x의 부호, x가 음수면 -1, 양수면 1, 0이면 0 입니다.
            console.log(Math.sign(-10.5)); // -1
            console.log(Math.sign(6.77)); // 1

            // x의 올림, x보다 크거나 같은 정수 중 가장 작은수 
            console.log(Math.ceil(2.2)); // 3
            console.log(Math.ceil(-3.8)); // -3

            // x의 내림, x보다 작거나 같은 정수 중 가장 큰 수
            console.log(Math.floor(2.8)); // 2
            console.log(Math.floor(-3.2)); // -4

            // x의 버림, 소수점 아래 부분을 모두 제거하고 정수 부분만 남긴 수입니다.
            console.log(Math.trunc(7.7)); // 7
            console.log(Math.trunc(-5.8)); // -5

            // x의 반올림
            console.log(Math.round(7.2)); // 7
            console.log(Math.round(7.7)); // 8
            console.log(Math.round(-7.7)); // -8
            console.log(Math.round(-7.2)); // -7

            // 매개변수 중 최소값
            console.log(Math.min(1, 2, 0.5)); // 0.5

            // 매개변수 중 최대값
            console.log(Math.max(1, 2, 0.5)); // 2
        }

        /**
         * 의사 난수 생성
         * 
         * 자바스크립트에서 의사 난수를 생성할 때는 Math.random()을 사용합니다. 이 함수는 0이상 1미만의 숫자를 반환합니다.
         * Math.random()은 0이상 1이만의 범위에 있는 의사 난수를 생성할 뿐, 다른 범위의 의사 난수를 생성하는 간편 메서드는
         * 없습니다. 다음은 다른 범위의 난수가 필요할 때 널리 쓰이는 공식입니다. 여기서 x와 y는 실수, m과 n은 정수입니다.
         */
        {
            // 0이상 1미만
            // Math.random()

            // x이상 y미만
            // x + (y - x) * Math.random()

            // m이상 n미만의 정수
            // m + Math.floor((n - m) * Math.random())

            // m이상 n이하의 정수
            // m + Math.floor((n - m + 1) * Math.random())
        }
    }

})();