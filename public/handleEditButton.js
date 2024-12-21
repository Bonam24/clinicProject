
    // Event listener for admit buttons
    document.addEventListener('DOMContentLoaded', function() {
        // Select all admit buttons
        const admitButtons = document.querySelectorAll('form[action="/removeFromQueue"] button');

        admitButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // When an admit button is clicked, change the tab to "Diagnosis and Prescription"
                event.preventDefault(); // Prevent the form from submitting immediately
                
                // Set the Diagnosis tab as active
                $('#dashboardTabs a[href="#diagnosis"]').tab('show');

                // Submit the form after a short delay to ensure the tab change is reflected
                setTimeout(() => {
                    button.closest('form').submit();
                }, 100);
            });
        });
    });

