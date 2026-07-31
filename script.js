const messages = []; // Holds chat history. Contents will be mapped to chatbox element. Bot messages labelled 0, User messages labelled 1, 
const messagesContainer = document.getElementById("messages-container");
const textbox = document.getElementById("textbox");
const sendButton = document.getElementById("send-button");
const botSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
</svg>`;

const userSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>`;

/*
    Array that holds product information as objects.
*/
const products = [
    {
        name: "Chromebook",
        device_type: "laptop",
        category: "general computer use",
        price: 800,
    },
    {
        name: "Notebook",
        device_type: "laptop",
        category: "general computer use",
        price: 1200,
    },
    {
        name: "MacBook Air",
        device_type: "laptop",
        category: "art/programming",
        price: 999,
    },
    {
        name: "MacBook Pro",
        device_type: "laptop",
        category: "art/programming",
        price: 1600,
    },
    {
        name: "Razer Pro",
        device_type: "laptop",
        category: "gaming",
        price: 950,
    },
    {
        name: "ROG Zephyrus",
        device_type: "laptop",
        category: "gaming",
        price: 1450,
    },
    {
        name: "iPhone Lite",
        device_type: "phone",
        category: "apple",
        price: 750,
    },
    {
        name: "iPhone Pro Max",
        device_type: "phone",
        category: "apple",
        price: 1100,
    },
    {
        name: "Nokia 3000",
        device_type: "phone",
        category: "android",
        price: 399,
    },
    {
        name: "Galaxy S250",
        device_type: "phone",
        category: "android",
        price: 1020,
    },
];

/*
    Map that holds the prompt flow. Each object contains a 
    value (usually the user's answer to the previous prompt), 
    prompt, and possible options the user can repsond with.
*/
const prompts = new Map([
    [
        0,
        {
            key: "",
            value: "", 
            prompt: "Are you looking for a laptop or a phone today?",
            options: [1, 2],
        }
    ],
    [
        1,
        {
            key: "device_type",
            value: "laptop", 
            prompt: "Will this laptop be for general computer use, art/programming, or gaming?",
            options: [3,4,5],
        }
    ],
    [
        2,
        {
            key: "device_type",
            value: "phone", 
            prompt: "Apple or Android?",
            options: [6,7],
        }
    ],
    [
        3,
        {
            key: "category",
            value: "general computer use", 
            prompt: "Is your budget under $1000 or over $1000?",
            options: [8,9],
        }
    ],
    [
        4,
        {
            key: "category",
            value: "art/programming", 
            prompt: "Is your budget under $1000 or over $1000?",
            options: [8,9],
        }
    ],
    [
        5,
        {
            key: "category",
            value: "gaming", 
            prompt: "Is your budget under $1000 or over $1000?",
            options: [8,9],
        }
    ],
    [
        6,
        {
            key: "category",
            value: "apple", 
            prompt: "Is your budget under $1000 or over $1000?",
            options: [8,9],
        }
    ],
    [
        7,
        {
            key: "category",
            value: "android", 
            prompt: "Is your budget under $1000 or over $1000?",
            options: [8,9],
        }
    ],
    [
        8,
        {
            key: "price",
            value: "under $1000", 
            prompt: "",
            options: [],
        }
    ],
    [
        9,
        {
            key: "price",
            value: "over $1000", 
            prompt: "",
            options: [],
        }
    ],
]);

const promptHistory = []; // Records flow through prompts. Info from prompt history will be used to filter results from products array.

function findProducts() {
    const targetProduct = {};
    for(const promptId of promptHistory) {
        const prompt = prompts.get(promptId);
        targetProduct[prompt.key] = prompt.value;
    }
    console.log(targetProduct);
    const res = products.filter((product) => {
        return product.device_type == targetProduct.device_type &&
        product.category == targetProduct.category &&
        (targetProduct.price == "under $1000" ? product.price < 1000 : true)
    });
    return res;
}

function displayMessages() {
    let messageContainerContents = "";
    for(const message of messages) {
        messageContainerContents += message[0] == 0 ? `<li><p class="message bot-message">${message[1]}</p><div class="sender-icon-div">${botSVG}</div></li>` : `<li><div class="sender-icon-div">${userSVG}</div><p class="message user-message">${message[1]}</p></li>`;
    }
    messagesContainer.innerHTML = `<ul>${messageContainerContents}</ul>`;
}

function handleSendMessage() {
    const input = textbox.value.trim().toLowerCase();
    const optionsArr = prompts.get(promptHistory.at(-1)).options;
    const options = optionsArr.map((option)=>[option, prompts.get(option).value]);
    
    // Don't send empty message
    if(input === "") {
        return;
    }
    messages.push([1, input]);
    // Check whether input is either of the options
    const res = options.find(option => input === option[1]);
    if(res) {
        botPrompt(res[0]);
    }
    else {
        botSendMessage("Sorry, I didn't understand that.");
        botSendMessage(prompts.get(promptHistory.at(-1)).prompt);
    }
    textbox.value = "";
    displayMessages();
}

function botSendMessage(message) {
    messages.push([0, message]);
    displayMessages();
}

function botPrompt(promptId) {
    promptHistory.push(promptId);
    const promptObj = prompts.get(promptId);
    if(promptObj.options.length == 0) {
        findProducts();
        let resultsMessage = "Here are some product(s) I found that might fit your needs:<br>";
        findProducts().forEach(product => resultsMessage += `${product.name}\t (Price: $${product.price}) `);
        botSendMessage(resultsMessage);
        return;
    }
    botSendMessage(promptObj.prompt);
}

sendButton.addEventListener("click", handleSendMessage);
document.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        handleSendMessage();
    }
});

botPrompt(0);



