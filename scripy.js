// User names
const userArray = ["vaibhav", "nikhil", "shreyash", "kshitij", "pankaj", "aniket", "pranay", "aditya", "siddhesh", "kartik"];

function sendMoney() {
    // Get sender's, receiver's, and amount in Send Money
    var senderName = document.getElementById("senderName").value.toLowerCase(); // Convert to lowercase
    var receiverName = document.getElementById("receiverName").value.toLowerCase(); // Convert to lowercase
    var amount = parseInt(document.getElementById("amount").value);

    var sender = senderName.charAt(0).toUpperCase() + senderName.slice(1);
    var receiver = receiverName.charAt(0).toUpperCase() + receiverName.slice(1);

    // Dialog Box ID's
    var element = document.getElementById("alertMsg");
    const alertBox = document.getElementById('alert');
    alertBox.style.display = 'block';

    // Check if all inputs are empty
    if (!senderName || !receiverName || !amount) {
        element.innerText = `Missing details !`;
    }
    // Check if sender and receiver exist after converting to lowercase
    else if (!userArray.includes(senderName)) {
        element.innerText = `Sender ${sender} is not present..`;
    } else if (!userArray.includes(receiverName)) {
        element.innerText = `Receiver ${receiver} is not present..`;
    } else {
        // Get sender and receiver's account balance
        var senderUserBankAccount = senderName + "BankBalance";
        var receiverUserBankAccount = receiverName + "BankBalance";

        var senderBankBalance = parseInt(document.getElementById(senderUserBankAccount).innerText);
        var receiverBankBalance = parseInt(document.getElementById(receiverUserBankAccount).innerHTML);

        // Check if both sender and receiver are the same
        if (senderName === receiverName) {
            element.innerText = `Can't send money to the same user..!!`;
        }
        // Check if the amount to be sent from the sender's account is greater than the available amount
        else if (amount > senderBankBalance) {
            element.innerText = `Insufficient Balance at sender ${sender}!!`;
        } else {
            // Finally, update the balances
            var receiverFinalAmount = receiverBankBalance + amount;
            var senderFinalAmount = senderBankBalance - amount;

            document.getElementById(senderUserBankAccount).innerText = '-' + senderFinalAmount;
            document.getElementById(senderUserBankAccount).style.color = 'red';
            document.getElementById(receiverUserBankAccount).innerHTML = '+' + receiverFinalAmount;
            document.getElementById(receiverUserBankAccount).style.color = 'green';

            // Alert message
            element.innerHTML = `<strong> Success!</strong> Rs.${amount} is sent to recipient ${receiver} from ${sender} !`;

            // Transaction history 
            var createPTag = document.createElement("li");
            var now = new Date();
            var formattedDate = now.toDateString() + ' ' + now.toLocaleTimeString();
            var textNode = document.createTextNode(`Rs.${amount} is sent to recipient ${receiver} from ${sender} on ${formattedDate}.`);
            createPTag.appendChild(textNode);
            createPTag.style.color = "#272727";
            var historyElement = document.getElementById("transaction-history-body");
            historyElement.insertBefore(createPTag, historyElement.firstChild);
        }
    }

    // Reset the form after submission
    $('#myForm')[0].reset();

    // Hide the dialog box after 6s and clear the text inside
    setTimeout(() => {
        alertBox.style.display = 'none';
        $("#alertMsg").text('');
        document.getElementById(senderUserBankAccount).style.color = '#272727';
        document.getElementById(senderUserBankAccount).innerText = senderFinalAmount;
        document.getElementById(receiverUserBankAccount).style.color = '#272727';
        document.getElementById(receiverUserBankAccount).innerHTML = receiverFinalAmount;
    }, 6000);
}
