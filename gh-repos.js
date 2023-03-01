(function($, undefined) {
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

    function addRepos(repos, page) {
        repos = repos || [];
        page = page || 1;
        var uri = 'https://api.github.com/users/JustinAClarke/repos?per_page=100&page=1';
        // var uri = '/repos.json';
        $.getJSON(uri, function(result) {
            // API Rate limiting catch
            if (result && 0 === result.length) {
                $('<p class="alert alert-warning">').text('Your IP has hit github\'s rate limit per hour.').appendTo('#error');
                $('<a href="https://github.com/JustinAClarke?tab=repositories">').text('Please click here to view all Repos').appendTo('#error');
                $('#error').show();
                $('#loading').hide();

                return;
            }
            repos = result;
            //repos = result;
            console.log(repos);
            if (result.length == 100) {
                addRepos(repos, page + 1);
            } else {
                $.each(repos, function(i, repo) {
                    console.log(repo);
                    console.log(i);
                    console.log(repo.pushed_at);
                    repo.pushed_at = new Date(repo.pushed_at || null);
                });
                // Sort by most-recently pushed to.
                // or is featured
                repos.sort(function(a, b) {
                    if (a.pushed_at < b.pushed_at) return 1;
                    if (b.pushed_at < a.pushed_at) return -1;
                    return 0;
                });
                var oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getMonth() - 1);
                oneMonthAgo = oneMonthAgo.getTime();

                // $.each(repos.slice(0, 10), function(i, repo) {
                $.each(repos, function(i, repo) {
                    var date=new Date(repo.pushed_at);

                    if (date.getTime()>oneMonthAgo) 
                    {
                        addRecentlyUpdatedRepo(repo);
                    }
                });
            }
        })
    }
    addRepos();
})(jQuery);
