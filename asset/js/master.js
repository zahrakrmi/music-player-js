        
        //////////////////control/////////////////
        let turn = 0
        let currnt_time = 0
        let music_duration = 0
        let portion = 0
        let turn_vol = 1
        let volume_perc = 0
        let turn_play_pause = 0
        let turn_music = ''

        const main=document.getElementById('main')
        const home=document.getElementById('home')
        
        ////////////// control section ///////////////////////
        let line=document.querySelector('.line')
        let fill_line=document.getElementById('fill_line')
        let controlSection=document.getElementById('controlSection')
        let _controlSection_img = document.querySelector('#controlSection img')
        let singername=document.querySelectorAll('.namesinger')
        let musicname=document.querySelectorAll('.musicname')
        let next_btn=document.getElementById('next') 
        let previous_btn=document.getElementById('previous')
        let repeat_btn=document.getElementById('repeat')
        let play_pause_btn = document.querySelectorAll('.play_pause')
        let like_btn=document.querySelector('.like')
        let volume_range=document.getElementById('volume_range')
        let download_btn=document.getElementById('download')
        let playorpause_btn=document.querySelectorAll('.playorpause')
        let vol_btn=document.getElementById('vol')
        let playpage=document.getElementById('playpage')

        //////////////playing page//////////////
        let playingpage=document.getElementById('playingpage')
        let pic=document.getElementById('pic')
        let fig=document.getElementById('fig')


        /////////////middle///////////////
        let music_box_main=document.getElementById('music_box_main')
        let playingpage2=document.querySelectorAll('#playingpage div')
        let all_musicboxs=document.querySelectorAll('.music_box')
        let all_musics=document.querySelectorAll('.music_box audio')
        let all_covers=document.querySelectorAll('.music_box img')
        let all_singer_names=document.querySelectorAll('.singername')
        let all_music_names=document.querySelectorAll('.musicname')
        let all_music_play_symbol=document.querySelectorAll('.play_symbol')










        /////////////////reset//////////////////
        function _reset(){
            all_musics.forEach((val)=>{
                val.pause()
                fill_line.style.width=0
                turn_play_pause=0
                play_pause_btn.forEach((val,i)=>{
                    if(i==0){
                        val.innerHTML=`<i class="play bi bi-play-circle-fill text-[50px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }else{
                        val.innerHTML=`<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }
                
                })
            })
        }

        ///////////////////set time music//////////////////////
        function calculate_current_time(){
            setInterval(() => {
                music_duration = all_musics[turn_music].duration
                currnt_time = all_musics[turn_music].currentTime
                portion = (currnt_time/music_duration)
                fill_line.style.width = portion * (700) + 'px'
                if(currnt_time == all_musics[turn_music].duration){
                    turn_play_pause = 0
                    fill_line.style.width = 0
                    play_pause_btn.forEach((val,i)=>{
                        if(i==0){
                            val.innerHTML=`<i class="play bi bi-play-circle-fill text-[60px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                        }else{
                            val.innerHTML=`<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                        }
                    })
                }
            }, 1000);
        }

        turn_music=0
        coordinating_names_pic()

        ////////////////////////change pic//////////////////
        function coordinating_names_pic(){
            _controlSection_img.src=all_covers[turn_music].src
            pic.src = all_covers[turn_music].src
            singername.forEach((val)=>{
                val.innerHTML=all_singer_names[turn_music].innerHTML
            })
            musicname.forEach((val)=>{
                val.innerHTML=all_music_names[turn_music].innerHTML
            })
        }

        ///////////////////////////play//////////////////////
        function play_music(){
            if(turn_play_pause == 0){
                all_musics[turn_music].play()
                play_pause_btn.forEach((val,i)=>{
                    if(i == 0){
                        val.innerHTML=`<i class="pause bi bi-pause-circle-fill text-[50px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }else{
                        val.innerHTML=`<i class="pause bi bi-pause-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }
                })
                calculate_current_time()
                turn_play_pause=1
            }else{
                all_musics[turn_music].pause()
                play_pause_btn.forEach((val,i)=>{
                    if(i == 0){
                        val.innerHTML=`<i class="play bi bi-play-circle-fill text-[50px] text-[#1ed760]  cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }else{
                        val.innerHTML=`<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                    }
                })
                turn_play_pause=0
            }
        }

        ////////////////////repeat music//////////////////////////
        repeat_btn.addEventListener('click',(e)=>{
        if(all_musics[turn_music].getAttribute('loop')==null){
            all_musics[turn_music].setAttribute('loop',true)
            e.target.style.color='#1ed760'
        }else{
            all_musics[turn_music].removeAttribute('loop',true)
            e.target.style.color='white'
        }
     })


        //////////////////like music///////////////////////////////
        all_musics.forEach((val)=>{
        val.setAttribute('data-like','Off')
     })
     
        like_btn.addEventListener('click',()=>{
            if(all_musics[turn_music].getAttribute('data-like')=='Off'){
                like_btn.style.color='red'
                all_musics[turn_music].setAttribute('data-like','on')
            }else{
                like_btn.style.color='white'
                all_musics[turn_music].setAttribute('data-like','Off')
            }
        })
     

        /////////////download music////////////////
        download_btn.addEventListener('click',()=>{
            download_btn.parentElement.setAttribute('href',all_musics[turn_music].src)
            download_btn.parentElement.setAttribute('download')
        })



        /////////////next btn/////////////////////
        next_btn.addEventListener('click',()=>{
            _reset()
            turn_play_pause=0
            if(turn_music <= all_musics.length - 2){
                turn_music++

            }else{
                turn_music=all_musics.length -1
            }
            coordinating_names_pic()
            play_music()
        })
      
        /////////////////previous btn//////////////////
        previous_btn.addEventListener('click',()=>{
            _reset()
            turn_play_pause=0
            if(turn_music>=1){
                turn_music--
            }else{
                turn_music = 0
            }
            coordinating_names_pic()
            play_music()
        })

        ///////////////////playing page/////////////////////
        all_musicboxs.forEach((val,i)=>{
            val.addEventListener('click',()=>{
                _reset()
                turn_music = i
                coordinating_names_pic()
                playingpage.style.display='flex'
                music_box_main.style.overflowY = 'hidden'
            })
        })
        music_box_main.addEventListener('scroll', () => {
        let st = music_box_main.scrollTop
        console.log(st);
        if(st<300){
            playingpage.style.top='0'
        }
        if(st>=300 && st<301){
            playingpage.style.top='45%'
        }
        if(st<=400 && st>=301){
            playingpage.style.top='60%'
        }
        if(st>400 && st<600){
            playingpage.style.top='90%'
        }
        })


       

        ////////////////home///////////////////
        home.addEventListener('click',()=>{
            playingpage.style.display = 'none'
            music_box_main.style.overflowY = 'scroll'
        })
        
       

        //////////////////click line music//////////////////
            line.addEventListener('click',(e)=>{
                let x = e.offsetX
                fill_line.style.width = x +'px'
                all_musics[turn_music].currentTime=((x*(all_musics[turn_music].duration))/700)
                all_musics[turn_music].play()
                turn_play_pause=1
            })


        ///////////////set volume///////////////////
        volume_range.addEventListener('change', ()=>{
            volume_perc = volume_range.value
            if(volume_perc<=9){
                x=Number('0.'+volume_perc)
            }else{
                volume_perc=1
            }
            all_musics[turn_music].volume = volume_perc;
        })

        /////////////click volume mute&up/////////////////
        vol.addEventListener('click',()=>{
            if(turn_vol%2){
                volume_perc = 0
                vol.innerHTML = `<i class="bi bi-volume-mute text-[20px] text-white cursor-pointer hover:scale-110 transition-all duration-300"></i>`
            }else{
                volume_perc = .5
                vol.innerHTML = `<i  class="bi bi-volume-up-fill text-[20px] text-white cursor-pointer hover:scale-110 transition-all duration-300"></i>` 
            }
            all_musics[turn_music].volume = volume_perc;
            turn_vol++
        })