/**
 * Chapter 17
 * 
 * 정규표현식
 * 
 * 정규표현식(regular expression)은 정교한 문자열 매칭 기능을 제공합니다. 이메일 주소나 URL, 전화번호처럼 보이는 문자열을 찾고 싶다면
 * 정규표현식에 익숙해져야 합니다. 문자열 매칭을 하다보면 자연스레 문자열 교체도 자주 하게 되는데, 정규표현식에는 문자열 교체에 필요한 기능도
 * 들어 있습니다. 예를 들어 이메일 주소처럼 보이는 문자열을 찾아 그 주소를 가리키는 하이퍼링크로 바꿀 수 있습니다.
 */
(() => {

    /**
     * 부분 문자열 검색과 대체
     * 
     * 정규식으로 하는 일은 결국 문자열 속에서 부분 문자열을 찾는 일이며 찾은 부분을 교체할 때도 있습니다. 정규식이 제공하는 기능은 대단히 유연
     * 하고 강력하지만 그 만큼 방대합니다. 따라서 본격적으로 시작하기 전에, 정규식을 쓰지 않고 검색하고 교체하는 방법을 간단히 살펴 봅시다.
     * String.prototype 메서드의 검색과 교체 기능에는 한계가 있지만, 그 한계 안에서는 충분히 쓸만합니다.
     * 
     * 큰 문자열 안에 원하는 부분 문자열이 존대하는지 찾기만 하면 될 때는 다음 String.prototype 메서드로 충분합니다.
     */
    {
        const input = 'As I was going to Saint Ives';
        console.log(input.startsWith('As')); // true
        console.log(input.endsWith('Ives')); // true
        console.log(input.startsWith('going', 9)); // true -- 인덱스 9에서 시작합니다.
        console.log(input.endsWith('going', 14)); // true -- 인덱스 14를 문자열의 끝으로 간주합니다.
        console.log(input.includes('going')); // true
        console.log(input.includes('going', 10)); // false -- 인덱스 10에서 시작하면 going이 없습니다.
        console.log(input.indexOf('going')); // 9
        console.log(input.indexOf('going', 10)); // -1
        console.log(input.indexOf('nope')); // -1

        // 이들 메서드는 모두 대소문자를 구분합니다. 따라서 input.startWith('as')는 false입니다.
        // 대소문자를 구분하지 않고 비교하려면 소문자로 바꿔서 비교하면 됩니다.
        console.log(input.toLocaleLowerCase().startsWith('as')); // true

        // String.prototype.toLowerCase는 원래 문자열은 그대로 두고 새 문자열을 반환합니다. 자바스크립트의 문자열은 항상 불변입니다.

        // 한 단계 더 나가서 부분 문자열을 찾아 교체하려면 String.prototype.replace를 사용합니다.
        const output = input.replace('going', 'walking');
        console.log(output);
    }

    /**
     * 정규식 만들기
     * 
     * 복잡한 정규식 메타 언어를 공부하기 전에 먼저 자바스크립트에서 정규식을 어떻게 만들고 사용하는지 알아봅시다. 바로 앞 예제처럼 특정 문자열을
     * 검색하는 것 부터 시작합시다.
     * 
     * 자바스크립트의 정규식은 RegExp 클래스입니다. RegExp 생성자로도 정규식을 만들 수 있지만 간편한 리터럴 문법도 있습니다. 정규식 리터럴
     * 은 슬래시로 감싼 형태입니다.
     */
    {
        const re1 = /going/; // 단어 "going"을 찾을 수 있는 정규식
        const re2 = new RegExp('going'); // 생성자를 사용했지만 결과는 같습니다.

        // RegExp 생성자를 써야 할 때가 있는데, 그 경우는 이 장 후반에서 알아볼 겁니다. 그런 특수한 경우를 제외하면 더 간편한 리터럴 문법을 써야
        // 합니다.
    }

    /**
     * 정규식 검색
     * 
     * 정규식이 만들어지면 다양한 옵션으로 문자열을 검색할 수 있습니다.
     * 
     * 정규식의 문자열 교체 옵션에 대해 이해하려면 정규식 메타 언어에 대해 좀 알아야 하는데, 정적인 문자열을 예제로 사용한다면 좀 지루할 겁니다.
     * 예제로 사용할 정규식은 /\w{3,}/ig입니다. 이 정규식은 세 글자 이상인 단어에 모두 일치하고, 대소문자는 가리지 않습니다. 당장 이해하지 않아
     * 도 괜찮습니다. 이 장을 진행하다 보면 자연히 알게 될 겁니다. 먼저 검색하는 방법을 알아봅시다.
     */
    {
        const input = 'As I was going to Saint Ives';
        const re = /\w{3,}/ig;

        // 문자열(input)의 메서드를 사용할 때
        console.log(input.match(re)); // ["was", "going", "Saint", "Ives"]
        console.log(input.search(re)); // 5 (세 글자 이상으로 이루어진 첫 단어의 인덱스는 5입니다.)

        // 정규식(re)의 메서드를 사용할 때
        console.log(re.exec(input)); // ["was"] (처음 일치하는 것)
        console.log(re.exec(input)); // ["going"] (exec는 마지막 위치를 '기억'합니다.)
        console.log(re.exec(input)); // ["Saint"]
        console.log(re.exec(input)); // ["Ives"]
        console.log(re.exec(input)); // null -- 일치하는 것이 더는 없습니다.
        console.log(re.test(input)); // true (input에는 세 글자 이상으로 이루어진 단어가 한 개 이상 있습니다.)

        // 위 예제는 모두 정규식 리터럴을 그대로 써도 됩니다.
        console.log(input.match(/\w{3,}/ig));
        console.log(input.search(/\w{3,}/ig));
        console.log(/\w{3,}/ig.test(input));
        console.log(/\w{3,}/ig.exec(input));
        // ...

        // 이중 가장 많은 정보를 제공하는 것은 RegExp.prototype.exec 메서드지만, 현실적으로는 아마 가장 적게 쓰는 메서드 일 겁니다. 필자
        // String.prototype.match와 RegExp.prototype.test를 가장 자주 쓰는 편입니다.
    }

    /**
     * 정규식을 사용한 문자열 교체
     * 
     * String.prototype.replace 메서드에도 정규식을 쓸 수 있습니다. 정규식을 쓰면 더 여러 가지 일을 할 수 있습니다. 간단한 것부터 시작 합
     * 시다. 네 글자 이상으로 이루어진 단어를 모두 교체 하겠습니다.
     */
    {
        const input = 'As I was going to Saint Ives';
        const output = input.replace(/\w{4,}/ig, '****');
        console.log(output); // "As I was **** to  **** ****"
    }

    /**
     * 입력 소비
     * 
     * 정규식을 '큰 문자열에서 부분 문자열을 찾는 방법'이라고만 생각해서는 안됩니다. 문론 원하는 것이 그것일 수도 있겠지만, 그런 사고방식이 굳
     * 어지면 정규식의 근본적인 성격을 이해하지 못하게 되고 할 수 있는 일도 제한됩니다.
     * 좀 더 나은 개념은 정규식이 '입력 문자열을 소비하는 패턴'이라고 생각하는 겁니다. 찾아낸 부분 문자열은 그렇게 소비한 결과 만들어진 부산물
     * 입니다.
     * 
     * 정규식 메타 언어에 대해 살펴보기 전에, 정규식이 문자열을 '소비'할 때 사용하는 알고리즘을 간단히 살펴봅시다.
     * * 문자열 왼쪽에서 오른쪽으로 진행합니다.
     * * 일단 소비한 글자에 다시 돌아오는 일은 업습니다.
     * * 한 번에 한 글자씩 움직이며 일치하는 것이 있는지 확인합니다.
     * * 일치하는 것을 찾으면 해당하는 글자를 한꺼번에 소비한 후 다음 글자로 진행합니다(정규식에 /g 플러그를 써서 전역으로 검색할 때에 해당)
     *    합니다. 다시 설명합니다.).
     * 
     * 이것은 일반적인 부분만 훑어본 것이고, 당연히 이것보다 세밀한 알고리즘이 존재합니다. 예를 들어 일치하는 것이 없다고 판단하고 일찍 포기
     * 하는 알고리즘도 있습니다.(성능이 개선됩니다.)
     * 정규식 메타 언어에 대해 설명할 때도 이 알고리즘을 계속 염두에 두십시오. 왼쪽에서 오른쪽으로 진행하면서 한 번에 한 글자씩 소비하고, 일치
     * 하는 것을 찾으면 그 전체를 즉시 소비합니다.
     */

    /**
     * 대체
     * 
     * HTML 페이지를 문자열에 담았다고 합시다. 이 문자열에서 외부 자원을 가리키는 태고, 즉 <a>, <area>, <link>, <script>, <source>
     * <meta>를 모두 찾고 싶습니다. 이 문자열에는 태그의 대소문자가 통일되지 않아서 <Area>, <LINK> 같은 태그도 있습니다. 어떻게 찾아야
     * 할까요? 정규식에서는 대체를 통해 이런 문제를 해결합니다.
     * 
     */
    {
        const html = 'HTML with <a href="/one">one link</a>, and some JavaScript.<script src="stuff.js">';
        const matches = html.match(/area|a|link|script|source/ig); // 첫 시도
        console.log(matches);

        // 위 예제의 파이프(|)는 대체를 뜻하는 메타 문자입니다. ig는 대소문자를 가리지 않고(i) 전체를 (g) 검색하라는 뜻입니다. g플래그가 없으면
        // 일치하는 것 중 첫 번째만 반환합니다. 즉, 위의 정규식을 풀어 읽으면 '텍스트에서 area, a, link, script, source를 대소문자를 가리지 않
        // 고 모두 찾으라'라는 뜻입니다. 그런데 area를 a보다 먼저 쓴 이유는 무엇일까요? 그건 정규식이 왼쪽에서 오른쪽으로 평가하기 때문입니다.
        // a를 area보다 먼저 썼다면, 텍스트 안에 area가 있더라도 a를 먼저 소비하므로 남는 rea는 어느 것에도 일치하지 않습니다. 따라서 이렇게
        // 겹치는 것이 있을 때는 더 큰 것을 먼저 써야 합니다. 작은 것을 먼저 쓰면 큰 것은 절때 찾을 수 없습니다.
    }

    /**
     * HTML 찾기
     * 
     * 정규식으로먼 HTML을 분석(parse)할 수 없습니다. 무언가를 분석하려면 각 부분을 구성 요소로 완전히 분해 할 수 있어야 합니다. 정규식은
     * 아주 간단한 언어만 분석할 수 있습니다. 물론 정규식을 써서 복잡한 언어를 분석하는 사례가 자주 있지만, 정규식의 한계를 이해하고 상황에 따라
     * 더 알맞은 방법을 찾아야 합니다. 정규식을 HTML에 유용하게 쓸 수 있는 것은 사실이지만 완벽하게 분석하는 것은 불가능합니다. 정규식을 어떻
     * 게 만들은 분석할 수 없는 HTML이 항상 존재합니다. 100% 동작하는 것이 필요하다면 전용 파서를 찾아야 할 겁니다. 다음 예제를 보십시오.
     */
    {
        const html = '<br> [!CDMA[[<br>]]';
        const matches = html.match(/<br>/ig);
        console.log(matches);

        // 이 정규식은 두 번 일치하지만, 이 예제에서 진찌 <br> 태그는 하나뿐 입니다. 다른 하나는 HTML이 아닌 글자 데이터 입니다.
        // 다시 말하지만, 정규식은 HTML처럼 매우 복잡한 것을 검색하기에는 알맞지 않습니다.
    }

})();