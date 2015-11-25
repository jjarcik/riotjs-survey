/*
 * 
 * Observer
 * neni observable, nedari se mi volat trigger na registrovane komponenty.
 * => vlastni implementace, global scope observer
 *
 */

var observer = new Observer();

/*
 * Router
 * 
 */
riot.route.stop(); // clear all old Riot.route callbacks
riot.route.start(); // start again

var routes = {
    
    // home, list of surveys
    home: function () {
        riot.mount("#view", 'survey-index-view');
    },
    
    // detail of the survey, voting
    survey: function (id) {
        riot.mount('#view', 'survey-detail-view', {surveyID: id});
    },
    
    // result of the survey
    result: function (id) {        
        riot.mount('#view', 'survey-result-view', {surveyID: id});
    }
};

/*
 * 
 * Example: survey/1/
 * @param String collection = 'home'
 * @param int id = 1
 * 
 */
function handler(collection, id) {
    var routeFn = routes[collection || 'home'];
    routeFn(id);
}

riot.route(handler);
riot.route.exec(handler);