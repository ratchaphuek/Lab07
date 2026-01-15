// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."
// 2) Hide previous result (if any)
// 3) Fetch from: https://randomuser.me/api/
// 4) If (!res.ok) show error message
// 5) Parse JSON and render: name + email + avatar
// 6) Show status: "Loaded successfully."
//
// Must-have pattern: async/await, try/catch, res.ok, await res.json()

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");
const clearBtn = document.getElementById("btnClear");


// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });

loadUserBtn.addEventListener("click", async () => {
  // 2) UI state: show loading + disable button
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;


  // 3) Hide previous result (required)
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";


  try {
    // 4) Fetch random user data
    const res = await fetch("https://randomuser.me/api/");


    // 5) Check res.ok (HTTP errors do not throw automatically)
    if (!res.ok) throw new Error(`HTTP ${res.status}`);


    // 6) Parse JSON
    const data = await res.json();
    const user = data.results[0];


    // 7) Render name + email + avatar into resultDiv
    resultDiv.innerHTML = `
  <img src="${user.picture.large}" class="w-24 h-24 rounded-full mb-2" />
  <p class="font-semibold">
    ${user.name.first} ${user.name.last}
  </p>
  <p class="text-sm text-gray-600">${user.email}</p>
`;



    // 8) Show result area (remove "hidden")
  resultDiv.classList.remove("hidden");


    // 9) Status success
    statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    // 10) Status error
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // 11) Re-enable button (always)
    loadUserBtn.disabled = false;
  }
  clearBtn.addEventListener("click", () => {
  statusDiv.textContent = "";
  resultDiv.innerHTML = "";
  resultDiv.classList.add("hidden");
});

});