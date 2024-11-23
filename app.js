const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch and display items on the homepage
if (window.location.pathname.includes("index.html")) {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("items-container");
      data.slice(0, 10).forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
          <h3>${item.title}</h3>
          <button class="btn" onclick="window.location.href='details.html?id=${item.id}'">Details</button>
          <button class="btn" onclick="window.location.href='edit.html?id=${item.id}'">Edit</button>
          <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
        `;
        container.appendChild(itemDiv);
      });
    });
}

// View item details
if (window.location.pathname.includes("details.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`)
    .then((response) => response.json())
    .then((item) => {
      const detailsContainer = document.getElementById("item-details");
      detailsContainer.innerHTML = `
        <h1>${item.title}</h1>
        <p>${item.body}</p>
        <button class="btn" onclick="window.location.href='index.html'">Back to Home</button>
      `;
    });
}

// Create a new item
if (window.location.pathname.includes("create.html")) {
  const form = document.getElementById("create-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    }).then(() => {
      alert("Item created!");
      window.location.href = "index.html";
    });
  });
}

// Edit an item
if (window.location.pathname.includes("edit.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`)
    .then((response) => response.json())
    .then((item) => {
      document.getElementById("edit-title").value = item.title;
      document.getElementById("edit-body").value = item.body;
    });

  const form = document.getElementById("edit-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("edit-title").value;
    const body = document.getElementById("edit-body").value;

    fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    }).then(() => {
      alert("Item updated!");
      window.location.href = "index.html";
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title');
    const titleCount = document.getElementById('title-count');
    const descriptionInput = document.getElementById('description');
    const descriptionCount = document.getElementById('description-count');

    // Function to update character count
    const updateCount = (input, countElement, maxLength) => {
        const currentLength = input.value.length;
        countElement.textContent = `${currentLength}/${maxLength}`;
        if (currentLength === maxLength) {
            countElement.classList.add('error');
        } else {
            countElement.classList.remove('error');
        }
    };

    // Attach input event listeners
    titleInput.addEventListener('input', () => {
        updateCount(titleInput, titleCount, 50);
    });

    descriptionInput.addEventListener('input', () => {
        updateCount(descriptionInput, descriptionCount, 200);
    });
});


// Delete an item
function deleteItem(id) {
  fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, { method: "DELETE" }).then(() => {
    alert("Item deleted!");
    location.reload();
  });
}
