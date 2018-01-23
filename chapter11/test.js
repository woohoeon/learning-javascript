/**
 * Chapter11
 * 
 * 예외와 에러처리
 */

(() => {

    /**
     * Error 객체 
     * 
     * 자바스크립트에는 내장된 Error 객체가 있고 이 객체는 에러 처리에 간편하게 사용할 수 있습니다.
     * Error 인스턴스를 만들면서 에러 메세지를 지정할 수 있습니다.
     */
    {
        const err = new Error('invalid email');

        // Error 인스턴스를 만드는 것만으로는 아무 일도 일어나지 않습니다. 이 인스턴스는 에러와 통신하는 수단입니다.
        // 이메일 주소의 유효성을 검사하는 함수가 있다고 합시다. 이 함수는 검사한 이메일 주소가 올바르면 이메일 주소를 문자열로 반환합니다.
        // 바르지 않다면 Error 인스턴스를 반환합니다. 단순함을 위해 앳(@)만 있으면 유효한 이메일 주소로 간주하기로 합시다.
        const validateEmail = email => email.match(/@/) ? email : new Error(`invalid email: ${email}`);

        // 이 함수를 사용할 때는 instanceof 연산자를 써서 Error 인스턴스가 반환됐는지 확인합니다.
        // 에러 메시지는 message 프로퍼티에 있습니다.
        const email = 'jane@doe.com';

        const validatedEmail = validateEmail(email);
        if (validatedEmail instanceof Error) {
            console.error(`Error: ${validatedEmail.message}`);
        } else {
            console.log(`Valid emil: ${validatedEmail}`);
        }

        // 이 방법도 Error 인스턴스를 활용하는 유효하고 유용한 방법이긴 하지만, Error 인스턴스는 예외 처리에서 더 자주 사용됩니다.
    }

    /**
     * try/catch와 예외처리
     * 
     * 이전 예제의 validateEmail은 사용자가 이메일 주소에서 @을 빼먹은, 예상할 수 있는 에러는 처리할 수 있습니다. 하지만 예상치 못한
     * 에러가 일어날 가능성은 여전한데, 예를 들어 부주의한 프로그래머가 email에 문제열이 아닌 어떤 것을 할당한다고 합시다. 지금대로라면,
     * 이전 예제의 함수는 email에 null, 숫자, 객체 등 문자열이 아닌 무언가가 들어온다면 에러를 일으킵니다. 프로그램은 앞뒤 설명 없이 멈춰버리겠죠.
     * 이렇게 예상치 못한 에러에 대처하려면 try...catch 문으로 코드 전체를 감쌀 수 있습니다. 
     */
    {
        const validateEmail = email => email.match(/@/) ? email : new Error(`invalid email: ${email}`);

        const email = null;

        try {
            const validatedEmail = validateEmail(email);
            if (validatedEmail instanceof Error) {
                console.error(`Error: ${validatedEmail.message}`);
            } else {
                console.log(`Valid email: ${validatedEmail}`);
            }
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    }

    /**
     * 에러 일으키기
     * 
     * 자바스크립트가 에러를 일으키기만 기다릴 필요 없이 직접 에러를 일으켜서(throw, raise) 예외 처리 작업을 시작할 수도 있습니다.
     * 
     * 예외 처리 기능이 있는 다른 언어와는 달리, 자바스크립트는 에러를 일으킬 때 꼭 객체만이 아니라 숫자나 문자열 등 어떤 값이든 catch 절에 넘길 수
     * 있습니다. 하지만 Error 인스턴스를 넘기는 것이 가장 편리합니다.
     * 
     * 은행 애플리케이션에 사용할 현금 인출 기능을 만든다고 생각해 봅시다. 계좌의 잔고가(balance)가 요청받은 금액보다 적다면 예외를 일으켜야 할 겁니다.
     * (현금 인출 단계에 들어가기 전에 잔고를 먼저 체크하는게 당연하므로, 잔고가 부족한 건 예외적인 상황입니다.) 
     */
    {
        const billPay = (amount, payee, account) => {
            if (amount > account.balance)
                throw new Error('insufficient funds');
            account.transfer(payee, amount);
        };

        // throw를 호출하면 현재 함수는 즉시 실행을 멈춥니다. 따라서 위 예제에서는 account.transfer가 호출되지 않으므로 잔고가 부족한데도 현금을 찾아가는
        // 사고는 발생하지 않습니다.
    }

    /**
     * 예외 처리와 호출 스택
     * 
     * 프로그램이 함수를 호출하고, 그 함수는 다른 함수를 호출하고, 호출된 함수는 또 다른 함수를 호출하는 일이 반복됩니다. 자바스크립트 인터프리터는 이런 과정을
     * 모두 추적하고 있어야 합니다. 함수 a가 함수 b를 호출하고 함수 b는 함수 c를 호출한다면, 함수 c가 실행을 마칠 때 실행 흐름은 함수 b로 돌아갑니다. 그리고
     * b가 실행을 마칠 때 실행 흐름은 함수 a로 돌아갑니다. 바꿔 말해, c가 실행 중일 때는 a와 b는 완료 될 수 없습니다. 이렇게 완료되지 않은 함수가 쌓이는 것을
     * 호출 스택(call stack)이라 부릅니다.
     * 
     * 에러는 캐치될 때까지 호출 스택을 따라 올라갑니다.
     * 
     * 에러는 호출 스택 어디에서든 캐치할 수 있습니다. 어디에서 이 에러를 캐치하지 않으면 자바스크립트 인터프리터는 프로그램을 멈춥니다. 이런것을 처리하지 않은
     * (unhandled) 예외, 캐치하지 않은(uncaught) 예외라고 부르며 프로그램이 충돌하는 원인이 됩니다. 에러가 일어날 수 있는 곳은 정말 다양하므로 가능한
     * 에러를 모두 캐치하기는 정말 어렵습니다.
     * 
     * 에러를 캐치하면 호출 스택에서 문제 해결에 유용한 정보를 얻을 수 있습니다. 예를 들어 함수 c에서 에러가 일어났다면, 호출 스택은 c에서 일어난 에러를 보고하는
     * 데 그치지 않고 b가 c를 호출했으며 b는 a에서 호출했다는 것도 함께 알려줍니다. 프로그램 여기저기에서 함수 c를 호출할 수 있으므로 이런 정보는 디버그에 유용하게
     * 쓸 수 있습니다.
     * 
     * 대부분의 자바스크립트 환경에서 Error 인스턴스에는 스택을 문자열로 표현한 stack 프로퍼티가 있습니다. 이 기능은 자바스크립트 표준은 아니지만 대부분의 환경에서
     * 지원합니다.
     */
    {
        const a = () => {
            console.log('a: calling b');
            b();
        };
        const b = () => {
            console.log('b: calling c');
            c();
            console.log('b: done');
        };
        const c = () => {
            console.log('c: throwing error');
            throw new Error('c error');
            console.log('c: done');
        };
        const d = () => {
            console.log('d: calling c');
            c();
            console.log('d: done');
        };

        try {
            a();
        } catch (err) {
            console.log(err.stack);
        }

        try {
            d();
        } catch (err) {
            console.log(err.stack);
        }
    }

    /**
     * try...catch...finally
     * 
     * try 블록의 코드가 HTTP 연결이나 파일 같은 일종의 '자원'을 처리할 때가 있습니다. 프로그램에서 이 자원을 계속 가지고 있을 수는 없으므로 에러가 있든 없든
     * 어느 시점에서는 이 자원을 해제해야 합니다. try 블록에는 문을 원하는 만큼 쓸 수 있고, 그중 어디서든 에러가 일어나서 자원을 해제할 기회가 아예 사라질 수도
     * 있으므로 try 블록에서 자원을 해제하는 건 안전하지 않습니다. 이런 상황에서 finally 블록이 필요합니다. finally 블록은 에러가 일어나든, 일어나지 않든
     * 반드시 호출 됩니다.
     */
    {
        try {
            console.log('this line is executed...');
            throw new Error('whoops');
            console.log('this line is not...');
        } catch (err) {
            console.log('there was an error...');
        } finally {
            console.log('...always executed');
            console.log('perform cleanup here');
        }
    }

    /**
     * 요약
     * 
     * 에외 처리에는 비용이 필요합니다. 예외를 캐치하지 못하는 위험도 있고 예외 처리 자체도 대가를 지불해야 하는 연산입니다. 예외는 catch 블록을 만날 때까지
     * 스택을 거슬러 올라가야 하므로 자바스크립트 인터프리터가 예외를 계속 추적하고 있어야 합니다. 이런 비용은 큰 문제가 되지 않을 수도 있지만, 자주 실행되는
     * 코드에서 예외를 발생시키면 성능 문제가 발생할 가능성이 있습니다.
     * 
     * 프로그램을 일부러 멈추려 하는 게 아니라면, 예외를 일으켰으면 반드시 캐치해야합니다. 원인 없는 결과는 없는 법입니다. 예외 처리는 예상할 수 없는 상황에 
     * 대바한 마지노선으로 생각하고, 예상할 수 있는 에러는 조건문으로 처리하는 것이 최선입니다.
     */

})();