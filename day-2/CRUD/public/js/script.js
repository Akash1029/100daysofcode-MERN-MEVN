const userData = document.getElementById("user-data");

function SeachData(data) {
    query = data.value;
        fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(results => {
            userData.innerHTML = results.html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}