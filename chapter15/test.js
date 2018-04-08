/**
 * Chapter15
 * 
 * 날짜와 시간
 * 
 * 실무에서 사용하는 애플리케이션은 대부분 날짜와 시간에 관한 데이터를 사용합니다. 애석한 일이지만 자바 스크립트의 Date 객체는 잘 설계됐다고 말하기는
 * 힘듭니다. 자바스크립트에서 제공하는 Date 객체의 기능이 불충분하니, 이 장에서는 Moment.js를 소개하려고 합니다.
 * Moment.js는 날짜와 시간에 관련된 널리 쓰이는 기능을 대부분 제공합니다.
 * 
 * 자바스크립트의 Date 객체는 원래 넷스케이프 프로그래머 켄 스미스(Ken Smith)가 만들었는데, 사실 자바의 java.util.Date을 가져온 것이나 다름없습
 * 니다. 따라서 자바스크립트와 자바가 아무 상관도 없다는 말은 사실이 아닙니다. 누군가가 당신에게 두 언어의 관계를 묻는다면 "음... Date 객체는 거의 비슷
 * 하고, 둘 다 C 언어의 문법을 이어받았죠. 그 외에는 공통점이 별로 없어요."라고 대답하면 될 겁니다.
 * 
 * '날짜와 시간'이라고 계속 말하기는 번거로우니, 이 장에서 '날짜'라고 하면 날짜와 시간을 말하는 겁니다. 시간을 명기하지 않고 날짜만 말하면, 그날의 정오라
 * 고 생각하면 됩니다.
 */
(() => {

    /**
     * 날짜, 타임존, 타임스탬프, 유닉스 시간
     * 
     * 까놓고 말해, 우리가 쓰는 그레고리안 달력은 형편없습니다. 지나치게 복잡하고, 시간을 나누는 기준도 모호한 데다가 윤년까지 있습니다. 타임존은 한술 더
     * 뜨죠. 하지만 현실이 그러니 어쩔 수 없이 적응해야 합니다.
     * 
     * 자바스크립트에서 Date 인스턴스는 모두 유닉스 시간 원점(Unix Epoch)으로부터 몇 밀리초가 지났는지 나타내는 숫자입니다. 자바스크립트는 보통 이 숫
     * 자를 사람이 읽기 편한 그레고리력 날짜로 변환합니다. 숫자형 표현이 필요하면 valueOf() 메서드를 쓰면 됩니다.
     */
    {
        const d = new Date();
        console.log(d);
        console.log(d.valueOf());
    }

    /**
     * Date 객체 만들기
     * 
     * Date 객체는 네 가지 방법으로 만들 수 있습니다. 바로 앞에서 사용한 것처럼 매개변수 없이 호출하면 날짜에 해당하는 Date 객체를 반환합니다. 문자열을
     * 제공하면 자바스크립트는 그 문자열을 해석해서 그에 맞는 날짜를 반환하려 합니다. 숫자를 넣으면 유닉스 타임스태프로 해석합니다. 예제를 보십시오.
     */
    {
        // 아래 결과는 해당 지역의 표준시에 따라 다를 수 있습니다.
        console.log(new Date()); // 현재 날짜

        // 자바스크립트의 월은 0으로 시작합니다. 즉 0은 1월이고, 1은 2월입니다.
        console.log(new Date(2015, 1, 14, 13, 30, 5, 500)); // 2015년 2월 14일 오후 1시 30분 5.5초

        // 유닉스 타임스탬프로 날짜 생성
        console.log(new Date(0)); // 12:00 A.M., Jan 1, 1970 UTC

        // 유닉스 시간 원점 이전의 날짜를 구할 때
        console.log(new Date(-365 * 24 * 60 * 60 * 1000));

        // 날짜 문자열 해석 (표준시를 기준으로 합니다.)
        console.log(new Date('June 14, 1903'));
        console.log(new Date('June 14, 1903 GMT-0000'));

        // 예제를 테스트해보면 결과가 항상 현재 지역의 표준시에 따라 나온다는 사실을 알게 될겁니다.
        // 자바스크립트는 원래 브라우저 기반 스크립트 언어이니 어쩌면 이렇게 하는 편이 올바른 일이 었을 겁니다.
        // 웹페이지에서 날짜 관련 데이터를 표시한다면 사용자의 타임존에 맞게 표시하는 편이 나을 테니까요. 하지만 인터넷은 전 세계 어디에서든 쓰이고, 노드가
        // 자바스크립트를 서버로 가져감에 따라 타임존을 더 일관되게 처리할 방법이 필요해졌습니다.
    }

})();