
var myAudio = document.getElementById("audio");
var nClick = 1;
var time = 1;
var idOfClock;
var totalTime;

playCotrol();

function sToHms(s){
  s = Math.floor(s);  //如果输入的是浮点数，则舍弃小数位
   
  var h = Math.floor(s/3600);  //计算得出小时数
  if(h<10){  //调整为两位数的格式
    h = '0'+h;
  }
   
  var m = Math.floor(s/60-h*60);  //计算得出分钟数
  if(m<10){  //调整为两位数的格式
    m = '0'+m;
  }
   
  var s = s%60;  //计算得出剩下的秒数
  if(s<10){  //调整为两位数的格式
    s = '0'+s;
  }
   
  return m+':'+s;  //最后连接成字符串并返回
}

function setTotalTime(){
	totalTime = myAudio.duration;
	if(!isNaN(totalTime) ){
		if(totalTime > 0){
			document.getElementById("totalTime").innerHTML = sToHms(totalTime);
		}
	}
} 
window.onload=setTotalTime;

function clock(){
	document.getElementById("currentTime").innerHTML = sToHms(time++);
}


//播放事件监听
function playCotrol() {
    myAudio.addEventListener("loadeddata", //歌曲已经完整的加载完毕
        function() { 
            totalTime = myAudio.duration;  
            if(!isNaN(totalTime)){
		if(totalTime > 0){
			document.getElementById("totalTime").innerHTML = sToHms(totalTime);
		}
	}
        }, false);
	myAudio.addEventListener("pause",
        function() { //监听暂停
            
        }, false);
    myAudio.addEventListener("ended", function() { //歌曲已经播放结束
		time = 0;
		nClick = 1;
		document.getElementById("currentTime").innerHTML = "00:00";
		document.getElementById("play").src = "images/img.png"
		clearInterval(idOfClock);
    }, false)
}

//处理播放按钮点击事件
function myFunction()
{
	if(nClick == 1){
		nClick = 2;
		myAudio.play();
		document.getElementById("play").src = "images/pause.png"
		idOfClock = setInterval("clock()",1000); //定时器刷新播放时间
	}else if(nClick == 2){
		nClick = 1;
		myAudio.pause();
		document.getElementById("play").src = "images/img.png"
		clearInterval(idOfClock);
	}
}
