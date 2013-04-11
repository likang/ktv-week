$(function () {
    $(".wk-pricecell").hover(
        function() {
            var ele = $(this);
            ele.text("编辑");
            ele.css("text-decoration", "underline")
        },
        function() {
            var ele = $(this);
            ele.text(ele.attr("data-price"));
            ele.css("text-decoration", "none")
        }
    );
});