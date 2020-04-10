/**
 * Created by admin on 2017/6/1.
 */
$(function () {
    var SerialNumId=$('#SerialNumId').val();       //试卷编号
    var typeId=$('#typeId').val();      //模式
    var skuId=$('#skuId').val();    //sku
    var testId=$('#testId').val();      //模考id
    var titleId=$('#titleId').val();   //用户做题编号
    var subjectsId=$('#subjectsId').val(); //文字
    var classId =$('#classId').val(); //mukuai id
    var navId =$('#navId').val(); //科目id

    $('.headTopli1').css('cursor','pointer')
    $('.headTopli1').click(function () {
        location.href = "/subject/list/" + skuId+"?subjectid="+navId+"&type="+typeId;
    })

    var data={a:skuId,b:titleId,c:typeId};
    if(typeId == "模考大赛"){
        data.d = testId;
    }
    var data=JSON.stringify(data);
    $.ajax({
        type: "POST",
        url:"/exam/record",
        dataType: "json",
        contentType: "application/json",
        data:data,
        success:function (data) {

            if(tiku_util.verifyStatus(data) && data.data!=null&&data.data!="") {
                $("#loadingImg").hide();
                var maths = data.data.a;
                template.helper("duration", function(fen){
                    return  parseInt(fen/60);
                });
                var html = template('DataShow', data);
                $("#datalist").html(html);
                setRing('main',maths);
                setLine('main1',data.data.as);

                $('body,html').find("canvas").css("cursor","default");

                maths = $('.safariFen').text().length;
                if(maths == 1){
                    $('.safariFen').css('right','430px');
                    $('.practiceTspan').css('right','403px');
                }else if(maths == 2){
                    $('.safariFen').css('right','416px');
                    $('.practiceTspan').css('right','386px');
                }else if(maths == 3){
                    $('.safariFen').css('right','406px');
                    $('.practiceTspan').css('right','376px');
                }
            }
        }

    });

    var data={a:SerialNumId,b:typeId};
    var data=JSON.stringify(data);

    $.ajax({
        type: "POST",
        url:"/exam/recordPaperExamTitle",
        dataType: "json",
        contentType: "application/json",
        data:data,
        success:function (data) {

            if(data.data!=null&&data.data!="") {
                 var data = data.data
                if(data !='' && data != null && data != undefined) {
                    var html = template('DataShow2', data);
                    $("#dataList2").html(html);

                    var a1 = data.as;

                    $(".chaptertTestBdiv li span").each(function () {
                        var txts = $(this).attr('txts')
                        $(this).attr('title', txts);
                    })

                    goExam(a1);
                    textYincang();
                }
            }
        }

    });

    function goExam(a1) {

        $('.chaptertTestBspan').each(function (i) {
            var ask = a1[i].a;
            $(this).click(function () {
                location.href=encodeURI("/redirect/KnowledgePractice?a="+ask+"&b=2&c="+skuId+"&f=10"+"&e="+subjectsId+"&g="+navId+"&z="+skuId);
            })
        })

    }

    var data={b:skuId,a:titleId};
    var data=JSON.stringify(data);
    $.ajax({
        type: "POST",
        url:"/exam/statistic",
        dataType: "json",
        contentType: "application/json",
        data:data,
        success:function (data) {
            if(data.data!=null&&data.data!="") {

                var data = data.data
                var html = template('Scantron', data);
                $("#answer").html(html);
                for(var i=1;i<$(".practiceBotdiv ul li").length;i++){

                    $(".practiceBotdiv ul li").eq(i).html(i+1);
                }
                var lib = $(".practiceBotdiv ul").eq(0).find('li');
                for (var i = 1; i < lib.length; i++) {

                    lib.eq(5 * i - 1).css("margin-right", "50px");

                }
                for(var j=1;j<$(".practiceBotdiv ul").length;j++) {
                    var lia = $(".practiceBotdiv ul").eq(j).find('li');
                    for (var i = 1; i < lia.length; i++) {

                        lia.eq(5 * i - 1).css("margin-right", "50px");

                    }
                }

                var mn=0;
                var sm = $('.LastLi').length;
                $('.LastLi').each(function () {

                    if($(this).attr('lih')=='1'){
                        mn++;
                    }

                    if(sm == mn){
                        $('.practiceBotspan2').css({'display':'none'})
                    }

                    $(this).click(function () {
                        var indexa = $(this).attr("dtknum");
                        location.href=encodeURI("/redirect/ParsingSelfAssessment?a="+titleId+"&b=2&c="+skuId+"&d="+testId+"&e="+subjectsId+"&f=2&g="+navId+"&z="+skuId+"&stId="+indexa);
                    })
                })

            }
        }

    });
//查看全部解析
    $(".practiceBotspan1").click(function () {
        location.href=encodeURI("/redirect/ParsingSelfAssessment?a="+titleId+"&b=2&c="+skuId+"&d="+testId+"&e="+subjectsId+"&f="+typeId+"&g="+navId+"&z="+skuId);
    });
    //错题回顾
    $(".practiceBotspan2").click(function () {
        location.href=encodeURI("/redirect/ParsingSelfAssessment?a="+titleId+"&b=3&c="+skuId+"&d="+testId+"&e="+subjectsId+"&f="+typeId+"&g="+navId+"&z="+skuId);
    });
    //再次练习
    $(".practiceBotspan3").click(function () {

        $(".mark").css('display','block');

        pattern();

    });

    //返回首页
    $(".practiceBotspan4").click(function () {
        location.href = "/subject/list/" + skuId+"?subjectid="+navId+"&type="+typeId;
    });

    function pattern() {

        $(".pattern_hide").hover(function () {
            $(this).attr("src","/images/toppicHome/pattern_hide2.png");
        },function () {
            $(this).attr("src","/images/toppicHome/pattern_hide.png");
        })

        $(".pattern_hide").click(function () {
            $(".mark").css('display','none');
        })

        $("#pattern a").hover(function () {
            $(this).find("img").addClass("imgUp");
        },function(){
            $(this).find("img").removeClass("imgUp");
        });

        $("#practice").click(function () {
            location.href=encodeURI("/redirect/ChapterTestPractice?a="+SerialNumId+"&b=2&c="+skuId+"&d="+testId+"&e="+subjectsId+"&f="+2+"&g="+navId+"&z="+skuId);
        });
        $("#mockTest").click(function () {
            location.href=encodeURI("/redirect/TestPaper?a="+SerialNumId+"&b=1&c="+skuId+"&d="+testId+"&e="+subjectsId+"&f="+2+"&g="+navId+"&z="+skuId);
        });
    }


    // 判断字数
    function textYincang() {
        $(".chaptertTestBdiv li span").each(function(){
            var maxwidth=15;
            if($(this).text().length>maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+'...');
            }
        });

        var maxwidth=40;
        if($(".headTopli3").html().length>maxwidth){
            $(".headTopli3").html($(".headTopli3").text().substring(0,maxwidth));
            $(".headTopli3").html($(".headTopli3").html()+'...');
        }

    }


});

/*点击返回回首页*/
jQuery(document).ready(function ($) {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            var hashLocation = location.hash;
            var hashSplit = hashLocation.split("#!/");
            var hashName = hashSplit[1];
            if (hashName !== '') {
                var hash = window.location.hash;
                if (hash === '') {
                    window.location.href="/subject/list/"+$("#skuId").val();
                }
            }
        });

        window.history.pushState('forward', null,'./?z='+$("#skuId").val()+'#forward');
    }
});
