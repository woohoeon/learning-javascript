/**
 * crown-and-anchor.js
 * 크라운 앤 앵커 게임
 * 
 * extract code from a learning javascirpt book
 * 소스코드는 러닝자바스크립트 책의 내용을 참조하였습니다.
 */

const _face = ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'];
let _bets, _funds, _round, _totalBet;

const $containerReady = $('#container-ready'),
    $containerMain = $('#container-main'),
    $startBtn = $containerReady.find('#startBtn'),
    $bettingBtn = $containerMain.find('#bettingBtn'),
    $fundsDiv = $containerMain.find('#funds'),
    $roundDiv = $containerMain.find('#round'),
    $totalBetDiv = $containerMain.find('#totalBet'),
    $crownDiv = $containerMain.find('#crown'),
    $anchorDiv = $containerMain.find('#anchor'),
    $heartDiv = $containerMain.find('#heart'),
    $spadeDiv = $containerMain.find('#spade'),
    $clubDiv = $containerMain.find('#club'),
    $diamondDiv = $containerMain.find('#diamond');


/**
 * m이상 n이하의 무작위 정수를 반환합니다.
 * 
 * @param {number} m
 * @param {number} n
 */
const _rand = (m, n) => m + Math.floor((n - m + 1) * Math.random());

/**
 * 크라운 앤 앵커 게임의 여섯 가지 도형 중 하나를 무작위 반환합니다.
 */
const _randFace = () => _face[_rand(0, 5)];

/**
 * 배팅합니다.
 */
const _betting = face => {
    if (_funds < 1) return;
    ++_totalBet;
    _bets[face] = _bets[face] + 1;
    --_funds;
    _setFunds();
    _setTotalBet();
    _setBadge(face);
    console.log(Object.keys(_bets).map(_face => `${_face}: ${_bets[_face]} pencs`).join(', ') + `(total: ${_totalBet} pencs)`);
};

/**
 * 주사위를 굴립니다.
 * 
 * @returns {array}
 */
const _rollTheDice = () => {
    const hand = [];
    for (let i = 0; i < 3; i++) {
        const face = _randFace();
        hand.push(face);
        _showDice(face, i);
    }
    console.log(`hand: ${hand.join(', ')}`);

    return hand;
};

const _setBadge = face => {
    $containerMain.find('#' + face).find('.badge').html(_bets[face]);
};

const _initBadge = () => {
    $containerMain.find('.badge').empty();
};

/**
 * 주사위를 보여줍니다.
 * 
 * @param {string} face 
 * @param {number} i 
 */
const _showDice = (face, i) => {
    let str;
    if (face === _face[0]) {
        str = '👑';
    } else if (face === _face[1]) {
        str = '️⚓️️️️';
    } else if (face === _face[2]) {
        str = '️❤️';
    } else if (face === _face[3]) {
        str = '️️♠️';
    } else if (face === _face[4]) {
        str = '☘️';
    } else if (face === _face[5]) {
        str = '🔶';
    }
    $containerMain.find('#dice' + i).html(`<h1>${str}</h1>`);
};

/**
 * 딴 돈을 가져옵니다.
 * 
 * @param {Object} bets 
 * @param {array} hand 
 */
const _checkWinnings = (bets, hand) => {
    let winnings = 0;
    for (let die = 0, len = hand.length; die < len; die++) {
        let face = hand[die];
        if (bets[face] > 0) winnings = winnings + bets[face];
    }
    _funds = _funds + winnings;
    _setFunds();
    _setRound();
    _initBets();
    _showWinnings(winnings);
    console.log(`winnings: ${winnings}`);
};

/**
 * 딴 돈을 표시합니다.
 * 
 * @param {number} winnings 
 */
const _showWinnings = winnings => {
    if (winnings) {
        $containerMain.find('#winnings').html(winnings);
        $containerMain.find('.winnings-wapper').show().css('display', 'flex');
    } else {
        $containerMain.find('.winnings-wapper').hide();
    }
};

/**
 * 게임을 시작합니다.
 */
const _play = () => {
    _round++;
    console.log(`round ${_round}:`);
    console.log(`starting funds: ${_funds}p`);
    const hand = _rollTheDice();
    _checkWinnings(_bets, hand);
};

/**
 * Start button handler
 */
const _startHandler = () => {
    $('#container-ready').slideUp('fast');
    $('#container-main').show();
    _init();
};

/**
 * Betting button handler
 */
const _bettingHandler = () => {
    if (_funds > 0) _play();
    else _end();
};

/**
 * Event bind
 */
const _bind = () => {
    $startBtn.on('click', _startHandler);
    $bettingBtn.on('click', _bettingHandler);
    $crownDiv.on('click', () => { _betting(_face[0]); });
    $anchorDiv.on('click', () => { _betting(_face[1]); });
    $heartDiv.on('click', () => { _betting(_face[2]); });
    $spadeDiv.on('click', () => { _betting(_face[3]); });
    $clubDiv.on('click', () => { _betting(_face[4]); });
    $diamondDiv.on('click', () => { _betting(_face[5]); });
};

/**
 * 게임을 초기화 합니다.
 */
const _init = () => {
    _funds = 50;
    _round = 1;
    _initBets();
    _setFunds();
    _setRound();
};

/**
 * 베팅을 초기화 합니다.
 */
const _initBets = () => {
    _totalBet = 0;
    _bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
    _setTotalBet();
    _initBadge();
};

const _setFunds = () => {
    $fundsDiv.html(_funds);
};

const _setRound = () => {
    $roundDiv.html(_round);
};

const _setTotalBet = () => {
    $totalBetDiv.html(_totalBet);
};

/**
 * 게임을 끝냅니다.
 */
const _end = () => {
    $bettingBtn.hide();
    console.log(`ending funds: ${_funds}`);
};

(() => {
    _bind();
})();