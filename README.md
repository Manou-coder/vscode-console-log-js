# console-log-js

Easily insert and comment console.log statements, by [M-coder](https://github.com/Manou-coder).

It's true, there are already a lot of extensions to write console.logs quickly and I have used some.
However, as I used it I felt a need to add some small features so that the extension suited me perfectly.

Here are some of the available features:

- writes a console.log just by placing the cursor on the word (without needing to select it).
- automatically detects if the file is encoded with semicolons.
- manages the indentation in an optimized way (a bit complicated to explain in one line but do the experiment)
- if you select an object with its square brackets, then the extension will write a separate console.log for each of them. This is also valid for an array. (the coolest feature in my opinion)
- allows to comment all console.log of a file with only one keyboard shortcut (the number of console log comments will be displayed)
- if the cursor is not placed on text then it will simply write "console.log()"
  <br/>
  <br/>

**Sample with variables:**
![Sample with variables](https://user-images.githubusercontent.com/102325816/223101948-05cac817-fbff-4e7e-848a-28627e6ca2aa.gif)

<br/>
<br/>

**Sample with object:**
![Sample with object](https://user-images.githubusercontent.com/102325816/223102960-a4083027-b018-4676-86c1-7f0317b93aab.gif)

## Installing

This extension is available for free in the Visual Studio Code Marketplace.

## Usage

### Write console.logs:

##### With cursor over the word or selection:

Press **Cmd+Shift+L** => The output (on a new line) will be: console.log('variable: ', variable);

##### Without selection:

Press **Cmd+Shift+L** => The output (on the same line) will be: console.log();

### Comment all console.logs:

Press **Cmd+Shift+D** => This will comment all console.log statements in the current file.

### Remove all console.logs:

Press **Cmd+Shift+S** => This will remove all console.log statements in the current file.

## License

MIT License
