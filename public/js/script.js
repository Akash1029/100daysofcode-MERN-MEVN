const personData = document.getElementById("person-data");

function SeachData(data) {
    query = data.value;
        fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(results => {
            personData.innerHTML = results.html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}