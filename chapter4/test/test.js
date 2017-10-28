/**
 * for 루프의 다른 패턴
 */
(() => {

    /**
     * 피보나치 수열의 숫자중 처음 여덟개를 출력합니다.
     */
    for (let temp, i = 0, j = 1; j < 50; temp = i, i = j, j = i + temp)
        console.log(j);

    /**
     * 어떤 표현식이든 쓸 수 있습니다.
     */
    let s = '3';
    for (; s.length < 10; s = ' ' + s)
        console.log(s);
})();