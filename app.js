$(document).ready(function () {

    var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
    //    STEP 1:  Get input from the user
    $('#inputChoice').submit(function (event) {
        event.preventDefault();
        var query = $(this).find('#selectChoice').val();
        //        console.log(query);
        getGoogleMapsDataFromApi(query);
        getWikipediaDataFromApi(query);
        getYouTubeDataFromApi(query);

    });

    //    GoogleMaps API
    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getGoogleMapsDataFromApi(userSearchTerm) {
        $.getJSON(YOUTUBE_URL, {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyBNb-0Xbxn-soL4G0QSs-jW0GhL_qBpsoI",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                if (receivedApiData.pageInfo.totalResults === 0) {
                    resultElement += '<p>No videos found</p>';
                } else {
                    displayGoogleMapsSearchData(receivedApiData.items);
                }
            });
    }

    //    STEP 3:  Using the JSON response (videos), populate the HTML with the variable inside the JSON
    function displayGoogleMapsSearchData(data) {
        var buildHTML = "";
        $.each(data, function (dataKey, dataValue) {
            buildHTML += "<li>";
            buildHTML += "<p>" + dataValue.snippet.title + "</p>";
            buildHTML += "<a href='https://www.youtube.com/watch?v=" + dataValue.id.videoId + "' target='_blank'>";
            buildHTML += "<img src='" + dataValue.snippet.thumbnails.high.url + "'/>";
            buildHTML += "</a>";
            buildHTML += "</li>";
        });

        $(".gm-search-results ul").html(buildHTML);
    }





    //    Wikipedia API
    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getWikipediaDataFromApi(userSearchTerm) {
        $.getJSON(YOUTUBE_URL, {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyBNb-0Xbxn-soL4G0QSs-jW0GhL_qBpsoI",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                if (receivedApiData.pageInfo.totalResults === 0) {
                    resultElement += '<p>No videos found</p>';
                } else {
                    displayWikipediaSearchData(receivedApiData.items);
                }
            });
    }

    //    STEP 3:  Using the JSON response (videos), populate the HTML with the variable inside the JSON
    function displayWikipediaSearchData(data) {
        var buildHTML = "";
        $.each(data, function (dataKey, dataValue) {
            buildHTML += "<li>";
            buildHTML += "<p>" + dataValue.snippet.title + "</p>";
            buildHTML += "<a href='https://www.youtube.com/watch?v=" + dataValue.id.videoId + "' target='_blank'>";
            buildHTML += "<img src='" + dataValue.snippet.thumbnails.high.url + "'/>";
            buildHTML += "</a>";
            buildHTML += "</li>";
        });

        $(".wkpa-search-results ul").html(buildHTML);
    }



    //    YouTube API
    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getYouTubeDataFromApi(userSearchTerm) {
        $.getJSON(YOUTUBE_URL, {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyBNb-0Xbxn-soL4G0QSs-jW0GhL_qBpsoI",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                if (receivedApiData.pageInfo.totalResults === 0) {
                    resultElement += '<p>No videos found</p>';
                } else {
                    displayYouTubeSearchData(receivedApiData.items);
                }
            });
    }

    //    STEP 3:  Using the JSON response (videos), populate the HTML with the variable inside the JSON
    function displayYouTubeSearchData(data) {
        var buildHTML = "";
        $.each(data, function (dataKey, dataValue) {
            buildHTML += "<li>";
            buildHTML += "<p>" + dataValue.snippet.title + "</p>";
            buildHTML += "<a href='https://www.youtube.com/watch?v=" + dataValue.id.videoId + "' target='_blank'>";
            buildHTML += "<img src='" + dataValue.snippet.thumbnails.high.url + "'/>";
            buildHTML += "</a>";
            buildHTML += "</li>";
        });

        $(".yt-search-results ul").html(buildHTML);
    }
});
