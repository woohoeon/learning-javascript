/**
 * chapter8
 */
(() => {

    /**
     * 배열 요소 조작
     */
    // 배열의 처음이나 끝에서 요소 하나를 추가하거나 제거하기
    const arr = ['b', 'c', 'd'];
    arr.push('e'); //  ['b', 'c', 'd', 'e']
    arr.pop(); //  ['b', 'c', 'd']
    arr.unshift('a'); //  ['a', b', 'c', 'd']
    arr.shift(); //  ['b', 'c', 'd']
    console.log(arr.toString());

    // 배열의 끝에 여러 요소 추가하기
    // concat은 제공받은 배열을 한 번만 분해합니다.
    const arr2 = [1, 2, 3];
    arr2.concat(4, 5, 6); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, 5], 6); // [1, 2, 3, 4, 5, 6] arr2는 바뀌지 않습니다. 사본을 반환합니다.
    arr2.concat([4, [5, 6]]); // [1, 2, 3, 4, [5, 6]] arr2는 바뀌지 않습니다. 사본을 반환합니다.

    // 배열 일부 가져오기
    // 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 셉니다.
    const arr3 = [1, 2, 3, 4, 5];
    arr3.slice(3); // [4, 5] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(2, 4); // [3, 4] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(-2); // [4, 5] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(1, -2); // [2, 3] arr3은 바뀌지 않습니다. 사본을 반환합니다.
    arr3.slice(-2, -1); // [4] arr3은 바뀌지 않습니다. 사본을 반환합니다.

    // 임의의 위치에 요소 추가하거나 제거하기
    // 첫번째 매개변수는 수정을 시작할 인덱스이고, 두 번째 매개변수는 제거할 요소 숫자입니다.
    // 아무 요소도 제거하지 않을 때는 0을 넘깁니다.
    const arr4 = [1, 5, 7];
    arr4.splice(1, 0, 2, 3, 4); // arr4은 이제 [1, 2, 3, 4, 5, 7] 입니다.
    arr4.splice(5, 0, 6); // arr4은 이제 [1, 2, 3, 4, 5, 6, 7] 입니다.
    arr4.splice(1, 2); // arr4은 이제 [1, 4, 5, 6, 7] 입니다.
    arr4.splice(2, 1, 'a', 'b'); // arr4은 이제 [1, 4, 'a', 'b', 6, 7] 입니다.
    console.log(arr4.toString());

    // 배열 안에서 요소 교체하기
    // 배열의 요소를 복사해서 다른 위치에 붙여넣고, 기존의 요소를 덮어씁니다.
    // 첫 번째 매개변수는 복사한 요소를 붙여넣을 위치이고, 두 번째 매개변수는 복사를 시작할 위치이고, 세 번째 매개변수는 복사를 끝낼 위치입니다.
    const arr5 = [1, 2, 3, 4];
    arr5.copyWithin(1, 2); // arr5은 이제 [1, 3, 4, 4] 입니다.
    arr5.copyWithin(2, 0, 2); // arr5은 이제 [1, 3, 1, 3] 입니다.
    arr5.copyWithin(0, -3, -1); // arr5은 이제 [3, 1, 1, 3] 입니다.
    console.log(arr5.toString());

    // 특정 값으로 배열 채우기
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

})();