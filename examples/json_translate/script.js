var test = document.querySelectorAll('.test');

document.addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementById('heading');
    const text = document.getElementById('text');
    const swedishBtn = document.getElementById('swedishBtn');
    const englishBtn = document.getElementById('englishBtn');

    fetch('language.json')
        .then(response => response.json())
        .then(data => {
            // Set initial heading to Swedish
            heading.textContent = data.languages.swedish.heading;
            text.textContent = data.languages.swedish.text;
            
            for(i = 0; i < test.length; i++){
                test[i].textContent = data.languages.swedish.test;
            }

            // Add event listeners to buttons
            swedishBtn.addEventListener('click', () => {
                heading.textContent = data.languages.swedish.heading;
                text.textContent = data.languages.swedish.text;
                
                for(i = 0; i < test.length; i++){
                    test[i].textContent = data.languages.swedish.test;
                }

            });

            englishBtn.addEventListener('click', () => {
                heading.textContent = data.languages.english.heading;
                text.textContent = data.languages.english.text;
                
                for(i = 0; i < test.length; i++){
                    test[i].textContent = data.languages.english.test;
                }

            });

            
        })
        .catch(error => console.error('Error fetching data:', error));
});
