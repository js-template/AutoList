# Autolist - Classified Ads & Listing Solution

> **:warning: Notice:** Our classified ads listing solution is nearly ready, but it is not production-ready yet. Stay tuned for updates!

Autolist Classifieds is a full-stack solution where Next.js is used for the frontend and the backend is powered by Headless Strapi.

![Meta-Ads Main Mockup](https://github.com/js-template/autolist/assets/6657014/a0d5e636-916b-44e7-938a-f9c883b169fd)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Project Roadmap](#project-roadmap)
- [How to Deploy](#how-to-deploy)
- [How to Create a New Theme](#how-to-create-a-new-theme)
- [List of Premium Themes](#list-of-premium-themes)
- [License](#license)
- [Contact](#contact)

## Features

- **Easy Listing Creation:** Post your ads quickly with our intuitive interface.
- **Advanced Search & Filters:** Find exactly what you're looking for with our powerful search tools.
- **Secure Transactions:** Enjoy peace of mind with our secure payment options.
- **Responsive Design:** Access the platform seamlessly from any device.

## Installation

### Prerequisites

- Node.js
- pnpm or yarn
- Strapi

### Backend Setup (Strapi)

1. Clone the backend repository from [here](https://github.com/js-template/Autolist_backend).

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the Strapi server:
    ```bash
    npm develop
    # or
    yarn develop
    ```

### Frontend Setup (Next.js)

1. Clone the frontend repository:
    ```bash
    git clone https://github.com/js-template/autolist
    cd nextjs-frontend
    ```

2. Install the dependencies:
    ```bash
    pnpm install
    # or
    yarn install
    ```
3. Add env file at `apps/site` with folowwing key values:
    ```bash
    NEXT_PUBLIC_BASE_URL="Your_Frontend_URL"
    # Strapi API
    STRAPI_ENDPOINT="Your_Strapi_Endpoint"
    STRAPI_AUTH_TOKEN="Your_Strapi_Auth_Token"
    AUTH_SECRET="Your_Next_Auth_Secret" // 32 characters

    # Google Maps API Key
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="Your_Google_Maps_API_Key"
    
    # NEXTAUTH URL
    NEXTAUTH_URL="Your_Frontend_URL"
    NEXTAUTH_SECRET="Your_Next_Auth_Secret"
    
    # Google Provider
    GOOGLE_ID="Your_Google_Client_ID"
    GOOGLE_SECRET="Your_Google_Client_Secret"
    
    # Facebook Provider
    FACEBOOK_ID="Your_Facebook_Client_ID"
    FACEBOOK_SECRET="Your_Facebook_Client_Secret"

    # Linkedin Provider
    LINKEDIN_ID="Your_LinkedIn_Client_ID"
    LINKEDIN_SECRET="Your_LinkedIn_Client_Secret"
    
    # Stripe payment 
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="Add_stripe_Publishable_key"
    STRIPE_SECRET_KEY="Add_stripe_Secret_key"
    ```

    

3. Start the Next.js development server:
    ```bash
    pnpm dev
    # or
    yarn dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the frontend.
2. Access the Strapi admin panel at `http://localhost:1337/admin` to manage the backend content.

## Contributing

We welcome contributions to improve Autolist Classifieds. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## Project Roadmap

(Details to be added)

## How to Deploy

### Deploy Frontend

(Instructions to be added)

### Deploy Backend

(Instructions to be added)

## How to Create a New Theme

(Instructions to be added)

## List of Premium Themes

(Details to be added)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact us at [info@jstemplate.net](info@jstemplate.net).

> **:warning: Notice:** Our classified ads listing solution is nearly ready, but it is not production-ready yet. Stay tuned for updates!

Thank you for your interest and support!

Best regards,  
[Your Company Name]


