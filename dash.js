$(document).ready(function(){

    document.getElementById('logoutButton').addEventListener('click', function () {
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html"; // Redirect to login page after logout
        });
    
       
    });
       

    $('.section').hide(); // Initially hide all sections
    $('#patient-entry').show(); // Show the Patient Entry section on page load
   
 // Handle section toggling
 $('.item').click(function(){
    var target = $(this).data('target');
    $('.section').hide(); // Hide all sections
    $(target).show(); // Show the targeted section
});
  
   // Fetch patients when the Patient List section is shown
   $('#patient-list').on('show', function () {
       fetchPatients();
   });
   
   // Show Patient List section when "Patient List" menu item is clicked
   $('.item[data-target="#patient-list"]').click(function () {
       fetchPatients();
   });


   

});

document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyCaGX_MucN9UWXxNaGOtPOcEAQovkmfDUI",
        authDomain: "wjs-web-a15e3.firebaseapp.com",
        projectId: "wjs-web-a15e3",
        storageBucket: "wjs-web-a15e3.appspot.com",
        messagingSenderId: "827966254976",
        appId: "1:827966254976:web:93975aa22e25be7e019b65",
        measurementId: "G-32P75G6D11"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = "index.html"; // Redirect to login page if not authenticated
        }
    });

    let editPatientId = null;

    const table = $('#patientTable').DataTable({
        data: [], // Empty initially
        columns: [
            { data: 'firstName' },
            { data: 'lastName' },
            { data: 'address' },
            { data: 'address2' },
            { data: 'city' },
            { data: 'state' },
            { data: 'zip' },
            { 
                data: null,
                defaultContent: '<button class="btn btn-sm btn-primary edit-btn">Edit</button>'
            }
            
        ],
        responsive: true
    });

    function fetchPatients() {
        db.collection('patients').get().then(querySnapshot => {
            const patients = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                patients.push(data);
            });
            table.clear().rows.add(patients).draw();
        });
    }

    fetchPatients();

    $('#patientTable tbody').on('click', '.edit-btn', function () {
        const data = table.row($(this).parents('tr')).data();
        editPatientId = data.id;
        $('#editFirstName').val(data.firstName);
        $('#editLastName').val(data.lastName);
        $('#editAddress').val(data.address);
        $('#editAddress2').val(data.address2);
        $('#editCity').val(data.city);
        $('#editState').val(data.state);
        $('#editZip').val(data.zip);
        $('#editPatientModal').modal('show');
    });

    $('#editPatientForm').on('submit', function (e) {
        e.preventDefault();

        const updatedData = {
            firstName: $('#editFirstName').val(),
            lastName: $('#editLastName').val(),
            address: $('#editAddress').val(),
            address2: $('#editAddress2').val(),
            city: $('#editCity').val(),
            state: $('#editState').val(),
            zip: $('#editZip').val()
        };

        db.collection('patients').doc(editPatientId).update(updatedData).then(() => {
            $('#editPatientModal').modal('hide');
            fetchPatients();
        }).catch(error => {
            console.error('Error updating patient details: ', error);
        });
    });

    // Handle form submission for new patient entry
    document.getElementById('patientForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const newPatient = {
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            address: document.getElementById('inputAddress').value,
            address2: document.getElementById('inputAddress2').value,
            city: document.getElementById('inputCity').value,
            state: document.getElementById('inputState').value,
            zip: document.getElementById('inputZip').value
        };

        db.collection('patients').add(newPatient).then(() => {
            alert('Patient details stored successfully!');
            document.getElementById('patientForm').reset();
            fetchPatients();
        }).catch((error) => {
            console.error('Error storing patient details: ', error);
        });
    });

    // Populate states dropdown
    const states = ["Select State", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

    const select = document.getElementById('inputState');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.text = state;
        select.add(option);
    });
});
