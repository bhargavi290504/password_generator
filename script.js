document.addEventListener('DOMContentLoaded', () => {
  const lengthInput = document.getElementById('length');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const uppercaseCheckbox = document.getElementById('uppercase');
  const numbersCheckbox = document.getElementById('numbers');
  const specialCheckbox = document.getElementById('special');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const saveBtn = document.getElementById('save-btn');
  const passwordDisplay = document.getElementById('password-display');

  generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    const includeLowercase = lowercaseCheckbox.checked;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSpecial = specialCheckbox.checked;

    const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSpecial);
    passwordDisplay.textContent = password;
  });

  copyBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.textContent.trim();

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    alert('Password copied to clipboard!');
  });

  saveBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent.trim();
    if (password) {
      savePassword(password);
    }
  });

  function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSpecial) {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()-_=+';

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  function savePassword(password) {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
});
