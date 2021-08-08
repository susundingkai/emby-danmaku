// ==UserScript==
// @name         Emby danmaku extension
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       F2bbb
// @match        http://192.168.0.103:8096/web/index.html
// @icon         https://www.google.com/s2/favicons?domain=0.103
// @require https://cdn.jsdelivr.net/npm/danmaku/dist/danmaku.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
var danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 1303 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="32"><path d="M110.964364 1023.720727c-60.509091 0-109.847273-48.872727-109.847273-108.916363V109.009455C1.117091 48.965818 50.455273 0 110.964364 0h1081.902545c60.509091 0 109.847273 48.872727 109.847273 108.916364v805.794909c0 60.043636-49.338182 108.916364-109.847273 108.916363H110.964364z m0-927.650909c-6.609455 0-12.101818 5.771636-12.101819 12.939637v805.794909c0 7.168 5.492364 13.032727 12.101819 13.032727h1081.902545c6.609455 0 12.101818-5.864727 12.101818-13.032727V109.009455c0-7.168-5.492364-13.032727-12.101818-13.032728H110.964364z" p-id="1714" fill="#2c2c2c"></path><path d="M1003.054545 520.098909a51.572364 51.572364 0 0 1-50.26909 52.689455h-80.058182a51.572364 51.572364 0 0 1-50.269091-52.689455c0-29.137455 22.434909-52.782545 50.269091-52.782545h80.058182c27.834182 0 50.269091 23.645091 50.26909 52.782545zM1096.610909 270.149818c0 28.858182-22.341818 52.410182-49.989818 52.410182H232.541091a51.293091 51.293091 0 0 1-50.082909-52.410182c0-29.044364 22.434909-52.503273 50.082909-52.503273h814.08c27.648 0 50.082909 23.458909 50.082909 52.503273zM768.744727 520.098909c0 28.858182-22.341818 52.410182-50.082909 52.410182H232.541091a51.293091 51.293091 0 0 1-50.082909-52.410182c0-29.044364 22.434909-52.503273 50.082909-52.503273H718.661818c27.648 0 50.082909 23.458909 50.082909 52.503273zM1096.610909 735.976727c0 29.044364-22.341818 52.503273-49.989818 52.503273H560.500364a51.293091 51.293091 0 0 1-50.082909-52.503273c0-28.951273 22.341818-52.410182 50.082909-52.410182h486.120727c27.648 0 50.082909 23.458909 50.082909 52.410182z" p-id="1715" fill="#2c2c2c"></path></svg>'
var search_icon='<svg t="1628398535183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2890" width="32" height="32"><path d="M881.3 899c-2.6 0-5.1-1-7.1-2.9L620.7 642.6c-3.9-3.9-3.9-10.2 0-14.1 3.9-3.9 10.2-3.9 14.1 0L888.3 882c3.9 3.9 3.9 10.2 0 14.1-1.9 1.9-4.4 2.9-7 2.9zM365.4 678.9c-79 0-153.3-30.8-209.2-86.7-55.9-55.9-86.7-130.2-86.7-209.1 0-79 30.8-153.3 86.7-209.1 55.9-55.9 130.2-86.7 209.1-86.7 86.4 0 168.3 37.6 224.6 103.3 3.6 4.2 3.1 10.5-1.1 14.1-4.2 3.6-10.5 3.1-14.1-1.1-52.5-61.2-128.8-96.3-209.4-96.3-152.1 0-275.8 123.7-275.8 275.8s123.8 275.8 275.9 275.8c152.1 0 275.8-123.7 275.8-275.8 0-23-2.8-45.9-8.4-67.8-1.4-5.4 1.9-10.8 7.2-12.1 5.4-1.4 10.8 1.9 12.1 7.2 6 23.6 9 48.1 9 72.8 0 79-30.8 153.3-86.7 209.2-55.7 55.7-130 86.5-209 86.5z" p-id="2891" fill="#2c2c2c"></path></svg>'
var info_icon='<svg t="1628402015202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3873" width="32" height="32"><path d="M504.5 101.77c-226.563 0-410.229 183.666-410.229 410.229 0 226.565 183.666 410.231 410.229 410.231s410.229-183.666 410.229-410.231c0-226.563-183.666-410.229-410.229-410.229z m0 755.048c-190.437 0-344.818-154.381-344.818-344.819 0-190.438 154.381-344.818 344.818-344.818 190.438 0 344.819 154.381 344.819 344.818 0 190.439-154.381 344.819-344.819 344.819z" fill="#2c2c2c" p-id="3874"></path><path d="M504.5 313.259m-41.998 0a41.998 41.998 0 1 0 83.996 0 41.998 41.998 0 1 0-83.996 0Z" fill="#2c2c2c" p-id="3875"></path><path d="M546.498 712.738c0 22.092-17.908 40-40 40h-3.996c-22.091 0-40-17.908-40-40V437.255c0-22.091 17.909-40 40-40h3.996c22.092 0 40 17.909 40 40v275.483z" fill="#2c2c2c" p-id="3876"></path></svg>'
var first_ini=false
var is_danmaku_show=true
var danmaku=null;
var episode_info=null
var selecAnime_id=0
var video_container
var next_video_flag=false
function initButton(){
    var menubar=document.querySelector("div[class='videoOsdBottom-buttons flex align-items-center flex-direction-row focuscontainer-x focusable videoOsd-customFont']").children[0]

    var danmakuDisplay = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuDisplay.setAttribute("is", "paper-icon-button-light")
    danmakuDisplay.setAttribute("title", "显示/隐藏弹幕")
    danmakuDisplay.setAttribute("id", "displayDanmaku")
    danmakuDisplay.innerHTML=danmaku_icon
    menubar.appendChild(danmakuDisplay)

    var danmakuSearch = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuSearch.setAttribute("is", "paper-icon-button-light")
    danmakuSearch.setAttribute("title", "搜索弹幕")
    danmakuSearch.setAttribute("id", "searchDanmaku")
    danmakuSearch.innerHTML=search_icon
    menubar.appendChild(danmakuSearch)

    var danmakuInfo = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuInfo.setAttribute("is", "paper-icon-button-light")
    danmakuInfo.setAttribute("title", "查看弹幕信息")
    danmakuInfo.setAttribute("id", "infoDanmaku")
    danmakuInfo.innerHTML=info_icon
    menubar.appendChild(danmakuInfo)
    $("#displayDanmaku").click(function(){
        console.log("click hide/show!!!!")
        if(is_danmaku_show){
            danmaku.hide();
            is_danmaku_show=false
        }else{
            danmaku.show();
            is_danmaku_show=true
        }
    })
    $("#searchDanmaku").click(function(){
        next_video_flag=false
        console.log("searchDanmaku!!!!")
        actionFunction(false)
    })
    $("#infoDanmaku").click(function(){
        console.log("ifoDanmaku!!!!")
        if(episode_info!=null){
            alert(episode_info)
        }
    })
}
function actionFunction (is_init=true) {
    //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
    //alert("hhh");
    if(next_video_flag){
        return
    }
    danmaku=null
    episode_info=null
    selecAnime_id=0
    if(document.getElementById('searchDanmaku') == undefined){
        initButton()
    }
    video_container=document.querySelector("video[class='htmlvideoplayer moveUpSubtitles']");
    if(!first_ini){
        video_container.addEventListener('loadstart',listnContainer)
        video_container.addEventListener('play',changeVideo)
        first_ini=true
    }else{
        console.log("secondly loading!!")
    }
    var ori_anime=document.querySelector("h2[class='videoOsdParentTitle']").innerHTML
    var anime= ori_anime


    if(GM_getValue(ori_anime)){
        anime=GM_getValue(ori_anime)
    }
    if(!is_init){
        selecAnime_id=0;
        anime = prompt("确认动画名:",anime);
    }
    if(anime!=ori_anime){
        GM_setValue(ori_anime,anime)
    }
    var episode =document.querySelector("h3[class='videoOsdTitle']")
    if(episode){
        episode=episode.innerHTML
        var newepisode=/E([0-9]*)/gi.exec(episode)
        if(newepisode!=null){
            newepisode=newepisode[0]
            newepisode=newepisode.substring(1)
        }
    }else{
        newepisode='movie'
    }
    //newepisode=parseInt(newepisode)
    var searchUrl;
    if(!is_init){
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime="+anime+"&withRelated=true" //+"&episode="+newepisode,
    }else{
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime="+anime+"&withRelated=true&episode="+newepisode
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: searchUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data:"",
        onload: function(response){
            console.log("请求成功");
            //console.log(response.responseText);
            var obj = JSON.parse(response.responseText)
            if(!is_init){
                console.log(obj)
                var anime_lists_str=list2string(obj)
                console.log(anime_lists_str);
                selecAnime_id= prompt("选择:\n"+anime_lists_str,selecAnime_id)
                var newepisode_lists_str=ep2string(obj.animes[selecAnime_id].episodes)
                newepisode = prompt("确认集数:\n"+newepisode_lists_str,parseInt(newepisode)-1);
                newepisode=parseInt(newepisode)
            }else{
                newepisode=0
            }
            var episodeId=obj.animes[selecAnime_id].episodes[newepisode].episodeId
            if(obj.animes[selecAnime_id].type=="tvseries"){
                episode_info="动画名称:"+obj.animes[selecAnime_id].animeTitle+"\n分集名称:"+obj.animes[selecAnime_id].episodes[newepisode].episodeTitle
            }else{
                episode_info="动画名称:"+obj.animes[selecAnime_id].animeTitle
            }
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.acplay.net/api/v2/comment/"+episodeId+"?withRelated=true",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                data:"",
                onload: function(response2){
                    console.log("请求成功");
                    //console.log(response2.responseText);
                    var obj2 = JSON.parse(response2.responseText).comments
                    var comments = bilibiliParser(obj2)
                    console.log(comments.length)
                    var container=document.querySelector("div[data-type='video-osd']")
                    var media=document.querySelector("video[class='htmlvideoplayer moveUpSubtitles']")
                    if(danmaku!=null){
                        danmaku.clear();
                        danmaku.destroy()
                        danmaku=null
                        episode_info=null
                        selecAnime_id=0
                    }
                    danmaku=createDanmaku(container,media,comments)
                    //danmakuDisplay=document.getElementById('displayDanmaku')

                    var test=document.querySelector("video[class='htmlvideoplayer moveUpSubtitles']");
                    test.setAttribute("test","test")
                    var test2=document.querySelector("div[class='videoPlayerContainer']");
                    test2.setAttribute("test","test")
                    test.addEventListener('loadstart',function(){wait1()})
                    new ResizeObserver(() => {
                        console.log("resizing")
                        danmaku.resize()
                    }).observe(test2)

                },
                onerror: function(response2){
                    console.log("请求失败");
                }
            });


        },
        onerror: function(response){
            console.log("请求失败");
        }
    });

}
function searchDanmaku(){

}

function createDanmaku($container,$media,$comments){
    return new Danmaku({
        container: $container,
        media: $media,
        //media: document.getElementById('my-video'),
        comments: $comments,
        engine: 'canvas'
    });
}

function bilibiliParser($obj) {
    //const $xml = new DOMParser().parseFromString(string, 'text/xml');
    console.log($obj)
    return $obj.map(($comment) => {
        const p = $comment.p
        //if (p === null || $comment.childNodes[0] === undefined) return null;
        const values = p.split(',');
        const mode = ({ 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' })[values[1]];
        if (!mode) return null;
        //const fontSize = Number(values[2]) || 25;
        const fontSize=25
        const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
        return {
            text: $comment.m,
            mode,
            time: values[0] * 1,
            style: {
                fontSize: `${fontSize}px`,
                color: `#${color}`,
                textShadow: color === '00000'
                ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff'
                : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',

                font: `${fontSize}px sans-serif`,
                fillStyle: `#${color}`,
                strokeStyle: color === '000000' ? '#fff' : '#000',
                lineWidth: 2.0,
            },
        };
    }).filter((x) => x);
}

function list2string($obj2){
    const $animes=$obj2.animes
    var anime_lists=$animes.map(($single_anime)=>{
        //console.log($single_anime.animeTitle)
        return $single_anime.animeTitle+" 类型:"+$single_anime.typeDescription
    })
    var anime_lists_str='0:'+anime_lists[0];
    for (var i=1;i<anime_lists.length;i++)
    {
        anime_lists_str=anime_lists_str+"\n"+(i).toString()+":"+anime_lists[i]
    }
    return anime_lists_str
}
function ep2string($obj3){
    const $animes=$obj3
    var anime_lists=$animes.map(($single_ep)=>{
        //console.log($single_anime.animeTitle)
        return $single_ep.episodeTitle
    })
    var ep_lists_str='0:'+anime_lists[0];
    for (var i=1;i<anime_lists.length;i++)
    {
        ep_lists_str=ep_lists_str+"\n"+(i).toString()+":"+anime_lists[i]
    }
    return ep_lists_str
}
function wait1(){
    danmaku=null;
    episode_info=null
    selecAnime_id=0
    if(!first_ini){
        initButton()
        waitForKeyElements ("video[class='htmlvideoplayer moveUpSubtitles']",actionFunction)
    }else{
        actionFunction()
    }



}
function listnContainer(){
    //video_container.removeEventListener("click", listnContainer);
    console.log('restart!!!!')
    if(danmaku!=null){
        danmaku.clear();
        danmaku.destroy()
        danmaku=null
        episode_info=null
        selecAnime_id=0
    }
    next_video_flag=true
}

function changeVideo(){
    console.log("play!!!")
    if(next_video_flag){
        console.log("true restart!!!")
        if(danmaku!=null){
            danmaku.clear();
            danmaku.destroy()
            danmaku=null
            episode_info=null
            selecAnime_id=0
        }
        next_video_flag=false
        //actionFunction()
    }

}
(function() {
    'use strict';
    waitForKeyElements ("div[class='flex flex-grow align-items-center flex-shrink-zero']",wait1);
    // Your code here...
})();
