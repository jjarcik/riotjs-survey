<survey-detail-view>

    <a href="#home">Home</a>

    <h1>{ opts.survey.data.nazev }</h1>
    <h2>{ opts.survey.data.otazka }</h2>

    <!-- single choice survey -->
    <survey-detail-single answers="{opts.survey.data.odpoved}" ask="{ opts.survey.id }" class="{ invisible:multiple}"></survey-detail-single>

    <!-- multiple choice survey -->    
    <survey-detail-multichoice answers="{opts.survey.data.odpoved}" ask="{ opts.survey.id }" class="{ invisible:!multiple}"></survey-detail-multichoice>       
    
    <br />

    <a href="#result/{ opts.survey.id }">Result of this survey</a>

    <script>
        var self = this;
        multiple = false;

        // get data from observer
        this.on('mount', function () {
            observer.getItem(opts.surveyID, function (data) {
                self.trigger('data_loaded', {data: data, id: opts.surveyID});
            });
        });

        // update tags
        this.on('data_loaded', function (params) {
            opts.survey = params;
            multiple = params.data.multiple;
            this.update();            
        })

    </script>

</survey-detail-view>

<!-- single choice survey -->
<survey-detail-single>

    <ul>
        <li each='{item, i in opts.answers }' index="{ i }">
            <input type='radio' name="answer" value="{ i }"/>
            { item }
        </li>
        <li>
            <button onclick='{ edit }'>Send</button>
        </li>
    </ul>

    <span class="{invisible:!visiblethx}" id="thx5555555">Thank you for your vote</span>
    
    <script>

        // show / hide thx message
        this.visiblethx = false;
        
        var self = this;
        
        // store the vote
        this.edit = function (e) {
            
            // find checked radio
            var r = document.querySelectorAll("input[type='radio'][name='answer']:checked");            
            
            if (r.length > 0){                
                  observer.setAnswer(opts.ask, r[0].value);
                  this.visiblethx = true;
                       
                // show thx message
                setTimeout(function () {                      
                    self.visiblethx = false;                
                    self.update();
                }, 1000);
                            
            }
                       
        };


    </script>

</survey-detail-single>


<survey-detail-multichoice>

    <ul>
        <li each='{item, i in opts.answers }' index="{ i }">
            <input type='checkbox' name="answer" value="{ i }"/>
            { item }
        </li>        
        <li>
            <button onclick='{ edit }'>Send</button>
        </li>
    </ul>

    <span class="{invisible:!visiblethx2}" id="thx2">Thank you for your vote</span>

    <script>
        
        // show / hide thx message
        this.visiblethx2 = false;

        var self = this;

        // store the vote
        this.edit = function () {
            
            // get checked answers
            var chks = document.querySelectorAll("input[type='checkbox'][name='answer']:checked");
            
            // store every checked
            for (var i in chks) {                
                observer.setAnswer(opts.ask, chks[i].value);
                self.visiblethx2 = true;
                chks[i].checked = false;
                
                // hide thx message
                setTimeout(function () {                        
                    self.visiblethx2 = false;
                    self.update();
                }, 1000);
                
            }        
        };
        
    </script>
</survey-detail-multichoice>