#AppGratis Opensource Website source

This project is the sourcecode used to build https://AppGratis.github.io 

It has two parts:
 - A home page, with a list of open-sourced projects and link to their github pages
 - The configuration generator for the Unlock library. It allows you to graphically create your unlock offers and generate the JSON expected by the libraries

## Contributing

This is a standard react app, created with `react-create-app`.  
If you are familiar with any React project, you shouldn't have any issue with this codebase.

## Build 
Just like any react-create-app project, just run `npm start` to work locally on the project.  

Once you want to release it, run `npm run build`: the optimized production build will be in the `build` folder.

If you want to upload the website to another URL than https://AppGratis.github.io , please change `homepage` in `package.json`
