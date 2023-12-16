const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCountElement = document.getElementById("completed-count"); // Ensure you have an element with id="completed-count" in your HTML

let completedTaskCount = 0;

const displayCompletedCount = () => {
    completedCountElement.innerText = completedTaskCount; // Update the completed task count display
};

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        // Update the completed task count when a task is checked or unchecked
        if (e.target.classList.contains("checked")) {
            completedTaskCount++;
        } else {
            completedTaskCount--;
        }
        displayCompletedCount(); // Update the display
    } else if (e.target.tagName === "SPAN") {
        // Adjust the completed task count if a completed task is removed
        if (e.target.parentElement.classList.contains("checked")) {
            completedTaskCount--;
            displayCompletedCount(); // Update the display
        }
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("completedTaskCount", completedTaskCount); // Save the current completed task count
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    completedTaskCount = Number(localStorage.getItem("completedTaskCount")) || 0; // Load the completed task count or default to 0 if not found
    displayCompletedCount(); // Update the display
}

showTask();
 


