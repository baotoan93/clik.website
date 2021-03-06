var isInitFullPage, isShowDetail, isInitBanner;
var fsBannerConfig, fsBannerMobileConfig;

/* ===============  WoW Animations ========================== */
$(document).ready(function () {
  "use strict";

  if (detectMob()) {
    $("body").addClass("is-mobile");
  }

  $("section").height(window.innerHeight);

  // Extra small devices (portrait phones, less than 576px)
  if (window.innerWidth > 575) {
    $("#main").css("display", "block");
    initFullPageJs();
  } else {
    $("#mobile-main").height(window.innerHeight);
  }

  // the div must have the fsbanner class for styling,
  // init fs banner jquery.
  fsBannerConfig = $("#solutionOMOBanner").fsBanner({ trigger: "mouse" });
  fsBannerMobileConfig = $("#solutionMobileOMOBanner").fsBanner({
    trigger: "mouse",
  });
  if (window.innerWidth <= 575) {
    fsBannerMobileConfig.selectItem($("#defaultSelect"), 0);
  }
});

/* =================  window load =================  */

$(window).on("load", function () {
  /* ===============  WoW Animations ========================== */

  wow = new WOW();
  wow.init();

  $(".solution-btn").on("click", function () {
    var $target = $(this).attr("href");
    if ($target) {
      window.open($target);
    }
  });
});

$(window).resize(() => {
  setTimeout(() => {
    if (window.innerWidth > 575) {
      $("#main").css("display", "block");

      if (!isInitFullPage) {
        initFullPageJs();
      }
    } else {
      $("#mobile-main").height(window.innerHeight);
      $("#main").css("display", "none");
    }

    if (fsBannerConfig && fsBannerConfig) {
      fsBannerConfig.handleResize();
    }
  }, 300);
});

$(".nav-item.nav-link").on("click", function () {
  var $target = $(this).attr("href");
  $("body , html").animate(
    {
      scrollTop: $($target).position().top,
    },
    1000
  );
  $(".navbar-collapse").removeClass("show");
  $(".navbar-toggler svg").toggleClass("fa-times").toggleClass("fa-bars");
});

$(".navbar-toggler").on("click", function () {
  $(".navbar-toggler svg").toggleClass("fa-times").toggleClass("fa-bars");
});

function ChangeImage() {}

function changeImageMobile() {
  var src = document.getElementById("image-plan-pricing-mobile").src;
  var image = src.slice(-19);
  if (image === "mobile_standard.png") {
    document.getElementById("image-plan-pricing-mobile").src =
      "img-mobile/mobile_premium.png";
  } else {
    document.getElementById("image-plan-pricing-mobile").src =
      "img-mobile/mobile_standard.png";
  }
}

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function initFullPageJs() {
  if (!Object.values($("#main")).length) return;

  $("#main").fullpage({
    verticalCentered: true,
    autoScrolling: true,
    scrollHorizontally: true,
    navigationPosition: "left",
    anchors: [
      "anchor-home",
      "anchor-problems",
      "anchor-solutions",
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      { key: "anchor-solutions" },
      "anchor-actions",
      "anchor-case-study",
      "anchor-qna2",
    ],
    lockAnchors: true,
    navigation: true,

    slidesNavigation: false,
    loopHorizontal: false,
    onLeave: function (_, destination) {
      if (!isInitBanner && destination === 3) {
        fsBannerConfig.selectItem($("#defaultSelect"), 0);
        isInitBanner = true;
      }

      if (!isShowDetail) return;

      isShowDetail = false;
      if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling)
        $.fn.fullpage.setAllowScrolling(true);

      let parent = $("#solutions4");
      if (Object.values(parent).length) {
        parent.removeClass("show-detail");
      } else {
        $("body").removeClass("show-detail");
      }
    },
  });

  isInitFullPage = true;
}

function closeMenu() {
  $("body").removeClass("show-menu");
}

function openMenu() {
  $("body").addClass("show-menu");
}

function handleClickShowDetail(e) {
  isShowDetail = true;
  let parent = $(e).closest(".section");
  if (parent.length) parent.addClass("show-detail");

  if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
    $.fn.fullpage.setAllowScrolling(false);
    $("#fp-nav").addClass("d-none");
  }

  if (detectMob() && $(e).closest("body")) {
    parent = $(e).closest("body");
    if (parent.length) parent.addClass("show-detail");
  }
}

function handleClickCloseDetail(e) {
  isShowDetail = false;
  let parent = $(e).closest(".section");
  if (parent.length) parent.removeClass("show-detail");

  if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
    $.fn.fullpage.setAllowScrolling(true);
    $("#fp-nav").removeClass("d-none");
  }

  if (detectMob() && $(e).closest("body")) {
    parent = $(e).closest("body");
    if (parent.length) parent.removeClass("show-detail");
  }
}
