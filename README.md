## Introduction

Welcome to my automatic trading program for Upbit, built using Nextron.

This application is primarily for educational purposes.

For more information on Nextron, visit the [Nextron GitHub page](https://github.com/saltyshiomix/nextron).

## How to Use

Follow these steps to use this application:

1. Create a `.env` file in the `root/renderer` directory and register your Upbit keys.
2. Install the dependencies. You can use either `yarn install` or `npm install`.
3. Run the application in development mode. You can use either `yarn dev` or `npm run dev`.

Here is an example of how to set up your `.env` file:

```
NEXT_PUBLIC_UPBIT_OPEN_API_ACCESS_KEY="your-access-key"
NEXT_PUBLIC_UPBIT_OPEN_API_SECRET_KEY="your-secret-key"
NEXT_PUBLIC_UPBIT_OPEN_API_SERVER_URL="https://api.upbit.com/"
```

Please replace `"your-access-key"` and `"your-secret-key"` with your actual Upbit keys.

## How does TradingView call my localhost API?

The simplest solution for accessing your localhost from TradingView is to use ngrok.

**For Mac:**

1. Install ngrok using Homebrew by running the command `brew install ngrok` in Terminal.
2. Run the command `ngrok http [your_port_number]`.
3. Copy the Forwarding URL (`http://xxxxxx.ngrok.io`) and use it as the endpoint in TradingView.

**For Windows:**

1. Download and install [ngrok](https://ngrok.com/download).
2. Open Command Prompt.
3. Navigate to the directory where you installed ngrok using the `cd` command.
4. Run the command `ngrok http [your_port_number]`.
5. Copy the Forwarding URL (`http://xxxxxx.ngrok.io`) and use it as the endpoint in TradingView.

**Set Tradingview Alert Webhook**

To receive webhook requests from TradingView, you need to set up a route in your application that TradingView can send requests to. In this application, we have a route set up at `/api/tradingview-webhook`. You can use this route as the URL for TradingView's webhook requests.

Here is an example of how to set it up in TradingView:

1. Go to the TradingView website and log in to your account.
2. Navigate to the webhook settings page.
3. In the 'URL' field, enter your ngrok public URL followed by the route. For example, if your ngrok URL is `http://xxxxxx.ngrok.io`, you would enter `http://xxxxxx.ngrok.io/api/tradingview-webhook`.
4. Click 'Save'.

Now, whenever a signal is triggered in TradingView, it will send a POST request to the URL you specified. Your application will receive this request and can handle it as needed.
