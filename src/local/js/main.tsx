
import gui from "/wc/gui/test.js";

// This is a real comment
{
    let text: string = "🙈 I`m here! 🙉";

    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerText = text;
    })

    console.log("And here! 🙊");
}

gui();
