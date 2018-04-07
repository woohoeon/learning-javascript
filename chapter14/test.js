/**
 * Chapter 14
 * 
 * 비동기적 프로그래밍
 * 
 * 사용자의 행동은 전적으로 비동기적입니다. 사용자가 언제 클릭할지, 터치할지, 또는 타이핑할지 당신은 전혀 알 수 없습니다.
 * 하지만 비동기적 실행이 사용자 입력 하나 때문에 필요한 건 아닙니다. 사실 자바스크립트의 본성 때문에 비동기적 프로그래밍
 * 이 필요합니다.
 * 
 * 자바스크립트 애플리케이션은 단일 스레드에서 동작합니다. 즉, 자바스크립트는 한 번에 한 가지 일만 할 수 있습니다. 멀티코
 * 어를 장착한 대부분의 최신 컴퓨터는 한 번에 여러 가지 일을 할 수 있고, 싱글코어 컴퓨터도 매우 빨라서 작업 A를 잠시 하고,
 * 작업 B를 잠시 하고, 작업 C를 잠시 하는 식으로 멀티태스킹을 흉내 낼 수 있습니다. 사용자가 보기에는 세 가지 작업이 동시
 * 에 일어나는 것처럼 보입니다. 실제로 멀티코어에서 동시에 수행하지 않았더라도 말입니다.
 * 
 * 자바스크립트가 싱글 스레드라는 얘기를 듣고 할 수 있는 일이 제한된다고 느낄지도 모르지만, 사실 멀티스레드 프로그래밍이 겪
 * 어야 하는 정말 골치 아픈 문제를 신경 쓰지 않아도 된다는 장점도 있습니다. 물론 대가가 있습니다. 부드럽게 동작하는 소프트
 * 웨어를 만들기 위해서 사용자의 입력뿐만 아니라 여러 문제를 비동기적 관점에서 생각해야 합니다. 비동기적 관점에서 생각하는
 * 건 처음에는 어려울 수 있습니다. 특히, 일반적으로 동기적 실행을 하는 언어를 사용 했었다면 더 어렵게 느껴질 수 있습니다.
 * 
 * 자바스크립트에는 매우 일찍부터 비동기적 실행 메커니즘이 존재했지만, 자바스크립트의 인기가 높아지고 자바스크립트로 만드는
 * 소프트웨어가 점점 복잡해짐에 따라 비동기적 프로그래밍에 필요한 장치들이 추가되었습니다. 자바스크립트의 비동기적 프로그래
 * 밍에는 뚜렷이 구분되는 세 가지 패러다임이 있습니다. 처음에는 콜백이 있고, promise가 뒤를 이었으며 마지막은 제너레이터
 * 입니다. 제너레이터가 콜백이나 프라미스보다 모든 면에서 더 좋다면 제너레이터에 대해서만 공부하고 나머지는 과거의 유산으로
 * 치워 둘 수도 있겠지만, 그렇게 간단한 문제는 아닙니다. 제너레이터 자체는 비동기적 프로그래밍을 전혀 지원하지 않습니다. 제
 * 너레이터를 비동기적으로 사용하려면 프라미스나 특수한 콜백과 함께 사용해야 합니다. 프라미스 역시 콜백에 의존합니다. 콜백은
 * 제너레이터나 프라미스 외에도 이벤트 처리 등에 유용하게 쓸 수 있습니다.
 * 
 * 사용자 입력 외에, 비동기적 테크닉을 사용해야 하는 경우는 크게 세 가지가 있습니다.
 *  * Ajax 호출을 비롯한 네트워크 요청
 *  * 파일을 읽고 쓰는 등의 파일시스템 작업
 *  * 의도적으로 시간 지연을 사용하는 기능(알람 등)
 */
(() => {

    /**
     * 비유
     * 
     * 필자는 콜백과 프라미스를 설명할 때, 예약하지 않고 분주한 음식점에 방문한 경우에 자주 비유합니다. 어떤 음식점은 당신이
     * 줄을 서서 기다리지 않도록, 당신의 전화번호를 받아서 자리가 나면 전화를 해줍니다. 이런 음식점은 콜백과 비슷합니다. 자리
     * 가 나면 당신이 알 수 있도록 하는 수단을 당신의 음식점 주인에게 넘겨줍니다. 음식점은 다른 손님을 대접하면 되고, 당신은 
     * 다른 일을 하면 됩니다. 어느 쪽도 서로를 기다리지 않습니다. 다른 음식점은 자리가 났을때 진동하는 호출기를 당신에게 넘겨
     * 줍니다. 이런 음식점은 프라미스와 비슷합니다. 자리가 나면 당신이 알 수 있도록 하는 수단을 음식점에서 당신에게 넘겨줍니다.
     * 콜백과 프라미스에 대해 설명하는 동안 이 비유를 염두에 두십시오.
     */

    /**
     * 콜백
     * 
     * 콜백은 자바스크립트에서 가장 오래된 비동기적 메커니즘입니다. 우리는 사용자 입력과 타임아웃을 처리하면서 이미 콜백을 사
     * 용했습니다. 콜백은 간단히 말해 나중에 호출할 함수입니다. 콜백 함수 자체에는 특별한 것이 전혀 없습니다. 콜백 함수도 일반
     * 적인 자바스크립트 함수일뿐입니다. 콜백 함수는 일반적으로 다른 함수에 넘기거나 객체의 프로퍼티로 사용합니다. 드물게는 
     * 배열에 넣어서 쓸 때도 있습니다. 항상 그런 건 아니지만, 콜백은 보통 익명 함수로 사용합니다.
     * 
     * 먼저 setTimeout을 사용하는 단순한 예제로 시작합니다. setTimeout은 콜백의 실행을 지정된 밀리초만큼 지연하는 내장
     * 함수입니다.
     */
    {
        console.log('Before timeout: ' + new Date());
        const f = () => {
            console.log('After timeout: ' + new Date());
        };
        setTimeout(f, 60 * 1000);
        console.log('I happen after setTimeout!');
        console.log('Me too!');

        // 이 예제에서는 명확하게 표현하기 위해 이름 붙은 함수 f를 seTimeout에 넘겼습니다. 이름붙은 함수를 써야 하는 타당한
        // 이유가 없다면, 일반적으로는 다음과 같이 익명 함수를 사용합니다.
        setTimeout(() => {
            console.log('After timeout: ' + new Date());
        }, 60 * 1000);

        /**
         * setInterval과 clearInterval
         * 
         * setTimeout은 콜백 함수를 한 번만 실행하고 멈추지만, setInterval은 콜백을 정해진 주기마다 호출하여 clearInterval
         * 을 사용할 때까지 멈추지 않습니다. 다음 예제는 분이 넘어가거나 10회째가 될 때까지 5초마다 콜백을 실행합니다.
         */
        {
            const start = new Date();
            let i = 0;
            const intervalId = setInterval(() => {
                let now = new Date();
                if (now.getMinutes() !== start.getMinutes() || ++i > 10)
                    return clearInterval(intervalId);
                console.log(`${i}: ${now}`);
            }, 5 * 1000);

            // 이 예제를 보면 setInterval이 ID를 반환한다는 사실을 알 수 있습니다. 이 ID를 써서 실행을 멈출 수 있습니다.
            // NOTE_ setTimeout, setInterval, clearInterval은 모두 전역 객체(브라우저에서는 window, 노드에서는
            // global)에 정의되어 있습니다.
        }

        /**
         * 스코프와 비동기적 실행
         * 
         * 비동기적 실행에서 혼란스럽고 에러도 자주 일어나는 부분은 스코프와 클로저가 비동기적 실행에 영향을 미치는 부분
         * 입니다. 함수를 호출하면 항상 클로저가 만들어집니다. 매개변수를 포함해 함수 안에서 만든 변수는 모두 무언가가 자신에
         * 접근할 수 있는 한 계속 존재합니다.
         * 
         * 이 예제는 이미 봤었지만, 중요한 사실을 배울 수 있으니 반복해서 볼 가치가 있습니다.
         */
        {
            const countdown = () => {
                let i; // i를 루프 밖에서 선언했습니다.
                console.log('Countdown');
                for (i = 5; i >= 0; i--) {
                    setTimeout(() => {
                        console.log(i === 0 ? 'Go!' : i);
                    }, (5 - i) * 1000);
                }
            };
            countdown();

            // 코드를 보면 5에서부터 카운트다운 할 것처럼 보입니다. 하지만 결과는 -1이 여섯 번 반복될 뿐이고, Go!는 나타나지
            // 않습니다. 이번에는 let을 사용하긴 했지만, 변수를 for루프 밖에서 선언했으므로 같은 문제가 벌어집니다.

            // 스코프와 비동기적 실행이 어떻게 연관되는지 이해하는 것이 중요합니다. countdown을 호출하면 변수 i가 들어있는
            // 클로저가 만들어집니다. for 루프 안에서 만드는 콜백은 모두 i에 접근 할 수 있고, 그들이 접근하는 i는 똑같은 i입니다.

            const countdown2 = () => {
                console.log('Countdown');
                for (let i = 5; i >= 0; i--) {
                    setTimeout(() => {
                        console.log(i === 0 ? 'Go!' : i);
                    }, (5 - i) * 1000);
                }
            };
            countdown2();

            // 여기서 주의할 부분은 콜백이 어느 스코프에 선언됐느냐입니다. 콜백은 자신을 선언한 스코프(클로저)에 있는 것에 접근
            // 할 수 있습니다. 따라서 i의 값은 콜백이 실제 실행되는 순간마다 다를 수 있습니다. 이 원칙은 콜백뿐만 아니라 모든
            // 비동기적 테크닉에 적용됩니다.
        }

        /**
         * 오류 우선 콜백
         * 
         * 노드가 점점 인기를 얻어가던 시기에 오류 우선 콜백(error-first callback)이라는 패턴이 생겼습니다. 콜백을 사용하면
         * 예외 처리가 어려워지므로, 콜백과 관련된 에러를 처리할 방법의 표준이 필요했습니다. 이에 따라 나타난 패턴이 콜백의 첫
         * 번째 매개변수에 에러 객체를 쓰자는 것이었습니다. 에러가 null 이나 undefined이면 에러가 없는 것입니다.
         * 
         * 오류 우선 콜백을 다룰 때 가정 먼저 생각할 것은 에러 매게변수를 체크하고 그에 맞게 반응하는 겁니다. 노드에서 파일 콘
         * 텐츠를 읽는다고 할 때, 오류 우선 콜백을 사용한다면 다음과 같은 코드를 쓰게 됩니다.
         */
        {
            // const fs = require('fs');
            // const fname = 'may_or_may_not_exist.txt';
            // fs.reaFile(fname, function (err, data) {
            //     if (err) return console.error(`error reading file ${fname}: ${err.message}`);
            //     console.log(`${fname} contents: ${data}`);
            // });

            // 에러 객체를 체크해야 한다는 사실을 기억하고, 아마 로그를 남기기도 하겠지만, 빠져나와야 한다는 사실은 잊는 사람이
            // 많습니다. 프라미스를 사용하지 않으면 오류 우선 콜백은 노드 개발의 표준이나 다름없습니다. 콜백을 사용하는 인터페이
            // 스를 만들 때는 오류 우선 콜백을 사용하길 강력히 권합니다.
        }

        /**
         * 콜백 헬
         * 
         * 콜백을 사용해 비동기적으로 실행할 수 있긴 하지만, 현실적인 단점이 있습니다. 한 번에 여러가지를 기다려야 한다면 콜백을
         * 관리하기가 상당히 어려워집니다. 더 골치 아픈 문제는 에러 처리 입니다. 이 예제에서는 에러를 기록하기만 했지만, 예외를
         * 일으키려 했다면 더더욱 골치가 아팠을 겁니다. 다음 예제를 보십시오.
         */
        {
            // const fs = require('fs');
            // const readSketchyFile = () => {
            //     try {
            //         fs.readFile('does_not_exist.txt', function (err, data) {
            //             if (err) throw err;
            //         });
            //     } catch (err) {
            //         console.log('warning: minor issue occurred, program continuing');
            //     }
            // };

            // 이 코드는 얼핏 타당해 보이고, 예외 처리도 수행하는 방어적인 코드처럼 보입니다. 동작하지 않는다는 것만 빼면 말입니다.
            // 예외 처리가 의도대로 동작하지 않는 이유는 try...catch 블록은 같은 함수 안에서만 동작하기 때문입니다. try...catch
            // 블록은 readSketchyFile 함수 안에 있지만, 정작 예외는 fs.readFile이 콜백으로 호출하는 익명 함수 안에서 일어났
            // 습니다.
            // 또한, 콜백이 우연히 두 번 호출되거나, 아예 호출되지 않는 경우를 방지하는 안전장치도 없습니다.
            // 이런 문제가 해결할 수 없는 문제는 아닙니다. 하지만 비동기적 코드가 늘어나면 늘어날수록 버그가 없고 관리하기 쉬운 코
            // 드를 작성하기는 매우 어려워집니다. 그래서 프라미스가 등장했습니다.
        }
    }

    /**
     * 프라미스
     * 
     * 프라미스는 콜백의 단점을 해결하는 시도 속에서 만들어졌습니다. 프라미스는 간혹 번거롭게 느껴질 수 있지만, 일반적으로 안전
     * 하고 관리하기 쉬운 코드를 만들 수 있게 됩니다.
     * 
     * 프라미스가 콜백을 대체하는 것은 아입니다. 사실 프라미스에서도 콜백을 사용합니다. 프라미스는 콜백을 예측 가능한 패턴으로
     * 사용할 수 있게 하며, 프라미스 없이 콜백만 사용했을 때 나타날 수 있는 엉뚱한 현상이나 찾기 힘든 버그를 상당수 해결합니다.
     * 
     * 프라미스의 기본 개념은 간단합니다. 프라미스 기반 비동기적 함수를 호출하면 그 함수는 Promise 인스턴스를 반환합니다. 프라
     * 미스는 성공(fulfilled)하거나, 실패(rejected)하거나 단 두 가지뿐 입니다. 프라미스는 성공 혹은 실패 둘 중 하나만 일어난다고
     * 확신할 수 있습니다. 성공한 프라미스가 나중에 실패하는 일 같은 건 절대 없습니다. 또한, 성공이든 실패든 단 한 번만 일어납니다.
     * 프라미스가 성공하거나 실패하면 그 프라미스를 결정됐다(settled)고 합니다.
     * 
     * 프라미스는 객체이므로 어디든 전달할 수 있다는 점도 콜백에 비해 간편한 장점입니다. 비동기적 처리를 여기서 하지 않고 다른 함
     * 수에서 (또는 다른 동료가) 처리하게 하고 싶다면 프라미스를 넘기기만 하면 됩니다. 마치 음식점에서 받은 예약 호출기를 친구에
     * 게 맡기는 것과 비슷합니다. 예약한 인원이 때맞춰 오기만 한다면, 음식점에서는 누가 호출기를 들고 있든 상관없으니까요.
     */
    {
        /**
         * 프라미스 만들기
         * 
         * 프라미스는 쉽게 만들 수 있습니다. resolve (성공)와 reject (실패) 콜백이 있는 함수로 새 Promise 인스턴스를 만들기만
         * 하면 됩니다. countdown 함수를 고쳐 봅시다. 매개변수를 받게 만들어서 5초 카운트다운에 매이지 않고, 카운트다운이 끝나
         * 면 프라미스를 반환하게 하겠습니다.
         */
        {
            const countdown = seconds => {
                return new Promise(function (resolve, reject) {
                    for (let i = seconds; i >= 0; i--) {
                        setTimeout(function () {
                            if (i > 0) console.log(i + '...');
                            else resolve(console.log('GO!'));
                        }, (seconds - i) * 1000);
                    }
                });
            };

            // 이대로라면 별로 좋은 함수는 아닙니다. 너무 장황한 데다가, 콘솔을 아예 쓰지 않기를 원할 수도 있습니다. 웹페이지에서 카
            // 운트다운이 끝나면 페이지 요소를 업데이트하는 목적에 쓰기도 별로 알맞지 않아 보입니다. 하지만 이제 시작일 뿐이고, 프라
            // 미스를 어떻게 만드는지는 잘 드러나 있습니다. resolve와 reject는 함수입니다. resolve를 여러번 호출하면 프라미스의
            // 프라미스 같은 걸 만들 수 있지 않을까 하는 생각이 들 수도 있겠지만, resolve나 reject를 여러번 호출하든, 섞어서 호출
            // 하든 결과는 같습니다. 첫 번째로 호출한 것만 의미가 있습니다. 프라미스는 성공 또는 실패를 나타낼 뿐입니다. 
        }

        /**
         * 프라미스 사용
         * 
         * countdown 함수를 어떻게 사용하는지 알아봅시다. 프라미스는 무시해버리고 countdown(5) 처럼 호출해도 됩니다. 카운트
         * 다운은 여전히 동작하고, 무슨 말인지 알기 어려운 프라미스는 신경쓰지 않아도 됩니다. 하지만 프라미스의 장점을 이용하고 싶
         * 다면 어떻게 해야 할까요? 반환된 프라미스를 사용하는 예제를 살펴봅시다.
         */
        {
            const countdown = seconds => {
                return new Promise(function (resolve, reject) {
                    for (let i = seconds; i >= 0; i--) {
                        setTimeout(function () {
                            if (i === 13) return reject(new Error('Oh my god'));
                            if (i > 0) console.log(i + '...');
                            else resolve(console.log('GO!'));
                        }, (seconds - i) * 1000);
                    }
                });
            };

            countdown(5).then(
                function () {
                    console.log('countdown completed successfully');
                },
                function (err) {
                    console.log('countdown experienced an error: ' + err.message);
                }
            );

            // 이 예제에서는 반환된 프라미스를 변수에 할당하지 않고 then 핸들러를 바로 호출 했습니다. then 핸들러는 성공 콜백과
            // 에러 콜백을 받습니다. 경우의 수는 단 두 가지뿐입니다. 성공 콜백이 실행되거나, 에러 콜백이 실행되거나 입니다. 프라미
            // 스는 catch 핸들러도 지원하므로 핸들러를 둘로 나눠서 써도 됩니다.

            const p = countdown(14);
            p.then(function () {
                console.log('countdown completed successfully');
            });
            p.catch(function (err) {
                console.log('countdown experienced an error: ' + err.message);
            });

            // countdown 함수를 수정해서 에러가 일어나게 만들어 봅시다. 13은 불길한 숫자이니 카운트 다운을 하다가 13을 만나
            // 면 에러를 내는 겁니다. 

            // 13이상의 숫자를 사용하면 13에서 에러가 일어납니다. 하지만 콘솔에는 12부터 다시 카운트를 기록합니다. reject나
            // resolve가 함수를 멈추지는 않습니다. 이들은 그저 프라미스의 상태를 관리할 뿐입니다.

            // 프라미스는 비동기적 작업이 성공 또는 실패하도록 확정하는, 매우 안전하고 잘 정의된 메커니즘을 제공하지만 현재는 진
            // 행 상황을 전혀 알려주지 않습니다. 즉 프라미스는 완료되거나 파기 될 뿐, '50% 진행됐다'라는 개념은 아예 없는 겁니다.
        }

        /**
         * 이벤트
         * 
         * 이벤트는 자바스크립트에서 자주 사용됩니다. 이벤트의 개념은 간단합니다. 이벤트가 일어나면 이벤트 발생을 담당하는 개체
         * (emitter)에서 이벤트가 일어났음을 알립니다. 필요한 이벤트는 모두 주시(listen)할 수 있습니다. 어떻게 이벤트를 주시할
         * 까요? 물론 콜백을 통해서입니다. 이벤트 시스템을 직접 만드는 것도 별로 어려운 일은 아니지만, 노드에는 이미 이벤트를
         * 지원하는 모듈 EventEmitter가 내장돼 있습니다. 이 모듈을 써서 countdown 함수를 개선해 봅시다. EventEmitter는
         * countdown 같은 함수와 같이 사용해도 되지만 원래는 클래스와 함께 사용하도록 설계됐습니다. 그러니 먼저 countdown
         * 함수를 Coutdown 클래스로 바꿔 봅시다.
         */
        {
            //const EventEmitter = require('events').EventEmitter;

            class Countdown extends EventEmitter {
                constructor(seconds, superstitions) {
                    super();
                    this.seconds = seconds;
                    this.superstitions = !!superstitions;
                }
                go() {
                    const countdown = this;
                    return new Promise(function (resolve, reject) {
                        for (let i = countdown.seconds; i >= 0; i--) {
                            setTimeout(function () {
                                if (countdown.superstitions && i == 13)
                                    return reject(new Error('Oh my god'));
                                countdown.emit('tick', i);
                                if (i === 0) resolve();
                            }, (countdown.seconds - i) * 1000);
                        }
                    });
                }
            }

            // 중요한 부분은 countdown.emit('tick', i)입니다. 이부분에서 tick 이벤트를 발생기키고, 필요하다면 프로그램의 다른
            // 부분에서 이 이벤트를 주시할 수 있습니다.(이벤트 이름은 원하는 대로 정해도 됩니다.) 개선한 카운트다운은 다음과 같이
            // 사용할 수 있습니다.

            const c = new Countdown(5);

            c.on('tick', function (i) {
                if (i > 0) console.log('...' + i + '...');
            });

            c.go()
                .then(function () {
                    console.log('GO!');
                })
                .catch(function (err) {
                    console.error(err.message);
                });

            // EventEmitter의 on 메서드가 이벤트를 주시하는 부분입니다. 이 예제에서는 tick 이벤트 전체에 콜백을 등록했습니다.
            // tick이 0이 아니면 출력한 다음 카운트다운을 시작하는 go를 호출합니다. 카운트다운이 끝나면 GO!를 출력합니다.
            // 물론 GO!를 tick 이벤트 리스너 안에서 출력 할 수도 있지만, 이렇게 하는 편이 이벤트와 프라미스의 차이를 더 잘 드러낸
            // 다고 생각합니다.

            // 처음 만들었던 countdown 함수보다 훨씬 복잡한 것은 사실이지만, 그만큼 기능이 늘어났습니다. 이제 카운트다운을 어떻
            // 게 활용할지 마음대로 바꿀 수 있고, 카운트다운이 끝났을 때 완료되는 프라미스도 생겼습니다.

            // 하지만 여전히 할 일이 남아있습니다. Countdown 인스턴스가 13에 도달했을 때 프라미스를 파기 했는데도 카운트다운이
            // 계속 진행되는 문제입니다.
            {
                const c = new Countdown(15, true);

                c.on('tick', function (i) {
                    if (i > 0) console.log('...' + i + '...');
                });

                c.go()
                    .then(function () {
                        console.log('GO!');
                    })
                    .catch(function (err) {
                        console.error(err.message);
                    });
            }

            // 여전히 모든 카운트가 출력되며 0이 될 때까지 진행합니다. 이 문제를 해결하기가 조금 어려운건 타임아웃이 이미 모두
            // 만들어졌기 때문입니다. 이 문제를 해결하려면 더 진행할 수 없다는 사실을 아는 즉시 대기중인 타임아웃을 모두 취소하면
            // 됩니다.
            {
                //const EventEmitter = require('events').EventEmitter;

                class Countdown extends EventEmitter {
                    constructor(seconds, superstitions) {
                        super();
                        this.seconds = seconds;
                        this.superstitions = !!superstitions;
                    }
                    go() {
                        const countdown = this;
                        const timeoutIds = [];
                        return new Promise(function (resolve, reject) {
                            for (let i = countdown.seconds; i >= 0; i--) {
                                timeoutIds.push(setTimeout(function () {
                                    if (countdown.superstitions && i == 13) {
                                        // 대기중인 타임아웃을 모두 취소합니다.
                                        timeoutIds.forEach(clearTimeout);
                                        return reject(new Error('Oh my god'));
                                    }
                                    countdown.emit('tick', i);
                                    if (i === 0) resolve();
                                }, (countdown.seconds - i) * 1000));
                            }
                        });
                    }
                }
            }
        }

        /**
         * 프라미스 체인
         * 
         * 프라미스에는 체인으로 연결할 수 있다는 장점이 있습니다. 즉, 프라미스가 완료되면 다른 프라미스를 반환하는 함수를 즉시
         * 호출할 수 있습니다. launch 함수를 만들어 카운트다운이 끝나면 실행되게 해 봅시다.
         */
        {
            function launch() {
                return new Promise(function (resolve, reject) {
                    console.log('Life off!');
                    setTimeout(function () {
                        resolve('In orbit!');
                    }, 2 * 1000); // 2초만에 궤도에 도달하다니!
                });
            }

            // 이 함수를 카운트다운에 쉽게 묶을 수 있습니다.
            const c = new Countdown(5)
                .on('tick', i => console.log(i + '...'));

            c.go().then(launch)
                .then(function (msg) {
                    console.log(msg);
                })
                .catch(function (err) {
                    console.error('Houston, we have a problem...');
                });

            // 프라미스 체인을 사용하면 모든 단계에서 에러를 캐치할 필요는 없습니다. 체인 어디에서든 에러가 생기면 체인 전체가
            // 멈추고 catch 핸들러가 동작합니다. 카운트다운을 15초로 바꾸고 미신을 넣어서 실행해 보십시오. launch는 실행되
            // 지 않습니다.
        }
    }

})();