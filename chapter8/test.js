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

})();