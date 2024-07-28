document.getElementById("enterButton").addEventListener("click", function () {
  const prodType = document.getElementById("dropdown").value;
  const prodName = document.getElementById("textInput").value;

  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: prodType, name: prodName }),
  })
    .then((response) => response.text())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = `Server response: ${data}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
