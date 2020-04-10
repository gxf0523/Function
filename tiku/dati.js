/**
 * Created by admin on 2017/8/3.
 */
document.domain = 'duia.com';
 var reloadType=1;
$(function () {
    $(".panfenIpt").bind("input onpropertychange",function () {
        var thisMaxNum=Number($(this).attr("maxFen"));
        var thisText=Number($(this).val());
        var reg=/^\d+(\.\d{0,1})?$/;
        if(!reg.test(thisText)){
            $("#panfenBox .panfenBox_Tishi p").html("分数填写不规范");
            setTimeout(function () {
                $("#panfenBox .panfenBox_Tishi p").html("");
            },3000);
            $(this).val('');
        }else if(thisText>thisMaxNum){
            $("#panfenBox .panfenBox_Tishi p").html("超过最大分值");
            setTimeout(function () {
                $("#panfenBox .panfenBox_Tishi p").html("");
            },3000);
            $(this).val('');
        }
    });
});

$(document).on("click",".questionPanFenClick",function () {
    var thisMaxNum=$(this).attr("maxFen");
    tiku_util.initShades("panfenBox");
    var thisTX=getPaperTX(this);
    var thisId=getPaperId(this);
    $("#panfenBox .panfenMax").html("（最大分为"+thisMaxNum+"分）");
    $("#panfenBox .panfenIpt").attr("maxFen",thisMaxNum);
    $("#panfenBox .panfenBox_btnL").attr("thisTX",thisTX);
    $("#panfenBox .panfenBox_btnL").attr("thisId",thisId);
    if($(this).parents(".questionList").attr("tests")==4){
        var dom="clTi_"+thisId;
    }else{
        var dom="paper_"+thisId;
    }
    $("#panfenBox .panfenBox_btnL").attr("dom",dom);

});
$(document).on("click",".panfenBox_btnR",function () {
    tiku_util.closeShade("panfenBox");
    $("#panfenBox .panfenIpt").val("");
});


// 数字转英文：模板中
template.helper('formatA', function (num) {
    return String.fromCharCode(64 + parseInt(num));
});


function NumEn() {
    template.helper('formatA', function (num) {
        return String.fromCharCode(64 + parseInt(num));
    })
}NumEn();
//去除空格
function trims() {
    template.helper('trim', function (str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    })
}trims();
//超出显示...
template.helper('textYincang', function (text,maxLength) {
    var newText = "";
    if(text.length>maxLength){
        var LecTextAll =text.substring(0,maxLength);
        newText=LecTextAll+'...';
    }else{
        newText=text;
    }
    return newText;
});
template.helper('pdZhuanHuan', function (text) {
    var newText = "";
    if(text=="正确"){
        newText="A";
    }else{
        newText="B";
    }
    return newText;
});

// 图片改变
// $(document).on("mouseover",".BtnBox_timeOut",function () {
//     var myBtnimg="/images/testPaper/stopLv1.png";
//     var myBtnspan="#444";
//     imgAndSpan(this,myBtnimg,myBtnspan);
// });
$(".BtnBox_timeOut").click(function () {
    var myBtnimg="/images/testPaper/stopLv.png";
    var myBtnspan="#666";
    imgAndSpan(this,myBtnimg,myBtnspan);
})

$(document).on("mouseover",".BtnBox_save",function () {
    var myBtnimg="/images/testPaper/saveImg2.png";
    var myBtnspan="#444";
    imgAndSpan(this,myBtnimg,myBtnspan);
});
$(document).on("mouseout",".BtnBox_save",function () {
    var myBtnimg="/images/testPaper/saveImg.png";
    var myBtnspan="#666";
    imgAndSpan(this,myBtnimg,myBtnspan);
});
function imgAndSpan(that,myBtnimg,myBtnspan) {
    $(that).find('img').attr('src',myBtnimg);
    if(tabTyp==3||tabTyp==5){
        $(that).find("span").css("color",myBtnspan);
    }
}
//计时器
var defaults = {}
    , one_second = 1000
    , one_minute = one_second * 60
    , one_hour = one_minute * 60
    , one_day = one_hour * 24
    , startDate = new Date();


/*计时器*/
var n_sec = 0; //秒
var n_min = 0; //分
var n_hour = 0; //时

function timer() {
    return setInterval(function () {
        var str_sec = n_sec;
        var str_min = n_min;
        var str_hour = n_hour;
        if ( n_sec < 10) {
            str_sec = "0" + n_sec;
        }
        if ( n_min < 10 ) {
            str_min = "0" + n_min;
        }

        if ( n_hour < 10 ) {
            str_hour = "0" + n_hour;
        }
        var time = str_hour + ":" + str_min + ":" + str_sec;
        document.getElementById('time_keep').innerText = time;
        n_sec++;
        if (n_sec > 59){
            n_sec = 0;
            n_min++;
        }
        if (n_min > 59) {
            n_min = 0;
            n_hour++;
        }
    }, 1000);
}
var counttime = 0;
/*倒计时方法*/
function countdown(minutes,times){
    counttime = parseInt(minutes*60-times);//总秒钟
    countdownStart();
}
var tt;
var unClose;
function countdownStart(){
    var face=document.getElementById('time_keep');
    if(counttime>=0){
        var ms = counttime%60;//余数 89%60==29秒
        var mis = Math.floor(counttime/60);//分钟
        if(ms<10){
            ms = "0"+ ms;
        }
        if(mis>=60){
            var hour=Math.floor(mis/60);
            if(hour<10){
                hour = "0"+ hour;
            }
            mis=Math.floor((counttime-hour*60*60)/60);
            if(mis<10){
                mis = "0"+ mis;
            }
            face.innerText=hour+":"+mis+":"+ms;
        }else if(mis>=1){
            if(mis<10){
                mis = "0"+ mis;
            }
            face.innerText="00:"+mis+":"+ms;
        }else{
            face.innerText="00:00:"+ms;
        }
        // 模考剩余五分钟提示用户
        if(counttime == 300 && tabTyp==9){
            face.style.color = "red";
            toast("距离交卷剩余5分钟");
        }
        counttime--;
        tt = window.setTimeout("countdownStart()",1000);
    }else{
        window.clearTimeout(tt);
        unClose = true;
        $('.tanchuang_btnL').click();
        tiku_util.initShades("jiaojuan");
    }
}
/*保存进入时初始化时间*/
function initTimer(seconds){
    var _hours = 0;
    var _minutes = 0;
    var _seconds = seconds;
    if(seconds>59){
        _minutes = parseInt(seconds/60);
        _seconds = seconds%60;
    }
    if(_minutes>59){
        _hours = parseInt(_minutes/60);
        _minutes = _minutes%60;
    }
    n_sec = _seconds;
    n_min = _minutes;
    n_hour = _hours;
}

function haveTimer(seconds){
    var _hours = 0;
    var _minutes = 0;
    var _seconds = seconds;
    if(seconds>59){
        _minutes = parseInt(seconds/60);
        _seconds = seconds%60;
    }
    if(_minutes>59){
        _hours = parseInt(_minutes/60);
        _minutes = _minutes%60;
    }
    n_sec = _seconds;
    n_min = _minutes;
    n_hour = _hours;
    var str_sec = n_sec;
    var str_min = n_min;
    var str_hour = n_hour;
    if ( n_sec < 10) {
        str_sec = "0" + n_sec;
    }
    if ( n_min < 10 ) {
        str_min = "0" + n_min;
    }

    if ( n_hour < 10 ) {
        str_hour = "0" + n_hour;
    }
    var time = str_hour + ":" + str_min + ":" + str_sec;
    document.getElementById('time_keep').innerText = time;
}
//弹窗======================================================
/*非法进入*/
function grtDown(data) {
    if (!tiku_util.verifyStatus(data)) {
        $("#loadingImg").hide();
        if(data.status==1008){
            $(".zanting_text").text("还没有试题哦~");
        }else{
            $(".zanting_text").text("试卷信息获取错误~");
        }
        tiku_util.initShades("downPresent");
        $(".grtDown").click(function () {
            window.close();
        })
        return;
    }
}

function tanKuang(tanValue,tanName) {
    if(tanValue==0){
        tiku_util.initShades(tanName);
        if(tabTyp==3||tabTyp==5 ||tabTyp==6 ||tabTyp==9){
            clearInterval(tt);
        }else{
            clearInterval(n_timer);
        }
    }else if(tanValue==1){
        tiku_util.closeShade(tanName);
        if(tabTyp==3||tabTyp==5 ||tabTyp==6 ||tabTyp==9){
            tt = window.setTimeout("countdownStart()",1000);
        }else{
            n_timer = timer();
        }
    }
}
//继续
$(document).on("click",".zanting_btn",function () {
    var tanValue=1;
    var tanName="zanting";
    tanKuang(tanValue,tanName);
});
//保存
$(document).on("click",".BtnBox_save",function () {
    $(".JSJdown").click();//隐计算器
    var tanValue=0;
    var tanName="baocun";
    tanKuang(tanValue,tanName);
})
//取消保存
$(document).on("click",".tanchuang_btnR",function () {
    var tanValue=1;
    var tanName="baocun";
    tanKuang(tanValue,tanName);
});

//选择保存
$('.tanchuang_btnL').click(function () {
    if(!userD_t()){
        return
    }
    if(tabTyp==3||tabTyp==5 || tabTyp==6 || tabTyp==9){
        var allTime=$("#time_keep").attr("time");
        examAnswers.e = JSON.stringify(allTime*60-tiku_util.timeToSec($("#time_keep").text()));
    }else{
        examAnswers.e = JSON.stringify(tiku_util.timeToSec($("#time_keep").text()));
    }
    examAnswers.d = "2";
    var submitParam = tiku_util.examSubmitParams();
    if(tabTyp==3||tabTyp==5 || tabTyp==6 || tabTyp==9){
        $.ajax({
            url: '/exam/submit',
            type: 'post',
            async: false,
            data: JSON.stringify(submitParam),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                if (result.status == 200) {
                }
            }
        });
    }
    if(typeof isTimetable!="undefined" && isTimetable == 1){
        submitParam.info = info;
        var url = "/ai/homework/submits";
    } else {
        var url = '/exam/submits_new';
    }
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(submitParam),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            if (tiku_util.verifyStatus(result)) {
                reloadType=0;
                if(!unClose){
                    tiku_util.closeShade("baocun");
                    if(tabTyp ==1){//直播课作业

                        if(typeof isTimetable!="undefined" && isTimetable == 1){
                            var doPaperTime=examAnswers.e*1000;
                            doPaper(doPaperTime)
                            location.href = mineDomain+"/details?cs="+cs+"#/course";
                        } else {
                            location.href = mineDomain+"/details?cs="+cs+"#/course";
                        }
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    }else if(tabTyp ==9){ // 模考大赛
                        location.href = mineDomain+"/details?cs="+cs+"#/mock";
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    } else if (tabTyp == 18){ // ai家庭作业

                        var doPaperTime=examAnswers.e*1000;
                        doPaper(doPaperTime);
                        location.href = mineDomain+"/details?cs="+cs+"#/course";
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    } else if (tabTyp == 19){ // 考点练习
                        if(sessionStorage.getItem(mockId)){
                            location.href = sessionStorage.getItem(mockId);
                            sessionStorage.clear(mockId);
                        } else {
                            location.href = mineDomain+"/details?cs="+cs+"#/mock";
                        }
                    }else{
                        location.href = "/subject/list/" + sku+"?subjectid="+navType+"&type="+tabTyp;
                    }
                }
            }
        }
    });
});

$(document).on("click",".BtnBox_paper",function () {
    $(".JSJdown").click();//隐计算器
    if(examAnswers.d ==4){
        tiku_util.initShades("zizhujiao");
    }else{
        var mysheetsNum=$(".loafText_me").text();
        var allsheetsNum=$(".loafText_all span").text();
        if(mysheetsNum==allsheetsNum){
            var tanValue=0;
            var tanName="paperGo";
            tanKuang(tanValue,tanName);
        }else{
            var tanValue=0;
            var tanName="weiwancheng";
            tanKuang(tanValue,tanName);
        }
    }

});
/*检查*/
$(document).on("click",".paperGo_btnL",function () {
    var tanValue=1;
    var tanName="paperGo";
    tanKuang(tanValue,tanName);
});
/*交卷*/
$(document).on("click",".paperGo_btnR",function () {
    if(!userD_t()){
        return
    }
    tiku_util.closeShade("paperGo");
    if(tabTyp==3||tabTyp==5||tabTyp==9||tabTyp==6){
        ASingleSubmit();//单题提交
    }else{
        clearInterval(n_timer);
    }
    submitCommon();
});
/*继续*/
$(document).on("click",".weiwancheng_btnL",function () {
    var tanValue=1;
    var tanName="weiwancheng";
    tanKuang(tanValue,tanName);
});
/*无自主交卷*/
$(document).on("click",".weiwancheng_btnR",function () {
    if(!userD_t()){
        return
    }
    tiku_util.closeShade("weiwancheng");
    if(tabTyp==3||tabTyp==5||tabTyp==9||tabTyp==6){
        ASingleSubmit();//单题提交
    }
    submitCommon();
});
/*有自主题交卷*/
$(document).on("click",".pingjia_btnR,.panfen_btnR",function () {
    if(!userD_t()){
        return
    }
    if(tabTyp==3||tabTyp==5 || tabTyp==6||tabTyp==9){
        tiku_util.closeShade("panfen");
    }else if(tabTyp==11){
        tiku_util.initShades("nodaTi2");
    }else{
        tiku_util.closeShade("pingjia");
    }
    examAnswers.d = "4";
    submitCommon();
});
// 自主页面交卷继续
$(document).on("click",".zizhujiao_btnL",function () {
    tiku_util.closeShade("zizhujiao");
});
// 自主页面交卷交卷
$(document).on("click",".zizhujiao_btnR",function () {
    tiku_util.closeShade("zizhujiao");
    examAnswers.d = "4";
    if(tabTyp==12){
        eliminate();
    }else{
        submitCommon();
    }

});
// 做题时间到交卷
$(document).on("click",".jiaojuan_btn",function () {
    if(!userD_t()){
        return
    }
    tiku_util.closeShade("jiaojuan");
    if(tabTyp==3||tabTyp==5||tabTyp==9||tabTyp==6){
        ASingleSubmit();//单题提交
    }
    examAnswers.d = "3";
    submitCommon();
});

//评价（掌握，不太了解）
$(document).on("click",".evaluateBtn",function () {
    var thisTX=getPaperTX(this);
    var thisId=getPaperId(this);
    var thisval=$(this).text();
    if(thisval == "掌握"){
        thisval = 1;
    } else {
        thisval = 0;
    }
    if (thisTX == 10) {//判断说明
        tiku_util.addAsAnswerJudgePan(thisId, thisval, '');
    } else if (thisTX == 7) {//填空
        tiku_util.addAsAnswerBlanksPan(thisId, thisval, '', '', '', '');
    } else if (thisTX == 6) {//简答题
        tiku_util.addAsAnswerPan(thisId, thisval, '', '');
    } else if (thisTX == 5) {//分录
        tiku_util.addBsAnswer(thisId, thisval, '', '', '', '', '', '')
    }
    $(this).parents(".evaluateBtnBox").prev(".questionList_content").attr("falg",true);
    $(this).parent().children("div").removeClass("evaluateBtn");
    $(this).siblings().addClass("colorDDD");
    var keyBtn = $(this).parent().siblings(".keyBtnBox").find(".keyBtn");
    if(keyBtn.length != 0){
        keyBtn.click();
    } else {
        var keyBox=$(this).parent().next(".questionList_KeyBox");
        if(keyBox.is(':hidden')){
            keyBox.stop().slideDown('300');
        }else{
            keyBox.stop().slideUp('300');
        }
    }
    var falg=true;
    addYizuo(thisId,falg);

});
//真题自主

$(document).on("click",".panfenBox_btnL",function () {
    tiku_util.closeShade("panfenBox");
    var thisTX=$(this).attr("thisTX");
    var thisId=$(this).attr("thisId");
    var thisval=$("#panfenBox .panfenIpt").val();
    if(thisval==""){
        thisval=0;
    }
    if (thisTX == 10) {//判断说明
        tiku_util.addAsAnswerJudgePan(thisId,'',thisval);
    } else if (thisTX == 7) {//填空
        tiku_util.addAsAnswerBlanksPan(thisId,'',thisval,'','','');
    } else if (thisTX == 6) {//简答题
        tiku_util.addAsAnswerPan(thisId,'',thisval, '');
    }
    $("#panfenBox .panfenIpt").val("");
    var dom=$(this).attr("dom");
    $("#"+dom).find(".questionList_content").attr("falg",true);
    $("#"+dom).find(".questionPanFenBox .questionPanFen").removeClass("questionPanFenClick").addClass("questionPanFenYizuo").html(thisval+"分").attr("myFen",thisval);
    $("#"+dom).find(".questionList_KeyBox").show();
    $("#"+dom).find(".keyBtnBox .keyBtn").html("收起");
    var falg=true;
    addYizuo(thisId,falg);
});


// 当前试题的试题题型
function getPaperTX(obj){
    var thisTests=$(obj).parents(".questionList").attr("tests");
    var thistiTX="";
    if(thisTests==4){
        thistiTX=$(obj).parents(".cailiaoListBox").attr("tests");
    }else{
        thistiTX=$(obj).parents(".questionList").attr("tests");
    }
    return thistiTX;
}

function submitCommon() {
    var data_c=tabTyp;//试卷类型
    var Data_b=$(".BoxLeft").attr("serial_number"); //试卷编号
    var Data_d=$(".data_d").attr("title"); //试卷名称
    if(tabTyp==3||tabTyp==5 || tabTyp==6 || tabTyp==9){
        var alltime=$("#time_keep").attr("time");
        var myTime=parseInt(alltime*60)-parseInt(tiku_util.timeToSec($("#time_keep").text()));
        examAnswers.e = JSON.stringify(myTime);
        if(data_f < 4){
            ASingleSubmit();//单题提交
        }
    }else{
        examAnswers.e = JSON.stringify(tiku_util.timeToSec($("#time_keep").text()));
    }
    var submitParam = tiku_util.examSubmitParams();
    if(typeof isTimetable!="undefined" && isTimetable==1){
        submitParam.info = info;
        submitParam.info.doPaperProgress = tiku_util.timeToSec($("#time_keep").text());
        var url = "/ai/homework/submits";
    } else {
        if(tabTyp == 9){
            // 模考提交统计
            submitParam.channel="nomal";
            submitParam.deviceId="web5c511e41529fe"+fingerprint+"web";
        }
        var url = '/exam/submits_new';
    }
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(submitParam),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            tiku_util.initShades("jjLoding");
        },
        success: function (result) {
            if (tiku_util.verifyStatus(result)) {
                reloadType=0;
                tiku_util.closeShade("jjLoding");
                tiku_util.cleanExamParams();
                var data_a = result.data.a;//用户做题编号
                if (result.data.f == 100) {
                    if(tabTyp==2){ /*章节练习*/
                        location.href = encodeURI("/redirect/chaptertest?a=" + sku + "&b=" + data_a + "&c=" + data_c + "&d=" + examId + "&e=" + navTypetext + "&f=" + Data_b + "&g=" + navType + "&i=" + Data_d + "&z=" + sku);
                    }
                    else if(tabTyp==3||tabTyp==5) { /*真题模拟试卷*/
                        location.href=encodeURI("/redirect/examinationPaper?a="+sku+"&b="+data_a+"&c="+data_c+"&d="+examId+"&e="+navTypetext+"&f="+Data_b+"&g="+navType+"&i="+Data_d+"&z="+sku);
                    }else if(tabTyp==8 || (typeof mock!="undefined" && mock==1 && tabTyp==19)){//专项测试
                        if(tabTyp==19){
                            location.href=encodeURI("/redirect/specialPractice?a="+sku+"&b="+data_a+"&c="+data_c+"&e="+navTypetext+"&f="+Data_b+"&g="+navType+"&i="+Data_d +"&z="+sku+"&mock=1&cs="+cs+"&mockId="+mockId);
                        } else {
                            location.href=encodeURI("/redirect/specialPractice?a="+sku+"&b="+data_a+"&c="+data_c+"&e="+navTypetext+"&f="+Data_b+"&g="+navType+"&i="+Data_d +"&z="+sku);
                        }
                    }else if(tabTyp==19) {//知识点练习
                        location.href = encodeURI("/redirect/examPractice?a=" + sku + "&b=" + data_a + "&c=" + data_c + "&d=" + testId + "&e=" + navTypetext + "&f=" + Data_b + "&g=" + tabTyp + "&h=" + examModel + "&i=" + Data_d+"&j="+papeNrumber+"&k="+navType+"&z="+sku+"&cs="+cs);
                    }else if(tabTyp==1) {//直播课作业

                        if(typeof isTimetable!="undefined" && isTimetable == 1){
                            var doPaperTime=examAnswers.e*1000;
                            doPaper(doPaperTime);
                            location.href = encodeURI("/redirect/homework?a=" + sku + "&b=" + data_a + "&c=" + data_c + "&d=" + 6 + "&e=" + navTypetext + "&f="+result.data.b+"&g=" + 1 + "&h=" + SeparateId + "&i=" + paperName+"&j="+testPaperId+"&k="+navType+"&z="+sku+"&cs="+cs +"&as="+as+"&isTimetable="+isTimetable+"&isAttend="+isAttend+"&classStudentId="+classStudentId+"&aiStatus="+aiStatus+"&attendClassId="+attendClassId+"&courseId="+courseId+"&pointOfAl="+pointOfAl+"&allTime="+submitParam.info.doPaperProgress+"&appType="+appType);
                        } else {
                            location.href = encodeURI("/redirect/homework?a=" + sku + "&b=" + data_a + "&c=" + data_c + "&d=" + 6 + "&e=" + navTypetext + "&f="+result.data.b+"&g=" + 1 + "&h=" + SeparateId + "&i=" + paperName+"&j="+testPaperId+"&k="+navType+"&z="+sku+"&cs="+cs);
                        }
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    }else if(tabTyp==6) {//证书考试
                        location.href=encodeURI("/redirect/pass?a="+sku+"&b="+data_a+"&c="+data_c+"&d="+examId+"&e="+navTypetext+"&f="+Data_b+"&g="+tabTyp+"&h="+examModel+"&i="+Data_d+"&k="+navType+"&z="+sku);
                    }else if(tabTyp==9) {//模考大赛
                        var newDate = new Date().getTime();
                        if(reportTime < newDate){
                            location.href=encodeURI("/redirect/moldTestSeriesReport?a="+sku+"&b="+data_a+"&c="+data_c+"&d="+examId+"&e="+navTypetext+"&f="+Data_b+"&g="+navType+"&i="+Data_d+"&z="+sku+"&cs="+cs+"&reportTime="+reportTime);
                        } else {
                            toast("交卷成功");
                            setTimeout(function () {
                                location.href=mineDomain + "/details?cs=" + cs + "#/mock";
                            },2000)
                        }
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    }else if(tabTyp==11) {//批量消灭
                        location.href=encodeURI("/redirect/wipeOutWrong?a="+sku+"&b="+data_a+"&c="+data_c+"&d="+examId+"&e="+navTypetext+"&g="+data_c+"&h="+specialID+"&k="+navType+"&z="+sku);
                    } else if (tabTyp == 18){ // ai家庭作业

                        var doPaperTime=examAnswers.e*1000;
                        doPaper(doPaperTime);
                        location.href = encodeURI("/redirect/homework?a=" + sku + "&b=" + data_a + "&c=" + data_c + "&d=" + 6 + "&e=" + navTypetext + "&f="+result.data.b+"&g=" + 1 + "&h=" + SeparateId + "&i=" + paperName+"&j="+testPaperId+"&k="+navType+"&z="+sku+"&cs="+cs +"&as="+as+"&isTimetable="+isTimetable+"&isAttend="+isAttend+"&classStudentId="+classStudentId+"&aiStatus="+aiStatus+"&attendClassId="+attendClassId+"&courseId="+courseId+"&pointOfAl="+pointOfAl+"&allTime="+submitParam.info.doPaperProgress+"&appType="+appType);

                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }}
                } else if (result.data.f == 4) {
                    papeNrumber = result.data.a;
                    // 自主页
                    if(tabTyp==2){
                        tiku_util.initShades("pingjia");
                        $(".pingjia_btnL").click(function () {
                            location.href = encodeURI("/redirect/IndependentlyChapter?a=" + papeNrumber  + "&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku);
                        })
                    }else if(tabTyp==3||tabTyp==5 || tabTyp==6 || tabTyp==9){
                        tiku_util.initShades("panfen");
                        $(".panfen_btnL").click(function () {
                            if(tabTyp==3){
                                location.href = encodeURI("/redirect/IndependentlyTrue?a=" + papeNrumber + "&b=2&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku);
                            }else if(tabTyp==5){
                                location.href = encodeURI("/redirect/IndependentlySim?a=" + papeNrumber + "&b=" + 2 + "&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku);
                            }else if(tabTyp==6) {//证书考试
                                location.href = encodeURI("/redirect/IndependentlyCertificate?a=" + papeNrumber + "&b=2&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku);
                            }else if(tabTyp==9) {//模考大赛
                                location.href = encodeURI("/redirect/Independentlymold?a=" + papeNrumber + "&b=2&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + 1 + "&cs="+cs+"&z=" + sku);
                            }
                        })
                    }else if(tabTyp==8){
                        tiku_util.initShades("pingjia");
                        $(".pingjia_btnL").click(function () {
                            location.href = encodeURI("/redirect/IndependentlySpecial?a=" + papeNrumber + "&b=" + 2 + "&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku);
                        })
                    }else if(tabTyp==19){
                        tiku_util.initShades("pingjia");
                        $(".pingjia_btnL").click(function () {
                            location.href = encodeURI("/redirect/IndependentlyKnowledge?a=" + papeNrumber + "&b=" + 2 + "&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&z=" + sku+"&cs="+cs);
                        })
                    }else if(tabTyp==1){//直播课作业

                        tiku_util.initShades("pingjia");
                        $(".pingjia_btnL").click(function () {
                            location.href = encodeURI("/redirect/IndependentlyLive?a=" + papeNrumber + "&b=" + 3 + "&c=" + sku + "&d=" + examId + "&e=" + navTypetext + "&f=" + tabTyp + "&g=" + navType + "&h="+SeparateId+"&i="+paperName+"&j="+testPaperId+"&cs="+cs+"&z=" + sku);
                        })
                        if(window.opener && typeof window.opener.reloadPre != "undefined"){
                            window.opener.reloadPre();
                        }
                    }else if(tabTyp==11) {//批量消灭
                        tiku_util.initShades("cuotipingjia");
                        $(".pingjia_btnL").click(function () {
                            location.href=encodeURI("/redirect/IndependentlyWrong?a="+data_a+"&b=4&c="+sku+"&d="+examId+"&e="+navTypetext+"&f="+11+"&g="+navType+"&h="+specialID+"&z="+sku);
                        })
                    }
                }
            }else{
                $(".grtDown").click(function () {
                    window.close();
                });
                tiku_util.closeShade("jjLoding");
                return;
            }
        },
        complete: function() {
            tiku_util.closeShade("jjLoding");
        },
        error:function () {
            tiku_util.closeShade("jjLoding");
        }
    })
    try {
        window.opener.location.reload();
    }catch (e){
    }}

/*单题提交接口*/
function ASingleSubmit() {
    if(!userD_t()){
        return
    }
    var submitParam = tiku_util.examSubmitParams();
    if(submitParam && submitParam.as && submitParam.as.length > 0){
        $.ajax({
            url: '/exam/submit',
            type: 'post',
            data: JSON.stringify(submitParam),
            dataType: "json",
            contentType: "application/json",
            async : false,
            success: function (result) {
                if (result.status == 200) {
                    tiku_util.cleanExamParams();
                }
            },
            error: function (err, error) {
            }
        });
    }
}
/*试卷已提交，请勿重复提交*/
function backLiebiao(sku) {
    tiku_util.initShades("downPresent");
    $(".grtDown").click(function () {
        if(tabTyp==1 ||tabTyp==6 || tabTyp==9){
            // location.href = ucDomain+"userMain?nav=1#/userMainNg";
            location.href = mineDomain;
        }else{
            window.location.href="/subject/list/"+sku;
        }
        window.opener.location.reload();
    });
}

// _____转Input
function zhuanHuanIpt() {
    var changeIpt="<input class='myIpt myXuanDom' type='text' placeholder='点击填写'/>";
    var changeSpan="<span class='myDianji myXuanDom'><span class='myDianji_tishi'>点击选择答案</span></span>";
    $(".changeIpt").each(function () {
        var changeIptText=$(this).html();
        if($(this).parents(".cailiaoListBox").attr("tests")==7||$(this).parents(".questionList").attr("tests")==7){
            var changeIpthtml= changeIptText.split('_____').join(changeIpt);
        }else if($(this).parents(".cailiaoListBox").attr("tests")==8||$(this).parents(".questionList").attr("tests")==8){
            var changeIpthtml= changeIptText.split('_____').join(changeSpan);
        }
        $(this).html(changeIpthtml);
    });
};

//段落匹配
function duanluoPiPei() {
    $(".duanLuo_top .duanLuo_zhong").width($(".duanLuo_top").width()-$(".duanLuo_topLeft").width()-$(".duanLuo_topRight").width()-2);
    $(".duanLuo_top ul").each(function () {
        var duoluoRight=$(this).parents(".duanLuo_top").find(".duanLuo_topRight");
        var duoluoLeft=$(this).parents(".duanLuo_top").find(".duanLuo_topLeft");
        $(this).width($(this).find("li").length*($(this).find("li").width()+1));
        if($(this).width()>$(this).parent(".duanLuo_zhong").width()){
            $(this).parents(".duanLuo_top").find(".duanLuo_topRight").css("background","url('/images/testPaper/duanluoRightlv.png') no-repeat center");
            var duanLuo_move=0;
            var ulWidth= $(this).width();
            var duanLuo_moveWidth=$(".duanLuo_top ul li").width()+1;
            var ulBoxWidth=$(".duanLuo_top .duanLuo_zhong").width();
            var _click_count = 0;
            duoluoRight.click(function () {
                if(ulBoxWidth+duanLuo_moveWidth*_click_count<ulWidth){
                    _click_count++;
                    $(this).parents(".duanLuo_top").find("ul").css("left",-duanLuo_moveWidth*_click_count);
                    duoluoLeft.css("background","url('/images/testPaper/duanluoLeftLv.png') no-repeat center");
                }else{
                    $(this).parents(".duanLuo_top").find("ul").css("left",-duanLuo_moveWidth*_click_count);
                    duoluoRight.css("background","url('/images/testPaper/duanluoRight.png') no-repeat center");
                    duoluoLeft.css("background","url('/images/testPaper/duanluoLeftLv.png') no-repeat center");
                }
            });
            duoluoLeft.click(function () {
                if(_click_count<2){
                    _click_count = 0;
                    $(this).parents(".duanLuo_top").find("ul").css("left",0);
                    duoluoLeft.css("background","url('/images/testPaper/duanluoLeft.png') no-repeat center");
                    duoluoRight.css("background","url('/images/testPaper/duanluoRightLv.png') no-repeat center");
                }else{
                    _click_count--;
                    $(this).parents(".duanLuo_top").find("ul").css("left",-duanLuo_moveWidth*_click_count);
                    duoluoLeft.css("background","url('/images/testPaper/duanluoLeftLv.png') no-repeat center");
                    duoluoRight.css("background","url('/images/testPaper/duanluoRightLv.png') no-repeat center");
                }
            });
        }else{
            duoluoRight.unbind("click");
            duoluoLeft.unbind("click");
            duoluoRight.css("background","url('/images/testPaper/duanluoRight.png') no-repeat center");
        }
    });

    $(".duanLuoCenter").each(function () {
        var thatBox=$(this);
        thatBox.find(".duanLuo_xuanBox").eq(0).show();
        thatBox.find(".duanLuo_zhong ul li").eq(0).addClass("addBgc");

        thatBox.find(".duanLuo_zhong ul li").each(function (i) {
            var tahtLi=$(this);
            tahtLi.click(function () {
                tahtLi.addClass("addBgc").siblings("li").removeClass("addBgc");
                thatBox.find(".duanLuo_xuanBox").eq(i).show().siblings(".duanLuo_xuanBox").hide();
            })
        })
    });
};

//材料
$(document).on("click", ".cailiaoList_title",function () {
    var caiLiaoList=$(this).next();
    $(this).parents(".questionList_content").find(".cailiaoList_center").not(caiLiaoList).slideUp();
    $(this).parents(".questionList_content").find(".cailiaoList_titleTu").attr("src","/images/testPaper/caiLiaoDown.png");
    $(this).parents(".questionList_content").find(".cailiaoList_title").css("background","#fafafa");
    caiLiaoList.slideToggle("300",function () {
        if(caiLiaoList.css("display")=="none"){
            $(this).parents(".cailiaoListBox").find(".cailiaoList_titleTu").attr("src","/images/testPaper/caiLiaoDown.png");
            $(this).parents(".cailiaoListBox").find(".cailiaoList_title").css("background","#fafafa");
        }else{
            $(this).parents(".cailiaoListBox").find(".cailiaoList_titleTu").attr("src","/images/testPaper/caiLiaoUp.png");
            $(this).parents(".cailiaoListBox").find(".cailiaoList_title").css("background","#f5f5f5");
        }
    });
});

//小工具

//章节小工具显示
$(document).on("click",".smallTools",function (e) {
    var e= e || window.event;
    var that=$(this);
    if($('.toool_listBox').is(':hidden')){
        $('.toool_listBox').stop().fadeIn('300');
        var src="/images/testPaper/toolUp.png";
        toolsImg(that,src);
    }else{
        $('.toool_listBox').stop().fadeOut('300');
        var src="/images/testPaper/toolDown.png";
        toolsImg(that,src);
    }
    $(document).on("click", function(){
        $('.toool_listBox').hide();
        $(".smallTools").find(".toolDwOrUP").fadeOut(function(){
            $(this).attr("src","/images/testPaper/toolDown.png");
            $(this).fadeIn("100");
        });
    });
    e.stopPropagation();
});
//真题小工具显示
$(document).on("click",".Zttools",function (e) {
    var e= e || window.event;
    $(".BoxRight_BtnBox").hide();
    $(".toool_listBox").show();
    $(".toool_list").eq($(".toool_list").length-1).find(".toool_listGap").remove();
    $(".toool_listBox").width($(".toool_list").width()*$(".toool_list").length);
    $(document).on("click", function(){
        $('.toool_listBox').hide();
        $(".BoxRight_BtnBox").show();
    });
    e.stopPropagation();
});
$(document).on("click",".toool_listBox",function (e) {
    var e= e || window.event;
    e.stopPropagation();
});
function toolsImg(that,src) {
    that.find(".toolDwOrUP").fadeOut(function(){
        $(this).attr("src",src);
        $(this).fadeIn("100");
    });
};
//小工具获取；
function grtTools(sku,navType) {
    var toolsdata={a:sku,b:navType};
    var toolsdatas=JSON.stringify(toolsdata);
    $.ajax({
        type: "POST",
        url:"/common/tools",
        dataType: "json",
        contentType: "application/json",
        data:toolsdatas,
        success:function (data) {
            var as=data.data.as;
            for(var i=0;i<as.length;i++){
                if(as[i].e){
                    as[i].e=tuDomain+as[i].e;
                }
            }
            var html = template('gettools',data);
            $(".toool_listBox").html(html);
            $(".toool_listOther").attr("target","_blank");
            $("#jisuanqi").click(function () {
                $("#calculatorShow").show()
            });
        }
    })
}



//纠错
function titleMark_error(a,b) {
    var c="";
    var d="";
    var f="";
    var g="";
    var that="";
    $(document).on("click",".titleMark_error",function () {
        var jiucuo="";
        jiucuo+='<div id="jiucuo" style="display: none">'+
            '<p class="jiucuo_titp">我要纠错</p>'+
            '<p style="color:#999;margin-top: 10px">您的建议对我们很宝贵</p>'+
            '<p class="jiucuo_titLp">纠错类型</p>'+
            '<div class="danxuan">'+
            '<input id="misprint" type="radio" name="wrong" value="1">'+
            '<label class="iptLab" for="misprint">错别字</label>'+
            '<input id="parseWrong" type="radio" name="wrong" value="2">'+
            '<label class="iptLab" for="parseWrong">解析不匹配</label>'+
            '<input id="keyWrong" type="radio" name="wrong" value="3">'+
            '<label class="iptLab" for="keyWrong">错误答案</label>'+
            '<input id="other" type="radio" name="wrong" value="4">'+
            '<label class="iptLab" for="other" style="margin-right: 0">其他</label>'+
            '</div><br/>'+
            '<p class="jiucuo_titLp">纠错范围</p>'+
            '<div style="position: relative">'+
            '<div class="sanjiaoDown"></div>'+
            '<img class="ieSanjiao" src="/images/ChapterTestPractice/wrongSanjiao.png" style="display: none"/>'+
            '<select class="optionContent" >'+
            '<option value="1">试题内容</option>'+
            '<option value="2">参考答案</option>'+
            '<option value="3">解析</option>'+
            '<option value="4">其他</option>'+
            '</select>'+
            '</div>'+
            '<p class="jiucuo_titLp">纠错内容</p>'+
            '<div class="jiucuokuang">'+
            '<textarea class="jiucuoContent" type="text" placeholder="请输入纠错内容，我们在收到后会及时为你解决。"></textarea>'+
            '</div>'+
            '<div style="padding:0 85px">'+
            '<div class="jiucuo_btnL common_btn common_btnL" style="margin-top: 25px">提交</div>'+
            '<div class="jiucuo_btnR common_btn common_btnR" style="margin-top: 25px">取消</div>'+
            '</div>'+
            '<div class="TsTishi" style="width: 200px;height: 40px;background:rgba(51,51,51,0.4);position: absolute;left: 50%;top:50%;margin-left: -100px;margin-top: -20px;border-radius: 4px;display: none;line-height: 40px;font-size: 14px;color: #000"></div>'+
            '</div>';
        if($("#jiucuo").length==0){
            $(".BigBox").after(jiucuo);
        }
        tiku_util.initShades("jiucuo");
        var tests=$(this).parents(".questionList").attr("tests");
        if(tests==4){
            d=$(this).parents(".cailiaoListBox").attr("thistinum");
            f=$(this).parents(".cailiaoListBox").find(".titleNumber").text();
        }else{
            d=$(this).parents(".questionList").attr("thistinum");
            f=$(this).parents(".questionList_top").find(".titleNumber").text();
        }
        c=$(this).parents(".BoxLeft").attr("serial_number");
        g=$(this).parents(".BoxLeft").attr("userpapernum")?$(this).parents(".BoxLeft").attr("userpapernum"):"ctxm";
        console.log(g);
        tiku_util.initShades("jiucuo");
        that=$(this);
    });


    $(document).on("click",".jiucuo_btnL",function () {
            var h=$('.danxuan input[name="wrong"]:checked').val();
            var i=$(".optionContent").val();
            var j=$(".jiucuoContent").val();
            var e="0";//web端
            if(h==""||h==null){
                $(".TsTishi").html("未选择纠错类型");
                $(".TsTishi").show();
                setTimeout(function () {
                    $(".TsTishi").hide()
                },1000);
                return false;
            }else{
                $(".TsTishi").hide();
            }
            if(j==""){
                $(".TsTishi").html("未填写纠错内容");
                $(".TsTishi").show();
                setTimeout(function () {
                    $(".TsTishi").hide()
                },1000);
                return false;
            }else{
                $(".TsTishi").hide();
            }
            $("#jiucuo").find(".common_btnL").html("提交中...");
            $("#jiucuo").find(".common_btnL").removeClass("jiucuo_btnL");
            var dataRrror={a:a,b:b,c:c,d:d,e:e,f:f,g:g,h:h,i:i,j:j};
            var dataRrrors=JSON.stringify(dataRrror);
            $.ajax({
                url:'/feedback/title_error',
                type:'POST',
                data:dataRrrors,
                dataType:"json",
                contentType: "application/json",
                success:function(result){
                    if(tiku_util.verifyStatus(result)){
                        $("#jiucuo").find(".common_btnL").addClass("jiucuo_btnL");
                        $(".jiucuo_btnL").html("提交");
                        that.addClass('errorActive');
                        $('.danxuan input[name="wrong"]').prop('checked','');
                        $(".jiucuoContent").val("");
                        $(".optionContent").val("1");
                        tiku_util.closeShade("jiucuo");
                    }else{
                        $("#jiucuo").find(".common_btnL").addClass("jiucuo_btnL");
                        $(".jiucuo_btnL").html("提交");
                        $('.danxuan input[name="wrong"]').prop('checked','');
                        $(".jiucuoContent").val("");
                        $(".optionContent").val("1");
                        tiku_util.closeShade("jiucuo");
                    }
                },
                error:function(err,error){
                    $("#jiucuo").addClass("jiucuo_btnL");
                    $(".jiucuo_btnL").html("提交");
                    that.removeClass('errorActive');
                    tiku_util.closeShade("jiucuo");
                }
            });
        })
        $(document).on("click",".jiucuo_btnR",function () {
            tiku_util.closeShade("jiucuo");
            $('.danxuan input[name="wrong"]').prop('checked','');
            $(".jiucuoContent").val("");
            $(".optionContent").val("1");
        });
};
//收藏
function titleMark_collect(a,b,c,id) {
    var num="";
    var d="";
    var e="";
    var f="";
    var g="";
    var that="";
    $(document).on("click",".titleMark_collect",function () {
        if(id){
            d=id;
            num=module;
        } else{
            d=$(this).parents(".BoxLeft").attr("serial_number");
            num=c;
        }
        var tests=$(this).parents(".questionList").attr("tests");
        if(tests==4){
            e=$(this).parents(".cailiaoListBox").attr("tests");
            f=$(this).parents(".cailiaoListBox").attr("thistinum");
        }else{
            e=$(this).parents(".questionList").attr("tests");
            f=$(this).parents(".questionList").attr("thistinum");
        }
        if($(this).hasClass("collectActive")){
            g=2
        }else{
            g=1
        }
        if(typeof isTimetable!="undefined" && isTimetable==1){
            var dataRollect= {a:a,b:b,c:num,d:d,e:e,f:f,g:g,info:info};
            var dataRollects=JSON.stringify(dataRollect);
        } else {
            var dataRollect= {a:a,b:b,c:num,d:d,e:e,f:f,g:g};
            var dataRollects=JSON.stringify(dataRollect);
        }

        that=$(this);
        $.ajax({
            url:'/subject/addTitleCollection',
            type:'POST',
            data:dataRollects,
            dataType:"json",
            contentType: "application/json",
            success:function(result) {
                if(result.status == 200){
                    if(g==1){
                        var loveImg=$("<img class='loveImg' src='/images/testPaper/titleMark_collect2.png' style='width: 14px;height: 14px;position: absolute;left: 0;top:9px'/>");
                        that.append(loveImg);
                        that.addClass("collectActive");
                        that.find(".loveImg").animate({top:"-9px",opacity:'0'},1000,function () {
                            that.find(".loveImg").remove();
                        });
                    }else{
                        that.removeClass("collectActive")
                    }
                }
            }
        })
    })
};
//标记
function titleMark_mark() {
    var markPrice=0;
    $(document).on("click",".titleMark_mark",function () {
        var thisthinum = getPaperId(this);
        if($(this).hasClass("markActive")){
            markPrice=1;
            $(this).removeClass("markActive");
            $("#cardId_" + thisthinum).find(".tiNumber_biaoji").hide();
        }else{
            markPrice=0;
            $(this).addClass("markActive");
            $("#cardId_" + thisthinum).find(".tiNumber_biaoji").show();
            if($("#cardId_" + thisthinum).hasClass("tiNumber_yizuo")){
                $("#cardId_" + thisthinum).find(".tiNumber_biaoji").css({"left":"0","top":"0"})
            }
        }
    })
};
/*---------------------------------------------------------------*/

//分录下拉选项
function divselect(divselectid,inputselectid) {
    $(document).on("click",".divselect cite",function (e) {
        var e= e || window.event;
        var ul=$(this).parents(".divselect").find("ul");
        if(ul.css("display")=="none"){
            ul.slideDown("fast");
        }else{
            ul.slideUp("fast");
        }
        $(document).on("click", function(){
            ul.hide();
        });
        e.stopPropagation();
    });
};
// 分录题
function fenluList_pinJie() {
    var fenlu_list="";
    fenlu_list='<div class="fenLuList">'+
        '<p class="delListBox">' +
        '<span class="delList"></span>'+
        '<span class="fenlu_tishi">只能为数字</span>'+
        '</p>'+
        '<div class="fenLuLine">'+
        '<div class="divselect">'+
        '<cite>借</cite>'+
        '<ul>'+
        '<li><a href="javascript:;" selectid="1">借</a></li>'+
        '<li><a href="javascript:;" selectid="2">贷</a></li>'+
        '</ul>'+
        '<input name="" type="hidden" value="" class="inputselect"/>'+
        '</div>'+
        '<div class="fenlu_kemu">'+
        '<span class="fenlu_title">科目：</span>'+
        '<input class="fenlu_kemuIpt" type="text" placeholder="请填写科目">'+
        '</div>'+
        '<div class="fenlu_jine">'+
        '<span class="fenlu_title">金额：</span>'+
        '<input class="fenlu_jineIpt" type="text" placeholder="请输入金额" maxlength="12">'+
        '</div>'+
        '<div class="delOneLine"></div>'+
        '</div>'+
        '<div class="fenLuLine">'+
        '<div class="divselect">'+
        '<cite>借</cite>'+
        '<ul>'+
        '<li><a href="javascript:;" selectid="1">借</a></li>'+
        '<li><a href="javascript:;" selectid="2">贷</a></li>'+
        '</ul>'+
        '<input name="" type="hidden" value="" class="inputselect"/>'+
        '</div>'+
        '<div class="fenlu_kemu">'+
        '<span class="fenlu_title">科目：</span>'+
        '<input class="fenlu_kemuIpt" type="text" placeholder="请填写科目">'+
        '</div>'+
        '<div class="fenlu_jine">'+
        '<span class="fenlu_title">金额：</span>'+
        '<input class="fenlu_jineIpt" type="text" placeholder="请输入金额"  maxlength="12">'+
        '</div>'+
        '<div class="delOneLine"></div>'+
        '</div>'+
        '<p class="addOneLine"><span>+&nbsp;</span>新建行</p>'+
        '</div>';
    return fenlu_list;
}
/*输入金额录入数据*/
function jineIpt() {
    $(".fenlu_jineIpt").bind("input onpropertychange",function () {
        var thisText=$(this).val();
        var reg=/^\d+(.\d+)?/;
        var reg2=/\d/;
        var arr=[];
        var end2="";
        for(var i=0;i<thisText.length;i++){
            if(thisText.charAt(i)=="."){
                arr.push(".")
            }
            end2=thisText.charAt(thisText.length-1);
            if( reg.test($(this).val()) &&(end2=="."||reg2.test(end2)) &&(arr.length<=1) ){
            }else{
                $(this).parents(".fenLuList").find(".fenlu_tishi").show();
                var that= $(this);
                setTimeout(function () {
                    that.parents(".fenLuList").find(".fenlu_tishi").hide();
                },1000);
                $(this).val('');
            }
        }
        var thisthinum = getPaperId(this);
        var info=fenluZhi(this);
        var falg= info.fenlu_xiala.length!=0 ||info.fenlu_kemu.length!=0 || info.fenlu_jine.length!=0  ;
        addYizuo(thisthinum,falg);
        var fenlu_zuNum=$(this).parents(".fenLuList").attr("index");
        var fenlu_hangNum=$(this).parents(".fenLuLine").attr("index");
        var myXialatext=$(this).parents(".fenLuLine").find("cite").text();
        var myKemutext=$(this).parents(".fenLuLine").find(".fenlu_kemuIpt").val();
        var myJinetext=$(this).val();
        if(data_f == 2){
            var fenLuListZu=$(this).parents(".fenLuListBox").find(".fenLuList");
            FenluCycledd(thisthinum,fenLuListZu);
        }else{
            tiku_util.addBsAnswer(thisthinum,'0','0',fenlu_zuNum,fenlu_hangNum,myXialatext,myKemutext,myJinetext);
        }

    });
}

function fenluti_listIndex() {
    for(var i=0;i<$(".fenLuTiBox").length;i++){
        $(".fenLuTiBox").eq(i).find(".fenLuList").each(function (j) {
            $(".fenLuTiBox").eq(i).find(".fenLuList").eq(j).attr("index",j);
            $(".fenLuTiBox").eq(i).find(".fenLuList").eq(j).find(".fenLuLine").each(function (k) {
                $(".fenLuTiBox").eq(i).find(".fenLuList").eq(j).find(".fenLuLine").eq(k).attr("index",k);
            })
        })
    }
}

function fenluCaiLiao() {
    $(".fenLuListBox").each(function (i) {
        if($(this).parents(".questionList").attr("tests")==4){
            $(this).parents(".questionList").find(".fenlu_kemu").addClass("caiLiao_fenluKM");
            $(this).parents(".questionList").find(".fenlu_jine").addClass("caiLiao_fenluJE");
        }
    })
}
/*填写科目录入数据*/
$(document).on("blur",".fenlu_kemuIpt",function () {
    var thisthinum = getPaperId(this);
    var info=fenluZhi(this);
    var falg= info.fenlu_xiala.length!=0 ||info.fenlu_kemu.length!=0 || info.fenlu_jine.length!=0  ;
    addYizuo(thisthinum,falg);
    var fenlu_zuNum=$(this).parents(".fenLuList").attr("index");
    var fenlu_hangNum=$(this).parents(".fenLuLine").attr("index");
    var myXialatext=$(this).parents(".fenLuLine").find("cite").text();
    var myKemutext=$(this).val();
    var myJinetext=$(this).parents(".fenLuLine").find(".fenlu_jineIpt").val();
    if(data_f == 2){
        var fenLuListZu=$(this).parents(".fenLuListBox").find(".fenLuList");
        FenluCycledd(thisthinum,fenLuListZu);
    }else{
        tiku_util.addBsAnswer(thisthinum,'0','0',fenlu_zuNum,fenlu_hangNum,myXialatext,myKemutext,myJinetext);
    }

});
/*下拉录入数据*/
$(document).on("click",".divselect ul a",function () {
    var txt = $(this).text();
    $(this).parents(".divselect").find("cite").html(txt);
    var value = $(this).attr("selectid");
    $(this).parents(".divselect").find(".inputselect").val(value);
    var thisthinum = getPaperId(this);
    var info=fenluZhi(this);
    var falg= info.fenlu_xiala.length!=0 ||info.fenlu_kemu.length!=0 || info.fenlu_jine.length!=0  ;
    addYizuo(thisthinum,falg);
    var fenlu_zuNum=$(this).parents(".fenLuList").attr("index");
    var fenlu_hangNum=$(this).parents(".fenLuLine").attr("index");
    var myXialatext=$(this).parents(".divselect").find("cite").text();
    var myKemutext=$(this).parents(".fenLuLine").find(".fenlu_kemuIpt").val();
    var myJinetext=$(this).parents(".fenLuLine").find(".fenlu_jineIpt").val();

    if(data_f == 2){
        var fenLuListZu=$(this).parents(".fenLuListBox").find(".fenLuList");
        FenluCycledd(thisthinum,fenLuListZu);
    }else{
        tiku_util.addBsAnswer(thisthinum,'0','0',fenlu_zuNum,fenlu_hangNum,myXialatext,myKemutext,myJinetext);
    }

});



function fenluZhi(that) {
    var fenlu_xiala=[];
    var fenlu_kemu=[];
    var fenlu_jine=[];
    $(that).parents(".fenLuListBox").find(".inputselect").each(function () {
        if($(this).val()!=""){
            fenlu_xiala.push($(this).val());
        }
    });
    $(that).parents(".fenLuListBox").find(".fenlu_kemuIpt").each(function () {
        if($(this).val()!=""){
            fenlu_kemu.push($(this).val());
        }
    });
    $(that).parents(".fenLuListBox").find(".fenlu_jineIpt").each(function () {
        if($(this).val()!=""){
            fenlu_jine.push($(this).val());
        }
    });
    var info={"fenlu_xiala":fenlu_xiala,"fenlu_kemu":fenlu_kemu,"fenlu_jine":fenlu_jine};
    return info;
}

/*---------------------------------------------------------------*/
//答题卡添加已做状态
function addYizuo(thisthinum,falg) {
    if(falg){
        $("#cardId_" + thisthinum).addClass("tiNumber_yizuo");
        if($("#cardId_" + thisthinum).find(".tiNumber_biaoji").css("display")=="block"){
            $("#cardId_" + thisthinum).find(".tiNumber_biaoji").css({"left":"0","top":"0"});
        }
        $(".loafText_me").text($(".tiNumber_yizuo").length);
        var plan_loafMy=$(".plan_loaf").width()*$(".loafText_me").text()/$(".loafText_all span").text();
        $(".plan_loafMy").width(plan_loafMy);
    }else{
        $("#cardId_" + thisthinum).removeClass("tiNumber_yizuo");
        $(".loafText_me").text($(".tiNumber_yizuo").length);
        var plan_loafMy=$(".plan_loaf").width()*$(".loafText_me").text()/$(".loafText_all span").text();
        $(".plan_loafMy").width(plan_loafMy);
    }
}

// 当前试题的试题id
function getPaperId(obj){
    var tests=$(obj).parents(".questionList").attr("tests");
    var thistinum="";
    if(tests==4){
        thistinum=$(obj).parents(".cailiaoListBox").attr("thistinum");
    }else{
        thistinum=$(obj).parents(".questionList").attr("thistinum");
    }
    return thistinum;
}
//分录id
function getFenluId(tests,thistinum){
    var fenluID;
    if(tests==5){
        fenluID=$("#paper_"+thistinum);
    }else if(tests==4){
        fenluID=$("#clTi_"+thistinum);
    }
    return fenluID;
}
//分录循环添加
function FenluCycledd(thistinum,fenLuListZu) {
    fenLuListZu.each(function (zu) {
        var fenlu_zuNum = fenLuListZu.eq(zu).attr("index");
        var  fenLuLineTiao = fenLuListZu.eq(zu).find(".fenLuLine");
        fenLuLineTiao.each(function (tiao) {
            var fenlu_hangNum = fenLuLineTiao.eq(tiao).attr("index");
            var myXialatext = fenLuLineTiao.eq(tiao).find("cite").text();
            var myKemutext = fenLuLineTiao.eq(tiao).find(".fenlu_kemuIpt").val();
            var myJinetext = fenLuLineTiao.eq(tiao).find(".fenlu_jineIpt").val();
            tiku_util.addBsAnswer(thistinum,'0','0',fenlu_zuNum,fenlu_hangNum,myXialatext,myKemutext,myJinetext);
        })
    })

}


//小功能
function xiaogongNeng() {
    window.onbeforeunload = function(event) {
        if(reloadType==1){
            return "您编辑的信息尚未保存，您确定要离开吗？"//这里内容不会显示在提示框，为了增加语义化。
        }
    };
    //暂停图片
    $(".BtnBox_timeOut").mouseover(function () {
        var myBtnimg="/images/testPaper/stopLv1.png";
        var myBtnspan="#444";
        imgAndSpan(this,myBtnimg,myBtnspan);
    })
    $(".BtnBox_timeOut").mouseout(function () {
        var myBtnimg="/images/testPaper/stopLv.png";
        var myBtnspan="#666";
        imgAndSpan(this,myBtnimg,myBtnspan);
    })
    //暂停
    $(".BtnBox_timeOut").click(function () {
        $(".JSJdown").click();//`
        var tanValue=0;
        var tanName="zanting";
        tanKuang(tanValue,tanName);
        if(!userD_t()){
            return
        }
    })
    //选项width
    var options_RightWidth=$(".common_option").width()- $(".options_left").width()-10;
    $(".options_Right").css("max-width",options_RightWidth);
    setTimeout(function () {
        var options_RightWidthC=$(".cailiaoListBox .common_option").width()- $(".cailiaoListBox .options_left").width()-10;
        $(".cailiaoListBox .options_Right").css("max-width",options_RightWidthC);
    },0);
    //进度条
    var plan_loafMy=$(".plan_loaf").width()*$(".loafText_me").text()/$(".loafText_all span").text();
    $(".plan_loafMy").width(plan_loafMy);

    //小题题号
    $(".titleNumber").each(function (i) {
        $(".titleNumber").eq(i).html(i+1)
    });
    $(".tiNumber").each(function (i) {
        $(".tiNumber").eq(i).find("span").text(i+1)
    });

    //判断说明 填框宽度
    // $(".commonTextArea").each(function () {
    //     $(this).width($(this).parents(".JudgeThatBox").width()-10-2)
    // });
    //解题思路展开闭合
    $(".keyBtn").click(function () {
        var keyBox=$(this).parent().next(".questionList_KeyBox");
        if(keyBox.is(':hidden')){
            keyBox.stop().slideDown('300');
            $(this).text('收起');

        }else{
            keyBox.stop().slideUp('300');
            $(this).text('解题思路');
        }
    });
    //滚动条
    $(".scrollLine").each(function () {
        if($(this).height()>=238){
            var scrollDom=$(this);
            scrollLine(scrollDom);
        }
    });
    /*自主时提示框*/
    $('.SelfP2').hover(function () {
        $(this).siblings(".SelfP3").show();
    },function () {
        $(this).siblings(".SelfP3").hide();
    });
    /*弹窗自主题数量*/
    var TestStatus=$(".TestStatus").length;
    $(".independent").html(TestStatus);
    var loafText=$(".loafText_all>span").text();
    $("#system").html(loafText-TestStatus);
    /*题中图片之上加</br>*/
    $(".questionList_subject").find("img").before("<br/>");
    $(".options_Right").find("img").after("<br/>");
    $(".options_Right").find("img").parent("p").append("<br/>");
    //真题 答题卡样式
    for(var i=0;i<$(".daTiCard_tiHaoBox").length;i++){
        for (var j=0;j<$(".daTiCard_tiHaoBox").eq(i).find(".tiNumber").length;j++){
            $(".daTiCard_tiHaoBox").eq(i).find(".tiNumber").eq(j*5-1).css("margin-right","44px");
        }
    }
    //答题卡适应高度
    $(".BoxRight_answer .BigtiNumberBox").css("max-height",($(window).height()-280)*0.6);
    //材料题首次显示第一题
    $(".questionList").each(function (i) {
        var tests=$(this).attr("tests");
        if(tests==4){
            $(this).find(".cailiaoList_titleTu").eq(0).attr("src","/images/testPaper/caiLiaoUp.png");
            $(this).find(".cailiaoList_title").eq(0).css("background","#f5f5f5");
            $(this).find(".cailiaoList_center").eq(0).show();
        }
    })

}

//下一题上一题显示
function upOrDown() {
    if($(".questionList").eq(0).css("display")=="block"){
        $(".lastTiBtn").hide();
    }else{
        $(".lastTiBtn").show();
    }
    if($(".questionList").eq($(".questionList").length-1).css("display")=="block"){
        $(".nextTiBtn").hide();
    }else{
        $(".nextTiBtn").show();
    }
}

//真题答题卡 点击题号显示题
function ztcard_ti() {
    $(document).on("click",".tiNumber",function () {
        var cardId=$(this).attr("questionListId");
        $(".questionList").hide();
        $("#paper_"+cardId).show();
        $(".tiNumber").removeClass("tiNumber_this");
        $(this).addClass("tiNumber_this");
        upOrDown();
        if(examModel != 2){
            ASingleSubmit();//单题提交
        }
    });
}

//下一题上一题显示-----点击
function upOrDown_click() {
    $(".nextTiBtn").each(function (i) {
        $(this).click(function () {
            clickUpOrDown(1,i);
        })
    });
    $(".lastTiBtn").each(function (i) {
        $(this).click(function () {
            clickUpOrDown(-1,i)
        })
    });
}

function clickUpOrDown(num,index) {
    $(".questionList").eq(index+num).show();
    $(".questionList").eq(index).hide();
    $(".daTiCard_tiXing").find("a").each(function () {
        if($(".questionList").eq(index+num).find(".questionTtem").find("p").text()==$(this).text()){
            $(this).attr("class","daTiCard_navActive");
            $(this).click();
        }
    })
    upOrDown();
    $(".tiNumber").eq(index+num).addClass("tiNumber_this");
    $(".tiNumber").eq(index).removeClass("tiNumber_this");
    if(examModel != 2){
        ASingleSubmit();//单题提交
    }

}


//右模块滚动
function webRigth() {
    $(window).on("scroll", function () {
        var sTops = $(window).scrollTop();
        var sTop = parseInt(sTops);
        var rightTop=$(".BigBox").offset().top;
        var footTop=$(".foot_centerBox").offset().top;
        var TiRight=$(".BoxRight").height()+50;
        var leftHeight=$(".BigBox").height();
        var rightHeight=$(".BoxRight").height();
        if(leftHeight<=rightHeight){
            $(".BoxRight").removeClass("BoxRightding");
        }else if(leftHeight>rightHeight){
            if (rightTop-sTop <= 0) {
                $(".BoxRight").addClass("BoxRightding");
                if(footTop-sTop<=TiRight){
                    $(".BoxRight").css("top",footTop-sTop-TiRight+"px");
                }else{
                    $(".BoxRight").css("top",0+"px");
                }
            }else if(rightTop-sTop > 0){
                $(".BoxRight").removeClass("BoxRightding");
            }
        }
    })
}

//真题答题卡 点击题型显示题号
function ztcard_Tihao() {
    $(".daTiCard_tiXing a").eq(0).addClass("daTiCard_navActive");
    $(".daTiCard_tiHaoBox").eq(0).show();
    $(".daTiCard_tiXing a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("daTiCard_navActive").siblings().removeClass("daTiCard_navActive");
            $(".daTiCard_tiHaoBox").eq(i).show().siblings(".daTiCard_tiHaoBox").hide();
        })
    });
}

// 返回头部
function back_top() {
    var back_top= $("<div id='back_top' style='width: 40px;height: 36px;position: fixed;right: 50px;bottom: 100px;display: none;'><img style='border-radius:4px' src='/images/ChapterTestPractice/back_Top.png'/></div>");
    $("body").append(back_top);
    $(window).scroll(function(){
        var windowScrollTop=$(window).scrollTop();
        var oTools=$("#back_top");
        if(windowScrollTop>100)
        {
            oTools.fadeIn();
        }else{
            oTools.fadeOut();
        }
    });
    $("#back_top").hover(function () {
        $(this).find("img").attr("src","/images/ChapterTestPractice/back_Top1.png");
    },function () {
        $(this).find("img").attr("src","/images/ChapterTestPractice/back_Top.png");
    });
    $("#back_top").click(function(){
        $("html,body").animate({scrollTop:0},1000);
    });
}

//真题 答题卡 显示隐藏
$(".daTiCard_btn").hide();
$(document).on("mouseover",".daTiCard_hidebtn",function () {
    $(this).find("img").attr("src","/images/testPaper/datikahide.png");
});
$(document).on("mouseout",".daTiCard_hidebtn",function () {
    $(this).find("img").attr("src","/images/testPaper/datikahide1.png");
});
$(document).on("click",".daTiCard_hidebtn",function () {
    $(".daTiCardBox").fadeOut();
    $(".daTiCard_btn").fadeIn();
});
$(document).on("click",".daTiCard_btn",function () {
    $(".daTiCard_btn").fadeOut();
    $(".daTiCardBox").fadeIn();
});


//材料全屏
$(document).on("click",".caiLiaoEscBtn",function () {
    var this_html=$(this).parents(".questionList").find(".EscAllText").html();
    tiku_util.initShades("caiLiaoEsc");
    var EsctextList=$("<div class='EsctextList'>"+this_html+"</div>");
    $("#caiLiaoEsctext").html(EsctextList);
    $("#caiLiaoEsctext").css("max-height","480px");

    if($(".EsctextList").height()>=480){
        var scrollDom=$("#caiLiaoEsctext");
        scrollLine(scrollDom);//滚动条
    }
});
$("#caiLiaoEsc img").hover(function () {
    $(this).attr("src","/images/toppicHome/pattern_hide2.png");
},function () {
    $(this).attr("src","/images/toppicHome/pattern_hide.png");
});
$("#caiLiaoEsc img").click(function () {
    tiku_util.closeShade("caiLiaoEsc");
});

// 滚动条试题
function scrollLine(scrollDom) {
    scrollDom.slimScroll({
        size: '4px',
        position: 'right',
        color: '#888',
        alwaysVisible: true,
        distance: '1px',
        railVisible: true,
        railColor: '#eee',
        railOpacity: 1,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
    scrollDom.parents(".slimScrollDiv").css("height","auto");
    scrollDom.css("height","auto");
}

// 滚动条答题卡
function scrollLineCard(scrollDom) {
    scrollDom.slimScroll({
        size: '4px',
        position: 'right',
        color: '#888',
        alwaysVisible: true,
        distance: '10px',
        railVisible: true,
        railColor: '#fff',
        railOpacity: 1,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
    scrollDom.parents(".slimScrollDiv").css("height","auto");
    scrollDom.css("height",scrollDom.find(".tiNumberBox").height()-23+"px");
    // scrollDom.css("height","auto");
}



// 音频
function audioPlay() {
    $(".audio").each(function(){
        var data_audio=$(this).attr("data_audio");
        var data_number=$(this).attr("data_number");
        $("#jquery_jplayer_"+data_number).jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    title: "Bubble",
                    mp3: data_audio
                });
            },
            play:function(){
                $(".jp-audio").each(function(){
                    if("jp_container_"+data_number != $(this).attr("id")){
                        var jp_class = $(this).attr("class");
                        if(jp_class.indexOf("jp-state-playing")>0){
                            $(this).find(".big_jpplay").click();
                        }
                    }
                });
                $(".audioParsing").each(function(){
                    $(".jp-audio").each(function(){
                        if("jp_container_"+data_number!= $(this).attr("id")){
                            var jp_class = $(this).attr("class");
                            if(jp_class.indexOf("jp-state-playing")>0){
                                $(this).find(".Audio_file").click();
                            }
                        }
                    });
                });
            },
            cssSelectorAncestor: '#jp_container_'+data_number,
            swfPath: "/js/jplayer",
            supplied: "m4a,oga,mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });
    });

    $(".audioParsing").each(function(){
        var data_audio=$(this).attr("data_audio");
        var data_number=$(this).attr("data_number");
        $("#jquery_jplayer_"+data_number+"_parse").jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    title: "Bubble",
                    mp3: data_audio
                });
            },
            play:function(){
                $(".audio").each(function(){
                    $(".jp-audio").each(function(){
                        if("jp_container_"+data_number+"_parse"!= $(this).attr("id")){
                            var jp_class = $(this).attr("class");
                            if(jp_class.indexOf("jp-state-playing")>0){
                                $(this).find(".big_jpplay").click();
                            }
                        }
                    });
                });
                $(".jp-audio").each(function(){
                    if("jp_container_"+data_number+"_parse"!= $(this).attr("id")){
                        var jp_class = $(this).attr("class");
                        if(jp_class.indexOf("jp-state-playing")>0){
                            $(this).find(".Audio_file").click();
                        }
                    }
                });
            },
            cssSelectorAncestor: '#jp_container_'+data_number+'_parse',
            swfPath: "/js/jplayer",
            supplied: "m4a,oga,mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });
    });
}

// 视频播放
function videoPlay() {
    $(".videoParseing").each(function () {
        $(this).hover(function () {
            $(this).find('img').attr('src','/images/testPaper/shipinanniu.png');
        },function () {
            $(this).find('img').attr('src','/images/testPaper/videoPlay.png');
        });
        $(this).click(function () {
            var videoId = $(this).attr("data_video");
            $.ajax({
                type: "POST",
                url:"/cc/getVideo/"+videoId,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data.code == 200) {
                        // $(".videoid").parent().siblings(".shipingA").attr("href",data.result[0].playurl);

                        var videoDom = $('<video class="videoid" poster="/images/testPaper/jzsp.gif" autoplay="autoplay" controls="controls" width="1024" height="576"></video>');
                        $("#VideoBox").find("#lsVideo").append(videoDom);
                        var sourceDom = $('<source src="'+data.result[0].playurl+'"  class="source" type="video/mp4">');
                        $(".videoid").append(sourceDom);
                        $(".videoid").load();
                        $('#VideoBox').show();
                    }
                }
            })
        })
    });
    var videoW = -($('#VideoBox').width() / 2);
    var videoH = -($('#VideoBox').height() / 2);
    $('#VideoBox').css({"margin-top": videoH + 'px', "margin-left": videoW + 'px'});
    $(".videoDDown").click(function () {
        $(this).siblings().find(".source").remove();
        $('#VideoBox').hide();
        $("#VideoBox").find("#lsVideo .videoid").remove();
    })
}



function jiXuZhanshi(data) {//展示继续做题
    var times=$("#time_keep").attr("times");
    if(tabTyp!=3&&tabTyp!=5){
        initTimer(times);
    }
    for (var i=0;i<data.data.as.length;i++){
        for(var j=0;j<data.data.as[i].as.length;j++){
            var paperTiXing=data.data.as[i].as[j].j;
            var mydaAnJi=data.data.as[i].as[j];
            var paperNumid=data.data.as[i].as[j].a;
            myZizhu(paperTiXing,mydaAnJi,"paper_",paperNumid);
            if(mydaAnJi.ds || mydaAnJi.es){
                jixuZuoTi(paperTiXing,mydaAnJi,"paper_",paperNumid);
                if(paperTiXing==8){//选词填空；
                    for(var duo=0;duo<mydaAnJi.ds.length;duo++){
                        if(mydaAnJi.ds[duo].a!=""){
                            $("#paper_"+paperNumid).find(".myDianji .myDianji_tishi").eq(duo).text(mydaAnJi.ds[duo].a).addClass("myDianji_daAn")
                            $("#cardId_"+paperNumid).addClass("tiNumber_yizuo");
                        }
                    }
                }else if(paperTiXing==9){
                    for(var duo=0;duo<mydaAnJi.ds.length;duo++){
                        if(mydaAnJi.ds[duo].a!=""){
                            $("#paper_"+paperNumid).find(".duanLuoCenter .duanLuo_xuanBox").eq(duo).find("li").each(function (i) {
                                if($(this).text()==mydaAnJi.ds[duo].a){
                                    $(this).addClass("duanluo_myxuan");
                                }
                            });
                            $("#cardId_"+paperNumid).addClass("tiNumber_yizuo");
                        }
                    }
                }
            }
            if(paperTiXing==4){
                for(var cai=0;cai<mydaAnJi.fs.length;cai++){
                    var caipaperNumid=mydaAnJi.fs[cai].a;
                    var caimyDaanJi=mydaAnJi.fs[cai];
                    var caiTiXing=mydaAnJi.fs[cai].j;
                    myZizhu(caiTiXing,caimyDaanJi,"clTi_",caipaperNumid);
                    if(caimyDaanJi.ds || caimyDaanJi.es){
                        jixuZuoTi(caiTiXing,caimyDaanJi,"clTi_",caipaperNumid);
                    }
                }
            }
        }
    }
}

function jixuZuoTi(tiXing,daAnJi,myIdQian,myIdhou) {
    if(tiXing==1){//单选
        $("#"+myIdQian+myIdhou).find(".questionList_options_danXuan .options_left").each(function () {
            if(daAnJi.ds[0].a==$(this).text()){
                $(this).addClass("clickXuan");
                $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
            }
        });
    }else if(tiXing==2){//多 选
        $("#"+myIdQian+myIdhou).find(".questionList_options_duoXuan .options_left").each(function () {
            for (var duo=0;duo<daAnJi.ds.length;duo++){
                if(daAnJi.ds[duo].a==$(this).text()){
                    $(this).addClass("clickXuan");
                    $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
                }
            }
        });
    }else if(tiXing==3){//判断
        $("#"+myIdQian+myIdhou).find(".questionList_options_panDuan .options_left").each(function () {
            if(daAnJi.ds[0].a==$(this).next().text()){
                $(this).addClass("clickXuan");
                $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
            }
        });
    }else if(tiXing==5){//分录;
        var fenlu_cunList="";
        for(var duo=0;duo<daAnJi.es.length;duo++){
            fenlu_cunList+='<div class="fenLuList">'+
                '<p class="delListBox">' +
                '<span class="delList"></span>'+
                '<span class="fenlu_tishi">只能为数字</span>'+
                '</p>';
            for(var x=0;x<daAnJi.es[duo].as.length;x++){
                if(daAnJi.es[duo].as[x].d=="-9999"){
                    daAnJi.es[duo].as[x].d="";
                }
                fenlu_cunList+='<div class="fenLuLine">'+
                    '<div class="divselect">'+
                    '<cite>'+daAnJi.es[duo].as[x].b+'</cite>'+
                    '<ul>'+
                    '<li><a href="javascript:;" selectid="1">借</a></li>'+
                    '<li><a href="javascript:;" selectid="2">贷</a></li>'+
                    '</ul>'+
                    '<input name="" type="hidden" value="" class="inputselect"/>'+
                    '</div>'+
                    '<div class="fenlu_kemu">'+
                    '<span class="fenlu_title">科目：</span>'+
                    '<input class="fenlu_kemuIpt" type="text" placeholder="请填写科目" value="'+daAnJi.es[duo].as[x].c+'">'+
                    '</div>'+
                    '<div class="fenlu_jine">'+
                    '<span class="fenlu_title">金额：</span>'+
                    '<input class="fenlu_jineIpt" type="text" placeholder="请输入金额" value="'+daAnJi.es[duo].as[x].d+'"  maxlength="12">'+
                    '</div>'+
                    '<div class="delOneLine"></div>'+
                    '</div>'
            }
            fenlu_cunList+='<p class="addOneLine"><span>+&nbsp;</span>新建行</p>'+
                '</div>';
        }
        $("#"+myIdQian+myIdhou).find(".fenLuListBox").html(fenlu_cunList);
        fenluCaiLiao();
        $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
    }else if(tiXing==6){//简答
        $("#"+myIdQian+myIdhou).find(".jianDaTi").val(daAnJi.ds[0].a);
        $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
    }else if(tiXing==7){//填空
        for (var k=0;k<daAnJi.ds.length;k++){
            $("#"+myIdQian+myIdhou).find('.tianKongTi .myIpt').eq(k).val(daAnJi.ds[k].a);
            $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
        }
    }else if(tiXing==10){//判断说明
        $("#"+myIdQian+myIdhou).find(".questionList_options_pdsm .options_Right").each(function () {
            if(daAnJi.ds[0].a==$(this).text()){
                $(this).prev().addClass("clickXuan");
                $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
            }
        });
        $("#"+myIdQian+myIdhou).find(".JudgeThat").val(daAnJi.ds[1].a);

        $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
    }
}

function myZizhu (tiXing,daAnJi,myIdQian,myIdhou) {
    if(tiXing==5 ||tiXing==6||tiXing==7 ||tiXing==10){
        if($("#"+myIdQian+myIdhou).find(".questionPanFenBox").length>0){
            if(daAnJi.h!=-1){
                $("#"+myIdQian+myIdhou).find(".questionPanFenBox .questionPanFen").removeClass("questionPanFenClick").addClass("questionPanFenYizuo").html(daAnJi.i?daAnJi.i:0+"分");
                $("#"+myIdQian+myIdhou).find(".questionList_KeyBox ").show();
                $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
            }
        }
        //    评价展示
        if($("#"+myIdQian+myIdhou).find(".evaluateBtnBox").length>0){
            if(daAnJi.h != -1){
                $("#"+myIdQian+myIdhou).find(".evaluateBtnBox div").removeClass("evaluateBtn");
                if($("#"+myIdQian+myIdhou).find(".keyBtnBox .keyBtn").length != 0){
                    $("#"+myIdQian+myIdhou).find(".keyBtnBox .keyBtn").html("收起");
                } else {
                    $("#"+myIdQian+myIdhou).find(".questionList_KeyBox").show();
                }
                if(daAnJi.h == 1){
                    //    掌握
                    $("#"+myIdQian+myIdhou).find(".evaluateBtnBox .unMasterBtn").addClass("colorDDD");
                } else{
                    //    不太了解
                    $("#"+myIdQian+myIdhou).find(".evaluateBtnBox .masterBtn").addClass("colorDDD");
                }
                $("#cardId_"+myIdhou).addClass("tiNumber_yizuo");
            }
        }
    }
}

//纠错效果
function errorRecovery() {
    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
        $(".sanjiaoDown").css("display", "none");
        $(".ieSanjiao").css("display", "block");
        $(".optionContent").css("padding-bottom", "8px");
    }
}errorRecovery();

function tiGanTop(){
    var tiGan=[];
    $(".questionTtem").each(function () {
        tiGan.push($(this).offset().top-66);
    });
    return tiGan;
}
function Rolling(tiGan) {
    window.onscroll=function(){
        var scrHeight =document.documentElement.scrollTop||document.body.scrollTop;
        for(var i=0; i<tiGan.length; i++){
            if(scrHeight>tiGan[i] && scrHeight<tiGan[i+1]){
                $('.questionTtem').eq(i).addClass("tiganDing");
            }else{
                $('.questionTtem').eq(i).removeClass("tiganDing");
            }
            if(scrHeight>tiGan[tiGan.length-1]){
                $('.questionTtem').eq($('.questionTtem').length-1).addClass("tiganDing");
            }else{
                $('.questionTtem').eq($('.questionTtem').length-1).removeClass("tiganDing");
            }
        }
    }
}

//直播课作业统计；
function doPaper (time) {
    info.doPaperProgress=time;
    $.post("/track/v1/000000001/doPaper",info,function () {
    });
}



function userD_t() {
    var d_t=tiku_util.getCookie("d_t");
    if( !d_t || d_t==""){
        $("<iframe id='ssoAlert' style='width: 100%;height: 100%;position: fixed;z-index: 1000;' name='ssoAlert' src='"+ssoDomain+"/g-p/web/login_iframe' scrolling='no' allowTransparency='true'></iframe>").prependTo('body');
        return false;
    }else{
        return true;
    }
}


window.addEventListener('message',function(e){
    $('#ssoAlert').remove();
},false);



//toast 提示
function toast(content) {
    var _toasts = document.getElementsByClassName("toast");
    if (_toasts.length < 1) {
        var _div = document.createElement("div");
        _div.className = "toast";
        var con = document.createElement("p");
        con.innerHTML = content;
        _div.appendChild(con);
        document.body.appendChild(_div);
        document.getElementsByClassName("toast")[0].style.left =
            document.body.clientWidth / 2 - document.getElementsByClassName("toast")[0].clientWidth / 2 + "px";
        setTimeout( function () {
            document.body.removeChild(_div);
        }, 2000);
    }
};