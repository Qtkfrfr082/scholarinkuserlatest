# scholarinkuserlatest

Guide to creating React js with vite

in your command line:

type: winget install Schniz.fnm

# configure fnm environment
type: fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
type: fnm use --install-if-missing 20

#install reactjs with vite
type: npm create vite@latest "projectname"  (remove " and type your project name small caps and no space)

select by arrow key: "react" then enter key
select by arrow key: "javascript" then enter key

# now make sure it have a folder project from you left window tab

type: cd projectfoldername

type: fnm env --use-on-cd | Out-String | Invoke-Expression

type: npm run dev (to run localhost of the react app)

then consider it done!




