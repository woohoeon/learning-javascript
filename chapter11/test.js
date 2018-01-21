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
            console.log(`Error: ${validatedEmail.message}`);
        } else {
            console.log(`Valid emil: ${validatedEmail}`);
        }

        // 이 방법도 Error 인스턴스를 활용하는 유효하고 유용한 방법이긴 하지만, Error 인스턴스는 예외 처리에서 더 자주 사용됩니다.
    }

    /**
     * try/catch와 예외처리
     */
    {

    }

})();