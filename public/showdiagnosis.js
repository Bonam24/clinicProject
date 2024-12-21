
    // Function to set the Diagnosis tab as active when Edit is clicked
    document.querySelectorAll('form[action="/putbackinattendance"] button').forEach(button => {
        button.addEventListener('click', function () {
            // Set the Diagnosis tab as active in localStorage
            localStorage.setItem('activeTab', '#diagnosis');
        });
    });

    // Save the active tab to localStorage when it is clicked
    document.querySelectorAll('#dashboardTabs .nav-link').forEach(tab => {
        tab.addEventListener('click', function () {
            localStorage.setItem('activeTab', this.getAttribute('href'));
        });
    });

    // Get the active tab from localStorage and activate it
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        const tabElement = document.querySelector(`#dashboardTabs a[href="${activeTab}"]`);
        const tabInstance = new bootstrap.Tab(tabElement);
        tabInstance.show();
    }


    document.querySelectorAll('#dashboardTabs .nav-link').forEach(tab => {
        tab.addEventListener('click', function () {
            localStorage.setItem('activeTab', this.getAttribute('href'));
        });
    });
    
    // Get the active tab from localStorage and activate it
    const activeTab1 = localStorage.getItem('activeTab');
    if (activeTab1) {
        const tabElement = document.querySelector(`#dashboardTabs a[href="${activeTab1}"]`);
        const tabInstance = new bootstrap.Tab(tabElement);
        tabInstance.show();
    }
     function prventBack() { window.history.forward(); }
            setTimeout("prventBack()", 0);
            window.onunload = function () { null };

