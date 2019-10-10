;
VipModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var vm;
    var companyId = GlobalJsModule.companyId;
    var VipClass = function () {
        thisContext = this;
        this.init = function () {
            this.initVue();
            this.initData();
            this.initScroll();
        }
    }
    VipClass.prototype = {
        initVue: function () {
            vm = new Vue({
                el: '#container',
                data: {
                    scrollUlData: [{
                        number: 1,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 2,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 3,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 4,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 5,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 6,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }],
                    // 客户识别列表

                    scrollUlData: [{
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 0,
                        "todayCount": 0
                    }, {
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 0,
                        "todayCount": 0
                    }, ],
                    // 到店统计
                    arriveStore: {
                        "appointmentCount": 1,
                        "moreCount": 1,
                        "totalCount": 1
                    },
                    lastedArrive: {
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 2, //1男2女
                        "todayCount": 0
                    }

                }
            })
        },
        initData: function () {
            // 到店统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/toStoreStatistics",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        vm.arriveStore = res.data;
                    }
                }
            });
            // 客流统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/passengerFlowStatistics",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {


                    res.results = [{
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "",
                        "faceUrl": "",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "",
                        "sex": 0,
                        "todayCount": 0
                    }]

                }
            });
            // 最新客户识别列表
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/latestPersonList",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (data) {

                }
            });
            // 最新客户识别
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/latestPerson",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (data) {

                }
            });



        },
        initEcharts: function () {

            var faultPieEchart = echarts.init(document.getElementById('comparecircle')); //初始化echarts实例
            var faultPieOption = option = {
                // backgroundColor: '#091018',
                series: {
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    silent: true,
                    radius: ['100%', '93%'],
                    center: ['50%', '50%'],
                    data: [{
                        value: 75,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: '#00e4fe',
                                borderWidth: 1,
                                borderColor: '#073A66',
                                opacity: 0.2
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                    }, {
                        value: 25,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            normal: {
                                rich: {
                                    a: {
                                        color: '#fff',
                                        align: 'center',
                                        fontSize: 29,
                                        fontFamily: 'Microsoft YaHei',
                                        fontWeight: "bold",
                                    },
                                    c: {
                                        color: '#fff',
                                        fontSize: 29,
                                        fontFamily: 'Microsoft YaHei',
                                        fontWeight: "bold"
                                    }
                                },
                                formatter: function (params) {
                                    return "{a|" + params.value + "}" + " {c|%}";
                                },
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal',
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#00e4fe',
                            }
                        }
                    }]
                }
            }
            faultPieEchart.setOption(faultPieOption)
        },
        initScroll: function () {

            $(function () {
                var timeId = setInterval(play, 3000);

                function play() {
                    $("#scrollul").animate({
                            "marginTop": "-102px"
                        },
                        100,
                        function () {
                            /* stuff to do after animation is complete */
                            $(this).css({
                                "marginTop": 0
                            }).children("li:first").appendTo(this);
                        });
                }
                $("#scrollul").hover(function () {
                    /* Stuff to do when the mouse enters the element */
                    clearInterval(timeId);
                }, function () {
                    /* Stuff to do when the mouse leaves the element */
                    timeId = setInterval(play, 3000);
                });
            })

        },
        constructor: VipClass,

    };
    return new VipClass();
})(jQuery, window, document, echarts);
$(VipModule.init());