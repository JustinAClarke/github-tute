(function($, undefined) {
    /**
     * Render the current repo into the page source
     * If this occurs even once, we also hide the #loading div
     *
     * @param {*} repo // repository object to render
     */
    function addRecentlyUpdatedRepo(repo) {
        var $item = $('<div class="row">');
        var $time = $('<small>').text( repo.pushed_at.toDateString() ).append('</small>');
        var $name = $('<a>').attr('href', repo.html_url).text(repo.name);
        var $seperator = ' - ';

        $item.append($name);

        $item.append($seperator);
        
        $item.append($time);

        $('#current').append($item);
        
        $('#loading').hide();
        
    }

    /**
     * Hit the github api and get a list of all public repos the user has.
     * Check for those that have been updated in the past month, then get those to render to the display
     *
     * @param {array} repos // working array of repos
     * @param {int} page // current page of the api, defaults to 1
     */
    function addRepos(repos, page) {
        repos = repos || [];
        page = page || 1;
        
        // Update the url to your github account
        var uri = 'https://api.github.com/users/JustinAClarke/repos?per_page=100&page=1';

        // Or use the below and a download of that json object, so you don't get rate limited when testing the site
        // var uri = '/repos.json';

        // Actually get the data, and start processing it
        $.getJSON(uri, function(result) {

            // Check if ther are any results, we may have hit github's api ratelimit
            if (result && 0 === result.length) {
                $('<p class="alert alert-warning">').text('Your IP has hit github\'s rate limit per hour.').appendTo('#error');
                $('<a href="https://github.com/JustinAClarke?tab=repositories">').text('Please click here to view all Repos').appendTo('#error');
                $('#error').show();
                $('#loading').hide();

                return;
            }

            // Better variable name for what we are working with (repositories, not just random data (result))
            repos = result;

            // Log the repos to the console, for assistance in debugging
            console.log(repos);

            // If we have 100 repos, we should check if there are anymore repos... so hit the api again for page + 1
            if (result.length == 100) {
                addRepos(repos, page + 1);
            } else {
                // We have all the repos we need, start processing them
                $.each(repos, function(i, repo) {
                    console.log(repo);
                    console.log(i);
                    console.log(repo.pushed_at);
                    repo.pushed_at = new Date(repo.pushed_at || null);
                });
                // Sort by most-recently pushed to.
                repos.sort(function(a, b) {
                    if (a.pushed_at < b.pushed_at) return 1;
                    if (b.pushed_at < a.pushed_at) return -1;
                    return 0;
                });
                // Create new date to check recent repos
                var oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getMonth() - 1);
                oneMonthAgo = oneMonthAgo.getTime();

                // Check if the repo has been pushed to in the past month
                $.each(repos, function(i, repo) {
                    var date=new Date(repo.pushed_at);

                    if (date.getTime()>oneMonthAgo) 
                    {
                        // Render the current repo to the screen
                        addRecentlyUpdatedRepo(repo);
                    }
                });
            }
        })
    }
    addRepos();
})(jQuery);
