document.getElementById("vaultForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const fileInput = document.getElementById("document");
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!fileInput.files.length || password.trim() === "") {
    message.textContent = "Please upload a file and provide a password.";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const fileContent = e.target.result;
    const encryptedContent = xorEncrypt(fileContent, password);

    const blob = new Blob([encryptedContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "secure_" + file.name;
    link.click();

    message.textContent = "Document secured and downloaded!";
    message.style.color = "green";
  };

  reader.readAsText(file);
});

function xorEncrypt(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}
