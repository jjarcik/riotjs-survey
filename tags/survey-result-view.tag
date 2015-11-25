<survey-result-view>
    
    <a href="#home">Home</a>
    
    <h1>Result of: { opts.survey.nazev }</h1>

    <ul id="result">
        <li each='{item, i in opts.answers }' index="{ i }">            
            <span class="graph g{ i }" style="width:{item.percent}%"></span>
            { item.text } ({item.total} x) <span class="r">{item.percent} %</span>            
        </li>              
    </ul>

    <a href="#survey/{ opts.surveyID }">[ Add next vote ]</a>
    
    <script>

        this.on('mount', function () {
            var self = this;
            
            // get data of survey from observer
            observer.getItem(opts.surveyID, function (data) {
                
                // get answers
                var answers = observer.getAnswers(opts.surveyID);
                opts.survey = data;
                opts.answers = [];
                
                // count sum for percentage value
                var sum = answers.reduce(function(pv, cv) { return pv + cv; }, 0);
                
                // create formated object
                for (var i in opts.survey.odpoved){                    
                    opts.answers[i] = {
                        text: opts.survey.odpoved[i], 
                        total: (answers[i]) ? answers[i] : 0, 
                        percent: (answers[i])?(Math.round(answers[i] / sum * 100)) : 0
                    };
                }
                
                // update tag
                self.update();

            });

        });

    </script>

</survey-result-view>