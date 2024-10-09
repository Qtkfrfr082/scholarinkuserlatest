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

# installing necessary dependencies

type: npm install -D tailwindcss postcss autoprefixer

type: npx tailwindcss init -p

#do this after you see the tailwind.config.js to your files
![image](https://github.com/user-attachments/assets/ce017b25-6464-44c4-8022-6b836be225f6)







