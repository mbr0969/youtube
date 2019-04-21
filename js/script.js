'use strict';

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault(); // AIzaSyDQF0csW6tmQuLs5mCsvxBUbNyiwNprtJ8
    
//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', 'handler.php', true);
//         xhr.send(null); 
       
//         var confirmationMessage = "";
//         (e || window.event).returnValue = confirmationMessage;
//         return confirmationMessage;
   
// }, false);


// //
// $(window).on('beforeunload', function (e) {

//     // var xhr = new XMLHttpRequest();
//     // xhr.open('POST', 'handler.php', true);
//     // xhr.send(null);
 
//     // e.preventDefault();
//     // var confirmationMessage = "";
//     // (e || window.event).returnValue = confirmationMessage;
//     // return confirmationMessage;
 
//     $.ajax({
//         type: "POST",
//         url: "handler.php",
//         async: false,
//         data: { ajax_data : 22 },
//         success: function(response){

//         }
//         },    
//     ); 
// });

const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
let player;
let night = false;

// var inFormOrLink;
// $('a').on('click', function() { inFormOrLink = true; });
// $('form').on('submit', function() { inFormOrLink = true; });

// $(window).on("onunload", function(event) {
//     if(event.keyCode !== 116){

//         return true;  
//     }
// })

sliceTitle('.videos__item-descr', 100);
bindSlideTogle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');



function bindSlideTogle(triget, boxBody, content, openClass){
    let button = {
        'element': document.querySelector(triget),
        'active': false
    };
    const box = document.querySelector(boxBody),
          boxContent = document.querySelector(content);
          
    button.element.addEventListener('click', function() {
        if (button.active === false) {
            button.active = true;
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass)           
        }else{
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass) 
        }
    });       
};

function switchMode() {
    if(night === false){ 
        night = true;
        document.body.style.backgroundColor = '#000';
        document.querySelectorAll('.hamburger > line').forEach(item=>{
            item.style.stroke = '#fff';
        });      
        document.querySelectorAll('.videos__item-descr').forEach(item=>{
            item.style.color = '#fff';       
        });   
        document.querySelectorAll('.videos__item-views').forEach(item=>{
            item.style.color = '#fff';       
        });        
        document.querySelector('.header__item-descr').style.color='#fff';
        document.querySelector('.logo > img').src='logo/youtube_night.svg';
       
    }else{   
        night = false;    
        document.body.style.backgroundColor = '#fff';
        document.querySelectorAll('.hamburger > line').forEach(item=>{
            item.style.stroke = '#000';
        });
        document.querySelectorAll('.videos__item-descr').forEach(item=>{
            item.style.color = '#000';
        });
        document.querySelectorAll('.videos__item-views').forEach(item=>{
            item.style.color = '#000';
        });
        document.querySelector('.header__item-descr').style.color='#000';
        document.querySelector('.logo > img').src='logo/youtube.svg';        
    }
};

//================================================
switcher.addEventListener('change', ()=>{
    switchMode();
});

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
//        '#1 Верстка реального заказа landing page | Марафон верстки | Артем Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['H1si-Uwp3eU', '7BvHoh0BrMw', 'mC8JW_aG2EM']
//   ];

//   more.addEventListener('click', () =>{
//       const videosWrapper = document.querySelector('.videos__wrapper');
//       more.remove();
//       for (let i = 0, size = data[0].length; i < size; i++) {
//           let card = document.createElement('a');
//           card.classList.add('videos__item','videos__item-active');
//           card.setAttribute('data-url', data[3][i]);
//           card.innerHTML = `
//                         <img src="${data[0][i]}" alt="thumb">
//                         <div class="videos__item-descr">
//                             ${data[1][i]}
//                         </div>
//                         <div class="videos__item-views">
//                             ${data[2][i]}
//                         </div>
//                     `;
//         videosWrapper.appendChild(card);
//         setTimeout(()=>{
//             card.classList.remove('videos__item-active');
//         }, 10);
//         if (night === true) {
//             card.querySelector('.videos__item-descr').style.color = '#fff';
//             card.querySelector('.videos__item-views').style.color = '#fff';             
//         }

//         bindNewModal(card);
//       }
//       sliceTitle('.videos__item-descr',100);
      
//   });

//=======================================================================================
function start(){
    
    gapi.client.init({
        'apiKey': "AIzaSyDQF0csW6tmQuLs5mCsvxBUbNyiwNprtJ8",
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function(){
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '6',
            "playlistId":  "PLXnc70nN1sO5cvzg2QCFxzaVs7WUZmmk1" // 'PL3LQJkGQtzc4gsrFrm4MjWhTXhopsMgpv'//"PLXcFslIzKdCMLex2HYD5L3APVOZmJnP4X"
        }).then(function(response){            
            const videosWrapper = document.querySelector('.videos__wrapper');
            response.result.items.forEach(item => {
                let card = document.createElement('a');

                card.classList.add('videos__item','videos__item-active');
                card.setAttribute('data-url', item.contentDetails.videoId);
                card.innerHTML = `
                            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                            <div class="videos__item-descr">
                                ${item.snippet.title}
                            </div>
                            <div class="videos__item-views">
                                2.7 тыщ просмотров. 
                            </div>
                        `;
                videosWrapper.appendChild(card);
                setTimeout(()=>{
                card.classList.remove('videos__item-active');
                }, 10);
                if (night === true) {
                    card.querySelector('.videos__item-descr').style.color = '#fff';
                    card.querySelector('.videos__item-views').style.color = '#fff';             
                }
            });
            sliceTitle('.videos__item-descr',100);
            bindModal(document.querySelectorAll('.videos__item'));
        }).catch(e =>{
            console.log(e)
        });
    });
}
//===================================

function search(target){
    gapi.client.init({
        'apiKey': "AIzaSyDQF0csW6tmQuLs5mCsvxBUbNyiwNprtJ8",
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function(){
        return gapi.client.search.list({
            'maxResult': '10',
            'part': 'snippet',
            'q': `${target}`,
            'type': ''
        });
    }).then(function(tesponse){
        console.log(response.result);
    });

}


//====================================
more.addEventListener('click', ()=>{
    more.remove();
    gapi.load('client', start);
});
//===========================================
//===========================================
function sliceTitle(selector, size){    
    document.querySelectorAll(selector).forEach(item =>{
        item.textContent.trim();        
        if(item.textContent.length > size){            
            const str = item.textContent.slice(0, +size+1)+ '...';
            item.textContent = str;
        }
    });
}
function openModal(){
    modal.style.display = 'block';
}
function closeModal(){
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards){
    cards.forEach(item =>{
        item.addEventListener('click',  (e)=>{
                e.preventDefault();
                const id = item.getAttribute('data-url');
                loadVideo(id);
                openModal();            
        });
    });
}

bindModal(videos);

function bindNewModal(card){
    card.addEventListener('click',  (e)=>{
        e.preventDefault();        
        const id = card.getAttribute('data-url');
        loadVideo(id);
        openModal();            
});
}

modal.addEventListener('click', (e)=>{
   
    if(!e.target.classList.contains('modal__body')){
        closeModal();
    }
}); // e.keyCode ===2

document.addEventListener('keydown', (evt)=>{
   
    //console.log(e.keyCode)
    if(evt.keyCode === 27){      
        closeModal();
    }
});

function crateVideo(){
    
    var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(()=>{
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE',
    })}, 300 );
}
crateVideo();
function loadVideo(id){
    player.loadVideoById({'videoId': `${id}`});
    
}