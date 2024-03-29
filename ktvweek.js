var KTVWeek = (function  () {
    var weekNames = ["一", "二", "三", "四", "五", "六", "日"];
    var colors = ["carrot","amethyst", "alizarin", "emerland",];
    var colorIndex = -1;

    function KTVWeek(){
        return  init(
            this instanceof KTVWeek ? this : new KTVWeek(),
            arguments);
    };

    function init(ktv, args) {
        if (args.length != 1) { return ktv};
        ktv.wrapperId = args[0].wrapperId;
        ktv.dataUrl = args[0].dataUrl;
        ktv.addLink = args[0].addLink;
        $("#" + ktv.wrapperId).append($('<div class="wk-pagination"> <div class="wk-topLeftNav"> <table  cellpadding="0" cellspacing="0"> <tr> <td><div class="wk-button wk-button-thisweek">本周</div></td> <td><div class="wk-button wk-button-previous">&lt;</div></td> <td><div class="wk-button wk-button-next">&gt;</div></td> </tr> </table> </div> <div class="wk-topRightNav"> <table cellpadding="0" cellspacing="0"> <tr> <td><a class="wk-button wk-button-add" href="#">添加</a></td> </tr> </table> </div> </div> <div class="wk-topwrapper"> <table class="wk-weektop" cellpadding="0" cellspacing="0"> <tbody> <tr class="wk-daynames"> <td style="width:60px;">&nbsp;</td> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> <th> <div class="wk-dayname"></div> </th> </tr> </tbody> </table> </div> <div class="wk-mainwrapper" style="margin-top:0px;"> <table class="wk-timeprices" cellpadding="0" cellspacing="0"> <tbody > <!--行--> <tr height="1"> <td style="width:60px;"></td> <td colspan="7"> <div class="wk-spanningwrapper"> <div class="wk-hourmarkers"> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> <div class="wk-markercell"> <div class="wk-dualmarker"></div> </div> </div> </div> <div class="wk-spanningwrapper wk-chipspanningwrapper"></div> </td> </tr> <tr> <!-- 时间 --> <td class="wk-times-pri"> <div style="height:40px;"> <div class="wk-time-pri">08:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">09:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">10:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">11:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">12:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">13:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">14:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">15:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">16:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">17:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">18:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">19:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">20:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">21:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri">22:00</div> </div> <div style="height:40px;"> <div class="wk-time-pri wk-time-pri-last">23:00</div> </div> </td> <!-- 7 列 周一到周日 --> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> <td class="wk-col"> <div class="wk-col-pricewrapper"></div> </td> </tr> </tbody> </table> <!-- 价格 --> <div class="wk-pricecells"> </div> </div> '));
        $("#" + ktv.wrapperId + " .wk-button-add").attr("href", ktv.addLink);
        $("#" + ktv.wrapperId + " .wk-button-previous").click(function(){
            var previousWeekDay = ktv.monday.addDays(-7);
            ktv.loadWeekDataFor(previousWeekDay);
        });
        $("#" + ktv.wrapperId + " .wk-button-next").click(function(){
            var nextWeekDay = ktv.monday.addDays(7);
            ktv.loadWeekDataFor(previousWeekDay);
        });

        ktv.loadWeekDataFor(args[0].startDay);
        return ktv;
    }

    function dayStartsWithMonday(day) {
        return day == 0 ? 7 : day;
    }

    function nextColor() {
        colorIndex += 1;
        if (colorIndex == colors.length) { colorIndex = 0};
        return colors[colorIndex];

    }

    var proto = KTVWeek.prototype;
    proto.loadWeekDataFor = function(date) {
        if(date == undefined) {
            date = new Date();
        }
        var today = new XDate(date);
        var ktv = this;
        ktv.monday = new XDate().setWeek(today.getWeek());
        ktv.sunday = new XDate(ktv.monday).addDays(6);
        $.post(
            ktv.dataUrl,
            {startDay: ktv.monday.toString("yyyy-MM-dd"), endDay: ktv.sunday.toString("yyyy-MM-dd")},
            function(data){
                ktv.dataLoaded(data);
            }
        );
    }

    proto.dataLoaded = function (data) {
        var monday = this.monday;
        //初始化星期显示
        $("#"+this.wrapperId+" .wk-dayname").each(function(index){ $(this).text(new XDate(monday).addDays(index).toString("M/d （周" + weekNames[index] + "）")); });
        var pricecellsEle = $("#" + this.wrapperId + " .wk-pricecells").first();
        pricecellsEle.empty();

        //逐个解析价格设置
        for (var i = 0; i < data.length; i++) {
            var startDay = new XDate(data[i].startDay);
            var endDay = new XDate(data[i].endDay);
            var diffDays = startDay.diffDays(endDay);
            var weekdays = data[i].weekday.split(",");

            var starTime = Number(data[i].startTime.substring(0, data[i].startTime.indexOf(":")));
            var endTime = Number(data[i].endTime.substring(0, data[i].endTime.indexOf(":")));

            var color = nextColor();

            //遍历设置中的天
            for (var j = 0; j<= diffDays; j++) {
                var day = new XDate(startDay).addDays(j);
                if (this.monday.diffDays(day) < 0 || this.sunday.diffDays(day) > 0) {
                    continue;//不在当前视图范围
                };
                if ($.inArray(dayStartsWithMonday(day.getDay()).toString(), weekdays) < 0) {
                    continue;//星期不符
                };
                //遍历设置中的时间
                for (var k = starTime; k <= endTime; k++) {
                    var top = (k-9)*40 + 5;
                    var left = (dayStartsWithMonday(day.getDay())-1)*100 + 5;
                    pricecellsEle.append($("<div>",{
                        "class":"wk-pricecell wk-pricecell-" + color,
                        "data-color":color,
                        "data-price":"￥" + data[i].price,                      
                        "style":"top:"+top+"px;left:" + left+"px",
                        text:"￥"+data[i].price
                    }));
                };

            };

        };
        // 鼠标滑入滑出价格单元格
        $(".wk-pricecell").hover(
            function() {
                var ele = $(this);
                ele.text("编辑");
                ele.css("text-decoration", "underline")
                $(".wk-pricecell-"+ele.attr("data-color")).not(this).stop().animate({opacity:0.25},100);
            },
            function() {
                var ele = $(this);
                ele.text(ele.attr("data-price"));
                ele.css("text-decoration", "none")
                $(".wk-pricecell-"+ele.attr("data-color")).not(this).stop().animate({opacity:1}, 100);
            }
        );
    }
    return KTVWeek;
})();
