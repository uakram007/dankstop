const apiClient = (function() {
    // Base URL constants
    const SSO_URL = 'https://sso.cabanaclubusa.com';
    const DEFAULT_URL = `${SSO_URL}/api/auth/fetch_client`;
    const Redirect_URL = `${SSO_URL}/register?client=`;

    /**
     * Sets the login URL if the login element is available.
     * @param {string} client - The SSO client value to set in the href.
     */
    function setLoginUrl(client) {
    const loginUrlElements = document.querySelectorAll('.SSO__url_login'); // Assuming it's a class selector
              // const loginUrlForm = document.getElementById('SSO__url_login_form');
              //     loginUrlForm.action = `${Redirect_URL}${client}`;

    if (loginUrlElements.length > 0) {
        loginUrlElements.forEach(element => {
            element.href = `${Redirect_URL}${client}`;
        });

    }
}


    /**
     * Fetch client data from the API.
     * @param {string} store - The store name.
     * @param {string} platform - The platform name.
     * @param {Object} options - Optional configurations like custom headers or URL.
     * @param {string} options.url - Override the default URL if needed.
     * @param {Object} options.headers - Additional headers to include in the request.
     * @param {boolean} options.debug - Enable debug logging for development.
     * @returns {Promise<Object>} - Resolves with the API response data.
     */
    async function fetchClient(store, platform, options = {}) {
        // Check if SSOClient is already in session storage and set the login URL if present
        const existingClient = sessionStorage.getItem("SSOClient");
        if (existingClient) {
            setLoginUrl(existingClient);
            return Promise.resolve({ client: existingClient, cached: true });
        }

        const { url = DEFAULT_URL, headers = {}, debug = false } = options;
        //const redirect_url = window.location.href;
        const data = { store, platform};

        if (debug) console.log('Request Config:', { url, headers, data });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${await response.text()}`);
            }

            const result = await response.json();
            sessionStorage.setItem("SSOClient", result.client);

            // Set login URL with the fetched client
            setLoginUrl(result.client);

            if (debug) console.log('API Response:', result);
            return result;
        } catch (error) {
            console.error('Fetch Client Error:', error.message);
            throw error;
        }
    }

    return {
        fetchClient
    };
})();