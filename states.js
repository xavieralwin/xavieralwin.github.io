fetch('states.json')
    .then(response => response.json())
    .then(states => {
        const dropdown = document.getElementById('inputState');
        states.forEach(state => {
            let option = document.createElement('option');
            option.value = state;
            option.text = state;
            dropdown.add(option);
        });
    })
    .catch(error => console.error('Error fetching states:', error));
