#AppGratis Unlock Library (Website source code)

This project is the source code used to build https://appgratis.github.io.

It has two parts:
 - A home page, with a list of open-sourced projects and link to their GitHub pages.
 - The configuration generator for the AppGratis Unlock library. It allows you to create your unlock offers from a web interface and generate the JSON expected by the mobile libraries.

## Contributing

This is a standard React app, created with `react-create-app`.  
If you are familiar with any React project, you shouldn't have any issue with this codebase.

## Build 
Just like any react-create-app project, just run `npm start` to work locally on the project.  

Once you want to release it, run `npm run build`: the optimized production build will be in the `build` folder.

If you want to upload the website to another URL than https://appgratis.github.io , please change `homepage` in `package.json`
