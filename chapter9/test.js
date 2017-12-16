/**
 * Chapter9
 * 
 * 객체와 객체지향 프로그래밍
 */
(() => {

    /**
     * 프로 퍼티 나열
     * 
     * 객체 프로퍼티에는 순서가 없습니다.
     */
    {
        /**
         * for ...in
         */
        {
            const SYM = Symbol();
            const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

            // hasOwnProperty는 상속된 프로퍼티가 for...in에 나타날 위험을 제거하기 위해 사용합니다.
            // for ...in루프에는 키가 심볼인 프로퍼티는 포함되지 않습니다.
            for (let prop in o) {
                if (!o.hasOwnProperty(prop)) continue;
                console.log(`${prop}: ${o[prop]}`);
            }
            // a: 1
            // b: 2
            // c: 3
        }

        /**
         * Object.keys
         * 
         * Object.keys는 객체에서 나열가능한 문자열 프로퍼티를 배열로 반환합니다.
         */
        {
            const SYM = Symbol();
            const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

            // 이 예제는 for...in 루프를 썼을 때와 같은 결과이고 hasOwnProperty를 체크할 필요는 없습니다.
            Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));

            const obj = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 };

            // 객체의 프로퍼티 키를 배열로 가져와야 할 때는 Object.keys가 편리합니다.
            // 예를 들어 객체에서 x로 시작하는 프로퍼티를 모두 가져온다면 다음과 같이 할 수 있습니다.
            Object.keys(obj).filter(prop => prop.match(/^x/)).forEach(prop => console.log(`${prop}: ${obj[prop]}`));
            // xochitl: 2
            // xylophone: 5
        }
    }

    /**
     * 객체지향 프로그래밍
     * 
     * 객체지향 프로그래밍(OOP)는 컴퓨터 과학에서 전통적인 패러다임입니다.
     * 
     * 객체는 데이터와 기능을 논리적으로 묶어 놓은 겁니다.
     * OOP는 우리가 사물을 이해하는 자연스러운 방식을 반영하도록 설계됐습니다.
     * 
     * 클래스는 어떤 자동차처럼 추상적이고 범용적인 것입니다.
     * 
     * 인스턴스는 특정 자동차처럼 구체적이고 한정적인 것입니다.
     * 
     * 기능은 메서드라고 부릅니다.
     * 
     * 클래스에 속하지만 특정 인스턴스에 묶이지 않는 기능을 클래스 메서드라고 합니다. 예를 들어 '시동을 거는' 기능은 클래스 메서드라 할 수 있습니다.
     * 
     * 인스턴스를 처음 만들 때는 생성자(constructor)가 실행됩니다. 생성자는 객체 인스턴스를 초기화 합니다.
     * 
     * OOP는 클래스를 계층적으로 분류하는 수단도 제공합니다.
     * 예를 들어 운송 수단을 자동차의 슈퍼클래스(superclass)라 부르고, 자동차를 운송 수단의 서브클래스(subclass)라 부릅니다.
     * 운송 수단 클래스에는 자동차, 보트, 비행기 등 여러 가지 서브클래스가 있을 수 있습니다.
     * 서브클래스 역시 서브클래스를 가질 수 있습니다.
     */
    {
        /**
         * 클래스와 인스턴스 생성
         * 
         * ES6에서는 클래스를 만드는 간편한 새 문법을 도입했습니다.
         */
        {
            {
                // 새 클래스 Car를 만듭니다.
                class Car {
                    constructor() {
                    }
                }

                // 인스턴스(특정 자동차)를 만들 수 있습니다.
                const car1 = new Car();
                const car2 = new Car();

                // instanceof 연산자를 사용하여 객체가 클래스의 인스턴스인지 확인 할 수 있습니다.
                console.log(car1 instanceof Car); // true
                console.log(car1 instanceof Array); // false
            }
            {
                // Car 클래스를 조금 더 흥미롭게 만들어 봅시다.
                class Car {
                    constructor(make, model) {
                        this.make = make;
                        this.model = model;
                        this.userGears = ['P', 'N', 'R', 'D'];
                        this.userGear = this.userGears[0];
                    }
                    shift(gear) {
                        if (this.userGears.indexOf(gear) < 0)
                            throw new Error(`Invalid gear: ${gear}`);
                        this.userGear = gear;
                    }
                }

                const car1 = new Car('Tesla', 'Model S');
                const car2 = new Car('Mazda', '3i');
                car1.shift('D');
                car2.shift('R');

                console.log(car1.userGear); // 'D'
                console.log(car2.userGear); // 'R'
            }
            {
                // Car 클래스에 shift 메서드를 사용하여도 완벽하게 보호 되는 건 아닙니다.
                // 직접 car1.userGear = 'X' 라고 설정한다면 막을 수 없습니다.
                // Car 클래스를 다음과 같이 수정하면 실수로 기어 프로퍼티를 고치지 않도록 어느 정도 막을 수 있습니다.
                class Car {
                    constructor(make, model) {
                        this.make = make;
                        this.model = model;
                        this._userGears = ['P', 'N', 'R', 'D'];
                        this._userGear = this._userGears[0];
                    }

                    get userGear() { return this._userGear; }
                    set userGear(value) {
                        if (this._userGears.indexOf(value) < 0)
                            throw new Error(`Invalid gear: ${value}`);
                        this._userGear = value;
                    }

                    shift(gear) { this.userGear = gear; }
                }
                // 외부에서 접근하면 안 되는 프로퍼티 이름 앞에 밑줄을 붙이는, 소위 '가짜 접근 제한'을 사용했습니다.
                // 진정한 제한이라기보다는 "밑줄이 붙은 프로퍼티에 접근하려고 하네? 이건 실수로군." 하면서 빨리 찾을 수 있도록 하는 방편이라고 봐야 합니다.
            }
            {
                // 프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스를 사용할 수 있습니다.
                // Car 클래스를 다음과 같이 고치면 기어 프로퍼티를 완벽하게 보호할 수 있습니다.
                const Car = (function () {

                    const carProps = new WeakMap();

                    class Car {
                        constructor(make, model) {
                            this.make = make;
                            this.model = model;
                            this._userGears = ['P', 'N', 'R', 'D'];
                            carProps.set(this, { userGear: this._userGears[0] });
                        }

                        get userGear() { return carProps.get(this).userGear; }
                        set userGear(value) {
                            if (this._userGears.indexOf(value) < 0)
                                throw new Error(`Invalid gear: ${value}`);
                            carProps.get(this).userGear = value;
                        }

                        shift(gear) { this.userGear = gear; }
                    }

                    return Car;
                })();
                // 여기서는 즉시 호출하는 함수 표현식을 써서 WeakMap을 클로저로 감싸고 바깥에서 접근할 수 없게 했습니다.
                // WeakMap은 클래스 외부에서 접근하면 안 되는 프로퍼티를 안전하게 저장합니다.
            }
        }

        /**
         * 클래스는 함수다
         * 
         * class 문법이 훨 씬 더 직관적이고 단순하긴 하지만, 사실 class는 단축 문법일 뿐이며 자바스크립트의 클래스 자체가 바뀐 것은 아닙니다.
         */
        {
            // 클래스는 사실 함수일 뿐입니다. ES5에서는 다음과 같이 만들었을 겁니다.
            function Car(make, model) {
                this.make = make;
                this.model = model;
                this._userGears = ['P', 'N', 'R', 'D'];
                this._userGear = this._userGears[0];
            }
            // ES6에서 클래스가 바뀐 것은 아닙니다. 단지 간편한 새 문법이 생겼을 뿐입니다.
        }

        /**
         * 프로토타입
         * 
         * 클래스의 인스턴스에서 사용할 수 있는 메서드라고 하면 그건 프로토타입(prototype) 메서드를 말하는 겁니다.
         * 프로토타입 메서드는 Car.prototype.shift처럼 표기할 때가 많습니다.
         * 
         * 최근에는 프로토타입 메서드를 #으로 표시하는 표기법이 널리 쓰입니다. 예를 들어 Car.prototype.shift를 Car#shift로 쓰는 겁니다.
         * 
         * 모든 함수에는 prototype이라는 특별한 프로퍼티가 있습니다. 일반적인 함수에서는 프로토타입을 사용할 일이 없지만, 
         * 객체 생성자로 동작하는 함수에서는 프로토타입이 대단히 중요합니다.
         * 
         * 함수의 prototype 프로퍼티가 중요해지는 시점은 new 키워드로 새 인스턴스를 만들었을 때입니다.
         * new 키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할 수 있습니다. 객체 인스턴스는 생성자의 prototype 프로퍼티를 __proto__ 프로퍼티에 저장합니다.
         * 
         * 프로퍼티에서 중요한 것은 동적 디스패치라는 메커니즘 입니다. 여기서 디스패치는 메서드 호출과 같은 의미입니다.
         * 객체의 프로퍼티나 메서드에 접근하려 할 때 그런 프로퍼티나 메서드가 존재하지 않으면 자바스크립트는 객체의 포로토타입에서 해당 프로퍼티나 메서드를 찾습니다.
         * 클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할 수 있습니다.
         */
        {
            // 인스턴스에서 메서드나 프로퍼티를 정의하면 프로토타입에 있는 것을 가리는 효과가 있습니다.
            // 자바스크립트는 먼저 인스턴스를 체크하고 거기에 없으면 프로토타입을 체크합니다.
            const Car = (function () {

                const carProps = new WeakMap();

                class Car {
                    constructor(make, model) {
                        this.make = make;
                        this.model = model;
                        this._userGears = ['P', 'N', 'R', 'D'];
                        carProps.set(this, { userGear: this._userGears[0] });
                    }

                    get userGear() { return carProps.get(this).userGear; }
                    set userGear(value) {
                        if (this._userGears.indexOf(value) < 0)
                            throw new Error(`Invalid gear: ${value}`);
                        carProps.get(this).userGear = value;
                    }

                    shift(gear) { this.userGear = gear; }
                }

                return Car;
            })();

            const car1 = new Car();
            const car2 = new Car();
            console.log(car1.shift === Car.prototype.shift); // true
            car1.shift('D');
            // car1.shift('d'); // error
            console.log(car1.userGear); // 'D'
            console.log(car1.shift === car2.shift);
            console.log(car1.shift);

            car1.shift = function (gear) { this.userGear = gear.toUpperCase(); };
            console.log(car1.shift === Car.prototype.shift); // false
            console.log(car1.shift === car2.shift); // false
            car1.shift('d');
            console.log(car1.userGear); // 'D'
            console.log(car1.shift);

            // 이 예제는 동적 디스패치를 어떻게 구현하지는 잘 보여줍니다. car1 객체에는 shift 메서드가 없지만, 
            // car1.shift('D')를 호출하면 자바스크립트는 car1의 프로토타입에서 그런 이름의 메서드를 검색합니다. 
            // car1에 shift 메서드를 추가하면 car1과 프로토타입에 같은 이름의 메서드가 존재하게 됩니다.
            // car1.shift('d');를 호출하면 car1의 메서드가 호출되고 프로토타입의 메서드는 호출되지 않습니다.
        }

        /**
         * 정적 메서드
         * 
         * 메서드에는 인스턴스 메서드 외에도 정적 메서드(클래스 메서드)가 있습니다.
         * 일반적으로 정적 메서드에는 this 대신 클래스 이름을 사용하는 것이 좋은 습관입니다.
         * 정적 메서드는 클래스에 관련되지만 인스턴스와는 관련이 없는 범용적인 작업에 사용됩니다.
         * 예제로 자동차 식별 번호(VIN)을 붙이는 메서드를 생각해 봅시다.
         * VIN을 할당한다는 것은 자동차 전체를 대상으로 하는 추상적인 개념이므로 정적 메서드로 사용하는 게 어울립니다.
         */
        {
            // 예를 들어 두 자동차의 제조사와 모델이 모두 같으면 true를 반환하는 areSimilar 메서드, 
            // 두 자동차의 VIN이 같으면 true를 반환하는 areSame 메서드를 만들어 봅시다.
            class Car {
                static getNextVin() {
                    return Car.nextVin++; // this.nextVin++라고 써도 되지만, Car를 앞에 쓰면 정적 메서드라는 점을 상기하기 쉽습니다.
                }
                constructor(make, model) {
                    this.make = make;
                    this.model = model;
                    this.vin = Car.getNextVin();
                }
                static areSimilar(car1, car2) {
                    return car1.make === car2.make && car1.model === car2.model;
                }
                static areSame(car1, car2) {
                    return car1.vin === car2.vin;
                }
            }
            Car.nextVin = 0;

            const car1 = new Car('Tesla', 'S');
            const car2 = new Car('Mazda', '3');
            const car3 = new Car('Mazda', '3');

            console.log(car1.vin); // 0
            console.log(car2.vin); // 1
            console.log(car3.vin); // 2

            console.log(Car.areSimilar(car1, car2)); // false
            console.log(Car.areSimilar(car2, car3)); // ture
            console.log(Car.areSame(car2, car3)); // false
            console.log(Car.areSame(car2, car2)); // true
        }

        /**
         * 상속
         * 
         * 클래스의 인스턴스는 클래스의 기능을 모두 상속합니다.
         * 자바스크립트는 조건에 맞는 프로토타입을 찾을 때까지 프로토타입 체인을 계속 거슬러 올라갑니다.
         * 조건에 맞는 프로토타입을 찾지 못하면 에러를 일으킵니다.
         * 클래스의 계층 구조를 만들 때 프로토타입 체인을 염두에 두면 효율적인 구조를 만들 수 있습니다.
         * 즉, 프로토타입 체인에서 가장 적절한 위치에 메서드를 정의하는 겁니다.
         */
        {
            // 자동차는 운송수단의 일종입니다. 예를 들어 자통자에는 deployAirbags이란 메서드가 있을 수 있습니다.
            // 에어백이 달린 보트는 본적이 없죠? 반면 addPassenger 메서드는 운송 수단 클래스에 적당합니다.
            class Vehicle {
                constructor() {
                    this.passengers = [];
                    console.log('Vehicle created');
                }
                addPassenger(p) {
                    this.passengers.push(p);
                }
            }

            class Car extends Vehicle {
                constructor() {
                    super();
                    console.log('Car created');
                }
                deployAirbags() {
                    console.log('BWOOSH!');
                }
            }

            // extends 키워드는 Car를 Vehicle의 서브클래스로 만듭니다.
            // super()는 슈퍼클래스의 생성자를 호출하는 특별한 함수입니다. 서브클래스에서 이 함수를 호출하지 않으면 에러가 일어납니다.
            const v = new Vehicle();
            v.addPassenger('Frank');
            v.addPassenger('Judy');
            console.log(v.passengers);

            // Car 클래스의  인스턴스는 Vehicle 클래스의 모든 메서드에 접근할 수 있습니다.
            const c = new Car();
            c.addPassenger('Alice');
            c.addPassenger('Cameron');
            console.log(c.passengers);
            // v.deployAirbags(); // error
            c.deployAirbags();
        }

        /**
         * 다형성
         * 
         * 다형성(polymorphism)이란 단어는 객체지향 언어에서 여러 슈퍼클래스의 멤버인 인스턴스를 가리키는 말입니다.
         * 대부분의 객체지향 언어에서 다형성은 특별한 경우에 속합니다. 자바스크립트는 느슨한 타입을 사용하고 어디서든 객체를 쓸 수 있으므로
         * (정확한 결과가 보장되진 않지만), 어떤 면에서는 자바스크립트의 객체는 모두 다형성을 갖고 있다고 할 수 있습니다.
         */
        {
            // 자바스크립트에는 객체가 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있습니다.
            // 이 연산자를 속일 수도 있지만, prototype과 __proto__ 프로퍼티에 손대지 않았다면 정확한 결과를 기대할 수 있습니다.
            class Vehicle {
                constructor() {
                    this.passengers = [];
                    console.log('Vehicle created');
                }
                addPassenger(p) {
                    this.passengers.push(p);
                }
            }

            class Car extends Vehicle {
                constructor() {
                    super();
                    console.log('Car created');
                }
                deployAirbags() {
                    console.log('BWOOSH!');
                }
            }

            class Motorcyle extends Vehicle { }
            const c = new Car();
            const m = new Motorcyle();
            console.log(c instanceof Car); // true
            console.log(c instanceof Vehicle); // true
            console.log(m instanceof Car); // false
            console.log(m instanceof Motorcyle); // ture
            console.log(m instanceof Vehicle); // true
            // NOTE_ 자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스 입니다.
            // 즉, 객체 o에서 o instanceof Object는 항상 true입니다.
        }

        /**
         * 객체 프로퍼티 나열 다시 보기
         * 
         * ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라
         * 인스턴스에 정의해야 합니다. 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 
         * 장치는 없으므로 확실히 확인하려면 항상 hasOwnProperty를 사용하는 편이 좋습니다.
         */
        {
            class Super {
                constructor() {
                    this.name = 'Super';
                    this.isSuper = true;
                }
            }

            // 유효하지만, 권장하지는 않습니다.
            Super.prototype.sneaky = 'not recommended!';

            class Sub extends Super {
                constructor() {
                    super();
                    this.name = 'Sub';
                    this.isSub = true;
                }
            }

            const obj = new Sub();

            for (let p in obj) {
                console.log(`${p}: ${obj[p]}` +
                    (obj.hasOwnProperty(p) ? '' : ' (inherited)'));
            }

            // name, isSuper, isSub 프로퍼티는 모두 프로토타입 체인이 아니라 인스턴스에 정의 됐습니다.
            // (슈퍼클래스 생성자에서 선언한 프로퍼티는 서브클래스 인스턴스에도 정의됩니다.)
            // 반면 sneaky 프로퍼티는 슈퍼클래스의 프로토타입에 직접 정의했습니다.
            // Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있습니다.
        }

        /**
         * 문자열 표현
         * 
         * 모든 객체는 Object를 상속하므로 Object의 메서드는 기본적으로 모든 객체에서 사용할 수 있습니다.
         * 객체의 기본적인 문자열 표현을 제공하는 toString도 그런 메서드 중 하나입니다.
         * toString의 기본 동작은 "[object Object]"를 반환하는 것인데, 이건 거의 쓸모가 없습니다.
         */
        {
            // toString 메서드에서 객체에 관한 중요한 정보를 제공한다면 디버깅에도 유용하고, 객체를 한눈에 파익 할 수 있습니다.
            // Car 클래스의 toString 메서드가 제조사, 모델, VIN을 반환하도록 고쳐봅시다.
            class Car {
                static getNextVin() {
                    return Car.nextVin++; // this.nextVin++라고 써도 되지만, Car를 앞에 쓰면 정적 메서드라는 점을 상기하기 쉽습니다.
                }
                constructor(make, model) {
                    this.make = make;
                    this.model = model;
                    this.vin = Car.getNextVin();
                }
                static areSimilar(car1, car2) {
                    return car1.make === car2.make && car1.model === car2.model;
                }
                static areSame(car1, car2) {
                    return car1.vin === car2.vin;
                }
                toString() {
                    return `${this.make} ${this.model}: ${this.vin}`;
                }
            }
            Car.nextVin = 0;

            const car1 = new Car('Tesla', 'S');
            console.log(car1.toString()); // Tesla S: 0
        }
    }

    /**
     * 다중 상속, 믹스인, 인터페이스
     * 
     * 일부 객체지향 언어에서는 다중 상속(multiple inheritance)이란 기능을 지원합니다. 이 기능은 클래스가
     * 슈퍼클래스 두 개를 가지는 기능이며, 슈퍼클래스의 슈퍼클래스가 존재하는 일반적인 상속과는 다릅니다.
     * 다중 상속에는 충돌의 위험이 있습니다. 예를 들어 어떤 클래스에 두 개의 슈퍼클래스가 있고, 두 슈퍼클래스에 모두 
     * greet 메서드가 있다면 서브클래스는 어느 쪽이 메서드를 상속해야 할까요? 다중 상속을 지원하지 않는 언어가 많은 
     * 이유는 이런 문제를 피하기 위해서입니다.
     * 
     * 하지만 현실 세계를 생각해 보면 다중 상속을 적용할 수 있는 문제가 많습니다. 예를 들어 자동차는 운송 수단인 동시에
     * '보험을 들 수 있는' 대상입니다. 주택에도 보험을 들 수 있지만, 주택은 운송 수단이 아닙니다. 다중 상속을 지원하지 않는
     * 언어 중에는 인터페이스(interface) 개념을 도입해서 이런 상황에 대처하는 언어가 많습니다. Car 클래스의 슈퍼클래스는
     * Vehicle 하나뿐이지만, Insurable, Container 등 여러 인터페이스를 가질 수 있습니다.
     * 
     * 자바스크립트는 흥미로운 방식으로 이들을 절충했습니다. 자바스크립트는 프로토타입 체인에서 여러 부모를 검색하지는 않으므로
     * 단일 상속 언어라고 해야 하지만, 어떤 면에서는 다중 상속이나 인터페이스보다 더 나은 방법을 제공합니다.
     * 
     * 자바스크립트가 다중 상속이 필요한 문제에 대한 해답으로 내놓은 개념이 믹스인(mixin)입니다.
     * 믹스인이란 기능을 필요한 만큼 섞어 놓은 것입니다. 자바스크립트는 느슨한 타입을 사용하고 대단히 관대한 언어이므로
     * 그 어떤 기능이라도 언제든, 어떤 객체에든 추가 할 수 있습니다.
     */
    {
        // 그러면 자동차에 적용할 수 있는 보험 가입(insurable) 믹스인을 만듭시다.
        // 보험 가입 믹스인 외에도 InsurancePolicy 클래스를 만듭니다. 보험 가입 믹스인에는 addInsurancePolicy,
        // getInsurancePolicy 메서드가 필요하며, 편의를 위해 isInsured 메서드도 추가하겠습니다.
        class Car {
            static getNextVin() {
                return Car.nextVin++; // this.nextVin++라고 써도 되지만, Car를 앞에 쓰면 정적 메서드라는 점을 상기하기 쉽습니다.
            }
            constructor(make, model) {
                this.make = make;
                this.model = model;
                this.vin = Car.getNextVin();
            }
            static areSimilar(car1, car2) {
                return car1.make === car2.make && car1.model === car2.model;
            }
            static areSame(car1, car2) {
                return car1.vin === car2.vin;
            }
            toString() {
                return `${this.make} ${this.model}: ${this.vin}`;
            }
        }
        Car.nextVin = 0;

        class InsurancePolicy { }
        function makeInsurable(o) {
            o.addInsurancePolicy = function (p) {
                this.InsurancePolicy = p;
            };
            o.getInsurancePolicy = function () {
                return this.InsurancePolicy;
            };
            o.isInsured = function () {
                return !!this.InsurancePolicy;
            };
        }

        // 자동차를 추상화한 개념을 보험에 가입할 수는 없습니다. 보험에 가입하는 것은 개별 자동차 입니다.
        const car1 = new Car();
        makeInsurable(car1);
        car1.addInsurancePolicy(new InsurancePolicy());
        // 위 방법은 모든 자동차에서 makeInsurable을 호출해야 합니다.

        makeInsurable(Car.prototype);
        const car2 = new Car();
        car2.addInsurancePolicy(new InsurancePolicy()); // works
        // 이제 보험 관련 메서드들은 모두 Car 클래스에 정의된 것처럼 동작합니다.
    }
    // 물록 믹스인이 모든 문제를 해결해 주지는 않습니다. 보험 회사에서 shift 메서드를 만들게 된다면
    // Car 클래스의 동작이 이상해질 겁니다. instanceof 연산자로 보험에 가입할 수 있는 객체를 식별할 수도 없습니다.
    // 'addInsurancePolicy 메서드가 있다면 틀림없이 보험에 가입할 수 있다'는 식의 짐작만 가능할 뿐입니다.
    // 심볼을 사용하면 이런 문제 일부를 경감할 수 있습니다.
    {
        class InsurancePolyce { }
        const ADD_POLICY = Symbol();
        const GET_POLICY = Symbol();
        const IS_INSURED = Symbol();
        const _POLICY = Symbol();
        function makeInsurable(o) {
            o[ADD_POLICY] = function (p) { this[_POLICY] = p; };
            o[GET_POLICY] = function () { return this[_POLICY]; };
            o[IS_INSURED] = function () { return !!this[_POLICY]; };
        }
        // 심볼을 항상 고유하므로 믹스인이 Car 클래스의 기능과 충돌할 가능성은 없습니다.
        // 메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY 같은 심볼을 쓰는 절충안을 생각할 수도 있습니다.
    }

})();