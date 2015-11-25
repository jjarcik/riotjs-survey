riot.tag2('survey-detail-view', '<a href="#home">Home</a> <h1>{opts.survey.data.nazev}</h1> <h2>{opts.survey.data.otazka}</h2> <survey-detail-single answers="{opts.survey.data.odpoved}" ask="{opts.survey.id}"></survey-detail-single> <survey-detail-multichoice></survey-detail-multichoice> <br> <a href="#result/{opts.survey.id}">Result of this survey</a>', '', '', function(opts) {
        var self = this;

        this.on('mount', function () {
            observer.getItem(opts.surveyID, function (data) {
                self.trigger('data_loaded', {data: data, id: opts.surveyID});
            });
        });

        this.on('data_loaded', function (params) {
            opts.survey = params;
            this.update();
        })

}, '{ }');

<!-- single choice survey -->
riot.tag2('survey-detail-single', '<ul> <li each="{item, i in opts.answers}" index="{i}"> <input type="radio" id="radioInput" onclick="{edit}" name="answer" value="{i}"> {item} </li> </ul> <span class="{invisible:!visiblethx}" id="thx">Thank you for your vote</span>', '', '', function(opts) {


        this.visiblethx = false;

        self = this;

        this.edit = function (e) {
            observer.setAnswer(opts.ask, e.item.i);
            self.visiblethx = true;

            setTimeout(function () {
                e.srcElement.checked = false;
                self.visiblethx = false;
                self.update();
            }, 1000);

            this.update();
        };

}, '{ }');


<!-- @TODO implement it -->
riot.tag2('survey-detail-multichoice', '', '', '', function(opts) {
});
riot.tag2('survey-index-view', '<h1>Survey list</h1> <survey-list list="{opts.list}"></survey-list> <img src="img/spinner.gif" class="{invisible:load}" alt="spinner">', '', '', function(opts) {

        load = false;
        self = this;

        this.on('mount', function () {

            observer.getList(function (data) {
                self.trigger('data_loaded', data);
            });

        });

        this.on('data_loaded', function (data) {
            load = true;
            opts.list = data;
            this.update();
        })
}, '{ }');
riot.tag2('survey-list', '<table class="table"> <tr> <th></th> <th>Name of the survey</th> <th>Main question</th> </tr> <tr each="{item, i in opts.list}" index="{i}"> <td> <a href="#survey/{i}" title="detail"> <img src="img/glass.png" alt="detail"> </a> <a href="#result/{i}" title="result"> <img src="img/chart.gif" alt="detail"> </a> </td> <td> {item.nazev} </td> <td> {item.otazka} </td> </tr> </table>', '', '', function(opts) {
}, '{ }');
riot.tag2('survey-result-view', '<a href="#home">Home</a> <h1>Result of {opts.survey.nazev}</h1> <ul id="result"> <li each="{item, i in opts.answers}" index="{i}"> <span class="graph g{i}" riot-style="width:{item.percent}%"></span> {item.text} ({item.total} x) <span class="r">{item.percent} %</span> </li> </ul>', '', '', function(opts) {

        this.on('mount', function () {
            var self = this;

            observer.getItem(opts.surveyID, function (data) {

                var answers = observer.getAnswers(opts.surveyID);
                opts.survey = data;
                opts.answers = [];

                var sum = answers.reduce(function(pv, cv) { return pv + cv; }, 0);

                for (var i in opts.survey.odpoved){
                    opts.answers[i] = {
                        text: opts.survey.odpoved[i],
                        total: (answers[i]) ? answers[i] : 0,
                        percent: (answers[i])?(Math.round(answers[i] / sum * 100)) : 0
                    };
                }

                self.update();

            });

        });

}, '{ }');