$(document).ready(function () {


    //    STEP 1:  Get input from the user
    $('#inputChoice').submit(function (event) {
        event.preventDefault();
        var query = $(this).find('#selectChoice').val();
        //        console.log(query);
        getGoogleMapsDataFromApi(query);
        getYouTubeDataFromApi(query);

    });

    //    GoogleMaps API
    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getGoogleMapsDataFromApi(userSearchTerm) {
        function initialize() {
            var address = userSearchTerm + ', US';

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var Lat = results[0].geometry.location.lat();
                    var Lng = results[0].geometry.location.lng();
                    var myOptions = {
                        zoom: 7,
                        center: new google.maps.LatLng(Lat, Lng)
                    };
                    var map = new google.maps.Map(
                        document.getElementById("map_canvas"), myOptions);
                } else {
                    alert("Something got wrong " + status);
                }
            });
        }
        google.maps.event.addDomListener(window, "load", initialize);
    }



    //    YouTube API
    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getYouTubeDataFromApi(userSearchTerm) {
        $.getJSON('https://www.googleapis.com/youtube/v3/search', {
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

    //    STEP 3:  YouTube API: Using the JSON response (videos), populate the HTML with the variable inside the JSON
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
