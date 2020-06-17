document.addEventListener('DOMContentLoaded', function () {

    $(document).ready(function () {

        let country = "";
        let newCases = [];
        let active = [];
        let critical = [];
        let total = [];
        let deathsNew = [];
        let deathsTotal = [];
        let recovered = [];
        let confirmedArray = [];
        let caseTitle = ["New", "Active", "Critical", " Recovered", "Total", "New Deaths", "Total Deaths"];

        let newsData = [];
        let headline = [];
        let snippet = [];
        let link = [];

        $(".mySearchBtn2").click(function (e) {

            console.log("Handler for .click() called.");

            e.preventDefault();

            country = $('.myInputCountry').val();
            console.log(country);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "209b88513bmshbc9ff320e04d9e1p1f5294jsnc0b4d120644a"
                }
            }

            $.ajax(settings).done(function (response) {

                let results = response.response;
                console.log(results);

                function getResults() { //get results func starts

                    for (let i = 0; i < results.length; i++) {
                        console.log("loop" + results[i]);


                        newCases = results[i].cases.new;
                        active = results[i].cases.active;
                        total = results[i].cases.total;
                        critical = results[i].cases.critical;
                        deathsNew = results[i].deaths.new;
                        deathsTotal = results[i].deaths.total;
                        recovered = results[i].cases.recovered;

                        console.log(newCases);

                        if(newCases === null){
                            newCases = "No New Data Available"
                        }if(active === null){
                            active = "No New Data Available"
                        }if(total === null){
                            total = "No New Data Available"
                        }if(critical === null){
                            critical = "No New Data Available"
                        }if(deathsNew === null){
                            deathsNew = "No New Data Available"
                        }if(deathsTotal === null){
                            deathsTotal = "No New Data Available"
                        }if(recovered === null){
                            recovered = "No New Data Available"
                        }

                        confirmedArray.push(newCases, active, critical, recovered, total, deathsNew, deathsTotal);


                    }


                }

                getResults();

                $('.myDataTable').append('<tr><td>' + country + '</td><td>' + newCases + '</td> <td>' + active + '</td> <td>' + critical + '</td><td>' + recovered + '</td>  <td>' + total + '</td>  <td>' + deathsNew + '</td><td>' + deathsTotal + '</td> </tr>');

            });


            // news
            var newsSettings = {
                "async": true,
                "crossDomain": true,
                "url": `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid&api-key=LgJ1BiGrzO8gDKGAbiO0SuKWIQ3ZDF5R`,
                "method": "GET",
            }

            $.ajax(newsSettings).done(function (response) {

                $(".myNewsTable").empty()

                let results = response.response;
                let docs = results.docs;

                for (let index = 0; index < docs.length; index++) {
                    const element = docs[index];

                    headline = docs[index].headline.main
                    snippet = docs[index].snippet
                    link = docs[index].web_url

                    newsData.push(headline , snippet, link)

                    console.log(newsData);
                    
                    $('.myNewsTable').append('<tr data-aos="fade-up" data-aos-delay="100"><td>' + headline + '<br></br>' + snippet +' ------ ' + `<a href='${link}'>${link}</a>` + '<br></br>');
                }

                

            });


        });

    });


});