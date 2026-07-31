# Customer Service Chatbot

# Setup/Installation instructions:
- Download/Clone repo
- Install Live Server extension in VSCode or similar product to preview project in a browser or click this link for live demo:

## Description:
This is a chatbot for customers searching for a product. The chatbot will ask the user a series of questions and use the customer's answers to filter the list of available products in a database and present them to the user.

The questions asked by the chatbot are designed to read like mutliple choice questions so that the user is more likely to provide one of the expected answers as their input. In the case of unexpected user input, the chatbot will respond with a message saying it did not understand and repeat the question.

## Implementation details
- This project is build with HTML/CSS/JavaScript, and emulates a feature that might be found on an ecommerce website.
- Product information is stored in an array, with each product represented by an object.
- Conversation flow is stored in a map. Each key corresponds to a unique prompt, which has a value, prompt text, and options that the user can respond with. The options are keys of other prompts. The prompt/option relationship simulates the tree-like structure shown in the flowchart.

Examples:
<img width="1024" height="651" alt="Example of using chatbot" src="https://github.com/user-attachments/assets/36b4ec24-11d3-4a62-9d47-a05704d1c451" />

<img width="963" height="658" alt="Example of using chatbot" src="https://github.com/user-attachments/assets/2c711b75-d951-4c29-8298-f31c70bdc6bc" />

<img width="1601" height="945" alt="Conversation flowchart" src="https://github.com/user-attachments/assets/5e8cf7de-ee20-4cb9-a3b9-395bb4807042" />


