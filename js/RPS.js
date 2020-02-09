// アニメーション時使用変数
var signTx1 = $(".signal__txt1");
var signTx2 = $(".signal__txt2");
var signTx3 = $(".signal__txt3");
var cntTx3 = $(".count__txt3");
var cntTx2 = $(".count__txt2");
var cntTx1 = $(".count__txt1");
// 相手の手が決まっているかどうかの判別用フラグ
var handDecision = false;
// あいこ判別用フラグ
var sameHand = localStorage.getItem("sameHand");
// ヒント用変数
var hintCnt = localStorage.getItem("hint");

// 自分の手の変数 時間切れでnullを渡す為、代入なし
var myHand;
var opponentHand;
const opponentHandList = [0, 3, 1, 2];

// テキストとアイコンを非表示にする関数
function gameOver() {
  cntTx3.animate({ opacity: 0 }, { duration: 500 });
  cntTx2.animate({ opacity: 0 }, { duration: 500 });
  cntTx1.animate({ opacity: 0 }, { duration: 500 });
  $(".input__list").animate({ opacity: 0 }, { duration: 500 });
}

// 勝敗判定関数
function decision(myHand) {
  // 時間切れの場合は負け
  if (myHand == null) {
    sameHand = false;
    localStorage.setItem("sameHand", sameHand);
    alert("後出し！あなたの負け！！");
    again();
  } else {
    // デバッグ時強制あいこ用
    // myHand = opponentHand;

    // 判定に使う値を算出
    var decisionValue = (myHand - opponentHand + 3) % 3;

    // 結果判定
    // 『あいこ』の際はブラウザをリロード
    if (decisionValue == 2) {
      sameHand = false;
      localStorage.setItem("sameHand", sameHand);
      alert("あなたの勝利！！");
      again();
    } else if (decisionValue == 1) {
      sameHand = false;
      hintCnt++;
      localStorage.setItem("hint", hintCnt);
      hintShow();
      localStorage.setItem("sameHand", sameHand);
      alert("あなたの負け...");

      again();
    } else if (decisionValue == 0) {
      console.log(sameHand);
      alert("あいこで、");
      sameHand = true;
      localStorage.setItem("sameHand", sameHand);
      window.location.reload();
    }
  }
}

// 新規ゲーム時初期設定関数
function initNewGame() {
  $(".signal__txt1").css("display", "inline");
  $(".start").css("display", "none");
}

// あいこ時初期設定関数
function initSameHand() {
  $(".signal__txt3").css("display", "inline");
  sameHand = false;
  localStorage.setItem("sameHand", sameHand);
}

// もう一回やるかどうか関数
function again() {
  var onceAgain = confirm("もう一度勝負？");
  if (onceAgain) {
    window.location.reload();
  }
  gameOver();
}

// ヒント表示関数
function hintShow() {
  if (hintCnt >= 3) {
    console.log("勝つにはギリギリで手を変える必要あり！");
  }
}

// 掛声アニメーション 最初はグー
function animateVoice1() {
  signTx1
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}

// 掛声アニメーション ジャンケン
function animateVoice2() {
  $(".signal__txt2").css("display", "inline");
  signTx2
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}

// 掛声アニメーション あいこで
function animateVoice3() {
  // あいこアニメーション用に初期化
  initSameHand();
  signTx3
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}

// ボタンアイコンアニメーション
function animateIcon() {
  // ボタンアイコン表示
  $(".input__list").animate({ opacity: 1 }, { duration: 500 });
  // ボタンアイコンムーブ
  $(".rock").css({ transform: "translate(0, 0)" });
  $(".scissors").css({ transform: "translate(0, 0)" });
  $(".paper").css({ transform: "translate(0, 0)" });
}

// カウントダウン
function animateCntdwn3() {
  $(".count__txt3").css("display", "inline");
  cntTx3
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}
function animateCntdwn2() {
  $(".count__txt2").css("display", "inline");
  cntTx2
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}
function animateCntdwn1() {
  $(".count__txt1").css("display", "inline");
  cntTx1
    .animate({ fontSize: 0 }, { duration: 1500, queue: false })
    .animate({ opacity: 0 }, { duration: 1200 });
}

//////////////////////
// 遅延実行
//////////////////////
const wait = sec => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000);
  });
};

//////////////////////
// アニメーション
//////////////////////
// 最初はグー始まり
async function animOrdinary() {
  try {
    //秒数と、関数を渡す
    await wait(0, initNewGame());
    await wait(1, animateVoice1());
    await wait(1, animateVoice2());
    await wait(1, animateIcon());
    await wait(1, animateCntdwn3());
    await wait(1, animateCntdwn2());
    await wait(1, animateCntdwn1());
    await wait(3, decision(myHand));
  } catch (err) {
    console.error(err);
  }
}
// あいこで始まり
async function animSameHand() {
  try {
    //秒数と、関数を渡す
    await wait(0, initSameHand());
    await wait(1, animateVoice3());
    await wait(1, animateIcon());
    await wait(1, animateCntdwn3());
    await wait(1, animateCntdwn2());
    await wait(1, animateCntdwn1());
    await wait(3, decision(myHand));
  } catch (err) {
    console.error(err);
  }
}

// main() -----------------------------------------------------------
if (sameHand == "false") {
  animOrdinary();
} else if (sameHand == "true") {
  animSameHand();
}

// ボタンアイコン入力イベント--------------------------------------------
$(".btn").on("click", function() {
  var decisionTime = $(cntTx1).css("opacity");
  // 自分の手を押されたボタンに決定
  // 相手の手を自分の手に勝つ手に決定
  if (handDecision == false) {
    myHand = $(this).attr("id");
    opponentHand = opponentHandList[myHand];
    handDecision = true;
  }
  if (decisionTime <= 0.5) {
    myHand = $(this).attr("id");
  }
  // console.log(myHand, opponentHand);
  // 選択している物をわかりやすく
  $(".btn").css("background-color", "transparent");
  $(".btn").css("opacity", "1");
  $(this).css("background-color", "red");
  $(this).css("opacity", "0.6");
});
