jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ローディング画面
  let webStorage = function () {
    if (sessionStorage.getItem("access")) {
      // ローディング非表示;
      $(".js-loader").hide();
    } else {
      // 初回アクセス時の処理;
      sessionStorage.setItem("access", 0);

      $(window).on("load", function () {
        $("body").addClass("is-fixed");
        setTimeout(function () {
          $(".loader__title--green").addClass("is-active");
        }, 0);
        setTimeout(function () {
          $(".loader__left").addClass("is-active");
        }, 500);
        setTimeout(function () {
          $(".loader__right").addClass("is-active");
        }, 580);
        setTimeout(function () {
          $(".loader__title").addClass("is-active");
        }, 1200);
      });

      $(".loader__title").on("animationend", function () {
        setTimeout(function () {
          $(".js-loader").animate({ opacity: 0 }, 300, function () {
            $("body").removeClass("is-fixed");
            $(this).remove();
          });
        }, 300);
      });
    }
  };
  webStorage();

  // ドロワーメニュー
  let scrollTop = 0;

  $(".js-hamburger, .js-sp-nav").click(function () {
    $(".js-hamburger,.js-sp-nav").toggleClass("is-active");
    if ($("body").hasClass("is-fixed")) {
      // スクロール開放
      $("body").removeClass("is-fixed");
      window.scrollTo(0, scrollTop);
    } else {
      // スクロール禁止
      scrollTop = $(window).scrollTop();
      $("body").addClass("is-fixed");
    }
  });

  $(window).resize(function () {
    if ($(window).width() >= 768) {
      if ($(".js-hamburger").hasClass("is-active")) {
        // スクロール開放
        $("body").css("top", "");
        $("body").removeClass("is-fixed");
        window.scrollTo(0, scrollTop);
        $(".js-hamburger").removeClass("is-active");
        $(".js-sp-nav").fadeOut();
      }
    }
  });

  //トップに戻るボタン
  var topBtn = $(".js-totop");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    var windowHeight = $(this).height();
    var bodyHeight = $(document).height();

    // フッターの高さを動的に取得
    var footerHeight = $(".footer").outerHeight() + 16;

    if (scrollPosition > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }

    // フッター手前でボタンを止める
    if (bodyHeight - scrollPosition <= windowHeight + footerHeight) {
      topBtn.css({ position: "absolute", bottom: footerHeight + "px" });
    } else {
      topBtn.css({ position: "fixed", bottom: "0px" });
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

  // メインビュースライダー
  const mvSwiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 1500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // キャンペーンスライダー
  const campaignSwiper = new Swiper(".js-campaign-swiper", {
    loop: true,
    spaceBetween: 24,
    speed: 2000,
    width: 280,
    loopedSlides: 8,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
        width: 333,
      },
    },

    // 前後の矢印
    navigation: {
      nextEl: ".js-swiper-button-next",
      prevEl: ".js-swiper-button-prev",
    },
  });

  // 画像のインビュー
  let box = $(".js-colorbox"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });
});
