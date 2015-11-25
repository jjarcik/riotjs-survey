<survey-detail-view>
    
    <a href="#home">Home</a>

    <h1>{ opts.survey.data.nazev }</h1>
    <h2>{ opts.survey.data.otazka }</h2>

    <!-- single choice survey -->
    <survey-detail-single answers="{opts.survey.data.odpoved}" ask="{ opts.survey.id }"></survey-detail-single>
    
    <!-- multi choice survey -->
    <!-- @TODO implement it -->
    <survey-detail-multichoice></survey-detail-multichoice>    

    <br />
    
    <a href="#result/{ opts.survey.id }">Result of this survey</a>

    <script>
        var self = this;
        
        // get data from observer
        this.on('mount', function () {            
            observer.getItem(opts.surveyID, function (data) {                
                self.trigger('data_loaded', {data: data, id: opts.surveyID});
            });
        });

        // update tags
        this.on('data_loaded', function (params) {            
            opts.survey = params;
            this.update();
        })

    </script>

</survey-detail-view>

<!-- single choice survey -->
<survey-detail-single>
    
    <ul>
        <li each='{item, i in opts.answers }' index="{ i }">
            <input type='radio' id='radioInput' onclick='{ edit }' name="answer" value="{ i }"/>
            { item }
        </li>
    </ul>

    <span class="{invisible:!visiblethx}" id="thx">Thank you for your vote</span>

    <script>
        
        // show / hide thx message
        this.visiblethx = false;
                
        self = this;

        // store the vote
        this.edit = function (e) {
            observer.setAnswer(opts.ask, e.item.i);
            self.visiblethx = true;

            // show thx message
            setTimeout(function () {
                e.srcElement.checked = false;
                self.visiblethx = false;
                self.update();
            }, 1000);

            // update tag
            this.update();
        };


    </script>

</survey-detail-single>


<!-- @TODO implement it -->
<survey-detail-multichoice></survey-detail-multichoice>