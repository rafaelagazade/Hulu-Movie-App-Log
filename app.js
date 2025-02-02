const logBtn = document.querySelector(".fst-btn");
const logPopClose = document.querySelector(".lp-close");

const termsPop = document.querySelector(".terms-popUp");
const termsBtn = document.querySelector(".fs-terms");
const trmClose = document.querySelector(".tp-c");
const regLogBtn = document.querySelector(".lpm-regs-btn");
const regPop = document.querySelector(".registerPopUp");
const regClose = document.querySelector(".rp-close");
const logPopUp = document.querySelector(".loginPopUp");

const logEmailInput = document.querySelector(".lpe-i");
const logPasswordInput = document.querySelector(".lpp-i");
const logInBtn = document.querySelector(".lpm-login-btn");
const regEmailInput = document.querySelector(".rpe-i");
const regPasswordInput = document.querySelector(".rpp-i");
const regRegBtn = document.querySelector(".rpm-regs-btn");

const allInput = document.querySelectorAll("#input");

const navLs = document.querySelector(".tsn-live-sport");
const navBn = document.querySelector(".tsn-breaking-news");
const navBe = document.querySelector(".tsn-biggest-events");
const navWBox = document.querySelector(".tsn-white-underline");

const navLsBg = document.querySelector(".tsn-ls-bg");
const navBnBg = document.querySelector(".tsn-bn-bg");
const navBeBg = document.querySelector(".tsn-be-bg");

const tsnLsInfo = document.querySelector(".tsn-ls-info");
const tsnBnInfo = document.querySelector(".tsn-bn-info");
const tsnBeInfo = document.querySelector(".tsn-be-info");

const changerBtn = document.querySelector(".button");
const changerBg = document.querySelector(".changer");
const changer = document.querySelector(".ftl-center");

const showMoreInfo = document.querySelector(".forsm-show-btn");
const showMoreInfoP = document.querySelector(".forsm-show-btn p");
const showMoreInfoIco = document.querySelector(".forsm-show-btn i");
const foursMiddle = document.querySelector(".fours-middle");
const fourthSection = document.querySelector(".fourth-section");
const forsmSecondList = document.querySelector(".forsm-second-list");

const hamburger = document.querySelector(".fst-hamburger");
const resPop = document.querySelector(".responsivePopUp");

const loginResBtn = document.querySelector(".responsivePopUp .rp-2");
const responsivLogIn = document.querySelector(".responsivLogIn");

const API_KEY = "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"; // Replace with your JSONBin API Key
const BIN_ID = "679ef92dad19ca34f8f85e47"; // Replace with your JSONBin Bin ID

hamburger.addEventListener("click", () => {
  resPop.classList.toggle("active");
});

let P = true;
showMoreInfo.addEventListener("click", () => {
  fourthSection.classList.toggle("foruthSectionAc");
  foursMiddle.classList.toggle("foursMiddleAc");
  forsmSecondList.classList.toggle("forsmSecondList");
  if (P) {
    showMoreInfoP.innerText = "Hide Add-Ons";
    showMoreInfoIco.style.transform = "rotate(0.5turn)";
  } else {
    showMoreInfoP.innerText = "Show Add-Ons";
    showMoreInfoIco.style.transform = "none";
  }
  P = !P;
});

changer.addEventListener("click", () => {
  changerBg.classList.toggle("buttonBg");
  changerBtn.classList.toggle("buttonBtn");
});

navLs.addEventListener("click", () => {
  navWBox.style.marginLeft = "0";
  navWBox.style.width = "101px";
  navBnBg.style.marginLeft = "100%";
  navBeBg.style.marginLeft = "200%";
  tsnLsInfo.style.marginTop = "0px";
});

navBn.addEventListener("click", () => {
  navWBox.style.marginLeft = "165px";
  navWBox.style.width = "136px";
  navBnBg.style.marginLeft = "0";
  navBeBg.style.marginLeft = "100%";
  navLsBg.style.marginRight = "100%";
  tsnLsInfo.style.marginTop = "1000px";
  tsnBnInfo.style.marginTop = "0";
});

navBe.addEventListener("click", () => {
  navWBox.style.marginLeft = "365px";
  navWBox.style.width = "136px";
  navBeBg.style.marginLeft = "0";
  navBeBg.style.marginRight = "100%";
  tsnBnInfo.style.marginTop = "1000px";
  tsnBeInfo.style.marginTop = "0";
  tsnLsInfo.style.marginTop = "1000px";
});

allInput.forEach((e) => {
  e.addEventListener("keydown", (inp) => {
    //console.log(logEmailInput.value, "email");
    //console.log(logPasswordInput.value, "password");
    
    //const emailValue = logEmailInput.value;
    //const passwordValue = logPasswordInput.value;

    const emailValue = "0";
    const passwordValue = "0";
    
    if (emailValue && passwordValue) {
      logInBtn.style.backgroundColor = "#00ed82";
      //console.log(2);
    } else {
      logInBtn.style.backgroundColor = "#48494b";
      //console.log(3);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Load function: Check user data and verify on page load
window.addEventListener("load", async () => {
  const logEmail = logEmailInput.value;
  const logPassword = logPasswordInput.value;

  if (!logEmail || !logPassword) {
    return; // Do nothing if the email or password fields are empty
  }

  // Fetch the list of users from the API
  const usersList = await getUserData();
  if (!usersList || usersList.length === 0) {
    console.error("No users found in the database.");
    return;
  }

  // Loop through the API users to check for a match
  const userMatch = usersList.find(user =>
    user.email === logEmail &&
    user.password === logPassword
  );

  const sessionData = await getSessionData();

   if (sessionData) {
    console.log("Session found. User already logged in.");
    //window.location.href = "https://hulu-movie-app-main.vercel.app/";  // Redirect to home if already logged in
    //return;
  }

  if (userMatch) {
    await storeSessionData({ email: logEmail });
    console.log("User verified. Redirecting...");
    window.location.href = "https://hulu-movie-app-main.vercel.app/";
  } else {
    console.log("User data does not match API records.");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getUserData() {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/679ef92dad19ca34f8f85e47/latest", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
      }
    });

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    
    return Array.isArray(data.record.users) ? data.record.users : [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return []; // Return empty array if there's an error
  }
}

// Function to fetch session data from the session bin
async function getSessionData() {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/679f1129e41b4d34e482a903/latest", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
      }
    });

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    
    return Array.isArray(data.record.sessions) ? data.record.sessions : [];
  } catch (error) {
    console.error("Error fetching session data:", error);
    return []; // Return empty array if there's an error
  }
}

// Function to store session (email) in the session bin
async function storeSession(email) {
  // Get existing session data from the session bin
  let sessionData = await getSessionData();
  if (!sessionData) sessionData = []; // Initialize session data if empty

  // Add new session (email) to the list
  sessionData.push({ email });

  // Send updated session data to the SESSION_BIN_ID
  const response = await fetch("https://api.jsonbin.io/v3/b/679f1129e41b4d34e482a903", {
    method: "PUT", // Update the bin with new session data
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
    },
    body: JSON.stringify({ sessions: sessionData }) // Save session as an array
  });

  if (response.ok) {
    console.log("Session data stored successfully!");
  } else {
    console.error("Failed to store session data.");
  }
}

// Function to store user data (email and password) in the user bin
async function storeUserData(email, password) {
  const newUser = { email, password };

  // Get existing users from the user bin
  let usersList = await getUserData();
  if (!usersList) usersList = []; // Initialize users array if empty

  // Check if the user already exists
  const userExists = usersList.some(user => user.email === email);
  if (userExists) {
    alert("User already registered!");
    return;
  }

  // Add new user to the list
  usersList.push(newUser);

  // Send updated user data to the USER_BIN_ID
  const response = await fetch("https://api.jsonbin.io/v3/b/679ef92dad19ca34f8f85e47", {
    method: "PUT", // Update the bin with new user data
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
    },
    body: JSON.stringify({ users: usersList }) // Save users as an array
  });

  if (response.ok) {
    console.log("User registered successfully!");
  } else {
    console.error("Failed to store user data.");
  }
}

// Trigger registration when the registration button is clicked
//regRegBtn.onclick = async () => {
        
//  const regEmail = regEmailInput.value.trim();
//  const regPassword = regPasswordInput.value.trim();

//  if (regEmail && regPassword) {
    // Store session data (email) in the session bin
//    await storeSession(regEmail);
    
    // Store user data (email and password) in the user bin
//    await storeUserData(regEmail, regPassword);
    
    // Display success and hide registration popup
//    logPopUp.style.display = "flex";
//    regPop.style.display = "none";
//  } else {
//    alert("Please enter both email and password.");
//  }
// };

regBtn.onclick = async () => {
  const regEmail = regEmailInput.value.trim();
  const regPassword = regPasswordInput.value.trim();

  if (regEmail && regPassword) {
    // Store session data (email) in the session bin
    await storeSession(regEmail);
    
    // Store user data (email and password) in the user bin
    await storeUserData(regEmail, regPassword);

    // Start 5-second countdown before showing success message
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        alert(`Redirecting in ${countdown} seconds...`);
        countdown--;
      } else {
        clearInterval(countdownInterval);
        
        // Display success and hide registration popup
        logPopUp.style.display = "flex";
        regPop.style.display = "none";

        alert("Registration successful! You can now log in.");
      }
    }, 1000);
  } else {
    alert("Please enter both email and password.");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logInBtn.addEventListener("click", async () => {
  const logEmail = logEmailInput.value;
  const logPassword = logPasswordInput.value;

  // Fetch users from the API
  const usersList = await getUserData();
  if (!usersList) {
    console.error("Failed to fetch user data.");
    return;
  }

  // Check if any of the users match the entered credentials
  const userMatch = usersList.find(user => user.email === logEmail && user.password === logPassword);

  if (userMatch) {
    console.log("User verified. Redirecting...");
    window.location.href = "https://hulu-movie-app-main.vercel.app/";
  } else {
    alert("Incorrect email or password.");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logBtn.onclick = () => {
  logPopUp.style.display = "flex";
  document.body.style.overflow = "hidden";
};

logPopClose.onclick = () => {
  logPopUp.style.display = "none";
  document.body.style.overflowY = "auto";
};

termsBtn.onclick = () => {
  termsPop.style.display = "flex";
};

trmClose.onclick = () => {
  termsPop.style.display = "none";
};

regLogBtn.onclick = () => {
  logPopUp.style.display = "none";
  regPop.style.display = "flex";
};

regClose.onclick = () => {
  logPopUp.style.display = "flex";
  regPop.style.display = "none";
};

loginResBtn.onclick = () => {
  logPopUp.style.display = "flex";
  document.body.style.overflow = "hidden";
};
