<survey-index-view>
    
    <h1>Survey list</h1>
    
    <!-- list of all surveys -->
    <survey-list list="{ opts.list }"></survey-list>
    
    <!-- wait for download data from git -->
    <img src="img/spinner.gif" class="{invisible:load}" alt="spinner"/>

    <script>

        load = false;
        self = this;

        this.on('mount', function () {
            // get data from observer
            observer.getList(function (data) {
                self.trigger('data_loaded', data);
            });
           
        });

        // update tags
        this.on('data_loaded', function (data) {
            load = true;
            opts.list = data;
            this.update();
        })
    </script>

</survey-index-view>