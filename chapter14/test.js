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
        function f() {
            console.log('After timeout: ' + new Date());
        }
        setTimeout(f, 60 * 1000);
        console.log('I happen after setTimeout!');
        console.log('Me too!');
    }

})();