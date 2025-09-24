const button = document.querySelector(".upload");
let aiStatus = "";

button.addEventListener("click", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const tagsInput = document.getElementById("tags");
    const fileInput = document.getElementById("upload-file");
    const aiRadio = document.querySelector('input[name="aiSelection"]:checked');

    const email = emailInput.value.trim();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const tags = tagsInput.value.trim();
    const aiStatus = aiRadio ? aiRadio.value : "";

    const isValidEmail = (email) => {
        const atCount = email.split("@").length - 1;
        if (atCount !== 1) return false;

        const parts = email.split("@");
        const localPart = parts[0];
        const domain = parts[1];

        if (localPart.length === 0) return false;
        if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
        if (localPart.includes("..")) return false;

        if (domain.length === 0) return false;
        if (!domain.includes(".")) return false;
        if (domain.startsWith(".") || domain.endsWith(".")) return false;
        if (domain.includes("..")) return false;

        const domainParts = domain.split(".");
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2) return false;

        return true;
    };

    const showError = (message, inputElement) => {
        alert(message);
        if (inputElement && inputElement.focus) {
            inputElement.focus();
        }
    };

    const validations = [
        {
            condition: email === "",
            message: "Email cannot be empty.",
            element: emailInput,
        },
        {
            condition: email !== "" && !isValidEmail(email),
            message: "Invalid email format.",
            element: emailInput,
        },
        {
            condition: title === "",
            message: "Title cannot be empty.",
            element: titleInput,
        },
        {
            condition: description.length < 15,
            message: "Description must be at least 15 characters.",
            element: descriptionInput,
        },
        {
            condition: tags === "",
            message: "Tags cannot be empty.",
            element: tagsInput,
        },
        {
            condition: fileInput.files.length === 0,
            message: "Please upload a file first.",
            element: fileInput,
        },
        {
            condition: aiStatus === "",
            message: "Please select whether this work is AI-generated or not.",
            element: document.querySelector('input[name="aiSelection"]'),
        },
    ];

    for (const validation of validations) {
        if (validation.condition) {
            showError(validation.message, validation.element);
            return;
        }
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024;
    const file = fileInput.files[0];

    if (file && !allowedTypes.includes(file.type)) {
        showError(
            "The file must be an image (JPEG, PNG, GIF, or WebP).",
            fileInput
        );
        return;
    }

    if (file && file.size > maxSize) {
        showError("File size must not exceed 5MB.", fileInput);
        return;
    }

    const konfirmasi = confirm("Are you sure you want to submit the data?");
    if (konfirmasi) {
        alert(`Your image data (${aiStatus}) has been submitted!`);
        document.querySelector(".submission-form").submit();

        document.querySelector(".file-name").textContent = "No file chosen";
        labels.forEach((label) => label.classList.remove("active"));
    } else {
        alert(`Your image data (${aiStatus}) was not submitted.`);
    }
});

const fileInput = document.getElementById("upload-file");
fileInput.addEventListener("change", (event) => {
    document.querySelector(".file-name").textContent =
        event.target.files[0].name;
});

const radioButtons = document.querySelectorAll('input[name="aiSelection"]');
const labels = document.querySelectorAll(".ai-button");

radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
        labels.forEach((label) => label.classList.remove("active"));
        if (radio.checked) {
            radio.closest("label").classList.add("active");
        }

        console.log("Dipilih:", radio.value);
        aiStatus = radio.value;
    });
});
