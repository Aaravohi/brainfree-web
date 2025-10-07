# BrainFree

BrainFree is a simplified programming language inspired by Brainf***, created by Aaravohi for educational and fun purposes. It uses memory “cells” that you manipulate with explicit commands.

## Commands

Each command is written in the format `[cell_id:value:function]`:

- **cell_id**: Moves the pointer. Examples:  
  - `cell0` → start at the first cell  
  - `cell+1` → move one cell forward  
  - `cell-2` → move two cells back  

- **value**: Changes the numeric value of the cell. Examples:  
  - `+5` → add five  
  - `-3` → subtract three  
  - leave empty → no change  

- **function**: Performs input/output actions. Examples:  
  - `out` → output the ASCII character of the current cell  
  - `in` → input a character into the cell  
  - leave empty → no function  

## Loops

Loops are written using curly braces `{ ... }`, which repeat the enclosed commands while the current cell is nonzero, similar to Brainf***’s `[ ... ]` loops.

## How to Use

1. Open `index.html` in a web browser.  
2. Enter your BrainFree code in the textarea.  
3. Press **Enter** to run your program or **Shift+Enter** to go to a new line.  
4. Click the **ASCII Values** button to see a reference table of all ASCII characters.  
5. Output appears on the canvas below the input area.

BrainFree allows combining multiple cells and loops to create messages, manipulate memory values, or experiment with programming concepts in a simple, visual way. It is lightweight, browser-based, and entirely free to use.
