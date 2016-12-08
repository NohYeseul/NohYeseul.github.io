window.Formaweb = window.Formaweb || {};//||논리연산자 : 두 개의 입력 값 중 어느하나라도 true이면 , true를 리턴
window.Formaweb.Player = function() {
    
    var audio;//오디오 변수선언
    var playlist;//음악 리스트
    var len;//길이
    var current;//현재위치
    init();
    function init() {
        current = 0;//현재위치 값=0
        audio = $('audio')[0];//audio 0값을 할당
        playlist = [{//음악리스트
            name: '01. Clouds In The Forest',
            path: 'http://hiperload.com/s/jm4i99w4f/s.mp3',//경로지정
            id: 'track01'
        }, {
            name: '02. Rat In The River',
            path: 'http://hiperload.com/s/kn0h81b5p/s.mp3',
            id: 'track02'
        }, {
            name: '03. Giants And Companion',
            path: 'http://hiperload.com/s/ke2h15z3y/s.mp3',
            id: 'track03'
        }, {
            name: '04. Ashamed Of Light',
            path: 'http://hiperload.com/s/vb8q20z8u/s.mp3',
            id: 'track04'
        }];
        len = playlist.length - 1;//플레이리스트의 길이-1,인덱스가 0부터 시작해서?4-1
        //리스트의 길이-1
        // audio.volume = 0.10;
        run(playlist[0], audio);
        audio.addEventListener('ended', function(e) {
            next();
            run(playlist[current], audio);
        });//오디오가 끝났을때 다음
        $('.audio.next').on('click', function() {
            next();
            run(playlist[current], audio);
            return false;
        });//next버튼을 클릭했을때
        $('.audio.prev').on('click', function() {
            prev();
            run(playlist[current], audio);
            return false;
        });//prev버튼을 클릭했을때
        $('.audio.play').on('click', function() {
            var music_id = $(this).attr('data-music-id');
            if (music_id != undefined) {
                playById(music_id);
            }
            return false;
        });//play버튼(음악 리스트 중 하나)을 클릭했을때
    }
    
    function run(music, player) {
        $('.audio.name').text(music.name);//클래스name에 text메소드는 해석하지 않고 태그를 그대로 노출하여렌더링
        player.src = music.path;//경로지정
        /*audio.load();*/
        audio.play();//오디오 재생
    }
    function next() {//next를 누르면 +
        current++;
        if (current > len)//만약 길이가 현재페이지보다 작을경우
            current = 0;//현재페이지는 0,맨 마지막 음악이 끝났을 경우 맨앞으로
    }
    function prev() {
        current--;//prev를 누르면 -
        if (current < 0)//현재페이지가 0보다 작을때
            current = 0;//현재페이지는 0,prev이동이 안되도록
    }
    function playById(trackId) {/*리스트를 누르면 해당 오디오가 나옴*/
        var playlist_id = undefined; //playlist_id변수선언undefined대입
        $.each(playlist, function(index, value) {
            if (value.id == trackId) {//만약 id값이 trackId와 같다면
                playlist_id = index;/*리스트id값에 인덱스값 대입*/
            }
        });
        if (playlist_id != undefined) {//playlistid값이 undefined과 다를때 참을 반환
            current = playlist_id;//현재페이지에 플레이되고있는 id넣고
            run(playlist[current], audio);
        }
    }
}
$(document).ready(function() {
    var player = window.Formaweb.Player();   
});//document 준비가되면 player실행
