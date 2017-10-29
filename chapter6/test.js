/**
 * chapter6
 */
(() => {

    /**
     * 매개변수 해체
     */
    function getSentence({ subject, verb, object }) {
        return `${subject} ${verb} ${object}`;
    }

    const o = {
        subject: 'I',
        verb: 'love',
        object: 'Javascript'
    };

    console.log(getSentence(o));

    // 배열 역시 해체할 수 있습니다.
    function getSentence2([subject, verb, object]) {
        return `${subject} ${verb} ${object}`;
    }

    const arr = ['I', 'love', 'Javascript'];

    console.log(getSentence2(arr));

    // 확산 연산자(...)를 써서 남는 매개변수를 이용할 수 있습니다.
    // 함수를 선언할 때 확산 연산자는 반드시 마지막 매개변수여야 합니다.
    function addPrefix(prefix, ...words) {
        const prefixedWords = [];
        for (let i = 0; i < words.length; i++) {
            prefixedWords[i] = prefix + words[i];
        }
        return prefixedWords;
    }

    console.log(addPrefix('con', 'verse', 'vex'));

    /**
     * 매개변수 기본값
     */
    function f(a, b = 'default', c = 3) {
        return `${a} - ${b} - ${c}`;
    }

    console.log(f(5, 6, 7));
    console.log(f(5, 6));
    console.log(f(5));
    console.log(f());

    /**
     * 객체의 프로퍼티인 함수
     */
    // 객체 리터럴에도 메서드를 추가할 수 있습니다.
    const o2 = {
        name: 'Wallace',
        bark: function () { return 'Woof!'; }
    };

    console.log(o2.bark());

    // 위와 동일 합니다.
    const o3 = {
        name: 'Wallace',
        bark() { return 'Woof!'; }
    };

    console.log(o3.bark());

    /**
     * this 키워드
     */
    // 일반적으로 this는 객체의 프로퍼티인 함수에서 의미가 있습니다.
    // 메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 됩니다.
    const o4 = {
        name: 'Wallace',
        speak() { return `My name is ${this.name}!`; }
    };

    console.log(o4.speak());

    // 메서드 안에서 보조 함수를 쓸경우 다른 변수에 this를 할당해서 문제를 해결 할 수 있습니다.
    const o5 = {
        name: 'Julie',
        greetBackwards: function () {
            const self = this;
            function getReverseName() {
                let nameBackwards = '';
                for (let i = self.name.length - 1; i >= 0; i--) {
                    nameBackwards += self.name[i];
                }
                return nameBackwards;
            }
            return `${getReverseName()} si eman ym ,olleH`;
        }
    };

    console.log(o5.greetBackwards());

    /**
     * 함수 표현식과 익명 함수
     */
    // 재귀를 사용하여 내부 함수를 호출 합니다.
    let recursionCount = 10;
    const g = function f(stop) {
        if (stop) console.log('f stopped');
        if (recursionCount-- > 0) f(true);
    };

    g(false);

    /**
     * 화살표 표기법
     */
    // 화살표 함수에는 일반적인 함수와 중요한 차이가 있습니다. this가 다른 변수와 마찬가지로, 정적으로 묶인다는 겁니다.
    const o6 = {
        name: 'Julie',
        greetBackwards: function () {
            const getReverseName = () => {
                let nameBackwards = '';
                for (let i = this.name.length - 1; i >= 0; i--) {
                    nameBackwards += this.name[i];
                }
                return nameBackwards;
            };
            return `${getReverseName()} si eman ym ,olleH`;
        }
    };

    console.log(o6.greetBackwards());

    /**
     * call과 apply, bind
     */
    // 일반적인 방법 외에도, 함수를 어디서, 어떻게 호출 했느냐와 관계없이 this가 무엇인지 지정할 수 있습니다.
    // call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 값으로 지정할 수 있습니다.
    const bruce = { name: 'Bruce' };
    const madeline = { name: 'Madeline' };

    // 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용합니다.
    function greet() {
        return `Hello, I'm ${this.name}!`;
    }

    console.log(greet());
    console.log(greet.call(bruce));
    console.log(greet.call(madeline));

    // call위 첫 번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있으면 그 매개변수는 호출하는 함수로 전달 됩니다.
    function update(birthYear, occupation) {
        this.brithYear = birthYear;
        this.occupation = occupation;
    }

    update.call(bruce, 1949, 'singer');
    update.call(madeline, 1942, 'actress');

    console.log(bruce);
    console.log(madeline);

    // apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같습니다.
    // apply는 매개변수를 배열로 받습니다.
    update.apply(bruce, [1955, 'actor']);
    update.apply(madeline, [1918, 'writer']);

    console.log(bruce);
    console.log(madeline);

    // apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용합니다.
    // 배열의 최소값과 최댓값을 구합니다.
    const arr2 = [2, 3, -5, 15, 7];

    console.log(Math.min.apply(null, arr2));
    console.log(Math.max.apply(null, arr2));

    // 확산 연산자(...)를 사용해도 같은 결과를 얻을 수 있습니다.
    // update 메서드는 this 값이 중요하므로 call을 사용해야 하지만 Math.min과 Math.max는 this
    // 값이 무엇이든 관계없으므로 확산 연산자를 그대로 사용할 수 있습니다.
    const newBruce = [1940, 'martial aritist'];
    update.call(bruce, ...newBruce);

    console.log(bruce);
    console.log(Math.min(...arr2));
    console.log(Math.max(...arr2));

    // this의 값을 바꿀 수 있는 함수는 bind입니다. bind는 함수의 this값을 영구히 바꿉니다.
    const updateBruce = update.bind(bruce);

    updateBruce(1904, 'actor');

    console.log(bruce);

    updateBruce.call(madeline, 1274, 'king'); // {name: "Bruce", brithYear: 1274, occupation: "king"}

    console.log(bruce); // madeline은 변화지 않았습니다.

    // bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있습니다.
    // bruce가 태어난 해를 항상 1949로 고정하지만, 직업은 자유롭게 바꿀 수 있는 업데이트 함수를 만듭니다.
    const updateBruce1949 = update.bind(bruce, 1949);

    updateBruce1949('singer, songwriter');

    console.log(bruce);

})();