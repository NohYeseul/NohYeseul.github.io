var $player = $('.js_audio_player'),
    $playbackClass = 'is_playing',/*플레이가 되면*/
    $fadeDuration = 500;/*지속기간을 500*/

$player.each(function(index) {
  var $this = $(this),
      id = 'audio_player_' + index;/*오디오 플레이어 + index값을 id에 변수 선언 및 할당*/

  $this.attr('id', id)/*아이디 속성값을 가져온다*/
  /*js_control버튼 클릭이벤트를 실행할때*/
  $this.find('.js_control')[0].addEventListener('click', function() {
    resetPlayback(id);
    playback($this, $this.find('audio'), $this.find('video'));/*오디오, 비디오 실행*/
  });
  
  // 오디오 재생이 완료되면 상태를 재설정
  $this.find('audio')[0].addEventListener('ended', function() {
    resetPlayback();
  });
});

function playback($player, $audio, $video) {
  if ($audio[0].paused) {/*만약 오디오의 인덱스값 0 ㅣㅣ표시되면*/
    $audio[0].play();/*오디오 플레이*/
    $video[0].play();/*비디오 플레이*/
    $audio.animate({ volume: 1 }, $fadeDuration);/*오디오 실행되는 동안 500 볼륨값1*/
    $player.addClass($playbackClass);
  } else {/*정지를 하면*/
    $audio.animate({ volume: 0 }, $fadeDuration, function() {/*오디오 볼륨값을0*/
      $audio[0].pause();/*오디오 일시정지*/
      $video[0].pause();/*비디오 일시정지*/
    });
    $player.removeClass($playbackClass);/**/
  }
}

function resetPlayback(id) {/*오디오 재생이 완료됬을시 실행*/
  $player.each(function() {
    var $this = $(this);
    /*아이디 속성이 id 값과 일치하지 않는 경우*/
    if ($this.attr('id') !== id) {
      $this.find('audio').animate({ volume: 0 }, $fadeDuration, function() {
        $(this)[0].pause();/*오디오 볼륨값을0 일시정지한다*/
        $this.find('video')[0].pause();/*비디오도 일시정지한다*/
      });
      $this.removeClass($playbackClass);/*playbackClass클래스를 지운다*/
    }
  });
}