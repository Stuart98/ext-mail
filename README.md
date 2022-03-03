# Ext Mail

Ext Mail is a GMail clone example application built with the Ext JS framework to demonstrate how complex applications can be built with the framework. The app is a __universal__ application making use of the Classic and Modern toolkits and building upon a base of shared business logic and data models.

This application was demonstrated during a **Sencha Cafe webinar series** where it was built live by [Stuart Ashworth](https://www.stuartashworth.com).

**The application is part of the [Ext JS: The Ultimate Guide](https://www.stuartashworth.com/ultimate-guide) book where it is extended further to make use of more advanced features and components.**

**You can get access to the full book and all of the examples and sample applications by visiting https://www.stuartashworth.com/ultimate-guide**

## Demo

You can find a demo of the application at: [https://ext-mail.ashworthdigital.com/](https://ext-mail.ashworthdigital.com/)

_To view the modern toolkit application open Dev Tools and switch on [Device Mode](https://developer.chrome.com/docs/devtools/device-mode/#viewport)_

### Classic Toolkit Application
<img width="1286" alt="Screenshot of Ext Mail - a GMail like email client interface built with Ext JS Classic toolkit" src="https://user-images.githubusercontent.com/917319/156560792-88b17590-7fb3-45ac-883b-acaa68fb9963.png">

### Modern Toolkit Application
<img width="624" alt="Screenshot of Ext Mail - a GMail like email client interface built with Ext JS Modern toolkit" src="https://user-images.githubusercontent.com/917319/156560801-dbaa4617-2b01-4ad0-bbb7-1114e66bce00.png">

## Features

- Universal app using Classic & Modern toolkits with shared business logic and data models
- View messages list
- Delete, archive, mark as unread, star/unstar messages
- Browse labels
- Look up recipients from loaded list
- Send Messages
- Create message drafts
- (modern) Sliding menu

## Running the Application

1. Install [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/)
2. Paste the Ext JS SDK into the root of the project as a folder name `ext`.
3. Open Command Line
4. Navigate to `ext-mail` application folder (i.e. `<where-you-cloned-to>/ext-mail`)
5. Run `sencha app watch classic` or `sencha app watch modern`
6. Open browser to `http://localhost:1841`
