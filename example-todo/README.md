# 🔖 Todo With Svelte

A simple todo app built with Appwrite and Svelte

If you simply want to try out the App, go ahead and check out the demo at https://todo-with-svelte.up.railway.app/

https://user-images.githubusercontent.com/52352285/196016987-42fd4eeb-b8b1-4751-8cca-49cd8ec312f8.mov

We need to make a few configuration changes to your Appwrite server.

1. Add a new Web App in Appwrite and enter the endpoint of your website (localhost, <project-name>.vercel.app etc)

<img width="1297" alt="2app" src="https://user-images.githubusercontent.com/52352285/196017379-04e83421-6b04-4c38-9760-9614c4354ee4.png">

2. Create a new collection with the following properties

<img width="1079" alt="svelte1" src="https://user-images.githubusercontent.com/52352285/196017118-b67844d0-7d30-457e-887d-fddb72cc7eee.png">

3. Add the following permissions to your collection.

<img width="737" alt="3" src="https://user-images.githubusercontent.com/52352285/196017478-8a80c7cd-3837-4ae0-8470-f871e2500e31.png">


## 🎬 Getting Started

### 🤘 Install Appwrite 
Follow our simple [Installation Guide](https://appwrite.io/docs/installation) to get Appwrite up and running in no time. You can either deploy Appwrite on your local machine or, on any cloud provider of your choice. 

> Note: If you setup Appwrite on your local machine, you will need to create a public IP so that your hosted frontend can access it.
  
We need to make a few configuration changes to your Appwrite server. 



### 🚀 Deploy the Front End
You have two options to deploy the front-end and we will cover both of them here. In either case, you will need to fill in these environment variables that help your frontend connect to Appwrite.

* VITE_APP_ENDPOINT - Your Appwrite endpoint
* VITE_APP_PROJECT - Your Appwrite project ID
* VITE_APP_COLLECTION_ID - Your Appwrite collection ID 
* VITE_APP_DATABASE_ID - Your Appwrite database ID

### **Run locally**

Follow these instructions to run the demo app locally

```sh
$ git clone https://github.com/Sooraj-s-98/todo-with-svelte
$ cd todo-with-svelte
```

Run the following command to generate your `.env` vars  

```sh
$ cp .env.example .env
```

Now fill in the envrionment variables we discussed above in your `.env`

Now run the following commands and you should be good to go 💪🏼 
```
$ npm install
$ npm run dev
```
