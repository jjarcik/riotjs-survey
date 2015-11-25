/**
 *  Observer model pro ukladani a sdileni dat mezi moduly, stahuje ankety ze serveru,
 *  uklada hlasy anket a poskytuje data pro View
 * 
 */
function Observer() {
    // url of git
    this.git = 'https://gist.githubusercontent.com/viktorbezdek/0f05b7be39550a2338a0/raw/ced015e7c6622bba8cfb3e74b5defc0818f50561/ankety.json';
    // the surveys
    this.data = [];
    // the votes
    this.answers = [];

    var self = this;

    /**
     * get list of all surveys, if necessary download data from the server
     * @param function callback after fetch data
     * @returns nothing, everything is passed through a callback
     */
    this.getList = function (callback) {

        // download data from git
        if (this.data.length === 0) {
            this.getData(callback);
        } else {
            callback(this.data);
        }
    };

    /**
     * get one survey, if necessary download data from the server
     * @param function callback after fetch data
     * @returns nothing, everything is passed through a callback
     */
    this.getItem = function (i, callback) {

        // download data from git
        if (this.data.length === 0) {
            this.getData(function (data) {
                callback(data[i]);
            });
        } else {
            callback(this.data[i]);
        }
    };

    /**
     * ajax request, get json data from git
     * @param function callback after fetch data
     * @returns nothing, everything is passed through a callback
     */
    this.getData = function (callback) {
        console.log("git request");
        var request = new XMLHttpRequest();
        request.open('GET', this.git, true);
        request.onload = function () {
            if (request.status == 200) {
                self.data = JSON.parse(request.responseText);
                callback(self.data);
            }

            // @TODO other status
        };
        request.send();

    };

    /**
     * get all answers of one survey by ID
     * @param int id
     * @returns multiple array of answers or empty array
     */
    this.getAnswers = function (id) {
        return this.answers[id] || new Array(this.data[id].length);
    };

    /**
     * 
     * @param int id, id of survey
     * @param int vote, id of vote      
     */
    this.setAnswer = function (id, vote) {

        if (!this.answers[id]) {
            this.answers[id] = [];
        }
        
        // first answer
        if (!this.answers[id][vote]) {
            this.answers[id][vote] = 1;
        } else {
            
            // increment answers
            this.answers[id][vote]++;
        }

    };


}