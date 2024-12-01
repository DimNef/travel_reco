/* contact us form submission */
let contacts = [];
function submitContactForm() {
    const contactInfo = [];
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const country = document.getElementById('country').value;
    const subject = document.getElementById('subject').value;

    if (firstName && lastName && country && subject) {

        const contactInfo = {
            FirstName: firstName,
            LastName: lastName,
            Country: country,
            Subject: subject
        };
        contacts.push(contactInfo);
        console.log(contactInfo);
        alert('your inquiry has been submitted.Thanks');  
        clearContactFormInputs();
    } else {
        alert('please provide the requested information');
    }
}

function clearContactFormInputs() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('country').value = '';
    document.getElementById('subject').value = '';
}

/*search dictionary functionality with some tolerance */

const SEARCHABLES = ['beach', 'country', 'city', 'temple', 'australia', 'japan', 'brazil', 'cambodia', 'india', 'polynesia', 'sao paulo', 'copacabana'];
const MIN_DISTANCE = 3;
function searchHandler() {
    const searchText = document.getElementById('keywordInput').value.toLowerCase();
  const filteredDestinations = SEARCHABLES.filter((destination) => {
    const distance = levenshtein(destination.toLowerCase(), searchText);
    console.log(distance);
    return distance <= MIN_DISTANCE;
  });
  console.log(filteredDestinations);
}

/*levenshteins distance */
function levenshtein (str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1, // deletion
             track[j - 1][i] + 1, // insertion
             track[j - 1][i - 1] + indicator, // substitution
          );
       }
    }
    return track[str2.length][str1.length];
 };

 /* fetch json and search */
 function searchCondition () {

   
  
    fetch('travel_recommendation_api.json')
    .then(result => result.json())
    .then(data => {
        //let json = JSON.stringify(data);
        //console.log(json);
        const searchText = document.getElementById('keywordInput').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        /* search countres */    
            if(levenshtein('country', searchText) <= 3){
                const recommendation = data.countries;
                console.log(recommendation);
                
                for (let i = 0; i < recommendation.length; i++) {
                   for (let j = 0; j < recommendation[i].cities.length; j++){
                        resultDiv.innerHTML += `<img src="${recommendation[i].cities[j].imageUrl}" alt="not available" style="width:100%; margin-top:30px;">`;
                        resultDiv.innerHTML +=  `<h2 style="width:100%; margin-top:20px;">${recommendation[i].cities[j].name}</h2>`;    
                        resultDiv.innerHTML += `<p style="width:100%; margin-top:15px;">${recommendation[i].cities[j].description}</p>`;
        
                    }
                }
                
            }
        /* search temples */
        if(levenshtein('temple', searchText) <= 3){
            const recommendation = data.temples;
            console.log(recommendation);
            
            for (let i = 0; i < recommendation.length; i++) {
              // for (let j = 0; j < recommendation[i].temples.length; j++){
                    resultDiv.innerHTML += `<img src="${recommendation[i].imageUrl}" alt="not available" style="width:100%; margin-top:30px;">`;
                    resultDiv.innerHTML +=  `<h2 style="width:100%; margin-top:20px;">${recommendation[i].name}</h2>`;    
                    resultDiv.innerHTML += `<p style="width:100%; margin-top:15px;">${recommendation[i].description}</p>`;
    
              //  }
            }  
        }

        /* search beaches */
        if(levenshtein('beach', searchText) <= 3){
            const recommendation = data.beaches;
            console.log(recommendation);
            
            for (let i = 0; i < recommendation.length; i++) {
              // for (let j = 0; j < recommendation[i].temples.length; j++){
                    resultDiv.innerHTML += `<img src="${recommendation[i].imageUrl}" alt="not available" style="width:100%; margin-top:30px;">`;
                    resultDiv.innerHTML +=  `<h2 style="width:100%; margin-top:20px;">${recommendation[i].name}</h2>`;    
                    resultDiv.innerHTML += `<p style="width:100%; margin-top:15px;">${recommendation[i].description}</p>`;
    
              //  }
            }  
        }

            document.getElementById("result").style.display = "block";

    }
    )
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occured';
    });
}

/*reset search results */
function resetSearch() {
    document.getElementById("result").style.display = "none";
    document.getElementById('keywordInput').value = '';
    resultDiv.innerHTML = '';


}
 