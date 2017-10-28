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
    const f = function () {
        
    }

})();