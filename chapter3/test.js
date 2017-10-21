/**
 * 숫자와 문자열
 */
const result1 = 3 + '30'; // 330
const result2 = 3 * '30'; // '30'이 숫자로 바뀝니다. 결과는 숫자 90입니다. 
console.log(result1);
console.log(result2);

// 숫자가 필요할 땐 숫자를 쓰십시오.
// 문자열이 필요할 땐 문자열을 쓰십시오.

/**
 * 심볼
 * 심볼은 항상 유일하며, 객체와 유사합니다.
 */
const RED = Symbol('The color of a sunset!');
const ORANGE = Symbol('The color of a sunset!');
console.log(RED === ORANGE); // false

/**
 * 객체
 */
const obj = {};
obj.color = 'yellow'; // color프로퍼티를 추가합니다.
obj['not an indentifier'] = 3; // 프로퍼티 이름에 유효한 식별자가 아닌 이름 을 쓴다면 계산된 멤버 접근 연산자([])를 써야합니다.
console.log(obj['not an indentifier']);

const SIZE = Symbol();
obj[SIZE] = 8;
console.log(obj[SIZE]);

delete obj.color; // color프로퍼티가 삭제 됐습니다.

/**
 * 데이터 타입 변환
 */
const numStr = '33.3';
const num = Number(numStr); // 숫자 값을 만듭니다. Number 객체의 인스턴스가 아닙니다.
console.log(num);

const c = parseFloat('15.5 kph'); // ' kph'는 무시됩니다.
console.log(c);

const arr = [1, true, 'hello'];
console.log(arr.toString()); // '1, true, hello' 배열의 toString()

/**
 * 객체는 참조타입
 * 객체를 가리키는 변수는 그 객체를 가리키고 있을뿐, 객체 자체는 아닙니다.
 */
let q = { a: 1 };
console.log(q === { a: 1 }); // false

function change_o(o) {
    o.a = 999;
}
let o = { a: 1 };
change_o(o);
console.log(o); // {a: 999}