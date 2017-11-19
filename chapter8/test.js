/**
 * chapter8
 */
(() => {

    /**
     * 배열
     */

    /**
     * 배열의 처음이나 끝에서 요소 하나를 추가하거나 제거하기
     */
    const arr = ['b', 'c', 'd'];
    arr.push('e'); //  ['b', 'c', 'd', 'e']
    arr.pop(); //  ['b', 'c', 'd']
    arr.unshift('a'); //  ['a', b', 'c', 'd']
    arr.shift(); //  ['b', 'c', 'd']
    console.log(arr.toString());

    /**
     * 배열의 끝에 여러 요소 추가하기
     */
    // concat은 제공받은 배열을 한 번만 분해합니다.
    const arr2 = [1, 2, 3];
    arr2.concat(4, 5, 6); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, 5], 6); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, [5, 6]]); // [1, 2, 3, 4, [5, 6]] arr2는 바뀌지 않습니다. 사본을 반환합니다.

    /**
     * 배열 일부 가져오기
     */
    // 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 셉니다.
    const arr3 = [1, 2, 3, 4, 5];
    arr3.slice(3); // [4, 5] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(2, 4); // [3, 4] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(-2); // [4, 5] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(1, -2); // [2, 3] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(-2, -1); // [4] arr3은 바뀌지 않습니다. 사본을 반환합니다.

    /**
     * 임의의 위치에 요소 추가하거나 제거하기
     */
    // 첫번째 매개변수는 수정을 시작할 인덱스이고, 두 번째 매개변수는 제거할 요소 숫자입니다.
    // 아무 요소도 제거하지 않을 때는 0을 넘깁니다.
    const arr4 = [1, 5, 7];
    arr4.splice(1, 0, 2, 3, 4); // arr4은 이제 [1, 2, 3, 4, 5, 7] 입니다.
    arr4.splice(5, 0, 6); // arr4은 이제 [1, 2, 3, 4, 5, 6, 7] 입니다.
    arr4.splice(1, 2); // arr4은 이제 [1, 4, 5, 6, 7] 입니다.
    arr4.splice(2, 1, 'a', 'b'); // arr4은 이제 [1, 4, 'a', 'b', 6, 7] 입니다.
    console.log(arr4.toString());

    /**
     * 배열 안에서 요소 교체하기
     */
    // 배열의 요소를 복사해서 다른 위치에 붙여넣고, 기존의 요소를 덮어씁니다.
    // 첫 번째 매개변수는 복사한 요소를 붙여넣을 위치이고, 두 번째 매개변수는 복사를 시작할 위치이고, 세 번째 매개변수는 복사를 끝낼 위치입니다.
    const arr5 = [1, 2, 3, 4];
    arr5.copyWithin(1, 2); // arr5은 이제 [1, 3, 4, 4] 입니다.
    arr5.copyWithin(2, 0, 2); // arr5은 이제 [1, 3, 1, 3] 입니다.
    arr5.copyWithin(0, -3, -1); // arr5은 이제 [3, 1, 1, 3] 입니다.
    console.log(arr5.toString());

    /**
     * 특정 값으로 배열 채우기
     */
    // 정해진 값으로 배열을 채웁니다.
    const arr6 = new Array(5).fill(1);
    arr6.fill('a'); // arr6은 이제 ['a', 'a', 'a', 'a', 'a'] 입니다.
    arr6.fill('b', 1); // arr6은 이제 ['a', 'b', 'b', 'b', 'b'] 입니다.
    arr6.fill('c', 2, 4); // arr6은 이제 ['a', 'b', 'c', 'c', 'b'] 입니다.
    arr6.fill(5.5, -4); // arr6은 이제 ['a', 5.5, 5.5, 5.5, 5.5] 입니다.
    arr6.fill(0, -3, -1); // arr6은 이제 ['a', 5.5, 0, 0, 5.5] 입니다.
    console.log(arr6.toString());

    /**
     * 배열 정렬과 역순 정렬
     */
    // 배열 요소의 순서를 반대로 바꿉니다.
    const arr7 = [1, 2, 3, 4, 5];
    arr7.reverse();
    console.log(arr7.toString());

    // 배열의 순서를 정렬합니다.
    const arr8 = [5, 4, 3, 2, 1];
    arr8.sort();
    console.log(arr8.toString());

    // 정렬 함수를 사용하면 객체가 들어있는 배열을 정렬할 수 있습니다.
    const arr9 = [
        { name: 'Suzanne' },
        { name: 'Jim' },
        { name: 'Trevor' },
        { name: 'Amanda' }
    ];
    arr9.sort((a, b) => a.name > b.name); // 알파벳 순으로 정렬됩니다.
    console.log(arr9);
    arr9.sort((a, b) => a.name[1] < b.name[1]); // name 프로퍼티의 두 번째 글자의 알파벳 역순으로 정렬됩니다.
    console.log(arr9);

    /**
     * 배열 검색
     */
    // 배열의 일부분만 검색하려면 시작 인덱스를 지정할 수 있습니다.
    // 일치하는 것을 찾지 못하면 -1을 반환합니다.
    const o = { name: 'Jerry' };
    const arr10 = [1, 5, 'a', o, true, 5, [1, 2], '9'];
    arr10.indexOf({ name: 'Jerry' }); // -1
    arr10.indexOf(o); // 3
    arr10.indexOf('a', 5); // -1
    arr10.indexOf(5, 5); // 5
    arr10.lastIndexOf(5, 4); // 1
    arr10.lastIndexOf(true, 3); // -1

    // findIndex는 보조 함수를 써서 검색 조건을 지정할 수 있습니다.
    // 검색을 시작할 인덱스를 지정할 수는 없습니다.
    const arr11 = [{ id: 5, name: 'Judith' }, { id: 7, name: 'Francis' }];
    arr11.findIndex(o => o.id === 5);
    console.log(arr11.findIndex(o => o.id === 5));
    arr11.findIndex(o => o.name === 'Francis');
    console.log(arr11.findIndex(o => o.name === 'Francis'));
    arr11.findIndex(o => o.id === 17);
    console.log(arr11.findIndex(o => o.id === 17));

    // 조건의 맞는 요소의 인덱스가 아니라 요소 자체를 원할 때는 find를 사용합니다.
    arr11.find(o => o.id === 5);
    console.log(arr11.find(o => o.id === 5)); // { id: 5, name: 'Judith' }
    arr11.find(o => o.id === 2);
    console.log(arr11.find(o => o.id === 2)); // undefined

    // find와 findIndex에 전달하는 함수는 배열의 각 요소를 첫 번째 매개변수로 받고, 현재 요소의 인덱스와 배열 자체도 매개변수로 받습니다.
    // 예를 들어, 특정 인덱스보다 뒤에 있는 제곱수를 찾아야 한다고 합시다.
    const arr12 = [1, 17, 16, 5, 4, 16, 10, 3, 49];
    arr12.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)));
    console.log(arr12.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x))));

    // find와 findIndex에 전달 하는 함수의 this도 수정할 수 있습니다.
    class Person {
        constructor(name) {
            this.name = name;
            this.id = Person.nextId++;
        }
    }
    Person.nextId = 0;

    const jamie = new Person('Jamie'),
        juliet = new Person('Juliet'),
        peter = new Person('Peter'),
        jay = new Person('Jay');

    const arr13 = [jamie, juliet, peter, jay];

    // 옵션 1: ID를 직접 비교하는 방법
    arr13.find(p => p.id === juliet.id);
    console.log(arr13.find(p => p.id === juliet.id));

    // 옵션 2: 'this' 매개변수를 이용하는 방법
    arr13.find(function (p) {
        return p.id === this.id;
    }, juliet);
    console.log(arr13.find(function (p) {
        return p.id === this.id;
    }, juliet));

    // 간혹 조건을 만족하는 요소의 인덱스도, 요소 자체도 필요 없고, 조건을 만족하는 요소가 있는지 없는지만 알면 충분할 때가 있습니다.
    // 이럴 때 쓰라고 만든 some과 every 메서드가 있습니다.
    // some은 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true를 반환하며, 찾지 못하면 false를 반환합니다.
    const arr14 = [5, 7, 12, 15, 17];
    arr14.some(x => x % 2 === 0); // ture;
    console.log(arr14.some(x => x % 2 === 0));
    arr14.some(x => Number.isInteger(Math.sqrt(x)));
    console.log(arr14.some(x => Number.isInteger(Math.sqrt(x))));

    // every는 배열의 모든 요소가 조건에 맞아야 true를 반환하며 그렇지 않다면 false를 반환합니다.
    // every는 조건에 맞지 않는 요소를 찾아야만 검색을 멈추고 false를 반환합니다. 조건에 맞지않는 요소를 찾아내지 못하면 배열 전체를 검색합니다.
    const arr15 = [4, 6, 16, 36];
    arr15.every(x => x % 2 === 0);
    console.log(arr15.every(x => x % 2 === 0));
    arr15.every(x => Number.isInteger(Math.sqrt(x)));
    console.log(arr15.every(x => Number.isInteger(Math.sqrt(x))));

    /**
     * map과 filter
     */
    // 일정한 형식의 배열을 다른 형식으로 바꿔야 한다면 map을 쓰십시오.
    // map과 filter는 모두 사본을 반환하며 원래 배열은 바뀌지 않습니다.
    const cart = [{ name: 'Widget', price: 9.95 }, { name: 'Gadget', price: 22.95 }];

    const names = cart.map(x => x.name);
    console.log(names);

    const prices = cart.map(x => x.price);
    console.log(prices);

    const discountPrices = prices.map(x => x * 0.8);
    console.log(discountPrices);

    // 콜백 함수는 각 요소에서 호출될 때 요소 자체와 요소 인덱스, 배열 전체를 매개변수로 받습니다.
    // 두 배열의 상품과 가격에 따로 저장되어 있는데, 이 둘을 객체로 결합해 봅시다.
    const items = ['Widget', 'Gadget'];
    const prices2 = [9.95, 22.95];
    const cart2 = items.map((x, i) => ({ name: x, price: prices2[i] })); // ()로 감싸서 객체 리터럴의 중괄호를 블록으로 판단하지 않게 합니다.
    console.log(cart2);

    // filter는 배열에서 필요한 것들만 남깁니다.
    const cards = [];
    for (let suit of ['H', 'C', 'D', 'S'])
        for (let value = 1; value <= 13; value++)
            cards.push({ suit, value });

    console.log(cards);

    cards.filter(c => c.value === 2);
    console.log(cards.filter(c => c.value === 2));

    /**
     * reduce
     */
    // reduce는 콜백 함수를 받습니다. 콜백에서 첫 번째 매개변수는 항상 현재 배열 요소였지만, reduce는 다릅니다.
    // reduce가 받는 첫번째 매개변수는 배열이 줄어드는 대상인 어큐뮬레이터(accumulator) 입니다. 
    // 두 번째 매개변수부터는 콜백의 순서대로 현재 배열 요소, 현재 인덱스, 배열 자체입니다.
    const arr16 = [5, 7, 2, 4];
    const sum = arr16.reduce((a, x) => a += x, 0);
    console.log(sum);
    // a에 값을 할당할 필요는 없습니다.
    // 함수에서 중요한 건 무엇을 반환하는가 이므로 그냥 a+x를 반환해도 됐을 겁니다.
    // 하지만 reduce를 더 잘 활용하려면 누적값이 어떻게 변하는지 생각하는 습관을 기르는게 좋습니다.

    // reduce는 보통 숫자나 문자열 같은 원시 값을 누적값으로 사용하지만, 객체 또한 누적값이 될 수 있습니다.
    const words = ['Beachball', 'Rodeo', 'Angel', 'Aardvark', 'Xylophone', 'November', 'Chocolate', 'Papay', 'Uniform', 'Joker', 'Clover', 'Bali'];
    const alphabetical = words.reduce((a, x) => {
        if (!a[x[0]]) a[x[0]] = [];
        a[x[0]].push(x);
        return a;
    }, {});
    console.log(alphabetical); // {B: ["Beachball", "Bali"], R: ["Rodeo"], A: ["Angel", "Aardvark"], X: ["Xylophone"], N: ["November"], …}

    // reduce는 통계에서도 사용할 수 있습니다. 예를 들어 데이터 셋의 평균(mean)과 분산(variance)을 계산 한다고 해 봅시다.
    const data = [3, 3, 5, 7.2, 12, 4, 6, 10.3];
    // 도널드 커누스가 분산 계산을 위해 만든 알고리즘입니다.
    const stats = data.reduce((a, x) => {
        a.N++;
        let delta = x - a.mean;
        a.mean += delta / a.N;
        a.M2 += delta * (x - a.mean);
        return a;
    }, { N: 0, mean: 0, M2: 0 });
    if (stats.N > 2) {
        stats.variance = stats.M2 / (stats.N - 1);
        stats.stdev = Math.sqrt(stats.variance);
    }
    console.log(stats); // {N: 8, mean: 6.3125, M2: 78.14875, variance: 11.164107142857144, stdev: 3.3412732816782804}

    // reduce의 유연성을 알아보기 위해 한 가지 예제를 더 살펴보겠습니다. 예제 자체는 매우 조악하지만, 이번예는 문자열을 누적값으로 사용합니다.
    // trim() 메소드는 양끝의 공백을 제거한 문자열을 반환합니다. trim()은 그 문자열 자체 값에는 영향을 끼치지 않습니다. 
    const longWords = words.reduce((a, w) => w.length > 6 ? a + ' ' + w : a, '').trim();
    console.log(longWords);

    // reduce 대신 fileter와 join을 써써 같은 결과를 얻을 수 있습니다.
    const longWord2 = words.filter(x => x.length > 6).join(' ');
    console.log(longWord2);

    /**
     * 삭제되거나 정의되지 않은 요소들
     */
    // map과 filter, reduce는 삭제되거나 정의되지 않은 요소들에서 콜백 함수를 호출하지 않습니다.
    const arr17 = [1, 2, 3, 4, 5];
    delete arr17[2];
    const nArr17 = arr17.reduce((a, x) => {
        if (!a) a = [];
        a.push(x);
        return a;
    }, []);
    console.log(nArr17); // [1, 2, 4, 5]
    // 의도적으로 배열안에 빈 부분을 만든다 하더라도 배열에 delete를 쓰지는 않을 테니 현실적으로는 이런 동작이 문제를 일으킬 가능성은 거의 없습니다.

    /**
     * 문자열 병합
     */
    {
        // Array.prototype.join은 매개변수로 구분자 하나를 받고 요소들을 하나로 합친 문자열을 반환합니다.
        // 매개변수의 기본값은 쉼표이며, 정의되지 않은 요소, 삭제된 요소, null, undefined는 모두 빈 문자열로 취급합니다.
        const arr = [1, null, 'hello', 'world', true, undefined];
        delete arr[3];
        arr.join(); // 1,,hello,,true,
        console.log(arr.join());
        arr.join(''); // 1hellotrue
        console.log(arr.join(''));
        arr.join(' -- '); // 1 --  -- hello --  -- true -- 
        console.log(arr.join(' -- '));

        // 문자열 병합과 Array.prototype.join을 함께 쓰면 HTML<ul>리스트 같은 것도 만들 수 있습니다.
        const attributes = ['Nimble', 'Perceptive', 'Generous'];
        const html = '<ul><li>' + attributes.join('</li><li>') + '</li></ul>';
        console.log(html); // <ul><li>Nimble</li><li>Perceptive</li><li>Generous</li></ul>
    }

    /**
     * 요약
     * 
     * 배열 함수의 매개변수(순서대로)
     * --------------------------------------------------------------
     * 매서드              | 설명
     * --------------------------------------------------------------
     * reduce에만 적용 | 누적값, 초깃값 또는 마지막 호출에서 반환하는 값
     * 모든 메서드        | 요소(현재 요소의 값)
     * 모든 메서드        | 현재 요소의 인덱스
     * 모든 메서드        | 배열 자체(그다지 쓸모는 없음)
     * --------------------------------------------------------------
     * 콜백을 받는 메서드들은 또한 옵션으로 콜백을 호출할 때 this로 사용할 값을 받을 수 있습니다.
     * 이 매개변수를 활용하면 콜백 함수를 메서드처럼 사용 할 수 있습니다.
     * 
     * 배열 콘텐츠 조작
     * --------------------------------------------------------------
     * 하고 싶은 일 | 사용할 메서드 | 수정 또는 사본
     * --------------------------------------------------------------
     * 스택(후입 선출)을 만들 때 | push(바뀐 길이 반환), pop | 배열수정
     * 큐(선입 선출)를 만들 때 | unshift(바뀐 길이 반환), shift | 배열수정
     * 여러 요소를 배열 마지막에 추가할 때 | const | 사본반환
     * 배열 일부가 필요할 때 | slice | 사본반환    
     * 임의의 위치에 요소를 추가하거나 제거할 때 | splice | 배열수정
     * 배열 안에서 요소를 교체할 때 | copyWithin | 배열수정
     * 배열을 채울 때 | fill | 배열수정
     * 배열을 반대로 정렬할 때 | reverse | 배열수정
     * 배열을 정렬할 때 | sort(정렬 함수 사용 가능) | 배열수정
     * --------------------------------------------------------------
     * 
     * 배열 검색
     * --------------------------------------------------------------
     * 찾고자 하는 것 | 사용할 메서드
     * --------------------------------------------------------------
     * 요소의 인덱스 | indexOf(단순한 값), findIndex(복잡한 값)
     * 인덱스 뒤에서부터 찾을 때 | lastIndexOf(단순한 값)
     * 요소 자체 | find
     * 조건을 만족하는 요소가 들어있는지 확인할 때 | some
     * 모든 요소가 그 조건을 만족하는지 확인할 때 | every
     * --------------------------------------------------------------
     * 
     * 배열변형
     * --------------------------------------------------------------
     * 하고 싶은 일 | 사용할 메서드 | 수정 또는 사본
     * --------------------------------------------------------------
     * 배열의 모든 요소를 변형할 때 | map | 사본반환
     * 조건에 맞는 요소만 남길 때 | filter | 사본반환
     * 배열 전체를 다른 데이터 타입으로 변형할 때 | reduce | 사본반환
     * 요소를 문자열로 바꿔서 하나로 합칠 때 | join | 사본반환
     * --------------------------------------------------------------
     */


})();