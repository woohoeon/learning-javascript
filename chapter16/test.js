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
    }

})();