# Day 3
Today I'll be Learning more about how cookies and session work with Express Js. I'll be creating small Authentication application with simple Register and login/logout functionality So let's get into it. 😄
<details>
<summary><b>Cookies</b></summary>

Cookies are simple, small file/data that are sent to client with a server request and stored on the client side. Every time the user reloads the website back, this cookie is sent with request. This help us keep track of the user's actions.

The following are the numerous uses of the HTTP Cookies −

- Session management
- Personalization(Recommendation systems)
- User tracking

To use cookies with Express, we need the cookie-parser middleware. To install it, use the following code −
```bash 
npm install --save cookie-parser
```

Now to use cookies with Express, we will require the cookie-parser. cookie-parser is a middleware which parses cookies attached to the client request object. To use it, we will require it in our index.js file; this can be used the same way as we use other middleware. Here, we will use the following code.

```js
var cookieParser = require('cookie-parser');
app.use(cookieParser());
```

cookie-parser parses Cookie header and populates req.cookies with an object keyed by the cookie names. To set a new cookie, let us define a new route in your Express app like −
```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.cookie('name', 'express').send('cookie set'); //Sets name = express
});

app.listen(3000);
```

To check if your cookie is set or not, just go to your browser, fire up the console, and enter −

```js
console.log(document.cookie);
```

You will get the output like (you may have more cookies set maybe due to extensions in your browser) −

```log
"name = express"
```
The browser also sends back cookies every time it queries the server. To view cookies from your server, on the server console in a route, add the following code to that route.

```js
console.log('Cookies: ', req.cookies);
```

Next time you send a request to this route, you will receive the following output.

```bash
Cookies: { name: 'express' }
```
### Adding Cookies with Expiration Time
- You can add cookies that expire. To add a cookie that expires, just pass an object with property 'expire' set to the time when you want it to expire. For example,

    ```js
    //Expires after 360000 ms from the time it is set.
    res.cookie(name, 'value', {expire: 360000 + Date.now()}); 
    ```
- Another way to set expiration time is using 'maxAge' property. Using this property, we can provide relative time instead of absolute time. Following is an example of this method.

    ```js
    //This cookie also expires after 360000 ms from the time it is set.
    res.cookie(name, 'value', {maxAge: 360000});
    ```

### Deleting Existing Cookies

To delete a cookie, use the clearCookie function. For example, if you need to clear a cookie named foo, use the following code.

```js
var express = require('express');
var app = express();

app.get('/clear_cookie_foo', function(req, res){
   res.clearCookie('foo');
   res.send('cookie foo cleared');
});

app.listen(3000);

```
</details>
<details>
    <summary><b>Session</b></summary>
HTTP is stateless; in order to associate a request to any other request, you need a way to store user data between HTTP requests. Cookies and URL parameters are both suitable ways to transport data between the client and the server. But they are both readable and on the client side. Sessions solve exactly this problem. You assign the client an ID and it makes all further requests using that ID. Information associated with the client is stored on the server linked to this ID.

We will need the Express-session, so install it using the following code.

```bash
npm install --save express-session
```
We will put the session and cookie-parser middleware in place. In this example, we will use the default store for storing sessions, i.e., MemoryStore. Never use this in production environments. The session middleware handles all things for us, i.e., creating the session, setting the session cookie and creating the session object in req object.

Whenever we make a request from the same client again, we will have their session information stored with us (given that the server was not restarted). We can add more properties to the session object. In the following example, we will create a view counter for a client.

```js
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000);
```
What the above code does is, when a user visits the site, it creates a new session for the user and assigns them a cookie. Next time the user comes, the cookie is checked and the page_view session variable is updated accordingly.

Now if you run the app and go to localhost:3000, the following output will be displayed.

![Session on first visit](/day-3/Authentication/public/session-first-time.png)

If you revisit the page, the page counter will increase. The page in the following screenshot was refreshed 2 times.

![Session after so many visits](/day-3/Authentication/public/session.png)
</details>