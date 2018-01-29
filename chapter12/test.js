/**
 * Chapter12
 * 
 * 이터레이터와 제너레이터
 */
(() => {

    /**
     * ES6에서는 매우 중요한 새로운 개념 이터레이터(iterator)와 제너레이터(generator)를 도입했습니다. 제너레이터는 이터레이터에 의존하는
     * 개념입니다.
     * 
     * 이터레이터는 '지금 어디 있는지' 파악할 수 있도록 돕는다는 면에서 일종의 책갈피와 비슷한 개념입니다. 배열은 어터러블 객체의 좋은 예입니다.
     * 책에 여러 페이지가 있는 것처럼 배열에는 여러 요소가 들어 있으므로, 책에 책갈피를 끼울 수 있듯 배열에는 이터레이터를 사용 할 수 있습니다.
     * book이란 배열이 있고, 이 배열의 각 요소는 책의 한 페이지를 나타내는 문자열이라고 합시다.
     */
    {
        const book = [
            "Twinkle, twinkle, little bat!",
            "How I wonder what you're at!",
            "Up above the world you fly,",
            "Like a tea tray in the sky.",
            "Twinkle, twinkle, little bat!",
            "How I wonder what you're at!"
        ];

        // 이제 book 배열에 values 메서드를 써서 이터레이터를 만들 수 있습니다.
        const it = book.values();

        // 이터레이터(보통 it라고 줄여 씁니다)는 책갈피지만, 이 책에만 사용할 수 있습니다. 그리고 아직은 책갈피를 꽂을 수 없습니다. 읽지 않았으니까요.
        // '읽기 시작'하려면 이터레이터의 next 메서드를 호출합니다. 이 메서드가 반환하는 객체에는 value 프로퍼티(지금 보이는 페이지)와 done 프로퍼티
        // (마지막 페이지를 읽으면 true로 바뀌는)가 있습니다.

        console.log(it.next()); // {done: false, value: "Twinkle, twinkle, little bat!"}
        console.log(it.next()); // {done: false, value: "How I wonder what you're at!"}
        console.log(it.next()); // {done: false, value: "Up above the world you fly,"}
        console.log(it.next()); // {done: false, value: "Like a tea tray in the sky."}
        console.log(it.next()); // {done: false, value: "Twinkle, twinkle, little bat!"}
        console.log(it.next()); // {done: false, value: "How I wonder what you're at!"}
        console.log(it.next()); // {done: true, value: undefined}
        console.log(it.next()); // {done: true, value: undefined}
        console.log(it.next()); // {done: true, value: undefined}

        // 더 진행할 것이 없으면 value는 undefined가 되지만, next는 계속 호출할 수 있습니다. 물론 그렇다고 결과가 바뀌는 건 아닙니다.
        // 일단 이터레이터가 끝까지 진행하면 뒤로 돌아가서 다른 데이터를 제공할 수는 없습니다.

        // it.next()를 호출하는 중간에 다른 일을 할 수 있습니다.
        // 이 배열의 요소를 나열하는 것이 목적이라면 for 루프나 for...of 루프를 쓸 수 있습니다. for루프의 원리는 간단합니다. 배열 요소의 인덱스는 숫자형이고
        // 순차적이므로 인덱스 변수를 써서 해당하는 배열 요소에 접근할 수 있습니다. 하지만 for...of 루프는 이터레이터를 사용합니다.
        // 이터레이터와 while 루프를 사용해서 for...of 루프를 흉내 내 봅시다.
        const itt = book.values();
        let current = itt.next();
        while (!current.done) {
            console.log(current.value);
            current = itt.next();
        }

        // 이터레이터는 모두 독립적입니다. 즉, 새 이터레이터를 만들 때마다 처음에서 시작합니다. 그리고 각각 다른 요소를 가리키는 이터레이터 여러 개를 동시에
        // 사용할 수도 있습니다.
        const it1 = book.values();
        const it2 = book.values();
        // 어느 이터레이터도 아직 시작하지 않았습니다.

        // it1으로 두 페이지를 읽습니다.
        console.log(it1.next()); // {done: false, value: "Twinkle, twinkle, little bat!"}
        console.log(it1.next()); // {done: false, value: "How I wonder what you're at!"}

        // it2로 한 페이지를 읽습니다.
        console.log(it2.next()); // {done: false, value: "Twinkle, twinkle, little bat!"}

        // it1으로 한 페이지를 더 읽습니다.
        console.log(it1.next()); // {done: false, value: "Up above the world you fly,"}
        // 두 이터레이터가 서로 독립적이며 같은 배열에서 따로따로 움직일 수 있음을 보여줍니다.
    }

    /**
     * 이터레이션 프로토콜
     * 
     * 이터레이터는 그 자체로 크게 쓸모가 있다기보다는, 더 쓸모 있는 동작이 가능해지도록 한다는데 의미가 있습니다. 이터레이터 프로토콜은 모든 객체를
     * 이터러블(iterable) 객체로 바꿀 수 있습니다. 메시지에 타임스탬프를 붙이는 로그 클래스가 필요하다고 생각해 봅시다. 내적으로 타임스탬프가 붙은
     * 메시지는 배열에 저장합니다.
     */
    {
        class Log {
            constructor() {
                this.messages = [];
            }
            add(message) {
                this.messages.push({ message, timestamp: Date.now() });
            }
        }

        // 지금까지는 좋습니다만, 로그를 기록한 항목을 순회(iterate)하고 싶다면 어떻게 해야 할까요?
        // 물론 log.messages에 접근할 수는 있지만, log를 배열을 조작하듯 할 수 있다면 더 좋을 겁니다.
        // 이터레이션 프로토콜을 사용하면 가능합니다. 이터레이션 프로토콜은 클래스에 심볼 메서드 Symbol.iterator가 있고 이 메서드가 이터레이터처럼
        // 동작하는 객체, 즉 value와 done 프로퍼티가 있는 객체를 반환하는 next 메서드를 가진 객체를 반환한다면 그 클래스의 인스턴스는 이터러블 객체 라는
        // 뜻입니다. Log 클래스에 Symbol.iterator 메서드를 추가합시다.
        {
            class Log {
                constructor() {
                    this.messages = [];
                }
                add(message) {
                    this.messages.push({ message, timestamp: Date.now() });
                }
                [Symbol.iterator]() {
                    return this.messages.values();
                }
            }

            // 이제 Log 인스턴스를 배열처럼 순회할 수 있습니다.
            const log = new Log();
            log.add('first day at sea');
            log.add('spotted whale');
            log.add('spotted another vessel');

            // 로그를 배열처럼 순회합니다.
            for (let entry of log) {
                console.log(`${entry.message} @ ${entry.timestamp}`);
            }
        }

        // 위 예제에서는 messages 배열에서 이터레이터를 가져와 이터레이터 프로토콜을 구현했지만, 다음과 같이 직접 이터레이터를 만들 수도 있습니다.
        {
            class Log {
                constructor() {
                    this.messages = [];
                }
                add(message) {
                    this.messages.push({ message, timestamp: Date.now() });
                }
                [Symbol.iterator]() {
                    let i = 0;
                    const messages = this.messages;
                    return {
                        next() {
                            if (i > messages.length)
                                return { value: undefined, done: true };
                            return { value: messages[i++], done: false };
                        }
                    };
                }
            }

            // 이제 Log 인스턴스를 배열처럼 순회할 수 있습니다.
            const log = new Log();
            log.add('first day at sea');
            log.add('spotted whale');
            log.add('spotted another vessel');

            // 로그를 배열처럼 순회합니다.
            for (let entry of log) {
                if (entry) console.log(`${entry.message} @ ${entry.timestamp}`);
            }
        }

        // 이터레이터는 무한한 데이터에도 사용할 수 있습니다.
        // 피보나치 수열을 만들어봅시다. 피보나치 수열은 무한히 계속되고, 프로그램에서는 몇 번째 숫자까지 계산해야 할지 알 수 없으므로 이터레이터를
        // 사용하기에 알맞습니다. 이 예제에서는 이터레이터가 done에서 절대 true를 반환하지 않는다는 것뿐입니다.
        {
            class FibonacchiSequence {
                [Symbol.iterator]() {
                    let a = 0, b = 1;
                    return {
                        next() {
                            let rval = { value: b, done: false };
                            b += a;
                            a = rval.value;
                            return rval;
                        }
                    };
                }
            }

            // for...of 루프로 FibonacchiSequence 인스턴스를 계산하면 무한 루프에 빠집니다. 피보나치 수열은 무한이니까요. 무한 루프에 빠지지 않도록,
            // 10회 계산한 뒤 break 문으로 빠져나옵시다.
            const fib = new FibonacchiSequence();
            let i = 0;
            for (let n of fib) {
                console.log(n);
                if (++i > 9) break;
            }
        }
    }

    /**
     * 제너레이터
     * 
     * 제너레이터(generator)란 이터레이터를 사용해 자신의 실행을 제어하는 함수입니다. 일반적인 함수는 매개변수를 받고 값을 반환하지만, 호출자는
     * 매개변수 외에는 실행을 제어할 방법이 전혀 없습니다. 함수를 호출하면 그 함수가 종료될 때까지 제어권을 완전히 넘기는 겁니다. 제너레이터에서는 그렇지
     * 않습니다.
     * 
     * 제너레이터는 두 가지 새로운 개념을 도입했습니다. 하나는 함수의 실행을 개별적 단계로 나눔으로써 함수의 실행을 제어한다는 것입니다. 다른 하나는 실행
     * 중인 함수와 통신한다는 것 입니다.
     * 제너레이터는 두 가지 예외를 제외하면 일반적인 함수와 같습니다.
     * * 제너레이터는 언제든 호출자에게 제어권을 넘길(yield)수 있습니다.
     * * 제너레이터는 호출한 즉시 실행되지는 않습니다. 대신 이터레이터를 반환하고, 이터레이터의 next 메서드를 호출함에 따라 실행됩니다.
     * 
     * 제너레이터를 만들 때는 function 키워드 뒤에 애스터리스크(*)를 붙입니다. 이것을 제외하면 문법은 일반적인 함수와 같습니다. 제너레이터에서는 return
     * 외에 yield 키워드를 쓸 수 있습니다.
     */
    {
        // 무지개 색깔을 반환하는 단순한 제너레이터 예제를 하나 만들어 봅시다.
        function* rainbow() { // * 기호는 제너레이터 문법입니다.
            yield 'red';
            yield 'orange';
            yield 'yellow';
            yield 'green';
            yield 'blue';
            yield 'indigo';
            yield 'violet';
        }

        // 이제 이 제너레이터를 어떻게 호출하는지 알아봅시다. 제너레이터를 호출하면 이터레이터를 얻습니다. 함수를 호출한 다음 이터레이터를 써서 진행합니다.
        const it = rainbow();
        console.log(it.next()); // {done: false, value: "red"}
        console.log(it.next()); // {done: false, value: "orange"}
        console.log(it.next()); // {done: false, value: "yellow"}
        console.log(it.next()); // {done: false, value: "green"}
        console.log(it.next()); // {done: false, value: "blue"}
        console.log(it.next()); // {done: false, value: "indigo"}
        console.log(it.next()); // {done: false, value: "violet"}
        console.log(it.next()); // {done: true, value: undefined}

        // rainbow 제너레이터는 이터레이터를 반환하므로 for...of 루프에서 쓸 수 있습니다.
        for (let color of rainbow()) {
            console.log(color);
        }

        // 이 코드를 실행하면 무지개의 색깔이 모두 콘솔에 기록됩니다.

        /**
         * yield 표현식과 양방향 통신
         * 
         * 제너레이터와 호출자 사이에서 양방향 통신이 가능하다는 것은 이미 언급했습니다. 통신은 yield 표현식을 통해 이뤄집니다. 표현식은 값으로 평가되고
         * yield는 표현식이므로 반드시 어떤 값으로 평가됩니다. yield 표현식의 값은 호출자가 제너레이터의 이터레이터에서 next를 호출할 때 제공하는 매개변수
         * 입니다. 대화를 이어가는 제너레이터를 만들어 봅시다.
         */
        {
            function* interrogate() {
                const name = yield 'What is your name?';
                const color = yield 'What is your favorite color?';
                return `${name}'s favorite color is ${color}.`;
            }

            // 이 제너레이터를 호출하면 이터레이터를 얻습니다. 그리고 제너레이터의 어떤 부분도 아직 실행하지 않은 상태입니다. next를 호출하면 제너레이터는
            // 첫 번째 행을 실행하려 합니다. 하지만 그 행에는 yield 표현식이 들어 있으므로 제너레이터는 반드시 제어권을 호출자에게 넘겨야 합니다. 제너레이터의
            // 첫 번째 행이 완료(resolve)되려면 호출자가 next를 다시 호출해야 합니다. 그러면 name은 next에서 전달하는 값을 받습니다.
            const it = interrogate();
            console.log(it.next()); // {done: false, value: "What is your name?"}
            console.log(it.next('Ethan')); // {done: false, value: "What is your favorite color?"}
            console.log(it.next('orange')); // {done: true, value: "Ethan's favorite color is orange."}

            // 이 예제를 보면 제너레이터를 활용하면 호출자의 함수의 실행을 제어할 수 있어서 아주 유용하게 쓸 수 있다는 걸 알았을 겁니다.
            // 호출자가 제너레이터에 정보를 전달하므로, 제너레이터는 그 정보에 따라 자신의 동작 방식 자체를 바꿀 수 있습니다.
            // NOTE_ 제너레이터는 화살표 표기법으로 만들 수 없으며 반드시 function*을 써야합니다.
        }

        /**
         * 제너레이터와 return
         * 
         * yield 문은, 설령 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않습니다. 제너레이터에서 return 문을 사용하면 그 위치와 관계없이 done은
         * true가 되고, value 프로퍼티는 return이 반환하는 값이 됩니다. 다음 예제를 보십시오.
         */
        {
            function* abc() {
                yield 'a';
                yield 'b';
                return 'c';
            }

            const it = abc();
            console.log(it.next()); // {done: false, value: "a"}
            console.log(it.next()); // {done: false, value: "b"}
            console.log(it.next()); // {done: true, value: "c"}

            // 이런 동작 방식이 정확하기는 하지만, 제너레이터를 사용할 때는 보통 done이 true이면 value프로퍼티에 주의를 기울이지 않는다는 잠을 염두에 두십시오.
            //  예를 들어 이 제너레이터를 for...of 루프에서 사용하면 c는 절대 출력되지 않습니다.

            for (let l of abc()) {
                console.log(l);
            }

            // CAUTION_ 제너레이터에서 중요한 값을 return으로 반환하려 하지 마십시오. return은 제너레이터를 중간에 종료하는 목적으로만 사용해야 합니다.
        }
    }

    /**
     * 요약
     * 
     * 이터레이터는 배열이나 객체처럼 여러 가지 값을 제공할 수 있는 컬렉션의 동작 방식을 표준화했습니다. 이터레이터로 할 수 있는 일은 ES6 이전에도 모두 할 수
     * 있었으므로, 어떤 기능이 추가된 것은 아닙니다. 중요하면서도 자주 사용하는 패턴을 표준화했다는 데 의미가 있는 겁니다.
     * 
     * 제너리이터를 사용하면 함수를 훨씬 더 유연하고 효율적으로 사용할 수 있습니다. 이제 함수를 호출하는 부분에서 데이터를 제공하고, 호출한 함수가 완료되길
     * 기다렸다가 반환값을 받는다는 사고방식에 얽매일 필요가 없습니다. 제너레이터는 모든 연산을 지연시켰다가 필요할 때만 수행하게 만들 수 있습니다.
     */

})();