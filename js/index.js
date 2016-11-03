$('.slider').each(function() {
  var $this = $(this);/*slider_group의 부모요소?*/
  var $group = $this.find('.slide_group');/*find-찾은 요소에서 특정 자식요소만 찾기 :  .find("선택자") this의 자식요소인 slide_group을 선언 */
  var $slides = $this.find('.slide');
  var bulletArray = [];/*원 버튼 배열*/
  var currentIndex = 0;/*현재페이지? 0 인덱스값*/
  var timeout;/*시간 변수*/
    
  /*이동했을때 값*/
  function move(newIndex) {
    var animateLeft, slideLeft;/*왼쪽 슬라이더 변수선언*/
    
    advance();/*2번째 이후에 자동슬라이더*/
    
    
    /*원 버튼 오버시 색상*/
    bulletArray[currentIndex].removeClass('active');/* bulletArray[0]. 클래스 제거*/
    bulletArray[newIndex].addClass('active');/*left,right 버튼을 눌렀을 때 active클래스 추가(활성화)*/
    /*만약 0인덱스 값 보다 값이 클경우(눌렀을 경우) : sliderLeft가 100%라면 animateLeft -100%*/
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {/*아닐경우 slideLeft -100%일때 animateLeft 100% 만큼 이동 */
      slideLeft = '-100%';
      animateLeft = '100%';
    }/*슬라이더 이동 100%*/

    $slides.eq(newIndex).css({/*slide(4개)들을 */
        display: 'block', 
        left: slideLeft /*eq(인덱스번호)css중에 left는 slideLeft인 100% */
    });
    $group.animate({/*눌러서 애니메이션을 실행할때 함수를 실행해라*/
      left: animateLeft/*left는 animateLeft -100%*/
    }, function() {
    $slides.eq(currentIndex).css({
        display: 'none'
      });/*eq(currentIndex)css중에 display:block;내용반복안되도록?*/
      $slides.eq(newIndex).css({/*slider index값을 css left:0값주고*/
        left: 0/*css에 left는0값 부여*/
      });
      $group.css({/*전체 그룹 css값을 left:0을 준다*/
        left: 0/*css에 left는0값 부여*/
      });
      currentIndex = newIndex; /*newIndex값을 currentIndex에 대입*/
    });
  }
/********************************/
  /*advace를 위에 move에서 활용 */
  function advance() {
    clearTimeout(timeout);/*시간변수*/
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {/*만약 현재페이지값이 슬라이더길이-1 보다 작을때 (이동할 페이지를 1로 설정)*/
        move(currentIndex + 1);/*현재페이지 +1페이지 이동*/
      } else {/*아니면*/
        move(0);/*0으로 가도록*/
      }
    }, 4000);
  }
  /*.next_btn 클래스를 클릭했을때*/
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);/*현재페이지보다  < slider의 길이-1이 클경우 현재페이지에서 1이동 (이동할 페이지를 1로 설정)*/
    } else {
      move(0);/*move값이 0*/
    }
  });
  /*.previous_btn 클래스를 클릭했을때*/
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {/*0이 아닐때*/
      move(currentIndex - 1);/*현재페이지 -1 이동*/
    } else {
      move(3);/*그게 아니면 3*/
    }
  });
  
/**/
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    /*원버튼(&bull이 bullet이라는 의미)을 button에 변수를 선언 및 할당*/
    if (index === currentIndex) {/*만약 인덱스 값과 현재페이지값과 일치하다면*/
      $button.addClass('active');/*버튼 active클래스 추가*/
    }
    $button.on('click', function() {
      move(index);/*인덱스값으로 이동*/
    }).appendTo('.slide_buttons');/*.slide_buttons요소 마지막에 추가*/
    bulletArray.push($button);/*원버튼 배열 마지막요소추가*/
  });
  
  advance();/*처음 시작 자동 슬라이더*/
});




