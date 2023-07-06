# learning-MERN
    Learning MERN STACK.

# Express Js
    Express Js provides a minimal Interface to built an application. It provides us the tools that are required to build our app. It is flexible as there are numerous modules available on npm, which can be directly plugged into Express.

## Seting up the Express Environment
Confirm that node and npm are installed by running the following commands in your terminal.
    
    node --version
    npm --version
    
if you have both of them Setup runnig in you system. Let us set up our development project.

    ### Step 1 − Start your terminal/cmd, create a new folder named hello-world and cd (create directory) into it −

        mkdir expressJs
        cd expressJs

    ### Step 2 − Now to create the package.json file using npm, use the following code.
        
        npm init
    
    It'll ask for some Information about your project.
    Just keep pressing enter, and enter your name at the “author name” field.

    ### Step 3 − Now we have our package.json file set up, we will further install Express. To install Express and add it to our package.json file, use the following command −
        
        npm install --save express

    ### You're all set start development using the Express framework.
    To make our development process a lot easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files, otherwise we need to restart the server manually after each file modification. To install nodemon, use the following command −
        
        npm install -g nodemon

# PUG
    Pug (earlier known as Jade) is a terse language for writing HTML templates. It −
        1. Produces HTML
        2. Supports dynamic code
        3. Supports reusability (DRY)

# MongoDB and Mongoose
    MongoDB is an open-source, document database designed for ease of development and scaling. This database is also used to store data.
    Mongoose is a client API for node.js which makes it easy to access our database from our Express application.