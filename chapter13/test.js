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
    }

})();