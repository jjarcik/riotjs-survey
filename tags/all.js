riot.tag2('survey-detail-view', '<a href="#home">Home</a> <h1>{opts.survey.data.nazev}</h1> <h2>{opts.survey.data.otazka}</h2> <survey-detail-single answers="{opts.survey.data.odpoved}" ask="{opts.survey.id}" class="{invisible:multiple}"></survey-detail-single> <survey-detail-multichoice answers="{opts.survey.data.odpoved}" ask="{opts.survey.id}" class="{invisible:!multiple}"></survey-detail-multichoice> <br> <a href="#result/{opts.survey.id}">Result of this survey</a>', '', '', function(opts) {
        var self = this;
        multiple = false;

        this.on('mount', function () {
            observer.getItem(opts.surveyID, function (data) {
                self.trigger('data_loaded', {data: data, id: opts.surveyID});
            });
        });

        this.on('data_loaded', function (params) {
            opts.survey = params;
            multiple = params.data.multiple;
            this.update();
        })

}, '{ }');

<!-- single choice survey -->
riot.tag2('survey-detail-single', '<ul> <li each="{item, i in opts.answers}" index="{i}"> <input type="radio" name="answer" value="{i}"> {item} </li> <li> <button onclick="{edit}">Send</button> </li> </ul> <span class="{invisible:!visiblethx}" id="thx5555555">Thank you for your vote</span>', '', '', function(opts) {


        this.visiblethx = false;

        var self = this;

        this.edit = function (e) {

            var r = document.querySelectorAll("input[type='radio'][name='answer']:checked");

            if (r.length > 0){
                  observer.setAnswer(opts.ask, r[0].value);
                  this.visiblethx = true;

                setTimeout(function () {
                    self.visiblethx = false;
                    self.update();
                }, 1000);

            }

        };

}, '{ }');


riot.tag2('survey-detail-multichoice', '<ul> <li each="{item, i in opts.answers}" index="{i}"> <input type="checkbox" name="answer" value="{i}"> {item} </li> <li> <button onclick="{edit}">Send</button> </li> </ul> <span class="{invisible:!visiblethx2}" id="thx2">Thank you for your vote</span>', '', '', function(opts) {


        this.visiblethx2 = false;

        var self = this;

        this.edit = function () {

            var chks = document.querySelectorAll("input[type='checkbox'][name='answer']:checked");

            for (var i in chks) {
                observer.setAnswer(opts.ask, chks[i].value);
                self.visiblethx2 = true;
                chks[i].checked = false;

                setTimeout(function () {
                    self.visiblethx2 = false;
                    self.update();
                }, 1000);

            }
        };

}, '{ }');
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
riot.tag2('survey-result-view', '<a href="#home">Home</a> <h1>Result of: {opts.survey.nazev}</h1> <ul id="result"> <li each="{item, i in opts.answers}" index="{i}"> <span class="graph g{i}" riot-style="width:{item.percent}%"></span> {item.text} ({item.total} x) <span class="r">{item.percent} %</span> </li> </ul> <a href="#survey/{opts.surveyID}">[ Add next vote ]</a>', '', '', function(opts) {

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