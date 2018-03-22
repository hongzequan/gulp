/**
 * [速贸通客户端1.0.0]
 * @author hongzequan
 * @time 2018/3/19
 */
var myChart; //图表实例
var dom; //图表dom
var option; //图表配置
var data = 0; //图标value
var t = ''; //计时器
var arr = ["谷歌", "facebook", "黄页"]; //爬抓数组
var user = {
    'companyName': '258',
    'userName': 'hongzequan',
    'serverName': '厦门258集团',
    'lastTime': '1521515527',
};
$.extend({
    echartsInit: function() {
        dom = document.getElementById("charts");
        myChart = echarts.init(dom);
        option = ({
            title: {
                x: "center",
                top: 220,
                textStyle: {
                    color: '#cee0ff',
                    fontSize: '18'
                },
                text: '网络检测',
            },
            series: [{
                name: '网络检测',
                type: 'gauge',
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 20,
                        color: [
                            [0.3, '#ff5252'],
                            [0.7, '#cee0ff'],
                            [1, '#74fbff']
                        ],
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: { // 坐标轴小标记
                    length: 0, // 属性length控制线长
                },
                itemStyle: {
                    normal: {
                        color: '#cee0ff'
                    }
                },
                axisLabel: {
                    distance: -65,
                    formatter: function(e) {
                        switch (e + "") {
                            case "0":
                                return "极差";
                            case "20":
                                return "　差";
                            case "40":
                                return "一般";
                            case "60":
                                return "良好";
                            case "80":
                                return "优良";
                            case "100":
                                return "极好";
                            default:
                                return '';
                        }
                    },
                    fontSize: 16,
                    color: '#cee0ff',
                },
                detail: {
                    fontSize: 14,
                    formatter: function(param) {
                        var level = '';
                        if (param >= 83.3) {
                            level = '极好'
                        } else if (param >= 66.6) {
                            level = '优良'
                        } else if (param >= 50) {
                            level = '良好'
                        } else if (param >= 33.3) {
                            level = '一般'
                        } else if (param >= 16.6) {
                            level = '　差'
                        } else if (param > 0) {
                            level = '极差'
                        } else if (param = 0) {
                            level = ''
                        }
                        return level;
                    }
                },
                data: [{
                    value: data
                }]
            }]
        })
        myChart.setOption(option, true);
        $('#charts').append('<div class="neiyuan"></div>')
    },
    setEchartsData: function(data) {
        option.series[0].data[0].value = data
    },
    start: function() { //开始检测
        if (t == '') {
            addAnimation();
            t = setInterval(function() {
                randomData();
                myChart.setOption(option, true);
            }, 1000)
        }
    },
    stop: function() { //停止检测
        $.setEchartsData(0)
        myChart.setOption(option, true);
        removeAnimation();
        clearTimeout(t)
        t = '';
    },
    getArry: function(arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            var html = "<div class='list clearfix'><strong>" + arr[i] + "</strong><i></i><span>暂未开启检测</span></div>"
            $('.ping-box').append(html);
        }
        $('.ping .tips').fadeIn();
    },
    setValue: function(name, state) { //写入网络状况
        /**
         * state name  ''
         */
        var box = $('.ping-box .list')
        box.each(function() {
            if ($(this).find('strong').text() == name) {
                if (state == '') {
                    $(this).find('span').addClass('fail').html('连接失败');
                } else {
                    $(this).find('span').addClass('success').html('网络正常（' + state + '秒）');
                }
            }
        })
    },
    setConsole: function(data) { //写入控制台
        var sole = $('.console')
        var soleDom = document.querySelector(".console");
        var time = getNowFormatDate();
        var html = "<p>【<span>" + time + '</span>】' + data + "</p>";
         sole.append(html);
         soleDom.scrollTop = soleDom.scrollHeight;
    },

    setLeftInfo: function(data) {
        $('#companyName').html(data.companyName);
        $('#userName').html(data.userName);
        $('#serverName').html(data.serverName);
        $('#lastTime').html(timestampToTime(data.lastTime));
    },
    close:function(){ //关闭界面
        
    },
    minimize:function(){ //最小化
        
    },
    windowDrag:function(){//窗口拖拽
       
    },
});
// 页面加载时候初始化echarts
$.echartsInit(data);
// 获取随机value值
function randomData() {
    data = Math.random() * 100;
    $.setEchartsData(data)
};

// 获取当前日期
function getNowFormatDate() {
    var date = new Date()
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
// 时间戳转换时间
function timestampToTime(timestamp) {
    var date = new Date(parseInt(timestamp) * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + '   ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
}
// 添加动画效果
function addAnimation() {
    $('.radar-bg').addClass('scaning');
    $('.ping .list i').addClass('ing');
    $('.ping .list span').html('正在检测').removeClass();
}
// 移出动画效果
function removeAnimation() {
    $('.radar-bg').removeClass('scaning');
    $('.ping .list i').removeClass('ing');
}

// 方法调用

// 1.初始化的时候，需要调用
// $.getArry(arr)
// 2.数据的写入
// 传入具体时间为网络正常，''为失败
// $.setValue('谷歌', 5)
// 3.console打印
// data就是你要放的数据
// $.setConsole('abc')
// 4.设置公司信息
// $.setLeftInfo(user)
// 