var data = [
    {
        "startDay":"2013-04-11",//日期类型一定要是 yyyy-MM-dd
        "endDay":"2013-04-16",
        "weekday":"1,3,4,5",
        "startTime":"10:00",
        "endTime":"12:00",
        "price":"30.00"
    },
    {
        "startDay":"2013-04-08",
        "endDay":"2013-04-16",
        "weekday":"1,2,3,5",
        "startTime":"14:00",
        "endTime":"16:00",
        "price":"50.00"
    },
    {
        "startDay":"2013-04-10",
        "endDay":"2013-04-11",
        "weekday":"1,2,3,4,5",
        "startTime":"18:00",
        "endTime":"22:00",
        "price":"60.00"
    }
];


var KTVWeek = (function  () {
    var weekNames = ["一", "二", "三", "四", "五", "六", "日"];
    var colors = ["carrot","amethyst", "alizarin", "emerland",];
    var colorIndex = 0;

    function KTVWeek(){
        return (this instanceof KTVWeek) ? this : new KTVWeek();
    };

    function handIn() {
            var ele = $(this);
            ele.text("编辑");
            ele.css("text-decoration", "underline")
            $(".wk-pricecell-"+ele.attr("data-color")).not(this).css(opacity, 0.25);
    };
    function handOut() {
            var ele = $(this);
            ele.text(ele.attr("data-price"));
            ele.css("text-decoration", "none")
            $(".wk-pricecell-"+ele.attr("data-color")).not(this).css(opacity, 1);
    };
    function dayStartsWithMonday(day) {
        return day == 0 ? 7 : day;
    }
    function nextColor() {
        colorIndex += 1;
        if (colorIndex == colors.length) { colorIndex = 0};
        return colors[colorIndex];

    }

    var proto = KTVWeek.prototype;
    proto.loadData = function (data) {
        var today = new XDate();
        this.monday = new XDate().setWeek(today.getWeek());
        this.sunday = new XDate(this.monday).addDays(6);
        //初始化星期显示
        for (var i = 0; i < 7; i++) {
            $("#wk-dayname-" + (i+1)).text(new XDate(this.monday).addDays(i).toString("M/d （周" + weekNames[i] + "）"));
        };
        var pricecellsEle = $("#wk-pricecells");

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
                    var top = (k-9)*42 + 5;
                    var left = (dayStartsWithMonday(day.getDay())-1)*100 + 5;
                    pricecellsEle.append($("<div>",{
                        "class":"wk-pricecell wk-pricecell-" + color,
                        "data-color":color,
                        "data-price":"￥" + data[i].price,                      
                        "style":"top:"+top+"px;left:" + left+"px",
                        text:"￥"+data[i].price}));
                };

            };

        };
    }
    return KTVWeek;
})();

$(function () {
    var ktvWeek = KTVWeek();
    ktvWeek.loadData(data);
    // 鼠标滑入滑出价格单元格
    $(".wk-pricecell").hover(
        function() {
            var ele = $(this);
            ele.text("编辑");
            ele.css("text-decoration", "underline")
            $(".wk-pricecell-"+ele.attr("data-color")).not(this).stop().animate({opacity: 0.25},100);
        },
        function() {
            var ele = $(this);
            ele.text(ele.attr("data-price"));
            ele.css("text-decoration", "none")
            $(".wk-pricecell-"+ele.attr("data-color")).not(this).stop().animate({opacity: 1},100);
        }
    );
});