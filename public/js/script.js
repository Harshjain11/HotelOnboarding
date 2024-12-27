(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
    
      form.addEventListener('submit', event => {
        
        const phoneNumberInput = document.getElementById('number');
        if(phoneNumberInput) { 
        const phoneNumberPattern = /^[789]\d{9}$/;
  
        // Check if the phone number matches the pattern
        if (!phoneNumberPattern.test(phoneNumberInput.value)) {
          // If invalid, prevent form submission and show feedback
          event.preventDefault();
          event.stopPropagation();
  
          // Add 'is-invalid' class to the input field to show the feedback
          phoneNumberInput.classList.add("is-invalid");
          phoneNumberInput.classList.remove("is-valid");
        } else {
          // If valid, remove 'is-invalid' class to clear the feedback
          phoneNumberInput.classList.remove("is-invalid");
          phoneNumberInput.classList.add("is-valid");
        }
       
      }

        const dateInput = document.getElementById('dates');
        if(dateInput) { 
      const feedback = document.getElementById('invalid-date');

      // If no date is selected, show invalid feedback
      if (!dateInput.value) {
        dateInput.classList.add("is-invalid");
        feedback.style.display = "block";
        event.preventDefault(); // Prevent form submission
      } else {
        dateInput.classList.remove("is-invalid");
        feedback.style.display = "none";
      }
    }
      //for update form 
      const datesInput = document.getElementById('selectedDates');
      if(datesInput) {

      
      const feedbacks = document.getElementById('invalid-udate');
   
      // If no date is selected, show invalid feedback
      if (!datesInput.value) {
        datesInput.classList.add("is-invalid");
        feedbacks.style.display = "block";
        event.preventDefault(); // Prevent form submission
      } else {
        datesInput.classList.remove("is-invalid");
        feedbacks.style.display = "none";
      }
      }
      
        // Now check the form's validity (this checks all form fields)
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();



