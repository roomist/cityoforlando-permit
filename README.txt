Aight so basically...

In the SRC of the main repo you can add a new directory and call it "backend".

Throw these three files into it.  Theres some basic installs you have to do.. 

https://www.youtube.com/watch?v=fPuLnzSjPLE

You can follow like the first 10m of this youtube video for all the installs.. i already wrote all the code you need following this dude so dw about that part
Just dump this code into that directory and do the installs and you can read the notes i left in the files on more info on how to configure everything and see the changes working.  


--UPDATE--

Okay i did a lot of the front end.... warning IT IS UGLY AS HELL
BUTTTT it works... i do have a 404 issue though but its like 1 am so yall can figure that out lmao

PLEASE LOOK AT THE BASH INSTALL TXT FILE you WILL need to install all of those for this to work.

also im sure you all know how to initiate a react app... you will need to create a directory called client IN THE SRC directory...
then initiate the react app in that client directory. ALL OF THE FILES I ADDED HAVE INSTRUCTIONS IN THE COMMIT MESSAGE. If you follow those and put all the files in the right spot 
everything should work and you guys can have a field day improving it all.  FYI THE FILE PATH SHOULD LOOK LIKE

-SRC
-----+Backend:
---------| DBPermits.js
---------| package.json
---------| package-lock.json
-----+Client:
---------|----+Pages:
---------|--------| add.jsx
---------|--------| update.jsx
---------|--------| Permits.jsx
---------| App.js (THIS IS THE SAME ONE REACT INITIALIZES JUST OVERWRITE IT WITH THIS)
---------| style.css

HOPE THIS HELPS :) 

