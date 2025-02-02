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
const BIN_ID = "679eef37e41b4d34e4829eb6"; // Replace with your JSONBin Bin ID

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
    const emailValue = logEmailInput.value;
    const passwordValue = logPasswordInput.value;
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

window.addEventListener("load", async () => {
  let storedUser = localStorage.getItem("signData");
  if (!storedUser) {
    return; // No user data stored, so do nothing
  }

  //storedUser = JSON.parse(storedUser); // Convert string to object

  const apiData = await getUserData(); // Fetch data from API
  if (!apiData) {
    console.error("Failed to fetch API data.");
    return;
  }

  if (storedUser.email === apiData.email && storedUser.password === apiData.password) {
    console.log("User verified. Redirecting...");
    window.location.href = "https://hulu-movie-app-main.vercel.app/";
  } else {
    console.log("User data does not match API records.");
  }
});

// Function to fetch user data from JSONBin API
async function getUserData() {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/679eef37e41b4d34e4829eb6/latest", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
      }
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data.record; // JSONBin stores data inside 'record'
  } catch (error) {
    console.error("Error fetching API data:", error);
    return null;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Call this function when user registers
regRegBtn.onclick = () => {
  const regEmail = regEmailInput.value;
  const regPassword = regPasswordInput.value;

async function storeUserData(email, password) {
  const newUser = { email, password };

  // Get existing users
  let usersList = await getUserData();
  if (!usersList) usersList = []; // Initialize if empty

  // Check if user already exists
  const userExists = usersList.some(user => user.email === email);
  if (userExists) {
    alert("User already registered!");
    return;
  }

  usersList.push(newUser); // Add new user to the list

  // Send updated user list to JSONBin
  const response = await fetch("https://api.jsonbin.io/v3/b/679eef37e41b4d34e4829eb6", {
    method: "PUT",  // Update the bin
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
    },
    body: JSON.stringify({ users: usersList }) // Save as an array
  });

  if (response.ok) {
    console.log("User registered successfully!");
  } else {
    console.error("Failed to store user data.");
  }
 }

  let signData = {
    email: regEmail,
    password: regPassword,
  };
  
  if (regEmail && regPassword) {
    localStorage.setItem("signData", signData);
    
    logPopUp.style.display = "flex";
    regPop.style.display = "none";
  }

  if (regEmail && regPassword) {
    storeUserData(regEmail, regPassword);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logInBtn.addEventListener("click", async () => {
  let Data = await getUserData(); // Fetch data from JSONBin
  //console.log("Fetched data:", Data);

  const EmailInput = logEmailInput.value;
  const PasswordInput = logPasswordInput.value;

  if (EmailInput === Data?.email && PasswordInput === Data?.password) {
    logInBtn.style.background = "green";
    window.location.href = "https://hulu-movie-app-main.vercel.app/";
  } else {
    alert("WRONG");
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
